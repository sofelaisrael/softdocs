"use client";

import { useEffect, useState } from "react";

interface ScrollSpyTocProps {
  headings: { depth: number; text: string; id: string }[];
}

export function ScrollSpyToc({ headings }: ScrollSpyTocProps) {
  const filtered = headings.filter((h) => h.depth <= 3);
  const [activeId, setActiveId] = useState<string>(filtered[0]?.id ?? "");

  useEffect(() => {
    const elements = filtered
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    function onScroll() {
      const offset = 200;
      let current = elements[0]?.id ?? "";

      for (let i = 0; i < elements.length; i++) {
        const rect = elements[i].getBoundingClientRect();
        if (rect.top <= offset) {
          current = elements[i].id;
        }
      }

      setActiveId(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [headings, filtered]);

  return (
    <aside className="doc-toc">
      <div className="toc-label">On this page</div>
      {filtered.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`toc-item level-${h.depth}${activeId === h.id ? " active" : ""}`}
        >
          {h.text}
        </a>
      ))}
    </aside>
  );
}
