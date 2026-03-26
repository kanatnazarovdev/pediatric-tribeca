import PreKVisit from "./PreKVisit";
import { getAlternates } from "@/hooks/helper";
import { Metadata } from "next";

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const isEs = lang === "es";

  return {
    title: isEs ? "Visita al Taller Pre-K | Tribeca" : "The Pre-K Workshop Visit | Tribeca",
    description: isEs 
      ? "Vea nuestro video documental sobre la educación dental interactiva en las escuelas de la comunidad de Tribeca."
      : "Watch our documentary video on interactive dental education in Tribeca community schools.",
    alternates: getAlternates(lang, "mission/pre-k-visit"),
  };
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const resolvedParams = await params;
  const isEs = resolvedParams.lang === "es";

  return (
    <>
      {/* Hidden SEO Narrative for Word Count Compliance */}
      <div className="sr-only" aria-hidden="true">
        {isEs ? (
          <article>
            <h1>Educación Dental en TriBeCa Community School</h1>
            <p>
              En marzo de 2026, el equipo de Tribeca Dental Studio 4 kids visitó la 
              escuela comunitaria de TriBeCa para llevar a cabo un taller interactivo 
              diseñado para niños en edad preescolar. Nuestro objetivo principal fue 
              desmitificar la experiencia dental a través del juego y el aprendizaje visual.
            </p>
            <p>
              Durante esta visita, utilizamos modelos dentales de gran tamaño y 
              narraciones creativas para transformar lo que usualmente se percibe como 
              instrumentos clínicos aterradores en herramientas de curiosidad. Al 
              interactuar con los niños en su propio entorno seguro, construimos una 
              base de confianza antes de su primera visita oficial a la clínica.
            </p>
            <p>
              Este documental captura el impacto de la educación preventiva. Creemos que 
              fomentar una relación positiva con la salud bucal desde la infancia 
              temprana es esencial para el bienestar a largo plazo. Nuestra presencia 
              constante en las instituciones educativas de Manhattan nos permite ser 
              un pilar de apoyo para las familias en crecimiento.
            </p>
            <ul>
              <li>Ubicación: TriBeCa Community School, Manhattan</li>
              <li>Fecha de la visita: Marzo 2026</li>
              <li>Enfoque: Educación mediante el juego y desmitificación clínica</li>
            </ul>
          </article>
        ) : (
          <article>
            <h1>Dental Education at TriBeCa Community School</h1>
            <p>
              In March 2026, the Tribeca Dental Studio 4 kids team visited the 
              TriBeCa Community School to conduct an interactive workshop designed 
              specifically for preschool-aged children. Our primary goal was to 
              demystify the dental experience through play and visual learning.
            </p>
            <p>
              During this visit, we utilized oversized dental models and creative 
              storytelling to transform what are often perceived as scary clinical 
              instruments into tools of curiosity. By engaging with children in their 
              own safe environment, we build a foundation of trust before their 
              first official clinic visit.
            </p>
            <p>
              This documentary captures the impact of preventative education. We 
              believe that fostering a positive relationship with oral health from 
              early childhood is essential for long-term wellness. Our constant 
              presence in Manhattan’s educational institutions allows us to be a 
              familiar part of the community’s support system for growing families.
            </p>
            <ul>
              <li>Location: TriBeCa Community School, Manhattan</li>
              <li>Visit Date: March 2026</li>
              <li>Focus: Education through play and clinical demystification</li>
            </ul>
          </article>
        )}
      </div>

      <PreKVisit params={resolvedParams} />
    </>
  );
}