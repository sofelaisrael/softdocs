import type { SoftDocsConfig } from './config'

export function buildThemeVars(config: SoftDocsConfig): string {
  const accent = config.theme?.accent ?? '#2563eb'
  return `
:root {
  --color-accent: ${accent};
}
`
}
