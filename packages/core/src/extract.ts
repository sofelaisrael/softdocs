import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import yaml from 'js-yaml'

export interface ExtractedDoc {
  frontmatter: Record<string, unknown>
  headings: { depth: number; text: string; id: string }[]
  raw: string
}

export async function extractMdx(raw: string): Promise<ExtractedDoc> {
  const frontmatter: Record<string, unknown> = {}
  const headings: { depth: number; text: string; id: string }[] = []

  const tree = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(remarkMdx)
    .parse(raw)

  function visit(node: any) {
    if (node.type === 'heading') {
      const text = node.children
        .map((c: any) => c.value || '')
        .join('')
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      headings.push({ depth: node.depth, text, id })
    }
    if (node.type === 'yaml') {
      const parsed = yaml.load(node.value) as Record<string, unknown> | undefined
      if (parsed) Object.assign(frontmatter, parsed)
    }
    if (node.children) node.children.forEach(visit)
  }
  visit(tree)

  return { frontmatter, headings, raw }
}
