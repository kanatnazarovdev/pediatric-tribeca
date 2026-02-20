"use client";
import Container from "./Container";
import { motion } from "framer-motion";

interface AboutProps {
  lang: string;
}

export default function About({ lang }: AboutProps) {
  const isEs = lang === "es";

  return (
    <section className="bg-white w-full overflow-hidden flex flex-col items-center py-20 md:py-32">
      <Container>
        {/* Main Brand Hook */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-24 mb-24">
          <div className="w-full md:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[9px] uppercase tracking-[0.6em] text-gray-400 block mb-6 md:mb-12"
            >
              {isEs ? "El Visionario" : "The Visionary"}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-4xl md:text-7xl lg:text-8xl font-serif leading-[1.1] md:leading-[0.95] text-[#1A1A1A] tracking-tight"
            >
              {isEs ? "Donde el Arte" : "Where Artistry"} <br />
              <span className="italic font-extralight text-gray-800">
                {isEs ? "Se Une a la Respiración." : "Meets Airway."}
              </span>
            </motion.h2>
          </div>

          <div className="w-full md:w-[40%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <p className="text-[#4A4A4A] font-light leading-relaxed tracking-wide text-base md:text-xl font-sans italic mb-8">
                {isEs ? (
                  <>
                    La Dra. Nina Izhaky redefine el sueño reparador mediante el
                    uso de{" "}
                    <span className="text-black font-normal not-italic underline decoration-black/20 hover:decoration-[#C5A059] transition-all cursor-pointer">
                      <a
                        href="https://www.fotona.com/en/treatments/2039/nightlase-r/"
                        target="_blank"
                      >
                        NightLase®
                      </a>
                    </span>{" "}
                    — una tecnología que utiliza calor suave para tensar los
                    tejidos orales. Al aumentar el espacio en las vías
                    respiratorias, eliminamos la causa raíz de la apnea
                    obstructiva del sueño sin dispositivos invasivos.
                  </>
                ) : (
                  <>
                    Dr. Nina Izhaky redefines restorative sleep through{" "}
                    <span className="text-black font-normal not-italic underline decoration-black/20 hover:decoration-[#C5A059] transition-all cursor-pointer">
                      <a
                        href="https://www.fotona.com/en/treatments/2039/nightlase-r/"
                        target="_blank"
                      >
                        NightLase®
                      </a>
                    </span>{" "}
                    — a breakthrough technology using gentle heat to tighten
                    oral tissues. By increasing airway space, we eliminate the
                    root cause of obstructive sleep apnea without invasive
                    devices.
                  </>
                )}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/5 pt-16">
          <div className="space-y-4">
            <h4 className="font-serif text-xl italic">
              {isEs ? "La Ciencia del Colágeno" : "Collagen Science"}
            </h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              {isEs ? (
                <>
                  Utilizamos el láser{" "}
                  <a
                    href="https://www.fotona.com/en/treatments/2039/nightlase-r/"
                    target="_blank"
                    className="text-black font-normal border-b border-black/10 hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-500"
                  >
                    Fotona
                  </a>{" "}
                  para estimular la neocolagénesis, tensando naturalmente el
                  paladar blando y la úvula.
                </>
              ) : (
                <>
                  We utilize the{" "}
                  <a
                    href="https://www.fotona.com/en/treatments/2039/nightlase-r/"
                    target="_blank"
                    className="text-black font-normal border-b border-black/10 hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-500"
                  >
                    Fotona
                  </a>{" "}
                  laser to stimulate neocollagenesis, naturally tightening the
                  soft palate and uvula.
                </>
              )}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-xl italic">
              {isEs ? "Amplitud de la Vía" : "Airway Amplitude"}
            </h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              {isEs
                ? "Al aumentar la apertura de la vía aérea bucal, reducimos drásticamente la vibración que causa los ronquidos."
                : "By increasing the oral airway opening, we drastically reduce the vibration that causes snoring."}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif text-xl italic">
              {isEs ? "Sin Dispositivos" : "Device-Free"}
            </h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              {isEs
                ? "Diga adiós a las máquinas CPAP y los protectores bucales voluminosos. Recupere su libertad durante el sueño."
                : "Say goodbye to CPAP machines and bulky mouthguards. Reclaim your freedom during sleep."}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
