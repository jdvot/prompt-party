'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
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
  Layers,
  Home,
  Sparkles,
  TrendingUp,
  Plus,
  Search
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
  { href: '/', label: 'home', icon: Home },
  { href: '/tutorials', label: 'guides', icon: BookOpen },
  { href: '/prompts/wizard', label: 'wizard', icon: Sparkles },
  { href: '/trending', label: 'trending', icon: TrendingUp },
]

// Mobile bottom navigation - key actions for thumb-friendly access
const mobileBottomNavLinks = [
  { href: '/', label: 'home', icon: Home },
  { href: '/tutorials', label: 'guides', icon: BookOpen },
  { href: '/trending', label: 'trending', icon: TrendingUp },
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

// Scroll threshold for triggering glassmorphism effect
const SCROLL_THRESHOLD = 10

export function Header() {
  const { user, loading } = useUser()
  const { showHelp } = useShortcuts()
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileSearchOpen(false)
  }, [pathname])

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || mobileSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen, mobileSearchOpen])

  // Handle escape key to close mobile overlays
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setMobileSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Toggle mobile search with callback
  const toggleMobileSearch = useCallback(() => {
    setMobileSearchOpen(prev => !prev)
    setMobileMenuOpen(false)
  }, [])

  // Toggle mobile menu with callback
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
    setMobileSearchOpen(false)
  }, [])

  // Memoize all secondary nav links flattened
  const allSecondaryLinks = useMemo(() =>
    secondaryNavGroups.flatMap(group => group.items),
    []
  )

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        "safe-area-inset-top", // Support for notched devices
        isScrolled
          ? "header-glass border-b py-2"
          : "header-transparent bg-transparent py-4 border-transparent"
      )}
    >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300",
            isScrolled ? "h-14" : "h-16"
          )}>
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
                      "nav-link px-3 py-2 text-sm font-medium rounded-md",
                      `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                      "motion-reduce:transition-none",
                      isActive
                        ? "text-foreground nav-link-active"
                        : "text-muted-foreground hover:text-foreground"
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
                    <span className="inline-flex items-center gap-1">
                      {t('more_label') || 'More'}
                      <MoreHorizontal className="w-4 h-4 opacity-70" />
                    </span>
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
                              <span className="inline-flex items-center gap-2">
                                <Icon className="w-4 h-4" aria-hidden="true" />
                                {t(link.label)}
                              </span>
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
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "sm:hidden touch-target h-11 w-11 p-0",
                  `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                  "motion-reduce:transition-none",
                  "active:scale-95"
                )}
                onClick={toggleMobileSearch}
                aria-label="Search"
                aria-expanded={mobileSearchOpen}
              >
                <Search className="h-5 w-5" />
              </Button>

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

              <div className="hidden sm:flex">
                <LanguageSwitcher />
              </div>
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
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "hidden sm:inline-flex text-xs sm:text-sm"
                        )}
                      >
                        {t('login')}
                      </Link>
                      <Link
                        href="/auth/signup"
                        className={cn(
                          buttonVariants({ size: "sm" }),
                          "text-xs sm:text-sm touch-target-sm"
                        )}
                      >
                        {t('signup')}
                      </Link>
                    </>
                  )}
                </>
              )}

              {/* Mobile Menu Button - Enhanced touch target */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "md:hidden touch-target h-11 w-11 p-0",
                  "active:scale-95",
                  `transition-transform ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                  "motion-reduce:transition-none"
                )}
                onClick={toggleMobileMenu}
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
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu - Enhanced with touch-friendly targets */}
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
              "motion-reduce:animate-none",
              "safe-area-inset-bottom"
            )}
          >
            <nav className="px-4 py-3 space-y-1 overflow-y-auto h-full mobile-scroll pb-24">
              {/* Primary Navigation with Icons */}
              <div className="space-y-1">
                {primaryNavLinks.map(link => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  const Icon = link.icon

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3.5 text-base font-medium rounded-xl",
                        "touch-target-row min-h-[52px]",
                        `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                        "motion-reduce:transition-none",
                        "active:scale-[0.98]",
                        isActive
                          ? "text-foreground bg-muted"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span>{t(link.label)}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Secondary Navigation Groups */}
              {secondaryNavGroups.map((group, idx) => (
                <div key={group.category} className="pt-4">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t(`${group.category}_category`)}
                  </div>
                  <div className="space-y-1">
                    {group.items.map(link => {
                      const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                      const Icon = link.icon

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3.5 text-base font-medium rounded-xl",
                            "touch-target-row min-h-[52px]",
                            `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                            "motion-reduce:transition-none",
                            "active:scale-[0.98]",
                            isActive
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                          <span>{t(link.label)}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}

              {/* Language Switcher for Mobile */}
              <div className="pt-4 border-t border-border/40">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t('language') || 'Language'}
                </div>
                <div className="px-4 py-2">
                  <LanguageSwitcher />
                </div>
              </div>

              {/* Create Button for logged-in users */}
              {user && (
                <div className="pt-4 px-4">
                  <Link
                    href="/prompts/new"
                    className={cn(
                      "flex items-center justify-center gap-2 w-full py-3.5 text-base font-semibold rounded-xl",
                      "bg-primary text-primary-foreground",
                      "touch-target min-h-[52px]",
                      "active:scale-[0.98]",
                      `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                      "motion-reduce:transition-none"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                    <span>{t('create')}</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}

        {/* Mobile Search Overlay */}
        {mobileSearchOpen && (
          <>
            <div
              className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden"
              onClick={() => setMobileSearchOpen(false)}
              aria-hidden="true"
            />
            <div
              className={cn(
                "fixed top-0 inset-x-0 z-50 md:hidden",
                "bg-background border-b border-border/40",
                "safe-area-inset-top",
                `animate-in slide-in-from-top-4 fade-in-0 ${TRANSITION_DURATION}`,
                "motion-reduce:animate-none"
              )}
            >
              <div className="flex items-center gap-2 px-4 py-3">
                <div className="flex-1">
                  <SearchAutocomplete autoFocus />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="touch-target h-11 px-4"
                  onClick={() => setMobileSearchOpen(false)}
                >
                  {t('cancel') || 'Cancel'}
                </Button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Mobile Bottom Navigation - Fixed at bottom */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 md:hidden",
          "bg-background/95 backdrop-blur-xl border-t border-border/40",
          "safe-area-inset-bottom",
          "mobile-nav-bottom"
        )}
        aria-label="Mobile bottom navigation"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {mobileBottomNavLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            const Icon = link.icon

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[64px]",
                  "touch-target",
                  `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                  "motion-reduce:transition-none",
                  "active:scale-95",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn("w-6 h-6", isActive && "scale-110")} aria-hidden="true" />
                <span className="text-xs font-medium">{t(link.label)}</span>
              </Link>
            )
          })}

          {/* Create FAB in bottom nav */}
          {user && (
            <Link
              href="/prompts/new"
              className={cn(
                "flex items-center justify-center",
                "w-12 h-12 rounded-full",
                "bg-primary text-primary-foreground shadow-lg",
                "touch-target",
                "active:scale-95",
                `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
                "motion-reduce:transition-none"
              )}
              aria-label={t('create')}
            >
              <Plus className="w-6 h-6" aria-hidden="true" />
            </Link>
          )}

          {/* Menu button in bottom nav */}
          <button
            onClick={toggleMobileMenu}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-4 py-2 min-w-[64px]",
              "touch-target",
              `transition-all ${TRANSITION_DURATION} ${TRANSITION_TIMING}`,
              "motion-reduce:transition-none",
              "active:scale-95",
              mobileMenuOpen
                ? "text-primary"
                : "text-muted-foreground"
            )}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <Menu className={cn("w-6 h-6", mobileMenuOpen && "scale-110")} aria-hidden="true" />
            <span className="text-xs font-medium">{t('more_label') || 'More'}</span>
          </button>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden safe-area-inset-bottom" aria-hidden="true" />
    </>
  )
}
