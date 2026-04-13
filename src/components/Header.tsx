/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { ContainerHeader } from "./Container";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react"; // Added Globe icon
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  dict: {
    hero: { studio_name: string };
    nav?: { technology: string; results: string; faq: string };
  };
  lang: string;
}

export default function Header({ dict, lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Added for language switching
  const [isOpen, setIsOpen] = useState(false);
  const scrollToId = useSmoothScroll();
  
  const isHomePage = pathname === `/${lang}` || pathname === "/";
  const isBlogRoute = pathname.includes(`/blog`) || pathname.includes(`/testimonials`);
  const shouldBeActive = isScrolled || isOpen || isBlogRoute;

  // Function to switch language while keeping the same sub-path
  const toggleLanguage = (newLang: string) => {
    const segments = pathname.split('/');
    segments[1] = newLang; // Replace 'en' with 'es' or vice versa
    router.push(segments.join('/'));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isStudio = pathname.startsWith(`/${lang}/studio`) || pathname.startsWith('/studio');
  if (isStudio) return null;

  const navItems = [
    { id: "mission", label: lang === "es" ? "Misión" : "Mission", href: `/${lang}/mission` },
    { id: "innovation", label: lang === "es" ? "Innovación" : "Innovation", href: `/${lang}/innovation` },
    { id: "blog", label: "Blog", href: `/${lang}/blog` }, 
    { id: "testimonials", label: lang === "es" ? "Testimonios" : "Testimonials", href: `/${lang}/testimonials` },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 py-2 h-[100px] flex items-center
        ${shouldBeActive ? "bg-white/90 backdrop-blur-md border-b border-black/5" : "bg-transparent text-white"}`}>
        <ContainerHeader>
          <div className="flex items-center justify-between">
            <Link href={`/${lang}`} className="z-[70]">
              <span className={`text-[20px] md:text-[24px] font-serif tracking-tight leading-[1.1] 
                ${shouldBeActive ? "text-black" : "text-white"}`}>
                Tribeca Dental Studio <span className="text-[#4add30]">4 kids</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 font-brandon font-bold">
              {navItems.map((item) => (
                <Link key={item.id} href={item.href} className={`uppercase tracking-[2px] text-[14px] hover:text-[#C5A059] transition-colors ${shouldBeActive ? "text-black" : "text-white"}`}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 ">
              {/* Language Toggle */}
              <div className="hidden md:flex items-center gap-2 mr-4 border-r pr-4 border-black/10">
                <button 
                  onClick={() => toggleLanguage('en')}
                  className={`text-[12px] font-bold ${lang === 'en' ? 'text-[#C5A059]' : shouldBeActive ? 'text-black/40' : 'text-white/40'}`}
                >EN</button>
                <span className={shouldBeActive ? "text-black/20" : "text-white/20"}>|</span>
                <button 
                  onClick={() => toggleLanguage('es')}
                  className={`text-[12px] font-bold ${lang === 'es' ? 'text-[#C5A059]' : shouldBeActive ? 'text-black/40' : 'text-white/40'}`}
                >ES</button>
              </div>

              <Link href={`/${lang}#leadForm`} className={`px-6 py-2 border text-[10px] uppercase tracking-[0.3em] relative overflow-hidden group
                ${shouldBeActive ? "border-black text-black" : "border-white/30 text-white"}`}>
                <span className="relative z-10 group-hover:text-white">{lang === "es" ? "Reservar" : "Book"}</span>
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>

              <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden p-2 z-[70] ${shouldBeActive ? "text-black" : "text-white"}`}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </ContainerHeader>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 bg-white z-[55] flex flex-col justify-center px-10 gap-8">
             {/* Mobile Language Switcher */}
             <div className="flex gap-6 mb-4">
                <button onClick={() => toggleLanguage('en')} className={`text-2xl font-bold ${lang === 'en' ? 'text-[#C5A059]' : 'text-black/40'}`}>English</button>
                <button onClick={() => toggleLanguage('es')} className={`text-2xl font-bold ${lang === 'es' ? 'text-[#C5A059]' : 'text-black/40'}`}>Español</button>
             </div>
             {navItems.map((item) => (
               <Link key={item.id} href={item.href} onClick={() => setIsOpen(false)} className="text-4xl font-serif text-black italic capitalize">{item.label}</Link>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



// Sub-component for desktop items to keep code clean
function NavItem({
  item,
  isScrolled,
  hoveredItem,
  setHoveredItem,
  scrollToId,
  shouldBeActive,
}: any) {
  const className = `
    font-brandon font-bold uppercase 
    text-[16px] leading-[18px] tracking-[3px] 
    transition-colors duration-500 group relative 
    ${isScrolled || shouldBeActive ? "text-black" : "text-white"} 
    hover:text-[#C5A059]
`.replace(/\s+/g, " ");

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      className={className}
      onClick={(e) => {
        if (item.href.startsWith('#')) {
          e.preventDefault();
          scrollToId(item.id);
        }
      }}
    >
      {item.label}
      <Underline isActive={hoveredItem === item.id} />
    </Link>
  );
}
function Underline({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isActive ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#C5A059] origin-center"
    />
  );
}
