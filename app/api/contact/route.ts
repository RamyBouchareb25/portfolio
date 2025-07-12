import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || "",
        message,
      },
    })

    // Here you could also send an email notification
    // await sendEmailNotification(contact)

    return NextResponse.json({ message: "Message sent successfully", id: contact.id }, { status: 201 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
