import CommunityPage from "./mission";
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
      ? "Nuestra Misión | Tribeca Dental Studio 4 kids" 
      : "Our Mission | Tribeca Dental Studio 4 kids",
    description: isEs
      ? "Nuestra misión es transformar la odontología pediátrica a través de la educación, la tecnología láser sin dolor y el compromiso con la comunidad de Tribeca."
      : "Our mission is to transform pediatric dentistry through education, pain-free laser technology, and a deep commitment to the Tribeca community.",
    alternates: getAlternates(lang, "mission"),
  };
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // const resolvedParams = await params;
  const { lang } = await params; // Resolve here for the SEO content logic
  const isEs = lang === "es";

  return (
    <>
      <div className="sr-only" aria-hidden="true">
        {isEs ? (
          <article>
            <h1>Nuestra Misión Pediátrica en Manhattan</h1>
            <p>
              En Tribeca Dental Studio 4 kids, nuestra misión va más allá de la odontología 
              tradicional. Nos dedicamos a mejorar el bienestar infantil en toda el área 
              de Manhattan a través de tres pilares fundamentales: educación, tecnología 
              y comunidad. Creemos que la salud bucal comienza con la desmitificación de 
              la consulta dental, transformando el miedo en curiosidad mediante talleres 
              en escuelas y Pre-K locales.
            </p>
            <p>
              Nuestra clínica se enorgullece de ser una parte integral de la comunidad de 
              Tribeca. Colaboramos estrechamente con instituciones educativas para 
              fomentar hábitos saludables desde una edad temprana. Al utilizar producción 
              cinematográfica para documentar nuestras historias y el cuidado de nuestros 
              pacientes, ofrecemos una transparencia clínica total. Estamos aquí para 
              asegurar que cada niño reciba una atención dental de alta gama, preventiva 
              y sin dolor.
            </p>
            <ul>
              <li>Más de 12 escuelas asociadas en Nueva York</li>
              <li>Más de 500 niños educados a través de nuestros talleres</li>
              <li>Compromiso total con la salud de las vías respiratorias infantiles</li>
              <li>Transparencia clínica mediante documentación visual</li>
            </ul>
          </article>
        ) : (
          <article>
            <h1>Our Pediatric Mission in Manhattan</h1>
            <p>
              At Tribeca Dental Studio 4 kids, our mission extends beyond traditional 
              dentistry. We are dedicated to architecting the future of childhood 
              wellness across Manhattan through three core pillars: education, 
              technology, and community engagement. We believe that oral health 
              starts with demystifying the dental visit, turning fear into curiosity 
              through interactive workshops at local preschools and schools.
            </p>
            <p>
              Our clinic is proud to be a rooted part of the TriBeCa community. We 
              partner with local educational institutions to foster healthy habits 
              from a young age. By utilizing high-end cinematic production to document 
              our patient stories and clinical reality, we offer total transparency 
              into pediatric care. We are here to ensure every child receives 
              preventative, pain-free, and world-class dental attention.
            </p>
            <ul>
              <li>12+ Partner schools in New York City</li>
              <li>500+ Children educated through our workshop series</li>
              <li>100% Commitment to clinical transparency and documentation</li>
              <li>Focus on airway development and functional pediatric growth</li>
            </ul>
          </article>
        )}
      </div>

      <CommunityPage params={params} />
    </>
  );
}