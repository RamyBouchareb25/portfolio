import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
