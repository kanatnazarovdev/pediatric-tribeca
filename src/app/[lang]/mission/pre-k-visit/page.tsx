import PreKVisit from "./PreKVisit";
import { getAlternates } from "@/hooks/helper";

export function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return {
    alternates: getAlternates(lang, "pre-k-visit"),
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  return <PreKVisit lang={params.lang} />;
}