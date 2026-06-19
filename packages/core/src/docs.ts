import fs from 'fs'
import path from 'path'
import { extractMdx } from './extract'
import type { ExtractedDoc } from './extract'

export interface DocNode {
  slug: string
  title: string
  description?: string
  frontmatter: Record<string, unknown>
  headings: ExtractedDoc['headings']
  raw: string
  filePath: string
  lastModified: string
}

export interface ContentTree {
  nodes: Map<string, DocNode>
  slugs: string[]
}

export function findAllDocs(docsDir: string): string[] {
  if (!fs.existsSync(docsDir)) return []
  const slugs: string[] = []
  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        const rel = path.relative(docsDir, full)
        const slug = rel
          .replace(/\.mdx?$/, '')
          .replace(/\\/g, '/')
          .replace(/\/index$/, '')
        slugs.push(slug)
      }
    }
  }
  walk(docsDir)
  return slugs
}

export function resolveDocPath(docsDir: string, slug: string): string {
  const parts = slug.split('/').filter(Boolean)
  const candidates = [
    path.join(docsDir, ...parts) + '.mdx',
    path.join(docsDir, ...parts) + '.md',
    path.join(docsDir, ...parts, 'index.mdx'),
    path.join(docsDir, ...parts, 'index.md'),
  ]
  for (const c of candidates) {
    if (fs.existsSync(c)) return c
  }
  throw new Error(`Doc not found: "${slug}" in ${docsDir}`)
}

export async function parseDocFile(
  slug: string,
  filePath: string
): Promise<DocNode> {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const extracted = await extractMdx(raw)
  const stat = fs.statSync(filePath)
  return {
    slug,
    title:
      (extracted.frontmatter.title as string) ||
      slug.split('/').pop() ||
      slug,
    description: extracted.frontmatter.description as string | undefined,
    frontmatter: extracted.frontmatter,
    headings: extracted.headings,
    raw: extracted.raw,
    filePath,
    lastModified: stat.mtime.toISOString(),
  }
}

export async function buildContentTree(docsDir: string): Promise<ContentTree> {
  const slugs = findAllDocs(docsDir)
  const entries = await Promise.allSettled(
    slugs.map(async (slug) => {
      const filePath = resolveDocPath(docsDir, slug)
      const node = await parseDocFile(slug, filePath)
      return [slug, node] as const
    })
  )
  const nodes = new Map<string, DocNode>()
  for (const entry of entries) {
    if (entry.status === 'fulfilled') {
      nodes.set(entry.value[0], entry.value[1])
    }
  }
  return { nodes, slugs }
}
