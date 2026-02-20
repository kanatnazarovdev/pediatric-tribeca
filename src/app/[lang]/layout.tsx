/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";
import { getDictionary } from "./dictionaries";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant-garamond",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang || "en";
  const isEs = lang === "es";

  return {
    title: isEs
      ? "Tratamiento para Ronquidos NightLase® | Tribeca Dental Studio NYC"
      : "NightLase® Snoring Treatment | Tribeca Dental Studio NYC",
    description: isEs
      ? "Duerma profundamente y sin ruidos con NightLase®. Tratamiento láser no invasivo para ronquidos y apnea del sueño en Tribeca. Sin cirugía."
      : "Experience deep, quiet sleep with NightLase®. A non-invasive, laser-based treatment for snoring and sleep apnea in Tribeca. No surgery, no downtime.",
    icons: {
      icon: "/TribecaLogo.png",
      shortcut: "/TribecaLogo.png",
      apple: "/TribecaLogo.png",
    },
    verification: {
      google: "FvXb6KDkt8yxyo6HnbW1yLiHs9YrgSWnt0xbQ2cag0I",
    },
    alternates: {
      canonical: `https://nightlase.tribecadentalstudio.com/${lang}`,
      languages: {
        "en-US": "https://nightlase.tribecadentalstudio.com/en",
        "es-ES": "https://nightlase.tribecadentalstudio.com/es",
      },
    },
    openGraph: {
      title: isEs
        ? "NightLase®: La solución de lujo para dormir mejor | NYC"
        : "NightLase®: The Luxury Solution for Better Sleep | NYC",
      description: isEs
        ? "Transforme su sueño y salud en Tribeca Dental. Descubra el poder no invasivo de NightLase®."
        : "Transform your sleep and health at Tribeca Dental. Discover the non-invasive power of NightLase®.",
      url: `https://nightlase.tribecadentalstudio.com/${lang}`,
      siteName: "Tribeca Dental Studio",
      images: [
        {
          url: "/After.png",
          width: 1200,
          height: 630,
          alt: isEs
            ? "Tratamiento NightLase en Tribeca Dental"
            : "NightLase Treatment at Tribeca Dental",
        },
      ],
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
    },
    keywords: isEs
      ? ["NightLase NYC", "Tratamiento ronquidos Tribeca", "Apnea del sueño láser", "Curar ronquidos NYC"]
      : ["NightLase NYC", "Snoring treatment Tribeca", "Sleep apnea laser therapy", "Non-invasive snoring cure"],
  };
}

// Update 2: Correcting the LayoutProps for Next.js 15
export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const children = props.children;
  
  const lang = params.lang === "es" ? "es" : "en";
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-white text-foreground antialiased selection:bg-luxury-gold selection:text-white">
        {/* @ts-ignore */}
        <Header lang={lang} dict={dict} />
        {children}
      </body>
    </html>
  );
}