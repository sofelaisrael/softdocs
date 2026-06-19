'use client'

import { useEffect } from 'react'

export function CopyButtonHydrator() {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      '.copy-btn[data-code]'
    )
    const handlers: (() => void)[] = []

    for (const btn of buttons) {
      const handler = () => {
        const code = btn.getAttribute('data-code') || ''
        navigator.clipboard.writeText(code)
        const orig = btn.textContent || 'Copy'
        btn.textContent = 'Copied!'
        btn.style.borderColor = 'var(--accent)'
        btn.style.color = 'var(--accent)'
        setTimeout(() => {
          btn.textContent = orig
          btn.style.borderColor = ''
          btn.style.color = ''
        }, 2000)
      }
      btn.addEventListener('click', handler)
      handlers.push(() => btn.removeEventListener('click', handler))
    }

    return () => {
      handlers.forEach((cleanup) => cleanup())
    }
  }, [])

  return null
}
