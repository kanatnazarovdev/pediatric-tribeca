import PreKVisit from "./PreKVisit";
import { getAlternates } from "@/hooks/helper";
import { Metadata } from "next";

// 1. Fix Metadata (Must await params here too)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: "The Pre-K Workshop | Tribeca Dental Studio 4 kids",
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