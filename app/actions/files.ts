"use server"

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { revalidatePath } from "next/cache"

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { error: "No file provided" }
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { error: "File size must be less than 10MB" }
    }

    // Create files directory if it doesn't exist
    const filesDir = join(process.cwd(), "public", "files")
    try {
      await mkdir(filesDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
    const filepath = join(filesDir, filename)

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    const publicUrl = `/files/${filename}`

    revalidatePath("/admin")
    return { success: true, url: publicUrl, filename }
  } catch (error) {
    console.error("File upload error:", error)
    return { error: "Failed to upload file" }
  }
}
