"use client"
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Container from "./Container";

interface DictProps {
  heading: string;
  scan: string;
  price_offer: string;
  benefit: string;
}

export default function Diagnostics({ dict, lang }: { dict: DictProps, lang: string }) {
  const scrollToId = useSmoothScroll();
  const isEs = lang === "es";

  return (
    <section className="bg-black text-white py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-medium">
                {dict.heading}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif leading-[1.1]">
              {isEs ? "La Ciencia de la" : "The Science of"} <br />
              <span className="italic font-light text-white/80">
                {isEs ? "Certeza" : "Certainty"}
              </span>
            </h2>

            <p className="text-gray-400 text-[15px] leading-relaxed max-w-md font-light">
              {dict.benefit}
            </p>

            <div className="pt-8">
              <button
                onClick={() => scrollToId("leadForm")}
                className="px-10 py-4 border border-[#C5A059] text-[#C5A059] text-[11px] uppercase tracking-[0.4em] hover:bg-[#C5A059] hover:text-black transition-all duration-700"
              >
                {dict.price_offer}
              </button>
            </div>
          </div>

          <div className="relative aspect-square bg-black border border-white/5 flex flex-col items-center justify-center p-12 text-center group overflow-hidden">
            <img
              src="/cbct.png"
              alt={dict.scan}
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-10" />
            
            <div className="relative z-20 space-y-4">
              <h4 className="text-xl font-serif tracking-widest uppercase text-[#C5A059]">
                {dict.scan}
              </h4>
              <p className="text-[12px] text-white/40 italic font-light max-w-[280px]">
                {isEs 
                  ? "Mapeo 3D patentado de su arquitectura única de las vías respiratorias." 
                  : "Proprietary 3D mapping of your unique airway architecture."}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left z-30" />
          </div>
        </div>
      </Container>
    </section>
  );
}