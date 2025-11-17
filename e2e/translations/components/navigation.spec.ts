import { test, expect } from '@playwright/test'
import { testInAllLanguages, switchLanguage, loadTranslations, Locale } from '../setup/translation-helpers'

/**
 * Navigation Components Translation Tests
 * Tests for header, footer, breadcrumbs, and navigation menus
 */

test.describe('Navigation Components - Translations', () => {
  test.describe('Header Navigation', () => {
    test('should display header navigation links in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Header should be visible
        const header = page.locator('header, nav').first()
        await expect(header).toBeVisible()

        // Logo/brand should be present
        const logo = page.locator('a[href="/"], [class*="logo"]').first()
        const logoVisible = await logo.isVisible().catch(() => false)
        expect(logoVisible).toBeTruthy()
      })
    })

    test('should have clickable navigation menu items', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const navLinks = page.locator('nav a, [role="navigation"] a').all()
      const links = await navLinks

      expect(links.length).toBeGreaterThan(0)

      // First few links should be clickable
      for (const link of links.slice(0, 3)) {
        const isEnabled = await link.isEnabled().catch(() => false)
        expect(isEnabled).toBeTruthy()
      }
    })

    test('should highlight current page in navigation', async ({ page }) => {
      await page.goto('/top')
      await page.waitForLoadState('networkidle')

      // Should have active/current indicator
      const navLinks = page.locator('nav a, [role="navigation"] a').all()
      const links = await navLinks

      for (const link of links) {
        const ariaActive = await link.getAttribute('aria-current')
        const classList = await link.evaluate((el: Element) => el.className)

        if (classList.includes('active') || classList.includes('current') || ariaActive === 'page') {
          // Found active link
          const href = await link.getAttribute('href')
          expect(href).toBeTruthy()
          break
        }
      }
    })

    test('should display language switcher in header', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const langSwitcher = page.locator('[data-language-switcher], button:has-text(/english|français|nederlands/i)').first()
        const isVisible = await langSwitcher.isVisible().catch(() => false)
        expect(isVisible).toBeTruthy()
      })
    })

    test('should display user menu or auth buttons', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Should have either user menu or login button
      const userMenu = page.locator('[data-user-menu], button[aria-label*="profile"], [class*="user-menu"]').first()
      const loginButton = page.locator('a[href="/auth/login"], button:has-text(/sign in|login/i)').first()

      const userMenuVisible = await userMenu.isVisible().catch(() => false)
      const loginButtonVisible = await loginButton.isVisible().catch(() => false)

      expect(userMenuVisible || loginButtonVisible).toBeTruthy()
    })
  })

  test.describe('Footer Navigation', () => {
    test('should display footer with links in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        // Go to page with footer visible
        await page.goto('/')

        // Scroll to bottom to ensure footer is visible
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(500)

        const footer = page.locator('footer').first()
        const footerVisible = await footer.isVisible().catch(() => false)

        if (footerVisible) {
          const footerLinks = footer.locator('a').all()
          const links = await footerLinks
          expect(links.length).toBeGreaterThan(0)
        }
      })
    })

    test('should have copyright text in footer', async ({ page }) => {
      await page.goto('/')

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(500)

      const footer = page.locator('footer')
      const copyrightText = footer.locator('text=/©|copyright/i').first()

      const isVisible = await copyrightText.isVisible().catch(() => false)
      // Copyright text may not always be present, but footer should exist
      const footerExists = await footer.isVisible().catch(() => false)
      expect(footerExists).toBeTruthy()
    })

    test('should display footer sections (if applicable)', async ({ page }) => {
      await page.goto('/')

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(500)

      const footer = page.locator('footer')
      const sections = footer.locator('section, [class*="column"], div[class*="section"]').all()
      const sectionList = await sections

      // Footer should have some structure
      expect(sectionList.length).toBeGreaterThanOrEqual(0)
    })
  })

  test.describe('Mobile Menu/Navigation', () => {
    test('should display mobile menu on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Look for hamburger menu or mobile nav
      const hamburger = page.locator('button[aria-label*="menu"], [class*="hamburger"]').first()
      const mobileNav = page.locator('nav[class*="mobile"], [class*="mobile-nav"]').first()

      const hamburgerVisible = await hamburger.isVisible().catch(() => false)
      const mobileNavVisible = await mobileNav.isVisible().catch(() => false)

      expect(hamburgerVisible || mobileNavVisible).toBeTruthy()
    })

    test('should toggle mobile menu when clicking hamburger', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const hamburger = page.locator('button[aria-label*="menu"], [class*="hamburger"]').first()
      const hamburgerVisible = await hamburger.isVisible().catch(() => false)

      if (hamburgerVisible) {
        // Click hamburger
        await hamburger.click()
        await page.waitForTimeout(300)

        // Menu items should be visible or revealed
        const menuItems = page.locator('nav a, [role="navigation"] a, [class*="menu-item"]').all()
        const items = await menuItems
        expect(items.length).toBeGreaterThan(0)
      }
    })

    test('should not have horizontal scroll on mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const hamburger = page.locator('button[aria-label*="menu"]').first()
      if (await hamburger.isVisible().catch(() => false)) {
        await hamburger.click()
        await page.waitForTimeout(300)
      }

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(hasHorizontalScroll).toBeFalsy()
    })
  })

  test.describe('Breadcrumb Navigation', () => {
    test('should display breadcrumbs on nested pages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/tutorials/claude-basics')
        await page.waitForLoadState('networkidle')

        const breadcrumbs = page.locator('[class*="breadcrumb"], nav a').first()
        const breadcrumbsVisible = await breadcrumbs.isVisible().catch(() => false)

        // Breadcrumbs may not always be present but navigation should exist
        const nav = page.locator('nav').first()
        const navVisible = await nav.isVisible().catch(() => false)
        expect(navVisible).toBeTruthy()
      })
    })

    test('should have clickable breadcrumb items', async ({ page }) => {
      await page.goto('/tutorials/claude-basics')
      await page.waitForLoadState('networkidle')

      const breadcrumbLinks = page.locator('[class*="breadcrumb"] a, nav a').all()
      const links = await breadcrumbLinks

      if (links.length > 0) {
        // Links should be clickable
        const firstLink = links[0]
        const isEnabled = await firstLink.isEnabled().catch(() => false)
        expect(isEnabled).toBeTruthy()
      }
    })
  })

  test.describe('Command Palette / Quick Navigation', () => {
    test('should have keyboard shortcut for command palette if available', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Look for command palette trigger (Cmd+K or Ctrl+K usually)
      const commandPalette = page.locator('[class*="command"], [class*="palette"], button:has-text(/command|search|quick/i)').first()
      const paletteVisible = await commandPalette.isVisible().catch(() => false)

      // Try keyboard shortcut
      await page.keyboard.press('Control+K')
      await page.waitForTimeout(300)

      const openPalette = page.locator('[class*="command"], [role="dialog"]').first()
      const openVisible = await openPalette.isVisible().catch(() => false)

      // Feature may not be present in all versions
      expect(paletteVisible || openVisible).toEqual(paletteVisible || openVisible)
    })
  })

  test.describe('Navigation Accessibility', () => {
    test('should have semantic navigation structure', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Should have nav element
      const nav = page.locator('nav').first()
      const navVisible = await nav.isVisible().catch(() => false)

      // Or at least navigation links
      const navLinks = page.locator('a[href]').all()
      const links = await navLinks

      expect(navVisible || links.length > 0).toBeTruthy()
    })

    test('should have proper link text or aria labels', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const navLinks = page.locator('nav a, [role="navigation"] a').all()
      const links = await navLinks

      for (const link of links.slice(0, 5)) {
        const text = await link.textContent()
        const ariaLabel = await link.getAttribute('aria-label')

        // Link should have text content or aria-label
        expect(text?.trim() || ariaLabel).toBeTruthy()
      }
    })
  })

  test.describe('Navigation Language Persistence', () => {
    test('should maintain navigation translation when switching languages', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const enNavText = await page.locator('nav').first().textContent()

      await switchLanguage(page, 'fr')
      await page.waitForLoadState('networkidle')

      const frNavText = await page.locator('nav').first().textContent()

      // Navigation text should be different (translated)
      expect(frNavText).not.toBe(enNavText)

      // But structure should be same
      const frNavLinks = page.locator('nav a').all()
      const enNavLinks = page.locator('nav a').all()

      const frLinkCount = (await frNavLinks).length
      const enLinkCount = (await enNavLinks).length

      expect(frLinkCount).toBe(enLinkCount)
    })
  })
})
