'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@/lib/supabase/hooks'
import { UserMenu } from './user-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useShortcuts } from '@/components/keyboard-shortcuts/shortcuts-provider'
import { NotificationBell } from '@/components/notifications/notification-bell'
import { SearchAutocomplete } from '@/components/search/search-autocomplete'
import {
  CommandIcon,
  Menu,
  X,
  MoreHorizontal,
  Trophy,
  BookOpen,
  Brain,
  Cpu,
  Layers
} from 'lucide-react'
import { Logo, LogoText } from '@/components/brand/logo'
import { LanguageSwitcher } from './language-switcher'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Transition constants for consistency
const TRANSITION_DURATION = 'duration-200'
const TRANSITION_TIMING = 'ease-out'

// Primary navigation - always visible on desktop
const primaryNavLinks = [
  { href: '/', label: 'home' },
  { href: '/tutorials', label: 'guides' },
  { href: '/prompts/wizard', label: 'wizard' },
  { href: '/trending', label: 'trending' },
]

// Secondary navigation - grouped in "More" dropdown
const secondaryNavGroups = [
  {
    category: 'learning',
    items: [
      { href: '/challenges', label: 'challenges', icon: Trophy },
      { href: '/resources', label: 'resources', icon: BookOpen },
    ]
  },
  {
    category: 'concepts',
    items: [
      { href: '/mcp-vs-rag', label: 'concepts', icon: Brain },
      { href: '/ml-vs-dl', label: 'ml_vs_dl', icon: Cpu },
      { href: '/tech-stack', label: 'tech_stack', icon: Layers },
    ]
  },
]

export function Header() {
  const { user, loading } = useUser()
  const { showHelp } = useShortcuts()
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Memoize all secondary nav links flattened
  const allSecondaryLinks = useMemo(() =>
    secondaryNavGroups.flatMap(group => group.items),
    []
  )

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo - Left */}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2.5 group flex-shrink-0 hover:opacity-80",
                `transition-opacity ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                "motion-reduce:transition-none"
              )}
              aria-label="Prompt Party - Home"
            >
              <Logo className="w-8 h-8 lg:w-9 lg:h-9" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-semibold tracking-tight">
                <LogoText />
              </span>
            </Link>

            {/* Primary Navigation - Desktop Only */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {primaryNavLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md relative",
                      `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                      "motion-reduce:transition-none",
                      "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                      "after:h-0.5 after:bg-primary",
                      `after:transition-all after:${TRANSITION_DURATION} after:${TRANSITION_TIMING}`,
                      "motion-reduce:after:transition-none",
                      isActive
                        ? "text-foreground after:w-3/4 bg-muted/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 after:w-0"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(link.label)}
                  </Link>
                )
              })}

              {/* More Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-sm font-medium gap-1",
                      `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                      "motion-reduce:transition-none"
                    )}
                  >
                    {t('more_label') || 'More'}
                    <MoreHorizontal className="w-4 h-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {secondaryNavGroups.map((group, idx) => (
                    <div key={group.category}>
                      {idx > 0 && <DropdownMenuSeparator />}
                      <DropdownMenuLabel className="text-xs text-muted-foreground">
                        {t(`${group.category}_category`)}
                      </DropdownMenuLabel>
                      {group.items.map(link => {
                        const Icon = link.icon
                        const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

                        return (
                          <DropdownMenuItem key={link.href} asChild>
                            <Link
                              href={link.href}
                              className={cn(
                                "cursor-pointer gap-2",
                                isActive && "bg-muted"
                              )}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              <Icon className="w-4 h-4" aria-hidden="true" />
                              {t(link.label)}
                            </Link>
                          </DropdownMenuItem>
                        )
                      })}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Search - Desktop Only */}
            <div className="hidden sm:flex flex-1 max-w-sm mx-4">
              <SearchAutocomplete />
            </div>

            {/* Right Actions - Always Visible */}
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "hidden lg:inline-flex h-9 w-9 p-0 opacity-70 hover:opacity-100",
                  `transition-opacity ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                  "motion-reduce:transition-none"
                )}
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
                      <Link
                        href="/prompts/new"
                        className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
                      >
                        {t('create')}
                      </Link>
                      <UserMenu user={user} />
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:inline-flex text-xs sm:text-sm")}
                      >
                        {t('login')}
                      </Link>
                      <Link
                        href="/auth/signup"
                        className={cn(buttonVariants({ size: "sm" }), "text-xs sm:text-sm")}
                      >
                        {t('signup')}
                      </Link>
                    </>
                  )}
                </>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-9 w-9 p-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="true"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden pb-3 border-t border-border/40 pt-3 -mx-4 px-4">
            <SearchAutocomplete />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={cn(
              "fixed top-16 inset-x-0 bottom-0 z-50 md:hidden",
              "border-t border-border/40 bg-background",
              `animate-in slide-in-from-top-4 fade-in-0 ${TRANSITION_DURATION}`,
              "motion-reduce:animate-none"
            )}
          >
            <nav className="px-4 py-3 space-y-1 overflow-y-auto h-full">
              {primaryNavLinks.concat(allSecondaryLinks).map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-3 py-2.5 text-sm font-medium rounded-md",
                      `transition-colors ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                      "motion-reduce:transition-none",
                      isActive
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(link.label)}
                  </Link>
                )
              })}
              {user && (
                <>
                  <div className="border-t border-border/40 my-2" />
                  <Link
                    href="/prompts/new"
                    className={cn(
                      "block px-3 py-2.5 text-sm font-medium text-primary rounded-md",
                      "hover:bg-primary/10",
                      `transition-colors ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                      "motion-reduce:transition-none"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('create')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
  )
}
