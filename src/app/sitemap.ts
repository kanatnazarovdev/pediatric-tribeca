import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pediatrics.tribecadentalstudio.com";
  const languages = ["en", "es"];
  
  const pages = ["", "/mission", "/mission/pre-k-visit", "/innovation", "/blog"];

  const query = groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
  const posts = await client.fetch(query);

  const staticRoutes = languages.flatMap((lang) =>
    pages.map((page) => {
      const path = page === "" ? `/${lang}` : `/${lang}${page}`;
      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: page === "" ? 1.0 : 0.8,
      };
    })
  );

  const blogRoutes = languages.flatMap((lang) =>
    posts.map((post: { slug: string }) => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...blogRoutes];
}