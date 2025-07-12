"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline, List, ListOrdered, Link, ImageIcon, Code, Quote, Save, Eye, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function NewBlogPost() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [published, setPublished] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [image, setImage] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  // Rich text editor state
  const [selectedText, setSelectedText] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value))
    }
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "underline":
        formattedText = `<u>${selectedText}</u>`
        break
      case "code":
        formattedText = selectedText.includes("\n") ? `\`\`\`\n${selectedText}\n\`\`\`` : `\`${selectedText}\``
        break
      case "quote":
        formattedText = `> ${selectedText}`
        break
      case "list":
        formattedText = `- ${selectedText}`
        break
      case "ordered-list":
        formattedText = `1. ${selectedText}`
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        break
      case "image":
        formattedText = `![${selectedText}](image-url)`
        break
      default:
        formattedText = selectedText
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)

    // Focus back to textarea
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  const handleSave = async (isDraft = true) => {
    setLoading(true)

    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        tags,
        published: isDraft ? false : published,
        featured,
        image: image || null,
      }
      
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: isDraft ? "Draft saved successfully" : "Post published successfully",
        })
        router.push("/admin/blog")
      } else {
        throw new Error("Failed to save post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatToolbarButtons = [
    { icon: Bold, action: "bold", tooltip: "Bold" },
    { icon: Italic, action: "italic", tooltip: "Italic" },
    { icon: Underline, action: "underline", tooltip: "Underline" },
    { icon: Code, action: "code", tooltip: "Code" },
    { icon: Quote, action: "quote", tooltip: "Quote" },
    { icon: List, action: "list", tooltip: "Bullet List" },
    { icon: ListOrdered, action: "ordered-list", tooltip: "Numbered List" },
    { icon: Link, action: "link", tooltip: "Link" },
    { icon: ImageIcon, action: "image", tooltip: "Image" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Blog Post</h1>
          <p className="text-muted-foreground">Write and publish a new article for your blog.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="mr-2 h-4 w-4" />
            {isPreview ? "Edit" : "Preview"}
          </Button>
          <Button variant="outline" onClick={() => handleSave(true)}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave(false)} disabled={loading}>
            {loading ? "Saving..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {!isPreview ? (
            <>
              {/* Title */}
              <Card>
                <CardHeader>
                  <CardTitle>Post Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter post title..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="post-url-slug"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief description of the post..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Featured Image URL</Label>
                    <Input
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Formatting Toolbar */}
                  <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-muted/50">
                    {formatToolbarButtons.map((button) => (
                      <Button
                        key={button.action}
                        variant="ghost"
                        size="sm"
                        onClick={() => insertFormatting(button.action)}
                        title={button.tooltip}
                      >
                        <button.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>

                  {/* Content Textarea */}
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog post content here... You can use Markdown formatting."
                    rows={20}
                    className="rounded-t-none border-t-0 font-mono text-sm"
                  />

                  <div className="text-xs text-muted-foreground mt-2">
                    Supports Markdown formatting. Use the toolbar buttons or type Markdown directly.
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Preview Mode */
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <article className="prose prose-gray dark:prose-invert max-w-none">
                  {image && (
                    <img
                      src={image || "/placeholder.svg"}
                      alt={title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}
                  <h1>{title || "Untitled Post"}</h1>
                  {excerpt && <p className="lead text-lg text-muted-foreground mb-6">{excerpt}</p>}
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "")
                        return !inline && match ? (
                          <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {content || "No content yet..."}
                  </ReactMarkdown>
                </article>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Switch id="published" checked={published} onCheckedChange={setPublished} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured</Label>
                <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Title length:</span> {title.length}/60
              </div>
              <div>
                <span className="font-medium">Excerpt length:</span> {excerpt.length}/160
              </div>
              <div>
                <span className="font-medium">Word count:</span>{" "}
                {content.split(" ").filter((word) => word.length > 0).length}
              </div>
              <div>
                <span className="font-medium">Reading time:</span> ~
                {Math.ceil(content.split(" ").filter((word) => word.length > 0).length / 200)} min
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
