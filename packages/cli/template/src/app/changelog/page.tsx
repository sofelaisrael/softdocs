import type { CSSProperties } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const entries = [
  {
    version: "3.2",
    date: "June 2026",
    tag: "Latest",
    changes: [
      { type: "added", text: "Search filters with Algolia integration" },
      { type: "added", text: "MDX partials for reusable content blocks" },
      { type: "added", text: "Version banners for deprecated docs" },
      { type: "improved", text: "Sidebar auto-generation from filesystem" },
      { type: "improved", text: "Code copy button with hydration support" },
    ],
  },
  {
    version: "3.1",
    date: "March 2026",
    tag: "LTS",
    changes: [
      { type: "added", text: "i18n routing support" },
      { type: "added", text: "Component library showcase" },
      { type: "improved", text: "Theme builder with CSS custom properties" },
      { type: "fixed", text: "Version resolver semver range parsing" },
    ],
  },
  {
    version: "3.0",
    date: "January 2026",
    tag: null,
    changes: [
      { type: "added", text: "Frontmatter-based versioning system" },
      { type: "added", text: "Scroll-spy table of contents" },
      { type: "added", text: "Mobile-responsive sidebar" },
      { type: "improved", text: "Dark mode with system preference detection" },
      { type: "removed", text: "Legacy YAML frontmatter support" },
    ],
  },
  {
    version: "2.0",
    date: "October 2025",
    tag: null,
    changes: [
      { type: "added", text: "MDX rendering with Shiki syntax highlighting" },
      { type: "added", text: "Version picker dropdown" },
      { type: "improved", text: "Navigation tree from filesystem structure" },
    ],
  },
  {
    version: "1.0",
    date: "July 2025",
    tag: null,
    changes: [
      { type: "added", text: "Initial release" },
      { type: "added", text: "Markdown documentation rendering" },
      { type: "added", text: "Dark/light theme toggle" },
    ],
  },
];

const tagColors: Record<string, CSSProperties> = {
  Latest: { background: "var(--accent)", color: "#fff" },
  LTS: { background: "rgba(16,185,129,0.1)", color: "#059669" },
};

const typeColors: Record<string, CSSProperties> = {
  added: { background: "rgba(59,130,246,0.1)", color: "#2563eb" },
  improved: { background: "rgba(16,185,129,0.1)", color: "#059669" },
  fixed: { background: "rgba(217,119,6,0.1)", color: "#b45309" },
  removed: { background: "rgba(239,68,68,0.1)", color: "#dc2626" },
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 4vw, 48px)",
              marginBottom: "var(--space-3)",
            }}
          >
            Changelog
          </h1>
          <p
            style={{
              color: "var(--ink-soft)",
              fontSize: 17,
              marginBottom: "var(--space-8)",
            }}
          >
            New features, improvements, and fixes shipped to Versio.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-8)",
            }}
          >
            {entries.map((entry) => (
              <article
                key={entry.version}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "var(--space-6)",
                  background: "var(--paper-elev)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      margin: 0,
                    }}
                  >
                    v{entry.version}
                  </h2>
                  {entry.tag && (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: "var(--radius-full)",
                        ...tagColors[entry.tag],
                      }}
                    >
                      {entry.tag}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--ink-faint)",
                      marginLeft: "auto",
                    }}
                  >
                    {entry.date}
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                  }}
                >
                  {entry.changes.map((change, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: 14.5,
                        color: "var(--ink-soft)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: 4,
                          ...typeColors[change.type],
                        }}
                      >
                        {change.type}
                      </span>
                      {change.text}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
