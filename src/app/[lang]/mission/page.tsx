import CommunityPage from "./mission";
import { getAlternates } from "@/hooks/helper";

export function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return {
    title: "Mission | Tribeca Dental Studio 4 kids",
    alternates: getAlternates(lang, "mission"),
  };
}

export default async function Page({ params }: { params: any }) {
  const resolvedParams = await params; 

  return <CommunityPage params={resolvedParams} />;
}