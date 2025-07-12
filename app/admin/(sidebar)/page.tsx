import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, Code, FileText, Award, Cpu, Eye, Plus } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/app/data/projects"
import { getSkills } from "@/app/data/skills"
import { getBlogPosts } from "@/app/data/blog"
import { getTechnologies } from "@/app/data/technologies"
import { getCertifications } from "@/app/data/certifications"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // Fetch real data from database
  const [projects, skills, blogPosts, technologies, certifications] = await Promise.all([
    getProjects(),
    getSkills(),
    getBlogPosts(),
    getTechnologies(),
    getCertifications(),
  ])

  const stats = {
    projects: projects.length,
    skills: skills.length,
    blogPosts: blogPosts.filter((post) => post.published).length,
    technologies: technologies.length,
    certifications: certifications.length,
    totalViews: blogPosts.reduce((sum, post) => sum + post.views, 0),
    featuredProjects: projects.filter((p) => p.featured).length,
  }

  const recentActivity = [
    ...blogPosts.slice(0, 2).map((post) => ({
      type: "blog",
      title: "Blog post published",
      description: post.title,
      time: new Date(post.createdAt).toLocaleDateString(),
    })),
    ...projects.slice(0, 2).map((project) => ({
      type: "project",
      title: "Project updated",
      description: project.title,
      time: new Date(project.updatedAt).toLocaleDateString(),
    })),
  ].slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin panel. Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">{stats.featuredProjects} featured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.skills}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technologies</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.technologies}</div>
            <p className="text-xs text-muted-foreground">Tools & frameworks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certifications}</div>
            <p className="text-xs text-muted-foreground">Professional certs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPosts}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Blog post views</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button asChild>
              <Link href="/admin/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                Write Post
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/skills/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/technologies/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Tech
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/certifications/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Cert
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {activity.type === "blog" && <FileText className="h-5 w-5 text-blue-500" />}
                  {activity.type === "project" && <FolderOpen className="h-5 w-5 text-purple-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant="secondary">{activity.time}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
