import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import { buildContentIndex, resolveDocPath, parseDocFile, buildNavTree, getAdjacentDocs, rehypeCodeButton } from '@softdocs/core'
import type { NavItem, NavSection } from '@softdocs/core'
import { CopyButtonHydrator, ScrollSpyToc, Sidebar, ThemeToggle, MobileTocDropdown, mdxComponents, VersionPicker, Search } from '@softdocs/ui'
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
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <svg className="w-8 h-8 text-accent" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>SoftDocs</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/docs" className="text-sm font-medium text-accent">Docs</Link>
              <Link href="/components" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Components</Link>
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Search
              currentVersion={version}
              appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''}
              searchApiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ''}
              indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? ''}
            />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-[1440px] mx-auto w-full flex items-start">
        <Sidebar sections={nav} currentVersion={version} />

        <main className="flex-1 min-w-0 px-6 py-12 lg:px-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <MobileTocDropdown headings={doc.headings} />

            <nav className="flex items-center gap-2 mb-8 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-muted/30">/</span>}
                  {c.href ? <Link href={c.href} className="hover:text-accent transition-colors">{c.label}</Link> : <span>{c.label}</span>}
                </span>
              ))}
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{doc.title}</h1>
              <VersionPicker
                versions={config.versions.all}
                currentVersion={version}
                currentSlug={slugStr}
                versionIndex={versionIndex}
              />
            </div>

            {doc.description && (
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                {doc.description}
              </p>
            )}

            <div className="prose prose-softdocs dark:prose-invert max-w-none">
              {content}
            </div>

            <CopyButtonHydrator />

            <DocPagination prev={prev} next={next} version={version} />

            <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <span>Last updated {formatDate(doc.lastModified)}</span>
              <a href={`vscode://file/${doc.filePath}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border bg-surface hover:bg-muted/50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit this page
              </a>
            </div>
          </div>
        </main>

        <div className="hidden xl:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-8">
          <ScrollSpyToc headings={doc.headings} />
        </div>
      </div>

      <footer className="border-t py-12 bg-muted/20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 font-bold text-foreground tracking-tight">
              <svg className="w-5 h-5 text-accent" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>SoftDocs</span>
            </div>
            <p>&copy; {new Date().getFullYear()} SoftDocs. Open source under MIT.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DocPagination({ prev, next, version }: { prev: NavItem | null; next: NavItem | null; version: string }) {
  return (
    <nav className="flex flex-col sm:flex-row justify-between gap-4 mt-16 pt-8 border-t">
      {prev ? (
        <Link href={`/docs/${version}/${prev.slug}`} className="group flex-1 p-6 rounded-xl border bg-surface hover:border-accent/50 transition-all">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-accent">Previous</div>
          <div className="text-base font-bold">{prev.title}</div>
        </Link>
      ) : <div className="flex-1" />}
      {next ? (
        <Link href={`/docs/${version}/${next.slug}`} className="group flex-1 p-6 rounded-xl border bg-surface hover:border-accent/50 transition-all text-right">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-accent">Next</div>
          <div className="text-base font-bold">{next.title}</div>
        </Link>
      ) : <div className="flex-1" />}
    </nav>
  )
}
