"use client";
import { useState, useEffect } from "react";
import Container, { ContainerHeader } from "./Container";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

interface HeaderProps {
  dict: {
    hero: {
      studio_name: string;
    };
    nav?: {
      technology: string;
      results: string;
      faq: string;
    };
  };
  lang: string;
}

export default function Header({ dict, lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const scrollToId = useSmoothScroll();
  console.log(lang)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "technology", label: lang === "es" ? "Tecnología" : "Technology" },
    { id: "results", label: lang === "es" ? "Resultados" : "Results" },
    { id: "faq", label: "FAQ" },
  ];
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 py-2 h-[100px] flex items-center
      ${isScrolled ? "bg-white/90 backdrop-blur-md border-b border-black/5" : "bg-transparent text-white"}`}
    >
      <ContainerHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span
              className={`text-[24px] font-serif tracking-tight leading-[1.1] transition-colors duration-500
              ${isScrolled ? "text-black" : "text-white"}`}
            >
            Tribeca Dental Studio
            </span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative text-[14px] uppercase tracking-[0.3em] transition-colors duration-500 group
                  ${isScrolled ? "text-black" : "text-white"} 
                  hover:!text-[#C5A059]`} 
              >
                <strong className="font-bold">{item.label}</strong>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredItem === item.id ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#C5A059] origin-center"
                />
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollToId('leadForm')}
            className={`px-8 py-3 border transition-all duration-700 text-[10px] uppercase tracking-[0.4em] relative overflow-hidden group
            ${isScrolled ? "border-black text-black" : "border-white/30 text-white"}`}
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-700">
              {lang === "es" ? "Reservar Evaluación" : "Book Evaluation"}
            </span>
            <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
          </button>
        </div>
      </ContainerHeader>
    </nav>
  );
}