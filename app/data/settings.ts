import { prisma } from "@/lib/prisma"
import { unstable_noStore as noStore } from 'next/cache'

export async function getSettings() {
  noStore() // Opt out of caching
  let settings = await prisma.settings.findFirst()

  if (!settings) {
    // Create default settings if none exist
    settings = await prisma.settings.create({
      data: {},
    })
  }

  return settings
}

export async function updateSettings(data: Partial<{
  siteName: string
  siteDescription: string
  email: string
  phone: string
  location: string
  githubUrl: string
  linkedinUrl: string
  twitterUrl: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  enableAnalytics: boolean
  maintenanceMode: boolean
}>) {
  noStore() // Opt out of caching
  const settings = await prisma.settings.findFirst()

  if (settings) {
    return await prisma.settings.update({
      where: { id: settings.id },
      data,
    })
  } else {
    return await prisma.settings.create({
      data,
    })
  }
}
