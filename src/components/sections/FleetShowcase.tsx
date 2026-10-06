export default function FleetShowcase() {
  const fleet = [
    {
      title: "Sedanes",
      subtitle: "Ideales para viajes diarios, traslados al trabajo, citas y recorridos dentro de la ciudad.",
      tag: "Viajes Urbanos Estándar",
      tagStyle: "bg-brand-yellow text-black font-extrabold",
      image: "/images/sedan.webp",
      specs: [
        { icon: "👥", text: "Capacidad: 1 - 4 Pasajeros" },
        { icon: "🧳", text: "Equipaje: 2 Maletas Grandes + 2 de Mano" },
        { icon: "💳", text: "Pago: Efectivo, Tarjeta, Zelle" },
      ],
      priceNote: "Bajada de bandera base: $2.25 | Tarifa local estándar",
      isFeatured: false,
    },
    {
      title: "SUV",
      subtitle: "Ofrecen mayor espacio para pasajeros y equipaje. Son ideales para familias, grupos pequeños y viajes al aeropuerto.",
      tag: "Espacio y comodidad en cada viaje",
      tagStyle: "bg-black/80 text-brand-yellow border border-brand-yellow/40 font-bold",
      image: "/images/suv.webp",
      specs: [
        { icon: "👥", text: "Capacidad: 1 - 4 Pasajeros" },
        { icon: "🧳", text: "Equipaje: 4 Maletas Grandes" },
        { icon: "💳", text: "Pago: Efectivo, Tarjeta, Zelle" },
      ],
      priceNote: "Bajada de bandera base: $2.25 | Tarifa local estándar",
      isFeatured: true,
    },
    {
      title: "Vans",
      subtitle: "Nuestra opción más amplia para grupos grandes, familias y pasajeros con mayor cantidad de equipaje.",
      tag: "Familias y Equipaje Pesado",
      tagStyle: "bg-brand-yellow text-black font-extrabold",
      image: "/images/van.webp",
      specs: [
        { icon: "👥", text: "Capacidad: 1 - 7 Pasajeros" },
        { icon: "🧳", text: "Equipaje: 4 Maletas Grandes" },
        { icon: "💳", text: "Pago: Efectivo, Tarjeta, Zelle" },
      ],
      priceNote: "Bajada de bandera base: $2.25 | Tarifa local estándar",
      isFeatured: false,
    },
  ];

  return (
    <section className="py-20 bg-brand-surface border-b border-white/10" id="fleet">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3 border border-brand-yellow/30">
            Nuestra Flota
          </div>
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
            Vehículos seguros, cómodos y listos para llevarte a tu destino.
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            HI TAXI ofrece diferentes opciones de vehículos para traslados locales, viajes programados y servicios a los aeropuertos de Dallas.
          </p>
        </div>

        {/* Grilla de Vehículos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleet.map((car, idx) => (
            <div
              key={idx}
              className={`bg-brand-card rounded-2xl p-5 shadow-xl transition flex flex-col justify-between group ${
                car.isFeatured
                  ? "border border-brand-yellow/40 ring-1 ring-brand-yellow/30 hover:border-brand-yellow"
                  : "border border-white/10 hover:border-brand-yellow/50"
              }`}
            >
              <div className="space-y-4">
                {/* Contenedor de Imagen */}
                <div className="relative rounded-xl overflow-hidden aspect-video bg-brand-darkBg border border-white/10">
                  <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div
                    className={`absolute top-2.5 left-2.5 text-xs px-2.5 py-1 rounded-full shadow ${car.tagStyle}`}
                  >
                    {car.tag}
                  </div>
                </div>

                {/* Títulos */}
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-yellow transition">
                    {car.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{car.subtitle}</p>
                </div>

                {/* Lista de Especificaciones */}
                <ul className="space-y-2 text-xs text-gray-300 pt-2 border-t border-white/10">
                  {car.specs.map((spec, specIdx) => (
                    <li key={specIdx} className="flex items-center gap-2">
                      <span>{spec.icon}</span>
                      <span>{spec.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Insignia de Nota de Precio */}
                <div className="bg-[#22272e] p-2.5 rounded-xl border border-white/5 text-xs text-brand-yellow font-medium">
                  {car.priceNote}
                </div>
              </div>

              {/* Botón de Llamada */}
              <a
                href="tel:2148936969"
                className={`mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                  car.isFeatured
                    ? "bg-brand-yellow hover:bg-brand-yellowHover text-black font-black shadow-md"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <span>Solicitar un viaje</span>
                <span>&gt;</span>
              </a>
            </div>
          ))}
        </div>

        {/* Bloque de Información Adicional (Seguridad y CTA) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#181c22] p-8 rounded-2xl border border-white/10 shadow-xl">
          <div>
            <h3 className="font-display text-xl font-bold text-brand-yellow mb-4">Seguridad y comodidad</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold">✓</span> Vehículos autorizados y asegurados.</li>
              <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold">✓</span> Unidades limpias y en buenas condiciones.</li>
              <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold">✓</span> Aire acondicionado para mayor comodidad.</li>
              <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold">✓</span> Conductores autorizados para prestar servicio.</li>
              <li className="flex items-start gap-2"><span className="text-brand-yellow font-bold">✓</span> Diferentes opciones de vehículos según disponibilidad.</li>
            </ul>
            <p className="mt-4 text-xs text-gray-500 italic">
              * El tipo y tamaño del vehículo asignado dependerá de la disponibilidad y las necesidades del servicio.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-display text-xl font-bold text-white mb-2">¿Necesitas un vehículo con más espacio?</h3>
            <p className="text-sm text-gray-400 mb-6">
              Comunícate con nuestro equipo al solicitar tu taxi para verificar la disponibilidad.
            </p>
            <a
              href="tel:2148936969"
              className="inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-black font-extrabold px-6 py-3 rounded-xl text-sm transition self-start shadow-md"
            >
              <span>Consultar Disponibilidad</span>
              <span>&gt;</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}