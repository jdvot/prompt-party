import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { createAccessToken, ACCESS_TOKEN_COOKIE_CONFIG } from '@/lib/access-token'

export async function POST(request: NextRequest) {
  try {
    const { password, redirect } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Only accept hashed passwords for security (no plaintext)
    const passwordHash = process.env.ACCESS_PASSWORD_HASH

    if (!passwordHash) {
      console.error('❌ ACCESS_PASSWORD_HASH is not set - plaintext passwords are not allowed')
      return NextResponse.json(
        { error: 'Access protection not configured properly' },
        { status: 503 }
      )
    }

    // Validate password using bcrypt
    const isValidPassword = await bcrypt.compare(password, passwordHash)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Create signed access token instead of simple cookie
    const accessToken = await createAccessToken()

    const response = NextResponse.json({
      success: true,
      redirect: redirect || '/'
    })

    // Set secure token cookie
    const cookieStore = await cookies()
    cookieStore.set(ACCESS_TOKEN_COOKIE_CONFIG.name, accessToken, {
      httpOnly: ACCESS_TOKEN_COOKIE_CONFIG.httpOnly,
      secure: ACCESS_TOKEN_COOKIE_CONFIG.secure,
      sameSite: ACCESS_TOKEN_COOKIE_CONFIG.sameSite,
      maxAge: ACCESS_TOKEN_COOKIE_CONFIG.maxAge,
      path: ACCESS_TOKEN_COOKIE_CONFIG.path
    })

    return response
  } catch (error) {
    console.error('Access verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
