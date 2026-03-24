import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link"; //
import { PortableText } from "@portabletext/react";

async function getPost(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      body,
      publishedAt
    }`,
    { slug },
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const post = await getPost(slug);

  if (!post) return <div className="py-24 text-center">Post not found</div>;

  return (
    <article className="bg-[#fafaf4] text-zinc-900 min-h-screen pt-24 pb-32">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-5 mt-10 lg:mt-20">
        <h1
          className="text-4xl md:text-5xl font-light tracking-tight uppercase mb-4 text-black"
          style={{ fontFamily: "var(--font-D-DIN)" }}
        >
          {post.title}
        </h1>
        <p className="text-zinc-500 text-sm uppercase tracking-widest">
          {new Date(post.publishedAt).toLocaleDateString(lang, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 mb-10 lg:mb-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden shadow-sm">
          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-3xl mx-auto px-6 font-light leading-relaxed text-lg text-zinc-800">
        <div className="prose prose-zinc lg:prose-xl prose-p:mb-8 prose-headings:font-normal mb-20">
          <PortableText value={post.body} />
        </div>

        {/* Navigation Footer */}
        <div className="pt-12 border-t border-zinc-200 flex justify-center">
          <Link
            href={`/${lang}/blog`}
            className="group flex flex-col items-center gap-3 transition-colors duration-300"
          >
            <span className="text-zinc-400 text-[10px] uppercase tracking-[0.4em]">
              {lang === "es" ? "Explorar más" : "Continue Reading"}
            </span>
            <span className="text-black text-sm uppercase tracking-[0.2em] font-medium group-hover:text-[#C5A059] transition-colors">
              {lang === "es" ? "← Volver al Blog" : "← Back to Blog"}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
