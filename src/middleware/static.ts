/**
 * Static asset handling for middleware
 * Fast-path for static assets to skip unnecessary processing
 */
import { NextRequest, NextResponse } from 'next/server'

const STATIC_EXTENSIONS = /\.(ico|png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2|ttf|otf)$/

/**
 * Check if request is for a static asset
 * Returns NextResponse to continue if static, null otherwise
 */
export function handleStaticAsset(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl

  // Fast path for Next.js internals
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // Fast path for static files
  if (STATIC_EXTENSIONS.test(pathname)) {
    return NextResponse.next()
  }

  // Fast path for common static files
  if (pathname === '/favicon.ico' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      pathname === '/manifest.json') {
    return NextResponse.next()
  }

  return null
}
