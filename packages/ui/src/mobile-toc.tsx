'use client'

import { useState } from 'react'

interface MobileTocProps {
  headings: { depth: number; text: string; id: string }[]
}

export function MobileTocDropdown({ headings }: MobileTocProps) {
  const [open, setOpen] = useState(false)

  const filtered = headings.filter((h) => h.depth <= 3)
  if (filtered.length === 0) return null

  return (
    <div className="mobile-toc" data-open={open}>
      <button className="mobile-toc-trigger" onClick={() => setOpen(!open)}>
        <span className="mobile-toc-label">On this page</span>
        <svg
          className="mobile-toc-chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="mobile-toc-panel">
        {filtered.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`mobile-toc-item level-${h.depth}`}
            onClick={() => setOpen(false)}
          >
            {h.text}
          </a>
        ))}
      </div>
    </div>
  )
}
