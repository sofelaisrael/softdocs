import { buildNavTree } from '@softdocs/core'
import { CopyButtonHydrator, Sidebar } from '@softdocs/ui'
import Link from 'next/link'
import path from 'path'
import config from '../../../softdocs.config'

const DOCS_DIR = path.resolve(process.cwd(), 'docs')
const defaultVersion = config.versions.default

export default function DocsOverview() {
  const nav = buildNavTree(DOCS_DIR)

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
        </div>
      </nav>

      <div className="doc-layout">
        <Sidebar sections={nav} currentVersion={defaultVersion} />

        <main className="doc-content">
          <h1>Documentation</h1>
          <div className="doc-meta">
            <span>Welcome to the SoftDocs documentation</span>
          </div>

          <p>SoftDocs transforms your Markdown into fast, searchable documentation sites. Browse the docs using the sidebar or start with one of the guides below.</p>

          <h2 id="getting-started">Getting Started</h2>
          <p>New to SoftDocs? Head over to the <Link href={`/docs/${defaultVersion}/getting-started`}>Getting Started guide</Link> to set up your first documentation site.</p>

          <CopyButtonHydrator />
        </main>

        <aside className="doc-toc">
          <div className="toc-label">On this page</div>
          <a href="#getting-started" className="toc-item level-2">Getting Started</a>
        </aside>

        <div className="doc-footer">
          <span>&copy; {new Date().getFullYear()} SoftDocs</span>
          <span>Found an error? <a href="#">Edit this page</a></span>
        </div>
      </div>
    </>
  )
}
