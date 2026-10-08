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

      const canRetry =
        response.status === 429 || response.status >= 500;
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

async function getCoordinates(address: string) {
  const normalizedAddress = address.trim();
  const lowerAddress = normalizedAddress.toLowerCase();
  const isDfwAirport =
    /\bdfw\b/.test(lowerAddress) &&
    /(airport|aeropuerto|terminal)/.test(lowerAddress);
  const isLoveFieldAirport = /love\s+field|love\s+airport|aeropuerto de love/.test(
    lowerAddress
  );
  const query = isDfwAirport
    ? "Dallas/Fort Worth International Airport"
    : isLoveFieldAirport
      ? "Dallas Love Field"
      : lowerAddress.includes("tx") || lowerAddress.includes("texas")
        ? normalizedAddress
        : `${normalizedAddress}, Dallas, TX`;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
  const response = await fetchWithRetry(
    url,
    {
      headers: {
        "User-Agent": "HiTaxiDallas/1.0 (contact@hitaxidallas.com)",
      },
      next: { revalidate: 86400 },
    },
    "La búsqueda de direcciones"
  );

  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const lat = Number(data[0].lat);
  const lon = Number(data[0].lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  return { lat, lon };
}

async function getRouteData(
  start: { lat: number; lon: number },
  end: { lat: number; lon: number }
) {
  const url = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=false`;
  const response = await fetchWithRetry(
    url,
    { next: { revalidate: 43200 } },
    "El cálculo de rutas"
  );

  const data = await response.json();
  if (
    data.code !== "Ok" ||
    !Array.isArray(data.routes) ||
    data.routes.length === 0
  ) {
    return null;
  }

  const distanceMeters = Number(data.routes[0].distance);
  const durationSeconds = Number(data.routes[0].duration);
  if (
    !Number.isFinite(distanceMeters) ||
    distanceMeters <= 0 ||
    !Number.isFinite(durationSeconds) ||
    durationSeconds < 0
  ) {
    return null;
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

    const pickupCoords = await getCoordinates(pickup);
    if (!pickupCoords) {
      return NextResponse.json(
        { error: "No se encontró el origen. Prueba con una dirección más específica." },
        { status: 422 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1100));
    const destCoords = await getCoordinates(destination);
    if (!destCoords) {
      return NextResponse.json(
        { error: "No se encontró el destino. Prueba con una dirección más específica." },
        { status: 422 }
      );
    }

    const routeData = await getRouteData(pickupCoords, destCoords);
    if (!routeData) {
      return NextResponse.json(
        { error: "No se encontró una ruta entre esos lugares. Verifica las direcciones." },
        { status: 422 }
      );
    }

    const estimatedMiles = parseFloat(routeData.miles.toFixed(1));
    const estimatedTrafficMins = routeData.trafficMins;

    // 3. Cálculo base
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