'use client'

import Link from 'next/link'
import { useUser } from '@/lib/supabase/hooks'
import { UserMenu } from './user-menu'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useShortcuts } from '@/components/keyboard-shortcuts/shortcuts-provider'
import { CommandIcon } from 'lucide-react'

export function Header() {
  const { user, loading } = useUser()
  const { showHelp } = useShortcuts()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-sticky">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity duration-200">
            <span className="text-3xl">🪩</span>
            <span className="hidden sm:inline">Prompt Party</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Feed
            </Link>
            <Link
              href="/trending"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Trending
            </Link>
            <Link
              href="/top"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Top
            </Link>
            <Link
              href="/challenges"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Challenges
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:inline-flex w-9 px-0"
            onClick={showHelp}
            aria-label="Keyboard shortcuts"
          >
            <CommandIcon className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          {!loading && (
            <>
              {user ? (
                <>
                  <Button asChild className="hidden sm:inline-flex">
                    <Link href="/prompts/new">
                      Create Prompt
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="sm:hidden">
                    <Link href="/prompts/new">
                      Create
                    </Link>
                  </Button>
                  <UserMenu user={user} />
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="hidden sm:inline-flex">
                    <Link href="/auth/login">
                      Sign in
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/auth/signup">
                      Sign up
                    </Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
