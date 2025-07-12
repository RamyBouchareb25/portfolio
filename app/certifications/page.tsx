import { getCertifications } from "@/app/data/certifications"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Award, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Certifications | Your Portfolio",
  description:
    "Professional certifications and credentials showcasing expertise in various technologies and platforms.",
  keywords: "certifications, credentials, professional development, AWS, Google Cloud, Microsoft, DevOps",
}

export default async function CertificationsPage() {
  const certifications = await getCertifications()

  const activeCertifications = certifications.filter(
    (cert) => !cert.expiryDate || new Date(cert.expiryDate) > new Date(),
  )

  const expiredCertifications = certifications.filter(
    (cert) => cert.expiryDate && new Date(cert.expiryDate) <= new Date(),
  )

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  const isExpiringSoon = (expiryDate: Date | null) => {
    if (!expiryDate) return false
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return new Date(expiryDate) <= threeMonthsFromNow
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Award className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Certifications</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing my commitment to continuous learning and professional development through industry-recognized
            certifications and credentials.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{activeCertifications.length}</div>
              <p className="text-muted-foreground">Active Certifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {certifications.filter((c) => c.featured).length}
              </div>
              <p className="text-muted-foreground">Featured Credentials</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {activeCertifications.filter((c) => c.expiryDate && isExpiringSoon(c.expiryDate)).length}
              </div>
              <p className="text-muted-foreground">Expiring Soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Certifications */}
        {activeCertifications.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              Active Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCertifications.map((cert) => (
                <Card
                  key={cert.id}
                  className={`group hover:shadow-lg transition-all duration-300 ${cert.featured ? "ring-2 ring-primary/20" : ""}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {cert.featured && (
                          <Badge className="mb-2" variant="default">
                            Featured
                          </Badge>
                        )}
                        <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                          {cert.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                      </div>
                      {cert.image && (
                        <div className="ml-4 flex-shrink-0">
                          <Image
                            src={cert.image || "/placeholder.svg"}
                            alt={`${cert.name} badge`}
                            width={60}
                            height={60}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {cert.description && <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>}

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Issued: {formatDate(cert.issueDate)}</span>
                      </div>

                      {cert.expiryDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className={isExpiringSoon(cert.expiryDate) ? "text-orange-600 font-medium" : ""}>
                            Expires: {formatDate(cert.expiryDate)}
                            {isExpiringSoon(cert.expiryDate) && (
                              <Badge variant="outline" className="ml-2 text-orange-600 border-orange-600">
                                Expiring Soon
                              </Badge>
                            )}
                          </span>
                        </div>
                      )}

                      {cert.credentialId && (
                        <div className="text-xs text-muted-foreground">ID: {cert.credentialId}</div>
                      )}
                    </div>

                    {cert.credentialUrl && (
                      <div className="mt-4 pt-4 border-t">
                        <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                          <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Verify Credential
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Expired Certifications */}
        {expiredCertifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-muted-foreground">
              <Calendar className="w-6 h-6" />
              Previous Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredCertifications.map((cert) => (
                <Card key={cert.id} className="opacity-75 hover:opacity-90 transition-opacity">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          Expired
                        </Badge>
                        <CardTitle className="text-lg mb-2">{cert.name}</CardTitle>
                        <p className="text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                      </div>
                      {cert.image && (
                        <div className="ml-4 flex-shrink-0">
                          <Image
                            src={cert.image || "/placeholder.svg"}
                            alt={`${cert.name} badge`}
                            width={60}
                            height={60}
                            className="rounded-lg grayscale"
                          />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {cert.description && <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>}

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Issued: {formatDate(cert.issueDate)}</span>
                      </div>
                      {cert.expiryDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Expired: {formatDate(cert.expiryDate)}</span>
                        </div>
                      )}
                    </div>

                    {cert.credentialUrl && (
                      <div className="mt-4 pt-4 border-t">
                        <Button asChild variant="ghost" size="sm" className="w-full">
                          <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Credential
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {certifications.length === 0 && (
          <div className="text-center py-16">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Certifications Yet</h3>
            <p className="text-muted-foreground">Professional certifications will be displayed here once added.</p>
          </div>
        )}
      </div>
    </div>
  )
}
