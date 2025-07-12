import type { Metadata } from "next"
import BlogClientPage from "./BlogClientPage"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my latest articles about full-stack development, DevOps practices, and modern web technologies.",
}

export default async function BlogPage() {
  return <BlogClientPage />
}
