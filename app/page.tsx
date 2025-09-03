/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Code,
  Server,
  Cloud,
  Database,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getFeaturedProjects } from "@/app/data/projects";
import { getSettings } from "@/app/data/settings";
import { getFeaturedBlogPosts } from "@/app/data/blog";
import { getTechnologies } from "./data/technologies";

// Force dynamic rendering to prevent caching
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProjects, settings, featuredPosts, technologies] =
    await Promise.all([
      getFeaturedProjects(),
      getSettings(),
      getFeaturedBlogPosts(),
      getTechnologies(),
    ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  Available for DevOps Roles
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {settings.siteName.split(" ")[0]}
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground">
                  DevOps-focused Full-Stack Developer
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {settings.siteDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/resume.pdf" target="blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Link>
                </Button>
              </div>

              <div className="flex space-x-6">
                <Link
                  href={settings.githubUrl}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href={settings.linkedinUrl}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href={`mailto:${settings.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-1">
                <div className="h-full w-full rounded-2xl bg-background p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0 text-center">
                        <Code className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm font-medium">Frontend</p>
                      </CardContent>
                    </Card>
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0 text-center">
                        <Server className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="text-sm font-medium">Backend</p>
                      </CardContent>
                    </Card>
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0 text-center">
                        <Cloud className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <p className="text-sm font-medium">DevOps</p>
                      </CardContent>
                    </Card>
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0 text-center">
                        <Database className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                        <p className="text-sm font-medium">Database</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2+</div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {featuredProjects.length}+
              </div>
              <div className="text-sm text-muted-foreground">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {technologies.length}+
              </div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills in
              full-stack development and DevOps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.slice(0, 3).map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Latest Blog Posts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Insights and tutorials on DevOps, development, and technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  {post.image && (
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-lg overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime} min read
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild>
                <Link href="/blog">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to work together?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            I&apos;m currently available for DevOps roles and freelance
            projects. Let&apos;s build something amazing together.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
