'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavSection } from '@softdocs/core'

interface SidebarProps {
  sections: NavSection[]
  currentVersion: string
}

export function Sidebar({ sections, currentVersion }: SidebarProps) {
  const pathname = usePathname()
  const currentSlug = pathname.replace(/^\/docs\/[^/]+\//, '')

  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    const all = new Set(sections.map((s) => s.label))
    for (const s of sections) {
      if (s.items.some((item) => item.slug === currentSlug)) {
        all.delete(s.label)
      }
    }
    return all
  })

  function toggleSection(key: string) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background/50 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto hidden lg:block">
      <div className="p-6 space-y-8">
        {sections.map((section) => {
          const key = section.label
          const isClosed = collapsed.has(key)
          const sectionHref = section.slug
            ? `/docs/${currentVersion}/${section.slug}`
            : `/docs/${currentVersion}`
          const isSectionActive = section.slug
            ? currentSlug === section.slug || currentSlug.startsWith(section.slug + '/')
            : currentSlug === '' || section.items.some((item) => item.slug === currentSlug)

          return (
            <div key={key} className="space-y-3">
              <div className="flex items-center group">
                <button
                  className="p-1 -ml-1 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => toggleSection(key)}
                  aria-label={`Toggle ${section.label}`}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isClosed ? '-rotate-90' : ''}`}
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
                  className={`text-sm font-bold tracking-tight px-2 py-1 rounded-md transition-colors ${isSectionActive ? 'text-accent bg-accent/5' : 'text-foreground hover:bg-muted/50'}`}
                >
                  {section.label}
                </Link>
              </div>

              {!isClosed && (
                <div className="space-y-1 ml-4 border-l pl-4">
                  {section.items.map((item) => {
                    const href = `/docs/${currentVersion}/${item.slug}`
                    const isActive = currentSlug === item.slug
                    return (
                      <Link
                        key={item.slug}
                        href={href}
                        className={`block py-1.5 px-3 text-sm rounded-md transition-all ${isActive ? 'text-accent font-medium bg-accent/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'}`}
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
