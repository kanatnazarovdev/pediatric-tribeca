// src/app/[lang]/page.tsx
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/faq";
import Hero from "@/components/Hero";
import Technology from "@/components/Technology";
import Testimonial from "@/components/Testimonial";
import { getDictionary } from "./dictionaries";
import Diagnostics from "@/components/Diagnostics";
import Link from "next/link";
import Reviews from "@/components/Reviews";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === "es";

  const title = isEs 
    ? "Odontopediatra en Tribeca | Dentista para Niños en Manhattan NYC" 
    : "Pediatric Dentist Tribeca | Leading Kids Dentistry Manhattan NYC";
  
  const description = isEs
    ? "Especialistas en odontopediatría en Tribeca. Ofrecemos odontología sin dolor con láser, salud de las vías respiratorias y cuidado dental infantil de alta gama en NYC."
    : "Expert pediatric dentistry in Tribeca, NYC. We specialize in pain-free laser dentistry, airway health, and growth-centric dental care for children and infants.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://pediatrics.tribecadentalstudio.com/${lang}`,
      languages: {
        "en-US": "https://pediatrics.tribecadentalstudio.com/en",
        "es-ES": "https://pediatrics.tribecadentalstudio.com/es",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://pediatrics.tribecadentalstudio.com/${lang}`,
      siteName: "Tribeca Dental Studio 4 Kids",
      images: [
        {
          url: "/pediatricImage.webp", 
          width: 1200,
          height: 630,
          alt: "Tribeca Dental Studio Pediatric Office",
        },
      ],
      locale: isEs ? "es_US" : "en_US",
      type: "website",
    },
  };
}


export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isEs = lang === "es";

  const dict = await getDictionary(lang as "en" | "es");

  return (
    <main>
      <Hero dict={dict.hero} />

      <section className="sr-only" aria-hidden="true">
        <article>
          {isEs ? (
            <>
              <h1>Especialistas en Odontopediatría en Tribeca y Manhattan</h1>
              <p>
                Tribeca Dental Studio 4 kids ofrece una experiencia dental
                revolucionaria. Explore nuestra{" "}
                <Link href="/es/mission">misión</Link>, aprenda sobre nuestra
                <Link href="/es/innovation">innovación tecnológica</Link> y vea
                nuestros
                <Link href="/es/testimonials">testimonios de pacientes</Link>.
              </p>
              <p>
                Tribeca Dental Studio 4 kids ofrece una experiencia dental
                revolucionaria para niños en el corazón de la ciudad de Nueva
                York. Nuestro enfoque combina la odontología pediátrica de alta
                gama con un compromiso profundo con la salud de las vías
                respiratorias y el desarrollo funcional. Entendemos que la salud
                bucal infantil es la base del bienestar general.
              </p>
              <p>
                Utilizamos tecnología láser Biolase para tratamientos sin dolor
                y sin agujas, eliminando la ansiedad dental desde la primera
                visita. Nuestros servicios incluyen limpiezas preventivas,
                selladores, frenectomías láser y monitoreo del crecimiento
                maxilofacial para asegurar una respiración adecuada y un sueño
                reparador para su hijo en Manhattan.
              </p>
              <h2>Por qué elegir nuestro estudio dental en Tribeca</h2>
              <p>
                Ubicados en el área de Tribeca, servimos a comunidades en todo
                Manhattan, incluyendo SoHo, Battery Park City y el Financial
                District. Nuestra clínica está diseñada para ser un entorno
                acogedor donde la tecnología se encuentra con el cuidado humano.
              </p>
            </>
          ) : (
            <>
              <h1>Premier Pediatric Dentist in Tribeca & Manhattan, NYC</h1>
              <p>
                Tribeca Dental Studio 4 kids provides a revolutionary
                experience. Discover our <Link href="/en/mission">mission</Link>
                , see our
                <Link href="/en/innovation">dental innovation</Link>, and read
                our
                <Link href="/en/testimonials">patient success stories</Link>.
                Check our latest{" "}
                <Link href="/en/blog">pediatric dental blog</Link> for updates.
              </p>
              <p>
                Tribeca Dental Studio 4 kids provides a revolutionary dental
                experience for children in the heart of New York City. Our
                approach combines high-end pediatric dentistry with a deep
                commitment to airway health and functional development. We
                believe that childhood oral health is the cornerstone of
                lifelong wellness.
              </p>
              <p>
                Using Biolase laser technology, we provide pain-free,
                needle-free treatments that eliminate dental anxiety from the
                very first visit. Our services include preventative cleanings,
                sealants, laser frenectomies, and maxillofacial growth
                monitoring to ensure proper breathing and restful sleep for your
                child in Manhattan.
              </p>
              <h2>Why Choose Our Tribeca Dental Studio</h2>
              <p>
                Located in the TriBeCa area, we serve families throughout
                Manhattan, including SoHo, Battery Park City, and the Financial
                District. Our clinic is designed to be a calming environment
                where state-of-the-art technology meets compassionate,
                patient-centered care.
              </p>
            </>
          )}
        </article>
      </section>

      <section id="mission">
        <About lang={lang} />
      </section>

      <section id="diagnostics">
        <Diagnostics lang={lang} />
      </section>

      <section id="pediatric-tech">
        <Technology lang={lang} />
      </section>

      <section id="results">
        <Testimonial lang={lang} />
      </section>
      <section id="reviews">
        <Reviews />
      </section>

      <section id="faq">
        <FAQ lang={lang} />
      </section>

      <section id="leadForm">
        <ContactForm />
      </section>
    </main>
  );
}
