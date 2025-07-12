import { unstable_noStore as noStore } from 'next/cache'

interface GitHubGist {
  id: string
  description: string
  files: Record<
    string,
    {
      filename: string
      language: string
      content: string
      size: number
    }
  >
  public: boolean
  created_at: string
  updated_at: string
  html_url: string
  comments: number
  forks?: number
}

export async function getGitHubGists(username = "RamyBouchareb25"): Promise<GitHubGist[]> {
  noStore()
  try {
    const response = await fetch(`https://api.github.com/users/${username}/gists`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-Website",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const gists = await response.json()

    // Fetch content for each gist
    const gistsWithContent = await Promise.all(
      gists.map(async (gist: any) => {
        try {
          const gistResponse = await fetch(gist.url, {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "Portfolio-Website",
            },
          })

          if (gistResponse.ok) {
            const fullGist = await gistResponse.json()
            return {
              id: fullGist.id,
              description: fullGist.description || "No description",
              files: Object.entries(fullGist.files || {}).reduce(
                (acc, [key, file]: [string, any]) => {
                  acc[key] = {
                    filename: file.filename,
                    language: file.language || "text",
                    content: file.content || "",
                    size: file.size || 0,
                  }
                  return acc
                },
                {} as Record<string, any>,
              ),
              public: fullGist.public,
              created_at: fullGist.created_at,
              updated_at: fullGist.updated_at,
              html_url: fullGist.html_url,
              comments: fullGist.comments || 0,
              forks: 0, // GitHub API doesn't provide fork count for gists
            }
          }
        } catch (error) {
          console.error(`Error fetching gist ${gist.id}:`, error)
          return null
        }

        // Fallback if detailed fetch fails
        return {
          id: gist.id,
          description: gist.description || "No description",
          files: Object.entries(gist.files || {}).reduce(
            (acc, [key, file]: [string, any]) => {
              acc[key] = {
                filename: file.filename,
                language: file.language || "text",
                content: "// Content not available",
                size: file.size || 0,
              }
              return acc
            },
            {} as Record<string, any>,
          ),
          public: gist.public,
          created_at: gist.created_at,
          updated_at: gist.updated_at,
          html_url: gist.html_url,
          comments: gist.comments || 0,
          forks: 0,
        }
      }),
    )

    return gistsWithContent.filter(Boolean)
  } catch (error) {
    console.error("Error fetching GitHub gists:", error)
    return []
  }
}
