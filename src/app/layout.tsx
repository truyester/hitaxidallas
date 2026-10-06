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
  title: "Hi! Taxi Dallas | Tu taxi de confianza 24/7 en Dallas",
  description: "Transporte ejecutivo, seguro y rápido en Dallas. Servicio de taxi 24/7, traslados al aeropuerto DFW y entregas urgentes.",
  icons: {
    icon: "/logo-taxi.svg",
    shortcut: "/logo-taxi.svg",
    apple: "/logo-taxi.svg",
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
        {children}
      </body>
    </html>
  );
}