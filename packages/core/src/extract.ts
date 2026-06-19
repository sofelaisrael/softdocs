import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import yaml from 'js-yaml'

export interface Heading {
  depth: number
  text: string
  id: string
  content: string
}

export interface ExtractedDoc {
  frontmatter: Record<string, unknown>
  headings: Heading[]
  raw: string
}

function collectText(node: any): string {
  const parts: string[] = []
  function walk(n: any) {
    if (n.type === 'text' || n.type === 'inlineCode') {
      parts.push(n.value || '')
    }
    if (n.children) n.children.forEach(walk)
  }
  walk(node)
  return parts.join(' ').trim()
}

export async function extractMdx(raw: string): Promise<ExtractedDoc> {
  const frontmatter: Record<string, unknown> = {}
  const headings: Heading[] = []

  const tree = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(remarkMdx)
    .parse(raw)

  let currentHeading: Heading | null = null
  let contentAccum: string[] = []

  function flushHeading() {
    if (currentHeading) {
      currentHeading.content = contentAccum.join(' ').replace(/\s+/g, ' ').trim().slice(0, 500)
    }
  }

  function visit(node: any) {
    if (node.type === 'heading') {
      flushHeading()
      contentAccum = []
      const text = node.children
        .map((c: any) => c.value || '')
        .join('')
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      currentHeading = { depth: node.depth, text, id, content: '' }
      headings.push(currentHeading)
    } else if (
      node.type === 'yaml'
    ) {
      const parsed = yaml.load(node.value) as Record<string, unknown> | undefined
      if (parsed) Object.assign(frontmatter, parsed)
    } else if (
      currentHeading &&
      (node.type === 'paragraph' || node.type === 'code' || node.type === 'list' || node.type === 'blockquote')
    ) {
      contentAccum.push(collectText(node))
    }
    if (node.children) node.children.forEach(visit)
  }
  visit(tree)
  flushHeading()

  return { frontmatter, headings, raw }
}
