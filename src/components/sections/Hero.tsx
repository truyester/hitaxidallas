import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-5.25rem)] overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16 map-grid-bg border-b border-white/5">
      <Image
        src="/images/hero-section.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 300vw, 100vw"
        quality={90}
        className="absolute inset-0 z-0 object-cover object-[60%_center] brightness-110 contrast-110 md:object-center"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(11,14,18,0.72)_0%,rgba(11,14,18,0.55)_42%,rgba(11,14,18,0.35)_100%)]" />
      <div className="hero-glow absolute inset-0 z-0 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Mensaje Principal y CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a20] text-gray-200 text-xs font-semibold mb-6 border border-brand-yellow/30 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#41e575] shadow-[0_0_8px_#41e575] animate-pulse" />
              <span>Disponible 24/7 en Dallas</span>
            </div>

            {/* Titular Principal */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.12] mb-5">
              Tu taxi de confianza en Dallas, <br />
              <span className="text-brand-yellow">cuando lo necesitas.</span>
            </h1>

            {/* Subtítulo */}
            <div className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              <p className="font-bold text-white text-lg sm:text-xl mb-1.5">
                Rápido, seguro y en tu idioma.
              </p>
              <p className="text-gray-400">
                Traslados locales, aeropuertos, viajes programados y entregas con atención las 24 horas.
              </p>
            </div>

            {/* Botones de Acción Principal */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="tel:2148936969"
                className="inline-flex items-center justify-center gap-2.5 bg-brand-yellow hover:bg-brand-yellowHover text-black font-extrabold px-8 py-4 rounded-full text-base shadow-[0_4px_25px_rgba(250,189,13,0.35)] hover:shadow-[0_6px_30px_rgba(250,189,13,0.5)] transition duration-200 group"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Llamar ahora</span>
                <span className="text-black group-hover:translate-x-1 transition font-black">&gt;</span>
              </a>

              <a
                href="https://wa.me/12148936969?text=Hola%2C%20quiero%20solicitar%20un%20taxi%20%F0%9F%9A%95."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-black font-bold px-7 py-4 rounded-full text-base border border-black/10 hover:border-black/20 transition duration-200 shadow-md"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Pedir Taxi</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Logo y mensaje de marca (MODIFICADA) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end lg:self-start mt-4 lg:-mt-24 xl:-mt-3 z-10">
            <div className="hero-script-wrap text-brand-yellow flex flex-col items-center sm:items-start drop-shadow-lg">
              
              {/* Contenedor Superior: Icono de persona+taxi al lado de "Dallas." */}
              <div className="flex items-end gap-3 sm:gap-4">
                <div className="relative w-32 h-24 sm:w-40 sm:h-28 lg:w-44 lg:h-32 mb-1 sm:mb-2">
                  <Image
                    src="/logo-taxi.svg"
                    alt="Hi Taxi Dallas"
                    fill
                    className="object-contain object-bottom drop-shadow-md"
                  />
                </div>
                <span className="hero-script hero-script-main leading-none pb-2 sm:pb-4">
                  Dallas.
                </span>
              </div>

              {/* Contenedor Inferior: Texto "Siempre en movimiento" */}
              <span className="hero-script hero-script-sub -mt-2 sm:-mt-4 sm:ml-6 text-center sm:text-left">
                Siempre en movimiento
              </span>
              
            </div>
          </div>

        </div>

        {/* Barra de Métricas de Confianza (Bottom Hero Bar) */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            
            {/* Métrica 1: Rating */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow font-bold text-xl">
                <Image src="/icons/rating.svg" alt="" width={20} height={19} />
              </div>
              <div>
                <div className="font-display text-2xl font-black text-white flex items-center gap-1">
                  4.9 <span className="text-brand-yellow text-lg">★</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">Valoración</div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-white/10" />

            {/* Métrica 2: Tiempo Promedio */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow font-bold text-sm">
                <Image src="/icons/wait-time.svg" alt="" width={20} height={20} />
              </div>
              <div>
                <div className="font-display text-2xl font-black text-white">&lt; 8 min</div>
                <div className="text-xs text-gray-400 font-medium">Tiempo promedio</div>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-white/10" />

            {/* Métrica 3: Disponibilidad */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow font-bold text-sm">
                <Image src="/icons/day-night.svg" alt="" width={20} height={20} />
              </div>
              <div>
                <div className="font-display text-2xl font-black text-white">24/7</div>
                <div className="text-xs text-gray-400 font-medium">Servicio disponible</div>
              </div>
            </div>

          </div>

          {/* Tags de Cobertura */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-400">
            <Image src="/icons/airport.svg" alt="" width={14} height={12} />
            <span className="text-gray-300">AEROPUERTOS</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">CENTRO</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300">TODO DALLAS</span>
          </div>
        </div>

      </div>
    </section>
  );
}