"use client";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Container from "./Container";
import { motion } from "framer-motion";

interface DictProps {
  heading: string;
  scan: string;
  price_offer: string;
  benefit: string;
}

export default function PediatricDiagnostics({ lang }: { lang: string }) {
  const scrollToId = useSmoothScroll();
  const isEs = lang === "es";

  return (
    <section className="bg-black text-white py-24 md:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Content */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-medium">
                {isEs ? "DESARROLLO INFANTIL" : "PEDIATRIC DEVELOPMENT"}
              </span>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif leading-[1.1]">
                {isEs ? "Diseñando su" : "Designing Their"} <br />
                <span className="italic font-light text-white/80">
                  {isEs ? "Futuro Saludable" : "Healthy Future"}
                </span>
              </h2>

              <p className="text-gray-400 text-[15px] leading-relaxed max-w-md font-light">
                {isEs 
                  ? "En Tribeca Dental Studio 4 Kids, dedicamos un piso entero al cuidado de su hijo. Desde tecnología láser sin taladros hasta un enfoque en las vías respiratorias, creamos una experiencia libre de miedo." 
                  : "At Tribeca Dental Studio 4 Kids, we dedicate an entire floor to your child’s care. From drill-free laser technology to an airway-first approach, we create a fear-free experience."}
              </p>
            </div>

            {/* CLINICAL MILESTONE BOX */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-6 border-l border-[#C5A059]/30 bg-white/5 backdrop-blur-sm max-w-md"
            >
              <h5 className="text-[#C5A059] text-[11px] uppercase tracking-widest font-bold mb-2">
                {isEs ? "Hito del Primer Año" : "The Age One Milestone"}
              </h5>
              <p className="text-sm text-white/70 font-light leading-snug">
                {isEs 
                  ? "La salud dental debe comenzar al cumplir un año o cuando brote el primer diente. La detección temprana es clave para un crecimiento facial óptimo." 
                  : "Dental health should start by age one or when the first tooth emerges. Early detection is key for optimal facial growth."}
              </p>
            </motion.div>

            <div className="pt-4">
              <button
                onClick={() => scrollToId("leadForm")}
                className="group relative px-10 py-4 border border-[#C5A059] text-[#C5A059] text-[11px] uppercase tracking-[0.4em] overflow-hidden transition-all duration-700"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-700">
                  {isEs ? "Reservar Evaluación Infantil" : "Book evaluation for your kid today"}
                </span>
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual & Specialized Services */}
          <div className="relative">
            <div className="relative aspect-[4/5] md:aspect-square bg-neutral-900 border border-white/5 flex flex-col items-center justify-center p-12 text-center group overflow-hidden">
              <img
                src="/pediatricImage.jpg" 
                alt="Tribeca Dental Studio 4 Kids"
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              
              <div className="relative z-20 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-serif tracking-widest uppercase text-[#C5A059]">
                    {isEs ? "Cuidado Especializado" : "Specialized Care"}
                  </h4>
                  <p className="text-[12px] text-white/60 italic font-light max-w-[280px] mx-auto">
                    {isEs 
                      ? "Un ambiente amigable para niños con especialistas en necesidades especiales y ansiedad dental." 
                      : "A kid-friendly environment featuring specialists in special needs and dental anxiety."}
                  </p>
                </div>

                {/* TECH TAGS */}
                <div className="flex flex-wrap justify-center gap-2">
                  {["Biolase Laser", "Icon Resin", "Myobrace®"].map((tech) => (
                    <span key={tech} className="px-3 py-1 border border-white/10 text-[9px] uppercase tracking-widest text-white/40">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left z-30" />
            </div>

            {/* Floating Badge: Dedicated Floor */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 -right-6 hidden md:block bg-[#C5A059] p-6 text-black"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold leading-tight">
                {isEs ? "Piso Exclusivo" : "Dedicated"} <br />
                {isEs ? "Para Niños" : "Kids Floor"}
              </p>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}