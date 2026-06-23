/* eslint-disable @typescript-eslint/ban-ts-comment */
import "../globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { brandonGrotesque, dDin } from "../fonts";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { baseUrl, getAlternates } from "@/hooks/helper";
import Script from "next/script";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;

  const lang = rawLang === "es" ? "es" : rawLang === "zh" ? "zh" : "en";
  const isEs = lang === "es";
  const isZh = lang === "zh";

  return {
    title: isZh
      ? "纽约翠贝卡高端儿童牙科 | 曼哈顿下城专业儿童牙医"
      : isEs
        ? "Tribeca Dental Studio 4 Kids ® | Odontopediatría en NYC"
        : "Tribeca Dental Studio 4 Kids ® | Pediatric Dentist Tribeca NYC",
    description: isZh
      ? "纽约翠贝卡专业儿童牙科。我们专注于无痛激光牙科、气道健康和功能发育评估。"
      : isEs
        ? "Especialistas en odontopediatría en Tribeca. Láser Biolase sin dolor y salud de vías respiratorias. ¡Reserva el 'Smile Reset' de tu hijo!"
        : "Expert pediatric dentist in Tribeca, NYC. Pain-free Biolase laser dentistry & airway health. Book your child's 'Smile Reset' today!",
    metadataBase: new URL(baseUrl),

    alternates: getAlternates(lang, ""),
    openGraph: {
      title: "Pediatric Dentistry & Airway Health",
      description: "Advanced pediatric dental care in Tribeca.",
      url: baseUrl,
      siteName: "Tribeca Dental Studio 4 kids",
      images: [
        {
          url: `${baseUrl}/pediatricImage.webp`,
          width: 1200,
          height: 630,
          alt: "Tribeca Dental Studio 4 kids Interior",
        },
      ],
      locale: isZh ? "zh_CN" : isEs ? "es_ES" : "en_US",
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
  const lang = ["es", "zh"].includes(params.lang) ? params.lang : "en";
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Tribeca Dental Studio 4 kids",
    image: "https://pediatrics.tribecadentalstudio.com/pediatricImage.webp",
    "@id": "https://pediatrics.tribecadentalstudio.com",
    url: "https://pediatrics.tribecadentalstudio.com",
    telephone: "212-561-5303",
    knowsAbout: [
      "Pediatric Dentistry",
      "Airway Health",
      "Laser Dentistry",
      "Orthodontics",
    ],
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
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NQV9585B');
      `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-foreground antialiased selection:bg-[#C5A059] selection:text-white font-brandon">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQV9585B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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
        <Script 
          src="https://truelark.com/dental-chat-widget/js/config.js" 
          strategy="lazyOnload" 
        />
        <Script 
          src="https://truelark.com/dental-chat-widget/js/loader.js" 
          strategy="lazyOnload" 
        />
        <Script 
          id="truelark-init" 
          strategy="lazyOnload" 
          dangerouslySetInnerHTML={{
            __html: `
              var truelarkInterval = setInterval(function() {
                if (typeof fdchat === 'function') {
                  fdchat({ clientId: 80613 });
                  clearInterval(truelarkInterval);
                }
              }, 500);
            `
          }} 
        />
        
      </body>
    </html>
  );
}
