import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_VERSIONS = ['1.0', '2.0', '3.0']
const DEFAULT_VERSION = '2.0'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const match = pathname.match(/^\/docs\/(.+)/)

  if (match) {
    const rest = match[1]
    const firstSegment = rest.split('/')[0]

    if (!VALID_VERSIONS.includes(firstSegment)) {
      return NextResponse.redirect(
        new URL(`/docs/${DEFAULT_VERSION}/${rest}`, request.url)
      )
    }
  }
}

export const config = {
  matcher: '/docs/:path*',
}
