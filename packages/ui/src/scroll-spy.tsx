'use client'

import { useEffect, useState } from 'react'
import type { NavItem } from '@softdocs/core'

interface ScrollSpyTocProps {
  headings: { depth: number; text: string; id: string }[]
}

export function ScrollSpyToc({ headings }: ScrollSpyTocProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const visible = headings
      .filter((h) => h.depth <= 3)
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    if (visible.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    )

    for (const el of visible) observer.observe(el)

    return () => observer.disconnect()
  }, [headings])

  return (
    <aside className="doc-toc">
      <div className="toc-label">On this page</div>
      {headings
        .filter((h) => h.depth <= 3)
        .map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`toc-item level-${h.depth}${activeId === h.id ? ' active' : ''}`}
          >
            {h.text}
          </a>
        ))}
    </aside>
  )
}
