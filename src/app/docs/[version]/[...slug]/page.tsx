import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import { buildContentIndex, resolveDocPath, parseDocFile, buildNavTree, getAdjacentDocs, rehypeCodeButton } from '@softdocs/core'
import type { NavItem, NavSection } from '@softdocs/core'
import { CopyButtonHydrator, ScrollSpyToc, Sidebar, ThemeToggle, MobileTocDropdown, mdxComponents, VersionPicker } from '@softdocs/ui'
import Link from 'next/link'
import path from 'path'
import config from '../../../../../softdocs.config'

const DOCS_DIR = path.resolve(process.cwd(), 'docs')

interface Props {
  params: Promise<{ version: string; slug: string[] }>
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getBreadcrumbs(nav: NavSection[], slug: string, version: string): { label: string; href?: string }[] {
  for (const section of nav) {
    for (const item of section.items) {
      if (item.slug === slug) {
        const sectionHref = section.slug ? `/docs/${version}/${section.slug}` : undefined
        return [
          { label: 'Docs', href: `/docs/${version}` },
          { label: section.label, href: sectionHref },
          { label: item.title },
        ]
      }
    }
  }
  return [{ label: 'Docs', href: `/docs/${version}` }]
}

export async function generateStaticParams() {
  const index = await buildContentIndex(DOCS_DIR, config.versions.all)
  const params: { version: string; slug: string[] }[] = []
  for (const [version, docs] of index.byVersion) {
    for (const doc of docs) {
      params.push({ version, slug: doc.slug })
    }
  }
  return params
}

export default async function DocPage({ params }: Props) {
  const { version, slug } = await params
  const slugStr = slug.join('/')

  if (!config.versions.all.includes(version)) {
    notFound()
  }

  let docPath: string
  try {
    docPath = resolveDocPath(DOCS_DIR, slugStr)
  } catch {
    notFound()
  }

  const doc = await parseDocFile(slugStr, docPath)

  const index = await buildContentIndex(DOCS_DIR, config.versions.all)
  const docNode = index.bySlug.get(slugStr)
  if (docNode && !docNode.versions.includes(version)) {
    notFound()
  }

  const nav = buildNavTree(DOCS_DIR)
  const { prev, next } = getAdjacentDocs(nav, DOCS_DIR, slugStr)

  const crumbs = getBreadcrumbs(nav, slugStr, version)

  const rehypeShiki = (await import('@shikijs/rehype')).default
  const rehypeSlug = (await import('rehype-slug')).default

  const { content } = await compileMDX({
    source: doc.raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark' } }],
          rehypeCodeButton,
        ],
      },
    },
    components: mdxComponents as any,
  })

  const versionIndex: Record<string, string[]> = {}
  for (const [v, docs] of index.byVersion) {
    versionIndex[v] = docs.map(d => d.slug.join('/'))
  }

  return (
    <>
      <nav className="inner-nav">
        <div className="nav-inner" style={{ maxWidth: '1440px' }}>
          <Link href="/" className="nav-logo">
            <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
              <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            SoftDocs
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/docs" className="active">Docs</Link>
            <Link href="/components">Components</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/#features">Features</Link>
          </div>
          <div className="header-actions">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="doc-layout">
        <Sidebar sections={nav} currentVersion={version} />

        <main className="doc-content">
          <MobileTocDropdown headings={doc.headings} />

          <nav className="doc-breadcrumbs">
            {crumbs.map((c, i) => (
              <span key={i} className="doc-breadcrumb-item">
                {i > 0 && <span className="doc-breadcrumb-sep">/</span>}
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <h1 style={{ marginBottom: 0 }}>{doc.title}</h1>
            <VersionPicker
              versions={config.versions.all}
              currentVersion={version}
              currentSlug={slugStr}
              versionIndex={versionIndex}
            />
          </div>
          {doc.description && (
            <div className="doc-meta">
              <span>{doc.description}</span>
            </div>
          )}

          {content}

          <CopyButtonHydrator />

          <DocPagination prev={prev} next={next} version={version} />

          <div className="doc-footer">
            <div className="doc-footer-left">
              <span>Last updated {formatDate(doc.lastModified)}</span>
            </div>
            <a href={`vscode://file/${doc.filePath}`} className="doc-footer-edit">Edit this page</a>
          </div>
        </main>

        <ScrollSpyToc headings={doc.headings} />
      </div>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="nav-logo" style={{ marginBottom: 'var(--space-3)', display: 'inline-flex' }}>
                <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
                  <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                SoftDocs
              </Link>
              <p>Turn Markdown into beautiful, searchable documentation sites. Built for teams who care about developer experience.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <Link href="/#features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/docs">Documentation</Link>
              <Link href="/components">Components</Link>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <Link href="/docs">Docs</Link>
              <Link href="/components">Component Library</Link>
              <a href="#">API Reference</a>
              <a href="#">GitHub</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} SoftDocs. Open source under MIT.</span>
            <span>Built with React, TypeScript, and MDX.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

function DocPagination({ prev, next, version }: { prev: NavItem | null; next: NavItem | null; version: string }) {
  return (
    <nav className="doc-pagination">
      {prev ? (
        <Link href={`/docs/${version}/${prev.slug}`} className="doc-pagination-link doc-pagination-prev">
          <span className="doc-pagination-label">Previous</span>
          <span className="doc-pagination-title">{prev.title}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link href={`/docs/${version}/${next.slug}`} className="doc-pagination-link doc-pagination-next">
          <span className="doc-pagination-label">Next</span>
          <span className="doc-pagination-title">{next.title}</span>
        </Link>
      ) : <div />}
    </nav>
  )
}
