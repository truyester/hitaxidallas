export const runtime = 'edge';

import { NextResponse } from "next/server";

class FareServiceError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "FareServiceError";
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestInit & { next?: { revalidate: number } },
  serviceName: string
) {
  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (response.ok) {
        return response;
      }

      const canRetry = response.status === 429 || response.status >= 500;
      if (!canRetry) {
        await response.body?.cancel();
        throw new FareServiceError(
          `${serviceName} respondió con un error (HTTP ${response.status}).`,
          503
        );
      }

      if (attempt === maxAttempts) {
        await response.body?.cancel();
        throw new FareServiceError(
          `${serviceName} no está disponible temporalmente.`,
          503
        );
      }

      const retryAfterSeconds = Number(response.headers.get("retry-after"));
      const retryDelay = Number.isFinite(retryAfterSeconds)
        ? Math.min(Math.max(retryAfterSeconds * 1000, 1000), 10000)
        : 1000;
      await response.body?.cancel();
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      continue;
    } catch (error) {
      if (error instanceof FareServiceError) {
        throw error;
      }

      if (attempt === maxAttempts) {
        console.error(`${serviceName} falló tras ${maxAttempts} intentos:`, error);
        throw new FareServiceError(
          `${serviceName} no está disponible temporalmente.`,
          503
        );
      }
    } finally {
      clearTimeout(timeoutId);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new FareServiceError(`${serviceName} no está disponible temporalmente.`, 503);
}

// Función auxiliar para mejorar la precisión de las direcciones antes de enviarlas a Google
function formatAddressForGoogle(address: string) {
  const normalizedAddress = address.trim();
  const lowerAddress = normalizedAddress.toLowerCase();

  const isDfwAirport =
    /\bdfw\b/.test(lowerAddress) &&
    /(airport|aeropuerto|terminal)/.test(lowerAddress);

  const isLoveFieldAirport = /love\s+field|love\s+airport|aeropuerto de love/.test(
    lowerAddress
  );

  return isDfwAirport
    ? "Dallas/Fort Worth International Airport, TX"
    : isLoveFieldAirport
    ? "Dallas Love Field, TX"
    : lowerAddress.includes("tx") || lowerAddress.includes("texas")
    ? normalizedAddress
    : `${normalizedAddress}, Dallas, TX`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseGoogleDuration(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const match = /^(\d+(?:\.\d+)?)s$/.exec(value);
  if (!match) {
    return null;
  }

  const seconds = Number(match[1]);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : null;
}

// Routes API returns traffic-aware duration when TRAFFIC_AWARE_OPTIMAL is requested.
async function getGoogleRouteData(pickup: string, destination: string, apiKey: string) {
  const originStr = formatAddressForGoogle(pickup);
  const destStr = formatAddressForGoogle(destination);

  const response = await fetchWithRetry(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.staticDuration",
      },
      body: JSON.stringify({
        origin: { address: originStr },
        destination: { address: destStr },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE_OPTIMAL",
      }),
      cache: "no-store",
    },
    "Google Routes API"
  );

  const data: unknown = await response.json();

  if (!isRecord(data) || !Array.isArray(data.routes)) {
    console.error("Google Routes API devolvió una respuesta inválida.");
    throw new FareServiceError("El servicio de mapas devolvió una respuesta inválida.", 503);
  }

  if (data.routes.length === 0) {
    return null;
  }

  const route = data.routes[0];
  if (!isRecord(route)) {
    console.error("Google Routes API devolvió una ruta inválida.");
    throw new FareServiceError("El servicio de mapas devolvió una ruta inválida.", 503);
  }

  const distanceMeters = route.distanceMeters;
  const durationSeconds =
    parseGoogleDuration(route.duration) ??
    parseGoogleDuration(route.staticDuration);

  if (
    typeof distanceMeters !== "number" ||
    !Number.isFinite(distanceMeters) ||
    distanceMeters <= 0 ||
    durationSeconds === null
  ) {
    console.error("Google Routes API devolvió distancia o duración inválida.");
    throw new FareServiceError("El servicio de mapas devolvió datos de ruta inválidos.", 503);
  }

  return {
    miles: distanceMeters / 1609.34,
    trafficMins: Math.round(durationSeconds / 60),
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pickup, destination } = body;

    if (
      typeof pickup !== "string" ||
      typeof destination !== "string" ||
      !pickup.trim() ||
      !destination.trim()
    ) {
      return NextResponse.json(
        { error: "Origen y destino son requeridos" },
        { status: 400 }
      );
    }

    const p = pickup.trim().toLowerCase();
    const d = destination.trim().toLowerCase();

    // Validar si origen y destino son idénticos
    if (p === d) {
      return NextResponse.json(
        { error: "El origen y el destino no pueden ser iguales" },
        { status: 400 }
      );
    }

    // 1. Estándar de Tarifas HI TAXI
    const BASE_INITIAL_FARE = 2.50;
    const RATE_PER_MILE = 2.50;
    const WAIT_RATE_PER_MIN = 0.40;
    const DFW_MINIMUM_FARE = 32.00;

    const isDFW = p.includes("dfw") || d.includes("dfw");

    // 2. Extraer la llave de Google desde las variables de entorno
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Falta la variable de entorno GOOGLE_MAPS_API_KEY");
      return NextResponse.json(
        { error: "Error de configuración del servidor. Contacte al administrador." },
        { status: 500 }
      );
    }

    // 3. Obtener datos de la ruta con Google Maps
    const routeData = await getGoogleRouteData(pickup, destination, GOOGLE_MAPS_API_KEY);

    if (!routeData) {
      return NextResponse.json(
        { error: "No se encontró una ruta entre esos lugares o la dirección no es válida. Verifica e intenta nuevamente." },
        { status: 422 }
      );
    }

    const estimatedMiles = parseFloat(routeData.miles.toFixed(1));
    const estimatedTrafficMins = routeData.trafficMins;

    // 4. Cálculo base
    let totalFare =
      BASE_INITIAL_FARE +
      estimatedMiles * RATE_PER_MILE +
      estimatedTrafficMins * WAIT_RATE_PER_MIN;

    // 5. Aplicar Tarifa Mínima DFW
    if (isDFW && totalFare < DFW_MINIMUM_FARE) {
      totalFare = DFW_MINIMUM_FARE;
    }

    return NextResponse.json({
      success: true,
      estimatedPrice: totalFare.toFixed(2),
      breakdown: {
        initialFare: BASE_INITIAL_FARE.toFixed(2),
        ratePerMile: RATE_PER_MILE.toFixed(2),
        estimatedMiles,
        estimatedTrafficMins,
        isDFW,
        isRealRoute: true,
      },
      currency: "USD",
    });

  } catch (error) {
    if (error instanceof FareServiceError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error("Error interno en /api/calculate-fare:", error);
    return NextResponse.json(
      { error: "Error interno al calcular la tarifa" },
      { status: 500 }
    );
  }
}