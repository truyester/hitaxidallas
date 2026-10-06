import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-darkBg border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo y Dirección */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/logo%20hi.svg"
                alt="HI TAXI"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-display font-bold text-white text-base">
                HI TAXI 
              </span>
            </div>
            <span className="hidden sm:inline text-gray-600">|</span>
            <p className="text-xs text-gray-400">
              2351 W Northwest Hwy, Dallas, TX 75220
            </p>
          </div>

          {/* Teléfono y Enlaces Legales */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <a
              href="tel:2148936969"
              className="font-bold text-brand-yellow hover:underline transition"
            >
              Línea Directa: (214) 893-6969
            </a>
            <Link href="#" className="hover:text-white transition">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-white transition">
              Términos de Servicio
            </Link>
          </div>

          <nav aria-label="Redes sociales" className="flex items-center gap-2.5">
            <a
              href="https://www.facebook.com/hitaxi.tx"
              aria-label="Facebook"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center text-brand-yellow transition hover:-translate-y-0.5 hover:text-brand-yellowHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.7v8z" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hitaxi.tx/"
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center text-brand-yellow transition hover:-translate-y-0.5 hover:text-brand-yellowHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCGTUc29b5rojRFUM6R7KQRg"
              aria-label="YouTube"
              title="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center text-brand-yellow transition hover:-translate-y-0.5 hover:text-brand-yellowHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" fill="currentColor" />
                <path d="m9.6 15.6 6.2-3.6-6.2-3.6v7.2Z" fill="#0b0e12" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@hitaxi.tx"
              aria-label="TikTok"
              title="TikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center text-brand-yellow transition hover:-translate-y-0.5 hover:text-brand-yellowHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M19.6 5.3a5.2 5.2 0 0 1-3.4-3.5V1h-4.1v14.4a2.5 2.5 0 1 1-2.5-2.5c.4 0 .8.1 1.1.2V9a7 7 0 1 0 5.5 6.8V8.5a9.2 9.2 0 0 0 5.2 1.6V6a5.2 5.2 0 0 1-1.8-.7Z" fill="currentColor" />
              </svg>
            </a>
          </nav>

        </div>

        {/* Derechos de Autor y Licencia */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>
            © 2026 Hi Taxi, Dallas. Todos los derechos reservados. Operador de Taxi Autorizado en Dallas. 
          </p>
          <p>
            Brindando servicio en Dallas, Irving, Webb Chapel y Aeropuerto DFW.
          </p>
        </div>

        <div className="mt-3 flex justify-end text-xs text-gray-500">
          <p>
            Powered by {" "}
            <a
              href="https://truyester.com"
              target="_blank"
              rel="noreferrer"
              className="text-brand-yellow hover:underline transition"
            >
             Truyester
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}