// src/hooks/helper.ts
export const baseUrl = "https://pediatrics.tribecadentalstudio.com";

export function getAlternates(lang: string, path: string = "") {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  // Ensure every path ends with a slash
  const segment = cleanPath ? `/${cleanPath}/` : "/"; 

  return {
    canonical: `${baseUrl}/${lang}${segment}`,
    languages: {
      "en-US": `${baseUrl}/en${segment}`,
      "es-ES": `${baseUrl}/es${segment}`,
      "x-default": `${baseUrl}/en${segment}`,
    },
  };
}