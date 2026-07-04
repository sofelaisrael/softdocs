import { ThemeToggle } from '@softdocs/ui'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ============ NAV ============ */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <svg className="w-8 h-8 text-accent" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>SoftDocs</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Docs</a>
              <a href="/components" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Components</a>
              <a href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
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
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border bg-surface px-3 py-1 text-xs font-medium text-accent mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="mr-2 rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">New</span>
            MDX v3 support is here &middot; v2.0
          </div>
          <h1 className="mx-auto max-w-4xl font-bold tracking-tight text-foreground sm:text-7xl mb-8">
            Turn Markdown into <span className="text-accent">beautiful</span> documentation
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
            SoftDocs transforms your Markdown into fast, searchable documentation sites.
            Built for developer experience — instant search, versioning, and full customization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20">
              Get Started &rarr;
            </a>
            <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border bg-surface px-8 py-4 text-base font-semibold hover:bg-muted/50 transition-all">
              View on GitHub
            </a>
          </div>

          {/* Preview window */}
          <div className="mx-auto max-w-5xl rounded-2xl border bg-surface shadow-2xl overflow-hidden ring-1 ring-border animate-in fade-in zoom-in-95 duration-1000">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
              </div>
              <div className="flex-1 text-center text-xs font-mono text-muted-foreground">
                softdocs.dev/getting-started
              </div>
            </div>
            <div className="flex h-[500px]">
              <div className="w-64 border-r bg-muted/10 p-6 hidden md:block text-left">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-4">Getting Started</div>
                <div className="space-y-1 mb-6">
                  <div className="px-3 py-1.5 rounded-md text-sm font-medium text-accent bg-accent/10 border border-accent/20">Installation</div>
                  <div className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">Configuration</div>
                  <div className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">First document</div>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-4">Guides</div>
                <div className="space-y-1">
                  <div className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">Custom MDX</div>
                  <div className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">Versioning</div>
                </div>
              </div>
              <div className="flex-1 p-8 md:p-12 text-left overflow-y-auto">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-2">Installation</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Updated 2 weeks ago</span>
                    <span className="w-1 h-1 rounded-full bg-muted" />
                    <span>v2.0</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Add SoftDocs to your project with a single command. The CLI scaffolds a complete documentation site with sensible defaults.
                </p>
                <div className="rounded-lg bg-black/90 dark:bg-black/40 p-6 mb-8 font-mono text-sm leading-relaxed border border-white/10">
                  <div className="text-muted-foreground mb-2"># Install the CLI</div>
                  <div className="text-white">npm create softdocs@latest my-docs</div>
                  <div className="mt-4 text-muted-foreground mb-2"># Start developing</div>
                  <div className="text-white">cd my-docs && npm run dev</div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Point it at your Markdown files and SoftDocs handles the rest — search indexing, version routing, and theme compilation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-[100px]" />
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-24 bg-surface/50 border-y">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-accent mb-4 tracking-wide uppercase">Features</h2>
            <h3 className="text-4xl font-bold mb-6 tracking-tight">Everything you need, out of the box</h3>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Six features that turn plain Markdown into a documentation experience your users will love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Full-text search',
                desc: 'Instant, keyboard-first search powered by Algolia. Fuzzy matching and typo tolerance.',
                icon: <path d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
              },
              {
                title: 'Versioned docs',
                desc: 'Ship and maintain multiple versions without duplicating content. AST-based diffing.',
                icon: <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13 12H3" />
              },
              {
                title: 'Custom MDX',
                desc: 'Embed interactive tabs, diagrams, and live code editors directly in your docs.',
                icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>
              },
              {
                title: 'Dark mode',
                desc: 'Automatic theme switching that respects system preference. Fully customizable.',
                icon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              },
              {
                title: 'Auto Table of Contents',
                desc: 'Generates a linked, scroll-spying sidebar from your headings automatically.',
                icon: <path d="M4 6h16M4 12h16M4 18h12" />
              },
              {
                title: 'Full theming system',
                desc: 'Override every visual aspect from a single config file — colors, typography, spacing.',
                icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border bg-background hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {feature.icon}
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CHALLENGES ============ */}
      <section className="py-24">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <h2 className="text-base font-semibold text-accent mb-4 tracking-wide uppercase">Engineering</h2>
              <h3 className="text-4xl font-bold mb-6 tracking-tight leading-tight">Hard problems, solved simply.</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Every feature came from a real constraint. Here is how we approached the hard parts.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                Read our engineering blog <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
              </a>
            </div>
            <div className="lg:w-2/3 space-y-12">
              {[
                {
                  num: '01',
                  title: 'Custom MDX parser with enhanced component support',
                  desc: 'We built a plugin-based parser layer on top of MDX that lets authors embed interactive tabs, diagrams, API tables, and live code blocks. Each component registers its own schema for props validation and fallback rendering.'
                },
                {
                  num: '02',
                  title: 'Versioned documentation without duplicating content',
                  desc: 'Instead of copying files per version, SoftDocs uses a content graph that maps each doc node to one or more version ranges. A diff engine highlights exactly what changed between releases by comparing the AST of adjacent versions.'
                },
                {
                  num: '03',
                  title: 'Theming system with full visual customization',
                  desc: 'We designed a cascading theme engine: a base palette of CSS custom properties, an optional brand override layer, and per-component shadow tokens. No CSS conflicts, no specificity wars.'
                },
              ].map((c) => (
                <div key={c.num} className="relative pl-16 group">
                  <div className="absolute left-0 top-0 text-5xl font-black text-muted/20 group-hover:text-accent/20 transition-colors duration-500">
                    {c.num}
                  </div>
                  <h4 className="text-2xl font-bold mb-4">{c.title}</h4>
                  <p className="text-muted-foreground text-lg leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 container">
        <div className="relative rounded-3xl bg-accent px-8 py-16 text-center overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to document your vision?
            </h2>
            <p className="mx-auto max-w-xl text-white/80 text-lg mb-10">
              Get a production-ready documentation site in under a minute. No account required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="w-full sm:w-auto bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 font-mono text-white text-sm">
                npm create softdocs@latest
              </div>
              <a href="#" className="w-full sm:w-auto bg-white text-accent hover:bg-white/90 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105">
                Get Started
              </a>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t py-20 bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-6">
                <svg className="w-6 h-6 text-accent" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>SoftDocs</span>
              </a>
              <p className="text-muted-foreground max-w-xs leading-relaxed">
                Turn Markdown into beautiful, searchable documentation sites.
                Built for teams who care about developer experience.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Component Library</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SoftDocs. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
