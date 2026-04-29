import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug:     string
  title:    string
  date:     string
  excerpt:  string
  tags:     string[]
  content?: string  // HTML — only loaded for single-post pages
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const raw  = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data } = matter(raw)

    return {
      slug:    (data.slug as string) || slug,
      title:   (data.title   as string) || slug,
      date:    (data.date    as string) || '',
      excerpt: (data.excerpt as string) || '',
      tags:    Array.isArray(data.tags) ? (data.tags as string[]) : [],
    }
  })

  // Newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Try both <slug>.md and look for frontmatter slug match
  const filePath = path.join(BLOG_DIR, `${slug}.md`)

  let raw: string
  try {
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch {
    // Fall back: scan all posts for matching frontmatter slug
    if (!fs.existsSync(BLOG_DIR)) return null
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
    let found: string | null = null
    for (const file of files) {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data } = matter(content)
      if (data.slug === slug) { found = content; break }
    }
    if (!found) return null
    raw = found
  }

  const { data, content: mdContent } = matter(raw)

  const processed = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(mdContent)

  const html = processed.toString()

  return {
    slug:    (data.slug    as string) || slug,
    title:   (data.title   as string) || slug,
    date:    (data.date    as string) || '',
    excerpt: (data.excerpt as string) || '',
    tags:    Array.isArray(data.tags) ? (data.tags as string[]) : [],
    content: html,
  }
}

/** Format date for display e.g. "15 April 2026" */
export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })
}
