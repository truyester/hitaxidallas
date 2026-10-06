import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark-bg/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 md:gap-3 group">
          <Image
            src="/icons/logo%20hi.svg"
            alt="HI TAXI"
            width={64}
            height={64}
            className="h-12 w-12 md:h-16 md:w-16 object-contain transition group-hover:scale-105"
          />
          <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-brand-yellow transition">
          HI TAXI
          </span>
        </Link>

        {/* Links de Navegación para Desktop */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Botón CTA de Llamada Directa */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="https://beacons.ai/hitaxi.tx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a Beacons de Hi Taxi"
            className="inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full border border-brand-yellow/30 bg-white/5 text-brand-yellow shadow-[0_0_18px_rgba(250,189,13,0.15)] transition hover:bg-white/10"
          >
            <Image
              src="/icons/beacons.svg"
              alt="Beacons"
              width={18}
              height={18}
              className="h-4 w-4 md:h-4.5 md:w-4.5 object-contain"
            />
          </a>

          <a
            href="tel:2148936969"
            className="inline-flex items-center gap-1.5 md:gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-black font-bold px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm shadow-[0_0_20px_rgba(250,189,13,0.3)] hover:shadow-[0_0_28px_rgba(250,189,13,0.5)] transition duration-200 whitespace-nowrap"
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