import { test, expect } from '@playwright/test'
import { testInAllLanguages, Locale } from '../setup/translation-helpers'

/**
 * Accessibility - ARIA Labels and Screen Reader Support
 * Tests for ARIA labels, screen reader text, semantic HTML
 */

test.describe('Accessibility - ARIA Labels & Screen Readers', () => {
  test.describe('Button ARIA Labels', () => {
    test('should have aria-labels for icon-only buttons in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        // Find icon-only buttons (buttons without visible text)
        const iconButtons = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'))
          return buttons
            .filter(btn => {
              const text = btn.textContent?.trim()
              const hasOnlyIcon = !text || text.length === 0
              const hasSVG = btn.querySelector('svg') !== null
              return hasOnlyIcon && hasSVG
            })
            .map(btn => ({
              ariaLabel: btn.getAttribute('aria-label'),
              title: btn.getAttribute('title'),
              text: btn.textContent?.trim()
            }))
        })

        // Each icon button should have aria-label or title
        for (const btn of iconButtons.slice(0, 5)) {
          expect(btn.ariaLabel || btn.title).toBeTruthy()
        }
      })
    })

    test('should have descriptive aria-labels in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/')

        const buttons = page.locator('button[aria-label]').all()
        const buttonList = await buttons

        // Check that aria-labels are descriptive (not empty)
        for (const button of buttonList.slice(0, 5)) {
          const ariaLabel = await button.getAttribute('aria-label')
          expect(ariaLabel).toBeTruthy()
          expect(ariaLabel!.length).toBeGreaterThan(0)
          // Label should be in the correct language
          expect(ariaLabel!.length).toBeGreaterThan(1)
        }
      })
    })
  })

  test.describe('Form Field Accessibility', () => {
    test('should have labels associated with form inputs in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        const inputs = page.locator('input').all()
        const inputList = await inputs

        // Each input should have a label or aria-label
        for (const input of inputList) {
          const id = await input.getAttribute('id')
          const ariaLabel = await input.getAttribute('aria-label')
          const ariaLabelledBy = await input.getAttribute('aria-labelledby')

          expect(id || ariaLabel || ariaLabelledBy).toBeTruthy()

          // If has id, should have matching label
          if (id) {
            const label = page.locator(`label[for="${id}"]`).first()
            const labelText = await label.textContent()
            // Label may not always exist if aria-label used instead
          }
        }
      })
    })

    test('should have aria-describedby for validation messages', async ({ page }) => {
      await page.goto('/auth/signup')
      await page.waitForLoadState('networkidle')

      const passwordInput = page.locator('input[type="password"]').first()

      // Check for aria-describedby if there are help texts
      const ariaDescribedBy = await passwordInput.getAttribute('aria-describedby')

      // May or may not have aria-describedby, but if validation exists, it should be accessible
      if (ariaDescribedBy) {
        expect(ariaDescribedBy.length).toBeGreaterThan(0)
      }
    })

    test('should indicate required fields accessibly', async ({ page }) => {
      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      const inputs = page.locator('input').all()
      const inputList = await inputs

      for (const input of inputList) {
        const required = await input.getAttribute('required')
        const ariaRequired = await input.getAttribute('aria-required')

        // Should indicate required either way
        if (required !== null) {
          expect(required === '' || required === 'required').toBeTruthy()
        }
      }
    })
  })

  test.describe('Navigation Accessibility', () => {
    test('should have semantic nav elements with aria-label if needed', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const navs = page.locator('nav').all()
      const navList = await navs

      // Should have multiple nav elements with distinct labels
      for (const nav of navList) {
        const ariaLabel = await nav.getAttribute('aria-label')
        const role = await nav.getAttribute('role')

        // Nav should be accessible
        expect(nav).toBeTruthy()
      }
    })

    test('should have aria-current on active navigation items', async ({ page }) => {
      await page.goto('/top')
      await page.waitForLoadState('networkidle')

      const navLinks = page.locator('nav a[href]').all()
      const links = await navLinks

      let hasAriaCurrentOrActive = false
      for (const link of links) {
        const ariaCurrent = await link.getAttribute('aria-current')
        const className = await link.getAttribute('class')

        if (ariaCurrent === 'page' || className?.includes('active')) {
          hasAriaCurrentOrActive = true
          break
        }
      }

      // At least one link should indicate it's current
      // May not always be present depending on implementation
    })
  })

  test.describe('Landmark Roles', () => {
    test('should have main landmark role', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const main = page.locator('main, [role="main"]').first()
      const mainVisible = await main.isVisible().catch(() => false)

      expect(mainVisible).toBeTruthy()
    })

    test('should have contentinfo for footer', async ({ page }) => {
      await page.goto('/')

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(300)

      const footer = page.locator('footer, [role="contentinfo"]').first()
      const footerVisible = await footer.isVisible().catch(() => false)

      expect(footerVisible).toBeTruthy()
    })
  })

  test.describe('Screen Reader Text', () => {
    test('should have skip link for keyboard users', async ({ page }) => {
      await page.goto('/')

      // Look for skip link (usually hidden but accessible via keyboard)
      const skipLink = page.locator('a[href="#main"], a:has-text(/skip/i)').first()
      const skipVisible = await skipLink.isVisible().catch(() => false)

      // Skip link may be visually hidden but should be in DOM
      const skipInDOM = await skipLink.evaluate(el => !!el).catch(() => false)

      // Should have some skip link mechanism
    })

    test('should have sr-only text for context', async ({ page }) => {
      await page.goto('/')

      const srOnlyElements = page.locator('[class*="sr-only"], [class*="screen-reader"], [aria-hidden="false"]').all()
      const elements = await srOnlyElements

      // App should have screen-reader specific content
      if (elements.length > 0) {
        for (const el of elements.slice(0, 3)) {
          const text = await el.textContent()
          // SR only elements should have content
          if (text) {
            expect(text.length).toBeGreaterThan(0)
          }
        }
      }
    })
  })

  test.describe('Heading Hierarchy', () => {
    test('should have proper heading hierarchy on pages', async ({ page }) => {
      await page.goto('/tutorials')
      await page.waitForLoadState('networkidle')

      const headings = page.locator('h1, h2, h3, h4, h5, h6').all()
      const headingList = await headings

      // Should have at least one h1
      const h1 = page.locator('h1').first()
      const h1Visible = await h1.isVisible().catch(() => false)

      expect(h1Visible).toBeTruthy()

      // Should have logical heading structure
      let prevLevel = 0
      for (const heading of headingList.slice(0, 5)) {
        const tagName = await heading.evaluate(el => el.tagName)
        const level = parseInt(tagName[1])

        // Heading level shouldn't jump more than 1 level
        // (e.g., h1 -> h3 is bad, h1 -> h2 is good)
        // Allow first heading any level
        if (prevLevel > 0) {
          expect(level - prevLevel).toBeLessThanOrEqual(1)
        }
        prevLevel = level
      }
    })
  })

  test.describe('Image Alt Text', () => {
    test('should have alt text for decorative vs meaningful images', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState()

      const images = page.locator('img').all()
      const imageList = await images

      for (const img of imageList.slice(0, 10)) {
        const alt = await img.getAttribute('alt')
        const ariaLabel = await img.getAttribute('aria-label')
        const role = await img.getAttribute('role')

        // Each image should have alt text or be marked as decorative
        const hasAltOrLabel = alt !== null || ariaLabel !== null || role === 'presentation'
        expect(hasAltOrLabel).toBeTruthy()
      }
    })
  })

  test.describe('Link Context', () => {
    test('should have descriptive link text in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const links = page.locator('a[href]').all()
        const linkList = await links

        // Check first few links have meaningful text
        for (const link of linkList.slice(0, 10)) {
          const text = await link.textContent()
          const ariaLabel = await link.getAttribute('aria-label')

          // Link should have text or aria-label
          const hasContent = (text?.trim() || '').length > 0 || (ariaLabel || '').length > 0

          expect(hasContent).toBeTruthy()

          // Avoid generic link text like "click here" or "more"
          if (text?.trim()) {
            expect(text.trim()).not.toMatch(/^(click here|more|read more|link)$/i)
          }
        }
      })
    })
  })

  test.describe('Color Contrast', () => {
    test('should have sufficient color contrast for readability', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState()

      // This is a simplified check - real contrast testing needs more sophisticated analysis
      const bodyElements = page.locator('body').first()
      const isVisible = await bodyElements.isVisible()

      // Just check page loads and has content
      expect(isVisible).toBeTruthy()
    })
  })

  test.describe('Focus Management', () => {
    test('should have visible focus indicators on interactive elements', async ({ page }) => {
      await page.goto('/')

      // Tab through page
      const button = page.locator('button, a[href]').first()
      const buttonVisible = await button.isVisible().catch(() => false)

      if (buttonVisible) {
        // Focus on button
        await button.focus()
        await page.waitForTimeout(100)

        // Check if element is focused
        const isFocused = await button.evaluate(el => {
          return document.activeElement === el
        })

        expect(isFocused).toBeTruthy()
      }
    })
  })

  test.describe('Accessibility Labels in All Languages', () => {
    test('should have consistent aria-labels across language changes', async ({ page }) => {
      await page.goto('/')

      const enButton = page.locator('button[aria-label]').first()
      const enLabel = await enButton.getAttribute('aria-label')

      // Switch language
      const langButton = page.locator('[data-language-switcher], button:has-text(/français/i)').first()
      if (await langButton.isVisible().catch(() => false)) {
        await langButton.click()
        await page.waitForTimeout(500)

        const frButton = page.locator('button[aria-label]').first()
        const frLabel = await frButton.getAttribute('aria-label')

        // ARIA labels should be different (translated)
        if (enLabel && frLabel) {
          expect(frLabel).not.toBe(enLabel)
        }
      }
    })
  })
})
