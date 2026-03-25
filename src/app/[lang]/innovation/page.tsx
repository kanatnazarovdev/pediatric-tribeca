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
      ? "Descubra nuestra tecnología dental de vanguardia: láser Solea sin agujas, escaneos digitales y odontología de mínima intervención para niños."
      : "Experience our cutting-edge dental tech: needle-free Solea laser, digital scans, and minimally invasive dentistry for children.",
    
    alternates: getAlternates(lang, "innovation"),
  };
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  return <InnovationPage />;
}