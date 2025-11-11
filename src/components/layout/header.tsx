'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/lib/supabase/hooks'
import { UserMenu } from './user-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useShortcuts } from '@/components/keyboard-shortcuts/shortcuts-provider'
import { NotificationBell } from '@/components/notifications/notification-bell'
import { SearchAutocomplete } from '@/components/search/search-autocomplete'
import { CommandIcon, Menu, X } from 'lucide-react'
import { Logo, LogoText } from '@/components/brand/logo'
import { LanguageSwitcher } from './language-switcher'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/tutorials', label: 'guides' },
  { href: '/prompts/wizard', label: 'wizard' },
  { href: '/trending', label: 'trending' },
  { href: '/challenges', label: 'challenges' },
  { href: '/mcp-vs-rag', label: 'concepts' },
  { href: '/ml-vs-dl', label: 'ml_vs_dl' },
  { href: '/tech-stack', label: 'tech_stack' },
]

export function Header() {
  const { user, loading } = useUser()
  const { showHelp } = useShortcuts()
  const t = useTranslations('nav')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-sticky">
      {/* Desktop/Tablet Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-3 lg:gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <Logo className="w-9 h-9 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:scale-110" />
          <span className="hidden sm:inline">
            <LogoText className="text-lg lg:text-xl" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        {/* Search bar - hidden on mobile, flex on tablet+ */}
        <div className="hidden sm:flex flex-1 max-w-sm lg:max-w-md justify-center">
          <SearchAutocomplete />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5 lg:gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:inline-flex w-9 h-9 p-0"
            onClick={showHelp}
            aria-label={t('aria_keyboard_shortcuts') || 'Keyboard shortcuts'}
          >
            <CommandIcon className="h-4 w-4" />
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden w-9 h-9 p-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {!loading && (
            <>
              {user ? (
                <>
                  <NotificationBell />
                  <Link href="/prompts/new" className={cn(buttonVariants({ size: "sm" }), "hidden lg:inline-flex")}>
                    {t('create')}
                  </Link>
                  <UserMenu user={user} />
                </>
              ) : (
                <>
                  <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:inline-flex")}>
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

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <SearchAutocomplete />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/50 backdrop-blur">
          <nav className="px-4 py-3 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.label)}
              </Link>
            ))}
            {user && (
              <Link
                href="/prompts/new"
                className="block px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('create')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
