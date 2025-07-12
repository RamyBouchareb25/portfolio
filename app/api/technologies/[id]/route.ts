import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getTechnologyById, updateTechnology, deleteTechnology } from "@/app/data/technologies"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const technology = await getTechnologyById(id)
    if (!technology) {
      return NextResponse.json({ error: "Technology not found" }, { status: 404 })
    }
    return NextResponse.json(technology)
  } catch (error) {
    console.error("Error fetching technology:", error)
    return NextResponse.json({ error: "Failed to fetch technology" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { id } = await params
    const technology = await updateTechnology(id, data)
    return NextResponse.json(technology)
  } catch (error) {
    console.error("Error updating technology:", error)
    return NextResponse.json({ error: "Failed to update technology" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { id } = await params
    await deleteTechnology(id)
    return NextResponse.json({ message: "Technology deleted successfully" })
  } catch (error) {
    console.error("Error deleting technology:", error)
    return NextResponse.json({ error: "Failed to delete technology" }, { status: 500 })
  }
}
