"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface PediatricOrthoPageProps {
  lang: string;
}

const COPY = {
  en: {
    eyebrow: "Tribeca Dental Studio 4 Kids",
    title: "Pediatric Orthodontics in Tribeca, NYC",
    subtitle:
      "Guiding healthy smiles from early growth to confident teenage years in a gentle, stress-free environment.",
    ctaBook: "Schedule an Ortho Consultation",
    ctaCall: "Call 212-561-5303",

    // Why Choose Us Section
    whyTitle: "Why Parents Trust Tribeca Dental Studio 4 Kids",
    whySub: "Specialized Orthodontic Excellence Engineered for Growing Smiles",
    features: [
      {
        num: "01",
        title: "Pediatric-Focused Specialists",
        desc: "Our board-certified orthodontists specialize exclusively in childhood jaw growth, early airway awareness, and developing dentition.",
      },
      {
        num: "02",
        title: "Early Phase 1 Intervention",
        desc: "By monitoring jaw development from age 7, we often prevent complex extractions or surgical needs later in adolescence.",
      },
      {
        num: "03",
        title: "Invisalign® First & Teen Certified",
        desc: "Discreet, removable clear aligners customized specifically for expanding growing arches and active young lifestyles.",
      },
      {
        num: "04",
        title: "Integrated Multi-Specialty Care",
        desc: "Your child’s pediatric dentist and orthodontist collaborate under one roof in Tribeca, ensuring seamless communication and visits.",
      },
    ],

    // Treatments Section
    treatmentsTitle: "Tailored Treatments for Every Age",
    treatments: [
      {
        age: "Ages 6–9",
        name: "Phase 1 / Preventive Orthodontics",
        desc: "Guided jaw expansion, crossbite correction, and space maintenance to pave the way for natural permanent tooth eruption.",
      },
      {
        age: "Ages 10–13",
        name: "Comprehensive Teen Orthodontics",
        desc: "Full arch alignment utilizing modern low-profile braces or clear aligners to refine bite functionality and smile symmetry.",
      },
      {
        age: "Teens & Adolescents",
        name: "Clear Aligner Therapy (Invisalign®)",
        desc: "Virtually invisible, comfortable aligners that allow teens to eat, brush, and play sports without metal bracket interference.",
      },
    ],

    // Banner CTA
    bannerTitle: "Start Your Child’s Orthodontic Journey Today",
    bannerDesc: "The American Association of Orthodontists recommends a first evaluation by age 7. Book a complimentary assessment at our Tribeca studio.",
  },
  es: {
    eyebrow: "Tribeca Dental Studio 4 Kids",
    title: "Ortodoncia Pediátrica en Tribeca, NYC",
    subtitle:
      "Guiando sonrisas saludables desde el crecimiento temprano hasta la adolescencia en un ambiente cálido y sin estrés.",
    ctaBook: "Reservar Consulta de Ortodoncia",
    ctaCall: "Llamar al 212-561-5303",

    whyTitle: "Por qué los Padres Confían en Tribeca Dental Studio 4 Kids",
    whySub: "Excelencia Ortodóncica Especializada Diseñada para Sonrisas en Crecimiento",
    features: [
      {
        num: "01",
        title: "Especialistas Pediátricos",
        desc: "Nuestros ortodoncistas certificados se especializan exclusivamente en el desarrollo maxilar y dental de niños y adolescentes.",
      },
      {
        num: "02",
        title: "Intervención Temprana Fase 1",
        desc: "Evaluamos el desarrollo desde los 7 años para prevenir extracciones complejas o cirugías en la adolescencia.",
      },
      {
        num: "03",
        title: "Certificados en Invisalign® First y Teen",
        desc: "Alineadores transparentes y removibles diseñados a medida para arcos en crecimiento y estilos de vida activos.",
      },
      {
        num: "04",
        title: "Atención Multiespecialidad Integrada",
        desc: "El odontopediatra y el ortodoncista de su hijo colaboran bajo un mismo techo en Tribeca para una atención fluida.",
      },
    ],

    treatmentsTitle: "Tratamientos Personalizados para Cada Etapa",
    treatments: [
      {
        age: "Edades 6–9",
        name: "Fase 1 / Ortodoncia Preventiva",
        desc: "Expansión maxilar guiada y corrección de mordida cruzada para facilitar la erupción de los dientes permanentes.",
      },
      {
        age: "Edades 10–13",
        name: "Ortodoncia Integral para Adolescentes",
        desc: "Alineación completa mediante brackets de bajo perfil o alineadores transparentes para una funcionalidad perfecta.",
      },
      {
        age: "Adolescentes",
        name: "Alineadores Transparentes (Invisalign®)",
        desc: "Alineadores cómodos y prácticamente invisibles que permiten comer, cepillarse y hacer deporte sin molestias.",
      },
    ],

    bannerTitle: "Comience el Viaje de Ortodoncia de su Hijo",
    bannerDesc: "La Asociación Americana de Ortodoncistas recomienda una primera evaluación a los 7 años. Reserve su cita en Tribeca.",
  },
  zh: {
    eyebrow: "翠贝卡儿童牙科中心",
    title: "纽约翠贝卡儿童与青少年正畸",
    subtitle:
      "在温馨舒适的环境中，为孩子从颌骨发育到青少年时期提供专业、轻松的牙齿矫正方案。",
    ctaBook: "预约儿童正畸咨询",
    ctaCall: "致电 212-561-5303",

    whyTitle: "为什么家长信赖 Tribeca Dental Studio 4 Kids",
    whySub: "专为生长发育期儿童打造的精细化正畸体验",
    features: [
      {
        num: "01",
        title: "资深儿童正畸专家团队",
        desc: "我们的持证正畸医生专注儿童及青少年颌骨发育、早期气道引导与牙齿排齐。",
      },
      {
        num: "02",
        title: "第一阶段（Phase 1）早期干预",
        desc: "从7岁开始监测颌骨发育，早期引导咬合，有效降低青少年时期复杂拔牙或手术的概率。",
      },
      {
        num: "03",
        title: "Invisalign® First & Teen 隐形矫正认证",
        desc: "专为儿童及青少年定制的隐形牙套，美观舒适，不影响日常饮食与体育活动。",
      },
      {
        num: "04",
        title: "多专科无缝协作诊疗",
        desc: "儿童牙医与正畸专家在翠贝卡诊所同一屋檐下紧密配合，提供一体化全周期口腔管理。",
      },
    ],

    treatmentsTitle: "分阶段定制正畸方案",
    treatments: [
      {
        age: "6–9 岁",
        name: "第一阶段早期预防性正畸 (Phase 1)",
        desc: "引导颌骨扩弓与反颌（地包天）矫正，为恒牙自然萌出预留充足空间。",
      },
      {
        age: "10–13 岁",
        name: "青少年综合牙齿矫正",
        desc: "采用舒适低调的托槽或隐形矫治器，全面改善咬合功能与面部美学对称性。",
      },
      {
        age: "青少年",
        name: "Invisalign® 隐形矫正",
        desc: "近乎隐形的透明牙套，随时自行摘戴，轻松保持口腔清洁，无金属摩擦不适。",
      },
    ],

    bannerTitle: "开启孩子的健康美学矫正之旅",
    bannerDesc: "美国正畸医师协会建议儿童在7岁前完成首次正畸评估。欢迎预约翠贝卡诊所正畸咨询。",
  },
} as const;

export default function PediatricOrthodonticsPage({ lang }: PediatricOrthoPageProps) {
  const l = (["en", "es", "zh"].includes(lang) ? lang : "en") as "en" | "es" | "zh";
  const t = COPY[l];

  return (
    <main className="w-full bg-white text-black font-ddin">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-start bg-[#0B0B0B] text-white px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* HERO BACKGROUND IMAGE OVERLAY */}
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 filter grayscale" style={{ backgroundImage: "url('/pediatric-hero.jpg')" }} />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/80 to-transparent" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 max-w-2xl py-20"
        >
          <span className="font-ddin font-bold text-xs uppercase tracking-[0.3em] text-[#C5A059] block mb-4">
            {t.eyebrow}
          </span>

          <h1 className="font-ddin font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.05] mb-6">
            {t.title}
          </h1>

          <p className="font-brandon text-lg sm:text-xl font-normal text-neutral-300 leading-relaxed mb-10">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="https://truelark.com/bookonline/#/location?businessId=80613"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#C5A059] hover:bg-white text-black font-ddin font-bold uppercase tracking-[0.2em] text-xs px-8 py-4 transition-all duration-300"
            >
              {t.ctaBook}
            </a>

            <a
              href="tel:2125615303"
              className="inline-flex items-center justify-center border border-white/30 hover:border-[#C5A059] text-white font-ddin font-bold uppercase tracking-[0.2em] text-xs px-8 py-4 transition-all duration-300"
            >
              {t.ctaCall}
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. WHY CHOOSE TRIBECA DENTAL STUDIO 4 KIDS */}
      <section className="w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#FBFBFA] border-b border-black/5">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="font-ddin font-bold text-xs uppercase tracking-[0.2em] text-neutral-500 block mb-3">
            {t.whySub}
          </span>
          <h2 className="font-ddin font-bold text-3xl md:text-5xl text-black uppercase tracking-tight">
            {t.whyTitle}
          </h2>
        </div>

        {/* 4-COLUMN FEATURE GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {t.features.map((feature, idx) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="bg-white p-8 border border-black/5 flex flex-col justify-between"
            >
              <div>
                <span className="font-ddin font-bold text-sm text-[#C5A059] block mb-4">
                  {feature.num} //
                </span>
                <h3 className="font-ddin font-bold text-xl text-black uppercase mb-3">
                  {feature.title}
                </h3>
                <p className="font-brandon text-sm text-neutral-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. TREATMENTS BY AGE STAGE */}
      <section className="w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-ddin font-bold text-3xl md:text-5xl text-black uppercase tracking-tight">
            {t.treatmentsTitle}
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-black/10 max-w-7xl mx-auto">
          {t.treatments.map((item, index) => (
            <div
              key={index}
              className={`p-8 md:p-10 flex flex-col justify-between bg-white ${
                index !== t.treatments.length - 1 ? "md:border-r border-black/10" : ""
              }`}
            >
              <div>
                <span className="inline-block bg-black text-white font-ddin font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1 mb-6">
                  {item.age}
                </span>
                <h3 className="font-ddin font-bold text-xl md:text-2xl text-black uppercase mb-4">
                  {item.name}
                </h3>
                <p className="font-brandon text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOTTOM BOOKING CTA BANNER */}
      <section className="w-full py-20 bg-[#0B0B0B] text-white px-6 md:px-12 lg:px-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-ddin font-bold text-3xl md:text-5xl uppercase tracking-tight mb-6">
            {t.bannerTitle}
          </h2>
          <p className="font-brandon text-base md:text-lg text-neutral-300 leading-relaxed mb-10">
            {t.bannerDesc}
          </p>
          <a
            href="https://truelark.com/bookonline/#/location?businessId=80613"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C5A059] hover:bg-white text-black font-ddin font-bold uppercase tracking-[0.2em] text-xs px-10 py-5 transition-all duration-300"
          >
            {t.ctaBook}
          </a>
        </div>
      </section>

    </main>
  );
}