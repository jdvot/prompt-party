/**
 * Site Access Protection API
 * Validates password and issues access token
 */
import { NextRequest, NextResponse } from 'next/server'
import { createAccessToken, ACCESS_TOKEN_COOKIE_CONFIG } from '@/lib/access-token'
import { createHash } from 'crypto'

/**
 * Verify password matches the hashed password in environment
 */
function verifyPassword(password: string): boolean {
  const expectedHash = process.env.ACCESS_PASSWORD_HASH
  if (!expectedHash) {
    console.error('❌ ACCESS_PASSWORD_HASH not configured')
    return false
  }

  // Hash the provided password
  const hash = createHash('sha256').update(password).digest('hex')

  return hash === expectedHash
}

/**
 * POST /api/access - Validate password and issue access token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Verify password
    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Create access token
    const token = await createAccessToken()

    // Create response with cookie
    const response = NextResponse.json(
      { success: true, message: 'Access granted' },
      { status: 200 }
    )

    // Set the access token cookie
    response.cookies.set({
      name: ACCESS_TOKEN_COOKIE_CONFIG.name,
      value: token,
      httpOnly: ACCESS_TOKEN_COOKIE_CONFIG.httpOnly,
      secure: ACCESS_TOKEN_COOKIE_CONFIG.secure,
      sameSite: ACCESS_TOKEN_COOKIE_CONFIG.sameSite,
      maxAge: ACCESS_TOKEN_COOKIE_CONFIG.maxAge,
      path: ACCESS_TOKEN_COOKIE_CONFIG.path,
    })

    return response
  } catch (error) {
    console.error('Error in access API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
