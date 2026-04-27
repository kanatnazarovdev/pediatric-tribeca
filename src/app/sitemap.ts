/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pediatrics.tribecadentalstudio.com";
  const languages = ["en", "es"];
  const staticPages = ["mission", "innovation", "blog", "testimonials"];
  
  const currentCrawlDate = new Date();

  // 1. Static Routes (Localized)
  const staticRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => {
    // Start with the language root (e.g., /en or /es)
    const routes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/${lang}`, 
        lastModified: currentCrawlDate,
        changeFrequency: "monthly",
        priority: 1.0,
      },
    ];

    // Add specific static pages
    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: currentCrawlDate,
        // If it's the blog list, it updates more often
        changeFrequency: page === "blog" ? "daily" : "weekly",
        priority: page === "innovation" ? 0.9 : 0.8,
      });
    });

    return routes;
  });

  // 2. Dynamic Blog Routes from Sanity
  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }`,
  );

  const dynamicBlogRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) =>
    posts.map((post: any) => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      // Use actual Sanity update time, or fallback to current date
      lastModified: post.updatedAt ? new Date(post.updatedAt) : currentCrawlDate,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...dynamicBlogRoutes];
}