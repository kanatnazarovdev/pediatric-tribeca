"use client";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
interface HeroProps {
  dict: {
    badge: string;
    title_main: string;
    title_italic: string;
    cta: string;
    studio_name: string;
  };
}

export default function Hero({ dict }: HeroProps) {
  const scrollToId = useSmoothScroll();
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-60"
      >
        <source src="/Pediatric.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-8 h-[1px] bg-[#C5A059]" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-medium">
            {dict.badge}
          </span>
          <div className="w-8 h-[1px] bg-[#C5A059]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-5xl md:text-8xl font-serif tracking-tight leading-[1.1] mb-12"
        >
          {dict.title_main} <br />
          <span className="italic font-light text-white/90">
            {dict.title_italic}
          </span>
        </motion.h1>

        <div className="flex flex-col items-center gap-6">
          <motion.button
            onClick={()=>scrollToId('leadForm')}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="group relative px-12 py-5 overflow-hidden border border-white/20 hover:border-[#C5A059] transition-all duration-700 backdrop-blur-md"
          >
            <span className="relative z-10 text-[12px] uppercase tracking-[0.6em] group-hover:text-black transition-colors duration-700 cursor-pointer">
              {dict.cta}
            </span>
            <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-[12px] uppercase tracking-[0.3em] text-white/40 italic"
          >
            {dict.studio_name}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
