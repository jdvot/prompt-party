import { test, expect } from '@playwright/test'
import { switchLanguage, testInAllLanguages, Locale } from '../setup/translation-helpers'
import {
  setViewport,
  takeVisualSnapshot,
  checkForTextOverflow,
  checkForTextCutoff,
  validateInteractiveElementSizes,
  checkHorizontalScroll,
  generateVisualReport,
  DEFAULT_VIEWPORTS
} from '../setup/visual-config'

/**
 * Visual Regression Tests for Translations
 * Tests for layout issues caused by translated text of different lengths
 * Screenshots are compared with baselines to detect visual regressions
 */

test.describe('Visual Regression - Layout with Translations', () => {
  test.describe('Desktop Layout Snapshots', () => {
    const pages = ['/', '/about', '/pricing', '/tutorials', '/collections']

    for (const path of pages) {
      test(`${path} should match visual baseline in all languages`, async ({ page }) => {
        await testInAllLanguages(page, async (locale: Locale) => {
          await setViewport(page, 'desktop')
          await page.goto(path)
          await page.waitForLoadState('networkidle')

          // Take screenshot for visual regression
          await takeVisualSnapshot(page, `page${path.replace(/\//g, '-')}`, locale, {
            viewportName: 'desktop'
          })
        })
      })
    }
  })

  test.describe('Mobile Layout Snapshots', () => {
    const pages = ['/', '/tutorials', '/collections']

    for (const path of pages) {
      test(`${path} mobile layout should match baseline in all languages`, async ({ page }) => {
        await testInAllLanguages(page, async (locale: Locale) => {
          await setViewport(page, 'mobile')
          await page.goto(path)
          await page.waitForLoadState('networkidle')

          await takeVisualSnapshot(page, `page${path.replace(/\//g, '-')}`, locale, {
            viewportName: 'mobile'
          })
        })
      })
    }
  })

  test.describe('Text Overflow Detection', () => {
    test('should not have text overflow on home page in any language', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const overflows = await checkForTextOverflow(page)

        if (overflows.length > 0) {
          console.warn(`[${locale}] Text overflow detected:`, overflows)
        }

        // Allow minor overflows but flag them
        expect(overflows.length).toBeLessThan(5)
      })
    })

    test('should not have text overflow on pricing page in any language', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/pricing')
        await page.waitForLoadState('networkidle')

        const overflows = await checkForTextOverflow(page)

        if (overflows.length > 0) {
          console.warn(`[${locale}] Pricing text overflow:`, overflows)
        }

        expect(overflows.length).toBeLessThan(3)
      })
    })

    test('should not have text overflow on tutorials page in any language', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/tutorials')
        await page.waitForLoadState('networkidle')

        const overflows = await checkForTextOverflow(page)

        if (overflows.length > 0) {
          console.warn(`[${locale}] Tutorials text overflow:`, overflows)
        }

        expect(overflows.length).toBeLessThan(3)
      })
    })
  })

  test.describe('Text Cutoff Detection', () => {
    test('should not cut off text with line clamping on cards', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/tutorials')
        await page.waitForLoadState('networkidle')

        const cutoffs = await checkForTextCutoff(page)

        if (cutoffs.length > 0) {
          console.warn(`[${locale}] Text cutoff detected:`, cutoffs)
        }

        // Line clamps are expected but should be reasonable
        expect(cutoffs.length).toBeLessThanOrEqual(20)
      })
    })
  })

  test.describe('Interactive Element Sizing', () => {
    test('should have adequate button sizes in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/pricing')
        await page.waitForLoadState('networkidle')

        const sizeIssues = await validateInteractiveElementSizes(page)

        if (sizeIssues.length > 0) {
          console.warn(`[${locale}] Button size issues:`, sizeIssues)
        }

        // Should have minimal sizing issues
        expect(sizeIssues.length).toBeLessThan(3)
      })
    })

    test('should have adequate form input sizes in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        const sizeIssues = await validateInteractiveElementSizes(page)

        expect(sizeIssues.length).toBeLessThan(2)
      })
    })
  })

  test.describe('Horizontal Scroll Detection', () => {
    test('should not have horizontal scroll on desktop views', async ({ page }) => {
      const pages = ['/', '/about', '/pricing', '/tutorials']

      for (const path of pages) {
        await setViewport(page, 'desktop')
        await page.goto(path)
        await page.waitForLoadState('networkidle')

        const hasHScroll = await checkHorizontalScroll(page)
        expect(hasHScroll).toBeFalsy()
      }
    })

    test('should not have horizontal scroll on tablet views in any language', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await setViewport(page, 'tablet')

        const pages = ['/', '/tutorials']
        for (const path of pages) {
          await page.goto(path)
          const hasHScroll = await checkHorizontalScroll(page)

          expect(hasHScroll).toBeFalsy()
        }
      })
    })

    test('should not have horizontal scroll on mobile views in any language', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await setViewport(page, 'mobile')

        const pages = ['/', '/tutorials', '/collections']
        for (const path of pages) {
          await page.goto(path)
          const hasHScroll = await checkHorizontalScroll(page)

          expect(hasHScroll).toBeFalsy()
        }
      })
    })
  })

  test.describe('Responsive Layout Validation', () => {
    test('should maintain layout integrity across viewport sizes', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        for (const viewport of Object.keys(DEFAULT_VIEWPORTS) as Array<keyof typeof DEFAULT_VIEWPORTS>) {
          await setViewport(page, viewport)
          await page.goto('/')
          await page.waitForLoadState('networkidle')

          // Check for horizontal scroll
          const hasHScroll = await checkHorizontalScroll(page)
          expect(hasHScroll).toBeFalsy()

          // Check for major layout issues
          const overflows = await checkForTextOverflow(page)
          expect(overflows.length).toBeLessThan(10)
        }
      })
    })
  })

  test.describe('Button Layout Consistency', () => {
    test('should have consistent button alignment in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/pricing')
        await page.waitForLoadState('networkidle')

        const buttons = await page.locator('button:visible').all()

        if (buttons.length > 1) {
          // Get bounds of first two buttons
          const box1 = await buttons[0].boundingBox()
          const box2 = await buttons[1].boundingBox()

          if (box1 && box2) {
            // Buttons should have similar heights (allowing small variation)
            const heightDiff = Math.abs(box1.height - box2.height)
            expect(heightDiff).toBeLessThan(10) // Allow 10px variance
          }
        }
      })
    })
  })

  test.describe('Form Layout Consistency', () => {
    test('should maintain form field alignment in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/signup')
        await page.waitForLoadState('networkidle')

        const inputs = await page.locator('input, textarea').all()

        if (inputs.length > 1) {
          // All form fields should start at same x position
          const xPositions = []

          for (const input of inputs) {
            const box = await input.boundingBox()
            if (box) {
              xPositions.push(box.x)
            }
          }

          if (xPositions.length > 1) {
            // Positions should be aligned (within 5px)
            const minX = Math.min(...xPositions)
            const maxX = Math.max(...xPositions)
            expect(maxX - minX).toBeLessThan(5)
          }
        }
      })
    })
  })

  test.describe('Navigation Layout Stability', () => {
    test('should maintain navigation layout in all languages', async ({ page }) => {
      const navHeight: Record<Locale, number> = { en: 0, fr: 0, nl: 0 }

      for (const locale of ['en', 'fr', 'nl'] as const) {
        await switchLanguage(page, locale)
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const nav = page.locator('nav, header').first()
        const box = await nav.boundingBox()

        if (box) {
          navHeight[locale] = box.height
        }
      }

      // Navigation heights should be similar
      const heights = Object.values(navHeight).filter(h => h > 0)
      if (heights.length > 1) {
        const minHeight = Math.min(...heights)
        const maxHeight = Math.max(...heights)

        // Allow up to 20% variation in nav height
        const variation = (maxHeight - minHeight) / minHeight
        expect(variation).toBeLessThan(0.2)
      }
    })
  })

  test.describe('Visual Regression Reports', () => {
    test('should generate visual report for home page in all languages', async ({ page }) => {
      for (const locale of ['en', 'fr', 'nl'] as const) {
        await switchLanguage(page, locale)
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const report = await generateVisualReport(page, 'Home', locale)
        console.log(report)

        // Report should be generated without errors
        expect(report).toContain('Home')
        expect(report).toContain(locale.toUpperCase())
      }
    })

    test('should generate visual report for pricing page in all languages', async ({ page }) => {
      for (const locale of ['en', 'fr', 'nl'] as const) {
        await switchLanguage(page, locale)
        await page.goto('/pricing')
        await page.waitForLoadState('networkidle')

        const report = await generateVisualReport(page, 'Pricing', locale)
        console.log(report)

        expect(report).toContain('Pricing')
        expect(report).toContain(locale.toUpperCase())
      }
    })
  })

  test.describe('Typography Consistency', () => {
    test('should maintain readable font sizes in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/')

        const bodyText = page.locator('p').first()
        const fontSize = await bodyText.evaluate((el: HTMLElement) => {
          return window.getComputedStyle(el).fontSize
        })

        const pixelSize = parseInt(fontSize)
        expect(pixelSize).toBeGreaterThanOrEqual(14) // Minimum readable size
      })
    })

    test('should have consistent line heights in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/tutorials')

        const paragraphs = page.locator('p').all()
        const paras = await paragraphs

        if (paras.length > 0) {
          const lineHeight = await paras[0].evaluate((el: HTMLElement) => {
            return window.getComputedStyle(el).lineHeight
          })

          expect(lineHeight).toBeTruthy()
          // Line height should be > 1 for readability
          const lineHeightNum = parseFloat(lineHeight)
          expect(lineHeightNum).toBeGreaterThan(1)
        }
      })
    })
  })

  test.describe('Card Layout Consistency', () => {
    test('should maintain card heights in grid layout across languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/tutorials')
        await page.waitForLoadState('networkidle')

        const cards = await page.locator('[class*="card"]').all()

        if (cards.length > 1) {
          const heights = []

          for (const card of cards.slice(0, 4)) {
            const box = await card.boundingBox()
            if (box) {
              heights.push(box.height)
            }
          }

          if (heights.length > 1) {
            // Cards should have similar heights (with some tolerance for content)
            const minHeight = Math.min(...heights)
            const maxHeight = Math.max(...heights)

            // Allow 30% variation (content heavy cards may vary)
            const variation = (maxHeight - minHeight) / minHeight
            expect(variation).toBeLessThan(0.3)
          }
        }
      })
    })
  })
})
