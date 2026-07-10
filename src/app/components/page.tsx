"use client";

import { useEffect } from "react";
import { ThemeToggle } from "@softdocs/ui";

export default function ComponentsPage() {
  useEffect(() => {
    document.querySelectorAll(".tab-bar").forEach(function (bar) {
      bar.addEventListener("click", function (e) {
        const btn = (e.target as HTMLElement).closest(".tab-btn");
        if (!btn) return;
        const container = btn.closest(".tabs") as HTMLElement;
        container.querySelectorAll(".tab-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        container.querySelectorAll(".tab-panel").forEach(function (p) {
          p.classList.remove("active");
        });
        btn.classList.add("active");
        const panel = container.querySelector(
          '[data-panel="' + btn.getAttribute("data-tab") + '"]',
        ) as HTMLElement;
        if (panel) panel.classList.add("active");
      });
    });

    document.querySelectorAll(".comp-code-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const pre = (btn as HTMLElement).nextElementSibling as HTMLElement;
        pre.classList.toggle("open");
        (btn as HTMLElement).textContent = pre.classList.contains("open")
          ? "Hide code"
          : "Show code";
      });
    });

    document.querySelectorAll(".accordion-trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.toggle("open");
        (btn as HTMLElement).nextElementSibling!.classList.toggle("open");
      });
    });
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <div className="nav-left">
            <a href="/" className="nav-logo">
              <div className="w-8 h-8 rounded-[10px] bg-[#1d1c1a] flex items-center justify-center shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
              </div>
              <span>versio</span>
              <span className="nav-logo-badge">BETA</span>
            </a>
            <nav className="hidden lg:flex nav-links">
              <a href="/docs">Documentation</a>
              <a href="/components">Components</a>
              <a href="/pricing">Pricing</a>
              <a href="#" className="flex items-center gap-1.5">
                Changelog{" "}
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-sand text-ink-faint">
                  v3.2
                </span>
              </a>
            </nav>
          </div>
          <div className="nav-right">
            <div className="nav-search">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input type="search" placeholder="Search docs..." />
              <span className="text-[10px] text-ink-faint hidden sm:inline border border-line rounded px-1.5 py-0.5">
                CtrlK
              </span>
            </div>
            <ThemeToggle />
            <a
              href="#"
              className="btn btn-primary"
              style={{ padding: "0 16px", height: "36px", fontSize: "13.5px" }}
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      <div className="comp-page">
        <div className="container">
          <div className="page-header">
            <h1>Component Library</h1>
            <p>
              Interactive MDX components built into Versio. Use them directly in
              your Markdown. Every component supports theming, accessibility,
              and responsive layout out of the box.
            </p>
          </div>

          <div className="component-card" style={{ padding: "var(--space-7)" }}>
            <div className="comp-header">
              <h2>&lt;Tabs&gt;</h2>
              <span className="comp-badge">Interactive</span>
            </div>
            <div className="comp-desc">
              Group content into switchable panels. Great for multi-language
              code examples, platform-specific instructions, or API version
              comparisons.
            </div>
            <div className="comp-preview">
              <div className="tabs" id="tabs-demo">
                <div className="tab-bar">
                  <button className="tab-btn active" data-tab="npm">
                    npm
                  </button>
                  <button className="tab-btn" data-tab="yarn">
                    yarn
                  </button>
                  <button className="tab-btn" data-tab="pnpm">
                    pnpm
                  </button>
                </div>
                <div className="tab-panel active" data-panel="npm">
                  <h3>npm</h3>
                  <p>
                    Install Versio with npm, the default package manager for
                    Node.js.
                  </p>
                  <pre>npm create versio@latest my-docs</pre>
                </div>
                <div className="tab-panel" data-panel="yarn">
                  <h3>yarn</h3>
                  <p>
                    Using Yarn? The same scaffolding command works with any
                    package manager.
                  </p>
                  <pre>yarn create versio my-docs</pre>
                </div>
                <div className="tab-panel" data-panel="pnpm">
                  <h3>pnpm</h3>
                  <p>
                    Fast and disk-efficient. pnpm users can scaffold a site in
                    under 2 seconds.
                  </p>
                  <pre>pnpm create versio my-docs</pre>
                </div>
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="cm">&lt;!-- Tabs usage in MDX --&gt;</span>\n&lt;<span class="tag">Tabs</span>&gt;\n  &lt;<span class="tag">Tab</span> <span class="prop">label</span>=<span class="str">"npm"</span>&gt;\n    npm create versio@latest my-docs\n  &lt;/<span class="tag">Tab</span>&gt;\n  &lt;<span class="tag">Tab</span> <span class="prop">label</span>=<span class="str">"yarn"</span>&gt;\n    yarn create versio my-docs\n  &lt;/<span class="tag">Tab</span>&gt;\n  &lt;<span class="tag">Tab</span> <span class="prop">label</span>=<span class="str">"pnpm"</span>&gt;\n    pnpm create versio my-docs\n  &lt;/<span class="tag">Tab</span>&gt;\n&lt;/<span class="tag">Tabs</span>&gt;`,
                }}
              />
            </div>
          </div>

          <div className="component-card" style={{ padding: "var(--space-7)" }}>
            <div className="comp-header">
              <h2>&lt;Alert&gt; / &lt;Callout&gt;</h2>
              <span className="comp-badge">Content</span>
            </div>
            <div className="comp-desc">
              Highlight important information with contextual callouts. Four
              severity levels: info, success, warning, error.
            </div>
            <div
              className="comp-preview"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              <div className="alert alert-info">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <div>
                  <strong>Note:</strong> Versio requires Node.js 18 or later.
                  Check your version with <code>node --version</code>.
                </div>
              </div>
              <div className="alert alert-success">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <div>
                  <strong>Done!</strong> Your documentation site is running at{" "}
                  <code>http://localhost:3000</code>.
                </div>
              </div>
              <div className="alert alert-warning">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <strong>Port conflict:</strong> Port 3000 is already in use.
                  Set <code>PORT=3001</code> to use a different port.
                </div>
              </div>
              <div className="alert alert-error">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <div>
                  <strong>Missing config:</strong> No{" "}
                  <code>versio.config.ts</code> found. Run{" "}
                  <code>npx versio init</code> to create one.
                </div>
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `&lt;<span class="tag">Alert</span> <span class="prop">type</span>=<span class="str">"info"</span>&gt;\n  Versio requires Node.js 18 or later.\n&lt;/<span class="tag">Alert</span>&gt;\n\n&lt;<span class="tag">Alert</span> <span class="prop">type</span>=<span class="str">"warning"</span>&gt;\n  Port 3000 is already in use.\n&lt;/<span class="tag">Alert</span>&gt;`,
                }}
              />
            </div>
          </div>

          <div className="component-card" style={{ padding: "var(--space-7)" }}>
            <div className="comp-header">
              <h2>&lt;APITable&gt;</h2>
              <span className="comp-badge">Data</span>
            </div>
            <div className="comp-desc">
              Document function signatures, configuration options, and component
              props with a structured table. Supports types, defaults, and
              required indicators.
            </div>
            <div className="comp-preview" style={{ overflow: "auto" }}>
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
                    {
                      name: "title",
                      type: "string",
                      default: "—",
                      desc: "Page title used in the browser tab and search results.",
                    },
                    {
                      name: "description",
                      type: "string",
                      default: "—",
                      desc: "Meta description for SEO and social previews.",
                    },
                    {
                      name: "version",
                      type: "string | string[]",
                      default: '"*"',
                      desc: "Version range this page belongs to (e.g. <code>&gt;=2.0</code>).",
                    },
                    {
                      name: "sidebar",
                      type: "boolean",
                      default: "true",
                      desc: "Show or hide this page from the sidebar navigation.",
                    },
                    {
                      name: "searchBoost",
                      type: "number",
                      default: "1.0",
                      desc: "Boost this page search ranking relative to others.",
                    },
                  ].map((row) => (
                    <tr key={row.name}>
                      <td>
                        <code>{row.name}</code>
                      </td>
                      <td>
                        <code style={{ color: "var(--accent)" }}>
                          {row.type}
                        </code>
                      </td>
                      <td>
                        <code>{row.default}</code>
                      </td>
                      <td dangerouslySetInnerHTML={{ __html: row.desc }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `&lt;<span class="tag">APITable</span>\n  <span class="prop">data</span>={<span class="fn">props</span>}\n  <span class="prop">columns</span>={[<span class="str">"Prop"</span>, <span class="str">"Type"</span>, <span class="str">"Default"</span>, <span class="str">"Description"</span>]}\n/&gt;`,
                }}
              />
            </div>
          </div>

          <div className="component-card" style={{ padding: "var(--space-7)" }}>
            <div className="comp-header">
              <h2>&lt;Steps&gt;</h2>
              <span className="comp-badge">Layout</span>
            </div>
            <div className="comp-desc">
              Numbered step-by-step instructions with automatic numbering.
              Perfect for tutorials, setup guides, and walkthroughs.
            </div>
            <div className="comp-preview">
              <div className="steps">
                {[
                  {
                    num: "1",
                    title: "Create a project",
                    desc: "Run <code>npm create versio@latest my-docs</code> to scaffold a new documentation site with sensible defaults.",
                  },
                  {
                    num: "2",
                    title: "Write content",
                    desc: "Add Markdown or MDX files to the <code>docs/</code> directory. Frontmatter controls metadata, versioning, and sidebar placement.",
                  },
                  {
                    num: "3",
                    title: "Customise the theme",
                    desc: "Edit <code>versio.config.ts</code> to override colors, typography, and layout. Changes hot-reload in development.",
                  },
                  {
                    num: "4",
                    title: "Deploy",
                    desc: "Run <code>npm run build</code> and deploy the <code>dist/</code> folder to Vercel, Netlify, or any static host.",
                  },
                ].map((s) => (
                  <div key={s.num} className="step">
                    <div className="step-num">{s.num}</div>
                    <div className="step-content">
                      <h4>{s.title}</h4>
                      <p dangerouslySetInnerHTML={{ __html: s.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `&lt;<span class="tag">Steps</span>&gt;\n  &lt;<span class="tag">Step</span> <span class="prop">title</span>=<span class="str">"Create a project"</span>&gt;\n    Run \`npm create versio@latest\` to scaffold a site.\n  &lt;/<span class="tag">Step</span>&gt;\n  &lt;<span class="tag">Step</span> <span class="prop">title</span>=<span class="str">"Write content"</span>&gt;\n    Add Markdown files to the \`docs/\` directory.\n  &lt;/<span class="tag">Step</span>&gt;\n&lt;/<span class="tag">Steps</span>&gt;`,
                }}
              />
            </div>
          </div>

          <div className="component-card" style={{ padding: "var(--space-7)" }}>
            <div className="comp-header">
              <h2>&lt;Accordion&gt;</h2>
              <span className="comp-badge">Interactive</span>
            </div>
            <div className="comp-desc">
              Collapsible sections for FAQs, detailed explanations, and
              reference material. Multiple items can be open simultaneously.
            </div>
            <div className="comp-preview">
              <div className="accordion">
                <div className="accordion-item">
                  <button className="accordion-trigger open">
                    What is Versio?
                  </button>
                  <div className="accordion-content open">
                    Versio is a documentation framework that turns Markdown into
                    fast, searchable documentation sites. It handles search
                    indexing, version routing, theme compilation, and MDX
                    component rendering out of the box.
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-trigger">
                    Do I need a database?
                  </button>
                  <div className="accordion-content">
                    No. Versio compiles your Markdown into a static site. No
                    database, no server runtime. Deploy the output to any static
                    host: Vercel, Netlify, Cloudflare Pages, or a simple S3
                    bucket.
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-trigger">
                    Can I use my own domain?
                  </button>
                  <div className="accordion-content">
                    Yes. Since Versio generates static files, you can point any
                    custom domain at the output. Configure your DNS and set the
                    domain in your deployment platform, no Versio-specific setup
                    needed.
                  </div>
                </div>
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `&lt;<span class="tag">Accordion</span>&gt;\n  &lt;<span class="tag">AccordionItem</span> <span class="prop">title</span>=<span class="str">"What is Versio?"</span>&gt;\n    Versio is a documentation framework...\n  &lt;/<span class="tag">AccordionItem</span>&gt;\n  &lt;<span class="tag">AccordionItem</span> <span class="prop">title</span>=<span class="str">"Do I need a database?"</span>&gt;\n    No. Versio compiles to a static site.\n  &lt;/<span class="tag">AccordionItem</span>&gt;\n&lt;/<span class="tag">Accordion</span>&gt;`,
                }}
              />
            </div>
          </div>

          <div className="component-card" style={{ padding: "var(--space-7)" }}>
            <div className="comp-header">
              <h2>&lt;Comparison&gt;</h2>
              <span className="comp-badge">Data</span>
            </div>
            <div className="comp-desc">
              Side-by-side feature comparisons, before/after diagrams, and
              architecture breakdowns. Renders as a two-column grid with labeled
              lists.
            </div>
            <div className="comp-preview">
              <div className="comparison-grid">
                <div className="comparison-card">
                  <h4>Without Versio</h4>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      marginTop: "12px",
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--muted)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ color: "var(--muted-more)", flexShrink: 0 }}
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Manual search setup
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--muted)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ color: "var(--muted-more)", flexShrink: 0 }}
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Duplicated files per version
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--muted)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ color: "var(--muted-more)", flexShrink: 0 }}
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      CSS conflicts from custom themes
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--muted)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ color: "var(--muted-more)", flexShrink: 0 }}
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Manual TOC generation
                    </li>
                  </ul>
                </div>
                <div className="comparison-card">
                  <h4>With Versio</h4>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      marginTop: "12px",
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--fg-secondary)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ color: "var(--accent)", flexShrink: 0 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Built-in search, zero config
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--fg-secondary)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ color: "var(--accent)", flexShrink: 0 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Versioned content graph
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--fg-secondary)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ color: "var(--accent)", flexShrink: 0 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Cascading theme engine
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--fg-secondary)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ color: "var(--accent)", flexShrink: 0 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Auto TOC generation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="comp-code">
              <button className="comp-code-toggle">Show code</button>
              <pre
                dangerouslySetInnerHTML={{
                  __html: `&lt;<span class="tag">Comparison</span>&gt;\n  &lt;<span class="tag">Column</span> <span class="prop">title</span>=<span class="str">"Without Versio"</span>&gt;\n    - Manual search setup\n    - Duplicated files per version\n  &lt;/<span class="tag">Column</span>&gt;\n  &lt;<span class="tag">Column</span> <span class="prop">title</span>=<span class="str">"With Versio"</span>&gt;\n    - Built-in search, zero config\n    - Versioned content graph\n  &lt;/<span class="tag">Column</span>&gt;\n&lt;/<span class="tag">Comparison</span>&gt;`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
                <span>versio</span>
              </div>
              <p>
                Versioned documentation framework for developer tools. Open
                source, MIT licensed.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="GitHub">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a href="#" aria-label="Discord">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="/docs">Documentation</a>
                </li>
                <li>
                  <a href="/components">Components</a>
                </li>
                <li>
                  <a href="/pricing">Pricing</a>
                </li>
                <li>
                  <a href="#">Changelog</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Migration guide</a>
                </li>
                <li>
                  <a href="#">Templates</a>
                </li>
                <li>
                  <a href="#">Examples</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">GitHub</a>
                </li>
                <li>
                  <a href="#">Discord</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Status</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} Versio Labs, Inc. &bull; MIT
              Licensed
            </span>
            <div className="flex gap-5">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
