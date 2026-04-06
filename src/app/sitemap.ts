/* eslint-disable @typescript-eslint/no-explicit-any */
// import { MetadataRoute } from 'next'
// import { client } from "@/sanity/lib/client"
// import { groq } from "next-sanity"

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const baseUrl = 'https://pediatrics.tribecadentalstudio.com'
//   const languages = ['en', 'es']

//   const staticRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => [
//     {
//       url: `${baseUrl}/${lang}`,
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 1,
//     },
//     {
//       url: `${baseUrl}/${lang}/mission`,
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.8,
//     },
//     {
//       url: `${baseUrl}/${lang}/innovation`,
//       lastModified: new Date(),
//       changeFrequency: 'monthly',
//       priority: 0.8,
//     },
//     {
//       url: `${baseUrl}/${lang}/blog`,
//       lastModified: new Date(),
//       changeFrequency: 'daily',
//       priority: 0.7,
//     },
//     {
//       url: `${baseUrl}/${lang}/testimonials`, 
//       lastModified: new Date(),
//       changeFrequency: 'weekly', 
//       priority: 0.9,
//     },
//   ])

//   const posts = await client.fetch(
//     groq`*[_type == "post" && defined(slug.current)]{
//       "slug": slug.current,
//       "updatedAt": _updatedAt // Use updatedAt for more accurate lastModified
//     }`
//   )

//   const dynamicBlogRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) =>
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     posts.map((post: any) => ({
//       url: `${baseUrl}/${lang}/blog/${post.slug}`,
//       lastModified: new Date(post.updatedAt || new Date()),
//       changeFrequency: 'monthly',
//       priority: 0.6,
//     }))
//   )

//   return [...staticRoutes, ...dynamicBlogRoutes]
// }
import { MetadataRoute } from 'next'
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pediatrics.tribecadentalstudio.com'
  const languages = ['en', 'es']
  const staticPages = ['mission', 'innovation', 'blog', 'testimonials']

  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = languages.flatMap((lang) => {
    const routes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/${lang}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
    ]

    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: page === 'blog' ? 'daily' : 'weekly',
        priority: page === 'testimonials' ? 0.9 : 0.8,
      })
    })

    return routes
  })

  // 2. Dynamic Blog Routes from Sanity
  const posts = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "updatedAt": _updatedAt
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