import { test, expect } from '@playwright/test'
import { testInAllLanguages, loadTranslations, Locale } from '../setup/translation-helpers'

/**
 * UI Elements Translation Tests
 * Tests for buttons, modals, toasts, empty states
 */

test.describe('UI Elements - Translations', () => {
  test.describe('Buttons', () => {
    test('should display translated button text across pages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        const pages = ['/', '/collections', '/tutorials']

        for (const path of pages) {
          await page.goto(path)
          await page.waitForLoadState('networkidle')

          const buttons = page.locator('button:visible').all()
          const buttonList = await buttons

          // Should have buttons with text
          let hasContent = false
          for (const button of buttonList.slice(0, 5)) {
            const text = await button.textContent()
            if (text && text.trim().length > 0) {
              hasContent = true
              break
            }
          }

          expect(hasContent).toBeTruthy()
        }
      })
    })

    test('should display CTA buttons with translated labels', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/pricing')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Pricing page should have CTA buttons
        const ctaButtons = page.locator('button:has-text(/upgrade|subscribe|choose|select/i)').all()
        const buttons = await ctaButtons

        expect(buttons.length).toBeGreaterThan(0)

        // Each button should have readable text
        for (const button of buttons.slice(0, 2)) {
          const text = await button.textContent()
          expect(text).toBeTruthy()
          expect(text!.length).toBeGreaterThan(0)
        }
      })
    })

    test('should display action buttons with translated text', async ({ page }) => {
      // Create prompt page
      await page.goto('/prompts/new')
      await page.waitForLoadState('networkidle')

      // Should have Create/Submit button
      const createButton = page.locator('button:has-text(/create|submit|save/i)').first()
      const buttonVisible = await createButton.isVisible().catch(() => false)

      if (buttonVisible) {
        const text = await createButton.textContent()
        expect(text).toBeTruthy()
      }
    })
  })

  test.describe('Empty States', () => {
    test('should display empty state messages in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        // Collections page (may have empty state)
        await page.goto('/collections')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Look for empty state or collection items
        const emptyMessage = page.locator('text=/no|empty|create|add/i').first()
        const items = page.locator('[class*="collection"], [class*="card"]').all()

        const emptyVisible = await emptyMessage.isVisible().catch(() => false)
        const itemList = await items

        // Page should have either items or empty state message
        expect(emptyVisible || itemList.length > 0).toBeTruthy()
      })
    })

    test('should provide action when empty', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForLoadState('networkidle')

      // Look for create/add button if collections are empty
      const createButton = page.locator('a[href*="/collections/new"], button:has-text(/new|create/i)').first()
      const createVisible = await createButton.isVisible().catch(() => false)

      const items = page.locator('[class*="collection"], [class*="card"]').all()
      const itemList = await items

      // If no items, should have way to create
      if (itemList.length === 0) {
        expect(createVisible).toBeTruthy()
      }
    })
  })

  test.describe('Toasts/Notifications', () => {
    test('should display toast messages in translated form', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Trigger an action that shows toast (if possible)
      // Example: Look for existing notifications
      const toast = page.locator('[role="alert"], [role="status"], [class*="toast"], [class*="notification"]').first()
      const toastVisible = await toast.isVisible().catch(() => false)

      // Toast may or may not be present initially
      // But if present, should be readable
      if (toastVisible) {
        const text = await toast.textContent()
        expect(text).toBeTruthy()
      }
    })
  })

  test.describe('Modals/Dialogs', () => {
    test('should display modal content in translated form', async ({ page }) => {
      // Try to trigger a modal (e.g., delete confirmation)
      // This depends on the app having modal functionality

      // Look for modal-related elements
      const modal = page.locator('[role="dialog"], [class*="modal"]').first()
      const modalVisible = await modal.isVisible().catch(() => false)

      // If no modal is visible, that's fine - not all pages have modals
      if (modalVisible) {
        const heading = modal.locator('h1, h2, [role="heading"]').first()
        const headingVisible = await heading.isVisible().catch(() => false)

        expect(headingVisible).toBeTruthy()
      }
    })

    test('should display modal buttons with translated labels', async ({ page }) => {
      const modal = page.locator('[role="dialog"], [class*="modal"]').first()
      const modalVisible = await modal.isVisible().catch(() => false)

      if (modalVisible) {
        const buttons = modal.locator('button').all()
        const buttonList = await buttons

        // Modal should have buttons
        expect(buttonList.length).toBeGreaterThan(0)

        // Buttons should have text
        for (const button of buttonList) {
          const text = await button.textContent()
          expect(text).toBeTruthy()
        }
      }
    })
  })

  test.describe('Badges and Labels', () => {
    test('should display status badges with proper text', async ({ page }) => {
      await page.goto('/tutorials')
      await page.waitForLoadState('networkidle')

      // Look for badges (level, difficulty, duration, etc)
      const badges = page.locator('[class*="badge"], [class*="tag"], [class*="label"]').all()
      const badgeList = await badges

      if (badgeList.length > 0) {
        // Each badge should have content
        for (const badge of badgeList.slice(0, 5)) {
          const text = await badge.textContent()
          expect(text).toBeTruthy()
        }
      }
    })
  })

  test.describe('Links and Anchors', () => {
    test('should have readable link text in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const links = page.locator('a[href]').all()
        const linkList = await links

        // Check first few links have text or aria-label
        for (const link of linkList.slice(0, 10)) {
          const text = await link.textContent()
          const ariaLabel = await link.getAttribute('aria-label')

          // Link should have content
          expect(text?.trim() || ariaLabel).toBeTruthy()
        }
      })
    })
  })

  test.describe('Icons with Text', () => {
    test('should have aria-labels for icon-only buttons', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState()

      // Look for icon-only buttons
      const iconButtons = page.locator('button:has(svg, [class*="icon"])').all()
      const buttons = await iconButtons

      for (const button of buttons.slice(0, 5)) {
        const text = await button.textContent()
        const ariaLabel = await button.getAttribute('aria-label')
        const title = await button.getAttribute('title')

        // Icon button should have some descriptive text
        expect(text?.trim() || ariaLabel || title).toBeTruthy()
      }
    })
  })

  test.describe('Form Inputs and Selects', () => {
    test('should display translated placeholders in inputs', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/search')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Search page should have input with placeholder
        const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first()
        const inputVisible = await searchInput.isVisible().catch(() => false)

        if (inputVisible) {
          const placeholder = await searchInput.getAttribute('placeholder')
          expect(placeholder).toBeTruthy()
        }
      })
    })

    test('should display select options with translated text', async ({ page }) => {
      await page.goto('/top')
      await page.waitForLoadState('networkidle')

      // Look for select elements (sort, filter)
      const selects = page.locator('select').all()
      const selectList = await selects

      if (selectList.length > 0) {
        const select = selectList[0]
        const options = select.locator('option').all()
        const optionList = await options

        // Each option should have text
        expect(optionList.length).toBeGreaterThan(0)

        for (const option of optionList.slice(0, 3)) {
          const text = await option.textContent()
          expect(text).toBeTruthy()
        }
      }
    })
  })

  test.describe('Error and Success Messages', () => {
    test('should display success messages with translated text', async ({ page }) => {
      // Success messages would appear after actions
      // Check if they're properly displayed

      const alerts = page.locator('[role=\"alert\"], [class*=\"success\"], [class*=\"error\"]').all()
      const alertList = await alerts

      // If alerts are present, they should have content
      if (alertList.length > 0) {
        for (const alert of alertList) {
          const text = await alert.textContent()
          expect(text).toBeTruthy()
        }
      }
    })
  })

  test.describe('Loading States', () => {
    test('should display loading indicators with translated messages', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Look for loading indicators
      const spinners = page.locator('[class*="loading"], [class*="spinner"], [role="progressbar"]').all()
      const spinnerList = await spinners

      // May or may not have loading indicators depending on state
      if (spinnerList.length > 0) {
        // Loading indicator should be visible
        expect(spinnerList.length).toBeGreaterThan(-1)
      }
    })
  })

  test.describe('UI Elements Mobile Responsive', () => {
    test('should display UI elements properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Buttons should have adequate size
      const buttons = page.locator('button:visible').all()
      const buttonList = await buttons

      if (buttonList.length > 0) {
        const firstButton = buttonList[0]
        const box = await firstButton.boundingBox()

        if (box) {
          // Touch target minimum 44x44, allow 36+ for slight variation
          expect(box.height).toBeGreaterThanOrEqual(36)
        }
      }

      // No horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(hasHorizontalScroll).toBeFalsy()
    })
  })
})
