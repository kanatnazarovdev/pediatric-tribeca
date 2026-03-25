import PreKVisit from "./PreKVisit";
import { getAlternates } from "@/hooks/helper";
import { Metadata } from "next";

// 1. Fix Metadata (Must await params here too)
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
  // Await the params to extract the actual language string
  const resolvedParams = await params; 

  // Pass the resolved object to your client component
  return <PreKVisit params={resolvedParams} />;
}