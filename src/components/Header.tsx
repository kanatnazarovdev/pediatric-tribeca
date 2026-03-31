/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useState, useEffect } from "react";
import { ContainerHeader } from "./Container";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  dict: {
    hero: { studio_name: string };
    nav?: { technology: string; results: string; faq: string };
  };
  lang: string;
}

export default function Header({ dict, lang }: HeaderProps) {
  console.log(lang)
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const scrollToId = useSmoothScroll();
  const isHomePage = pathname === `/${lang}` || pathname === "/";

  const isBlogRoute =
    pathname.includes(`/${lang}/blog`) || pathname.includes(`/blog`) || pathname.includes(`/${lang}/testimonials`) || pathname.includes(`/testimonials`)

  const shouldBeActive = isScrolled || isOpen || isBlogRoute;

  const handleBookingClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      scrollToId("leadForm");
    }
    setIsOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // 1. ADD THIS CHECK:
  const isStudio = pathname.startsWith(`/${lang}/studio`) || pathname.startsWith('/studio');

  // 2. RETURN NULL IF IN STUDIO
  if (isStudio) return null;
  const navItems = [
    {
      id: "mission",
      label: lang === "es" ? "Misión" : "Mission",
      // Add /${lang}/ to make the path absolute from the root
      href: `/${lang}/mission`,
      isExternal: true,
    },
    {
      id: "innovation",
      label: lang === "es" ? "Innovación" : "Innovation",
      href: `/${lang}/innovation`,
      isExternal: true,
    },
    {
      id: "blog",
      label: lang === "es" ? "Blog" : "Blog",
      href: `/${lang}/blog`,
      isExternal: true,
    }, {
      id: "testimonials",
      label: lang === "es" ? "Testimonials" : "Testimonials",
      href: `/${lang}/testimonials`,
      isExternal: true,
    },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[60] transition-all duration-500 py-2 h-[100px] flex items-center
        ${isScrolled || isOpen || shouldBeActive ? "bg-white/90 backdrop-blur-md border-b border-black/5" : "bg-transparent text-white"}`}
      >
        <ContainerHeader>
          <div className="flex items-center justify-between">
            <Link
              href={`/${lang}`}
              className="cursor-pointer z-[70]"
              onClick={() => setIsOpen(false)}
            >
              <span
                className={`text-[20px] md:text-[24px] font-serif tracking-tight leading-[1.1] transition-colors duration-500
                ${isScrolled || isOpen || shouldBeActive ? "text-black" : "text-white"}`}
              >
                Tribeca Dental Studio{" "}
                <span className="text-[#4add30]">4 kids</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-12 font-brandon font-bold">
              {" "}
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isScrolled={isScrolled}
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                  scrollToId={scrollToId}
                  shouldBeActive={shouldBeActive}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/${lang}#leadForm`}
                onClick={handleBookingClick}
                className={`px-8 py-3 border transition-all duration-700 text-[10px] uppercase tracking-[0.4em] relative overflow-hidden group
      ${isScrolled || isOpen || shouldBeActive ? "border-black text-black" : "border-white/30 text-white"}`}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-700">
                  {lang === "es" ? "Reservar" : "Book"}
                </span>
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              </Link>

              {/* Burger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 z-[70] transition-colors duration-500 ${isScrolled || isOpen || shouldBeActive ? "text-black" : "text-white"}`}
              >
                {isOpen ? (
                  <X size={28} strokeWidth={1.5} />
                ) : (
                  <Menu size={28} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </ContainerHeader>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // @ts-ignore
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 bg-white z-[55] flex flex-col justify-center px-10"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  {item.isExternal ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-serif text-black hover:text-[#C5A059] transition-colors italic"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        scrollToId(item.id);
                        setIsOpen(false);
                      }}
                      className="text-4xl font-serif text-left text-black hover:text-[#C5A059] transition-colors italic"
                    >
                      {item.label}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
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
