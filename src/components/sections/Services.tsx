"use client";

import { useRef } from "react";

export default function Services() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth; // Desplaza una pantalla completa
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const servicesList = [
    {
      badge: "SERVICIO 01",
      title: "Traslados Locales",
      description:
        "Viajes rápidos y confiables hacia hogares, trabajos, escuelas y cualquier destino dentro de nuestra zona de servicio.",
      features: [
        "Unidades disponibles en vecindarios clave de Dallas",
        "Atención personalizada y conductores profesionales",
        "Opciones de pago: efectivo, tarjeta y Zelle",
      ],
      ctaText: "Solicitar Traslado Local",
      ctaHref: "tel:2148936969",
      isFeatured: false,
    },
    {
      badge: "MÁS SOLICITADO",
      title: "Aeropuertos (DFW y Love Field)",
      description:
        "Traslados hacia y desde el Aeropuerto Internacional DFW y Dallas Love Field. Puedes reservar con anticipación y solicitar una cotización.",
      features: [
        "Precios de tarifa plana directa con peajes incluidos",
        "Rastreo de vuelos en vivo y asistencia con equipaje",
        "Sedanes, minivans y SUVs ejecutivas disponibles",
      ],
      ctaText: "Reservar Taxi al Aeropuerto",
      ctaHref: "https://wa.me/12148936969?text=Hola,%20deseo%20reservar%20un%20taxi%20al%20aeropuerto",
      isFeatured: true,
    },
    {
      badge: "SERVICIO 03",
      title: "Viajes Programados",
      description:
        "Reserva tu taxi con anticipación para ir al trabajo, citas médicas, reuniones, consulados u otros compromisos importantes.",
      features: [
        "Reserva anticipada para la fecha y hora solicitada",
        "Confirmación del servicio antes del despacho de la unidad",
        "Ideal para citas, trabajo y compromisos importantes",
      ],
      ctaText: "Programar un Viaje",
      ctaHref: "tel:2148936969",
      isFeatured: false,
    },
    {
      badge: "SERVICIO 04",
      title: "Compras y Diligencias",
      description:
        "Servicio para supermercados, lavanderías, centros comerciales, tiendas y otras diligencias personales.",
      features: [
        "Espacio de maletero amplio para bolsas y compras",
        "Tiempo de espera flexible durante tus recados",
        "Asistencia de carga y descarga por el conductor",
      ],
      ctaText: "Solicitar Taxi para Compras",
      ctaHref: "tel:2148936969",
      isFeatured: false,
    },
    {
      badge: "SERVICIO 05",
      title: "Entretenimiento y Vida Nocturna",
      description:
        "Traslados hacia restaurantes, cines, bares, eventos y zonas de entretenimiento, con servicio disponible durante la noche.",
      features: [
        "Retorno seguro a casa de noche y madrugada",
        "Transporte a zonas populares (Downtown, Escapade 2001 y 2009, Harry Hines, etc.)",
        "Atención rápida para recogidas y traslados",
      ],
      ctaText: "Solicitar Taxi Nocturno",
      ctaHref: "tel:2148936969",
      isFeatured: false,
    },
    {
      badge: "SERVICIO 06",
      title: "Delivery",
      description:
        "Recogemos y entregamos tus pedidos, paquetes pequeños y documentos de forma rápida y confiable.",
      features: [
        "Recogida de pedidos en restaurantes y comercios",
        "Transporte seguro de paquetes pequeños",
        "Entrega rápida y confiable de documentos",
      ],
      ctaText: "Solicitar Delivery",
      ctaHref: "tel:2148936969",
      isFeatured: false,
    },
    {
      badge: "Atención Personalizada",
      title: "¿Necesitas un Servicio Especial?",
      description:
        "Comunícate con nuestro equipo para verificar disponibilidad y solicitar una cotización a tu medida.",
      features: [
        "Cotizaciones para viajes fuera de la ciudad o larga distancia",
        "Atención especial para grupos corporativos",
        "Soporte directo las 24 horas del día",
      ],
      ctaText: "Consultar Servicio Especial",
      ctaHref: "https://wa.me/12148936969?text=Hola,%20necesito%20cotizar%20un%20servicio%20especial",
      isFeatured: false,
    },
  ];

  return (
    <section className="py-20 bg-brand-darkBg border-b border-white/10" id="services">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado y botones de navegación */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/20">
              Gama Integral
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Soluciones de Transporte a Tu Medida
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              Desliza para explorar nuestros servicios, desde viajes locales hasta reservas especiales.
            </p>
          </div>

          {/* Botones de control */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior servicio"
              className="w-12 h-12 rounded-full border border-white/20 bg-brand-surface hover:bg-brand-card hover:border-brand-yellow text-white transition flex items-center justify-center cursor-pointer shadow-md active:scale-95"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Siguiente servicio"
              className="w-12 h-12 rounded-full border border-white/20 bg-brand-surface hover:bg-brand-card hover:border-brand-yellow text-white transition flex items-center justify-center cursor-pointer shadow-md active:scale-95"
            >
              →
            </button>
          </div>
        </div>

        {/* Carrusel Deslizable Ajustado */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {servicesList.map((service, idx) => (
            <div
              key={idx}
              className={`snap-start shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl p-8 shadow-xl flex flex-col justify-between transition group ${
                service.isFeatured
                  ? "bg-brand-card border border-brand-yellow/50 ring-1 ring-brand-yellow/30 hover:shadow-[0_0_30px_rgba(250,189,13,0.15)]"
                  : "bg-[#181b20] border border-white/10 hover:border-brand-yellow/40"
              }`}
            >
              <div>
                <div
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                    service.isFeatured ? "text-brand-yellow" : "text-gray-400"
                  }`}
                >
                  {service.badge}
                </div>
                
                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-brand-yellow transition">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Lista de viñetas */}
                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  {service.features.map((feat, featIdx) => (
                    <li key={featIdx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-brand-yellow mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón CTA */}
              <a
                href={service.ctaHref}
                target={service.ctaHref.startsWith("http") ? "_blank" : "_self"}
                rel={service.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold transition ${
                  service.isFeatured
                    ? "bg-brand-yellow hover:bg-brand-yellowHover text-black font-extrabold shadow-md"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <span>{service.ctaText}</span>
                <span className="font-black">&gt;</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}