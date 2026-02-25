"use client"
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Container from "./Container";

interface DictProps {
  heading: string;
  scan: string;
  price_offer: string;
  benefit: string;
}

export default function PediatricDiagnostics({ dict, lang }: { dict: DictProps, lang: string }) {
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
                {/* Changed to reflect Pediatric focus */}
                {isEs ? "DESARROLLO INFANTIL" : "PEDIATRIC DEVELOPMENT"}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif leading-[1.1]">
              {isEs ? "Diseñando su" : "Designing Their"} <br />
              <span className="italic font-light text-white/80">
                {isEs ? "Futuro Saludable" : "Healthy Future"}
              </span>
            </h2>

            <p className="text-gray-400 text-[15px] leading-relaxed max-w-md font-light">
              {/* This will use your dict.benefit but you can override for kids */}
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

          {/* Pediatric Image Section */}
          <div className="relative aspect-square bg-black border border-white/5 flex flex-col items-center justify-center p-12 text-center group overflow-hidden">
            <img
              // Suggestion: Use a high-quality pediatric-focused image (child smiling or gentle diagnostic)
              src="/pediatric-care.png" 
              alt="Pediatric Airway Assessment"
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            
            <div className="relative z-20 space-y-4">
              <h4 className="text-xl font-serif tracking-widest uppercase text-[#C5A059]">
                {isEs ? "Evaluación Temprana" : "Early Assessment"}
              </h4>
              <p className="text-[12px] text-white/40 italic font-light max-w-[280px]">
                {isEs 
                  ? "Monitoreo del crecimiento facial y desarrollo de las vías respiratorias para una vida de bienestar." 
                  : "Monitoring facial growth and airway development for a lifetime of wellness."}
              </p>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left z-30" />
          </div>
        </div>
      </Container>
    </section>
  );
}