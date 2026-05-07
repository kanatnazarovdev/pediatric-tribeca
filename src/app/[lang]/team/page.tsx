/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import TeamGrid from "@/components/TeamGrid";
import { getAlternates } from "@/hooks/helper";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === "es";

  const title = isEs
    ? "Conozca a Nuestro Equipo | Tribeca Dental Studio 4 kids NYC"
    : "Meet Our Team | Tribeca Dental Studio 4 kids NYC";

  const description = isEs
    ? "Conozca a los especialistas de Tribeca Dental Studio 4 kids. Expertos en odontopediatría, salud de las vías respiratorias y tecnología láser en Manhattan."
    : "Meet the specialized team at Tribeca Dental Studio 4 kids. Experts in pediatric dentistry, airway health, and pain-free laser technology in Manhattan.";

  return {
    alternates: getAlternates(lang, "team"),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/team.webp",
          width: 1200,
          height: 630,
          alt: "Tribeca Dental Studio 4 kids Pediatric Team",
        },
      ],
    },
  };
}

const TEAM_QUERY = `*[_type == "doctor"] | order(order asc) {
  name,
  role,
  "imageUrl": image.asset->url,
  "slug": slug.current
}`;

export default async function TeamPage({ params }: any) {
  const { lang } = await params;
  const isEs = lang === "es";
  const doctors = await client.fetch(TEAM_QUERY);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/team.webp"
          alt="Our Medical Team of Specialist Doctors in Tribeca"
          fill
          priority
          className="object-cover object-top blur-[3px] scale-110"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 
            className="text-white text-5xl md:text-6xl font-light tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-D-DIN)" }}
          >
            {isEs ? "Nuestro Equipo" : "Meet Our Team"}
          </h1>
          <p className="text-gray-200 text-lg font-light max-w-2xl mx-auto tracking-wide">
            {isEs 
              ? "Especialistas dedicados comprometidos a brindar atención de clase mundial y atención personalizada."
              : "Dedicated specialists committed to providing world-class care and personalized attention."
            }
          </p>
        </div>
      </section>

      {/* SEO Content Section (Similar to your Blog structure) */}
      <div className="max-w-3xl w-full mx-auto mt-16 text-center px-6">
        <h2 
          className="text-2xl font-light uppercase tracking-widest mb-6 text-black" 
          style={{ fontFamily: "var(--font-D-DIN)" }}
        >
          {isEs ? "Cuidado Especializado para Niños" : "Specialized Care for Children"}
        </h2>
        <p className="text-zinc-600 leading-relaxed font-light">
          {isEs ? (
            <>
              En <strong>Tribeca Dental Studio 4 kids</strong>, nuestro equipo de especialistas 
              está enfocado en mucho más que limpiezas. Nos especializamos en la 
              salud integral, desde el desarrollo de las vías respiratorias hasta 
              frenectomías con láser sin dolor. Ubicados en el corazón de Manhattan, 
              nuestros doctores combinan años de experiencia con un enfoque compasivo 
              para asegurar que cada niño crezca con una sonrisa saludable y funcional.
            </>
          ) : (
            <>
              At <strong>Tribeca Dental Studio 4 kids</strong>, our team of specialists 
              is focused on much more than just cleanings. We specialize in total 
              health, from airway development to pain-free laser frenectomies. 
              Located in the heart of Manhattan, our doctors combine years of 
              expertise with a compassionate approach to ensure every child grows 
              with a healthy, functional smile.
            </>
          )}
        </p>
      </div>

      <TeamGrid doctors={doctors} />
    </main>
  );
}