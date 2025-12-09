/**
 * Main middleware orchestrator for Prompt Party
 * Handles access protection, security, and static assets
 */
import { NextRequest, NextResponse } from 'next/server'
import { withSecurity } from './src/middleware/security'
import { withAuthCheck } from './src/middleware/auth'
import { handleStaticAsset } from './src/middleware/static'

/**
 * Security configuration for API routes
 */
const API_SECURITY = {
  '/api/access': {
    csrf: { enabled: true },
    rateLimit: {
      enabled: true,
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5 // Only 5 attempts per 15 minutes to prevent brute force
    }
  }
}

/**
 * Main middleware function
 */
export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  // 0. Handle OPTIONS (CORS preflight) requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 })
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token')
    response.headers.set('Access-Control-Max-Age', '86400') // 24 hours
    return response
  }

  // 1. Fast path: Skip static assets
  const staticResponse = handleStaticAsset(request)
  if (staticResponse) return staticResponse

  // 2. API routes: Apply security, skip auth check
  if (pathname.startsWith('/api')) {
    // Check more specific paths first to ensure proper rate limiting
    const sortedPaths = Object.entries(API_SECURITY).sort(([a], [b]) => b.length - a.length)

    // Find and apply security config
    for (const [path, config] of sortedPaths) {
      if (pathname.startsWith(path)) {
        const securityResponse = await withSecurity(request, config)
        if (securityResponse) return securityResponse
        break
      }
    }

    // Apply security headers to successful responses
    const response = NextResponse.next()
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    return response
  }

  // 3. Regular routes: Apply auth check (access protection + user auth)
  const response = NextResponse.next()
  return await withAuthCheck(request, response)
}

export const config = {
  matcher: [
    // Skip all internal paths and static assets
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)$).*)',
  ]
}
