// src/components/Section.tsx
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export default function Section({ children, className = "", id, dark = false }: SectionProps) {
  return (
    <section 
      id={id}
      className={`w-full ${dark ? 'bg-black text-white' : 'bg-white text-black'} ${className}`}
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {children}
      </div>
    </section>
  );
}