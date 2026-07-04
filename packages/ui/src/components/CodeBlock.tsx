'use client'

import type { ReactNode } from 'react'

interface CodeBlockProps {
  children?: ReactNode
  className?: string
  'data-language'?: string
}

export function CodeBlock({ children, className, 'data-language': lang, ...props }: CodeBlockProps) {
  return (
    <div className="group relative my-6 rounded-xl border bg-black/90 dark:bg-black/40 overflow-hidden">
      {lang && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{lang}</span>
        </div>
      )}
      <pre className={`p-6 overflow-x-auto text-sm leading-relaxed font-mono ${className}`} {...props}>
        {children}
      </pre>
    </div>
  )
}
