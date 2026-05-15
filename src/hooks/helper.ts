// src/hooks/helper.ts
export const baseUrl = "https://pediatrics.tribecadentalstudio.com";

export function getAlternates(lang: string, path: string = "") {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const segment = cleanPath ? `/${cleanPath}/` : "/"; 

  return {
    canonical: `${baseUrl}/${lang}${segment}`,
    languages: {
      "en-US": `${baseUrl}/en${segment}`,
      "es-ES": `${baseUrl}/es${segment}`,
      "zh-Hans": `${baseUrl}/zh${segment}`, // Added Simplified Chinese for NYC market
      "x-default": `${baseUrl}/en${segment}`, // Keeps English as the global fallback
    },
  };
}