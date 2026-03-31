// src/sanity/lib/queries.ts
import { groq } from "next-sanity";

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "authorName": author->name
}`;
// src/lib/queries.ts
export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  childName,
  description,
  videoUrl,
  "imageUrl": thumbnail.asset->url
}`;