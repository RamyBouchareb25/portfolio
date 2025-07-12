import { PrismaClient } from "@prisma/client"
import { unstable_noStore as noStore } from 'next/cache'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export async function getSkill(id: string) {
  noStore()
  return await prisma.skill.findUnique({
    where: { id },
  })
}

export async function updateSkill(id: string, data: any) {
  noStore()
  return await prisma.skill.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

export async function deleteSkill(id: string) {
  noStore()
  return await prisma.skill.delete({
    where: { id },
  })
}

export async function updateBlogPost(id: string, data: any) {
  noStore()
  return await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

export async function deleteBlogPost(id: string) {
  noStore()
  return await prisma.blogPost.delete({
    where: { id },
  })
}


export async function createBlogPost(data: any) {
  noStore()
  return await prisma.blogPost.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
}

export async function deleteProject(id: string) {
  noStore()
  return await prisma.project.delete({
    where: { id },
  })
}
export async function updateProject(id: string, data: any) {
  noStore()
  return await prisma.project.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}

export async function createProject(data: any) {
  noStore()
  return await prisma.project.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
}

export async function createSkill(data: any) {
  noStore()
  return await prisma.skill.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
}