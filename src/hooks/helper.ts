// src/hooks/helper.ts
export const baseUrl = "https://pediatrics.tribecadentalstudio.com";

export function getAlternates(lang: string, path: string = "", page?: string) {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  // Keep it strictly trailing-slash-free or unified to what your middleware expects
  const segment = cleanPath ? `/${cleanPath}` : ""; 

  // If a valid page query > 1 exists, we format it cleanly. Otherwise, keep it undefined.
  const pageQuery = page && parseInt(page, 10) > 1 ? { page } : undefined;

  return {
    canonical: `${baseUrl}/${lang}${segment}`,
    languages: {
      "en": `${baseUrl}/en${segment}`,
      "es": `${baseUrl}/es${segment}`,
      "zh": `${baseUrl}/zh${segment}`,
      "x-default": `${baseUrl}/en${segment}`,
    },
    // We pass searchParams directly to Next.js's metadata engine to prevent 308 mismatches
    types: pageQuery ? pageQuery : undefined
  };
}