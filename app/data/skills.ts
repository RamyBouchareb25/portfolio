import { prisma } from "@/lib/prisma"
import { unstable_noStore as noStore } from 'next/cache'

export async function getSkills() {
  noStore()
  return await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
  })
}

export async function getSkillsByCategory() {
  noStore()
  const skills = await getSkills()
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )
}

export async function getSkill(id: string) {
  noStore()
  return await prisma.skill.findUnique({
    where: { id },
  })
}
