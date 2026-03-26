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
        ? "¿Por qué es importante la salud de las vías respiratorias en los niños?"
        : "Why is airway health important for children?",
      a: isEs
        ? "El desarrollo adecuado de las vías respiratorias es crucial para el sueño, el crecimiento y la concentración de su hijo. Al identificar problemas como la respiración bucal o los paladares estrechos de manera temprana, podemos guiar el crecimiento facial para asegurar que reciban el oxígeno necesario para su desarrollo cerebral y bienestar general."
        : "Proper airway development is crucial for your child’s sleep, growth, and focus. By identifying issues like mouth breathing or narrow palates early, we can guide facial growth to ensure they receive the oxygen necessary for brain development and overall well-being.",
    },
    {
      q: isEs 
        ? "¿En qué se diferencia su tecnología láser para niños?" 
        : "How is your laser technology different for kids?",
      a: isEs
        ? "Utilizamos el láser Biolase, lo que significa que la mayoría de las caries se pueden tratar sin agujas, sin ruidos de taladro y sin entumecimiento. Es una experiencia virtualmente libre de dolor que elimina la ansiedad dental y permite que su hijo regrese a la escuela o juegue inmediatamente después de su cita."
        : "We use the Biolase laser, which means most cavities can be treated with no needles, no drill sounds, and no numbness. It is a virtually pain-free experience that eliminates dental anxiety and allows your child to return to school or play immediately after their appointment.",
    },
    {
      q: isEs
        ? "¿A qué edad debe mi hijo tener su primera evaluación de las vías respiratorias?"
        : "At what age should my child have their first airway evaluation?",
      a: isEs
        ? "Recomendamos una visita inicial antes del primer año de edad. Para la salud de las vías respiratorias y la ortodoncia interceptiva, los 6 o 7 años es el momento ideal para evaluar cómo se está desarrollando la mandíbula y el paladar, lo que a menudo previene la necesidad de tratamientos más invasivos en el futuro."
        : "We recommend an initial 'happy visit' by age one. For airway health and interceptive orthodontics, age 6 or 7 is the ideal time to evaluate how the jaw and palate are developing, often preventing the need for more invasive treatments later in life.",
    },
    {
      q: isEs
        ? "¿Cuáles son las señales de que mi hijo podría tener problemas respiratorios?"
        : "What are signs my child might have airway issues?",
      a: isEs
        ? "Las señales comunes incluyen ronquidos, respiración por la boca, sueño inquieto (mojar la cama), ojeras bajo los ojos o dificultad para concentrarse durante el día. En nuestra clínica de Tribeca, utilizamos escaneos 3D precisos para visualizar la estructura de las vías respiratorias y encontrar la solución adecuada."
        : "Common signs include snoring, mouth breathing, restless sleep (bedwetting), dark circles under the eyes, or difficulty concentrating during the day. In our Tribeca studio, we use precise 3D scans to visualize the airway structure and find the right solution.",
    },
  ];

  return (
    <section className="bg-white pb-32 md:pb-20 md:pt-20" id="faq">
      <Container>
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-serif sticky top-24">
              {isEs ? "Claridad" : "Clinical"} <br />
              <span className="italic font-light text-gray-400">
                {isEs ? "Preventiva." : "Clarity."}
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
                  <span className="text-[12px] uppercase tracking-[0.3em] font-medium text-black/80 group-hover:text-[#C5A059] transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`text-xl font-light text-[#C5A059] transition-transform duration-500 ${openIndex === i ? "rotate-45" : ""}`}
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
                      <p className="pb-8 text-gray-500 font-light leading-relaxed italic max-w-xl text-[15px]">
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