"use client";
import { useState, useRef } from "react";
import Container from "./Container";

interface ComparisonProps {
  lang: string;
}

export default function Comparison({ lang }: ComparisonProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isEs = lang === "es";

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const x =
      "touches" in event
        ? event.touches[0].clientX
        : (event as React.MouseEvent).clientX;

    let position = ((x - rect.left) / rect.width) * 100;

    if (position < 0) position = 0;
    if (position > 100) position = 100;

    setSliderPos(position);
  };

  return (
    <section className="bg-white py-6 md:py-24" id="results">
      <Container>
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.8em] text-gray-400 block mb-6">
            {isEs ? "Transformaciones Probadas" : "Proven Transformations"}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A]">
            {isEs ? "El Arte del" : "The Art of"}{" "}
            <span className="italic font-light">
              {isEs ? "Refinamiento." : "Refinement."}
            </span>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto cursor-ew-resize select-none overflow-hidden group shadow-sm aspect-[4/2] md:aspect-video rounded-2xl"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* After Image (Background) */}
          <img 
            src="/result.png" 
            alt="After" 
            className="absolute inset-0 w-full h-full object-cover block" 
          />

          {/* Before Image (Overlay) */}
          <div
            className="absolute inset-0 w-full h-full z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src="/Before.png"
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover block"
            />
          </div>

          {/* Divider Handle */}
          <div
            className={`absolute top-0 bottom-0 w-[2px] bg-white z-30 transition-opacity duration-300
              ${sliderPos <= 0 || sliderPos >= 100 ? "opacity-0" : "opacity-100"}`}
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl border border-black/5 pointer-events-none">
               <div className="flex gap-1">
                <div className="w-1 h-1 bg-black/40 rounded-full" />
                <div className="w-1 h-1 bg-black/40 rounded-full" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div
            className="absolute bottom-6 left-6 z-40 pointer-events-none transition-opacity duration-500"
            style={{ opacity: sliderPos < 15 ? 0 : 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white bg-black/40 backdrop-blur-xl px-4 py-2 border border-white/10">
              {isEs ? "Antes" : "Before"}
            </span>
          </div>
          <div
            className="absolute bottom-6 right-6 z-40 pointer-events-none transition-opacity duration-500"
            style={{ opacity: sliderPos > 85 ? 0 : 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white bg-black/40 backdrop-blur-xl px-4 py-2 border border-white/10">
              {isEs ? "Después" : "After"}
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 font-light italic tracking-wide text-s">
            <a
              href="https://fotona.com/en/treatments/2039/nightlase-r/"
              target="_blank"
              className="hover:text-black transition-colors"
            >
              NightLase®
            </a>{" "}
            {isEs 
              ? "Tratamiento de Paladar Blando — Revelación anatómica completa." 
              : "Soft Palate Treatment — Full anatomical reveal."}
          </p>
        </div>
      </Container>
    </section>
  );
}