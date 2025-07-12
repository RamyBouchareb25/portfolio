import { prisma } from "@/lib/prisma"
import { unstable_noStore as noStore } from 'next/cache'

export async function getTechnologies() {
  noStore()
  return await prisma.technology.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  })
}

export async function getTechnologyById(id: string) {
  noStore()
  return await prisma.technology.findUnique({
    where: { id },
  })
}

export async function createTechnology(data: {
  name: string
  category: string
  description?: string
  icon?: string
  color?: string
  website?: string
  featured?: boolean
  order?: number
}) {
  noStore()
  return await prisma.technology.create({
    data,
  })
}

export async function updateTechnology(
  id: string,
  data: {
    name?: string
    category?: string
    description?: string
    icon?: string
    color?: string
    website?: string
    featured?: boolean
    order?: number
  },
) {
  noStore()
  return await prisma.technology.update({
    where: { id },
    data,
  })
}

export async function deleteTechnology(id: string) {
  noStore()
  return await prisma.technology.delete({
    where: { id },
  })
}

export async function getFeaturedTechnologies() {
  noStore()
  return await prisma.technology.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  })
}
