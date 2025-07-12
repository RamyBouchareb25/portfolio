"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      return { error: "Name, email, and message are required" }
    }

    await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || "",
        message,
      },
    })

    revalidatePath("/admin/messages")
    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Contact form error:", error)
    return { error: "Failed to send message. Please try again." }
  }
}
