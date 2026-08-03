/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pediatrics.tribecadentalstudio.com";
  const languages = ["en", "es"];
  const staticPages = ["mission", "mission", "blog", "testimonials", "team"];

  const currentCrawlDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => {
    const routes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/${lang}/`, // Added slash
        lastModified: currentCrawlDate,
        changeFrequency: "monthly",
        priority: 1.0,
      },
    ];

    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${lang}/${page}/`, // Added slash
        lastModified: currentCrawlDate,
        changeFrequency: page === "blog" ? "daily" : "weekly",
        priority: page === "mission" ? 0.9 : 0.8,
      });
    });
    return routes;
  });
  // 2. Dynamic Blog Routes from Sanity - NO TRAILING SLASHES
  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }`,
  );

  const dynamicBlogRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) =>
    posts.map((post: any) => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`, // Correct: No slash
      lastModified: post.updatedAt
        ? new Date(post.updatedAt)
        : currentCrawlDate,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...dynamicBlogRoutes];
}
