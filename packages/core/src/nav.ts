import fs from "fs";
import path from "path";

export interface NavItem {
  title: string;
  slug: string;
}

export interface NavSection {
  label: string;
  slug: string;
  items: NavItem[];
}

export function buildNavTree(docsDir: string): NavSection[] {
  if (!fs.existsSync(docsDir)) return [];
  const sections: NavSection[] = [];

  const entries = fs.readdirSync(docsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const items = getDirItems(path.join(docsDir, entry.name), entry.name);
      if (items.length > 0) {
        sections.push({
          label: entry.name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          slug: entry.name,
          items,
        });
      } else {
        const indexPath = path.join(docsDir, entry.name, "index.mdx");
        if (fs.existsSync(indexPath)) {
          let sec = sections.find((s) => s.label === "General");
          if (!sec) {
            sec = { label: "General", slug: "", items: [] };
            sections.push(sec);
          }
          sec.items.push({
            title: entry.name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            slug: entry.name,
          });
        }
      }
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      const name = entry.name.replace(/\.mdx?$/, "");
      if (name === "index") continue;
      let sec = sections.find((s) => s.label === "General");
      if (!sec) {
        sec = { label: "General", slug: "", items: [] };
        sections.push(sec);
      }
      sec.items.push({
        title: name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        slug: name,
      });
    }
  }

  return sections;
}

export function getAdjacentDocs(
  sections: NavSection[],
  docsDir: string,
  currentSlug: string,
): { prev: NavItem | null; next: NavItem | null } {
  const flat: NavItem[] = [];
  for (const section of sections) {
    if (
      section.slug &&
      fs.existsSync(path.join(docsDir, section.slug, "index.mdx"))
    ) {
      flat.push({
        title: section.label,
        slug: section.slug,
      });
    } else if (
      !section.slug &&
      fs.existsSync(path.join(docsDir, "index.mdx"))
    ) {
      flat.push({ title: "Overview", slug: "" });
    }
    flat.push(...section.items);
  }
  const idx = flat.findIndex((item) => item.slug === currentSlug);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

function getDirItems(dir: string, prefix: string): NavItem[] {
  const items: NavItem[] = [];
  if (!fs.existsSync(dir)) return items;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      const name = entry.name.replace(/\.mdx?$/, "");
      if (name === "index") continue;
      items.push({
        title: name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        slug: `${prefix}/${name}`,
      });
    }
  }
  return items;
}
