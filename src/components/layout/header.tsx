'use client'

import Link from 'next/link'
import { useUser } from '@/lib/supabase/hooks'
import { UserMenu } from './user-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useShortcuts } from '@/components/keyboard-shortcuts/shortcuts-provider'
import { NotificationBell } from '@/components/notifications/notification-bell'
import { SearchAutocomplete } from '@/components/search/search-autocomplete'
import { CommandIcon } from 'lucide-react'
import { Logo, LogoText } from '@/components/brand/logo'
import { LanguageSwitcher } from './language-switcher'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function Header() {
  const { user, loading } = useUser()
  const { showHelp } = useShortcuts()
  const t = useTranslations('nav')

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-sticky">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden sm:inline">
              <LogoText className="text-xl" />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('home')}
            </Link>
            <Link
              href="/tutorials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('tutorials')}
            </Link>
            <Link
              href="/trending"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('trending')}
            </Link>
            <Link
              href="/top"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('top')}
            </Link>
            <Link
              href="/prompts/wizard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('wizard')}
            </Link>
            <Link
              href="/mcp-vs-rag"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('guides')}
            </Link>
          </nav>
        </div>

        {/* Search bar - centered on desktop, full width on mobile */}
        <div className="w-full md:flex-1 md:max-w-md md:mx-8">
          <SearchAutocomplete />
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
          <LanguageSwitcher />
          <ThemeToggle />
          {!loading && (
            <>
              {user ? (
                <>
                  <NotificationBell />
                  <Link href="/prompts/new" className={cn(buttonVariants(), "hidden sm:inline-flex")}>
                    {t('create')}
                  </Link>
                  <Link href="/prompts/new" className={cn(buttonVariants({ size: "sm" }), "sm:hidden")}>
                    {t('create')}
                  </Link>
                  <UserMenu user={user} />
                </>
              ) : (
                <>
                  <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex")}>
                    {t('login')}
                  </Link>
                  <Link href="/auth/signup" className={cn(buttonVariants({ size: "sm" }))}>
                    {t('signup')}
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
