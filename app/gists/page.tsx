import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, GitFork, Calendar, Code } from "lucide-react"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { getGitHubGists } from "@/app/data/gists"
import type { Metadata } from "next"

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Code Snippets",
  description: "Explore my GitHub Gists - useful code snippets, configurations, and utilities for development.",
}

export default async function GistsPage() {
  const gists = await getGitHubGists()

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      typescript: "bg-blue-500",
      javascript: "bg-yellow-500",
      yaml: "bg-red-500",
      json: "bg-green-500",
      python: "bg-blue-600",
      dockerfile: "bg-blue-400",
      shell: "bg-gray-500",
      bash: "bg-gray-500",
    }
    return colors[language?.toLowerCase()] || "bg-gray-400"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Code Snippets</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of useful code snippets, configurations, and utilities from my GitHub Gists. These are
            real-world solutions I use in my projects.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{gists.length}</div>
            <div className="text-sm text-muted-foreground">Total Gists</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {gists.reduce((acc, gist) => acc + (gist.forks || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Forks</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{gists.reduce((acc, gist) => acc + gist.comments, 0)}</div>
            <div className="text-sm text-muted-foreground">Comments</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {new Set(gists.flatMap((gist) => Object.values(gist.files).map((file) => file.language))).size}
            </div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </Card>
        </div>

        {/* Gists Grid */}
        <div className="space-y-8">
          {gists.length > 0 ? (
            gists.map((gist) => {
              const firstFile = Object.values(gist.files)[0]
              if (!firstFile) return null

              return (
                <Card key={gist.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{gist.description}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(gist.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="h-4 w-4" />
                            {gist.forks || 0} forks
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {gist.comments} comments
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={gist.html_url} target="_blank">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on GitHub
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* File tabs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.values(gist.files).map((file) => (
                        <Badge key={file.filename} variant="secondary" className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getLanguageColor(file.language)}`} />
                          {file.filename}
                        </Badge>
                      ))}
                    </div>

                    {/* Code preview */}
                    <div className="rounded-lg overflow-hidden border">
                      <div className="bg-muted px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          <span className="text-sm font-medium">{firstFile.filename}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {firstFile.language || "text"}
                        </Badge>
                      </div>
                      <div className="max-h-96 overflow-auto">
                        <SyntaxHighlighter
                          language={firstFile.language?.toLowerCase() || "text"}
                          style={oneDark}
                          customStyle={{
                            margin: 0,
                            background: "transparent",
                            fontSize: "14px",
                          }}
                          showLineNumbers
                        >
                          {firstFile.content || "// Content not available"}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="text-center py-12">
              <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No gists found</h3>
              <p className="text-muted-foreground">Unable to load GitHub gists at the moment.</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <section className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold mb-4">Find these useful?</h3>
            <p className="text-muted-foreground mb-6">
              Check out my GitHub profile for more code snippets, projects, and contributions.
            </p>
            <Button asChild>
              <Link href="https://github.com/RamyBouchareb25" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit My GitHub
              </Link>
            </Button>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  )
}
