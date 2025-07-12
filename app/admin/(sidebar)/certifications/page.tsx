"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, ExternalLink, Star, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Certification {
  id: string
  name: string
  issuer: string
  description?: string
  credentialId?: string
  credentialUrl?: string
  issueDate: string
  expiryDate?: string
  image?: string
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchCertifications = useCallback(async () => {
    try {
      const response = await fetch("/api/certifications")
      if (response.ok) {
        const data = await response.json()
        setCertifications(data)
      }
    } catch (error) {
      console.error("Error fetching certifications:", error)
      toast({
        title: "Error",
        description: "Failed to fetch certifications",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchCertifications()
  }, [fetchCertifications])

  const deleteCertification = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return

    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCertifications(certifications.filter((cert) => cert.id !== id))
        toast({
          title: "Success",
          description: "Certification deleted successfully",
        })
      }
    } catch (error) {
      console.error("Error deleting certification:", error)
      toast({
        title: "Error",
        description: "Failed to delete certification",
        variant: "destructive",
      })
    }
  }

  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Certifications</h1>
          <p className="text-muted-foreground">Manage your professional certifications</p>
        </div>
        <Button asChild>
          <Link href="/admin/certifications/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Certification
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search certifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((cert) => (
          <Card key={cert.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {cert.name}
                  {cert.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/certifications/${cert.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteCertification(cert.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge variant="secondary">{cert.issuer}</Badge>
                {cert.description && <p className="text-sm text-muted-foreground">{cert.description}</p>}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(cert.issueDate).toLocaleDateString()}
                  {cert.expiryDate && <span>- {new Date(cert.expiryDate).toLocaleDateString()}</span>}
                </div>
                {cert.credentialId && <div className="text-xs text-muted-foreground">ID: {cert.credentialId}</div>}
                {cert.credentialUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={cert.credentialUrl} target="blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Credential
                    </a>
                  </Button>
                )}
                <div className="text-xs text-muted-foreground">Order: {cert.order}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertifications.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No certifications found.</p>
            <Button asChild className="mt-4">
              <Link href="/admin/certifications/new">Add your first certification</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
