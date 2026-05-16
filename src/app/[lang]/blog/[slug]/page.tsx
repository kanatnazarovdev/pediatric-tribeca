/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { baseUrl } from "@/hooks/helper";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getPost(slug, lang);

  if (!post) return {};

  const slugMap: Record<string, string> = { en: slug, es: slug, zh: slug };

  post.translations?.forEach((t: { language: string; slug: string }) => {
    if (t.language) slugMap[t.language] = t.slug;
  });

  return {
    title: `${post.title} | TDS 4 Kids`,
    description: post.excerpt || post.title,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog/${slug}/`,
      languages: {
        en: `${baseUrl}/en/blog/${slugMap.en}/`, 
        es: `${baseUrl}/es/blog/${slugMap.es}/`, 
        zh: `${baseUrl}/zh/blog/${slugMap.zh}/`, // Changed from "zh-Hans"
        "x-default": `${baseUrl}/en/blog/${slugMap.en}/`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [{ url: urlFor(post.mainImage).url() }] : [],
    },
  };
}
const portableTextComponents: any = {
  block: {
    h2: ({ children }: any) => (
      <h2
        className="text-3xl font-light uppercase tracking-tight text-black mt-16 mb-6"
        style={{ fontFamily: "var(--font-d-din)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-medium uppercase tracking-widest text-zinc-800 mt-10 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-8 leading-relaxed text-zinc-800 font-light text-lg">
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
    link: ({ children, value }: any) => {
      const isExternal = !value.href.startsWith("/");
      return (
        <Link
          href={value.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[#C5A059] underline decoration-zinc-300 underline-offset-4 hover:text-black transition-all duration-300 font-medium"
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

async function getPost(slug: string, lang: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug && language == $lang][0]{
      title,
      mainImage,
      body,
      publishedAt,
      "excerpt": array::join(string::split((pt::text(body)), "")[0..160], ""),
      
      // 1. Fetch translations if this is the source document
      "translations": *[_type == "post" && references(^._id) || _id == ^.translationOf._ref]{
        language,
        "slug": slug.current
      },
      
      // Filter next post by SAME language
      "next": *[_type == "post" && language == $lang && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{ 
        "slug": slug.current, 
        title 
      },
      
      // Filter previous post by SAME language
      "previous": *[_type == "post" && language == $lang && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{ 
        "slug": slug.current, 
        title 
      }
    }`,
    { slug, lang },
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const post = await getPost(slug, lang);

  if (!post) return <div className="py-24 text-center">Post not found</div>;

  return (
    <article className="bg-[#fafaf4] text-zinc-900 min-h-screen pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6 text-center mb-5 mt-10 lg:mt-20">
        <h1
          className="text-4xl md:text-5xl font-light tracking-tight uppercase mb-4 text-black"
          style={{ fontFamily: "var(--font-d-din)" }}
        >
          {post.title}
        </h1>
        <p className="text-zinc-500 text-sm uppercase tracking-widest">
          {new Date(post.publishedAt).toLocaleDateString(
            lang === "zh" ? "zh-CN" : lang,
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          )}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 mb-10 lg:mb-10">
        <div className="relative aspect-[16/11] w-full overflow-hidden shadow-sm ">
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

      <div className="max-w-3xl mx-auto px-6 font-light leading-relaxed text-zinc-800">
        <div className="prose prose-zinc lg:prose-xl max-w-none mb-20">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        {/* Navigation Footer */}
        <div className="pt-12 mt-20 border-t border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {/* Previous Post */}
            <div className="text-left">
              {post.previous ? (
                <Link
                  href={`/${lang}/blog/${post.previous.slug}`}
                  className="group block"
                >
                  <span className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] block mb-2">
                    {lang === "zh"
                      ? "上一篇"
                      : lang === "es"
                        ? "Anterior"
                        : "Previous"}
                  </span>
                  <span className="text-black text-sm font-medium group-hover:text-[#C5A059] transition-colors line-clamp-1">
                    {post.previous.title}
                  </span>
                  <span> ←</span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Center: Back to Blog */}
            <div className="flex justify-center order-first md:order-none">
              <Link
                href={`/${lang}/blog`}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center group-hover:border-[#C5A059] transition-colors">
                  <span className="text-zinc-400 group-hover:text-[#C5A059]">
                    ▦
                  </span>
                </div>
                <span className="text-zinc-400 text-[10px] uppercase tracking-[0.4em]">
                  {lang === "zh"
                    ? "博客首页"
                    : lang === "es"
                      ? "Blog"
                      : "Blog Page"}
                </span>
              </Link>
            </div>

            {/* Next Post */}
            <div className="text-right">
              {post.next ? (
                <Link
                  href={`/${lang}/blog/${post.next.slug}`}
                  className="group block"
                >
                  <span className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] block mb-2">
                    {lang === "zh"
                      ? "下一篇"
                      : lang === "es"
                        ? "Siguiente"
                        : "Next"}
                  </span>
                  <span className="text-black text-sm font-medium group-hover:text-[#C5A059] transition-colors line-clamp-1">
                    {post.next.title}
                  </span>
                  <span>→</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
