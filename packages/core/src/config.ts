import { z } from 'zod'

export const SoftDocsConfigSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  // Phase 3 — frontmatter field stub
  // deprecated_in: z.string().optional(),
  theme: z
    .object({
      accent: z.string().optional(),
    })
    .optional(),
  versions: z.object({
    all: z.array(z.string()),
    default: z.string(),
    latest: z.string(),
  }),
  search: z
    .object({
      provider: z.literal('algolia'),
      appId: z.string(),
      apiKey: z.string(),
      indexName: z.string(),
    })
    .optional(),
})

export type SoftDocsConfig = z.infer<typeof SoftDocsConfigSchema>

export function defineConfig(config: SoftDocsConfig): SoftDocsConfig {
  const result = SoftDocsConfigSchema.safeParse(config)
  if (!result.success) {
    const issues = result.error.issues.map(
      (i) => `  ${i.path.join('.')}: ${i.message}`
    )
    throw new Error(`Invalid softdocs config:\n${issues.join('\n')}`)
  }
  return result.data
}

let _config: SoftDocsConfig | null = null

export function setConfig(config: SoftDocsConfig) {
  _config = SoftDocsConfigSchema.parse(config)
}

export function getConfig(): SoftDocsConfig {
  if (!_config) throw new Error('Config not loaded. Call setConfig() first.')
  return _config
}

export function loadConfigFromFile(filePath: string): SoftDocsConfig {
  const mod = require(filePath)
  const cfg = mod.default || mod
  if (typeof cfg === 'function') return cfg()
  return cfg
}
