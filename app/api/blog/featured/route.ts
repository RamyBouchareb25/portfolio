import { getFeaturedBlogPosts } from "@/app/data/blog";
import { NextResponse } from "next/server";

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const featuredBlogPosts = await getFeaturedBlogPosts();
    return NextResponse.json(featuredBlogPosts);
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured blogs" },
      { status: 500 }
    );
  }
}
