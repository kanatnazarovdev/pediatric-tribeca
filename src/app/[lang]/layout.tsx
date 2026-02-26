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
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://pediatrics.tribecadentalstudio.com/${lang}`,
      languages: {
        "en-US": "https://pediatrics.tribecadentalstudio.com/en",
        "es-ES": "https://pediatrics.tribecadentalstudio.com/es",
      },
    },
    openGraph: {
      title: isEs
        ? "Salud Dental Infantil: Innovación y Cuidado en Tribeca"
        : "Pediatric Dental Health: Innovation & Care in Tribeca",
      description: isEs
        ? "Asegure el futuro de su hijo con tecnología dental sin dolor y expertos en desarrollo facial en NYC."
        : "Secure your child's future with pain-free dental technology and facial development experts in NYC.",
      url: `https://pediatrics.tribecadentalstudio.com/${lang}`,
      siteName: "Tribeca Dental Studio",
      images: [
        {
          url: "/pediatricImage.jpg",
          width: 1200,
          height: 630,
          alt: isEs
            ? "Clínica de Odontopediatría en Tribeca"
            : "Pediatric Dental Clinic in Tribeca",
        },
      ],
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
    },
    keywords: isEs
      ? ["Dentista para niños Tribeca", "Salud vías respiratorias pediátricas", "Láser Solea NYC", "Ortodoncia interceptiva"]
      : ["Kids dentist Tribeca", "Pediatric airway health", "Solea laser dentist NYC", "Mouth breathing treatment children"],
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