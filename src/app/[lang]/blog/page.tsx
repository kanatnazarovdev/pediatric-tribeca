/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getAlternates } from "@/hooks/helper";
import { groq } from "next-sanity";

const POSTS_PER_PAGE = 9;

export async function generateMetadata({ params, searchParams }: any) {
  const { lang: rawLang } = await params;
  const resolvedSearchParams = await searchParams;
  
  // Safely normalize the page query string
  const rawPage = resolvedSearchParams?.page;
  const pageNum = rawPage ? parseInt(rawPage, 10) : 1;

  const lang = rawLang === "es" ? "es" : rawLang === "zh" ? "zh" : "en";
  const isEs = lang === "es";
  const isZh = lang === "zh";

  // Use the helper config base settings
  const alternatesConfig = getAlternates(lang, "blog", rawPage);

  // CRITICAL FIX: Ensure the output tags mirror EXACTLY what URL is being viewed to avoid SEMrush 308/Mismatches
  // If the URL contains an explicit page parameter greater than 1, append it.
  const querySuffix = pageNum > 1 ? `?page=${pageNum}` : "";

  return {
    alternates: {
      canonical: `${alternatesConfig.canonical.replace(/\/$/, "")}${querySuffix}`,
      languages: {
        "en": `${alternatesConfig.languages.en.replace(/\/$/, "")}${querySuffix}`,
        "es": `${alternatesConfig.languages.es.replace(/\/$/, "")}${querySuffix}`,
        "zh": `${alternatesConfig.languages.zh.replace(/\/$/, "")}${querySuffix}`,
        "x-default": `${alternatesConfig.languages["x-default"].replace(/\/$/, "")}${querySuffix}`,
      }
    }, 
    title: isZh 
      ? "儿童牙科博客 | 曼哈顿翠贝卡专家资讯" 
      : isEs
      ? "Blog de Odontopediatría | Tribeca"
      : "Pediatric Dental Blog | Tribeca",
    description: isZh
      ? "探索关于儿童口腔健康、预防性正畸、气道发育以及翠贝卡先进牙科技术的专业文章。"
      : isEs
      ? "Explora artículos sobre salud bucal infantil, ortodoncia preventiva y tecnología dental avanzada en Tribeca."
      : "Explore articles on children's oral health, preventative orthodontics, and advanced dental tech at Tribeca.",
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>; 
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const lang = resolvedParams.lang;
  const currentPage = Math.max(1, parseInt(resolvedSearchParams.page || "1", 10));
  
  const isEs = lang === "es";
  const isZh = lang === "zh";
  
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;

  const paginatedPostsQuery = groq`
    {
      "posts": *[_type == "post" && language == $lang] | order(publishedAt desc) [$start...$end],
      "total": count(*[_type == "post" && language == $lang])
    }
  `;

  const { posts, total } = await client.fetch(paginatedPostsQuery, { 
    lang, 
    start: startIdx, 
    end: endIdx 
  });

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-6 bg-[#fafaf4]">
      {/* Header Section */}
      <div className="bg-[#1a1a1a] w-[100vw] h-[38vh] flex items-end justify-center lg:h-[25vh]">
        <header className="text-center mb-12">
          <h1
            className="text-5xl font-light mb-6 tracking-tight uppercase text-white"
            style={{ fontFamily: "var(--font-D-DIN)" }}
          >
            {isZh ? "工作室日志" : isEs ? "Nuestro Blog" : "Blog"}
          </h1>
          <p className="text-[18px] font-light tracking-[6px] text-zinc-400">
            {isZh ? "来自工作室的专业见解" : isEs ? "NOTAS DESDE EL ESTUDIO" : "NOTES FROM THE STUDIO"}
          </p>
        </header>
      </div>

      {/* SEO Intro Section */}
      <div className="max-w-3xl w-full mt-16 text-center border-b border-zinc-200 pb-12">
        <h2
          className="text-2xl font-light uppercase tracking-widest mb-6 text-black"
          style={{ fontFamily: "var(--font-D-DIN)" }}
        >
          {isZh 
            ? "赋能健康的笑容" 
            : isEs
            ? "Educación para Sonrisas Saludables"
            : "Education for Healthy Smiles"}
        </h2>
        <div className="text-zinc-600 leading-relaxed font-light">
          {isZh ? (
            <p>
              欢迎来到 <strong>Tribeca Dental Studio 4 kids</strong> 的官方资源中心。我们坚信，健康的笑容始于教育。在此博客中，我们的专家将分享关于气道发育、Biolase 无痛激光技术的优势，以及从小培养孩子口腔卫生习惯的专业建议。我们的目标是为曼哈顿家庭提供必要的资讯，助力孩子拥有一生的口腔健康。
            </p>
          ) : isEs ? (
            <p>
              Bienvenidos al recurso oficial de{" "}
              <strong>Tribeca Dental Studio 4 kids</strong>. Creemos que una
              sonrisa saludable comienza con la educación. En este blog,
              nuestros especialistas comparten conocimientos profundos sobre el
              desarrollo de las vías respiratorias, los beneficios de la
              tecnología láser Biolase sin dolor y consejos prácticos para
              mantener la higiene bucal de sus hijos desde una edad temprana.
            </p>
          ) : (
            <p>
              Welcome to the official resource hub of{" "}
              <strong>Tribeca Dental Studio 4 kids</strong>. We believe a
              healthy smile begins with education. In this blog, our specialists
              share deep insights into airway development, the benefits of
              pain-free Biolase laser technology, and practical tips for
              maintaining your child’s oral hygiene from an early age.
            </p>
          )}
        </div>
      </div>

      {/* Blog Post Grid */}
      <div className="max-w-7xl w-full mt-10 lg:mt-15 mb-10 lg:mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post: any) => {
            const postHref = `/${lang}/blog/${post.slug.current}`;

            return (
              <Link key={post.slug.current} href={postHref} className="group">
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
                    className="text-xl font-medium text-black leading-tight group-hover:text-[#C5A059] transition-colors uppercase"
                    style={{ fontFamily: "var(--font-D-DIN)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 text-[14px] line-clamp-2 font-light leading-relaxed tracking-wider">
                    {post.excerpt}
                  </p>
                  <div className="pt-2 text-[10px] uppercase tracking-widest text-zinc-600">
                    {new Date(post.publishedAt).toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang)} —{" "}
                    {post.authorName}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Pagination UI Control Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8 border-t border-zinc-200 pt-8 w-full max-w-7xl">
          {currentPage > 1 ? (
            <Link
              href={`/${lang}/blog${currentPage - 1 > 1 ? `?page=${currentPage - 1}` : ""}`}
              className="text-sm uppercase tracking-widest text-zinc-800 hover:text-[#C5A059] transition-colors font-medium"
            >
              {isZh ? "← 上一页" : isEs ? "← Anterior" : "← Previous"}
            </Link>
          ) : (
            <span className="text-sm uppercase tracking-widest text-zinc-300 pointer-events-none font-light">
              {isZh ? "← 上一页" : isEs ? "← Anterior" : "← Previous"}
            </span>
          )}

          <div className="text-sm tracking-wider text-zinc-600 font-light">
            {isZh 
              ? `第 ${currentPage} 页，共 ${totalPages} 页` 
              : isEs 
              ? `Página ${currentPage} de ${totalPages}` 
              : `Page ${currentPage} of ${totalPages}`}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={`/${lang}/blog?page=${currentPage + 1}`}
              className="text-sm uppercase tracking-widest text-zinc-800 hover:text-[#C5A059] transition-colors font-medium"
            >
              {isZh ? "下一页 →" : isEs ? "Siguiente →" : "Next →"}
            </Link>
          ) : (
            <span className="text-sm uppercase tracking-widest text-zinc-300 pointer-events-none font-light">
              {isZh ? "下一页 →" : isEs ? "Siguiente →" : "Next →"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}