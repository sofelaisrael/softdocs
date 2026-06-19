import { extractMdx } from './extract'
import { resolveVersions } from './version-resolver'
import path from 'path'
import fs from 'fs'

export interface Heading {
  depth: number
  text: string
  id: string
}

export interface DocNode {
  slug: string[]
  title: string
  description?: string
  versions: string[]
  headings: Heading[]
  filePath: string
}

export interface ContentIndex {
  docs: DocNode[]
  bySlug: Map<string, DocNode>
  byVersion: Map<string, DocNode[]>
}

export async function buildContentIndex(
  docsDir: string,
  allVersions: string[]
): Promise<ContentIndex> {
  const files: string[] = []
  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith('.mdx')) {
        files.push(full)
      }
    }
  }
  walk(docsDir)

  const results: DocNode[] = []
  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter, headings } = await extractMdx(raw)
    const rel = path.relative(docsDir, filePath)
    const slug = rel
      .replace(/\.mdx$/, '')
      .replace(/\\/g, '/')
      .replace(/\/index$/, '')
      .split('/')
      .filter(Boolean)

    results.push({
      slug,
      title: (frontmatter.title as string) ?? slug[slug.length - 1] ?? '',
      description: frontmatter.description as string | undefined,
      versions: resolveVersions(frontmatter.version as string[] | undefined, allVersions),
      headings,
      filePath,
    })
  }
  const docs = results

  const bySlug = new Map(docs.map((d) => [d.slug.join('/'), d]))
  const byVersion = new Map<string, DocNode[]>()

  for (const version of allVersions) {
    byVersion.set(version, docs.filter((d) => d.versions.includes(version)))
  }

  return { docs, bySlug, byVersion }
}
