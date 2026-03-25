import { MetadataRoute } from 'next'
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pediatrics.tribecadentalstudio.com'
  const languages = ['en', 'es'] // Add all supported languages here

  // 1. Define Static Routes for all languages
  const staticRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/${lang}/our-mission`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}/innovation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ])

  // 2. Fetch all Dynamic Blog Posts from Sanity
  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt
    }`
  )

  // 3. Create entries for each post (mapped across languages)
  const dynamicBlogRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => 
    posts.map((post: any) => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  )

  return [...staticRoutes, ...dynamicBlogRoutes]
}