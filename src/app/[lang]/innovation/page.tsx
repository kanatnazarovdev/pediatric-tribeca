/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Link from "next/link";

const categories = [
  {
    label: "Shield",
    title: "Preventive Innovation",
    description:
      "Architecting a future free of cavities using advanced molecular barriers.",
    services: [
      { name: "Pediatric Sealants", href: "/en/innovation/dental-sealants" },
      { name: "SDF Treatments", href: "/en/innovation/sdf" },
      { name: "Proactive Hygiene", href: "/en/innovation/hygiene" },
    ],
  },
  {
    label: "Precision",
    title: "Technological Edge",
    description:
      "Eliminating the fear of dentistry with needle-free laser precision.",
    services: [
      { name: "Solea® Laser", href: "/en/innovation/solea-laser" },
      { name: "Digital Impressioning", href: "/en/innovation/itero" },
      { name: "AI Diagnostics", href: "/en/innovation/ai-imaging" },
    ],
  },
  {
    label: "Vitality",
    title: "Developmental Growth",
    description:
      "Optimizing the airway and facial structure for long-term neural health.",
    services: [
      { name: "Palatal Expanders", href: "/en/innovation/expanders" },
      { name: "Airway Assessment", href: "/en/innovation/airway" },
      { name: "Myofunctional Therapy", href: "/en/innovation/myo" },
    ],
  },
];

export default function InnovationPage() {
  return (
    <main className="bg-[#F9F8F6] min-h-screen selection:bg-[#C5A059] selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] w-full flex items-end pb-12 overflow-hidden bg-black">
        {/* Background Video with subtle zoom effect */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.2] scale-105"
        >
          <source src="/innovation.mp4" type="video/mp4" />
        </video>

        {/* FIXED: Absolute Gradient for seamless transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/20 to-transparent z-[1]" />

        <div className="relative z-10 px-8 md:px-20 w-full">
          <div className="max-w-[1400px] mx-auto">
            <span className="text-[12px] uppercase tracking-[0.8em] text-[#C5A059] font-bold block mb-10 animate-pulse">
              Precision & Artistry
            </span>

            <h1 className="text-[14vw] md:text-[10rem] font-serif text-[#1A1A1A] leading-[0.8] tracking-[-0.05em] mb-4">
              Innovation in <br />
              <span className="italic font-extralight opacity-80 text-[#4add30]">
                Every Breath.
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* --- CONTENT & GRID SECTION --- */}
      <section className="py-24 px-8 md:px-20 max-w-[1400px] mx-auto">
        {/* Editorial Quote */}
        <div className="max-w-2xl mb-32">
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed font-brandon tracking-tight italic border-l-2 border-[#C5A059] pl-10 py-2">
            "We move beyond traditional dentistry, utilizing world-class
            technology to ensure your child’s experience is as cinematic as it
            is clinical."
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group relative bg-white p-10 md:p-14 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-gray-200 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-4"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-16">
                    <span className="w-8 h-[1px] bg-[#C5A059]" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-300">
                      Vertical 0{i + 1}
                    </span>
                  </div>

                  <h2 className="text-4xl font-serif text-[#1A1A1A] mb-8 group-hover:italic transition-all duration-500">
                    {cat.title}
                  </h2>
                  <p className="text-base text-gray-400 font-light leading-relaxed mb-16 font-brandon">
                    {cat.description}
                  </p>
                </div>

                {/* Refined Service List */}
                <ul className="space-y-6">
                  {cat.services.map((svc, si) => (
                    <li key={si}>
                      <Link
                        href={svc.href}
                        className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A] group/link border-b border-gray-50 pb-3 hover:border-[#C5A059] transition-all duration-500"
                      >
                        {svc.name}
                        <span className="translate-x-[-10px] opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-500 text-[#C5A059]">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer-level CTA */}
      <section className="py-10 text-center">
        <h3 className="text-sm uppercase tracking-[0.6em] text-gray-300 font-bold mb-8">
          Ready to experience the future?
        </h3>
        <a
          href="https://booking.adit.com/4dcced5c-07a5-4e12-b80f-d470bca99a63"
          target="_blank"
        >
          <button className="px-16 py-6 border border-[#1A1A1A] rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all duration-700">
            Book a Consultation
          </button>
        </a>
      </section>
    </main>
  );
}
