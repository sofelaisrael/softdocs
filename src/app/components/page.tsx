'use client'

import { useState } from 'react'
import { ThemeToggle, Callout, Tabs, Tab, APITable, Steps, Step } from '@softdocs/ui'
import Link from 'next/link'

export default function ComponentsPage() {
  const [openCodes, setOpenCodes] = useState<Record<string, boolean>>({})

  const toggleCode = (id: string) => {
    setOpenCodes(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const componentSections = [
    {
      id: 'tabs',
      name: '<Tabs>',
      badge: 'Interactive',
      desc: 'Group content into switchable panels. Great for multi-language code examples, platform-specific instructions, or API version comparisons.',
      preview: (
        <Tabs>
          <Tab label="npm">
            <h3 className="font-bold mb-2">npm</h3>
            <p className="text-sm text-muted-foreground mb-4">Install SoftDocs with npm — the default package manager for Node.js.</p>
            <div className="bg-black/90 p-4 rounded-lg font-mono text-xs text-white">npm create softdocs@latest my-docs</div>
          </Tab>
          <Tab label="yarn">
            <h3 className="font-bold mb-2">yarn</h3>
            <p className="text-sm text-muted-foreground mb-4">Using Yarn? The same scaffolding command works with any package manager.</p>
            <div className="bg-black/90 p-4 rounded-lg font-mono text-xs text-white">yarn create softdocs my-docs</div>
          </Tab>
          <Tab label="pnpm">
            <h3 className="font-bold mb-2">pnpm</h3>
            <p className="text-sm text-muted-foreground mb-4">Fast and disk-efficient — pnpm users can scaffold a site in under 2 seconds.</p>
            <div className="bg-black/90 p-4 rounded-lg font-mono text-xs text-white">pnpm create softdocs my-docs</div>
          </Tab>
        </Tabs>
      ),
      code: `<Tabs>\n  <Tab label="npm">\n    npm create softdocs@latest my-docs\n  </Tab>\n  <Tab label="yarn">\n    yarn create softdocs my-docs\n  </Tab>\n</Tabs>`
    },
    {
      id: 'callouts',
      name: '<Callout>',
      badge: 'Content',
      desc: 'Highlight important information with contextual callouts. Four severity levels — info, success, warning, error.',
      preview: (
        <div className="space-y-4">
          <Callout type="info">
            <strong>Note:</strong> SoftDocs requires Node.js 18 or later. Check your version with <code>node --version</code>.
          </Callout>
          <Callout type="tip">
            <strong>Done!</strong> Your documentation site is running at <code>http://localhost:3000</code>.
          </Callout>
          <Callout type="warning">
            <strong>Port conflict:</strong> Port 3000 is already in use. Set <code>PORT=3001</code> to use a different port.
          </Callout>
        </div>
      ),
      code: `<Callout type="info">\n  SoftDocs requires Node.js 18 or later.\n</Callout>\n\n<Callout type="warning">\n  Port 3000 is already in use.\n</Callout>`
    },
    {
      id: 'apitable',
      name: '<APITable>',
      badge: 'Data',
      desc: 'Document function signatures, configuration options, and component props with a structured table. Supports types, defaults, and required indicators.',
      preview: (
        <APITable
          props={[
            { name: 'title', type: 'string', required: true, description: 'Page title used in the browser tab and search results.' },
            { name: 'description', type: 'string', default: '""', description: 'Meta description for SEO and social previews.' },
            { name: 'version', type: 'string | string[]', default: '"*"', description: 'Version range this page belongs to (e.g. >=2.0).' },
          ]}
        />
      ),
      code: `<APITable\n  props={[\n    { name: 'title', type: 'string', required: true, desc: '...' },\n    { name: 'description', type: 'string', default: '""', desc: '...' },\n  ]}\n/>`
    },
    {
      id: 'steps',
      name: '<Steps>',
      badge: 'Layout',
      desc: 'Numbered step-by-step instructions with automatic numbering. Perfect for tutorials, setup guides, and walkthroughs.',
      preview: (
        <Steps>
          <Step>
            <h4 className="font-bold mb-1">Create a project</h4>
            <p className="text-sm text-muted-foreground">Run <code>npm create softdocs@latest my-docs</code> to scaffold a new documentation site.</p>
          </Step>
          <Step>
            <h4 className="font-bold mb-1">Write content</h4>
            <p className="text-sm text-muted-foreground">Add Markdown or MDX files to the <code>docs/</code> directory.</p>
          </Step>
        </Steps>
      ),
      code: `<Steps>\n  <Step>\n    <h4 className="font-bold mb-1">Create a project</h4>\n    <p>...</p>\n  </Step>\n  <Step>\n    <h4 className="font-bold mb-1">Write content</h4>\n    <p>...</p>\n  </Step>\n</Steps>`
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* ============ NAV ============ */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
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
              <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
              <Link href="/components" className="text-sm font-medium text-accent">Components</Link>
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="#" className="hidden sm:inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="py-24 container max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Component Library</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Interactive MDX components built into SoftDocs. Use them directly in your Markdown —
          every component supports theming, accessibility, and responsive layout out of the box.
        </p>
      </section>

      {/* ============ COMPONENTS ============ */}
      <section className="pb-24 container max-w-5xl mx-auto space-y-16">
        {componentSections.map((section) => (
          <div key={section.id} className="rounded-3xl border bg-background overflow-hidden">
            <div className="p-8 border-b bg-muted/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold font-mono text-accent">{section.name}</h2>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
                  {section.badge}
                </span>
              </div>
              <p className="text-muted-foreground">{section.desc}</p>
            </div>

            <div className="p-8 bg-background">
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">Preview</div>
              <div className="not-prose">
                {section.preview}
              </div>
            </div>

            <div className="border-t">
              <button
                onClick={() => toggleCode(section.id)}
                className="w-full flex items-center justify-between px-8 py-4 hover:bg-muted/30 transition-colors text-xs font-bold text-muted-foreground uppercase tracking-widest"
              >
                {openCodes[section.id] ? 'Hide' : 'Show'} Code
                <svg className={`w-4 h-4 transition-transform ${openCodes[section.id] ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              {openCodes[section.id] && (
                <div className="p-8 bg-black/90 dark:bg-black/40 font-mono text-xs text-white/80 overflow-x-auto border-t border-white/5">
                  <pre>{section.code}</pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="mt-auto border-t py-12 bg-muted/20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SoftDocs. All rights reserved.</p>
            <p>All components support dark mode, theming, and responsive layout.</p>
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
