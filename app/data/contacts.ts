import { prisma } from "@/lib/prisma"
import { unstable_noStore as noStore } from 'next/cache'

export async function getContacts() {
  noStore()
  return await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getContact(id: string) {
  noStore()
  return await prisma.contact.findUnique({
    where: { id },
  })
}
