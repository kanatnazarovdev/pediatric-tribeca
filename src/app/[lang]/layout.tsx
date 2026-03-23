/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { brandonGrotesque } from "../fonts";
import Footer from "@/components/Footer";

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
    metadataBase: new URL("https://pediatrics.tribecadentalstudio.com"),
    alternates: {
      // This ensures the canonical matches the specific language route
      canonical: `/${lang}`,
      languages: {
        "en-US": "/en",
        "es-ES": "/es",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const { children } = props;
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
      streetAddress: "54 Warren Street",
      addressLocality: "New York", // Added for better Local SEO
      addressRegion: "NY",
      postalCode: "10007",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.714885,
      longitude: -74.00906,
    },
  };

  return (
    <html
      lang={lang}
      className={`
        ${brandonGrotesque.variable} 
     
      `}
      style={{ fontFamily: "var(--font-brandon)" }}
    >
      <head>
        <meta
          name="google-site-verification"
          content="nLaRiqhDNEihAjZvM41oA3QZTgOteabWMXMuWiMcSsU"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-foreground antialiased selection:bg-[#C5A059] selection:text-white font-brandon">
        <Header lang={lang} dict={dict} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
