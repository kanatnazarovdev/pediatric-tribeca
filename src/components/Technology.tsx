"use client";
import Container from "./Container";
import { motion } from "framer-motion";

interface TechnologyProps {
  lang: string;
}

export default function PediatricTechnology({ lang }: TechnologyProps) {
  const isEs = lang === "es";

  const features = [
    {
      title: isEs ? "Crecimiento Guiado" : "Guided Growth",
      description: isEs 
        ? "Intervención temprana para moldear el desarrollo natural, asegurando vías respiratorias amplias y saludables." 
        : "Early intervention to guide natural facial development, ensuring wide and healthy airways for life.",
      step: "01",
      image: "/pediatric-growth.png" // Replace with your image path
    },
    {
      title: isEs ? "Cuidado Sin Estrés" : "Stress-Free Care",
      description: isEs 
        ? "Nuestra tecnología es silenciosa y suave, diseñada para que los niños se sientan seguros." 
        : "Silent, gentle technology specifically designed to make children feel safe and at ease.",
      step: "02",
      image: "/pediatric-comfort.png" // Replace with your image path
    },
    {
      title: isEs ? "Vitalidad de Por Vida" : "Lifetime Vitality",
      description: isEs 
        ? "Mejorar la respiración hoy significa un mejor enfoque y desarrollo para el futuro de su hijo." 
        : "Improving breathing today means better focus, energy, and development for your child's future.",
      step: "03",
      image: "/pediatric-vitality.png" // Replace with your image path
    }
  ];

  return (
    <section className="bg-white text-black py-24 md:py-40 w-full overflow-hidden border-t border-gray-100" id="pediatric-tech">
      <Container>
        <div className="mb-24">
          <span className="text-[10px] tracking-[0.5em] text-[#C5A059] font-bold uppercase mb-4 block">
            {isEs ? "Tecnología Avanzada" : "Advanced Technology"}
          </span>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-black">
            {isEs ? "El Estándar Tribeca Dental Studio"  : "The Tribeca Dental Studio Standard"}
          </h2>
        </div>

        <div className="relative">
          <div className="w-full h-[1px] bg-black/5 absolute top-0 left-0" />

          <div className="grid grid-cols-1 md:grid-cols-3">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={`relative pt-16 pb-24 px-8 group border-b border-black/5 md:border-b-0
                  ${index !== 2 ? "md:border-r border-black/5" : ""}
                `}
              >
                {/* Image Placeholder Section */}
                <div className="relative w-full aspect-[4/5] mb-12 overflow-hidden bg-gray-50">
                   <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  {/* Subtle Gold Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Numbering */}
                <span className="text-[12px] font-medium tracking-widest text-[#C5A059] mb-8 block">
                  [{item.step}]
                </span>

                {/* Vertical Accent Line */}
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "1px" }}
                  className="w-[300px] bg-[#C5A059] mb-8 transition-all duration-700 group-hover:h-[60px]"
                />
                
                <h3 className="text-3xl font-serif mb-6 leading-tight lowercase">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 font-light leading-relaxed tracking-wide text-base md:text-lg max-w-[280px]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main Horizontal Bottom Line */}
          <div className="w-full h-[1px] bg-black/5" />
        </div>
      </Container>
    </section>
  );
}