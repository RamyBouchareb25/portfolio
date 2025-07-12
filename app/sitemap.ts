import type { MetadataRoute } from "next"
import { unstable_noStore as noStore } from 'next/cache'

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  noStore()
  const baseUrl = "https://johndoe.dev"

  // Static pages
  const staticPages = ["", "/about", "/projects", "/skills", "/blog", "/contact", "/gists"]

  // You would fetch dynamic pages from your database here
  // const blogPosts = await getBlogPosts()
  // const projects = await getProjects()

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1 : 0.8,
  }))

  // Add dynamic routes here when you have data
  // const blogRoutes = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticRoutes,
    // ...blogRoutes,
  ]
}
