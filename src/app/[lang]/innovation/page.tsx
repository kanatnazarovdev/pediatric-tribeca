import InnovationPage from "./innovation";
import { getAlternates } from "@/hooks/helper";

export function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return {
    alternates: getAlternates(lang, "innovation"),
  };
}

export default function Page() {
  return <InnovationPage />;
}