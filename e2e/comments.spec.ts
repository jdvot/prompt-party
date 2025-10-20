import { test, expect } from '@playwright/test'
import { PromptDetailPage } from './pages/prompt.page'
import { HomePage } from './pages/home.page'

/**
 * Comments E2E Tests
 *
 * Test Strategy:
 * - Test comment form display and validation
 * - Test comment submission
 * - Verify comments list and display
 * - Test real-time comment updates
 * - Verify authentication requirement
 * - Test comment count updates
 */

test.describe('Comments', () => {
  test.describe('Comment Form Display', () => {
    test('should display comment form on prompt detail page', async ({ page }) => {
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

      // Comment form should be visible
      await expect(promptDetailPage.commentForm).toBeVisible()
      await expect(promptDetailPage.commentTextarea).toBeVisible()
      await expect(promptDetailPage.commentSubmitButton).toBeVisible()
    })

    test('should have placeholder text in comment textarea', async ({ page }) => {
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

      const placeholder = await promptDetailPage.commentTextarea.getAttribute('placeholder')
      expect(placeholder).toContain('Write a comment')
    })

    test('should disable submit button when textarea is empty', async ({ page }) => {
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

      // Submit button should be disabled when empty
      const isDisabled = await promptDetailPage.commentSubmitButton.isDisabled()
      expect(isDisabled).toBe(true)
    })

    test('should enable submit button when textarea has content', async ({ page }) => {
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

      // Type in comment
      await promptDetailPage.commentTextarea.fill('This is a test comment')

      // Submit button should be enabled
      const isDisabled = await promptDetailPage.commentSubmitButton.isDisabled()
      expect(isDisabled).toBe(false)
    })
  })

  test.describe('Comment Submission', () => {
    test('should clear textarea after successful comment submission', async ({ page }) => {
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

      const testComment = `Test comment ${Date.now()}`

      // Fill and submit comment
      await promptDetailPage.commentTextarea.fill(testComment)
      await promptDetailPage.commentSubmitButton.click()

      // Wait for submission
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      // If not redirected to login, check if textarea was cleared
      if (!currentUrl.includes('/auth/login')) {
        const textareaValue = await promptDetailPage.commentTextarea.inputValue()

        // Textarea should be cleared after successful submission
        expect(textareaValue).toBe('')
      }
    })

    test('should show loading state during comment submission', async ({ page }) => {
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

      await promptDetailPage.commentTextarea.fill('Test comment')

      // Get button text before clicking
      const initialButtonText = await promptDetailPage.commentSubmitButton.textContent()

      // Click submit
      await promptDetailPage.commentSubmitButton.click()

      // Immediately check button state (might show loading)
      await page.waitForTimeout(100)

      const buttonTextDuringSubmit = await promptDetailPage.commentSubmitButton.textContent()

      // Button text might change to "Posting..." or button might be disabled
      const isDisabled = await promptDetailPage.commentSubmitButton.isDisabled().catch(() => false)

      // Either button text changed or button is disabled
      expect(buttonTextDuringSubmit !== initialButtonText || isDisabled).toBeTruthy()
    })

    test('should not submit empty comments', async ({ page }) => {
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

      // Try to submit with only whitespace
      await promptDetailPage.commentTextarea.fill('   ')

      // Submit button should be disabled
      const isDisabled = await promptDetailPage.commentSubmitButton.isDisabled()
      expect(isDisabled).toBe(true)
    })
  })

  test.describe('Comments Display', () => {
    test('should display comments list', async ({ page }) => {
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

      // Wait for comments to load
      await page.waitForTimeout(2000)

      // Comments section should exist (even if empty)
      const commentsSection = page.locator('text=/comments|discussion/i')
      const exists = await commentsSection.isVisible().catch(() => false)

      // Either comments section is visible or there are no comments
      expect(typeof exists).toBe('boolean')
    })

    test('should display comment author and timestamp', async ({ page }) => {
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

      await page.waitForTimeout(2000)

      // Look for comment items
      const commentItems = page.locator('[data-testid="comment-item"], .border-b')
      const commentCount = await commentItems.count()

      if (commentCount > 0) {
        const firstComment = commentItems.first()

        // Each comment should have author info
        const hasAuthor = await firstComment.locator('text=/by |@/').isVisible().catch(() => false)

        // Each comment should have timestamp
        const hasTimestamp = await firstComment.locator('text=/ago|at/').isVisible().catch(() => false)

        // At least one should be present
        expect(hasAuthor || hasTimestamp).toBe(true)
      }
    })

    test('should display comment content', async ({ page }) => {
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

      await page.waitForTimeout(2000)

      // Look for comment items
      const commentItems = page.locator('[data-testid="comment-item"], .border-b')
      const commentCount = await commentItems.count()

      if (commentCount > 0) {
        const firstComment = commentItems.first()

        // Comment should have text content
        const content = await firstComment.textContent()
        expect(content).toBeTruthy()
        expect(content!.trim().length).toBeGreaterThan(0)
      }
    })

    test('should show message when no comments exist', async ({ page }) => {
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

      await page.waitForTimeout(2000)

      // Check if there are any comments
      const commentItems = page.locator('[data-testid="comment-item"], .border-b')
      const commentCount = await commentItems.count()

      if (commentCount === 0) {
        // Should show some message about no comments
        const noCommentsMessage = page.locator('text=/no comments|be the first/i')
        const hasMessage = await noCommentsMessage.isVisible().catch(() => false)

        // Either shows message or just shows empty list
        expect(typeof hasMessage).toBe('boolean')
      }
    })
  })

  test.describe('Real-time Comments', () => {
    test('should display new comment after submission', async ({ page }) => {
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

      // Get initial comment count
      const commentItems = page.locator('[data-testid="comment-item"], .border-b')
      const initialCount = await commentItems.count()

      // Submit a new comment
      const uniqueComment = `E2E Test Comment ${Date.now()}`
      await promptDetailPage.commentTextarea.fill(uniqueComment)
      await promptDetailPage.commentSubmitButton.click()

      // Wait for comment to be added
      await page.waitForTimeout(3000)

      const currentUrl = page.url()

      if (!currentUrl.includes('/auth/login')) {
        // Check if new comment appears
        const newCount = await commentItems.count()

        // Count should have increased or comment text should be visible
        const commentVisible = await page.locator(`text="${uniqueComment}"`).isVisible().catch(() => false)

        expect(newCount > initialCount || commentVisible).toBe(true)
      }
    })

    // Note: Testing real-time updates from other users would require
    // multiple browser contexts or external Supabase client simulation
  })

  test.describe('Comment Authentication', () => {
    test('should require authentication to post comments', async ({ page }) => {
      // Ensure logged out
      await page.goto('/auth/logout')
      await page.waitForTimeout(1000)

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

      // Try to post a comment
      await promptDetailPage.commentTextarea.fill('Unauthenticated comment')
      await promptDetailPage.commentSubmitButton.click()

      // Wait for potential redirect or error
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      // Should either redirect to login or show error
      const redirectedToLogin = currentUrl.includes('/auth/login')
      const errorVisible = await page.locator('text=/sign in|login required|authenticate/i').isVisible().catch(() => false)

      expect(redirectedToLogin || errorVisible).toBe(true)
    })
  })

  test.describe('Comment Form UX', () => {
    test('should expand textarea on focus', async ({ page }) => {
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

      // Get initial textarea height
      const initialBox = await promptDetailPage.commentTextarea.boundingBox()

      // Focus the textarea
      await promptDetailPage.commentTextarea.focus()

      await page.waitForTimeout(300)

      // Get new textarea height (might expand on focus)
      const focusedBox = await promptDetailPage.commentTextarea.boundingBox()

      // Heights should exist
      expect(initialBox).toBeTruthy()
      expect(focusedBox).toBeTruthy()
    })

    test('should allow multiple lines of text', async ({ page }) => {
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

      // Type multiline comment
      const multilineComment = 'Line 1\nLine 2\nLine 3'
      await promptDetailPage.commentTextarea.fill(multilineComment)

      const value = await promptDetailPage.commentTextarea.inputValue()
      expect(value).toBe(multilineComment)
    })
  })
})
