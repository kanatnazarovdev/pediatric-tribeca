import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pediatrics.tribecadentalstudio.com";
  const languages = ["en", "es"];
  
  // FIXED: Ensure these match your folder structure exactly
  // Added /innovation to the list
  const pages = ["", "/mission", "/mission/pre-k-visit", "/innovation"];

  const routes = languages.flatMap((lang) =>
    pages.map((page) => {
      // Create the path, ensuring no double slashes
      const path = page === "" ? `/${lang}` : `/${lang}${page}`;
      
      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: page === "" ? 1.0 : 0.8,
      };
    })
  );

  return routes;
}