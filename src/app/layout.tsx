import type { Metadata } from "next";
import { Inter, Montserrat, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hitaxidallas.com"),
  title: "Taxi en Dallas 24/7 | Hi Taxi Dallas, DFW y Love Field",
  description:
    "¿Buscas taxi en Dallas? Hi Taxi ofrece servicio 24/7, traslados locales y viajes a DFW y Love Field. Llama al (214) 893-6969.",
  keywords: [
    "taxi en Dallas",
    "Dallas taxi service",
    "taxi 24 horas Dallas",
    "taxi al aeropuerto DFW",
    "taxi Dallas Love Field",
    "traslados en Dallas",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    url: "https://hitaxidallas.com/",
    siteName: "Hi Taxi Dallas",
    title: "Taxi en Dallas 24/7 | Hi Taxi Dallas",
    description:
      "Servicio de taxi en Dallas las 24 horas, traslados locales y viajes a DFW y Love Field. Llama al (214) 893-6969.",
    images: [
      {
        url: "/images/hero-section.webp",
        width: 1200,
        height: 630,
        alt: "Servicio de taxi Hi Taxi Dallas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi en Dallas 24/7 | Hi Taxi Dallas",
    description:
      "Servicio de taxi en Dallas las 24 horas, traslados locales y viajes a DFW y Love Field.",
    images: ["/images/hero-section.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icons/logo-hi.svg",
    shortcut: "/icons/logo-hi.svg",
    apple: "/icons/logo-hi.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body 
        className={`${inter.variable} ${montserrat.variable} ${caveat.variable} font-sans bg-[#0b0e12] text-[#e1e2e8] antialiased selection:bg-[#fabd0d] selection:text-black`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              additionalType: "https://schema.org/TaxiService",
              name: "Hi Taxi Dallas",
              url: "https://hitaxidallas.com/",
              telephone: "+1-214-893-6969",
              image: "https://hitaxidallas.com/images/hero-section.webp",
              logo: "https://hitaxidallas.com/icons/logo-hi.svg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2351 W Northwest Hwy",
                addressLocality: "Dallas",
                addressRegion: "TX",
                postalCode: "75220",
                addressCountry: "US",
              },
              openingHours: "Mo-Su 00:00-23:59",
              areaServed: [
                { "@type": "City", name: "Dallas" },
                { "@type": "City", name: "Irving" },
                { "@type": "Place", name: "Webb Chapel, Dallas" },
                {
                  "@type": "Airport",
                  name: "Dallas/Fort Worth International Airport",
                },
                { "@type": "Airport", name: "Dallas Love Field" },
              ],
              sameAs: [
                "https://www.facebook.com/hitaxi.tx",
                "https://www.instagram.com/hitaxi.tx/",
                "https://www.youtube.com/channel/UCGTUc29b5rojRFUM6R7KQRg",
                "https://www.tiktok.com/@hitaxi.tx",
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}