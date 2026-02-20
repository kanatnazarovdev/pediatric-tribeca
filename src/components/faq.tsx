"use client";
import { useState } from "react";
import Container from "./Container";
import { motion, AnimatePresence } from "framer-motion";

interface FAQProps {
  lang: string;
}

export default function FAQ({ lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isEs = lang === "es";

  const faqs = [
    {
      q: isEs
        ? "¿Cuántas sesiones se requieren para obtener resultados óptimos?"
        : "How many sessions are required for optimal results?",
      a: isEs
        ? "El protocolo estándar de NightLase consiste en tres sesiones de tratamiento separadas durante un período de seis semanas. Esto permite que las fibras de colágeno se contraigan y se tensen de forma natural."
        : "The standard NightLase protocol consists of three separate treatment sessions over a six-week period. This allows the collagen fibers to naturally contract and tighten.",
    },
    {
      q: isEs ? "¿Es doloroso el procedimiento?" : "Is the procedure painful?",
      a: isEs
        ? "Para nada. Los pacientes experimentan una sensación suave de calor. No se requiere anestesia ni adormecimiento, y puede retomar su día inmediatamente."
        : "Not at all. Patients experience a gentle, warming sensation. No anesthesia or numbing is required, and you may return to your day immediately.",
    },
    {
      q: isEs
        ? "¿Cuánto tiempo duran los resultados?"
        : "How long do the results last?",
      a: isEs
        ? "Los resultados suelen durar hasta un año. Recomendamos una única sesión de mantenimiento anual para asegurar que su vía respiratoria permanezca abierta y silenciosa."
        : "Results typically last up to a year. We recommend a single maintenance session annually to ensure your airway remains open and quiet.",
    },
  ];

  return (
    <section className="bg-white pb-32 md:pb-20 md:pt-20" id="faq">
      <Container>
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-serif sticky top-24">
              {isEs ? "Autoridad" : "Scientific"} <br />
              <span className="italic font-light">
                {isEs ? "Científica." : "Authority."}
              </span>
            </h2>
          </div>

          <div className="md:w-2/3 border-t border-black/5">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-black/5">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-8 flex justify-between items-center text-left group"
                >
                  <span className="text-[13px] uppercase tracking-[0.3em] text-black/80 group-hover:text-black transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`text-xl font-light transition-transform duration-500 ${openIndex === i ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray-500 font-light leading-relaxed italic max-w-xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
