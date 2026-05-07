import Image from "next/image";
import { Metadata } from "next"; // Import Metadata type
import { client } from "@/sanity/lib/client";
import TeamGrid from "@/components/TeamGrid";

// SEO Metadata
export const metadata: Metadata = {
  title: "Meet Our Tribeca Pediatric Dentists | Kids Dental Specialists NYC",
  description:
    "Meet the expert pediatric dentists at Tribeca Dental Studio. We specialize in fear-free kids' dentistry, airway health, and laser treatments in Lower Manhattan.",
  openGraph: {
    title:
      "Expert Pediatric Dentists in Tribeca | Tribeca Dental Studio 4 kids",
    description:
      "Get to know our specialized team of children's dentists. From first visits to growth-centric airway care, we provide the best pediatric dental experience in NYC.",
    url: "https://pediatrics.tribecadentalstudio.com/team",
    images: [
      {
        url: "/team.webp",
        width: 1200,
        height: 630,
        alt: "Pediatric Dental Specialists at Tribeca Dental Studio 4 kids",
      },
    ],
  },
  keywords: [
    "pediatric dentist Tribeca",
    "kids dentistry Lower Manhattan",
    "childrens dentist NYC",
    "airway focused pediatric dentist",
    "laser dentistry for kids",
  ],
};

const TEAM_QUERY = `*[_type == "doctor"] | order(order asc) {
  name,
  role,
  "imageUrl": image.asset->url,
  "slug": slug.current
}`;

export default async function TeamPage() {
  const doctors = await client.fetch(TEAM_QUERY);

  return (
    <main className="bg-white min-h-screen">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/team.webp"
          alt="Our Medical Team of Specialist Doctors"
          fill
          priority
          className="object-cover object-top blur-[3px] scale-110"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-white text-5xl md:text-6xl font-light tracking-widest uppercase mb-4">
            Meet Our Team
          </h1>
          <p className="text-gray-200 text-lg font-light max-w-2xl mx-auto">
            Dedicated specialists committed to providing world-class care and
            personalized attention.
          </p>
        </div>
      </section>

      <TeamGrid doctors={doctors} />
    </main>
  );
}
