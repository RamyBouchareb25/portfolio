"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Eye, FileText, Calendar, RefreshCw } from "lucide-react"

interface AnalyticsData {
  totalViews: number
  monthlyViews: number
  totalVisitors: number
  monthlyVisitors: number
  totalPosts: number
  publishedPosts: number
  topPages: Array<{ page: string; views: number; clicks: number }>
  searchQueries: Array<{ query: string; impressions: number; clicks: number; ctr: number }>
  recentActivity: Array<{ type: string; description: string; date: string }>
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    setRefreshing(true)
    try {
      const response = await fetch("/api/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      } else {
        // Fallback to mock data if Google Search Console is not configured
        setAnalytics({
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
        })
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  if (loading || !analytics) {
    return <div>Loading analytics...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your portfolio performance with Google Search Console data</p>
        </div>
        <Button onClick={fetchAnalytics} disabled={refreshing} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{analytics.monthlyViews.toLocaleString()} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{analytics.monthlyVisitors.toLocaleString()} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <p className="text-xs text-muted-foreground">+0.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.publishedPosts}</div>
            <p className="text-xs text-muted-foreground">{analytics.totalPosts - analytics.publishedPosts} drafts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Pages (Search Console)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topPages.map((page, index) => (
                <div key={page.page} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="font-medium">{page.page}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {page.views.toLocaleString()} impressions • {page.clicks} clicks
                    </div>
                  </div>
                  <Progress value={(page.views / analytics.topPages[0].views) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Queries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Search Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.searchQueries.map((query, index) => (
                <div key={query.query} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="font-medium text-sm">{query.query}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {query.ctr.toFixed(1)}% CTR
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {query.impressions.toLocaleString()} impressions • {query.clicks} clicks
                  </div>
                  <Progress
                    value={(query.impressions / analytics.searchQueries[0].impressions) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Search Console Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.type === "view" && <Eye className="h-4 w-4 text-blue-500" />}
                  {activity.type === "search" && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {activity.type === "click" && <Users className="h-4 w-4 text-purple-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Google Search Console Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To get real analytics data, connect your Google Search Console:
          </p>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>Add your site to Google Search Console</li>
            <li>Verify ownership of your domain</li>
            <li>Set up the Google Search Console API</li>
            <li>Add your API credentials to environment variables</li>
          </ol>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Currently showing mock data. Real data will appear once Google Search Console is
              configured.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
