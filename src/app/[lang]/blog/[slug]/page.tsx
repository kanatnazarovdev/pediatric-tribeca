/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link"; //
import { PortableText } from "@portabletext/react";
const components = {
  block: {
    h2: ({ children }: any) => (
      <h2
        className="text-3xl font-light uppercase tracking-tight text-black mt-12 mb-6"
        style={{ fontFamily: "var(--font-D-DIN)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-medium uppercase tracking-widest text-zinc-800 mt-8 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-8 leading-relaxed text-zinc-800 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#C5A059] pl-6 my-10 italic text-zinc-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // This fixes your missing links
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="text-[#C5A059] underline decoration-zinc-300 underline-offset-4 hover:decoration-[#C5A059] transition-all"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold text-black">{children}</strong>
    ),
  },
};
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
          <PortableText value={post.body} components={components} />
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
