"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Save, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "Tools",
  "Languages",
  "Frameworks",
  "Cloud",
  "Other",
]

interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon?: string
  color?: string
}

export default function EditSkill() {
  const [skill, setSkill] = useState<Skill | null>(null)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState([50])
  const [icon, setIcon] = useState("")
  const [color, setColor] = useState("#3b82f6")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const fetchSkill = useCallback(async () => {
    try {
      const response = await fetch(`/api/skills/${params.id}`)
      if (response.ok) {
        const skillData = await response.json()
        setSkill(skillData)
        setName(skillData.name)
        setCategory(skillData.category)
        setLevel([skillData.level])
        setIcon(skillData.icon || "")
        setColor(skillData.color || "#3b82f6")
      } else {
        throw new Error("Skill not found")
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch skill",
        variant: "destructive",
      })
      router.push("/admin/skills")
    } finally {
      setLoading(false)
    }
  }, [params.id, toast, router])

  useEffect(() => {
    fetchSkill()
  }, [fetchSkill])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/skills/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          level: level[0],
          icon: icon || null,
          color,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Skill updated successfully",
        })
        router.push("/admin/skills")
      } else {
        throw new Error("Failed to update skill")
      }
    } catch  {
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!skill) {
    return <div>Skill not found</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/skills">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Skills
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Skill</h1>
          <p className="text-muted-foreground">Update skill details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Skill Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., React, Node.js, Docker"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Proficiency Level: {level[0]}%</Label>
              <Slider id="level" min={0} max={100} step={5} value={level} onValueChange={setLevel} className="w-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (emoji or text)</Label>
                <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="⚛️ or React" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#3b82f6"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
