/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ServiceItem {
  name: string;
  href?: string;
  isFeatured?: boolean;
}

interface Category {
  label: string;
  title: string;
  description: string;
  services: ServiceItem[];
}

const getCategories = (lang: string): Category[] => [
  {
    label: "Shield",
    title: lang === "zh" ? "预防与保护" : lang === "es" ? "Cuidado Preventivo" : "Preventive Care",
    description:
      lang === "zh"
        ? "利用先进的分子屏障与预防技术，构建无龋齿的健康未来。"
        : lang === "es"
        ? "Arquitectando un futuro libre de caries utilizando barreras moleculares y cuidados preventivos avanzados."
        : "Architecting a future free of cavities using advanced molecular barriers and preventive care.",
    services: [
      { name: lang === "zh" ? "儿童窝沟封闭" : "Pediatric Sealants" },
      { name: lang === "zh" ? "SDF 预防性治疗" : "SDF Treatments" },
      { name: lang === "zh" ? "主动口腔卫生护理" : "Proactive Hygiene" },
      { 
        name: "Curodont™ Repair Fluoride Plus", 
        href: `/${lang}/services/curodont`,
        isFeatured: true 
      },
    ],
  },
  {
    label: "Precision",
    title: lang === "zh" ? "无痛与微创技术" : lang === "es" ? "Odontología Láser y Digital" : "Laser & Digital Dentistry",
    description:
      lang === "zh"
        ? "通过无针 Biolase 激光与 3D 快速扫描，彻底消除看牙恐惧。"
        : lang === "es"
        ? "Eliminando el miedo a la odontología con precisión láser Biolase sin agujas y escaneos digitales."
        : "Eliminating the fear of dentistry with needle-free Biolase laser precision and 3D digital scanning.",
    services: [
      { name: lang === "zh" ? "Biolase 激光无痛诊疗" : "Biolase Laser" },
      { name: lang === "zh" ? "iTero 3D 数码印模" : "3D Digital Impressioning" },
    ],
  },
  {
    label: "Vitality",
    title: lang === "zh" ? "早期正畸与气道发育" : lang === "es" ? "Ortodoncia Temprana y Vías Respiratorias" : "Early Orthodontics & Airway",
    description:
      lang === "zh"
        ? "优化气道与颌面结构发育，助力长期的全身体质与面部美学健康。"
        : lang === "es"
        ? "Optimizando las vías respiratorias y el desarrollo facial para la salud y armonía estética a largo plazo."
        : "Optimizing the airway and facial development for long-term health, breathing, and smile symmetry.",
    services: [
      { 
        name: lang === "zh" ? "上颌扩弓器 (Phase 1)" : "Palatal Expanders (Phase 1)",
        href: `/${lang}/services/orthodontics` 
      },
      { 
        name: lang === "zh" ? "气道与呼吸发育评估" : "Airway & Growth Assessment",
        href: `/${lang}/services/orthodontics` 
      },
      { 
        name: lang === "zh" ? "肌功能训练与正畸" : "Myofunctional Therapy & Ortho",
        href: `/${lang}/services/orthodontics` 
      },
    ],
  },
];

export default function ServicesPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const data = getCategories(lang);
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
            <span className="text-[12px] uppercase tracking-[0.8em] text-[#C5A059] font-bold block mb-10 animate-pulse font-ddin">
              {isZh ? "卓越诊疗与艺术" : isEs ? "Excelencia y Cuidado" : "Clinical Excellence & Care"}
            </span>

            <h1 className="text-[12vw] md:text-[10rem] font-serif text-[#1A1A1A] leading-[0.8] tracking-[-0.05em] mb-4">
              {isZh ? "诊疗服务" : isEs ? "Nuestros" : "Pediatric"} <br />
              <span className="italic font-extralight opacity-80 text-[#C5A059]">
                {isZh ? "全方位呵护。" : isEs ? "Servicios." : "Services."}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 px-8 md:px-20 max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-32">
          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed font-brandon tracking-tight italic border-l-2 border-[#C5A059] pl-10 py-2">
            {isZh 
              ? '"我们超越了传统牙科，利用世界一流的技术与儿童专属护理，确保您孩子的诊疗体验既轻松舒适，又具最高临床水准。"'
              : isEs
              ? '"Vamos más allá de la odontología tradicional, utilizando tecnología de clase mundial para garantizar que la experiencia de su hijo sea tan cómoda como clínicamente perfecta."'
              : '"We move beyond traditional dentistry, utilizing world-class technology to ensure your child’s experience is as gentle and seamless as it is clinically exceptional."'}
          </p>
        </div>

        {/* --- CATEGORY GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {data.map((cat, i) => (
            <div
              key={i}
              className="group relative bg-white p-10 md:p-14 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-700 hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)]"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-16">
                    <span className="w-8 h-[1px] bg-[#C5A059]" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-300 font-ddin">
                      Service Area 0{i + 1}
                    </span>
                  </div>

                  <h2 className="text-4xl font-serif text-[#1A1A1A] mb-8 font-ddin uppercase">
                    {cat.title}
                  </h2>
                  <p className="text-base text-gray-400 font-light leading-relaxed mb-16 font-brandon">
                    {cat.description}
                  </p>
                </div>

                <ul className="space-y-6">
                  {cat.services.map((svc, si) => {
                    const content = (
                      <div className="flex items-center justify-between w-full">
                        <span>{svc.name}</span>
                        <div className="flex items-center gap-2">
                          {svc.href && (
                            <span className="text-xs transition-transform duration-300 group-hover/link:translate-x-1">
                              →
                            </span>
                          )}
                          <span
                            className={`w-1.5 h-1.5 rounded-full bg-[#C5A059] ${
                              svc.isFeatured ? "opacity-100 animate-pulse" : "opacity-30"
                            }`}
                          />
                        </div>
                      </div>
                    );

                    return (
                      <li
                        key={si}
                        className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A] border-b border-gray-50 pb-3 font-ddin"
                      >
                        {svc.href ? (
                          <Link
                            href={svc.href}
                            className="group/link flex items-center justify-between hover:text-[#C5A059] transition-colors duration-300 cursor-pointer"
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
        <h3 className="text-sm uppercase tracking-[0.6em] text-gray-400 font-bold mb-8 font-ddin">
          {isZh ? "准备好为孩子预约关怀了吗？" : isEs ? "¿Listo para agendar la visita de su hijo?" : "Ready to schedule your child's visit?"}
        </h3>
        <a
          href="https://truelark.com/bookonline/#/location?businessId=80613"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-16 py-6 border border-[#1A1A1A] rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-all duration-700 font-ddin">
            {isZh ? "立即预约咨询" : isEs ? "Reserve una Consulta" : "Book a Consultation"}
          </button>
        </a>
      </section>
    </main>
  );
}