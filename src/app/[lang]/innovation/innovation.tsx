/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const categories = (lang: string) => [
  {
    label: "Shield",
    title: lang === "es" ? "Innovación Preventiva" : "Preventive Innovation",
    description:
      lang === "es"
        ? "Arquitectando un futuro libre de caries utilizando barreras moleculares avanzadas."
        : "Architecting a future free of cavities using advanced molecular barriers.",
    services: [
      "Pediatric Sealants",
      "SDF Treatments",
      "Proactive Hygiene",
      "Curodont™ Repair Fluoride Plus",
    ],
  },
  {
    label: "Precision",
    title: lang === "es" ? "Vanguardia Tecnológica" : "Technological Edge",
    description:
      lang === "es"
        ? "Eliminando el miedo a la odontología con precisión láser sin agujas."
        : "Eliminating the fear of dentistry with needle-free laser precision.",
    services: ["Biolase Laser", "Digital Impressioning", "AI Diagnostics"],
  },
  {
    label: "Vitality",
    title:
      lang === "es" ? "Crecimiento del Desarrollo" : "Developmental Growth",
    description:
      lang === "es"
        ? "Optimizando las vías respiratorias y la estructura facial para la salud neural a largo plazo."
        : "Optimizing the airway and facial structure for long-term neural health.",
    services: [
      "Palatal Expanders",
      "Airway Assessment",
      "Myofunctional Therapy",
    ],
  },
];

export default function InnovationPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const data = categories(lang);
  const isEs = lang === "es";

  return (
    <main className="bg-[#F9F8F6] min-h-screen selection:bg-[#C5A059] selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] w-full flex items-end pb-12 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.2] scale-105"
        >
          <source src="/innovation.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/20 to-transparent z-[1]" />

        <div className="relative z-10 px-8 md:px-20 w-full">
          <div className="max-w-[1400px] mx-auto">
            <span className="text-[12px] uppercase tracking-[0.8em] text-[#C5A059] font-bold block mb-10 animate-pulse">
              {isEs ? "Precisión y Arte" : "Precision & Artistry"}
            </span>

            <h1 className="text-[12vw] md:text-[10rem] font-serif text-[#1A1A1A] leading-[0.8] tracking-[-0.05em] mb-4">
              {isEs ? "Innovación en" : "Innovation in"} <br />
              <span className="italic font-extralight opacity-80 text-[#4add30]">
                {isEs ? "Cada Respiro." : "Every Breath."}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 px-8 md:px-20 max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-32">
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed font-brandon tracking-tight italic border-l-2 border-[#C5A059] pl-10 py-2">
            {isEs
              ? '"Nos movemos más allá de la odontología tradicional, utilizando tecnología de clase mundial para asegurar que la experiencia de su hijo sea tan cinematográfica como clínica."'
              : '"We move beyond traditional dentistry, utilizing world-class technology to ensure your child’s experience is as cinematic as it is clinical."'}
          </p>
        </div>

        {/* --- CATEGORY GRID (No dead links) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {data.map((cat, i) => (
            <div
              key={i}
              className="group relative bg-white p-10 md:p-14 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-1000"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-16">
                    <span className="w-8 h-[1px] bg-[#C5A059]" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-300">
                      Vertical 0{i + 1}
                    </span>
                  </div>

                  <h2 className="text-4xl font-serif text-[#1A1A1A] mb-8">
                    {cat.title}
                  </h2>
                  <p className="text-base text-gray-400 font-light leading-relaxed mb-16 font-brandon">
                    {cat.description}
                  </p>
                </div>

                {/* --- Inside the CATEGORY GRID map loop --- */}

                <ul className="space-y-6">
                  {cat.services.map((svcName, si) => {
                    // Check if the service is Curodont to make it a link
                    const isCurodont =
                      svcName === "Curodont™ Repair Fluoride Plus";

                    // Content structure
                    const content = (
                      <>
                        {svcName}
                        <span
                          className={`w-1.5 h-1.5 rounded-full bg-[#C5A059] ${isCurodont ? "opacity-100 animate-pulse" : "opacity-20"}`}
                        />
                      </>
                    );

                    return (
                      <li
                        key={si}
                        className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A] border-b border-gray-50 pb-3"
                      >
                        {isCurodont ? (
                          <Link
                            href={`/${lang}/innovation/curodont`}
                            className="flex items-center justify-between hover:text-[#C5A059] transition-colors duration-300"
                          >
                            {content}
                          </Link>
                        ) : (
                          <div className="flex items-center justify-between opacity-60">
                            {content}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 text-center">
        <h3 className="text-sm uppercase tracking-[0.6em] text-gray-300 font-bold mb-8">
          {isEs
            ? "¿Listo para experimentar el futuro?"
            : "Ready to experience the future?"}
        </h3>
        <a
          href="https://booking.adit.com/4dcced5c-07a5-4e12-b80f-d470bca99a63"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-16 py-6 border border-[#1A1A1A] rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all duration-700">
            {isEs ? "Reserve una Consulta" : "Book a Consultation"}
          </button>
        </a>
      </section>
    </main>
  );
}
