export const baseUrl = "https://pediatrics.tribecadentalstudio.com";

export function getAlternates(lang: string, path: string = "") {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const segment = cleanPath ? `/${cleanPath}` : "";

  return {
    canonical: `${baseUrl}/${lang}${segment}`,
    languages: {
      "en": `${baseUrl}/en${segment}`,
      "es": `${baseUrl}/es${segment}`,
      "x-default": `${baseUrl}/en${segment}`,
    },
  };
}