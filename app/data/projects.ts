import { prisma } from "@/lib/prisma"
import { unstable_noStore as noStore } from 'next/cache'

export async function getProjects() {
  noStore()
  return await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  })
}

export async function getFeaturedProjects() {
  noStore()
  return await prisma.project.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 6,
  })
}

export async function getProject(id: string) {
  noStore()
  return await prisma.project.findUnique({
    where: { id },
  })
}
