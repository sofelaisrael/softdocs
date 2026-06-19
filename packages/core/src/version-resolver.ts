import semver from 'semver'

export function resolveVersions(
  ranges: string[] | undefined,
  allVersions: string[]
): string[] {
  if (!ranges || ranges.length === 0) return allVersions

  return allVersions.filter((version) =>
    ranges.some((range) => {
      const v = semver.coerce(version)
      if (!v) return false
      try {
        return semver.satisfies(v, range)
      } catch {
        return false
      }
    })
  )
}
