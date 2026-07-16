/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { ContainerHeader } from "./Container";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isBlogRoute =
    pathname.includes(`/blog`) ||
    pathname.includes(`/testimonials`) ||
    pathname.includes(`/innovation/curodont`) ||
    pathname.includes(`/team/`);
  const shouldBeActive = isScrolled || isOpen || isBlogRoute;

  const toggleLanguage = (newLang: string) => {
    const segments = pathname.split("/");
    segments[1] = newLang; // Replace the locale segment
    const newPath = segments.join("/");

    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Re-trigger Practice by Numbers script whenever the mobile menu opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (typeof window !== "undefined" && (window as any).pbn_replace_numbers_all) {
          try {
            (window as any).pbn_replace_numbers_all();
          } catch (e) {
            console.error("PBN dynamic swap error:", e);
          }
        }
      }, 250); // Slightly increased to ensure clean DOM rendering
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const isStudio =
    pathname.startsWith(`/${lang}/studio`) || pathname.startsWith("/studio");
  if (isStudio) return null;

  const navItems = [
    {
      id: "mission",
      label: lang === "zh" ? "诊所使命" : lang === "es" ? "Misión" : "Mission",
      href: `/${lang}/mission`,
    },
    {
      id: "innovation",
      label:
        lang === "zh"
          ? "技术创新"
          : lang === "es"
            ? "Innovación"
            : "Innovation",
      href: `/${lang}/innovation`,
    },
    {
      id: "blog",
      label: lang === "zh" ? "健康博客" : "Blog",
      href: `/${lang}/blog`,
    },
    {
      id: "testimonials",
      label:
        lang === "zh"
          ? "患者评价"
          : lang === "es"
            ? "Testimonios"
            : "Testimonials",
      href: `/${lang}/testimonials`,
    },
    {
      id: "team",
      label: lang === "zh" ? "医疗团队" : lang === "es" ? "Equipo" : "Team",
      href: `/${lang}/team`,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[60] transition-all duration-500 py-2 h-[100px] flex items-center
        ${shouldBeActive ? "bg-white/90 backdrop-blur-md border-b border-black/5" : "bg-transparent text-white"}`}
      >
        <ContainerHeader>
          <div className="flex items-center justify-between">
            <Link href={`/${lang}`} className="z-[70]">
              <span
                className={`text-[20px] md:text-[24px] font-serif tracking-tight leading-[1.1] 
                ${shouldBeActive ? "text-black" : "text-white"}`}
              >
                Tribeca Dental Studio{" "}
                <span className="text-[#4add30]">4 kids</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 font-brandon font-bold">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`uppercase tracking-[2px] text-[14px] hover:text-[#C5A059] transition-colors ${shouldBeActive ? "text-black" : "text-white"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Desktop Language Toggle */}
              <div className="hidden md:flex items-center gap-2 mr-4 border-r border-black/10 pr-4">
                <button
                  onClick={() => toggleLanguage("en")}
                  className={`text-[12px] font-bold transition-colors ${lang === "en" ? "text-[#C5A059]" : shouldBeActive ? "text-black/40" : "text-white/40"}`}
                >
                  EN
                </button>
                <span
                  className={shouldBeActive ? "text-black/20" : "text-white/20"}
                >
                  |
                </span>
                <button
                  onClick={() => toggleLanguage("es")}
                  className={`text-[12px] font-bold transition-colors ${lang === "es" ? "text-[#C5A059]" : shouldBeActive ? "text-black/40" : "text-white/40"}`}
                >
                  ES
                </button>
                <span
                  className={shouldBeActive ? "text-black/20" : "text-white/20"}
                >
                  |
                </span>
                <button
                  onClick={() => toggleLanguage("zh")}
                  className={`text-[12px] font-bold transition-colors ${lang === "zh" ? "text-[#C5A059]" : shouldBeActive ? "text-black/40" : "text-white/40"}`}
                >
                  中文
                </button>
              </div>

              {/* Desktop Phone Header Link */}
              <div className="hidden sm:block mr-2">
                <a
                  href="tel:+12125615303"
                  className={`pbn-phone text-[14px] font-brandon font-bold tracking-[1px] hover:text-[#C5A059] transition-colors ${shouldBeActive ? "text-black" : "text-white"}`}
                >
                  212.561.5303
                </a>
              </div>

              {/* Booking CTA */}
              <a
                target="_blank"
                href={`https://www.patientsreach.com/schedule/TribecaDentalStudio/patient_types/`}
                className={`px-6 py-2 border text-[10px] uppercase tracking-[0.3em] relative overflow-hidden group
                ${shouldBeActive ? "border-black text-black" : "border-white/30 text-white"}`}
              >
                <span className="relative z-10 group-hover:text-white">
                  {lang === "zh"
                    ? "立即预约"
                    : lang === "es"
                      ? "Reservar"
                      : "Book"}
                </span>
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 z-[70] ${shouldBeActive ? "text-black" : "text-white"}`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </ContainerHeader>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[55] flex flex-col justify-center px-10 gap-8"
          >
            <div className="flex gap-6 mb-4">
              <button
                onClick={() => toggleLanguage("en")}
                className={`text-2xl font-bold ${lang === "en" ? "text-[#C5A059]" : "text-black/40"}`}
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage("es")}
                className={`text-2xl font-bold ${lang === "es" ? "text-[#C5A059]" : "text-black/40"}`}
              >
                Español
              </button>
              <button
                onClick={() => toggleLanguage("zh")}
                className={`text-2xl font-bold ${lang === "zh" ? "text-[#C5A059]" : "text-black/40"}`}
              >
                中文
              </button>
            </div>

            {/* FIXED: Formatted text token to match standard fallback tracker criteria */}
            <div className="mb-4">
              <a
                href="tel:+12125615303"
                className="pbn-phone text-3xl font-serif italic text-[#C5A059]"
                onClick={() => setIsOpen(false)}
              >
                212 561 5303
              </a>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-serif text-black italic capitalize"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}