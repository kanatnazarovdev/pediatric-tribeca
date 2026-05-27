/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { getAlternates } from "@/hooks/helper";
import { groq } from "next-sanity";
import InfiniteBlogGrid from "../../../components/blog/InfiniteBlogGrid";

const POSTS_PER_PAGE = 9;

export async function generateMetadata({ params, searchParams }: any) {
  const { lang: rawLang } = await params;
  const resolvedSearchParams = await searchParams;
  
  const rawPage = resolvedSearchParams?.page;

  const lang = rawLang === "es" ? "es" : rawLang === "zh" ? "zh" : "en";
  const isEs = lang === "es";
  const isZh = lang === "zh";

  // Point the base parameters back to the clean primary directory
  const alternatesConfig = getAlternates(lang, "blog", rawPage);

  return {
    alternates: {
      // CLEAN EXTRACTION: Strip trailing slashes and permanently drop the dynamic query strings
      canonical: `${alternatesConfig.canonical.replace(/\/$/, "")}`,
      languages: {
        "en": `${alternatesConfig.languages.en.replace(/\/$/, "")}`,
        "es": `${alternatesConfig.languages.es.replace(/\/$/, "")}`,
        "zh": `${alternatesConfig.languages.zh.replace(/\/$/, "")}`,
        "x-default": `${alternatesConfig.languages["x-default"].replace(/\/$/, "")}`,
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
      ? "Explora artículos sobre salud bucal infantil, ortodoncia preventiva and tecnología dental avanzada en Tribeca."
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
  // Fall back smoothly to page 1 to load initial posts natively via server architecture
  const currentPage = 1; 
  
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
          {isZh ? "赋能健康的笑容" : isEs ? "Educación para Sonrisas Saludables" : "Education for Healthy Smiles"}
        </h2>
        <div className="text-zinc-600 leading-relaxed font-light">
          {isZh ? (
            <p>欢迎来到 <strong>Tribeca Dental Studio 4 kids</strong> 的官方资源中心...</p>
          ) : isEs ? (
            <p>Bienvenidos al recurso oficial de <strong>Tribeca Dental Studio 4 kids</strong>...</p>
          ) : (
            <p>Welcome to the official resource hub of <strong>Tribeca Dental Studio 4 kids</strong>...</p>
          )}
        </div>
      </div>

      {/* The Interactive Scroll Component */}
      <InfiniteBlogGrid 
        initialPosts={posts} 
        totalPosts={total} 
        postsPerPage={POSTS_PER_PAGE} 
        lang={lang}
        currentPage={currentPage}
      />
    </div>
  );
}