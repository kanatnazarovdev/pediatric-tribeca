"use client";
import Container from "./Container";
import { motion } from "framer-motion";

export default function About({ lang }: { lang: string }) {
  const isEs = lang === "es";

  return (
    <section className="bg-[#F9F8F6] w-full overflow-hidden py-24 md:py-40">
      <Container>
        {/* Header Stack */}
        <div className="relative flex flex-col items-center mb-32">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.6em] text-[#C5A059] font-bold mb-8"
          >
            {isEs ? "Cuidado Especializado" : "Specialized Pediatric Care"}
          </motion.span>

          {/* Large Centered Title with Asymmetric Subtext */}
          <div className="relative w-full max-w-6xl mx-auto">
            <motion.h2
              className="text-6xl md:text-[110px] font-serif leading-none text-[#1A1A1A] tracking-tighter text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {isEs ? "Sonrisas Sanas," : "Healthy Smiles,"}
            </motion.h2>

            <motion.h2
              className="text-6xl md:text-[110px] font-serif leading-none text-[#2D5A43] italic font-light mt-4 md:ml-32 text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              {isEs ? "Comienzos Felices." : "Happy Beginnings."}
            </motion.h2>

            <motion.div
              className="md:absolute md:top-[10px] md:-right-4 w-full md:w-[340px] bg-white/80 backdrop-blur-md p-8 text-left mt-12 md:mt-0 shadow-sm border-l-2 border-[#C5A059]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed font-light">
                {isEs
                  ? "En Tribeca Dental Studio, la primera visita de un niño marca el camino hacia una vida de salud oral duradera."
                  : "At Tribeca Dental Studio, a child’s first visit sets the path for a lifetime of healthy growth and bright smiles."}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          {[
            {
              title: isEs ? "Cuidado Preventivo" : "Preventative First",
              desc: isEs
                ? "Detección temprana para un crecimiento saludable."
                : "Early intervention for natural, healthy dental growth.",
            },
            {
              title: isEs ? "Experiencia Sin Miedo" : "Fear-Free Visits",
              desc: isEs
                ? "Tecnología suave para citas libres de ansiedad."
                : "Gentle, patient-centered technology for stress-free visits.",
            },
            {
              title: isEs ? "Crecimiento y Vías" : "Growth & Airway",
              desc: isEs
                ? "Ayudamos a su hijo a respirar y prosperar mejor."
                : "Focusing on airway health to help your child thrive.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-t-2 border-transparent hover:border-[#C5A059] transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h4 className="font-serif text-xl italic text-[#2D5A43] mb-4">
                {item.title}
              </h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
