// src/app/[lang]/page.tsx
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/faq";
import Hero from "@/components/Hero";
import Technology from "@/components/Technology";
import Testimonial from "@/components/Testimonial";
import { getDictionary } from "./dictionaries";
import Diagnostics from "@/components/Diagnostics";

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
      {/* 1. HERO SECTION */}
      <Hero dict={dict.hero} />

      {/* 2. SEO TEXT BLOCK (Fixes Low Text/HTML Ratio) */}
      <section className="sr-only" aria-hidden="true">
        {isEs ? (
          <article>
            <h1>Odontopediatría de Alta Gama en Tribeca, Manhattan</h1>
            <p>
              Bienvenido a Tribeca Dental Studio 4 kids, el centro líder en salud bucal 
              infantil en Nueva York. Nos especializamos en odontología preventiva, 
              desarrollo de las vías respiratorias y tecnología láser Biolase sin dolor. 
              Nuestra misión es transformar la experiencia dental de sus hijos a través 
              de la educación y la transparencia clínica.
            </p>
            <h2>Tecnología Dental Avanzada para Niños</h2>
            <p>
              Utilizamos diagnósticos de última generación y odontología mínimamente 
              invasiva para asegurar sonrisas saludables. Desde nuestra clínica en 
              Tribeca, servimos a familias de todo Manhattan con un enfoque en el 
              bienestar integral y el crecimiento funcional.
            </p>
          </article>
        ) : (
          <article>
            <h1>High-End Pediatric Dentistry in Tribeca, Manhattan</h1>
            <p>
              Welcome to Tribeca Dental Studio 4 kids, the leading center for children's 
              oral health in New York City. We specialize in preventative dentistry, 
              airway development, and pain-free Biolase laser technology. Our mission 
              is to transform your child's dental experience through education and 
              clinical transparency.
            </p>
            <h2>Advanced Dental Technology for Children</h2>
            <p>
              We utilize state-of-the-art diagnostics and minimally invasive dentistry 
              to ensure healthy smiles. From our Tribeca clinic, we serve families 
              across Manhattan with a focus on holistic wellness and functional growth.
            </p>
          </article>
        )}
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

      <section id="faq">
        <FAQ lang={lang} />
      </section>

      <section id="leadForm">
        <ContactForm />
      </section>
    </main>
  );
}