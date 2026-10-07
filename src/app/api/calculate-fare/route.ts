export const runtime = 'edge';

import { NextResponse } from "next/server";

// Helper para obtener coordenadas (lat, lon) de una dirección usando Nominatim
async function getCoordinates(address: string) {
  try {
    // Si la búsqueda no especifica estado o país, acotamos a la zona de Dallas, TX
    const query = address.toLowerCase().includes("tx") || address.toLowerCase().includes("texas")
      ? address
      : `${address}, Dallas, TX`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    
    const response = await fetch(url, {
      headers: {
        "User-Agent": "HiTaxiDallas/1.0 (contact@hitaxidallas.com)",
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
  } catch (err) {
    console.error("Error geocodificando con Nominatim:", err);
  }
  return null;
}

// Helper para calcular distancia (en millas) y tiempo (en minutos) usando OSRM
async function getRouteData(start: { lat: number; lon: number }, end: { lat: number; lon: number }) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=false`;
    const response = await fetch(url);
    
    if (!response.ok) return null;

    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const distanceMeters = data.routes[0].distance;
      const durationSeconds = data.routes[0].duration;

      return {
        miles: distanceMeters / 1609.34, // Conversión de metros a millas
        trafficMins: Math.round(durationSeconds / 60), // Conversión de segundos a minutos
      };
    }
  } catch (err) {
    console.error("Error calculando ruta con OSRM:", err);
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pickup, destination, vehicle } = body;

    if (!pickup || !destination) {
      return NextResponse.json(
        { error: "Origen y destino son requeridos" },
        { status: 400 }
      );
    }

    const p = pickup.toLowerCase();
    const d = destination.toLowerCase();

    // 1. Estándar de Tarifas HI TAXI
    const BASE_INITIAL_FARE = 2.25;  // Tarifa inicial (bajada de bandera)
    const RATE_PER_MILE = 2.50;      // $0.25 por cada 1/10 de milla = $2.50 por milla
    const WAIT_RATE_PER_MIN = 0.40;   // $0.40 por cada minuto de espera / tráfico
    const DFW_MINIMUM_FARE = 32.00;  // Tarifa mínima para servicio al Aeropuerto DFW

    const isDFW = p.includes("dfw") || d.includes("dfw");
    const isLoveField = p.includes("love") || d.includes("love");

    let estimatedMiles = 10;
    let estimatedTrafficMins = 5;
    let isRealRoute = false;

    // 2. Intentar obtener la distancia real por carretera mediante OpenStreetMap (OSRM)
    const [pickupCoords, destCoords] = await Promise.all([
      getCoordinates(pickup),
      getCoordinates(destination),
    ]);

    if (pickupCoords && destCoords) {
      const routeData = await getRouteData(pickupCoords, destCoords);
      if (routeData && routeData.miles > 0) {
        estimatedMiles = parseFloat(routeData.miles.toFixed(1));
        estimatedTrafficMins = routeData.trafficMins;
        isRealRoute = true;
      }
    }

    // Respaldos por defecto si no se pudo geocodificar la dirección exacta
    if (!isRealRoute) {
      if (isDFW) {
        estimatedMiles = 15;
        estimatedTrafficMins = 8;
      } else if (isLoveField) {
        estimatedMiles = 8;
        estimatedTrafficMins = 4;
      }
    }

    // 3. Cálculo base según la fórmula oficial
    let totalFare = BASE_INITIAL_FARE + (estimatedMiles * RATE_PER_MILE) + (estimatedTrafficMins * WAIT_RATE_PER_MIN);

    // 4. Ajuste por Tipo de Vehículo
    if (vehicle === "suv") {
      totalFare *= 1.30; // 30% adicional por SUV
    } else if (vehicle === "van") {
      totalFare *= 1.50; // 50% adicional por Van
    }

    // 5. Aplicar Tarifa Mínima de Aeropuerto DFW ($32.00)
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
        isRealRoute,
      },
      currency: "USD",
    });

  } catch (error) {
    console.error("Error en /api/calculate-fare:", error);
    return NextResponse.json(
      { error: "Error interno al calcular la tarifa" },
      { status: 500 }
    );
  }
}