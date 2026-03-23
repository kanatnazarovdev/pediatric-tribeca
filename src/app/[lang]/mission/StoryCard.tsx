// src/components/community/StoryCard.tsx
import Link from "next/link";

interface Story {
  id: string;
  slug: string; // Added slug for routing
  title: string;
  location: string;
  date: string;
  thumbnail: string;
}

export default function StoryCard({ story, lang }: { story: Story; lang: string }) {
  console.log(story.slug)
  return (
    <Link href={`/mission/${story.slug}`} className="group cursor-pointer block">
      {/* Cinematic Thumbnail Wrapper */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[2.35/1]">
        <img
          src={story.thumbnail}
          alt={story.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle Play Overlay on Hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-[10px] uppercase tracking-[0.4em] border border-white/40 px-4 py-2 backdrop-blur-sm">
                View Film
            </span>
        </div>
      </div>

      {/* Metadata - Minimalist Editorial Style */}
      <div className="mt-6 flex flex-col gap-1">
        <div className="flex justify-between items-baseline">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
                {story.location} — {story.date}
            </span>
            <span className="text-[9px] text-gray-300 font-mono">0{story.id}</span>
        </div>
        <h3 className="text-xl font-light tracking-tight text-black group-hover:text-gray-600 transition-colors">
          {story.title}
        </h3>
      </div>
    </Link>
  );
}