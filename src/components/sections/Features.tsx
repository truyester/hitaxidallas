import Image from "next/image";

export default function Features() {
  const featuresList = [
    {
      icon: "/icons/clock.svg",
      title: "Servicio 24/7",
      description:
        "Pide tu taxi a cualquier hora. Nuestro equipo coordina tu viaje y te mantiene informado.",
    },
    {
      icon: "/icons/navigation.svg",
      title: "Conocemos tu zona",
      description:
        "Conductores familiarizados con Dallas, Irving, Webb Chapel y las áreas donde prestamos servicio.",
    },
    {
      icon: "/icons/pricing.svg",
      title: "Tarifas claras",
      description:
        "Viaja con información sobre nuestras tarifas y opciones de pago antes de salir.",
    },
    {
      icon: "/icons/plane.svg",
      title: "Viajes al aeropuerto",
      description:
        "Te llevamos a DFW y Dallas Love Field, con espacio para tu equipaje según el vehículo.",
    },
  ];

  return (
    <section className="py-20 bg-brand-darkBg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/20">
            VIAJA CON HI TAXI
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white tracking-tight mt-3">
            Tu taxi en Dallas, cuando lo necesitas
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Servicio las 24 horas para tus viajes diarios, salidas y traslados al aeropuerto.
          </p>
        </div>

        {/* Grilla de 4 tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((item, index) => (
            <div
              key={index}
              className="bg-[#181b20] rounded-2xl border border-white/10 p-7 shadow-lg hover:border-brand-yellow/50 hover:bg-[#1d2127] transition duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 flex items-center justify-center mb-5 text-xl font-bold group-hover:scale-110 transition">
                <Image
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-brand-yellow transition">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}