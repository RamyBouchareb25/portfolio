import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Calendar, Briefcase } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about John Doe, a DevOps-focused Full-Stack Developer with expertise in modern web technologies and cloud infrastructure.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-muted-foreground">Get to know the person behind the code</p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Profile */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-4xl">JD</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                  <p className="text-muted-foreground">DevOps Full-Stack Developer</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>5+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>Available for DevOps Roles</span>
                  </div>
                </div>

                <Button className="w-full mt-6" asChild>
                  <Link href="/resume.pdf" target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </Card>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">My Story</h3>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    DevOps-focused Full-Stack Developer with expertise in Next.js, TypeScript, Docker, and Kubernetes.
                    Skilled in building and deploying modern web applications with CI/CD, NestJs backend, and
                    cloud-native tools.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    Experienced with Postfix/Dovecot email servers, custom domain and SSL configurations, and managing
                    Linux servers (Ubuntu, RHEL). Currently transitioning to a DevOps role, with hands-on work in
                    infrastructure automation, container orchestration, and system monitoring.
                  </p>

                  <p className="text-lg leading-relaxed">
                    I'm passionate about creating efficient, scalable solutions that bridge the gap between development
                    and operations. My goal is to help teams deliver high-quality software faster and more reliably
                    through automation and best practices.
                  </p>
                </div>
              </Card>

              {/* Current Focus */}
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Current Focus</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Learning</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Terraform</Badge>
                      <Badge variant="outline">AWS</Badge>
                      <Badge variant="outline">Prometheus</Badge>
                      <Badge variant="outline">Grafana</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Building</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">CI/CD Pipelines</Badge>
                      <Badge variant="outline">Microservices</Badge>
                      <Badge variant="outline">Monitoring Tools</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Values */}
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">What I Value</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">🚀 Innovation</h4>
                    <p className="text-muted-foreground text-sm">
                      Always exploring new technologies and methodologies to solve complex problems.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🤝 Collaboration</h4>
                    <p className="text-muted-foreground text-sm">
                      Believing that the best solutions come from diverse perspectives and teamwork.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📚 Continuous Learning</h4>
                    <p className="text-muted-foreground text-sm">
                      Staying curious and committed to growing both personally and professionally.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">⚡ Efficiency</h4>
                    <p className="text-muted-foreground text-sm">
                      Automating repetitive tasks to focus on what truly matters.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
