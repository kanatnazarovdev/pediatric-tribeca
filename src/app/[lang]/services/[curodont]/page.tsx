/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAlternates } from "@/hooks/helper";

interface CurodontProps {
  lang: string;
}
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const isEs = lang === "es";

  const title = isEs
    ? "Curodont™ Repair | Caries Sin Torno en Tribeca | Tribeca Dental Studio 4 kids"
    : "Curodont™ Repair | Drill-Free Cavity Treatment Tribeca | Tribeca Dental Studio 4 kids";

  const description = isEs
    ? "Elimine las caries de su hijo sin fresado ni dolor. Curodont™ en Tribeca utiliza biotecnología suiza para regenerar el esmalte dental de forma natural y sin agujas."
    : "Heal your child's early cavities without drilling or shots. Curodont™ at Tribeca Dental Studio uses Swiss biotechnology to naturally regrow enamel for pain-free pediatric care.";

  return {
    title,
    description,
    alternates: getAlternates(lang, "innovation/curodont"),
    keywords: isEs
      ? [
          "caries sin torno NYC",
          "odontología sin dolor para niños",
          "Curodont español Tribeca",
          "regeneración de esmalte dental",
          "dentista pediátrico Tribeca",
        ]
      : [
          "drill-free cavity treatment NYC",
          "no-shot dentistry for kids",
          "Curodont Tribeca",
          "tooth enamel regeneration",
          "painless pediatric dentist Manhattan",
        ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/curodont.png",
          width: 1200,
          height: 630,
          alt: isEs
            ? "Regeneración Dental Biológica"
            : "Biological Tooth Regeneration",
        },
      ],
    },
  };
}
const Curodont = ({ lang }: CurodontProps) => {
  const isEs = lang === "es";

  return (
    <section className="py-24 bg-[#FAFAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mt-5">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/5] rounded-t-[200px] rounded-b-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white">
              <Image
                src="/curodont.png"
                alt="Biological Tooth Regeneration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
            </div>
            {/* Subtle floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-[#C5A059]/10">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059] mb-1">
                Origin
              </p>
              <p className="text-sm font-serif italic text-zinc-800">
                Swiss Biotechnology
              </p>
            </div>
          </div>

          {/* Text Content - Luxury Phrasing */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#C5A059]" />
                <h1 className="text-[#C5A059] font-medium tracking-[0.3em] uppercase text-[11px]">
                  {isEs
                    ? "Tratamiento de Caries Sin Torno"
                    : "Drill-Free Cavity Treatment"}
                </h1>
              </div>

              <h2 className="text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.1] lowercase">
                {isEs ? "El arte de la" : "The art of"}
                <br />
                <span className="italic font-light text-[#C5A059]">
                  {isEs ? "regeneración dental" : "dental regeneration"}
                </span>
              </h2>
            </div>

            <div className="space-y-8 text-zinc-500 leading-relaxed font-light text-lg font-brandon">
              <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-[#C5A059] first-letter:mr-2 first-letter:float-left">
                {isEs
                  ? "En nuestro enfoque pediátrico, reemplazamos el trauma del fresado tradicional por la ciencia de la preservación. Curodont™ Repair Fluoride Plus representa la máxima sofisticación en odontología mínimamente invasiva."
                  : "Within our pediatric approach, we replace the trauma of traditional drilling with the science of preservation. Curodont™ Repair Fluoride Plus represents the height of sophistication in minimally invasive dentistry."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {[
                  {
                    en: "Non-Invasive Architecture",
                    es: "Arquitectura No Invasiva",
                  },
                  {
                    en: "Needle-Free Comfort",
                    es: "Confort Sin Agujas",
                  },
                  {
                    en: "Biomimetic Healing",
                    es: "Curación Biomimética",
                  },
                  {
                    en: "Swiss Precision",
                    es: "Precisión Suiza",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b border-zinc-200 pb-3"
                  >
                    <span className="text-[#C5A059] text-xs">0{i + 1}</span>
                    <span className="text-sm uppercase tracking-widest font-bold text-zinc-800">
                      {isEs ? item.es : item.en}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-base italic">
                {isEs
                  ? "Guiamos los minerales esenciales al corazón del esmalte, permitiendo que el diente de su hijo se cure a sí mismo desde adentro hacia afuera."
                  : "We guide essential minerals to the heart of the enamel, allowing your child's tooth to heal itself from the inside out."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              {/* Internal Link to Booking or Contact */}
              <a href="https://www.patientsreach.com/schedule/TribecaDentalStudio/">
                <button className="bg-[#1A1A1A] text-white px-10 py-5 rounded-full uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#C5A059] transition-all duration-500 w-full sm:w-auto">
                  {isEs ? "Reservar Experiencia" : "Reserve Experience"}
                </button>
              </a>
              {/* External Link to Curodont (vVARDIS) */}
              <a
                href="https://professional.vvardis.us/product/curodont-repair-fluoride-plus/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 group px-10 py-5 border border-zinc-300 rounded-full hover:border-[#C5A059] transition-all duration-500 w-full sm:w-auto"
              >
                <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-zinc-600 group-hover:text-[#C5A059]">
                  {isEs ? "Explorar la Tecnología" : "Explore the Technology"}
                </span>
                <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curodont;
