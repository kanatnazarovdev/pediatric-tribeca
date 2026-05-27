/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface InfiniteBlogGridProps {
  initialPosts: any[];
  totalPosts: number;
  postsPerPage: number;
  lang: string;
  currentPage: number;
}

export default function InfiniteBlogGrid({
  initialPosts,
  totalPosts,
  postsPerPage,
  lang,
  currentPage,
}: InfiniteBlogGridProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const [hasMore, setHasMore] = useState(page < totalPages);
  
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isZh = lang === "zh";
  const isEs = lang === "es";

  useEffect(() => {
    setPosts(initialPosts);
    setPage(currentPage);
    setHasMore(currentPage < totalPages);
  }, [initialPosts, currentPage, totalPages]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          setLoading(true);
          const nextPage = page + 1;

          try {
            const response = await fetch(`/api/blog-posts?lang=${lang}&page=${nextPage}`);
            const data = await response.json();

            if (data.posts && data.posts.length > 0) {
              setPosts((prev) => [...prev, ...data.posts]);
              setPage(nextPage);
              setHasMore(nextPage < totalPages);

              // REMOVED/COMMENTED OUT TO KEEP THE URL CLEAN AND FREE OF ?page= PARAMETERS:
              // const newUrl = `/${lang}/blog?page=${nextPage}`;
              // window.history.pushState({ path: newUrl }, "", newUrl);
            } else {
              setHasMore(false);
            }
          } catch (error) {
            console.error("Failed to load more posts:", error);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [page, hasMore, loading, lang, totalPages]);

  return (
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

      {hasMore && (
        <div ref={observerRef} className="w-full flex justify-center py-10 text-zinc-400 font-light text-sm uppercase tracking-widest">
          {loading ? (
            <span>{isZh ? "正在加载文章..." : isEs ? "Cargando artículos..." : "Loading more notes..."}</span>
          ) : (
            <span className="opacity-0">Trigger</span>
          )}
        </div>
      )}
    </div>
  );
}