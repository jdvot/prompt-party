'use client'

import Link from 'next/link'
import { useUser } from '@/lib/supabase/hooks'
import { UserMenu } from './user-menu'

export function Header() {
  const { user, loading } = useUser()

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-3xl">🪩</span>
            <span>Prompt Party</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Feed
            </Link>
            <Link
              href="/trending"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Trending
            </Link>
            <Link
              href="/top"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Top
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/prompts/new"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Create Prompt
                  </Link>
                  <UserMenu user={user} />
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
