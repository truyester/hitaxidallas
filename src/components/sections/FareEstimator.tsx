"use client";

import { useState, useCallback } from "react";

export default function FareEstimator() {
  const [pickup, setPickup] = useState("Webb Chapel & NW Hwy, Dallas");
  const [destination, setDestination] = useState("DFW Aeropuerto Terminal A-E");
  const [vehicle, setVehicle] = useState("sedan");
  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null);
  const [breakdown, setBreakdown] = useState<{
    miles: number;
    minutes: number;
    isRealRoute: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Petición a la API backend (/api/calculate-fare)
  const fetchFare = useCallback(async (p: string, d: string, v: string) => {
    if (!p.trim() || !d.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setEstimatedPrice(null);
    setBreakdown(null);
    try {
      const res = await fetch("/api/calculate-fare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup: p, destination: d, vehicle: v }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "No se pudo calcular la tarifa.");
      }

      setEstimatedPrice(data.estimatedPrice);
      if (data.breakdown) {
        setBreakdown({
          miles: data.breakdown.estimatedMiles,
          minutes: data.breakdown.estimatedTrafficMins,
          isRealRoute: data.breakdown.isRealRoute,
        });
      }
    } catch (error) {
      console.error("Error al calcular la tarifa:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error al conectar con el servidor. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void fetchFare(pickup, destination, vehicle);
  };

  return (
    <section className="py-16 bg-brand-surface border-b border-white/10" id="rates">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/20">
            Tarifas Oficiales HI TAXI
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight mt-3">
            Calculadora de Tarifas y Estimador
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Precios claros y servicio confiable las 24 horas en todo el área de Dallas y DFW.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-brand-card rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Campo 1: Origen */}
              <div>
                <label htmlFor="pickup" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Punto de Recogida
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm">📍</span>
                  <input
                    type="text"
                    id="pickup"
                    value={pickup}
                    disabled={loading}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Dirección, trabajo u hotel"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#22272e] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow transition"
                    required
                  />
                </div>
              </div>

              {/* Campo 2: Destino */}
              <div>
                <label htmlFor="destination" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Destino
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm">🏁</span>
                  <input
                    type="text"
                    id="destination"
                    value={destination}
                    disabled={loading}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Aeropuerto o destino en Dallas"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#22272e] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow transition"
                    required
                  />
                </div>
              </div>

              {/* Campo 3: Tipo de Vehículo */}
              <div>
                <label htmlFor="vehicle" className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Tipo de Vehículo
                </label>
                <div className="relative">
                  <select
                    id="vehicle"
                    value={vehicle}
                    disabled={loading}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#22272e] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow transition appearance-none cursor-pointer"
                  >
                    <option value="sedan">Sedán (1-4 Pasajeros)</option>
                    <option value="suv">SUV (1-4 Pasajeros)</option>
                    <option value="van">Van Aeropuerto (1-7 Pasajeros)</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs text-gray-400">▼</span>
                </div>
              </div>

            </div>

            {/* Muestra de Precio Estimado y Botón de Acción */}
            <div className="pt-6 border-t border-white/10 flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
              <div className="flex w-full flex-col items-center gap-3 text-center sm:flex-row sm:items-baseline sm:text-left">
                <span className="flex items-center justify-center gap-2 font-display text-4xl font-extrabold text-brand-yellow">
                  {loading ? (
                    <span className="text-2xl text-gray-400 animate-pulse">Calculando...</span>
                  ) : (
                    estimatedPrice ? `$${estimatedPrice}` : "—"
                  )}
                </span>
                
                <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
                  <span className="text-xs font-semibold text-[#41e575] bg-[#41e575]/10 px-3 py-1.5 rounded-full border border-[#41e575]/20">
                    $2.50 Base + $2.50/Milla (DFW Mínimo $32.00)
                  </span>
                  {breakdown?.isRealRoute && !loading && (
                    <span className="text-[11px] text-gray-400">
                      📏 Distancia: <strong>{breakdown.miles} mi</strong> | ⏱️ Tiempo apróx: <strong>{breakdown.minutes} min</strong>
                    </span>
                  )}
                  {breakdown && !breakdown.isRealRoute && !loading && (
                    <span className="max-w-sm text-[11px] text-amber-300" role="status">
                      No se pudo verificar la ruta; el precio mostrado es una referencia.
                    </span>
                  )}
                  {errorMessage && !loading && (
                    <span className="max-w-sm text-[11px] text-red-400" role="alert">
                      {errorMessage}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:shrink-0">
                <button
                  type="submit"
                  disabled={loading || !pickup.trim() || !destination.trim()}
                  className="w-full sm:flex-1 md:w-auto md:min-w-44 inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-black font-extrabold px-6 py-3.5 rounded-full text-sm shadow-[0_0_20px_rgba(250,189,13,0.3)] transition disabled:cursor-wait disabled:opacity-60"
                >
                  <span>{loading ? "Calculando..." : "Calcular tarifa"}</span>
                  {!loading && <span className="font-black">&gt;</span>}
                </button>
                <a
                  href="tel:2148936969"
                  className="w-full sm:flex-1 md:w-auto md:min-w-44 inline-flex items-center justify-center gap-2 border border-white/15 text-gray-200 hover:text-white hover:border-white/30 font-bold px-6 py-3 rounded-full text-sm transition"
                >
                  <span>Llama y reserva</span>
                </a>
              </div>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}