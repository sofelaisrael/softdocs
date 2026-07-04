'use client'

import { useEffect, useState } from 'react'

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

  const filteredHeadings = headings.filter((h) => h.depth <= 3)
  if (filteredHeadings.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">On this page</div>
      <nav className="space-y-1 border-l">
        {filteredHeadings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block py-1 pr-4 text-xs transition-all border-l -ml-px ${
              activeId === h.id
                ? 'border-accent text-accent font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            } ${
              h.depth === 2 ? 'pl-4' : h.depth === 3 ? 'pl-8' : 'pl-4'
            }`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
