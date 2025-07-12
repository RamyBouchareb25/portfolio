import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO: Implement Google Search Console API integration
    // For now, return mock data
    const mockData = {
      totalViews: 15420,
      monthlyViews: 3240,
      totalVisitors: 8950,
      monthlyVisitors: 1890,
      totalPosts: 12,
      publishedPosts: 8,
      topPages: [
        { page: "/", views: 4520, clicks: 320 },
        { page: "/projects", views: 3210, clicks: 280 },
        { page: "/blog", views: 2890, clicks: 240 },
        { page: "/about", views: 2340, clicks: 180 },
        { page: "/skills", views: 1890, clicks: 150 },
      ],
      searchQueries: [
        { query: "devops engineer portfolio", impressions: 1200, clicks: 45, ctr: 3.75 },
        { query: "next.js developer", impressions: 980, clicks: 38, ctr: 3.88 },
        { query: "docker kubernetes tutorial", impressions: 850, clicks: 32, ctr: 3.76 },
        { query: "full stack developer", impressions: 720, clicks: 28, ctr: 3.89 },
        { query: "typescript projects", impressions: 650, clicks: 25, ctr: 3.85 },
      ],
      recentActivity: [
        { type: "view", description: "New page view on /projects", date: "2 hours ago" },
        { type: "search", description: "Appeared in search for 'devops portfolio'", date: "5 hours ago" },
        { type: "view", description: "Blog post viewed: 'Building Microservices'", date: "1 day ago" },
        { type: "click", description: "Click from Google search", date: "1 day ago" },
        { type: "view", description: "Portfolio project viewed", date: "2 days ago" },
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
