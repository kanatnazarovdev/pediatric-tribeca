"use client";
import { useState, useRef, useEffect } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  // Update progress as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section className="relative h-[100vh] min-h-[600px] w-full overflow-hidden bg-[#F9F8F6]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        title="Pediatric Dentistry and Airway Health in Tribeca" // Keyword rich
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-50 saturate-[1.2] contrast-[1.1]"
      >
        <source src="/Pediatric.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* Main Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-6 text-white">
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

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-5xl md:text-8xl font-serif tracking-wide leading-[1.1] mb-12 drop-shadow-md"
          aria-label={`${dict.title_main} ${dict.title_italic}`}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#E5D5B7] to-[#C5A059]">
            {dict.title_main}
          </span>
          <br />
          <span className="italic font-light text-[#94AF9F] brightness-125">
            {dict.title_italic}
          </span>
        </motion.h1>
        <h2 className="sr-only">
          Expert pediatric dental care at {dict.studio_name} in NYC,
          specializing in airway development and painless Solea laser
          treatments.
        </h2>

        <div className="flex flex-col items-center gap-8">
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

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 z-30">
        <motion.div
          className="h-full bg-[#C5A059]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "tween", ease: "linear" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer group lg:bottom-12"
        onClick={() => scrollToId("secondBlock")}
      >
        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] text-[#C5A059] mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
          {dict.badge === "Atención Especializada" ? "Descubrir" : "Discover"}
        </span>

        <div className="relative w-[22px] h-[38px] border border-[#C5A059]/30 rounded-full flex justify-center p-1.5 transition-colors duration-500 group-hover:border-[#C5A059]/60">
          <motion.div
            animate={{
              y: [0, 16, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1 bg-[#C5A059] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
