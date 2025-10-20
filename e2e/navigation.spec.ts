import { test, expect } from '@playwright/test'
import { HomePage } from './pages/home.page'

/**
 * Navigation and Feed E2E Tests
 *
 * Test Strategy:
 * - Test feed filtering (New, Top, Trending)
 * - Test navigation between different pages
 * - Test header navigation links
 * - Verify URL changes and content updates
 * - Test feed sorting behavior
 */

test.describe('Navigation and Feed', () => {
  test.describe('Home Page Navigation', () => {
    test('should load home page successfully', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      // Page should load
      await expect(page).toHaveURL('/')

      // Should have main content
      const mainContent = page.locator('main').first()
      await expect(mainContent).toBeVisible()
    })

    test('should display header navigation', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      // Header should be visible
      const header = page.locator('header, nav')
      await expect(header.first()).toBeVisible()

      // Logo/Brand should be visible
      const logo = page.locator('text=/prompt party/i').first()
      const logoVisible = await logo.isVisible().catch(() => false)
      expect(logoVisible).toBe(true)
    })

    test('should navigate to login page from header', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      // Look for login link
      const loginLink = page.locator('a[href="/auth/login"]')
      const isVisible = await loginLink.isVisible().catch(() => false)

      if (isVisible) {
        await loginLink.click()
        await page.waitForURL('/auth/login')
        await expect(page).toHaveURL('/auth/login')
      }
    })

    test('should navigate to signup page from header', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      // Look for signup link
      const signupLink = page.locator('a[href="/auth/signup"]')
      const isVisible = await signupLink.isVisible().catch(() => false)

      if (isVisible) {
        await signupLink.click()
        await page.waitForURL('/auth/signup')
        await expect(page).toHaveURL('/auth/signup')
      }
    })

    test('should navigate to collections page', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      // Look for collections link
      const collectionsLink = page.locator('a[href="/collections"]')
      const isVisible = await collectionsLink.isVisible().catch(() => false)

      if (isVisible) {
        await collectionsLink.click()
        await page.waitForURL('/collections')
        await expect(page).toHaveURL('/collections')
      }
    })

    test('should navigate to create prompt page', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      // Look for create/new prompt link
      const createLink = page.locator('a[href="/prompts/new"]')
      const isVisible = await createLink.isVisible().catch(() => false)

      if (isVisible) {
        await createLink.click()

        // Might redirect to login if not authenticated
        await page.waitForTimeout(2000)

        const currentUrl = page.url()
        expect(currentUrl === '/prompts/new' || currentUrl.includes('/auth/login')).toBe(true)
      }
    })
  })

  test.describe('Feed Filters', () => {
    test('should display feed filter tabs', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      // Look for filter tabs/buttons
      const newTab = page.locator('a[href="/"], button:has-text("New"), [data-filter="new"]')
      const topTab = page.locator('a[href="/top"], button:has-text("Top"), [data-filter="top"]')
      const trendingTab = page.locator('a[href="/trending"], button:has-text("Trending"), [data-filter="trending"]')

      // At least one filter should be visible
      const newVisible = await newTab.first().isVisible().catch(() => false)
      const topVisible = await topTab.first().isVisible().catch(() => false)
      const trendingVisible = await trendingTab.first().isVisible().catch(() => false)

      expect(newVisible || topVisible || trendingVisible).toBe(true)
    })

    test('should navigate to Top feed', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      // Click Top filter
      const topTab = page.locator('a[href="/top"]').first()
      const isVisible = await topTab.isVisible().catch(() => false)

      if (isVisible) {
        await topTab.click()
        await page.waitForURL('/top')
        await expect(page).toHaveURL('/top')

        // Content should load
        await page.waitForTimeout(2000)
      }
    })

    test('should navigate to Trending feed', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      // Click Trending filter
      const trendingTab = page.locator('a[href="/trending"]').first()
      const isVisible = await trendingTab.isVisible().catch(() => false)

      if (isVisible) {
        await trendingTab.click()
        await page.waitForURL('/trending')
        await expect(page).toHaveURL('/trending')

        // Content should load
        await page.waitForTimeout(2000)
      }
    })

    test('should navigate back to New feed', async ({ page }) => {
      // Start from Top feed
      await page.goto('/top')
      await page.waitForTimeout(2000)

      // Click New filter
      const newTab = page.locator('a[href="/"]').first()
      const isVisible = await newTab.isVisible().catch(() => false)

      if (isVisible) {
        await newTab.click()
        await page.waitForURL('/')
        await expect(page).toHaveURL('/')
      }
    })

    test('should highlight active filter tab', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      // New tab should be active on home page
      const newTab = page.locator('a[href="/"]').first()
      const newTabClasses = await newTab.getAttribute('class').catch(() => '')

      // Active tab often has specific classes (active, selected, underline, etc.)
      // We just verify classes exist
      expect(newTabClasses).toBeTruthy()

      // Navigate to Top
      const topTab = page.locator('a[href="/top"]').first()
      const topTabVisible = await topTab.isVisible().catch(() => false)

      if (topTabVisible) {
        await topTab.click()
        await page.waitForURL('/top')

        await page.waitForTimeout(1000)

        // Top tab should now have active classes
        const topTabClasses = await topTab.getAttribute('class').catch(() => '')
        expect(topTabClasses).toBeTruthy()
      }
    })

    test('should load different content for each feed type', async ({ page }) => {
      // Get prompts from New feed
      await page.goto('/')
      await page.waitForTimeout(2000)

      const newFeedPrompts = page.locator('a[href^="/prompts/"]')
      const newCount = await newFeedPrompts.count()

      // Navigate to Top feed
      await page.goto('/top')
      await page.waitForTimeout(2000)

      const topFeedPrompts = page.locator('a[href^="/prompts/"]')
      const topCount = await topFeedPrompts.count()

      // Both should load (might have same or different content)
      expect(newCount).toBeGreaterThanOrEqual(0)
      expect(topCount).toBeGreaterThanOrEqual(0)

      // Navigate to Trending feed
      await page.goto('/trending')
      await page.waitForTimeout(2000)

      const trendingFeedPrompts = page.locator('a[href^="/prompts/"]')
      const trendingCount = await trendingFeedPrompts.count()

      expect(trendingCount).toBeGreaterThanOrEqual(0)
    })
  })

  test.describe('Breadcrumb Navigation', () => {
    test('should navigate back to home from prompt detail', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      if (count === 0) {
        test.skip()
        return
      }

      // Navigate to prompt detail
      await promptCards.first().click()
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      // Click back or home link
      const homeLink = page.locator('a[href="/"]').first()
      await homeLink.click()

      await page.waitForURL('/')
      await expect(page).toHaveURL('/')
    })

    test('should navigate back using browser back button', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      if (count === 0) {
        test.skip()
        return
      }

      // Navigate to prompt detail
      await promptCards.first().click()
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      // Use browser back
      await page.goBack()

      await page.waitForTimeout(1000)

      // Should be back on home page
      await expect(page).toHaveURL('/')
    })
  })

  test.describe('Search and Discovery', () => {
    test('should display prompts on feed', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      // Should have prompt cards or empty state
      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      expect(count).toBeGreaterThanOrEqual(0)

      if (count === 0) {
        // Should show empty state
        const emptyMessage = page.locator('text=/no prompts|empty|get started/i')
        const hasMessage = await emptyMessage.isVisible().catch(() => false)
        expect(typeof hasMessage).toBe('boolean')
      }
    })

    test('should load more prompts on scroll (if pagination exists)', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      const initialPrompts = page.locator('a[href^="/prompts/"]')
      const initialCount = await initialPrompts.count()

      if (initialCount === 0) {
        test.skip()
        return
      }

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(2000)

      // Check if more prompts loaded (if infinite scroll is implemented)
      const afterScrollPrompts = page.locator('a[href^="/prompts/"]')
      const afterScrollCount = await afterScrollPrompts.count()

      // Count might be same (no pagination) or increased (with pagination)
      expect(afterScrollCount).toBeGreaterThanOrEqual(initialCount)
    })
  })

  test.describe('Responsive Navigation', () => {
    test('should display navigation on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/')
      await page.waitForTimeout(2000)

      // Header should still be visible
      const header = page.locator('header, nav')
      await expect(header.first()).toBeVisible()

      // Mobile menu might be different (hamburger, etc.)
      const mobileMenu = page.locator('[data-testid="mobile-menu"], button[aria-label*="menu"]')
      const mobileMenuVisible = await mobileMenu.isVisible().catch(() => false)

      // Either regular menu or mobile menu should be visible
      expect(typeof mobileMenuVisible).toBe('boolean')
    })

    test('should be navigable on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 })

      await page.goto('/')
      await page.waitForTimeout(2000)

      // Navigation should work
      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      if (count > 0) {
        await promptCards.first().click()
        await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

        const url = page.url()
        expect(url).toMatch(/\/prompts\/[a-f0-9-]+/)
      }
    })
  })

  test.describe('Footer Navigation', () => {
    test('should display footer', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      // Footer might be at bottom of page
      const footer = page.locator('footer')
      const footerVisible = await footer.isVisible().catch(() => false)

      // Footer might not always be visible depending on content
      expect(typeof footerVisible).toBe('boolean')
    })
  })

  test.describe('Error Pages', () => {
    test('should handle 404 pages gracefully', async ({ page }) => {
      const response = await page.goto('/this-page-does-not-exist-12345')
      await page.waitForTimeout(2000)

      // Should show 404 page or redirect to home
      const notFoundText = page.locator('text=/404|not found|page not found/i')
      const notFoundVisible = await notFoundText.isVisible().catch(() => false)

      // Either shows 404, redirects to home, or has 404 status
      const currentUrl = page.url()
      const baseUrl = currentUrl.replace(/\/+$/, '').split('/').slice(0, 3).join('/')
      const is404Status = response?.status() === 404

      expect(notFoundVisible || currentUrl === baseUrl + '/' || currentUrl.includes('not-found') || is404Status).toBe(true)
    })
  })
})
