// src/hooks/helper.ts
export const baseUrl = "https://pediatrics.tribecadentalstudio.com";

export function getAlternates(lang: string, path: string = "") {
  // Clean the path to ensure no trailing slashes (matches your Next.js config)
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const segment = cleanPath ? `/${cleanPath}` : "";

  return {
    // This is the main canonical for the current page
    canonical: `${baseUrl}/${lang}${segment}`,
    
    // Hreflang must include ALL versions including the current one
    languages: {
      "en-US": `${baseUrl}/en${segment}`,
      "es-ES": `${baseUrl}/es${segment}`,
      "x-default": `${baseUrl}/en${segment}`, // Usually English is the fallback
    },
  };
}