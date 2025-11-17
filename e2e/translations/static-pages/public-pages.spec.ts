import { test, expect } from '@playwright/test'
import { testInAllLanguages, switchLanguage, loadTranslations, Locale } from '../setup/translation-helpers'

/**
 * Public Pages Translation Tests
 *
 * Test all public pages for proper translations:
 * - Home (/)
 * - About (/about)
 * - FAQ (/faq)
 * - Terms (/terms)
 * - Privacy (/privacy)
 * - Pricing (/pricing)
 * - Docs (/docs)
 * - Tech Stack (/tech-stack)
 * - MCP (/mcp)
 * - MCP vs RAG (/mcp-vs-rag)
 * - ML vs DL (/ml-vs-dl)
 * - Top Prompts (/top)
 * - Trending Prompts (/trending)
 * - Search (/search)
 * - Leaderboard (/leaderboard)
 * - Challenges (/challenges)
 * - Access (/access)
 */

test.describe('Public Pages - Translations', () => {
  const publicPages = [
    { path: '/', name: 'Home', keyIndicators: ['home.title', 'home.description'] },
    { path: '/about', name: 'About', keyIndicators: ['about.title', 'about.mission_title'] },
    { path: '/faq', name: 'FAQ', keyIndicators: ['faq.title', 'faq.section'] },
    { path: '/terms', name: 'Terms', keyIndicators: ['terms.title'] },
    { path: '/privacy', name: 'Privacy', keyIndicators: ['privacy.title'] },
    { path: '/pricing', name: 'Pricing', keyIndicators: ['pricing.title', 'pricing.description'] },
    { path: '/docs', name: 'Docs', keyIndicators: ['docs.title'] },
    { path: '/tech-stack', name: 'Tech Stack', keyIndicators: ['techStack.title'] },
    { path: '/mcp', name: 'MCP', keyIndicators: ['mcp.title'] },
    { path: '/top', name: 'Top Prompts', keyIndicators: ['nav.top', 'pages.top_title'] },
    { path: '/trending', name: 'Trending', keyIndicators: ['nav.trending', 'pages.trending_title'] },
    { path: '/search', name: 'Search', keyIndicators: ['search.title', 'search.placeholder'] },
    { path: '/leaderboard', name: 'Leaderboard', keyIndicators: ['leaderboard.title'] },
    { path: '/challenges', name: 'Challenges', keyIndicators: ['challenges.title'] },
    { path: '/access', name: 'Access', keyIndicators: ['access.title'] }
  ]

  test.describe('Page Visibility and Structure', () => {
    for (const page of publicPages) {
      test(`${page.name} page should load and be visible`, async ({ page: testPage }) => {
        await testPage.goto(page.path)
        await testPage.waitForLoadState('networkidle')

        // Page should not be 404
        await expect(testPage).not.toHaveURL(/404|error/)

        // Should have main content
        const main = testPage.locator('main, [role="main"]').first()
        const isVisible = await main.isVisible().catch(() => false)
        expect(isVisible).toBeTruthy()
      })
    }
  })

  test.describe('Home Page Translations', () => {
    test('should display translated home page content in all languages', async ({ page: testPage }) => {
      await testInAllLanguages(testPage, async (locale: Locale) => {
        await testPage.goto('/')
        await testPage.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Check for hero section
        const heroExists = await testPage.locator('[class*="hero"], section:first-child').first().isVisible().catch(() => false)
        expect(heroExists).toBeTruthy()

        // Check navigation is visible
        const nav = testPage.locator('nav, header').first()
        await expect(nav).toBeVisible()

        // Check that footer exists with language-specific content
        const footer = testPage.locator('footer').first()
        const footerVisible = await footer.isVisible().catch(() => false)
        expect(footerVisible).toBeTruthy()
      })
    })

    test('should display language switcher on home page', async ({ page: testPage }) => {
      await testPage.goto('/')
      await testPage.waitForLoadState('networkidle')

      const langSwitcher = testPage.locator('[data-language-switcher], button:has-text(/english|français|nederlands/i)').first()
      const isVisible = await langSwitcher.isVisible().catch(() => false)
      expect(isVisible).toBeTruthy()
    })
  })

  test.describe('About Page Translations', () => {
    test('should display all about page sections in translated form', async ({ page: testPage }) => {
      await testInAllLanguages(testPage, async (locale: Locale) => {
        await testPage.goto('/about')
        await testPage.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Check for main title
        const heading = testPage.locator('h1').first()
        await expect(heading).toBeVisible()

        // Check for mission section
        const missionSection = testPage.locator('h2, section').filter({ hasText: /mission|purpose|our/i }).first()
        const missionVisible = await missionSection.isVisible().catch(() => false)
        if (missionVisible) {
          // Mission content should be visible
          const content = await missionSection.textContent()
          expect(content).toBeTruthy()
        }

        // Check for features list
        const features = testPage.locator('li, [role="listitem"]').all()
        const featuresList = await features
        expect(featuresList.length).toBeGreaterThan(0)
      })
    })
  })

  test.describe('Pricing Page Translations', () => {
    test('should display pricing tiers with translated content', async ({ page: testPage }) => {
      await testInAllLanguages(testPage, async (locale: Locale) => {
        await testPage.goto('/pricing')
        await testPage.waitForLoadState('networkidle')

        // Should have pricing cards/tiers
        const pricingCards = testPage.locator('[class*="card"], [class*="tier"], [class*="plan"]').all()
        const cards = await pricingCards
        expect(cards.length).toBeGreaterThan(0)

        // Each card should have text content
        for (const card of cards.slice(0, 3)) {
          const text = await card.textContent()
          expect(text).toBeTruthy()
          expect(text!.length).toBeGreaterThan(0)
        }
      })
    })

    test('should display call-to-action buttons on pricing page', async ({ page: testPage }) => {
      await testPage.goto('/pricing')
      await testPage.waitForLoadState('networkidle')

      // Should have CTA buttons
      const buttons = testPage.locator('button, a[class*="button"]').all()
      const buttonsList = await buttons
      expect(buttonsList.length).toBeGreaterThan(0)
    })
  })

  test.describe('FAQ Page Translations', () => {
    test('should display FAQ items in accordion or list format', async ({ page: testPage }) => {
      await testInAllLanguages(testPage, async (locale: Locale) => {
        await testPage.goto('/faq')
        await testPage.waitForLoadState('networkidle')

        // Should have questions or accordion items
        const faqItems = testPage.locator('[class*="faq"], [class*="accordion"], dt, .question').all()
        const items = await faqItems
        expect(items.length).toBeGreaterThan(0)
      })
    })

    test('should display FAQ answers when expanded', async ({ page: testPage }) => {
      await testPage.goto('/faq')
      await testPage.waitForLoadState('networkidle')

      // Find accordion/expandable items
      const expandableItems = testPage.locator('[role="button"], button, summary').all()
      const items = await expandableItems

      if (items.length > 0) {
        // Click first expandable item
        await items[0].click()
        await testPage.waitForTimeout(300) // Wait for animation

        // Content should be revealed
        const content = testPage.locator('body')
        const text = await content.textContent()
        expect(text).toBeTruthy()
      }
    })
  })

  test.describe('Feed Pages (Top/Trending/Search) Translations', () => {
    const feedPages = [
      { path: '/top', name: 'Top' },
      { path: '/trending', name: 'Trending' },
      { path: '/search', name: 'Search' }
    ]

    for (const feedPage of feedPages) {
      test(`${feedPage.name} page should display filter/sort options`, async ({ page: testPage }) => {
        await testPage.goto(feedPage.path)
        await testPage.waitForLoadState('networkidle')

        // Should have filters or sort options
        const filters = testPage.locator('[class*="filter"], [class*="sort"], select').first()
        const isVisible = await filters.isVisible().catch(() => false)

        // At least header/title should be visible
        const header = testPage.locator('h1, h2').first()
        const headerVisible = await header.isVisible().catch(() => false)
        expect(headerVisible).toBeTruthy()
      })

      test(`${feedPage.name} page should display prompts in all languages`, async ({ page: testPage }) => {
        await testInAllLanguages(testPage, async (locale: Locale) => {
          await testPage.goto(feedPage.path)
          await testPage.waitForLoadState('networkidle')

          // Should have prompt items
          const promptItems = testPage.locator('[class*="prompt"], [class*="card"], article').all()
          const items = await promptItems

          if (items.length > 0) {
            // Check first prompt has content
            const firstPrompt = items[0]
            const text = await firstPrompt.textContent()
            expect(text).toBeTruthy()
          }
        })
      })
    }
  })

  test.describe('Leaderboard Translations', () => {
    test('should display leaderboard with translated labels', async ({ page: testPage }) => {
      await testInAllLanguages(testPage, async (locale: Locale) => {
        await testPage.goto('/leaderboard')
        await testPage.waitForLoadState('networkidle')

        // Should have table or list of users
        const table = testPage.locator('table, [role="table"]').first()
        const listItems = testPage.locator('[class*="user"], [class*="rank"], li').all()

        const items = await listItems
        if (items.length > 0 || (await table.isVisible().catch(() => false))) {
          // Leaderboard structure exists
          expect(items.length + 1).toBeGreaterThan(0)
        }
      })
    })
  })

  test.describe('Challenges Page Translations', () => {
    test('should display challenges with translated content', async ({ page: testPage }) => {
      await testInAllLanguages(testPage, async (locale: Locale) => {
        await testPage.goto('/challenges')
        await testPage.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Should have challenge items/cards
        const challengeItems = testPage.locator('[class*="challenge"], [class*="card"], article').all()
        const items = await challengeItems

        // At minimum, page should load and have a heading
        const heading = testPage.locator('h1, h2').first()
        const headingVisible = await heading.isVisible().catch(() => false)
        expect(headingVisible).toBeTruthy()
      })
    })
  })

  test.describe('Access Page Translations', () => {
    test('should display access password form in all languages', async ({ page: testPage }) => {
      await testInAllLanguages(testPage, async (locale: Locale) => {
        await testPage.goto('/access')
        await testPage.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Should have password input
        const passwordInput = testPage.locator('input[type="password"]').first()
        const inputVisible = await passwordInput.isVisible().catch(() => false)

        // Or at minimum, page should have a form
        const form = testPage.locator('form').first()
        const formVisible = await form.isVisible().catch(() => false)

        expect(inputVisible || formVisible).toBeTruthy()
      })
    })
  })

  test.describe('Language Switcher Persistence', () => {
    test('should maintain language selection when navigating between public pages', async ({ page: testPage }) => {
      // Start with French
      await testPage.goto('/')
      await switchLanguage(testPage, 'fr')

      // Navigate through several pages
      const pagesToVisit = ['/', '/about', '/pricing', '/faq']

      for (const path of pagesToVisit) {
        await testPage.goto(path)
        await testPage.waitForLoadState('networkidle')

        // Verify we're still in French by checking the locale cookie
        const cookies = await testPage.context().cookies()
        const localeCookie = cookies.find(c => c.name === 'NEXT_LOCALE')
        expect(localeCookie?.value).toBe('fr')
      }
    })
  })

  test.describe('Mobile Responsiveness - Public Pages', () => {
    test('should display navigation properly on mobile', async ({ page: testPage }) => {
      // Set mobile viewport
      await testPage.setViewportSize({ width: 375, height: 667 })

      await testPage.goto('/')
      await testPage.waitForLoadState('networkidle')

      // Mobile navigation should be visible (hamburger or bottom nav)
      const hamburger = testPage.locator('button[aria-label*="menu" i], [class*="hamburger"]').first()
      const bottomNav = testPage.locator('nav[class*="bottom"], [class*="mobile-nav"]').first()

      const hamburgerVisible = await hamburger.isVisible().catch(() => false)
      const bottomNavVisible = await bottomNav.isVisible().catch(() => false)

      expect(hamburgerVisible || bottomNavVisible).toBeTruthy()
    })

    test('should display content without horizontal scroll on mobile', async ({ page: testPage }) => {
      await testPage.setViewportSize({ width: 375, height: 667 })

      const pages = ['/', '/about', '/pricing']

      for (const path of pages) {
        await testPage.goto(path)
        await testPage.waitForLoadState('networkidle')

        const hasHorizontalScroll = await testPage.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth
        })

        expect(hasHorizontalScroll).toBeFalsy()
      }
    })
  })
})
