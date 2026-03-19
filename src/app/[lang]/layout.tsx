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
      ? "Odontopediatría y Salud de Vías Respiratorias | Tribeca Dental Studio"
      : "Pediatric Dentistry & Airway Health | Tribeca Dental Studio NYC",
    description: isEs
      ? "Cuidado dental avanzado para niños en Tribeca. Especialistas en desarrollo de vías respiratorias, láser Solea® sin dolor y ortodoncia preventiva."
      : "Advanced pediatric dental care in Tribeca. Specialists in airway development, pain-free Solea® laser, and preventative orthodontics.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://pediatrics.tribecadentalstudio.com/${lang}`,
      languages: {
        "en-US": "https://pediatrics.tribecadentalstudio.com/en",
        "es-ES": "https://pediatrics.tribecadentalstudio.com/es",
      },
    },
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const children = props.children;
  const lang = params.lang === "es" ? "es" : "en";
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Tribeca Dental Studio 4 kids",
    image: "https://pediatrics.tribecadentalstudio.com/pediatricImage.jpg",
    "@id": "https://pediatrics.tribecadentalstudio.com",
    url: "https://pediatrics.tribecadentalstudio.com",
    telephone: "212-561-5303",
    address: {
      "@type": "PostalAddress",
      streetAddress: "54 Warren stt", 
      addressRegion: "NY",
      postalCode: "10007",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.714885,
      longitude: -74.00906,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  };

  return (
    <html lang={lang} className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* Render JSON-LD in the head for better SEO indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-foreground antialiased selection:bg-[#C5A059] selection:text-white">
        {/* @ts-ignore */}
        <Header lang={lang} dict={dict} />
        {children}
      </body>
    </html>
  );
}
