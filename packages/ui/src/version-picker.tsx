'use client'

import { useRouter } from 'next/navigation'

interface VersionPickerProps {
  versions: string[]
  currentVersion: string
  currentSlug: string
  versionIndex: Record<string, string[]>
}

export function VersionPicker({ versions, currentVersion, currentSlug, versionIndex }: VersionPickerProps) {
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const target = e.target.value
    if (target === currentVersion) return

    const targetSlugs = versionIndex[target]
    if (targetSlugs && targetSlugs.includes(currentSlug)) {
      router.push(`/docs/${target}/${currentSlug}`)
    } else {
      router.push(`/docs/${target}`)
    }
  }

  return (
    <div className="relative">
      <select
        value={currentVersion}
        onChange={handleChange}
        className="appearance-none bg-surface border rounded-md px-3 py-1.5 pr-8 text-xs font-bold text-accent hover:border-accent transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent"
        aria-label="Select version"
      >
        {versions.map((v) => (
          <option key={v} value={v}>
            v{v}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-accent">
        <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  )
}
