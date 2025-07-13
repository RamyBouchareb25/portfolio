import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Metadata } from "next"
import { getSkillsByCategory } from "@/app/data/skills"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore my technical skills and expertise in full-stack development, DevOps, and modern web technologies.",
}



export default async function SkillsPage() {
  const skillCategories = await getSkillsByCategory()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Skills & Expertise</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and technologies I work with to build modern web
            applications and infrastructure.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {Object.entries(skillCategories).map(([category, skills]) => {
            const categoryColors: Record<string, string> = {
              Frontend: "bg-blue-500",
              Backend: "bg-green-500",
              DevOps: "bg-purple-500",
              Database: "bg-orange-500",
              "Tools & Others": "bg-gray-500",
            }

            return (
              <Card key={category} className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${categoryColors[category] || "bg-gray-500"}`} />
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {skill.icon && <span className="text-lg">{skill.icon}</span>}
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tech Stack Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Tech Stack Overview</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Frontend</h3>
              <p className="text-muted-foreground mb-4">Modern, responsive user interfaces with React ecosystem</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {skillCategories.Frontend?.slice(0, 4).map((skill) => (
                  <Badge key={skill.id} variant="outline">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Backend</h3>
              <p className="text-muted-foreground mb-4">Scalable server-side applications and APIs</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {skillCategories.Backend?.slice(0, 4).map((skill) => (
                  <Badge key={skill.id} variant="outline">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">DevOps</h3>
              <p className="text-muted-foreground mb-4">Infrastructure automation and deployment pipelines</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {skillCategories.DevOps?.slice(0, 4).map((skill) => (
                  <Badge key={skill.id} variant="outline">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
