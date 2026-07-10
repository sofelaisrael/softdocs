"use client";

import { useEffect } from "react";
import { ThemeToggle } from "@softdocs/ui";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".observe").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

      <main>
        {/* Hero */}
        <div className="paper-grid" style={{ overflow: "hidden" }}>
          <div className="container">
            <div className="hero-section" style={{ border: "none" }}>
              <div className="hero-in">
                <h1 className="animate-in">
                  Versioned docs
                  <br />
                  <span className="italic">that don&apos;t rot.</span>
                </h1>
                <p className="sub animate-in animate-delay-1">
                  Versio is a batteries-included documentation framework
                  inspired by Docusaurus &mdash; with first-class versioning,
                  MDX, search, and a component system your whole team will
                  actually use.
                </p>
                <div className="hero-actions animate-in animate-delay-2">
                  <a
                    href="#"
                    className="btn btn-primary"
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      boxShadow: "var(--shadow-lift)",
                    }}
                  >
                    Start building
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                  <a href="/components" className="btn btn-secondary">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                    Explore components
                  </a>
                </div>
                <div className="hero-features animate-in animate-delay-2">
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{" "}
                    Open source MIT
                  </span>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{" "}
                    Deploy anywhere
                  </span>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{" "}
                    1 minute setup
                  </span>
                </div>
              </div>

              {/* Code card */}
              <div className="hero-code-card animate-in animate-delay-2">
                <div className="hero-code-header">
                  <div className="hero-code-header-left">
                    <div className="hero-dots">
                      <span className="hero-dot" />
                      <span className="hero-dot" />
                      <span className="hero-dot" />
                    </div>
                    <span>versio.config.ts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px]">
                    {["3.2", "3.1", "2.8"].map((v) => (
                      <button
                        key={v}
                        className={`hero-ver-btn px-2.5 py-1 rounded-full ${v === "3.2" ? "bg-accent text-white" : "hover:bg-sand text-ink-soft"}`}
                        style={
                          v === "3.2"
                            ? { background: "var(--accent)", color: "#fff" }
                            : { color: "var(--ink-soft)" }
                        }
                        onClick={(e) => {
                          document
                            .querySelectorAll(".hero-ver-btn")
                            .forEach((b) => {
                              (b as HTMLElement).style.background = "";
                              (b as HTMLElement).style.color =
                                "var(--ink-soft)";
                            });
                          (e.target as HTMLElement).style.background =
                            "var(--accent)";
                          (e.target as HTMLElement).style.color = "#fff";
                        }}
                      >
                        v{v}
                      </button>
                    ))}
                    <span
                      className="ml-2 hidden sm:inline"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      &bull; 3 active versions
                    </span>
                  </div>
                </div>
                <div className="hero-code-body">
                  <div className="hero-code-editor">
                    <pre
                      dangerouslySetInnerHTML={{
                        __html: `<span class="comment">// versio.config.ts</span>
<span class="keyword">export default</span> <span class="fn">defineConfig</span>({
  <span class="prop">title</span>: <span class="str">&apos;Acme Docs&apos;</span>,
  <span class="prop">versions</span>: {
    <span class="str">&apos;3.2&apos;</span>: { <span class="prop">label</span>: <span class="str">&apos;Current&apos;</span>, <span class="prop">path</span>: <span class="str">&apos;/&apos;</span> },
    <span class="str">&apos;3.1&apos;</span>: { <span class="prop">label</span>: <span class="str">&apos;LTS&apos;</span> },
  },
  <span class="prop">theme</span>: {
    <span class="prop">search</span>: <span class="keyword">true</span>,
    <span class="prop">versioning</span>: <span class="str">&apos;frozen&apos;</span>
  }
})`,
                      }}
                    />
                    <div className="hero-code-info">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M6 3v12" />
                        <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path d="M15 6a9 9 0 0 0-9 9" />
                      </svg>
                      docs/version-3.2
                      <span>&bull;</span>
                      <span>Last published 2h ago</span>
                    </div>
                  </div>
                  <div className="hero-code-sidebar">
                    <div className="label">Version Diff</div>
                    <div className="diff-card added">
                      <div className="diff-title">Added in 3.2</div>
                      <div className="diff-desc">
                        Search filters, MDX partials, version banners
                      </div>
                    </div>
                    <div className="diff-card carried">
                      <div className="diff-title">Carried from 3.1</div>
                      <div className="diff-desc">
                        Sidebar autogeneration, i18n routes
                      </div>
                    </div>
                    <div className="diff-card deprecated">
                      <div className="diff-title">Deprecated</div>
                      <div className="diff-desc">Legacy YAML frontmatter</div>
                    </div>
                    <div className="note">
                      Ship breaking changes safely. Readers automatically land
                      on the version matching their SDK.
                    </div>
                  </div>
                </div>
              </div>

              {/* Trusted by */}
              <div className="trusted-row">
                <span className="trusted-label">
                  Trusted by product teams at
                </span>
                <span className="trusted-item">Northwind</span>
                <span className="trusted-item">Loomcraft</span>
                <span className="trusted-item">Basin</span>
                <span className="trusted-item">Tessellate</span>
                <span className="trusted-item">Cedar &amp; Oak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="features-section">
          <div
            className="container"
            style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
          >
            <div style={{ maxWidth: "620px", marginBottom: "3rem" }}>
              <h2 className="observe" style={{ opacity: 0 }}>
                Everything you loved about Docusaurus,
                <br className="hidden sm:block" /> a little more opinionated.
              </h2>
              <p
                className="section-subtitle observe"
                style={{ opacity: 0, marginTop: "var(--space-4)" }}
              >
                Designed for teams shipping SDKs, APIs, and developer tools with
                multiple supported versions.
              </p>
            </div>

            <div className="features-grid">
              {[
                {
                  icon: "layers",
                  title: "Versioning that clicks",
                  desc: "Pin content to versions, auto-redirect readers, show diff banners. No duplicated sidebar files.",
                },
                {
                  icon: "box",
                  title: "MDX Components included",
                  desc: "Callouts, Tabs, API cards, Steps, CodeGroups &mdash; no extra installs. Themable out of the box.",
                },
                {
                  icon: "search",
                  title: "Local, fast search",
                  desc: "FlexSearch index built at compile time. Offline, typo-tolerant, filterable by version.",
                },
                {
                  icon: "zap",
                  title: "Absurdly fast builds",
                  desc: "Vite + esbuild, partial hydration. 400 pages in under 2.1s on CI.",
                },
                {
                  icon: "file-text",
                  title: "Write in Markdown",
                  desc: "Familiar authoring with front-matter validation, link checking, and live reload.",
                },
                {
                  icon: "globe",
                  title: "i18n & API reference",
                  desc: "Crowdin-ready translations, OpenAPI renderer, and auto versioned changelogs.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="feature-card observe"
                  style={{ opacity: 0 }}
                >
                  <div className="feature-icon">
                    {f.icon === "layers" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    )}
                    {f.icon === "box" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    )}
                    {f.icon === "search" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                    )}
                    {f.icon === "zap" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )}
                    {f.icon === "file-text" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    )}
                    {f.icon === "globe" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                  </div>
                  <h3>{f.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: f.desc }} />
                </div>
              ))}
            </div>

            {/* Quick start strip */}
            <div className="quickstart-strip">
              <div>
                <div className="quickstart-label">Quick start</div>
                <div className="quickstart-cmd">
                  npx create-versio@latest my-docs
                </div>
              </div>
              <div className="quickstart-actions">
                <button
                  className="copy-btn btn btn-secondary"
                  style={{
                    fontSize: "13px",
                    borderRadius: "var(--radius-full)",
                    padding: "8px 14px",
                    height: "auto",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "npx create-versio@latest my-docs",
                    );
                  }}
                >
                  Copy
                </button>
                <a
                  href="/docs"
                  style={{
                    fontSize: "13.5px",
                    color: "var(--accent)",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Read the installation guide{" "}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA band */}
        <div className="cta-band">
          <div className="container">
            <div className="cta-card">
              <div className="cta-card-glow" />
              <div className="cta-card-content">
                <h3>Ship docs your users will actually finish reading.</h3>
                <p>
                  Start free. Migrate from Docusaurus in an afternoon. Keep your
                  markdown.
                </p>
                <div className="cta-card-actions">
                  <a
                    href="/docs"
                    className="btn btn-primary"
                    style={{
                      background: "#f4ede2",
                      color: "#1c1b19",
                      boxShadow: "none",
                    }}
                  >
                    Install Versio
                  </a>
                  <a
                    href="/pricing"
                    className="btn btn-secondary"
                    style={{
                      borderColor: "rgba(255,255,255,0.25)",
                      color: "#ebe6dd",
                    }}
                  >
                    See pricing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
