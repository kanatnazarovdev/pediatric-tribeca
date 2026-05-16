// src/hooks/helper.ts
export const baseUrl = "https://pediatrics.tribecadentalstudio.com";

export function getAlternates(lang: string, path: string = "") {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const segment = cleanPath ? `/${cleanPath}/` : "/"; 

  return {
    canonical: `${baseUrl}/${lang}${segment}`,
    languages: {
      "en": `${baseUrl}/en${segment}`,       // Changed from "en-US"
      "es": `${baseUrl}/es${segment}`,       // Changed from "es-ES"
      "zh": `${baseUrl}/zh${segment}`,       // Changed from "zh-Hans"
      "x-default": `${baseUrl}/en${segment}`, 
    },
  };
}