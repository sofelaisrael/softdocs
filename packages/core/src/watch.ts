import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'

export type WatchEvent = 'add' | 'change' | 'unlink'

export interface DocChange {
  event: WatchEvent
  slug: string
  filePath: string
}

export function watchDocs(
  docsDir: string,
  onChange: (change: DocChange) => void
): { close: () => void } {
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true })
  }

  const watcher = chokidar.watch(
    path.join(docsDir, '**/*.{md,mdx}'),
    {
      ignoreInitial: false,
      persistent: true,
    }
  )

  watcher.on('all', (event, filePath) => {
    if (event === 'add' || event === 'change') {
      const rel = path.relative(docsDir, filePath)
      const slug = rel
        .replace(/\.mdx?$/, '')
        .replace(/\\/g, '/')
        .replace(/\/index$/, '')
      onChange({ event, slug, filePath })
    }
    if (event === 'unlink') {
      const rel = path.relative(docsDir, filePath)
      const slug = rel
        .replace(/\.mdx?$/, '')
        .replace(/\\/g, '/')
        .replace(/\/index$/, '')
      onChange({ event: 'unlink', slug, filePath })
    }
  })

  return { close: () => watcher.close() }
}
