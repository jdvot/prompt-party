/**
 * Site Access Protection Token Management
 *
 * Secure token-based system for site access protection that works with
 * Next.js 15 middleware edge runtime limitations.
 *
 * How it works:
 * 1. Password validation happens in API routes (Node.js runtime with secrets)
 * 2. API route issues a signed JWT token with expiration
 * 3. Middleware validates the token signature (no secrets needed)
 * 4. Token contains enough data for validation without server lookup
 */

import { SignJWT, jwtVerify } from 'jose'

// Server-only JWT signing key - NEVER exposed to client
function getSigningKey(): Uint8Array {
  if (typeof window !== 'undefined') {
    throw new Error('❌ SECURITY: JWT signing key accessed on client')
  }

  const secret = process.env.ACCESS_TOKEN_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('❌ SECURITY: ACCESS_TOKEN_SECRET must be at least 32 characters long')
  }

  return new TextEncoder().encode(secret)
}

export interface AccessTokenPayload {
  granted: boolean
  iat: number
  exp: number
  iss: string
}

/**
 * Create a signed access token (Server-only)
 * Used in API routes after password validation
 */
export async function createAccessToken(): Promise<string> {
  // Only allow on server
  if (typeof window !== 'undefined') {
    throw new Error('❌ SECURITY: createAccessToken() called on client')
  }

  const now = Math.floor(Date.now() / 1000)
  const token = await new SignJWT({
    granted: true,
    iat: now,
    exp: now + (2 * 60 * 60), // 2 hours
    iss: 'prompt-party-access-protection'
  } satisfies AccessTokenPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(now + (2 * 60 * 60))
    .sign(getSigningKey())

  return token
}

/**
 * Verify access token (Works in middleware edge runtime)
 * No secrets needed - uses the public signing key
 */
export async function verifyAccessToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSigningKey())

    // Type-safe payload validation
    const data = payload as unknown as AccessTokenPayload

    // Verify token structure and claims
    return (
      data.granted === true &&
      data.iss === 'prompt-party-access-protection' &&
      typeof data.iat === 'number' &&
      typeof data.exp === 'number' &&
      data.exp > Math.floor(Date.now() / 1000) // Not expired
    )
  } catch (error) {
    // Invalid token, expired, or verification failed
    console.warn('Access token verification failed:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

/**
 * Extract access token from request cookies
 * Safe for use in middleware
 */
export function getAccessTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null

  // Parse cookies manually (edge runtime compatible)
  const cookies = cookieHeader
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('access-token='))

  return cookies ? cookies.split('=')[1] : null
}

/**
 * Check if site access protection is enabled
 * Protection is enabled if ACCESS_PASSWORD_HASH is set
 */
export function isAccessProtectionEnabled(): boolean {
  // Server-side: Check actual environment configuration
  if (typeof window === 'undefined') {
    return process.env.ACCESS_PROTECTION_ENABLED === 'true' &&
           !!process.env.ACCESS_PASSWORD_HASH
  }

  // Client-side: Check public flag only
  return process.env.NEXT_PUBLIC_ACCESS_PROTECTION_ENABLED === 'true'
}

/**
 * Cookie configuration for access token
 */
export const ACCESS_TOKEN_COOKIE_CONFIG = {
  name: 'access-token',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 2 * 60 * 60, // 2 hours
  path: '/'
} as const
