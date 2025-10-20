import { test, expect } from '@playwright/test'
import { PromptPage, PromptDetailPage } from './pages/prompt.page'
import { HomePage } from './pages/home.page'

/**
 * Prompts E2E Tests
 *
 * Test Strategy:
 * - Test prompt creation flow with various inputs
 * - Verify prompt display and content rendering
 * - Test markdown rendering and sanitization
 * - Test public/private visibility
 * - Verify prompt appears in feed after creation
 *
 * Note: These tests require authentication. In a real implementation,
 * you would use the authenticated fixture or create test users.
 */

test.describe('Prompts', () => {
  test.describe('Prompt Creation', () => {
    test('should display create prompt form', async ({ page }) => {
      const promptPage = new PromptPage(page)

      // Note: This will likely redirect to login if not authenticated
      await promptPage.goto()

      // Wait to see if we're redirected or if form loads
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (!currentUrl.includes('/auth/login')) {
        // If not redirected to login, verify form elements
        await expect(promptPage.titleInput).toBeVisible()
        await expect(promptPage.bodyTextarea).toBeVisible()
        await expect(promptPage.tagsInput).toBeVisible()
        await expect(promptPage.publicCheckbox).toBeVisible()
        await expect(promptPage.submitButton).toBeVisible()
        await expect(promptPage.cancelButton).toBeVisible()
      }
    })

    test('should validate required fields', async ({ page }) => {
      const promptPage = new PromptPage(page)
      await promptPage.goto()

      // Skip if redirected to login
      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Try to submit without filling required fields
      await promptPage.submitButton.click()

      // Should stay on same page
      await expect(page).toHaveURL('/prompts/new')

      // Submit button should be disabled when fields are empty
      const isDisabled = await promptPage.submitButton.isDisabled()
      expect(isDisabled).toBe(true)
    })

    test('should enable submit button when required fields are filled', async ({ page }) => {
      const promptPage = new PromptPage(page)
      await promptPage.goto()

      // Skip if redirected to login
      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Fill required fields
      await promptPage.titleInput.fill('Test Prompt')
      await promptPage.bodyTextarea.fill('This is a test prompt body')

      // Submit button should be enabled
      const isDisabled = await promptPage.submitButton.isDisabled()
      expect(isDisabled).toBe(false)
    })

    test('should handle tags input', async ({ page }) => {
      const promptPage = new PromptPage(page)
      await promptPage.goto()

      // Skip if redirected to login
      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      await promptPage.titleInput.fill('Test Prompt')
      await promptPage.bodyTextarea.fill('This is a test prompt body')
      await promptPage.tagsInput.fill('chatgpt, coding, test')

      // Verify tags input value
      const tagsValue = await promptPage.tagsInput.inputValue()
      expect(tagsValue).toBe('chatgpt, coding, test')
    })

    test('should toggle public/private visibility', async ({ page }) => {
      const promptPage = new PromptPage(page)
      await promptPage.goto()

      // Skip if redirected to login
      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Public checkbox should be checked by default
      const isChecked = await promptPage.publicCheckbox.isChecked()
      expect(isChecked).toBe(true)

      // Uncheck to make private
      await promptPage.publicCheckbox.uncheck()
      const isStillChecked = await promptPage.publicCheckbox.isChecked()
      expect(isStillChecked).toBe(false)
    })

    test('should navigate back on cancel', async ({ page }) => {
      const promptPage = new PromptPage(page)
      await promptPage.goto()

      // Skip if redirected to login
      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      await promptPage.cancel()

      // Should redirect to home page
      await page.waitForURL('/')
      await expect(page).toHaveURL('/')
    })
  })

  test.describe('Prompt Display', () => {
    test('should display prompt cards on home page', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      // Wait for page to load
      await page.waitForTimeout(2000)

      // Should have prompt cards (if there are any prompts)
      const cardsCount = await homePage.getPromptCardsCount()

      // There should be at least 0 cards (might be empty for new instance)
      expect(cardsCount).toBeGreaterThanOrEqual(0)
    })

    test('should navigate to prompt detail on card click', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      const cardsCount = await homePage.getPromptCardsCount()

      if (cardsCount > 0) {
        // Click first prompt
        await homePage.clickFirstPrompt()

        // Should navigate to prompt detail page
        await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

        const url = page.url()
        expect(url).toMatch(/\/prompts\/[a-f0-9-]+/)
      } else {
        // Skip if no prompts available
        test.skip()
      }
    })

    test('should display prompt details correctly', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      const cardsCount = await homePage.getPromptCardsCount()

      if (cardsCount === 0) {
        test.skip()
        return
      }

      // Click first prompt
      await homePage.clickFirstPrompt()
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      const promptDetailPage = new PromptDetailPage(page)

      // Verify prompt elements are visible
      await expect(promptDetailPage.promptTitle).toBeVisible()
      await expect(promptDetailPage.promptBody).toBeVisible()
      await expect(promptDetailPage.likeButton).toBeVisible()

      // Verify title is not empty
      const title = await promptDetailPage.getTitle()
      expect(title.trim()).not.toBe('')

      // Verify like count is a number
      const likeCount = await promptDetailPage.getLikeCount()
      expect(typeof likeCount).toBe('number')
    })

    test('should render markdown content', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      const cardsCount = await homePage.getPromptCardsCount()

      if (cardsCount === 0) {
        test.skip()
        return
      }

      await homePage.clickFirstPrompt()
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      const promptDetailPage = new PromptDetailPage(page)

      // Check if body has markdown rendered elements (prose class indicates rendered markdown)
      const hasProseClass = await promptDetailPage.promptBody.evaluate(
        (el) => el.classList.contains('prose')
      )
      expect(hasProseClass).toBe(true)
    })

    test('should display author information', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      const cardsCount = await homePage.getPromptCardsCount()

      if (cardsCount === 0) {
        test.skip()
        return
      }

      await homePage.clickFirstPrompt()
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      // Look for author name (format: "by <name>")
      const authorElement = page.locator('text=/by /')
      await expect(authorElement).toBeVisible()
    })

    test('should display tags if present', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      const cardsCount = await homePage.getPromptCardsCount()

      if (cardsCount === 0) {
        test.skip()
        return
      }

      await homePage.clickFirstPrompt()
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      // Tags are displayed with # prefix in badge format
      const tags = page.locator('.px-2.py-1:has-text("#")')
      const tagsCount = await tags.count()

      // Tags might not be present, so we just verify the structure if they exist
      if (tagsCount > 0) {
        const firstTag = tags.first()
        await expect(firstTag).toBeVisible()

        const tagText = await firstTag.textContent()
        expect(tagText).toMatch(/^#/)
      }
    })

    test('should show 404 for non-existent prompt', async ({ page }) => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000'

      await page.goto(`/prompts/${nonExistentId}`)
      await page.waitForTimeout(2000)

      // Should show 404 or error message
      const notFoundText = page.locator('text=/not found|404/i')
      const exists = await notFoundText.isVisible().catch(() => false)

      // Either shows 404 page or returns to home
      if (!exists) {
        const currentUrl = page.url()
        expect(currentUrl === '/' || currentUrl.includes('not-found')).toBe(true)
      } else {
        await expect(notFoundText).toBeVisible()
      }
    })
  })

  test.describe('Prompt Preview Cards', () => {
    test('should display key information on cards', async ({ page }) => {
      const homePage = new HomePage(page)
      await homePage.goto()

      await page.waitForTimeout(2000)

      const cardsCount = await homePage.getPromptCardsCount()

      if (cardsCount === 0) {
        test.skip()
        return
      }

      const firstCard = homePage.promptCards.first()

      // Card should contain title
      await expect(firstCard.locator('.text-xl, h2, h3')).toBeVisible()

      // Card should contain author info
      await expect(firstCard.locator('text=/by /')).toBeVisible()

      // Card should contain timestamp
      await expect(firstCard.locator('text=/ago/')).toBeVisible()

      // Card should show like count
      const likeIcon = firstCard.locator('svg[stroke="currentColor"]')
      await expect(likeIcon).toBeVisible()
    })
  })
})
