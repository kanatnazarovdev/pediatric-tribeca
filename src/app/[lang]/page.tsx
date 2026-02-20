// src/app/[lang]/page.tsx
import About from "@/components/About";
import Comparison from "@/components/Comparison";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/faq";
import Footer from "@/components/Footer";
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

  const dict = await getDictionary(lang as "en" | "es");
  return (
    <main>
      <Hero dict={dict.hero} />

      <About lang={lang} />
      <Diagnostics dict={dict.science} lang={lang} />
      <Technology lang={lang} />

      <Comparison lang={lang} />
      <Testimonial lang={lang} />
      <FAQ lang={lang} />
      <ContactForm />
      <Footer />
    </main>
  );
}
