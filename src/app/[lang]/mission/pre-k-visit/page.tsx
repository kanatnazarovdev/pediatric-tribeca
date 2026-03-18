"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PreKVisitPage({
  params,
}: {
  params: { lang: string };
}) {
  return (
    <main className="min-h-screen bg-white">
      {/* PREMIUM BLACK HERO SECTION */}
      <section className="bg-[#0A0A0A] pt-48 pb-32 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl border-l border-[#C5A059]/40 pl-8"
            >
              <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.6em] mb-6 block">
                Chapter 01
              </span>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none uppercase italic">
                The Pre-K <br /> Workshop
              </h1>
            </motion.div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-8 md:mt-0 font-light">
              TriBeCa Community School — March 2026
            </p>
          </div>

          {/* THE CINEMATIC VIDEO PLAYER */}
          <div className="relative aspect-video w-full bg-zinc-900 shadow-2xl overflow-hidden border border-white/5">
            <iframe
              src="https://www.youtube.com/embed/x_dDTvkzACA?autoplay=1&mute=1&modestbranding=1&rel=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* EDITORIAL NARRATIVE SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-12">
            The Impact
          </h2>
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-black italic tracking-tight">
            &ldquo;Demystifying the dental experience is the first step toward a
            lifetime of health. We meet children where they are—in their own
            environment—to build trust through play.&quot;
          </p>

          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-24 text-left border-t border-black/5 pt-16">
            <div className="group">
              <h3 className="text-black text-[11px] font-medium mb-6 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-black/20"></span> 01 / Education
              </h3>
              <p className="text-gray-500 font-light leading-relaxed text-lg">
                Our team uses interactive storytelling and oversized dental
                models to turn clinical instruments into tools of curiosity
                rather than fear.
              </p>
            </div>
            <div className="group">
              <h3 className="text-black text-[11px] font-medium mb-6 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-[1px] bg-black/20"></span> 02 / Presence
              </h3>
              <p className="text-gray-500 font-light leading-relaxed text-lg">
                By maintaining a constant presence in TriBeCa’s educational
                institutions, we become a familiar part of the community’s
                support system for growing families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA: BACK TO STORIES */}
      <section className="pb-32 bg-white border-t border-black/5 pt-20">
        <div className="max-w-6xl mx-auto px-6 flex justify-center">
          <Link
            href={`/mission`}
            className="group flex flex-col items-center"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 group-hover:text-[#C5A059] transition-colors">
              Return to Mission
            </span>
            <div className="w-[1px] h-12 bg-gray-200 mt-4 group-hover:bg-[#C5A059] transition-all"></div>
          </Link>
        </div>
      </section>
    </main>
  );
}
