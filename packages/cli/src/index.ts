#!/usr/bin/env node

import { execSync, spawn } from 'child_process'
import path from 'path'
import { watchDocs, parseDocFile, resolveDocPath } from '@softdocs/core'

const CWD = process.cwd()
const DOCS_DIR = path.join(CWD, 'docs')

function main() {
  const command = process.argv[2]

  if (command === 'dev') {
    startDev()
  } else if (command === 'build') {
    runBuild()
  } else {
    console.log(`Usage: softdocs <command>

Commands:
  dev     Start the development server with file watching
  build   Build for production
`)
  }
}

function startDev() {
  console.log('SoftDocs dev server starting...')

  watchDocs(DOCS_DIR, (change) => {
    console.log(`  [${change.event}] ${change.slug}`)
  })

  const nextBin = path.join(CWD, 'node_modules', '.bin', 'next')
  try {
    const child = spawn(nextBin || 'npx', ['next', 'dev'], {
      stdio: 'inherit',
      shell: true,
      cwd: CWD,
    })
    process.on('SIGINT', () => {
      child.kill()
      process.exit(0)
    })
  } catch {
    console.log('Starting Next.js dev server...')
    execSync('npx next dev', { stdio: 'inherit', cwd: CWD })
  }
}

function runBuild() {
  execSync('npx next build', { stdio: 'inherit', cwd: CWD })
}

main()
