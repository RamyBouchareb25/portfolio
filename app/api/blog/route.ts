import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getBlogPosts } from "@/app/data/blog";
import { createBlogPost } from "@/lib/db";

// Force dynamic rendering to prevent caching
export const dynamic = "force-dynamic";

function getWordCount(content: string, contentFormat: "markdown" | "html") {
  const plainText =
    contentFormat === "html"
      ? content
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
          .replace(/<[^>]+>/g, " ")
      : content;

  return plainText
    .trim()
    .split(/\s+/)
    .filter((word: string) => word.length > 0).length;
}

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const contentFormat: "markdown" | "html" =
      data.contentFormat === "html" ? "html" : "markdown";
    const wordCount = getWordCount(data.content || "", contentFormat);
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const post = await createBlogPost({
      ...data,
      contentFormat,
      readTime,
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
