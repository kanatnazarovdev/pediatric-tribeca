// src/hooks/helper.ts
export const baseUrl = "https://pediatrics.tribecadentalstudio.com";

export function getAlternates(lang: string, path: string = "", page?: string) {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const segment = cleanPath ? `/${cleanPath}/` : "/"; 

  let canonicalUrl = `${baseUrl}/${lang}${segment}`;
  let enUrl = `${baseUrl}/en${segment}`;
  let esUrl = `${baseUrl}/es${segment}`;
  let zhUrl = `${baseUrl}/zh${segment}`;
  let defaultUrl = `${baseUrl}/en${segment}`;

  if (page) {
    const query = `?page=${page}`;
    
    canonicalUrl = canonicalUrl.replace(/\/$/, "") + query;
    enUrl = enUrl.replace(/\/$/, "") + query;
    esUrl = esUrl.replace(/\/$/, "") + query;
    zhUrl = zhUrl.replace(/\/$/, "") + query;
    defaultUrl = defaultUrl.replace(/\/$/, "") + query;
  }

  return {
    canonical: canonicalUrl,
    languages: {
      "en": enUrl,
      "es": esUrl,
      "zh": zhUrl,
      "x-default": defaultUrl,
    },
  };
}