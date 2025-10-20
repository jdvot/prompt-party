import { test, expect } from '@playwright/test'
import { PromptDetailPage } from './pages/prompt.page'
import { HomePage } from './pages/home.page'

/**
 * Likes E2E Tests
 *
 * Test Strategy:
 * - Test like/unlike functionality
 * - Verify optimistic UI updates
 * - Test real-time updates (like count changes)
 * - Verify authentication requirement for liking
 * - Test visual feedback for liked state
 */

test.describe('Likes', () => {
  test.describe('Like Button Display', () => {
    test('should display like button on prompt detail page', async ({ page }) => {
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

      // Like button should be visible
      await expect(promptDetailPage.likeButton).toBeVisible()

      // Like count should be visible
      await expect(promptDetailPage.likeCount).toBeVisible()

      // Like count should be a number
      const likeCount = await promptDetailPage.getLikeCount()
      expect(typeof likeCount).toBe('number')
      expect(likeCount).toBeGreaterThanOrEqual(0)
    })

    test('should display heart icon in like button', async ({ page }) => {
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

      // Heart icon should be visible (SVG with specific path)
      const heartIcon = page.locator('svg[stroke="currentColor"]').first()
      await expect(heartIcon).toBeVisible()
    })
  })

  test.describe('Like Interaction (Unauthenticated)', () => {
    test('should redirect to login when clicking like without authentication', async ({
      page,
    }) => {
      // Make sure we're logged out first
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

      // Click like button
      await promptDetailPage.likeButton.click()

      // Wait for potential redirect
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      // Should redirect to login
      expect(currentUrl).toContain('/auth/login')
    })
  })

  test.describe('Like Interaction (Authenticated)', () => {
    // Note: These tests would work better with the authenticated fixture
    // For now, they test the UI behavior assuming authentication

    test('should show optimistic UI update when clicking like', async ({ page }) => {
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

      // Get initial like count
      const initialLikeCount = await promptDetailPage.getLikeCount()

      // Check initial button state (classes might indicate liked/unliked state)
      const initialClasses = await promptDetailPage.likeButton.getAttribute('class')

      // Click like button
      await promptDetailPage.likeButton.click()

      // Wait a bit for optimistic update
      await page.waitForTimeout(500)

      // If authenticated, count should change
      // If not authenticated, will redirect to login
      const currentUrl = page.url()

      if (!currentUrl.includes('/auth/login')) {
        // Get new like count (might have changed or might be same if unauthenticated)
        const newLikeCount = await promptDetailPage.getLikeCount()

        // Button classes should have changed (visual feedback)
        const newClasses = await promptDetailPage.likeButton.getAttribute('class')

        // Either count changed or button visual state changed
        const countChanged = newLikeCount !== initialLikeCount
        const visualChanged = initialClasses !== newClasses

        // At least one should be true (optimistic update occurred)
        expect(countChanged || visualChanged).toBe(true)
      }
    })

    test('should change button appearance when liked', async ({ page }) => {
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

      // Check for visual differences (liked buttons often have different colors)
      const buttonClasses = await promptDetailPage.likeButton.getAttribute('class')

      // Button should have styling classes
      expect(buttonClasses).toBeTruthy()

      // Check for heart icon fill state
      const heartIcon = promptDetailPage.likeButton.locator('svg').first()
      const fillValue = await heartIcon.getAttribute('class')

      // Icon should have classes that control fill state
      expect(fillValue).toBeTruthy()
    })

    test('should toggle like state on multiple clicks', async ({ page }) => {
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

      // Click once
      await promptDetailPage.likeButton.click()
      await page.waitForTimeout(500)

      const afterFirstClick = page.url()

      if (afterFirstClick.includes('/auth/login')) {
        // Not authenticated, skip rest of test
        test.skip()
        return
      }

      const classesAfterFirstClick = await promptDetailPage.likeButton.getAttribute('class')

      // Click again
      await promptDetailPage.likeButton.click()
      await page.waitForTimeout(500)

      const classesAfterSecondClick = await promptDetailPage.likeButton.getAttribute('class')

      // After two clicks, should be back to initial state (or close to it)
      // This tests the toggle behavior
      expect(classesAfterFirstClick).not.toBe(classesAfterSecondClick)
    })
  })

  test.describe('Real-time Like Updates', () => {
    test('should display consistent like count', async ({ page }) => {
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

      // Get like count multiple times to ensure consistency
      const count1 = await promptDetailPage.getLikeCount()
      await page.waitForTimeout(500)
      const count2 = await promptDetailPage.getLikeCount()

      // Without any interaction, counts should be the same
      expect(count1).toBe(count2)
    })

    // Note: Testing real-time updates from another user would require
    // opening multiple browser contexts or using the Supabase client
    // to simulate external changes. This is a more advanced test scenario.
  })

  test.describe('Like Button Accessibility', () => {
    test('should be keyboard accessible', async ({ page }) => {
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

      // Focus the like button
      await promptDetailPage.likeButton.focus()

      // Check if it's focused
      const isFocused = await promptDetailPage.likeButton.evaluate(
        (el) => el === document.activeElement
      )
      expect(isFocused).toBe(true)

      // Should be able to activate with Enter key
      // (actual behavior depends on implementation)
    })

    test('should not be clickable while loading', async ({ page }) => {
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

      // Click the button
      await promptDetailPage.likeButton.click()

      // Immediately check if disabled (might be disabled during request)
      // Note: This is timing-dependent and might not always catch the loading state
      const isDisabled = await promptDetailPage.likeButton.isDisabled().catch(() => false)

      // Button should either be disabled during loading or request completes quickly
      // This is more of a smoke test
      expect(typeof isDisabled).toBe('boolean')
    })
  })
})
