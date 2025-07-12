"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, ExternalLink, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Technology {
  id: string
  name: string
  category: string
  description?: string
  icon?: string
  color?: string
  website?: string
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchTechnologies = useCallback(async () => {
    try {
      const response = await fetch("/api/technologies")
      if (response.ok) {
        const data = await response.json()
        setTechnologies(data)
      }
    } catch (error) {
      console.error("Error fetching technologies:", error)
      toast({
        title: "Error",
        description: "Failed to fetch technologies",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchTechnologies()
  }, [fetchTechnologies])

  const deleteTechnology = async (id: string) => {
    if (!confirm("Are you sure you want to delete this technology?")) return

    try {
      const response = await fetch(`/api/technologies/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTechnologies(technologies.filter((tech) => tech.id !== id))
        toast({
          title: "Success",
          description: "Technology deleted successfully",
        })
      }
    } catch (error) {
      console.error("Error deleting technology:", error)
      toast({
        title: "Error",
        description: "Failed to delete technology",
        variant: "destructive",
      })
    }
  }

  const filteredTechnologies = technologies.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Technologies</h1>
          <p className="text-muted-foreground">Manage your technology stack</p>
        </div>
        <Button asChild>
          <Link href="/admin/technologies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Technology
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechnologies.map((tech) => (
          <Card key={tech.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {tech.icon && <span className="text-2xl">{tech.icon}</span>}
                  {tech.name}
                  {tech.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/technologies/${tech.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteTechnology(tech.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge variant="secondary">{tech.category}</Badge>
                {tech.description && <p className="text-sm text-muted-foreground">{tech.description}</p>}
                {tech.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={tech.website} target="blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                )}
                <div className="text-xs text-muted-foreground">Order: {tech.order}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTechnologies.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No technologies found.</p>
            <Button asChild className="mt-4">
              <Link href="/admin/technologies/new">Add your first technology</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
