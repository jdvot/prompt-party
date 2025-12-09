/**
 * Consolidated Middleware for Prompt Party
 * Handles: Supabase Auth, i18n, Security, Access Protection
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales } from './src/i18n/request'
import { withSecurity } from './src/middleware/security'
import { handleStaticAsset } from './src/middleware/static'
import { getAccessTokenFromCookies, verifyAccessToken } from './src/lib/access-token'

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'never', // Don't add /en or /fr to URLs
})

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
 * Check if site-wide access protection is enabled
 */
function isAccessProtectionEnabled(): boolean {
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

  // Allow static assets
  if (pathname.startsWith('/_next/') ||
      pathname.includes('.') &&
      /\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|otf)$/.test(pathname)) {
    return true
  }

  return false
}

export default async function middleware(request: NextRequest) {
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

  // 2. API routes: Apply security headers
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

  // 3. Handle internationalization for regular routes
  const intlResponse = intlMiddleware(request)
  if (intlResponse.status !== 200) {
    return intlResponse
  }

  // 4. Continue with Supabase auth middleware
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 5. Check site-wide access protection (if enabled)
  const protectionEnabled = isAccessProtectionEnabled()
  const shouldSkip = shouldSkipAccessProtection(pathname)

  if (protectionEnabled && !shouldSkip) {
    // Get access token from cookies
    const accessToken = getAccessTokenFromCookies(request.headers.get('cookie'))

    // Verify the access token
    if (!accessToken || !(await verifyAccessToken(accessToken))) {
      // Redirect to access page with return URL
      const url = request.nextUrl.clone()
      url.pathname = '/access'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  // 6. Protected routes check
  const protectedPaths = ['/prompts/new', '/collections', '/profile/settings']
  const isProtectedPath = protectedPaths.some(path =>
    pathname.startsWith(path)
  )

  if (isProtectedPath && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 7. Onboarding check - redirect new users to onboarding
  if (user && pathname !== '/onboarding' && !pathname.startsWith('/auth')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('user_id', user.id)
      .single()

    if (profile && !profile.onboarding_completed) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/onboarding'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // 8. Add auth header for protected routes
  if (isProtectedPath) {
    supabaseResponse.headers.set('x-requires-auth', 'true')
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)$).*)',
  ],
}
