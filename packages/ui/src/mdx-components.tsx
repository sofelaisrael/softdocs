'use client'

import { useState, type ReactNode } from 'react'

export function Callout({ type = 'info', children }: { type?: string; children: ReactNode }) {
  const styles = {
    info: 'bg-blue-500/5 border-blue-500/20 text-blue-900 dark:text-blue-200',
    warning: 'bg-amber-500/5 border-amber-500/20 text-amber-900 dark:text-amber-200',
    tip: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-900 dark:text-emerald-200',
    error: 'bg-red-500/5 border-red-500/20 text-red-900 dark:text-red-200',
  }[type] || 'bg-accent/5 border-accent/20 text-accent'

  const iconColors = {
    info: 'text-blue-500',
    warning: 'text-amber-500',
    tip: 'text-emerald-500',
    error: 'text-red-500',
  }[type] || 'text-accent'

  return (
    <div className={`flex gap-4 p-4 my-6 rounded-lg border ${styles}`}>
      <div className={`mt-0.5 ${iconColors}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {type === 'warning' ? (
            <>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </>
          ) : type === 'tip' ? (
            <>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </>
          ) : (
            <circle cx="12" cy="12" r="10" />
          )}
        </svg>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export function Steps({ children }: { children: ReactNode }) {
  return <div className="space-y-8 my-8">{children}</div>
}

export function Step({ children }: { children: ReactNode }) {
  return (
    <div className="relative pl-10 group">
      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full border bg-muted/50 text-[10px] font-bold text-muted-foreground group-hover:border-accent group-hover:text-accent transition-colors">
        {/* Numbering is usually handled via CSS counter or parent index, here we'll just style it */}
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export function Tabs({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0)
  const tabs: { label: string; content: ReactNode }[] = []

  const items = Array.isArray(children) ? children : [children]
  let idx = 0
  for (const item of items) {
    if (item && typeof item === 'object' && 'props' in (item as any)) {
      const el = item as any
      if (el.props?.label) {
        tabs.push({ label: el.props.label, content: el.props.children })
      } else {
        tabs.push({ label: `Tab ${++idx}`, content: el.props?.children || el })
      }
    }
  }

  return (
    <div className="my-8 rounded-xl border bg-background overflow-hidden">
      <div className="flex border-b bg-muted/20 px-2">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-3 text-xs font-medium border-b-2 transition-all ${
              i === active
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {tabs.map((tab, i) => (
          <div key={i} className={i === active ? 'block animate-in fade-in duration-300' : 'hidden'}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Tab({ label, children }: { label: string; children: ReactNode }) {
  return null
}

import { APITable } from './components/APITable'
import { CodeBlock } from './components/CodeBlock'

export const mdxComponents = {
  Callout,
  Steps,
  Step,
  Tabs,
  Tab,
  APITable,
  pre: CodeBlock,
}

export { APITable, CodeBlock }
