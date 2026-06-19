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
    <select
      value={currentVersion}
      onChange={handleChange}
      className="version-picker"
      aria-label="Select version"
    >
      {versions.map((v) => (
        <option key={v} value={v}>
          v{v}
        </option>
      ))}
    </select>
  )
}
