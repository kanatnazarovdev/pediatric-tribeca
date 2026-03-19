import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pediatrics.tribecadentalstudio.com";
  const languages = ["en", "es"];
  const pages = ["", "/mission", "/mission/pre-k-visit"];
  const routes = languages.flatMap((lang) =>
    pages.map((page) => ({
      url: `${baseUrl}/${lang}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1.0 : 0.8, 
    })),
  );

  return routes;
}
