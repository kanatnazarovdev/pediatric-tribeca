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
    <section className="relative h-[100vh] min-h-[600px] w-full overflow-hidden bg-[#F9F8F6]">
      {/* Video Layer - Lightened for approachability */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-50 saturate-[1.2] contrast-[1.1]"
      >
        <source src="/Pediatric.mp4" type="video/mp4" />
      </video>

      {/* Softer Gradient: From light to slightly warm dark to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6 text-white">
        {/* Refined Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-[1px] bg-[#C5A059]" />
          <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-[#C5A059] font-semibold">
            {dict.badge}
          </span>
          <div className="w-6 h-[1px] bg-[#C5A059]" />
        </motion.div>

        {/* Main Title - Slightly tighter leading for a modern look */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-5xl md:text-8xl font-serif tracking-tight leading-[1.1] mb-12 drop-shadow-md"
        >
          {/* Main Text: Using a soft "Champagne Gold" instead of white */}
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#E5D5B7] to-[#C5A059]">
            {dict.title_main}
          </span>
          <br />
          {/* Italic Text: Using a "Calm Sage" or "Soft Teal" for a pediatric feel */}
          <span className="italic font-light text-[#94AF9F] brightness-125">
            {dict.title_italic}
          </span>
        </motion.h1>

        <div className="flex flex-col items-center gap-8">
          {/* Button - Slightly rounded for a "softer" luxury feel */}
          <motion.button
            onClick={() => scrollToId("leadForm")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="group relative px-10 py-4 overflow-hidden border border-white/30 rounded-[2px] hover:border-[#C5A059] transition-all duration-700 backdrop-blur-sm"
          >
            <span className="relative z-10 text-[11px] uppercase tracking-[0.5em] group-hover:text-black transition-colors duration-700 font-medium">
              {dict.cta}
            </span>
            <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
          </motion.button>

          {/* Studio Name */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-light"
          >
            {dict.studio_name}
          </motion.p>
        </div>
      </div>

      {/* Decorative Bottom Fade to White (to blend with the next section) */}
{/* Darker overall tint + heavy vignette on the edges */}
<div className="absolute inset-0 z-10 bg-black/30" />
<div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
<div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/70" />    </section>
  );
}
