/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const categories = (lang: string) => [
  {
    label: "Shield",
    title: lang === "zh" ? "预防创新" : lang === "es" ? "Innovación Preventiva" : "Preventive Innovation",
    description:
      lang === "zh"
        ? "利用先进的分子屏障技术，构建无龋齿的健康未来。"
        : lang === "es"
        ? "Arquitectando un futuro libre de caries utilizando barreras moleculares avanzadas."
        : "Architecting a future free of cavities using advanced molecular barriers.",
    services: [
      lang === "zh" ? "儿童窝沟封闭" : "Pediatric Sealants",
      lang === "zh" ? "SDF 预防性治疗" : "SDF Treatments",
      lang === "zh" ? "主动口腔卫生护理" : "Proactive Hygiene",
      "Curodont™ Repair Fluoride Plus",
    ],
  },
  {
    label: "Precision",
    title: lang === "zh" ? "技术优势" : lang === "es" ? "Vanguardia Tecnológica" : "Technological Edge",
    description:
      lang === "zh"
        ? "通过无针激光精准治疗，彻底消除看牙恐惧。"
        : lang === "es"
        ? "Eliminando el miedo a la odontología con precisión láser sin agujas."
        : "Eliminating the fear of dentistry with needle-free laser precision.",
    services: [
      lang === "zh" ? "Biolase 激光技术" : "Biolase Laser", 
      lang === "zh" ? "数码印模技术" : "Digital Impressioning", 
    ],
  },
  {
    label: "Vitality",
    title: lang === "zh" ? "发育成长" : lang === "es" ? "Crecimiento del Desarrollo" : "Developmental Growth",
    description:
      lang === "zh"
        ? "优化气道与面部结构，助力长期的神经系统健康。"
        : lang === "es"
        ? "Optimizando las vías respiratorias y la estructura facial para la salud neural a largo plazo."
        : "Optimizing the airway and facial structure for long-term neural health.",
    services: [
      lang === "zh" ? "上颌扩张器" : "Palatal Expanders",
      lang === "zh" ? "气道发育评估" : "Airway Assessment",
      lang === "zh" ? "肌功能训练" : "Myofunctional Therapy",
    ],
  },
];

export default function InnovationPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const data = categories(lang);
  const isEs = lang === "es";
  const isZh = lang === "zh";

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
              {isZh ? "精准与艺术" : isEs ? "Precisión y Arte" : "Precision & Artistry"}
            </span>

            <h1 className="text-[12vw] md:text-[10rem] font-serif text-[#1A1A1A] leading-[0.8] tracking-[-0.05em] mb-4">
              {isZh ? "创新" : isEs ? "Innovación en" : "Innovation in"} <br />
              <span className="italic font-extralight opacity-80 text-[#4add30]">
                {isZh ? "每一次呼吸。" : isEs ? "Cada Respiro." : "Every Breath."}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 px-8 md:px-20 max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-32">
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed font-brandon tracking-tight italic border-l-2 border-[#C5A059] pl-10 py-2">
            {isZh 
              ? '"我们超越了传统牙科，利用世界一流的技术，确保您孩子的诊疗体验既具艺术感又具临床专业性。"'
              : isEs
              ? '"Nos movemos más allá de la odontología tradicional, utilizando tecnología de clase mundial para asegurar que la experiencia de su hijo sea tan cinematográfica como clínica."'
              : '"We move beyond traditional dentistry, utilizing world-class technology to ensure your child’s experience is as cinematic as it is clinical."'}
          </p>
        </div>

        {/* --- CATEGORY GRID --- */}
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

                <ul className="space-y-6">
                  {cat.services.map((svcName, si) => {
                    const isCurodont = svcName === "Curodont™ Repair Fluoride Plus";
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
          {isZh ? "准备好体验未来了吗？" : isEs ? "¿Listo para experimentar el futuro?" : "Ready to experience the future?"}
        </h3>
        <a
          href="https://www.patientsreach.com/schedule/TribecaDentalStudio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-16 py-6 border border-[#1A1A1A] rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all duration-700">
            {isZh ? "立即预约咨询" : isEs ? "Reserve una Consulta" : "Book a Consultation"}
          </button>
        </a>
      </section>
    </main>
  );
}