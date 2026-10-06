"use client";

import { useState } from "react";

export default function DriverSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    vehicleType: "",
    vehicleYear: "",
    vehicleOption: "Tengo vehículo propio (2013 en adelante) y ya cuento con licencia de conducir.",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSubmitted(false);

    try {
      const response = await fetch("/api/driver-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.name,
          telefono: formData.phone,
          email: formData.email,
          ciudad: formData.city,
          tipoVehiculo: formData.vehicleType,
          anoVehiculo: formData.vehicleYear,
          experiencia: formData.vehicleOption,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar la solicitud.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        vehicleType: "",
        vehicleYear: "",
        vehicleOption: "Tengo vehículo propio (2013 en adelante) y ya cuento con licencia de conducir.",
      });
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Error al conectar con el servidor. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-brand-surface border-b border-white/10" id="drive">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#181c22] text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Columna Izquierda: Beneficios */}
            <div className="lg:col-span-6">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-extrabold uppercase tracking-wider mb-4 border border-brand-yellow/30">
                ÚNETE A NUESTRA RED DE CONDUCTORES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                Conduce con HI TAXI
              </h2>
              <p className="text-base text-gray-300 leading-relaxed mb-6">
                Forma parte de nuestra red de conductores independientes en Dallas y trabaja con tu propio vehículo.
              </p>
              
              <div className="space-y-3.5 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <span className="text-brand-yellow font-bold text-lg">✓</span>
                  <span>Recibe servicios asignados por nuestro equipo de despacho</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-yellow font-bold text-lg">✓</span>
                  <span>Recibe el pago directamente por cada servicio</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-yellow font-bold text-lg">✓</span>
                  <span>Soporte de despacho disponible 24/7</span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Formulario */}
            <div className="lg:col-span-6 bg-brand-surface rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="driver-name"
                    className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="driver-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ej. Samuel Rodríguez"
                    className="w-full px-4 py-3.5 bg-[#1d2127] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="driver-phone"
                    className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5"
                  >
                    Teléfono Móvil
                  </label>
                  <input
                    type="tel"
                    id="driver-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(214) 555-0192"
                    className="w-full px-4 py-3.5 bg-[#1d2127] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="driver-email"
                    className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="driver-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tuemail@ejemplo.com"
                    className="w-full px-4 py-3.5 bg-[#1d2127] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="driver-city"
                      className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5"
                    >
                      Ciudad / Zona
                    </label>
                    <input
                      type="text"
                      id="driver-city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="ej. Dallas"
                      autoComplete="address-level2"
                      className="w-full px-4 py-3.5 bg-[#1d2127] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="driver-vehicle-type"
                      className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5"
                    >
                      Tipo de Vehículo
                    </label>
                    <input
                      type="text"
                      id="driver-vehicle-type"
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      placeholder="ej. Sedán, SUV"
                      className="w-full px-4 py-3.5 bg-[#1d2127] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="driver-vehicle-year"
                      className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5"
                    >
                      Año del Vehículo
                    </label>
                    <input
                      type="number"
                      id="driver-vehicle-year"
                      min="1900"
                      max={new Date().getFullYear()}
                      step="1"
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                      placeholder="ej. 2020"
                      className="w-full px-4 py-3.5 bg-[#1d2127] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="driver-vehicle"
                    className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5"
                  >
                    VEHÍCULO / LICENCIA DE CONDUCIR
                  </label>
                  <select
                    id="driver-vehicle"
                    value={formData.vehicleOption}
                    onChange={(e) => setFormData({ ...formData, vehicleOption: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#1d2127] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition cursor-pointer"
                  >
                    <option value="Tengo vehículo propio (2013 en adelante) y ya cuento con licencia de conducir." className="bg-brand-card">
                      Tengo vehículo propio (2013 en adelante) y ya cuento con licencia de conducir.
                    </option>
                    <option value="Necesito un vehículo de la flota de Hi Taxi (Alquiler) y ya cuento con licencia de conducir." className="bg-brand-card">
                      Necesito un vehículo de la flota de Hi Taxi (Alquiler) y ya cuento con licencia de conducir.
                    </option>
                    <option value="Tengo vehículo propio (2013 en adelante) y necesito obtener mi licencia de conducir." className="bg-brand-card">
                      Tengo vehículo propio (2013 en adelante) y necesito obtener mi licencia de conducir.
                    </option>
                    <option value="Necesito un vehículo de la flota de Hi Taxi (Alquiler) y necesito obtener mi licencia de conducir." className="bg-brand-card">
                      Necesito un vehículo de la flota de Hi Taxi (Alquiler) y necesito obtener mi licencia de conducir.
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-black font-extrabold py-4 px-6 rounded-xl text-sm shadow-[0_4px_20px_rgba(250,189,13,0.3)] transition cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? "Enviando solicitud..." : "Postularse para Conducir"}</span>
                  {!loading && <span className="font-black">&gt;</span>}
                </button>

                {errorMsg && (
                  <div className="text-xs text-red-400 font-bold text-center pt-2">
                    {errorMsg}
                  </div>
                )}

                {submitted && (
                  <div className="text-xs text-[#41e575] font-bold text-center pt-2 animate-fade-in">
                    ¡Solicitud recibida! Un gerente de flota se comunicará contigo hoy.
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}