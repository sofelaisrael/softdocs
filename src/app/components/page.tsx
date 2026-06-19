'use client';

import { useEffect } from 'react';

export default function ComponentsPage() {
  useEffect(() => {
    // Tabs
    document.querySelectorAll('.tab-bar').forEach(function (bar) {
      bar.addEventListener('click', function (e) {
        const btn = (e.target as HTMLElement).closest('.tab-btn');
        if (!btn) return;
        const container = btn.closest('.tabs') as HTMLElement;
        container.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        container.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        const panel = container.querySelector('[data-panel="' + btn.getAttribute('data-tab') + '"]') as HTMLElement;
        if (panel) panel.classList.add('active');
      });
    });

    // Code toggles
    document.querySelectorAll('.comp-code-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const pre = (btn as HTMLElement).nextElementSibling as HTMLElement;
        pre.classList.toggle('open');
        (btn as HTMLElement).textContent = pre.classList.contains('open') ? 'Hide code' : 'Show code';
      });
    });

    // Accordion
    document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.classList.toggle('open');
        ((btn as HTMLElement).nextElementSibling as HTMLElement).classList.toggle('open');
      });
    });
  }, []);

  return (
    <>
      {/* ===== NAV ===== */}
      <nav className="inner-nav comp-nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
              <rect x="2" y="4" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M8 12h12M8 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            SoftDocs
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/docs">Docs</a>
            <a href="/components" className="active">Components</a>
            <a href="/pricing">Pricing</a>
          </div>
        </div>
      </nav>

      <div className="comp-page">
        <div className="container">
          <div className="page-header">
            <h1>Component Library</h1>
            <p>Interactive MDX components built into SoftDocs. Use them directly in your Markdown — every component supports theming, accessibility, and responsive layout out of the box.</p>
          </div>

          {/* Tabs */}
          <div className="component-card">
            <div className="comp-header">
              <h2>&lt;Tabs&gt;</h2>
              <span className="comp-badge">Interactive</span>
            </div>
            <div className="comp-desc">Group content into switchable panels. Great for multi-language code examples, platform-specific instructions, or API version comparisons.</div>
            <div className="comp-preview">
              <div className="tabs" id="tabs-demo">
                <div className="tab-bar">
                  <button className="tab-btn active" data-tab="npm">npm</button>
                  <button className="tab-btn" data-tab="yarn">yarn</button>
                  <button className="tab-btn" data-tab="pnpm">pnpm</button>
                </div>
                <div className="tab-panel active" data-panel="npm">
                  <h3>npm</h3>
                  <p>Install SoftDocs with npm — the default package manager for Node.js.</p>
                  <pre>npm create softdocs@latest my-docs</pre>
                </div>
                <div className="tab-panel" data-panel="yarn">
                  <h3>yarn</h3>
                  <p>Using Yarn? The same scaffolding command works with any package manager.</p>
                  <pre>yarn create softdocs my-docs</pre>
                </div>
                <div className="tab-panel" data-panel="pnpm">
                  <h3>pnpm</h3>
                  <p>Fast and disk-efficient — pnpm users can scaffold a site in under 2 seconds.</p>
                  <pre>pnpm create softdocs my-docs</pre>
                </div>
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre dangerouslySetInnerHTML={{
                __html: `<span class="cm">&lt;!-- Tabs usage in MDX --&gt;</span>\n&lt;<span class="tag">Tabs</span>&gt;\n  &lt;<span class="tag">Tab</span> <span class="prop">label</span>=<span class="str">"npm"</span>&gt;\n    npm create softdocs@latest my-docs\n  &lt;/<span class="tag">Tab</span>&gt;\n  &lt;<span class="tag">Tab</span> <span class="prop">label</span>=<span class="str">"yarn"</span>&gt;\n    yarn create softdocs my-docs\n  &lt;/<span class="tag">Tab</span>&gt;\n  &lt;<span class="tag">Tab</span> <span class="prop">label</span>=<span class="str">"pnpm"</span>&gt;\n    pnpm create softdocs my-docs\n  &lt;/<span class="tag">Tab</span>&gt;\n&lt;/<span class="tag">Tabs</span>&gt;`
              }} />
            </div>
          </div>

          {/* Callouts / Alerts */}
          <div className="component-card">
            <div className="comp-header">
              <h2>&lt;Alert&gt; / &lt;Callout&gt;</h2>
              <span className="comp-badge">Content</span>
            </div>
            <div className="comp-desc">Highlight important information with contextual callouts. Four severity levels — info, success, warning, error.</div>
            <div className="comp-preview">
              <div className="alert alert-info">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                <div><strong>Note:</strong> SoftDocs requires Node.js 18 or later. Check your version with <code>node --version</code>.</div>
              </div>
              <div className="alert alert-success">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <div><strong>Done!</strong> Your documentation site is running at <code>http://localhost:3000</code>.</div>
              </div>
              <div className="alert alert-warning">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                <div><strong>Port conflict:</strong> Port 3000 is already in use. Set <code>PORT=3001</code> to use a different port.</div>
              </div>
              <div className="alert alert-error">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                <div><strong>Missing config:</strong> No <code>softdocs.config.ts</code> found. Run <code>npx softdocs init</code> to create one.</div>
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre dangerouslySetInnerHTML={{
                __html: `&lt;<span class="tag">Alert</span> <span class="prop">type</span>=<span class="str">"info"</span>&gt;\n  SoftDocs requires Node.js 18 or later.\n&lt;/<span class="tag">Alert</span>&gt;\n\n&lt;<span class="tag">Alert</span> <span class="prop">type</span>=<span class="str">"warning"</span>&gt;\n  Port 3000 is already in use.\n&lt;/<span class="tag">Alert</span>&gt;`
              }} />
            </div>
          </div>

          {/* API Table */}
          <div className="component-card">
            <div className="comp-header">
              <h2>&lt;APITable&gt;</h2>
              <span className="comp-badge">Data</span>
            </div>
            <div className="comp-desc">Document function signatures, configuration options, and component props with a structured table. Supports types, defaults, and required indicators.</div>
            <div className="comp-preview">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'title', type: 'string', default: '—', desc: 'Page title used in the browser tab and search results.' },
                    { name: 'description', type: 'string', default: '—', desc: 'Meta description for SEO and social previews.' },
                    { name: 'version', type: 'string | string[]', default: '"*"', desc: 'Version range this page belongs to (e.g. <code>&gt;=2.0</code>).' },
                    { name: 'sidebar', type: 'boolean', default: 'true', desc: 'Show or hide this page from the sidebar navigation.' },
                    { name: 'searchBoost', type: 'number', default: '1.0', desc: 'Boost this page\'s search ranking relative to others.' },
                  ].map((row) => (
                    <tr key={row.name}>
                      <td><span className="param-name">{row.name}</span></td>
                      <td><span className="param-type">{row.type}</span></td>
                      <td><span className="param-default">{row.default}</span></td>
                      <td><span className="param-desc" dangerouslySetInnerHTML={{ __html: row.desc }} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre dangerouslySetInnerHTML={{
                __html: `&lt;<span class="tag">APITable</span>\n  <span class="prop">data</span>={<span class="fn">props</span>}\n  <span class="prop">columns</span>={[<span class="str">"Prop"</span>, <span class="str">"Type"</span>, <span class="str">"Default"</span>, <span class="str">"Description"</span>]}\n/&gt;`
              }} />
            </div>
          </div>

          {/* Steps */}
          <div className="component-card">
            <div className="comp-header">
              <h2>&lt;Steps&gt;</h2>
              <span className="comp-badge">Layout</span>
            </div>
            <div className="comp-desc">Numbered step-by-step instructions with automatic numbering. Perfect for tutorials, setup guides, and walkthroughs.</div>
            <div className="comp-preview">
              <div className="steps">
                {[
                  { num: '1', title: 'Create a project', desc: 'Run <code>npm create softdocs@latest my-docs</code> to scaffold a new documentation site with sensible defaults.' },
                  { num: '2', title: 'Write content', desc: 'Add Markdown or MDX files to the <code>docs/</code> directory. Frontmatter controls metadata, versioning, and sidebar placement.' },
                  { num: '3', title: 'Customise the theme', desc: 'Edit <code>softdocs.config.ts</code> to override colors, typography, and layout. Changes hot-reload in development.' },
                  { num: '4', title: 'Deploy', desc: 'Run <code>npm run build</code> and deploy the <code>dist/</code> folder to Vercel, Netlify, or any static host.' },
                ].map((s) => (
                  <div key={s.num} className="step">
                    <div className="step-num">{s.num}</div>
                    <div className="step-body">
                      <h4>{s.title}</h4>
                      <p dangerouslySetInnerHTML={{ __html: s.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre dangerouslySetInnerHTML={{
                __html: `&lt;<span class="tag">Steps</span>&gt;\n  &lt;<span class="tag">Step</span> <span class="prop">title</span>=<span class="str">"Create a project"</span>&gt;\n    Run \\\`npm create softdocs@latest\\\` to scaffold a site.\n  &lt;/<span class="tag">Step</span>&gt;\n  &lt;<span class="tag">Step</span> <span class="prop">title</span>=<span class="str">"Write content"</span>&gt;\n    Add Markdown files to the \\\`docs/\\\` directory.\n  &lt;/<span class="tag">Step</span>&gt;\n&lt;/<span class="tag">Steps</span>&gt;`
              }} />
            </div>
          </div>

          {/* Accordion */}
          <div className="component-card">
            <div className="comp-header">
              <h2>&lt;Accordion&gt;</h2>
              <span className="comp-badge">Interactive</span>
            </div>
            <div className="comp-desc">Collapsible sections for FAQs, detailed explanations, and reference material. Multiple items can be open simultaneously.</div>
            <div className="comp-preview">
              <div className="accordion">
                <div className="accordion-item">
                  <button className="accordion-trigger open">
                    What is SoftDocs?
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="accordion-panel open">
                    SoftDocs is a documentation platform that turns Markdown into fast, searchable documentation sites. It handles search indexing, version routing, theme compilation, and MDX component rendering out of the box.
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-trigger">
                    Do I need a database?
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="accordion-panel">
                    No. SoftDocs compiles your Markdown into a static site. No database, no server runtime. Deploy the output to any static host — Vercel, Netlify, Cloudflare Pages, or a simple S3 bucket.
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-trigger">
                    Can I use my own domain?
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="accordion-panel">
                    Yes. Since SoftDocs generates static files, you can point any custom domain at the output. Configure your DNS and set the domain in your deployment platform — no SoftDocs-specific setup needed.
                  </div>
                </div>
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre dangerouslySetInnerHTML={{
                __html: `&lt;<span class="tag">Accordion</span>&gt;\n  &lt;<span class="tag">AccordionItem</span> <span class="prop">title</span>=<span class="str">"What is SoftDocs?"</span>&gt;\n    SoftDocs is a documentation platform...\n  &lt;/<span class="tag">AccordionItem</span>&gt;\n  &lt;<span class="tag">AccordionItem</span> <span class="prop">title</span>=<span class="str">"Do I need a database?"</span>&gt;\n    No. SoftDocs compiles to a static site.\n  &lt;/<span class="tag">AccordionItem</span>&gt;\n&lt;/<span class="tag">Accordion</span>&gt;`
              }} />
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="component-card">
            <div className="comp-header">
              <h2>&lt;Comparison&gt; / &lt;Diagram&gt;</h2>
              <span className="comp-badge">Data</span>
            </div>
            <div className="comp-desc">Side-by-side feature comparisons, before/after diagrams, and architecture breakdowns. Renders as a two-column grid with labeled lists.</div>
            <div className="comp-preview">
              <div className="diagram-row">
                <div className="diagram-col">
                  <h4>Without SoftDocs</h4>
                  <ul>
                    <li><span className="check no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></span> Manual search setup</li>
                    <li><span className="check no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></span> Duplicated files per version</li>
                    <li><span className="check no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></span> CSS conflicts from custom themes</li>
                    <li><span className="check no"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></span> Manual TOC generation</li>
                  </ul>
                </div>
                <div className="diagram-col">
                  <h4>With SoftDocs</h4>
                  <ul>
                    <li><span className="check yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span> Algolia search, zero config</li>
                    <li><span className="check yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span> Versioned content graph</li>
                    <li><span className="check yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span> Cascading theme engine</li>
                    <li><span className="check yes"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span> Auto TOC generation</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre dangerouslySetInnerHTML={{
                __html: `&lt;<span class="tag">Comparison</span>&gt;\n  &lt;<span class="tag">Column</span> <span class="prop">title</span>=<span class="str">"Without SoftDocs"</span>&gt;\n    - Manual search setup\n    - Duplicated files per version\n  &lt;/<span class="tag">Column</span>&gt;\n  &lt;<span class="tag">Column</span> <span class="prop">title</span>=<span class="str">"With SoftDocs"</span>&gt;\n    - Algolia search, zero config\n    - Versioned content graph\n  &lt;/<span class="tag">Column</span>&gt;\n&lt;/<span class="tag">Comparison</span>&gt;`
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="container">
          <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--muted)' }}>
            <span>&copy; {new Date().getFullYear()} SoftDocs</span>
            <span>All components support dark mode, theming, and responsive layout.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
