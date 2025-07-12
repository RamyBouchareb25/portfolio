import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getCertifications, createCertification } from "@/app/data/certifications"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const certifications = await getCertifications()
    return NextResponse.json(certifications)
  } catch (error) {
    console.error("Error fetching certifications:", error)
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const certification = await createCertification(data)
    return NextResponse.json(certification, { status: 201 })
  } catch (error) {
    console.error("Error creating certification:", error)
    return NextResponse.json({ error: "Failed to create certification" }, { status: 500 })
  }
}
