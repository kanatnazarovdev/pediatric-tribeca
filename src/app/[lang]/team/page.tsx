// src/app/[lang]/team/page.tsx
import { client } from "@/sanity/lib/client";
import TeamGrid from "@/components/TeamGrid";

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
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gray-900">
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-5xl font-light tracking-widest uppercase mb-4">
            Meet Our Team
          </h1>
        </div>
      </section>

      {/* Pass the data to the Client Component */}
      <TeamGrid doctors={doctors} />
    </main>
  );
}
