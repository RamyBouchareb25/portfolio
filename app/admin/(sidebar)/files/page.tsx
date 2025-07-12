"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, File, Trash2, ExternalLink, Copy } from "lucide-react"
import { uploadFile } from "@/app/actions/files"
import { useToast } from "@/hooks/use-toast"

interface UploadedFile {
  filename: string
  url: string
  uploadedAt: string
}

export default function AdminFiles() {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      filename: "resume.pdf",
      url: "/files/resume.pdf",
      uploadedAt: new Date().toISOString(),
    },
  ])
  const { toast } = useToast()

  const handleFileUpload = async (formData: FormData) => {
    setUploading(true)
    try {
      const result = await uploadFile(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.success) {
        toast({
          title: "Success",
          description: "File uploaded successfully",
        })

        // Add to uploaded files list
        setUploadedFiles((prev) => [
          {
            filename: result.filename!,
            url: result.url!,
            uploadedAt: new Date().toISOString(),
          },
          ...prev,
        ])

        // Reset form
        const form = document.getElementById("upload-form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Copied",
      description: "File URL copied to clipboard",
    })
  }

  const removeFile = (filename: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.filename !== filename))
    toast({
      title: "Removed",
      description: "File removed from list",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">File Management</h1>
        <p className="text-muted-foreground">Upload and manage files for your portfolio</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload New File</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="upload-form" action={handleFileUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip,.tar,.gz"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF, ZIP, TAR, GZ (Max 10MB)
                </p>
              </div>

              <Button type="submit" disabled={uploading} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload File"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* File List */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.length > 0 ? (
                uploadedFiles.map((file) => (
                  <div key={file.filename} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{file.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(file.url)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => removeFile(file.filename)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No files uploaded yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">File Access</h4>
            <p className="text-sm text-muted-foreground">
              Uploaded files are stored in <code className="bg-muted px-1 rounded">/public/files/</code> and can be
              accessed via <code className="bg-muted px-1 rounded">/files/filename</code>
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Common Use Cases</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Resume/CV files for download links</li>
              <li>• Project images and screenshots</li>
              <li>• Documentation and guides</li>
              <li>• Certificates and credentials</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">File Naming</h4>
            <p className="text-sm text-muted-foreground">
              Files are automatically renamed with timestamps to prevent conflicts. Special characters are replaced with
              underscores.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
