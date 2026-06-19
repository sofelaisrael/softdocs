'use client'

import type { ReactNode } from 'react'

interface CodeBlockProps {
  children?: ReactNode
  className?: string
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <pre className={className} {...props}>
      {children}
    </pre>
  )
}
