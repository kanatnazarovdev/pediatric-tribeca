import { client } from "@/sanity/lib/client";
import TestimonialGrid from "@/components/TestimonialGrid";
import { testimonialsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { getAlternates } from "@/hooks/helper";
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === "es";

  return {
    title: isEs 
      ? "Historias de Éxito y Reseñas | Tribeca Dental Studio 4Kids" 
      : "Real Patient Stories & Reviews | Tribeca Dental Studio 4Kids",
    
    description: isEs
      ? "Vea por qué los padres de NYC confían en nuestra tecnología láser Biolase. Historias reales de visitas dentales sin dolor y sin lágrimas para niños en Tribeca."
      : "See why NYC parents trust our Biolase laser technology. Real stories of pain-free, tear-free dental visits for children in Lower Manhattan.",
    
    alternates: getAlternates(lang, "testimonials"),
    
    openGraph: {
      title: isEs ? "Testimonios de Pacientes" : "Patient Testimonials",
      description: isEs 
        ? "Odontología pediátrica sin miedo en NYC." 
        : "Fear-free pediatric dentistry in NYC.",
      type: 'website',
    }
  };
}
export default async function TestimonialsPage() {
  const testimonials = await client.fetch(testimonialsQuery);

  return (
    <main className="max-w-7xl mx-auto px-6 py-40">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-light tracking-tight text-zinc-900 mb-4 uppercase">
          Patient Stories
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
          Real experiences from our families. See why parents trust our 
          Biolase technology for a tear-free dental journey.
        </p>
      </header>

      <TestimonialGrid testimonials={testimonials} />
    </main>
  );
}