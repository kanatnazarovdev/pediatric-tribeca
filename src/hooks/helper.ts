// src/hooks/helper.ts
export const baseUrl = "https://pediatrics.tribecadentalstudio.com";

export function getAlternates(lang: string, path: string = "", page?: string) {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const segment = cleanPath ? `/${cleanPath}/` : "/"; 

  // Build out the base URLs
  let canonicalUrl = `${baseUrl}/${lang}${segment}`;
  let enUrl = `${baseUrl}/en${segment}`;
  let esUrl = `${baseUrl}/es${segment}`;
  let zhUrl = `${baseUrl}/zh${segment}`;
  let defaultUrl = `${baseUrl}/en${segment}`;

  // Only append the page parameter if it exists AND is greater than 1
  if (page && parseInt(page, 10) > 1) {
    const query = `?page=${page}`;
    
    canonicalUrl = canonicalUrl.replace(/\/$/, "") + query;
    enUrl = enUrl.replace(/\/$/, "") + query;
    esUrl = esUrl.replace(/\/$/, "") + query;
    zhUrl = zhUrl.replace(/\/$/, "") + query;
    defaultUrl = defaultUrl.replace(/\/$/, "") + query;
  } else {
    // If it's page 1 (or no page), Next.js strips the trailing slash on the base URL.
    // We strip it here too so the hreflang matches the exact final destination URL.
    canonicalUrl = canonicalUrl.replace(/\/$/, "");
    enUrl = enUrl.replace(/\/$/, "");
    esUrl = esUrl.replace(/\/$/, "");
    zhUrl = zhUrl.replace(/\/$/, "");
    defaultUrl = defaultUrl.replace(/\/$/, "");
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