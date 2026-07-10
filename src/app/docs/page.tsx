import { buildNavTree } from "@softdocs/core";
import { CopyButtonHydrator, Sidebar, Search } from "@softdocs/ui";
import Link from "next/link";
import path from "path";
import config from "@/softdocs.config";

const DOCS_DIR = path.resolve(process.cwd(), "docs");
const defaultVersion = config.versions.default;

export default function DocsOverview() {
  const nav = buildNavTree(DOCS_DIR);

  return (
    <div className="doc-layout" style={{ minHeight: "100vh" }}>
      <Sidebar sections={nav} currentVersion={defaultVersion} />

      <main className="doc-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            marginBottom: "var(--space-6)",
          }}
        >
          <h1 style={{ marginBottom: 0 }}>Documentation</h1>
          <Search
            currentVersion={defaultVersion}
            appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ""}
            searchApiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ""}
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? ""}
          />
        </div>

        <p>
          SoftDocs transforms your Markdown into fast, searchable documentation
          sites. Browse the docs using the sidebar or start with one of the
          guides below.
        </p>

        <h2 id="getting-started">Getting Started</h2>
        <p>
          New to SoftDocs? Head over to the{" "}
          <Link href={`/docs/${defaultVersion}/getting-started`}>
            Getting Started guide
          </Link>{" "}
          to set up your first documentation site.
        </p>

        <CopyButtonHydrator />

        <nav className="doc-pagination">
          <span />
          <Link
            href={`/docs/${defaultVersion}/getting-started`}
            className="doc-pagination-link doc-pagination-next"
          >
            <span className="doc-pagination-label">Next</span>
            <span className="doc-pagination-title">Getting Started</span>
          </Link>
        </nav>

        <div className="doc-footer">
          <span>&copy; {new Date().getFullYear()} SoftDocs</span>
          <span>
            Found an error? <a href="#">Edit this page</a>
          </span>
        </div>
      </main>

      <aside className="doc-toc">
        <div className="toc-label">On this page</div>
        <a href="#getting-started" className="toc-item level-2">
          Getting Started
        </a>
      </aside>
    </div>
  );
}
