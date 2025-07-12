import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getTechnologies, createTechnology } from "@/app/data/technologies"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const technologies = await getTechnologies()
    return NextResponse.json(technologies)
  } catch (error) {
    console.error("Error fetching technologies:", error)
    return NextResponse.json({ error: "Failed to fetch technologies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const technology = await createTechnology(data)
    return NextResponse.json(technology, { status: 201 })
  } catch (error) {
    console.error("Error creating technology:", error)
    return NextResponse.json({ error: "Failed to create technology" }, { status: 500 })
  }
}
