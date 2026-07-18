"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "@sofelaisrael/core";

interface SidebarProps {
  sections: NavSection[];
  currentVersion: string;
}

export function Sidebar({ sections, currentVersion }: SidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname.replace(/^\/docs\/[^/]+\//, "");

  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    const all = new Set(sections.map((s) => s.label));
    for (const s of sections) {
      if (s.items.some((item) => item.slug === currentSlug)) {
        all.delete(s.label);
      }
    }
    return all;
  });

  function toggleSection(key: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <aside className="doc-sidebar">
      {sections.map((section) => {
        const key = section.label;
        const isClosed = collapsed.has(key);
        const sectionHref = section.slug
          ? `/docs/${currentVersion}/${section.slug}`
          : `/docs/${currentVersion}`;
        const isSectionActive = section.slug
          ? currentSlug === section.slug ||
            currentSlug.startsWith(section.slug + "/")
          : currentSlug === "" ||
            section.items.some((item) => item.slug === currentSlug);
        return (
          <div key={key} className="sidebar-section">
            <div className="sidebar-section-header">
              <button
                className="sidebar-chevron-btn"
                onClick={() => toggleSection(key)}
                aria-label={`Toggle ${section.label}`}
              >
                <svg
                  className={`sidebar-chevron${isClosed ? " closed" : ""}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <Link
                href={sectionHref}
                className={`sidebar-section-label${isSectionActive ? " active" : ""}`}
              >
                {section.label}
              </Link>
            </div>
            <div className={`sidebar-section-items${isClosed ? "" : " open"}`}>
              {section.items.map((item) => {
                const href = `/docs/${currentVersion}/${item.slug}`;
                const isActive = currentSlug === item.slug;
                return (
                  <div key={item.slug} className="sidebar-tree-item">
                    <div className="sidebar-tree-line" />
                    <Link
                      href={href}
                      className={`sidebar-item${isActive ? " active" : ""}`}
                    >
                      {item.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
