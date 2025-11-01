/**
 * Security middleware for API routes
 * Handles CSRF protection and rate limiting
 */
import { NextRequest, NextResponse } from 'next/server'

interface SecurityConfig {
  csrf?: {
    enabled: boolean
  }
  rateLimit?: {
    enabled: boolean
    windowMs: number
    maxRequests: number
  }
}

// Simple in-memory rate limiting (use Redis in production for multi-instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Apply security measures to API routes
 */
export async function withSecurity(
  request: NextRequest,
  config: SecurityConfig
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl

  // Rate limiting
  if (config.rateLimit?.enabled) {
    const clientIp = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const key = `${pathname}:${clientIp}`
    const now = Date.now()

    const existing = rateLimitStore.get(key)

    if (existing) {
      if (now < existing.resetTime) {
        // Within the window
        if (existing.count >= config.rateLimit.maxRequests) {
          return new NextResponse('Too many requests', { status: 429 })
        }
        existing.count++
      } else {
        // Window expired, reset
        rateLimitStore.set(key, {
          count: 1,
          resetTime: now + config.rateLimit.windowMs
        })
      }
    } else {
      // First request
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.rateLimit.windowMs
      })
    }
  }

  // CSRF protection (basic - check origin header)
  if (config.csrf?.enabled && request.method !== 'GET') {
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')

    if (origin && host) {
      const originHost = new URL(origin).host
      if (originHost !== host) {
        return new NextResponse('Invalid origin', { status: 403 })
      }
    }
  }

  return null // Continue to next middleware
}
