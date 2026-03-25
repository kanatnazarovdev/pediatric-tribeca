import { MetadataRoute } from 'next'
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pediatrics.tribecadentalstudio.com'
  const languages = ['en', 'es']

  const staticRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/${lang}/mission`, 
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

  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "updatedAt": _updatedAt // Use updatedAt for more accurate lastModified
    }`
  )

  const dynamicBlogRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => 
    posts.map((post: any) => ({
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  )

  return [...staticRoutes, ...dynamicBlogRoutes]
}