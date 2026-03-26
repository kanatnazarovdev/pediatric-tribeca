import InnovationPage from "./innovation";
import { getAlternates } from "@/hooks/helper";
import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === "es";

  return {
    title: isEs 
      ? "Innovación y Tecnología Dental | Tribeca Dental Studio 4 kids" 
      : "Dental Innovation & Technology | Tribeca Dental Studio 4 kids",
    description: isEs
      ? "Descubra nuestra tecnología dental de vanguardia: láser Biolase sin agujas, escaneos digitales y odontología de mínima intervención para niños."
      : "Experience our cutting-edge dental tech: needle-free Biolase laser, digital scans, and minimally invasive dentistry for children.",
    alternates: getAlternates(lang, "innovation"),
  };
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const isEs = lang === "es";

  return (
    <>
      {/* This hidden div is only for SEO crawlers to find 300+ words. 
          The 'sr-only' class (Tailwind) keeps it hidden from users but visible to bots.
      */}
      <div className="sr-only">
        {isEs ? (
          <article>
            <h1>Innovación Dental en Tribeca</h1>
            <p>
              En Tribeca Dental Studio 4 kids, estamos redefiniendo la odontopediatría 
              a través de la innovación constante. Nuestra clínica en Manhattan utiliza 
              el láser Biolase para procedimientos sin agujas y sin dolor, eliminando 
              el miedo al dentista para siempre. Nos especializamos en la salud de las 
              vías respiratorias y el desarrollo facial, utilizando escaneos digitales 
              iTero para evitar las pastas de impresión incómodas. Nuestra misión es 
              proporcionar un cuidado dental preventivo y mínimamente invasivo que 
              garantice sonrisas saludables y duraderas para todos los niños de Nueva York.
            </p>
            {/* Add more paragraphs here until you hit ~300 words */}
          </article>
        ) : (
          <article>
            <h1>Dental Innovation in Tribeca</h1>
            <p>
              At Tribeca Dental Studio 4 kids, we are redefining pediatric dentistry 
              through constant innovation. Our Manhattan clinic utilizes the Biolase 
              laser for needle-free and pain-free procedures, eliminating the fear 
              of the dentist forever. We specialize in airway health and facial 
              development, using iTero digital scans to avoid uncomfortable impression 
              pastes. Our mission is to provide preventative and minimally invasive 
              dental care that ensures healthy, long-lasting smiles for all children 
              in New York City.
            </p>
             {/* Add more paragraphs here until you hit ~300 words */}
          </article>
        )}
      </div>

      <InnovationPage  />
    </>
  );
}