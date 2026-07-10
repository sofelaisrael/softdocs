---
name: dev-local
description: >
  One-command local dev stack for SoftDocs. Starts the Next.js dev server
  with file watching. Use when you need to run the app locally.
user_invocable: true
---

# /dev-local — start the local dev server

## Purpose

Start a reproducible local development environment with one command.

## Usage

```powershell
# Start the dev server
.\scripts\dev-local.ps1 up

# Check if running
.\scripts\dev-local.ps1 status

# Stop the server
.\scripts\dev-local.ps1 down

# View logs
.\scripts\dev-local.ps1 logs
```

Or directly:

```bash
npm run dev
```

## What it does

1. Checks if `node_modules` exists, runs `npm install` if missing
2. Checks if port 3000 is already in use, stops existing process if so
3. Starts `next dev` on `http://localhost:3000`

## Accessing the app

- **Homepage:** http://localhost:3000
- **Docs:** http://localhost:3000/docs/2.0/installation
- **Pricing:** http://localhost:3000/pricing

## Common issues

- **Port 3000 in use:** Run `.\scripts\dev-local.ps1 down` first
- **Missing dependencies:** Run `npm install` manually
- **Build errors:** Check `npm run lint` and `npx tsc --noEmit`
