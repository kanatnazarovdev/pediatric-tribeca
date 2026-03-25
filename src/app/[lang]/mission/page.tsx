import CommunityPage from "./mission";
import { getAlternates } from "@/hooks/helper";

export function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return {
    alternates: getAlternates(lang, "mission"),
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  return <CommunityPage lang={params.lang} />;
}