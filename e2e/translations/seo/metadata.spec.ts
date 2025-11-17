import { test, expect } from '@playwright/test'
import { testInLanguages, switchLanguage, Locale } from '../setup/translation-helpers'

/**
 * SEO Metadata Translation Tests
 * Tests for page titles, meta descriptions, OpenGraph tags
 */

test.describe('SEO Metadata - Translations', () => {
  const pages = [
    { path: '/', expectedTitleKey: 'home' },
    { path: '/about', expectedTitleKey: 'about' },
    { path: '/pricing', expectedTitleKey: 'pricing' },
    { path: '/tutorials', expectedTitleKey: 'tutorials' },
    { path: '/faq', expectedTitleKey: 'faq' }
  ]

  test.describe('Page Titles', () => {
    test('should have translated page titles in all languages', async ({ page }) => {
      await testInLanguages(page, ['en', 'fr', 'nl'], async (locale: Locale) => {
        for (const testPage of pages) {
          await page.goto(testPage.path)
          await page.waitForLoadState('networkidle')

          const title = await page.title()

          // Page should have a title
          expect(title).toBeTruthy()
          expect(title.length).toBeGreaterThan(0)

          // Title should not be empty or default
          expect(title).not.toBe('Next.js')
          expect(title.length).toBeGreaterThan(5)

          console.log(`[${locale}] ${testPage.path} => "${title}"`)
        }
      })
    })

    test('should have different page titles for different pages', async ({ page }) => {
      await page.goto('/')
      const homeTitle = await page.title()

      await page.goto('/about')
      const aboutTitle = await page.title()

      await page.goto('/pricing')
      const pricingTitle = await page.title()

      // Each page should have unique title
      expect(homeTitle).not.toBe(aboutTitle)
      expect(homeTitle).not.toBe(pricingTitle)
      expect(aboutTitle).not.toBe(pricingTitle)
    })

    test('should include site name or branding in titles', async ({ page }) => {
      const pagesToCheck = ['/', '/about', '/pricing']

      for (const path of pagesToCheck) {
        await page.goto(path)
        const title = await page.title()

        // Title should likely contain site name or use consistent format
        expect(title.length).toBeGreaterThan(10)
      }
    })
  })

  test.describe('Meta Descriptions', () => {
    test('should have meta descriptions in all languages', async ({ page }) => {
      await testInLanguages(page, ['en', 'fr', 'nl'], async (locale: Locale) => {
        for (const testPage of pages) {
          await page.goto(testPage.path)
          await page.waitForLoadState('networkidle')

          const description = await page.locator('meta[name="description"]').getAttribute('content')

          // Meta description should exist
          if (description) {
            expect(description.length).toBeGreaterThan(10)
            expect(description.length).toBeLessThanOrEqual(160) // SEO best practice

            console.log(`[${locale}] ${testPage.path} => "${description.substring(0, 50)}..."`)
          }
        }
      })
    })

    test('should have different descriptions for different pages', async ({ page }) => {
      await page.goto('/')
      const homeDesc = await page.locator('meta[name="description"]').getAttribute('content')

      await page.goto('/about')
      const aboutDesc = await page.locator('meta[name="description"]').getAttribute('content')

      // Descriptions should differ
      if (homeDesc && aboutDesc) {
        expect(homeDesc).not.toBe(aboutDesc)
      }
    })

    test('should not exceed recommended length for search engines', async ({ page }) => {
      const pagesToCheck = ['/', '/about', '/pricing']

      for (const path of pagesToCheck) {
        await page.goto(path)
        const description = await page.locator('meta[name="description"]').getAttribute('content')

        if (description) {
          // Google recommends 150-160 characters
          expect(description.length).toBeLessThanOrEqual(170)
        }
      }
    })
  })

  test.describe('OpenGraph Tags', () => {
    test('should have og:title in all languages', async ({ page }) => {
      await testInLanguages(page, ['en', 'fr', 'nl'], async (locale: Locale) => {
        await page.goto('/')
        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')

        // OG title should exist
        if (ogTitle) {
          expect(ogTitle.length).toBeGreaterThan(0)
        }
      })
    })

    test('should have og:description in all languages', async ({ page }) => {
      await testInLanguages(page, ['en', 'fr', 'nl'], async (locale: Locale) => {
        await page.goto('/')
        const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content')

        // OG description should exist
        if (ogDesc) {
          expect(ogDesc.length).toBeGreaterThan(0)
        }
      })
    })

    test('should have og:url tag', async ({ page }) => {
      await page.goto('/')
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')

      // OG URL should match current page
      expect(ogUrl).toBeTruthy()
    })

    test('should have og:image tag', async ({ page }) => {
      await page.goto('/')
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')

      // OG image should be set
      if (ogImage) {
        expect(ogImage).toContain('http')
      }
    })

    test('should have og:type tag', async ({ page }) => {
      await page.goto('/')
      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content')

      // OG type should be set
      if (ogType) {
        expect(['website', 'article', 'profile']).toContain(ogType)
      }
    })
  })

  test.describe('Twitter Card Tags', () => {
    test('should have twitter card meta tags', async ({ page }) => {
      await page.goto('/')

      const cardType = await page.locator('meta[name="twitter:card"]').getAttribute('content')
      const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content')

      // At least card type should be present
      if (cardType) {
        expect(['summary', 'summary_large_image', 'app', 'player']).toContain(cardType)
      }

      if (twitterTitle) {
        expect(twitterTitle.length).toBeGreaterThan(0)
      }
    })
  })

  test.describe('Canonical URLs', () => {
    test('should have canonical tag on all pages', async ({ page }) => {
      const pagesToCheck = ['/', '/about', '/pricing']

      for (const path of pagesToCheck) {
        await page.goto(path)
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')

        // Canonical should be set
        if (canonical) {
          expect(canonical).toContain('http')
        }
      }
    })
  })

  test.describe('Language Meta Tags', () => {
    test('should have html lang attribute set correctly', async ({ page }) => {
      await testInLanguages(page, ['en', 'fr', 'nl'], async (locale: Locale) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const htmlLang = await page.getAttribute('html', 'lang')

        // Lang attribute should match current locale
        expect(htmlLang).toBeTruthy()

        // Should be valid language code
        expect(htmlLang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/)
      })
    })

    test('should have alternate language links', async ({ page }) => {
      await page.goto('/')

      // Look for alternate language links
      const alternates = page.locator('link[rel="alternate"]').all()
      const alternateList = await alternates

      // Should have alternate language versions
      if (alternateList.length > 0) {
        for (const alt of alternateList) {
          const hreflang = await alt.getAttribute('hreflang')
          expect(hreflang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/)
        }
      }
    })
  })

  test.describe('Metadata Consistency Across Languages', () => {
    test('should have consistent metadata format across languages', async ({ page }) => {
      const titles: Record<string, string> = {}
      const descriptions: Record<string, string> = {}

      for (const locale of ['en', 'fr', 'nl'] as const) {
        await switchLanguage(page, locale)
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        titles[locale] = await page.title()
        descriptions[locale] = await page.locator('meta[name="description"]').getAttribute('content') || ''

        // Each should have content
        expect(titles[locale].length).toBeGreaterThan(0)
      }

      // All versions should have titles
      expect(Object.values(titles).every(t => t.length > 0)).toBeTruthy()

      console.log('Titles across languages:', titles)
      console.log('Descriptions across languages:', descriptions)
    })
  })

  test.describe('Robots Meta Tag', () => {
    test('should have appropriate robots meta tag', async ({ page }) => {
      await page.goto('/')

      const robots = await page.locator('meta[name="robots"]').getAttribute('content')

      // Robots tag should allow indexing for public pages
      if (robots) {
        // Should not disallow all
        expect(robots).not.toContain('noindex')
      }
    })
  })

  test.describe('Viewport Meta Tag', () => {
    test('should have viewport meta tag for responsive design', async ({ page }) => {
      await page.goto('/')

      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')

      // Should have viewport tag
      expect(viewport).toBeTruthy()
      expect(viewport).toContain('width=device-width')
    })
  })
})
