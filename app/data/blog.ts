import { prisma } from "@/lib/prisma"
import { unstable_noStore as noStore } from 'next/cache'

export async function getBlogPosts() {
  noStore()
  return await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })
}

export async function getAllBlogPosts() {
  noStore()
  return await prisma.blogPost.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })
}

export async function getFeaturedBlogPosts() {
  noStore()
  return await prisma.blogPost.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  })
}

export async function getBlogPost(id: string) {
  noStore()
  return await prisma.blogPost.findUnique({
    where: { id },
  })
}

export async function getBlogPostBySlug(slug: string) {
  noStore()
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })

  if (post) {
    // Increment view count
    await prisma.blogPost.update({
      where: { slug },
      data: { views: { increment: 1 } },
    })
  }

  return post
}
