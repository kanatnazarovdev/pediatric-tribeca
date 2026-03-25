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
  const resolvedParams = await params; 
  return <CommunityPage params={resolvedParams} />;
}