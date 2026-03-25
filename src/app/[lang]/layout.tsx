/* eslint-disable @typescript-eslint/ban-ts-comment */
import "../globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { brandonGrotesque, dDin } from "../fonts";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { baseUrl, getAlternates } from "@/hooks/helper";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang === "es" ? "es" : "en";
  const isEs = lang === "es";

  return {
    title: isEs
      ? "Odontopediatría y Salud de Vías Respiratorias | Tribeca Dental Studio 4 kids"
      : "Pediatric Dentistry & Airway Health | Tribeca Dental Studio 4 kids",
    description: isEs
      ? "Cuidado dental avanzado para niños en Tribeca. Especialistas en desarrollo de vías respiratorias, láser Solea® sin dolor y ortodoncia preventiva."
      : "Advanced pediatric dental care in Tribeca. Specialists in airway development, pain-free Solea® laser, and preventative orthodontics.",
    metadataBase: new URL(baseUrl),
    
    // THIS FIXES THE SEMRUSH HREFLANG ERRORS
    alternates: getAlternates(lang), 
    
    openGraph: {
      title: "Pediatric Dentistry & Airway Health",
      description: "Advanced pediatric dental care in Tribeca.",
      url: baseUrl,
      siteName: "Tribeca Dental Studio 4 kids",
      images: [
        {
          url: `${baseUrl}/pediatricImage.jpg`, 
          width: 1200,
          height: 630,
          alt: "Tribeca Dental Studio 4 kids Interior",
        },
      ],
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
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
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "54 Warren Street",
      addressLocality: "New York",
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
        ${dDin.variable}
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
        <NextTopLoader
          color="#C5A059"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #C5A059,0 0 5px #C5A059"
        />
        <Header lang={lang} dict={dict} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
