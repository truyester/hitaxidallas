import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark-bg/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-16 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex shrink-0 items-center gap-1.5 md:gap-3 group">
          <Image
            src="/icons/logo-hi.svg"
            alt="HI TAXI"
            width={64}
            height={64}
            className="h-10 w-10 md:h-16 md:w-16 object-contain transition group-hover:scale-105"
          />
          <span className="font-display text-base md:text-xl font-bold tracking-tight text-white group-hover:text-brand-yellow transition">
            HI TAXI
          </span>
        </Link>

        {/* Links de Navegación para Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="#"
            className="text-sm font-medium text-white hover:text-brand-yellow transition-colors border-b-2 border-brand-yellow pb-1"
          >
            Inicio
          </Link>
          <Link
            href="#rates"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Tarifas
          </Link>
          <Link
            href="#fleet"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Nuestra Flota
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="#drive"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Conductores
          </Link>
        </nav>

        {/* Botones CTA de Llamada y Redes */}
        <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
          {/* Botón "Síguenos" (Beacons) */}
          <a
            href="https://beacons.ai/hitaxi.tx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Síguenos en Beacons"
            className="inline-flex items-center gap-1.5 md:gap-3 border border-brand-yellow bg-black/40 hover:bg-white/5 text-white font-bold px-2.5 md:px-5 py-2 md:py-2.5 rounded-full text-[11px] md:text-sm shadow-[0_0_15px_rgba(250,189,13,0.15)] hover:shadow-[0_0_22px_rgba(250,189,13,0.25)] transition duration-200 whitespace-nowrap"
          >
            {/* SVG del Logo de Beacons en amarillo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="h-3.5 w-3.5 md:h-4.5 md:w-4.5 fill-brand-yellow"
            >
              <circle cx="36" cy="24" r="24" />
              <circle cx="75" cy="65" r="25" />
              <circle cx="78" cy="21" r="11" />
              <circle cx="10" cy="57" r="10" />
              <circle cx="34" cy="85" r="15" />
            </svg>
            <span>Síguenos</span>
            <span className="text-brand-yellow font-black text-2xs md:text-xs ml-0.5">&gt;</span>
          </a>

          {/* Botón de Llamada */}
          <a
            href="tel:2148936969"
            className="inline-flex items-center gap-1 md:gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-black font-bold px-2.5 md:px-5 py-2 md:py-2.5 rounded-full text-[11px] md:text-sm shadow-[0_0_20px_rgba(250,189,13,0.3)] hover:shadow-[0_0_28px_rgba(250,189,13,0.5)] transition duration-200 whitespace-nowrap"
          >
            <svg
              className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="md:hidden">Llamar</span>
            <span className="hidden md:inline">Llamar al (214) 893-6969</span>
          </a>
        </div>
      </div>
    </header>
  );
}