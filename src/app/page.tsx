import { ThemeToggle } from '@softdocs/ui'

export default function Home() {
  return (
    <>
      {/* ============ NAV ============ */}
      <nav className="landing-nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <svg viewBox="0 0 28 28" fill="none">
              <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            SoftDocs
          </a>
          <div className="nav-links">
            <a href="/docs">Docs</a>
            <a href="/components">Components</a>
            <a href="/pricing">Pricing</a>
            <a href="#" className="btn btn-primary">Get Started</a>
          </div>
          <div className="header-actions">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag"><span className="tag">v2.0 &middot; Now with MDX v3 support</span></div>
          <h1>Turn Markdown into<br />beautiful documentation</h1>
          <p>SoftDocs transforms your Markdown into fast, searchable documentation sites. Built for developer experience — instant search, versioned docs, full visual customization.</p>
          <div className="hero-actions">
            <a href="#" className="btn btn-primary">Get Started &rarr;</a>
            <a href="#" className="btn btn-secondary">View on GitHub</a>
          </div>

          {/* Preview window */}
          <div className="preview-window">
            <div className="preview-window-bar">
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
              <span>softdocs.dev/getting-started</span>
            </div>
            <div className="preview-content">
              <div className="preview-sidebar">
                <div className="preview-sidebar-label">Getting Started</div>
                <div className="preview-sidebar-item active">Installation</div>
                <div className="preview-sidebar-item">Configuration</div>
                <div className="preview-sidebar-item">First document</div>
                <div className="preview-sidebar-item">Theming</div>
                <div className="preview-sidebar-label">Guides</div>
                <div className="preview-sidebar-item">Custom MDX</div>
                <div className="preview-sidebar-item">Versioning</div>
                <div className="preview-sidebar-item">Deployment</div>
              </div>
              <div className="preview-main">
                <h3>Installation</h3>
                <div className="preview-meta">
                  <span>Updated 2 weeks ago</span>
                  <span>&middot;</span>
                  <span>v2.0</span>
                </div>
                <p>Add SoftDocs to your project with a single command. The CLI scaffolds a complete documentation site with sensible defaults.</p>
                <div className="preview-code">
                  <span className="cm"># Install the CLI</span><br />
                  npm create softdocs@latest my-docs<br /><br />
                  <span className="cm"># Start developing</span><br />
                  cd my-docs &amp;&amp; npm run dev
                </div>
                <p>Point it at your Markdown files and SoftDocs handles the rest — search indexing, version routing, and theme compilation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="section" id="features">
        <div className="container">
          <span className="tag">Features</span>
          <h2 className="section-title">Everything a documentation<br />site needs, out of the box</h2>
          <p className="section-subtitle">Six features that turn plain Markdown into a documentation experience your users will love.</p>

          <div className="features-grid">
            <div className="card feature-card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              </div>
              <h3>Full-text search</h3>
              <p>Instant, keyboard-first search powered by Algolia. Fuzzy matching, typo tolerance, and navigable results without leaving the page.</p>
            </div>
            <div className="card feature-card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13 12H3" /></svg>
              </div>
              <h3>Versioned docs</h3>
              <p>Ship and maintain multiple versions without duplicating content. Diff highlighting shows exactly what changed between releases.</p>
            </div>
            <div className="card feature-card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /></svg>
              </div>
              <h3>Custom MDX components</h3>
              <p>Embed interactive tabs, diagrams, API tables, and live code editors directly in your docs. Every component is fully customizable.</p>
            </div>
            <div className="card feature-card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              </div>
              <h3>Dark mode</h3>
              <p>Automatic theme switching that respects system preference. Both themes are fully customizable from your config file.</p>
            </div>
            <div className="card feature-card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h12" /></svg>
              </div>
              <h3>Auto table of contents</h3>
              <p>Generates a linked, scroll-spying sidebar from your headings. Supports up to three levels with collapse and highlight.</p>
            </div>
            <div className="card feature-card">
              <div className="icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              </div>
              <h3>Full theming system</h3>
              <p>Override every visual aspect from a single config file — colors, typography, spacing, layout. Your docs, your brand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TECH STACK ============ */}
      <section className="section" id="tech">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="tag">Built With</span>
          <h2 className="section-title">Modern stack, proven tools</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>Every piece of the stack was chosen for developer experience and long-term maintainability.</p>
          <div className="tech-row">
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              React
            </div>
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M4 10l8 4 8-4"/></svg>
              TypeScript
            </div>
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              MDX
            </div>
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              TailwindCSS
            </div>
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Algolia
            </div>
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              Next.js
            </div>
          </div>
        </div>
      </section>

      {/* ============ CHALLENGES ============ */}
      <section className="section" id="challenges" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">Engineering</span>
          <h2 className="section-title">Problems we solved<br />building SoftDocs</h2>
          <p className="section-subtitle">Every feature came from a real constraint. Here is how we approached the hard parts.</p>
          <div className="challenges-grid" style={{ counterReset: 'challenge' }}>
            {[
              { num: '01', title: 'Custom MDX parser with enhanced component support', desc: 'We built a plugin-based parser layer on top of MDX that lets authors embed interactive tabs, diagrams, API tables, and live code blocks. Each component registers its own schema for props validation and fallback rendering. The parser is fully extensible — teams can write custom handlers for domain-specific markup without forking the core.' },
              { num: '02', title: 'Versioned documentation without duplicating content', desc: 'Instead of copying files per version, SoftDocs uses a content graph that maps each doc node to one or more version ranges. A diff engine highlights exactly what changed between releases — additions, edits, and removals — by comparing the AST of adjacent versions. Only the diff metadata is stored per version; the canonical content stays in one place.' },
              { num: '03', title: 'Theming system with full visual customization', desc: 'We designed a cascading theme engine: a base palette of ~30 CSS custom properties, an optional brand override layer, and per-component shadow tokens. Users provide their overrides in a single theme.config.ts file; the compiler resolves the cascade and emits a scoped stylesheet. No CSS conflicts, no specificity wars.' },
            ].map((c) => (
              <div key={c.num} className="card challenge-card">
                <div className="num">{c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section">
        <div className="container">
          <div className="cta-section">
            <h2>Ready to document<br />what you are building?</h2>
            <p>Get a production-ready documentation site in under a minute. No account required.</p>
            <div className="cta-actions">
              <a href="#" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>npm create softdocs@latest &rarr;</a>
              <a href="#" className="btn btn-secondary" style={{ fontSize: '16px', padding: '14px 32px' }}>Read the docs</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="nav-logo" style={{ marginBottom: 'var(--space-3)', display: 'inline-flex' }}>
                <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
                  <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                SoftDocs
              </a>
              <p>Turn Markdown into beautiful, searchable documentation sites. Built for teams who care about developer experience.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <a href="/#features">Features</a>
              <a href="/pricing">Pricing</a>
              <a href="/docs">Documentation</a>
              <a href="/components">Components</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="/docs">Docs</a>
              <a href="/components">Component Library</a>
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
  );
}
