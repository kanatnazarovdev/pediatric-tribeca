"use client";
import Container from "./Container";
import { motion } from "framer-motion";

interface TechnologyProps {
  lang: string;
}

export default function Technology({ lang }: TechnologyProps) {
  const isEs = lang === "es";

  const features = [
    {
      title: isEs ? "No Invasivo" : "Non-Invasive",
      description: isEs 
        ? "Un enfoque refinado para la salud de las vías respiratorias. Sin cirugía, sin agujas y sin tiempo de inactividad." 
        : "A refined approach to airway health. No surgery, no needles, and no downtime required.",
      step: "01"
    },
    {
      title: isEs ? "Láser Suave" : "Gentle Laser",
      description: isEs 
        ? "La tecnología de precisión Fotona tensa suavemente el tejido blando, optimizando su vía respiratoria natural." 
        : "Precision Fotona technology gently tightens the soft tissue, optimizing your natural breathing path.",
      step: "02"
    },
    {
      title: isEs ? "Resultados Inmediatos" : "Immediate Results",
      description: isEs 
        ? "Experimente un sueño más vibrante y reparador desde su primera sesión en nuestro estudio de Tribeca." 
        : "Experience a more vibrant, restorative sleep from your very first session in our Tribeca studio.",
      step: "03"
    }
  ];

  return (
    <section className="bg-black text-white py-16 md:py-20 w-full overflow-hidden" id="technology">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 items-start">
          
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
              className={`flex flex-col border-l border-white/10 pl-8 pb-12 
                ${index === 1 ? 'md:mt-32' : 'mt-0'}`}
            >
              <span className="text-[14px] tracking-[0.6em] text-white/30 uppercase mb-4">
                {isEs ? "Fase" : "Phase"} {item.step}
              </span>
              
              <h3 className="text-3xl md:text-4xl font-serif mb-4 tracking-tight">
                {item.title}
              </h3>
              
              <p className="text-white/50 font-light leading-relaxed tracking-wide text-base md:text-lg italic">
                {item.description}
              </p>

              <div className="mt-8 h-[1px] w-4 bg-white/20" />
            </motion.div>
          ))}
          
        </div>
      </Container>
    </section>
  );
}