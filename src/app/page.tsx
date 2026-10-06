import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FareEstimator from "@/components/sections/FareEstimator";
import Features from "@/components/sections/Features";
import FleetShowcase from "@/components/sections/FleetShowcase";
import Services from "@/components/sections/Services";
import DriverSignup from "@/components/sections/DriverSignup";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-darkBg text-white flex flex-col justify-between">
      <Navbar />
      <main>
        <Hero />
        <FareEstimator />
        <Features />
        <FleetShowcase />
        <Services />
        <DriverSignup />
      </main>
      <Footer />
    </div>
  );
}