import { prisma } from "@/lib/prisma"
import { unstable_noStore as noStore } from 'next/cache'

export async function getCertifications() {
  noStore()
  return await prisma.certification.findMany({
    orderBy: [{ order: "asc" }, { issueDate: "desc" }],
  })
}

export async function getCertificationById(id: string) {
  noStore()
  return await prisma.certification.findUnique({
    where: { id },
  })
}

export async function createCertification(data: {
  name: string
  issuer: string
  description?: string
  credentialId?: string
  credentialUrl?: string
  issueDate: Date
  expiryDate?: Date
  image?: string
  featured?: boolean
  order?: number
}) {
  noStore()
  return await prisma.certification.create({
    data,
  })
}

export async function updateCertification(
  id: string,
  data: {
    name?: string
    issuer?: string
    description?: string
    credentialId?: string
    credentialUrl?: string
    issueDate?: Date
    expiryDate?: Date
    image?: string
    featured?: boolean
    order?: number
  },
) {
  noStore()
  return await prisma.certification.update({
    where: { id },
    data,
  })
}

export async function deleteCertification(id: string) {
  noStore()
  return await prisma.certification.delete({
    where: { id },
  })
}

export async function getFeaturedCertifications() {
  noStore()
  return await prisma.certification.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { issueDate: "desc" }],
  })
}
