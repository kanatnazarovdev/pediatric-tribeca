"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, use } from "react";
import StoryCard from "./StoryCard";

export default function CommunityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const containerRef = useRef(null);
  
  const isZh = lang === "zh";
  const isEs = lang === "es";

  const STORIES = [
    {
      id: "1",
      slug: "pre-k-visit",
      title: isZh ? "幼儿园走进诊所工作坊" : isEs ? "Taller para Pre-Kinder" : "The Pre-K Workshop",
      location: isZh ? "翠贝卡幼儿园" : isEs ? "Preescolar de TriBeCa" : "TriBeCa Preschool",
      date: isZh ? "2026年3月" : isEs ? "MARZO 2026" : "MARCH 2026",
      thumbnail: "/stills/thumbnail.webp",
    },
  ];

  const PILLARS = [
    {
      num: "01",
      title: isZh ? "消除恐惧" : isEs ? "Desmitificación" : "Demystification",
      text: isZh 
        ? "将临床知识带进教室，在孩子第一次就诊前，将“恐惧”转化为好奇心。" 
        : isEs 
        ? "Llevamos el conocimiento clínico a las aulas para convertir el 'miedo' en curiosidad antes de la primera visita." 
        : "Bringing clinical knowledge into classrooms to turn 'fear' into curiosity before the first visit.",
    },
    {
      num: "02",
      title: isZh ? "社区伙伴" : isEs ? "Alianzas" : "Partnership",
      text: isZh 
        ? "通过与当地幼儿园和学校建立联盟，在孩子们最舒适的环境中与他们见面。" 
        : isEs 
        ? "Nos encontramos con los niños en sus entornos más cómodos a través de alianzas con escuelas y Pre-K locales." 
        : "Meeting children in their most comfortable environments through local Pre-K and school alliances.",
    },
    {
      num: "03",
      title: isZh ? "视觉真实" : isEs ? "Verdad Visual" : "Visual Truth",
      text: isZh 
        ? "利用电影级影像记录并分享高端儿童牙科诊疗的真实过程。" 
        : isEs 
        ? "Utilizamos producción cinematográfica para documentar y compartir la realidad del cuidado pediátrico de alta gama." 
        : "Utilizing cinematic production to document and share the reality of high-end pediatric care.",
    },
  ];

  const STATS = [
    { val: "12+", label: isZh ? "合作学校" : isEs ? "Escuelas Asociadas" : "Partner Schools" },
    { val: "500+", label: isZh ? "受教儿童" : isEs ? "Niños Educados" : "Kids Educated" },
    { val: "100%", label: isZh ? "临床透明度" : isEs ? "Transparencia Clínica" : "Clinical Transparency" },
    { val: "NYC", label: isZh ? "扎根翠贝卡" : isEs ? "Raíces en TriBeCa" : "TriBeCa Rooted" },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentFade = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="min-h-screen bg-white" ref={containerRef}>
      {/* HERO / MISSION SECTION */}
      <motion.section
        initial={{ backgroundColor: "#FFFFFF" }}
        whileInView={{ backgroundColor: "#0A0A0A" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative pt-64 pb-48 overflow-hidden"
      >
        <motion.div
          style={{ y: backgroundY, opacity: videoOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0A0A0A] z-10" />
          <video
            autoPlay
            loop
            muted
            preload="auto"
            playsInline
            poster="/mission.webp"
            className="w-full h-[120%] object-cover object-center"
          >
            <source src="/mission.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div 
          style={{ opacity: contentFade }}
          className="max-w-6xl mx-auto px-6 relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="border-l border-[#C5A059]/40 pl-8 md:pl-12 mb-32"
          >
            <h1 className="text-[#C5A059] text-[11px] uppercase tracking-[0.8em] mb-12 font-bold block">
              {isZh ? "我们的使命" : isEs ? "Nuestra Misión" : "Our Mission"}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-white text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] italic tracking-tighter max-w-5xl"
            >
              {isZh 
                ? "“我们不只是在行医，我们是在构建儿童健康的未来。”" 
                : isEs 
                ? "“No solo practicamos la odontología; diseñamos el futuro del bienestar infantil”." 
                : "“We don't just practice dentistry; we architect the future of childhood wellness.”"}
            </motion.p>
          </motion.div>

          {/* THE THREE PILLARS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 border-t border-white/10 pt-20">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="group cursor-default"
              >
                <h3 className="text-[#C5A059] text-[13px] font-semibold mb-6 uppercase tracking-[0.4em] group-hover:tracking-[0.5em] transition-all duration-500">
                  {pillar.num} / {pillar.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-lg group-hover:text-white transition-colors duration-500">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* RECENT STORIES SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-48 bg-white relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-24 md:mb-40 border-b border-black/10 pb-10 gap-6"
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase text-black leading-none">
            {isZh ? "近期" : isEs ? "Historias" : "Recent"} <span className="italic font-serif">{isZh ? "故事" : isEs ? "Recientes" : "Stories"}</span>
          </h2>
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-gray-400 font-bold">
            {isZh ? "纪实系列" : isEs ? "Serie Documental" : "Documentation Series"}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-32 md:gap-64">
          {STORIES.map((story) => (
            <StoryCard key={story.id} story={story} lang={lang} />
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-zinc-50 py-32 md:py-48 border-y border-black/5 relative z-30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <span className="block text-5xl md:text-6xl font-light text-black mb-4 group-hover:text-[#C5A059] transition-colors duration-500">
                  {stat.val}
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="py-32 bg-white text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-2xl mx-auto px-6"
        >
          <p className="text-gray-400 text-[12px] uppercase tracking-[0.6em] mb-8">
            {isZh ? "准备好开启这段旅程了吗？" : isEs ? "¿Listo para comenzar el viaje?" : "Ready to start the journey?"}
          </p>
          <a 
            href={`/${lang}/booking`}
            className="text-2xl md:text-3xl font-serif italic border-b border-black/20 pb-2 hover:border-black transition-colors"
          >
            {isZh ? "预约学校访问" : isEs ? "Programar una Visita Escolar" : "Schedule a School Visit"}
          </a>
        </motion.div>
      </section>
    </main>
  );
}