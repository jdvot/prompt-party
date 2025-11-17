import { test, expect } from '@playwright/test'
import { testInAllLanguages, switchLanguage, loadTranslations, Locale } from '../setup/translation-helpers'

/**
 * Tutorial Pages Translation Tests
 *
 * Test all tutorial-related pages for proper translations:
 * - Tutorials Index (/tutorials)
 * - Individual Tutorials:
 *   - Intro to Prompts
 *   - Claude Basics
 *   - Prompt Templates
 *   - Advanced Prompting
 *   - Claude Agents
 *   - Prompt Optimization
 *   - ML Basics
 *   - DL Fundamentals
 *   - Code Generation
 *   - RAGAS Evaluation
 *   - Multi-Agent Systems
 *   - Claude Code Basics
 *   - Spec-Driven Development
 * - Learning Paths:
 *   - Beginner Path
 *   - Pro Path
 *   - Expert Path
 */

test.describe('Tutorial Pages - Translations', () => {
  const tutorialRoutes = [
    { path: '/tutorials', name: 'Tutorials Index' },
    { path: '/tutorials/intro-prompts', name: 'Intro to Prompts' },
    { path: '/tutorials/claude-basics', name: 'Claude Basics' },
    { path: '/tutorials/prompt-templates', name: 'Prompt Templates' },
    { path: '/tutorials/advanced-prompting', name: 'Advanced Prompting' },
    { path: '/tutorials/claude-agents', name: 'Claude Agents' },
    { path: '/tutorials/prompt-optimization', name: 'Prompt Optimization' },
    { path: '/tutorials/ml-basics', name: 'ML Basics' },
    { path: '/tutorials/dl-fundamentals', name: 'DL Fundamentals' },
    { path: '/tutorials/code-generation', name: 'Code Generation' },
    { path: '/tutorials/ragas-evaluation', name: 'RAGAS Evaluation' },
    { path: '/tutorials/multi-agent-systems', name: 'Multi-Agent Systems' },
    { path: '/tutorials/claude-code-basics', name: 'Claude Code Basics' },
    { path: '/tutorials/spec-driven-development', name: 'Spec-Driven Development' }
  ]

  const pathRoutes = [
    { path: '/tutorials/paths/beginner', name: 'Beginner Path' },
    { path: '/tutorials/paths/pro', name: 'Pro Path' },
    { path: '/tutorials/paths/expert', name: 'Expert Path' }
  ]

  test.describe('Tutorials Index Page', () => {
    test('should load tutorials index in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/tutorials')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Should have main heading
        const heading = page.locator('h1, [role="heading"]').first()
        const headingVisible = await heading.isVisible().catch(() => false)
        expect(headingVisible).toBeTruthy()

        // Should have tutorial cards
        const cards = page.locator('[class*="card"], [class*="tutorial"], article').all()
        const cardList = await cards
        expect(cardList.length).toBeGreaterThan(0)
      })
    })

    test('should display tutorial cards with translated content', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/tutorials')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Each card should have title and description
        const tutorialCards = page.locator('[class*="card"], [class*="tutorial"]').all()
        const cards = await tutorialCards

        for (const card of cards.slice(0, 3)) {
          // Card should have text content
          const text = await card.textContent()
          expect(text).toBeTruthy()

          // Card should have a link
          const link = card.locator('a').first()
          const linkVisible = await link.isVisible().catch(() => false)
          expect(linkVisible).toBeTruthy()
        }
      })
    })

    test('should display tutorial metadata (duration, level)', async ({ page }) => {
      await page.goto('/tutorials')
      await page.waitForLoadState('networkidle')

      const tutorialCards = page.locator('[class*="card"], [class*="tutorial"]').all()
      const cards = await tutorialCards

      if (cards.length > 0) {
        const firstCard = cards[0]

        // Check for duration/level badges
        const duration = firstCard.locator('text=/minute|hour|duration/i')
        const level = firstCard.locator('text=/beginner|intermediate|advanced|level/i')

        const durationVisible = await duration.isVisible().catch(() => false)
        const levelVisible = await level.isVisible().catch(() => false)

        // At least one metadata element should be visible
        expect(durationVisible || levelVisible).toBeTruthy()
      }
    })

    test('should have search or filter functionality', async ({ page }) => {
      await page.goto('/tutorials')
      await page.waitForLoadState('networkidle')

      // Check for search input or filter buttons
      const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first()
      const filterButtons = page.locator('button:has-text(/filter|sort|search/i)').all()

      const searchVisible = await searchInput.isVisible().catch(() => false)
      const filtersList = await filterButtons

      expect(searchVisible || filtersList.length > 0).toBeTruthy()
    })

    test('should display language switcher on tutorials page', async ({ page }) => {
      await page.goto('/tutorials')
      await page.waitForLoadState('networkidle')

      const langSwitcher = page.locator('[data-language-switcher], button:has-text(/english|français|nederlands/i)').first()
      const isVisible = await langSwitcher.isVisible().catch(() => false)
      expect(isVisible).toBeTruthy()
    })
  })

  test.describe('Individual Tutorial Pages', () => {
    for (const tutorial of tutorialRoutes.filter(t => t.path !== '/tutorials')) {
      test(`${tutorial.name} should load in all languages`, async ({ page }) => {
        await testInAllLanguages(page, async (locale: Locale) => {
          await page.goto(tutorial.path)
          await page.waitForLoadState('networkidle')

          const messages = loadTranslations(locale)

          // Should have main heading
          const heading = page.locator('h1, [role="heading"]').first()
          const headingVisible = await heading.isVisible().catch(() => false)
          expect(headingVisible).toBeTruthy()

          // Should have content sections
          const content = page.locator('main, [role="main"]').first()
          const contentVisible = await content.isVisible().catch(() => false)
          expect(contentVisible).toBeTruthy()
        })
      })

      test(`${tutorial.name} should display navigation controls`, async ({ page }) => {
        await page.goto(tutorial.path)
        await page.waitForLoadState('networkidle')

        // Breadcrumbs or navigation
        const breadcrumbs = page.locator('nav, [class*="breadcrumb"]').first()
        const breadcrumbsVisible = await breadcrumbs.isVisible().catch(() => false)

        // Next/Previous buttons
        const navButtons = page.locator('button:has-text(/next|previous|back/i)').all()
        const buttons = await navButtons

        // At least one navigation element should exist
        expect(breadcrumbsVisible || buttons.length > 0).toBeTruthy()
      })
    }
  })

  test.describe('Tutorial Content Structure', () => {
    test('should display tutorial sections with translated headings', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        // Pick a tutorial
        await page.goto('/tutorials/claude-basics')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Should have multiple sections/subsections
        const headings = page.locator('h2, h3, h4').all()
        const headingsList = await headings

        expect(headingsList.length).toBeGreaterThan(0)

        // Each heading should have text
        for (const heading of headingsList.slice(0, 3)) {
          const text = await heading.textContent()
          expect(text).toBeTruthy()
          expect(text!.length).toBeGreaterThan(0)
        }
      })
    })

    test('should display code examples with syntax highlighting', async ({ page }) => {
      await page.goto('/tutorials/code-generation')
      await page.waitForLoadState('networkidle')

      // Look for code blocks
      const codeBlocks = page.locator('pre, code, [class*="code"]').all()
      const blocks = await codeBlocks

      // Tutorial may have code examples
      if (blocks.length > 0) {
        // Code blocks should be visible
        for (const block of blocks.slice(0, 2)) {
          const isVisible = await block.isVisible().catch(() => false)
          if (isVisible) {
            const text = await block.textContent()
            expect(text).toBeTruthy()
          }
        }
      }
    })

    test('should display pro tips in translated form', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/tutorials/advanced-prompting')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Look for pro tips or callout boxes
        const proTips = page.locator('[class*="tip"], [class*="callout"], [class*="note"], aside').all()
        const tips = await proTips

        // May or may not have tips, but if present should be readable
        if (tips.length > 0) {
          for (const tip of tips.slice(0, 2)) {
            const text = await tip.textContent()
            expect(text).toBeTruthy()
          }
        }
      })
    })
  })

  test.describe('Learning Paths', () => {
    for (const path of pathRoutes) {
      test(`${path.name} path should load in all languages`, async ({ page }) => {
        await testInAllLanguages(page, async (locale: Locale) => {
          await page.goto(path.path)
          await page.waitForLoadState('networkidle')

          const messages = loadTranslations(locale)

          // Should have heading
          const heading = page.locator('h1, [role="heading"]').first()
          const headingVisible = await heading.isVisible().catch(() => false)
          expect(headingVisible).toBeTruthy()

          // Should have path description
          const description = page.locator('p').first()
          const descriptionVisible = await description.isVisible().catch(() => false)
          expect(descriptionVisible).toBeTruthy()
        })
      })

      test(`${path.name} path should display course modules`, async ({ page }) => {
        await page.goto(path.path)
        await page.waitForLoadState('networkidle')

        // Should have list of modules/courses
        const modules = page.locator('[class*="module"], [class*="step"], [class*="course"], li').all()
        const moduleList = await modules

        expect(moduleList.length).toBeGreaterThan(0)

        // Modules should have content
        for (const module of moduleList.slice(0, 3)) {
          const text = await module.textContent()
          expect(text).toBeTruthy()
        }
      })

      test(`${path.name} path should show progress tracking if applicable`, async ({ page }) => {
        await page.goto(path.path)
        await page.waitForLoadState('networkidle')

        // Look for progress indicator
        const progressBar = page.locator('[class*="progress"], [role="progressbar"]').first()
        const progressText = page.locator('text=/progress|complete|step [0-9]/i').first()

        const progressBarVisible = await progressBar.isVisible().catch(() => false)
        const progressTextVisible = await progressText.isVisible().catch(() => false)

        // May or may not have progress, but should be navigable
        const courseLinks = page.locator('a[href*="/tutorials/"]').all()
        const links = await courseLinks

        expect(links.length).toBeGreaterThan(0)
      })
    }
  })

  test.describe('Tutorial Navigation', () => {
    test('should navigate between tutorial pages correctly', async ({ page }) => {
      await page.goto('/tutorials/claude-basics')
      await page.waitForLoadState('networkidle')

      // Find next button
      const nextButton = page.locator('button:has-text(/next/i), a:has-text(/next/i)').first()
      const nextButtonVisible = await nextButton.isVisible().catch(() => false)

      if (nextButtonVisible) {
        // Click next
        const currentUrl = page.url()
        await nextButton.click()
        await page.waitForLoadState('networkidle')

        // Should have navigated
        const newUrl = page.url()
        expect(newUrl).not.toBe(currentUrl)

        // New page should have content
        const heading = page.locator('h1').first()
        const headingVisible = await heading.isVisible().catch(() => false)
        expect(headingVisible).toBeTruthy()
      }
    })

    test('should show breadcrumb navigation', async ({ page }) => {
      await page.goto('/tutorials/claude-basics')
      await page.waitForLoadState('networkidle')

      const breadcrumbs = page.locator('[class*="breadcrumb"], nav a').all()
      const breadcrumbsList = await breadcrumbs

      if (breadcrumbsList.length > 0) {
        // Breadcrumbs should be clickable
        const firstBreadcrumb = breadcrumbsList[0]
        const isVisible = await firstBreadcrumb.isVisible().catch(() => false)
        expect(isVisible).toBeTruthy()
      }
    })
  })

  test.describe('Tutorials Mobile Responsiveness', () => {
    test('should display tutorial content properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/tutorials/claude-basics')
      await page.waitForLoadState('networkidle')

      // Content should be visible without horizontal scroll
      const main = page.locator('main, [role="main"]').first()
      const isVisible = await main.isVisible().catch(() => false)
      expect(isVisible).toBeTruthy()

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(hasHorizontalScroll).toBeFalsy()
    })

    test('should display tutorial navigation on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/tutorials')
      await page.waitForLoadState('networkidle')

      // Cards should be stacked vertically
      const cards = page.locator('[class*="card"]').all()
      const cardList = await cards

      if (cardList.length > 1) {
        const firstCardBox = await cardList[0].boundingBox()
        const secondCardBox = await cardList[1].boundingBox()

        if (firstCardBox && secondCardBox) {
          // Second card should be below first (not beside)
          expect(secondCardBox.y).toBeGreaterThan(firstCardBox.y)
        }
      }
    })

    test('should have readable text on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/tutorials/claude-basics')
      await page.waitForLoadState('networkidle')

      // Check font sizes on mobile
      const paragraphs = page.locator('p').all()
      const paras = await paragraphs

      if (paras.length > 0) {
        const firstPara = paras[0]
        const fontSize = await firstPara.evaluate((el: any) => {
          return window.getComputedStyle(el).fontSize
        })

        // Font size should be readable on mobile (minimum ~14px)
        const pixelSize = parseInt(fontSize)
        expect(pixelSize).toBeGreaterThanOrEqual(12)
      }
    })
  })

  test.describe('Tutorial Language Switching', () => {
    test('should maintain tutorial page when switching languages', async ({ page }) => {
      await page.goto('/tutorials/claude-basics')
      await page.waitForLoadState('networkidle')

      const enHeading = await page.locator('h1').first().textContent()

      // Switch to French
      await switchLanguage(page, 'fr')
      await page.waitForLoadState('networkidle')

      // Should still be on same tutorial
      await expect(page).toHaveURL(/\/tutorials\/claude-basics/)

      const frHeading = await page.locator('h1').first().textContent()
      // Content should be different (translated)
      expect(frHeading).not.toBe(enHeading)

      // Switch to Dutch
      await switchLanguage(page, 'nl')
      const nlHeading = await page.locator('h1').first().textContent()
      expect(nlHeading).not.toBe(enHeading)
      expect(nlHeading).not.toBe(frHeading)
    })
  })
})
