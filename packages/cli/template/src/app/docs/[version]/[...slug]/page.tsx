import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  buildContentIndex,
  resolveDocPath,
  parseDocFile,
  buildNavTree,
  getAdjacentDocs,
  rehypeCodeButton,
} from "@versio/core";
import type { NavItem, NavSection } from "@versio/core";
import {
  CopyButtonHydrator,
  ScrollSpyToc,
  Sidebar,
  MobileTocDropdown,
  mdxComponents,
  VersionPicker,
  Search,
} from "@versio/ui";
import Link from "next/link";
import path from "path";
import config from "@/versio.config";

const DOCS_DIR = path.resolve(process.cwd(), "docs");

interface Props {
  params: Promise<{ version: string; slug: string[] }>;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getBreadcrumbs(
  nav: NavSection[],
  slug: string,
  version: string,
): { label: string; href?: string }[] {
  for (const section of nav) {
    for (const item of section.items) {
      if (item.slug === slug) {
        const sectionHref = section.slug
          ? `/docs/${version}/${section.slug}`
          : undefined;
        return [
          { label: "Docs", href: "/docs" },
          { label: section.label, href: sectionHref },
          { label: item.title },
        ];
      }
    }
  }
  return [{ label: "Docs", href: "/docs" }];
}

export async function generateStaticParams() {
  const index = await buildContentIndex(DOCS_DIR, config.versions.all);
  const params: { version: string; slug: string[] }[] = [];
  for (const [version, docs] of index.byVersion) {
    for (const doc of docs) {
      params.push({ version, slug: doc.slug });
    }
  }
  return params;
}

export default async function DocPage({ params }: Props) {
  const { version, slug } = await params;
  const slugStr = slug.join("/");

  if (!config.versions.all.includes(version)) {
    notFound();
  }

  let docPath: string;
  try {
    docPath = resolveDocPath(DOCS_DIR, slugStr);
  } catch {
    notFound();
  }

  const doc = await parseDocFile(slugStr, docPath);

  const index = await buildContentIndex(DOCS_DIR, config.versions.all);
  const docNode = index.bySlug.get(slugStr);
  if (docNode && !docNode.versions.includes(version)) {
    notFound();
  }

  const nav = buildNavTree(DOCS_DIR);
  const { prev, next } = getAdjacentDocs(nav, DOCS_DIR, slugStr);

  const crumbs = getBreadcrumbs(nav, slugStr, version);

  const rehypeShiki = (await import("@shikijs/rehype")).default;
  const rehypeSlug = (await import("rehype-slug")).default;
  const remarkGfm = (await import("remark-gfm")).default;

  function rehypeStripFirstH1() {
    return (tree: { children: Array<{ type: string; tagName: string }> }) => {
      const idx = tree.children.findIndex(
        (c) => c.type === "element" && c.tagName === "h1",
      );
      if (idx !== -1) tree.children.splice(idx, 1);
    };
  }

  const { content } = await compileMDX({
    source: doc.raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeStripFirstH1,
          rehypeSlug,
          [
            rehypeShiki,
            { themes: { light: "github-light", dark: "github-dark" } },
          ],
          rehypeCodeButton,
        ],
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components: mdxComponents as any,
  });

  const versionIndex: Record<string, string[]> = {};
  for (const [v, docs] of index.byVersion) {
    versionIndex[v] = docs.map((d) => d.slug.join("/"));
  }

  return (
    <>
      <div className="doc-layout">
        <Sidebar sections={nav} currentVersion={version} />

        <main className="doc-content">
          <div className="doc-search-bar">
            <Search
              currentVersion={version}
              appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ""}
              searchApiKey={
                process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ""
              }
              indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? ""}
            />
          </div>

          <MobileTocDropdown headings={doc.headings} />

          <nav className="doc-breadcrumbs">
            {crumbs.map((c, i) => (
              <span key={i} className="doc-breadcrumb-item">
                {i > 0 && <span className="doc-breadcrumb-sep">/</span>}
                {c.href ? (
                  <Link href={c.href}>{c.label}</Link>
                ) : (
                  <span>{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="doc-header">
            <div className="doc-header-title">
              <h1 id={slugStr}>{doc.title}</h1>
              <VersionPicker
                versions={config.versions.all}
                currentVersion={version}
                currentSlug={slugStr}
                versionIndex={versionIndex}
              />
            </div>
            {doc.description && <p className="doc-meta">{doc.description}</p>}
          </div>

          {content}

          <CopyButtonHydrator />

          <DocPagination prev={prev} next={next} version={version} />

          <div className="doc-footer">
            <div className="doc-footer-left">
              <span>Last updated {formatDate(doc.lastModified)}</span>
            </div>
            <a
              href={`https://github.com/versio/versio/edit/main/docs/${slugStr}.mdx`}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-footer-edit"
            >
              Edit on GitHub
            </a>
          </div>
        </main>

        <ScrollSpyToc headings={doc.headings} />
      </div>
    </>
  );
}

function DocPagination({
  prev,
  next,
  version,
}: {
  prev: NavItem | null;
  next: NavItem | null;
  version: string;
}) {
  return (
    <nav className="doc-pagination">
      {prev ? (
        <Link
          href={`/docs/${version}/${prev.slug}`}
          className="doc-pagination-link doc-pagination-prev"
        >
          <span className="doc-pagination-label">Previous</span>
          <span className="doc-pagination-title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/docs/${version}/${next.slug}`}
          className="doc-pagination-link doc-pagination-next"
        >
          <span className="doc-pagination-label">Next</span>
          <span className="doc-pagination-title">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
