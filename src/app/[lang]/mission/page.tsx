"use client";
import { motion } from "framer-motion";
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

export default function CommunityPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <main className="min-h-screen bg-white">
      <motion.section 
        initial={{ backgroundColor: "#FFFFFF" }}
        whileInView={{ backgroundColor: "#0A0A0A" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="pt-48 pb-32 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2}}
            className="border-l border-[#C5A059]/30 pl-8 mb-20"
          >
            <h2 className="text-[#C5A059] text-[10px] uppercase tracking-[0.6em] mb-12 block">
              Our Impact
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white text-4xl md:text-6xl font-light leading-[1.1] italic tracking-tighter max-w-5xl"
            >
              &quot;We don&apos;t just practice dentistry; we architect the future of
              childhood wellness in Manhattan.&quot;
            </motion.p>
          </motion.div>

          {/* THE THREE PILLARS GRID */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/5 pt-16"
          >
            {[
              { 
                num: "01", 
                title: "Demystification", 
                text: "Bringing clinical knowledge into classrooms to turn 'fear' into curiosity before the first visit." 
              },
              { 
                num: "02", 
                title: "Partnership", 
                text: "Meeting children in their most comfortable environments through local Pre-K and school alliances." 
              },
              { 
                num: "03", 
                title: "Visual Truth", 
                text: "Utilizing cinematic production to document and share the reality of high-end pediatric care." 
              }
            ].map((pillar) => (
              <div key={pillar.num} className="group">
                <h3 className="text-[#C5A059] text-[11px] font-medium mb-6 uppercase tracking-[0.3em]">
                  {pillar.num} / {pillar.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-base">
                  {pillar.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* THE ACTION FEED (WHITE BG) */}
      <section className="max-w-6xl mx-auto px-6 py-32 bg-white">
        <div className="flex justify-between items-baseline mb-24 border-b border-black/5 pb-8">
          <h2 className="text-5xl font-light tracking-tighter uppercase text-black">
            Recent Stories
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">
            Documentation Series
          </span>
        </div>

        <div className="grid grid-cols-1 gap-40">
          {STORIES.map((story) => (
            <StoryCard key={story.id} story={story} lang={lang} />
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-zinc-50 py-32 border-y border-black/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center text-black">
          {[
            { val: "12+", label: "Partner Schools" },
            { val: "500+", label: "Kids Educated" },
            { val: "100%", label: "Clinical Transparency" },
            { val: "NYC", label: "TriBeCa Rooted" }
          ].map((stat) => (
            <div key={stat.label}>
              <span className="block text-4xl font-light mb-2">{stat.val}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}