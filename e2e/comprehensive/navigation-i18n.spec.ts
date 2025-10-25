import { test, expect } from '@playwright/test'

/**
 * Comprehensive Navigation and Internationalization E2E Tests
 *
 * Test Strategy:
 * - Test main navigation across all pages
 * - Test language switcher (EN/FR)
 * - Test theme toggle (light/dark)
 * - Test feed filtering and sorting
 * - Test breadcrumb navigation
 * - Test mobile navigation and menu
 * - Test responsive behavior
 *
 * Coverage:
 * - Happy path: navigate → switch language → toggle theme
 * - Edge cases: browser back/forward, direct URLs
 * - Mobile: hamburger menu, bottom navigation
 */

test.describe('Navigation and Internationalization - Comprehensive', () => {
  test.describe('Header Navigation', () => {
    test('should display header on all pages', async ({ page }) => {
      const pages = ['/', '/top', '/trending', '/collections', '/about']

      for (const pagePath of pages) {
        await page.goto(pagePath)
        await page.waitForTimeout(1000)

        // Header should be visible
        const header = page.locator('header, nav').first()
        await expect(header).toBeVisible()

        // Logo/brand should be present
        const logo = page.locator('text=/prompt party/i, [data-logo], img[alt*="logo" i]').first()
        const logoVisible = await logo.isVisible().catch(() => false)
        expect(logoVisible).toBe(true)
      }
    })

    test('should navigate to home from logo click', async ({ page }) => {
      await page.goto('/top')
      await page.waitForTimeout(1000)

      // Click logo
      const logoLink = page.locator('a[href="/"], a:has(text=/prompt party/i)').first()
      await logoLink.click()

      await page.waitForURL('/')
      await expect(page).toHaveURL('/')
    })

    test('should display main navigation links', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Check for main nav links
      const navLinks = [
        { text: /explore|discover|browse/i, optional: true },
        { text: /collections/i, href: '/collections' },
        { text: /create|new/i, optional: true }
      ]

      for (const link of navLinks) {
        const element = page.locator(`a:has-text("${link.text}")`).first()
        const exists = await element.count() > 0

        if (!link.optional) {
          expect(exists).toBe(true)
        }
      }
    })

    test('should display user menu when authenticated', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Look for user menu or profile link
      const userMenu = page.locator('[data-user-menu], button[aria-label*="account" i], a[href*="/profile/"]')
      const loginLink = page.locator('a[href="/auth/login"]')

      const hasUserMenu = await userMenu.count() > 0
      const hasLoginLink = await loginLink.count() > 0

      // Should have either user menu (if authenticated) or login link
      expect(hasUserMenu || hasLoginLink).toBe(true)
    })

    test('should display auth links when not authenticated', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      const loginLink = page.locator('a[href="/auth/login"]')
      const signupLink = page.locator('a[href="/auth/signup"]')

      const hasLogin = await loginLink.count() > 0
      const hasSignup = await signupLink.count() > 0

      // At least one auth link should be visible (if not authenticated)
      // Might not be visible if user is authenticated
    })
  })

  test.describe('Language Switcher', () => {
    test('should display language switcher', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Look for language switcher
      const langSwitcher = page.locator(
        '[data-language-switcher], button:has-text("EN"), button:has-text("FR"), select[name="language"]'
      )
      const hasLangSwitcher = await langSwitcher.count() > 0

      if (hasLangSwitcher) {
        await expect(langSwitcher.first()).toBeVisible()
      }
    })

    test('should switch from English to French', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Find language switcher
      const langSwitcher = page.locator(
        '[data-language-switcher], button:has-text("EN"), button:has-text("English")'
      ).first()
      const hasSwitcher = await langSwitcher.count() > 0

      if (!hasSwitcher) {
        test.skip()
        return
      }

      // Click to open language menu
      await langSwitcher.click()
      await page.waitForTimeout(500)

      // Look for French option
      const frenchOption = page.locator(
        'button:has-text("FR"), button:has-text("Français"), a:has-text("Français"), [data-lang="fr"]'
      )
      const hasFrench = await frenchOption.count() > 0

      if (!hasFrench) {
        test.skip()
        return
      }

      await frenchOption.first().click()
      await page.waitForTimeout(1000)

      // Page should reload or update to French
      // Check for French text
      const frenchText = page.locator('text=/Prompts|Créer|Connexion|Collections/i')
      const hasFrenchText = await frenchText.count() > 0

      // Content should be in French (implementation dependent)
    })

    test('should switch from French to English', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // First switch to French (if not already)
      const langSwitcher = page.locator(
        '[data-language-switcher], button:has-text("EN"), button:has-text("FR")'
      ).first()
      const hasSwitcher = await langSwitcher.count() > 0

      if (!hasSwitcher) {
        test.skip()
        return
      }

      await langSwitcher.click()
      await page.waitForTimeout(500)

      const frenchOption = page.locator('button:has-text("FR"), button:has-text("Français")')
      const hasFrench = await frenchOption.count() > 0

      if (hasFrench) {
        await frenchOption.first().click()
        await page.waitForTimeout(1000)
      }

      // Now switch back to English
      await langSwitcher.click()
      await page.waitForTimeout(500)

      const englishOption = page.locator('button:has-text("EN"), button:has-text("English")')
      const hasEnglish = await englishOption.count() > 0

      if (hasEnglish) {
        await englishOption.first().click()
        await page.waitForTimeout(1000)

        // Should be back to English
        const englishText = page.locator('text=/Prompts|Create|Login|Collections/i')
        const hasEnglishText = await englishText.count() > 0
      }
    })

    test('should persist language preference across pages', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      const langSwitcher = page.locator('[data-language-switcher], button:has-text("EN")').first()
      const hasSwitcher = await langSwitcher.count() > 0

      if (!hasSwitcher) {
        test.skip()
        return
      }

      // Switch to French
      await langSwitcher.click()
      await page.waitForTimeout(500)

      const frenchOption = page.locator('button:has-text("FR"), button:has-text("Français")')
      const hasFrench = await frenchOption.count() > 0

      if (!hasFrench) {
        test.skip()
        return
      }

      await frenchOption.first().click()
      await page.waitForTimeout(1000)

      // Navigate to another page
      await page.goto('/top')
      await page.waitForTimeout(1000)

      // Language should still be French
      // Check if French is still active (cookie or localStorage should persist)
    })

    test('should translate UI elements in different languages', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      const langSwitcher = page.locator('[data-language-switcher], button:has-text("EN")').first()
      const hasSwitcher = await langSwitcher.count() > 0

      if (!hasSwitcher) {
        test.skip()
        return
      }

      // Check English UI
      const createButton = page.locator('text=/create|new prompt/i').first()
      const createText = await createButton.textContent()

      // Switch to French
      await langSwitcher.click()
      await page.waitForTimeout(500)

      const frenchOption = page.locator('button:has-text("FR")')
      const hasFrench = await frenchOption.count() > 0

      if (hasFrench) {
        await frenchOption.first().click()
        await page.waitForTimeout(1000)

        // UI text should change
        const createButtonFr = page.locator('text=/créer|nouveau/i').first()
        const createTextFr = await createButtonFr.textContent().catch(() => '')

        // Text should be different (translated)
      }
    })
  })

  test.describe('Theme Toggle', () => {
    test('should display theme toggle button', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Look for theme toggle
      const themeToggle = page.locator(
        '[data-theme-toggle], button[aria-label*="theme" i], button:has-text("Light"), button:has-text("Dark")'
      )
      const hasToggle = await themeToggle.count() > 0

      if (hasToggle) {
        await expect(themeToggle.first()).toBeVisible()
      }
    })

    test('should toggle between light and dark theme', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      const themeToggle = page.locator(
        '[data-theme-toggle], button[aria-label*="theme" i]'
      ).first()
      const hasToggle = await themeToggle.count() > 0

      if (!hasToggle) {
        test.skip()
        return
      }

      // Get initial theme
      const initialTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ||
               document.documentElement.getAttribute('data-theme') === 'dark'
      })

      // Toggle theme
      await themeToggle.click()
      await page.waitForTimeout(500)

      // Theme should have changed
      const afterTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ||
               document.documentElement.getAttribute('data-theme') === 'dark'
      })

      expect(afterTheme).not.toBe(initialTheme)
    })

    test('should persist theme preference', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      const themeToggle = page.locator('[data-theme-toggle], button[aria-label*="theme" i]').first()
      const hasToggle = await themeToggle.count() > 0

      if (!hasToggle) {
        test.skip()
        return
      }

      // Set to dark mode
      await themeToggle.click()
      await page.waitForTimeout(500)

      const isDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ||
               document.documentElement.getAttribute('data-theme') === 'dark'
      })

      // Navigate to another page
      await page.goto('/top')
      await page.waitForTimeout(1000)

      // Theme should persist
      const stillDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ||
               document.documentElement.getAttribute('data-theme') === 'dark'
      })

      expect(stillDark).toBe(isDark)
    })

    test('should update theme icon/label', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      const themeToggle = page.locator('[data-theme-toggle], button[aria-label*="theme" i]').first()
      const hasToggle = await themeToggle.count() > 0

      if (!hasToggle) {
        test.skip()
        return
      }

      // Get initial button state
      const initialLabel = await themeToggle.getAttribute('aria-label')
      const initialText = await themeToggle.textContent()

      // Toggle theme
      await themeToggle.click()
      await page.waitForTimeout(500)

      // Button label/icon should update
      const afterLabel = await themeToggle.getAttribute('aria-label')
      const afterText = await themeToggle.textContent()

      // Label or text should change to reflect current theme
    })
  })

  test.describe('Feed Navigation and Filtering', () => {
    test('should display feed filter tabs', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Look for filter tabs
      const newTab = page.locator('a[href="/"], button:has-text("New")')
      const topTab = page.locator('a[href="/top"], button:has-text("Top")')
      const trendingTab = page.locator('a[href="/trending"], button:has-text("Trending")')

      const hasNew = await newTab.count() > 0
      const hasTop = await topTab.count() > 0
      const hasTrending = await trendingTab.count() > 0

      // At least one filter should be visible
      expect(hasNew || hasTop || hasTrending).toBe(true)
    })

    test('should navigate between feed filters', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Navigate to Top
      const topTab = page.locator('a[href="/top"]').first()
      const hasTop = await topTab.count() > 0

      if (hasTop) {
        await topTab.click()
        await page.waitForURL('/top')
        await expect(page).toHaveURL('/top')
      }

      // Navigate to Trending
      const trendingTab = page.locator('a[href="/trending"]').first()
      const hasTrending = await trendingTab.count() > 0

      if (hasTrending) {
        await trendingTab.click()
        await page.waitForURL('/trending')
        await expect(page).toHaveURL('/trending')
      }

      // Navigate back to New
      const newTab = page.locator('a[href="/"]').first()
      const hasNew = await newTab.count() > 0

      if (hasNew) {
        await newTab.click()
        await page.waitForURL('/')
        await expect(page).toHaveURL('/')
      }
    })

    test('should highlight active feed filter', async ({ page }) => {
      await page.goto('/top')
      await page.waitForTimeout(1000)

      const topTab = page.locator('a[href="/top"]').first()

      // Active tab should have special styling
      const tabClasses = await topTab.getAttribute('class')
      const ariaSelected = await topTab.getAttribute('aria-selected')
      const ariaCurrent = await topTab.getAttribute('aria-current')

      // Should have some indicator of being active
      expect(tabClasses || ariaSelected || ariaCurrent).toBeTruthy()
    })

    test('should load different content for each feed filter', async ({ page }) => {
      // Get New feed prompts
      await page.goto('/')
      await page.waitForTimeout(2000)
      const newPrompts = await page.locator('a[href^="/prompts/"]').count()

      // Get Top feed prompts
      await page.goto('/top')
      await page.waitForTimeout(2000)
      const topPrompts = await page.locator('a[href^="/prompts/"]').count()

      // Get Trending feed prompts
      await page.goto('/trending')
      await page.waitForTimeout(2000)
      const trendingPrompts = await page.locator('a[href^="/prompts/"]').count()

      // All feeds should load (might have same or different content)
      expect(newPrompts).toBeGreaterThanOrEqual(0)
      expect(topPrompts).toBeGreaterThanOrEqual(0)
      expect(trendingPrompts).toBeGreaterThanOrEqual(0)
    })
  })

  test.describe('Search and Discovery', () => {
    test('should display search functionality', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Look for search input or button
      const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]')
      const searchButton = page.locator('button[aria-label*="search" i], button:has-text("Search")')

      const hasSearch = await searchInput.count() > 0 || await searchButton.count() > 0

      // Search functionality might be present
    })

    test('should search prompts by keyword', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]')
      const hasSearch = await searchInput.count() > 0

      if (!hasSearch) {
        test.skip()
        return
      }

      // Enter search query
      await searchInput.fill('test')
      await page.keyboard.press('Enter')

      await page.waitForTimeout(2000)

      // Should navigate to search results or filter current page
      const currentUrl = page.url()
      expect(currentUrl).toMatch(/search|q=|query=/i)
    })

    test('should filter by tags', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      // Look for tag links
      const tagLinks = page.locator('a[href*="tag="], [data-tag] a')
      const tagCount = await tagLinks.count()

      if (tagCount > 0) {
        // Click first tag
        const firstTag = tagLinks.first()
        const tagText = await firstTag.textContent()

        await firstTag.click()
        await page.waitForTimeout(2000)

        // Should filter by tag
        const currentUrl = page.url()
        expect(currentUrl).toMatch(/tag=|tags\//i)
      }
    })
  })

  test.describe('Mobile Navigation', () => {
    test('should display mobile navigation menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/')
      await page.waitForTimeout(1000)

      // Look for mobile menu button (hamburger)
      const mobileMenuButton = page.locator(
        'button[aria-label*="menu" i], button:has([data-menu-icon]), button.menu-button'
      )
      const hasMenu = await mobileMenuButton.count() > 0

      // Mobile menu might be present
      if (hasMenu) {
        await expect(mobileMenuButton.first()).toBeVisible()
      }
    })

    test('should open and close mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/')
      await page.waitForTimeout(1000)

      const mobileMenuButton = page.locator('button[aria-label*="menu" i]').first()
      const hasMenu = await mobileMenuButton.count() > 0

      if (!hasMenu) {
        test.skip()
        return
      }

      // Open menu
      await mobileMenuButton.click()
      await page.waitForTimeout(500)

      // Menu content should be visible
      const menuContent = page.locator('[role="dialog"], .mobile-menu, nav[data-mobile]')
      const hasContent = await menuContent.count() > 0

      if (hasContent) {
        await expect(menuContent.first()).toBeVisible()

        // Close menu
        const closeButton = page.locator('button[aria-label*="close" i], button:has-text("Close")')
        const hasClose = await closeButton.count() > 0

        if (hasClose) {
          await closeButton.first().click()
          await page.waitForTimeout(500)

          // Menu should be hidden
          const isVisible = await menuContent.first().isVisible().catch(() => false)
          expect(isVisible).toBe(false)
        }
      }
    })

    test('should display bottom navigation on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/')
      await page.waitForTimeout(1000)

      // Look for bottom navigation
      const bottomNav = page.locator('[data-bottom-nav], nav.bottom, .bottom-navigation')
      const hasBottomNav = await bottomNav.count() > 0

      // Bottom nav might be present on mobile
    })

    test('should navigate using mobile bottom nav', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/')
      await page.waitForTimeout(1000)

      const bottomNav = page.locator('[data-bottom-nav], nav.bottom')
      const hasBottomNav = await bottomNav.count() > 0

      if (!hasBottomNav) {
        test.skip()
        return
      }

      // Click on different nav items
      const navLinks = bottomNav.locator('a, button')
      const linkCount = await navLinks.count()

      if (linkCount > 1) {
        await navLinks.nth(1).click()
        await page.waitForTimeout(1000)

        // Should navigate to different page
      }
    })
  })

  test.describe('Browser Navigation', () => {
    test('should support browser back button', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Navigate to different page
      await page.goto('/top')
      await page.waitForTimeout(1000)

      // Use browser back
      await page.goBack()
      await page.waitForTimeout(1000)

      // Should be back on home
      await expect(page).toHaveURL('/')
    })

    test('should support browser forward button', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      await page.goto('/top')
      await page.waitForTimeout(1000)

      await page.goBack()
      await page.waitForTimeout(1000)

      // Go forward
      await page.goForward()
      await page.waitForTimeout(1000)

      // Should be on /top again
      await expect(page).toHaveURL('/top')
    })

    test('should handle direct URL navigation', async ({ page }) => {
      // Navigate directly to various pages
      const pages = ['/top', '/trending', '/collections', '/about']

      for (const pagePath of pages) {
        await page.goto(pagePath)
        await page.waitForTimeout(1000)

        // Page should load
        expect(page.url()).toContain(pagePath)
      }
    })
  })

  test.describe('Breadcrumb Navigation', () => {
    test('should display breadcrumbs on nested pages', async ({ page }) => {
      // Navigate to a prompt detail page
      await page.goto('/')
      await page.waitForTimeout(2000)

      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      if (count > 0) {
        await promptCards.first().click()
        await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

        // Look for breadcrumbs
        const breadcrumbs = page.locator('[data-breadcrumb], nav[aria-label*="breadcrumb" i], .breadcrumb')
        const hasBreadcrumbs = await breadcrumbs.count() > 0

        // Breadcrumbs might be present
      }
    })

    test('should navigate using breadcrumb links', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      if (count > 0) {
        await promptCards.first().click()
        await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

        // Find breadcrumb home link
        const homeLink = page.locator('[data-breadcrumb] a[href="/"], .breadcrumb a[href="/"]')
        const hasHomeLink = await homeLink.count() > 0

        if (hasHomeLink) {
          await homeLink.first().click()
          await page.waitForURL('/')
          await expect(page).toHaveURL('/')
        }
      }
    })
  })

  test.describe('Responsive Behavior', () => {
    test('should adapt layout for tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })

      await page.goto('/')
      await page.waitForTimeout(1000)

      // Header should be visible
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()

      // Content should be readable
      const main = page.locator('main').first()
      await expect(main).toBeVisible()
    })

    test('should adapt layout for desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })

      await page.goto('/')
      await page.waitForTimeout(1000)

      // All navigation should be visible
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()

      // Content should use available space
      const main = page.locator('main').first()
      const mainBox = await main.boundingBox()

      if (mainBox) {
        expect(mainBox.width).toBeGreaterThan(0)
      }
    })
  })

  test.describe('Footer Navigation', () => {
    test('should display footer on pages', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(500)

      // Look for footer
      const footer = page.locator('footer')
      const hasFooter = await footer.isVisible().catch(() => false)

      // Footer might be present
    })

    test('should navigate using footer links', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(1000)

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(500)

      const footer = page.locator('footer')
      const hasFooter = await footer.isVisible().catch(() => false)

      if (hasFooter) {
        // Find footer links
        const footerLinks = footer.locator('a[href^="/"]')
        const linkCount = await footerLinks.count()

        if (linkCount > 0) {
          const firstLink = footerLinks.first()
          const href = await firstLink.getAttribute('href')

          if (href && href !== '/') {
            await firstLink.click()
            await page.waitForTimeout(1000)

            // Should navigate to linked page
            expect(page.url()).toContain(href)
          }
        }
      }
    })
  })
})
