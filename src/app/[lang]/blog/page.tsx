/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getAlternates } from "@/hooks/helper";

export async function generateMetadata({ params }: any) {
  const { lang } = await params;
  const isEs = lang === "es";
  return {
    alternates: getAlternates(lang, "blog"),
    title: isEs ? "Blog de Odontopediatría | Tribeca" : "Pediatric Dental Blog | Tribeca",
    description: isEs 
      ? "Explora artículos sobre salud bucal infantil, ortodoncia preventiva y tecnología dental avanzada en Tribeca."
      : "Explore articles on children's oral health, preventative orthodontics, and advanced dental tech at Tribeca.",
  };
}

export default async function BlogPage({
  params,
}: {
  params: { lang: string };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const isEs = lang === "es";
  const posts = await client.fetch(postsQuery);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-6 bg-[#fafaf4]">
      {/* Header Section */}
      <div className="bg-[#1a1a1a] w-[100vw] h-[38vh] flex items-end justify-center lg:h-[25vh]">
        <header className="text-center mb-12">
          <h1
            className="text-5xl font-light mb-6 tracking-tight uppercase text-white"
            style={{ fontFamily: "var(--font-D-DIN)" }}
          >
            {isEs ? "Nuestro Blog" : "Blog"}
          </h1>
          <p className="text-[18px] font-light tracking-[6px] text-zinc-400">
            {isEs ? "NOTAS DESDE EL ESTUDIO" : "NOTES FROM THE STUDIO"}
          </p>
        </header>
      </div>

      {/* SEO Intro Section: This fixes the "Low Word Count" Error */}
      <div className="max-w-3xl w-full mt-16 text-center border-b border-zinc-200 pb-12">
        <h2 className="text-2xl font-light uppercase tracking-widest mb-6 text-black" style={{ fontFamily: "var(--font-D-DIN)" }}>
          {isEs ? "Educación para Sonrisas Saludables" : "Education for Healthy Smiles"}
        </h2>
        <p className="text-zinc-600 leading-relaxed font-light">
          {isEs ? (
            <>
              Bienvenidos al recurso oficial de <strong>Tribeca Dental Studio 4 kids</strong>. 
              Creemos que una sonrisa saludable comienza con la educación. En este blog, 
              nuestros especialistas comparten conocimientos profundos sobre el 
              desarrollo de las vías respiratorias, los beneficios de la tecnología 
              láser Biolase sin dolor y consejos prácticos para mantener la higiene 
              bucal de sus hijos desde una edad temprana. Nuestro objetivo es empoderar 
              a las familias de Manhattan con la información necesaria para una 
              vida de salud dental óptima.
            </>
          ) : (
            <>
              Welcome to the official resource hub of <strong>Tribeca Dental Studio 4 kids</strong>. 
              We believe a healthy smile begins with education. In this blog, our 
              specialists share deep insights into airway development, the benefits 
              of pain-free Biolase laser technology, and practical tips for maintaining 
              your child’s oral hygiene from an early age. Our goal is to empower 
              Manhattan families with the information needed for a lifetime of 
              optimal dental health.
            </>
          )}
        </p>
      </div>

<div className="max-w-7xl w-full mt-10 lg:mt-15 mb-10 lg:mb-18">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
    {posts.map((post: any) => {
   
      const postHref = `/${lang}/blog/${post.slug.current}`;

      return (
        <Link
          key={post.slug.current}
          href={postHref}
          className="group"
        >
          <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-zinc-900 shadow-sm">
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>
          <div className="space-y-3">
            <h2
              className="text-xl font-medium text-black leading-tight group-hover:text-[#8ed1fc] transition-colors uppercase"
              style={{ fontFamily: "var(--font-D-DIN)" }}
            >
              {post.title}
            </h2>
            <p className="text-zinc-500 text-[14px] line-clamp-2 font-light leading-relaxed tracking-wider">
              {post.excerpt}
            </p>
            <div className="pt-2 text-[10px] uppercase tracking-widest text-zinc-600">
              {new Date(post.publishedAt).toLocaleDateString(lang)} — {post.authorName}
            </div>
          </div>
        </Link>
      );
    })}
  </div>
</div>
    </div>
  );
}