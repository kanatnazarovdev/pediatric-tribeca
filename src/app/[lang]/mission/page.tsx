"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import StoryCard from "./StoryCard";

const STORIES = [
  {
    id: "1",
    slug: "pre-k-visit",
    title: "The Pre-K Workshop",
    location: "TriBeCa Preschool",
    date: "MARCH 2026",
    thumbnail: "/stills/thumbnail.png",
  },
];

export default function CommunityPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="min-h-screen bg-white" ref={containerRef}>
      <motion.section
        initial={{ backgroundColor: "#FFFFFF" }}
        whileInView={{ backgroundColor: "#0A0A0A" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="relative pt-54 pb-48 overflow-hidden"
      >
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A] z-10" />

          <video
            autoPlay
            loop
            muted
            preload="auto"
            playsInline
            poster="/mission.webp"
            className="w-full h-[100%] object-cover object-center opacity-100 transition-all duration-1000 "
          >
            <source src="/mission.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-l border-[#C5A059]/40 pl-10 mb-28"
          >
            <h2 className="text-[#C5A059] text-[11px] uppercase tracking-[0.8em] mb-14 font-bold block">
              Our Impact
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-white text-5xl md:text-7xl font-light leading-[1.05] italic tracking-tighter max-w-5xl"
            >
              &quot;We don&apos;t just practice dentistry; we architect the
              future of childhood wellness in Manhattan.&quot;
            </motion.p>
          </motion.div>

          {/* THE THREE PILLARS GRID */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-20 border-t border-white/10 pt-20"
          >
            {[
              {
                num: "01",
                title: "Demystification",
                text: "Bringing clinical knowledge into classrooms to turn 'fear' into curiosity before the first visit.",
              },
              {
                num: "02",
                title: "Partnership",
                text: "Meeting children in their most comfortable environments through local Pre-K and school alliances.",
              },
              {
                num: "03",
                title: "Visual Truth",
                text: "Utilizing cinematic production to document and share the reality of high-end pediatric care.",
              },
            ].map((pillar) => (
              <div key={pillar.num} className="group cursor-default">
                <h3 className="text-[#C5A059] text-[14px] font-semibold mb-8 uppercase tracking-[0.4em] group-hover:tracking-[0.5em] transition-all duration-500">
                  {pillar.num} / {pillar.title}
                </h3>
                <p className="text-gray-300 font-light leading-7.5 text-lg opacity-80 group-hover:opacity-100 transition-opacity ">
                  {pillar.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="max-w-6xl mx-auto px-6 py-24 md:py-48 bg-white relative z-30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-16 md:mb-32 border-b border-black/10 pb-8 md:pb-12 gap-6">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase text-black leading-none">
            Recent <span className="italic font-serif">Stories</span>
          </h2>

          {/* This will now sit on its own line on mobile */}
          <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-400 font-medium">
            Documentation Series
          </span>
        </div>

        <div className="grid grid-cols-1 gap-32 md:gap-56">
          {STORIES.map((story) => (
            <StoryCard key={story.id} story={story} lang={lang} />
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-zinc-50 py-40 border-y border-black/5 relative z-30">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-center text-black">
          {[
            { val: "12+", label: "Partner Schools" },
            { val: "500+", label: "Kids Educated" },
            { val: "100%", label: "Clinical Transparency" },
            { val: "NYC", label: "TriBeCa Rooted" },
          ].map((stat) => (
            <div key={stat.label} className="group">
              <span className="block text-5xl font-light mb-4 group-hover:scale-110 transition-transform duration-500">
                {stat.val}
              </span>
              <span className="text-[11px] uppercase tracking-[0.4em] text-gray-400 font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
