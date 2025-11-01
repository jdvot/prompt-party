/**
 * Authentication middleware
 * Handles auth requirements for routes and site-wide access protection
 */
import { NextRequest, NextResponse } from 'next/server'
import { getAccessTokenFromCookies, verifyAccessToken } from '@/lib/access-token'

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/reset-password',
  '/auth/callback',
  '/pricing',
  '/marketing-suite',
  '/about',
  '/terms',
  '/privacy',
]

/**
 * Check if route requires authentication
 */
export function requiresAuth(pathname: string): boolean {
  // API routes handle their own auth
  if (pathname.startsWith('/api')) {
    return false
  }

  // Check if pathname matches any public route
  return !PUBLIC_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )
}

/**
 * Check if site-wide access protection is enabled
 */
export function isAccessProtectionEnabled(): boolean {
  // Use server-side env var in middleware
  return process.env.ACCESS_PROTECTION_ENABLED === 'true' &&
         !!process.env.ACCESS_PASSWORD_HASH
}

/**
 * Check if route should skip access protection
 */
function shouldSkipAccessProtection(pathname: string): boolean {
  // Always allow access to the access page itself and its API
  if (pathname === '/access' || pathname === '/api/access') {
    return true
  }

  // Allow access check endpoint
  if (pathname === '/api/access/check') {
    return true
  }

  // Allow webhooks (external services like Stripe must be able to call)
  if (pathname.startsWith('/api/webhooks')) {
    return true
  }

  // Allow static assets (already handled by static middleware but double-check)
  if (pathname.startsWith('/_next/') ||
      pathname.includes('.') &&
      /\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|otf)$/.test(pathname)) {
    return true
  }

  return false
}

/**
 * Add auth header to response for protected routes
 * Also handles site-wide access protection
 */
export async function withAuthCheck(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  const protectionEnabled = isAccessProtectionEnabled()
  const shouldSkip = shouldSkipAccessProtection(pathname)

  console.log('🔐 Auth check:', {
    pathname,
    protectionEnabled,
    shouldSkip,
    envVars: {
      ACCESS_PROTECTION_ENABLED: process.env.ACCESS_PROTECTION_ENABLED,
      hasPasswordHash: !!process.env.ACCESS_PASSWORD_HASH
    }
  })

  // Check site-wide access protection first (if enabled)
  if (protectionEnabled && !shouldSkip) {
    // Get access token from cookies
    const accessToken = getAccessTokenFromCookies(request.headers.get('cookie'))

    // Verify the access token
    if (!accessToken || !(await verifyAccessToken(accessToken))) {
      console.log('🚫 No valid access token, redirecting to access page')

      // Redirect to access page with return URL
      const url = request.nextUrl.clone()
      url.pathname = '/access'
      url.searchParams.set('redirect', pathname)

      return NextResponse.redirect(url)
    }
  }

  // Check regular auth requirements (user authentication)
  if (requiresAuth(pathname)) {
    response.headers.set('x-requires-auth', 'true')
  }

  return response
}
