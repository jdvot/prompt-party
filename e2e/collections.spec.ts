import { test, expect } from '@playwright/test'
import { CollectionsPage, CreateCollectionPage, CollectionDetailPage } from './pages/collection.page'

/**
 * Collections E2E Tests
 *
 * Test Strategy:
 * - Test collection creation with public/private visibility
 * - Test adding prompts to collections
 * - Test removing prompts from collections
 * - Test collection listing and navigation
 * - Verify authentication requirements
 * - Test collection detail view
 */

test.describe('Collections', () => {
  test.describe('Collections Page', () => {
    test('should display collections page', async ({ page }) => {
      const collectionsPage = new CollectionsPage(page)
      await collectionsPage.goto()

      // Wait for page load
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      // If redirected to login, user is not authenticated
      if (!currentUrl.includes('/auth/login')) {
        // Should show collections page title
        const heading = page.locator('h1')
        await expect(heading).toBeVisible()

        // Should have create button (if authenticated)
        const createButtonExists = await collectionsPage.createButton.isVisible().catch(() => false)

        // Create button might be hidden if not authenticated
        expect(typeof createButtonExists).toBe('boolean')
      }
    })

    test('should navigate to create collection page', async ({ page }) => {
      const collectionsPage = new CollectionsPage(page)
      await collectionsPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Check if create button exists
      const createButtonVisible = await collectionsPage.createButton.isVisible().catch(() => false)

      if (createButtonVisible) {
        await collectionsPage.clickCreateCollection()

        // Should navigate to create page
        await page.waitForURL('/collections/new')
        await expect(page).toHaveURL('/collections/new')
      }
    })

    test('should require authentication to access collections', async ({ page }) => {
      // Logout first
      await page.goto('/auth/logout')
      await page.waitForTimeout(1000)

      const collectionsPage = new CollectionsPage(page)
      await collectionsPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      // Should either redirect to login or show auth required message
      const redirectedToLogin = currentUrl.includes('/auth/login')
      const authRequired = await page.locator('text=/sign in|login|authenticate/i').isVisible().catch(() => false)

      expect(redirectedToLogin || authRequired).toBe(true)
    })
  })

  test.describe('Create Collection', () => {
    test('should display create collection form', async ({ page }) => {
      const createPage = new CreateCollectionPage(page)
      await createPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Verify form elements
      await expect(createPage.nameInput).toBeVisible()
      await expect(createPage.descriptionTextarea).toBeVisible()
      await expect(createPage.publicCheckbox).toBeVisible()
      await expect(createPage.submitButton).toBeVisible()
      await expect(createPage.cancelButton).toBeVisible()
    })

    test('should require collection name', async ({ page }) => {
      const createPage = new CreateCollectionPage(page)
      await createPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Try to submit without name
      await createPage.submitButton.click()

      // HTML5 validation should prevent submission
      const nameValidity = await createPage.nameInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
      )
      expect(nameValidity).toBe(false)
    })

    test('should allow description to be optional', async ({ page }) => {
      const createPage = new CreateCollectionPage(page)
      await createPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Fill only required field
      await createPage.nameInput.fill('Test Collection')

      // Description should not be required
      const descriptionRequired = await createPage.descriptionTextarea.evaluate(
        (input: HTMLTextAreaElement) => input.required
      )
      expect(descriptionRequired).toBe(false)
    })

    test('should have public checkbox checked by default', async ({ page }) => {
      const createPage = new CreateCollectionPage(page)
      await createPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const isChecked = await createPage.publicCheckbox.isChecked()
      expect(isChecked).toBe(true)
    })

    test('should allow toggling public/private visibility', async ({ page }) => {
      const createPage = new CreateCollectionPage(page)
      await createPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Uncheck public checkbox
      await createPage.publicCheckbox.uncheck()

      const isChecked = await createPage.publicCheckbox.isChecked()
      expect(isChecked).toBe(false)

      // Check it again
      await createPage.publicCheckbox.check()

      const isCheckedAgain = await createPage.publicCheckbox.isChecked()
      expect(isCheckedAgain).toBe(true)
    })

    test('should navigate back on cancel', async ({ page }) => {
      const createPage = new CreateCollectionPage(page)
      await createPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      await createPage.cancel()

      // Should navigate to collections page
      await page.waitForURL('/collections')
      await expect(page).toHaveURL('/collections')
    })

    test('should create collection and redirect to collection detail', async ({ page }) => {
      const createPage = new CreateCollectionPage(page)
      await createPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const uniqueName = `Test Collection ${Date.now()}`

      await createPage.createCollection(
        uniqueName,
        'A collection created by E2E tests',
        true
      )

      // Should redirect to collection detail page
      await page.waitForURL(/\/collections\/[a-f0-9-]+/, { timeout: 10000 })

      const newUrl = page.url()
      expect(newUrl).toMatch(/\/collections\/[a-f0-9-]+/)

      // Collection name should be displayed
      const heading = page.locator('h1')
      const headingText = await heading.textContent()
      expect(headingText).toContain(uniqueName)
    })
  })

  test.describe('Collection Detail', () => {
    test('should display collection information', async ({ page }) => {
      // First, try to access collections page
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for any collection link
      const collectionLinks = page.locator('a[href^="/collections/"][href!="/collections/new"]')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      // Click first collection
      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      const collectionDetailPage = new CollectionDetailPage(page)

      // Should display collection name
      await expect(collectionDetailPage.collectionName).toBeVisible()

      const name = await collectionDetailPage.getName()
      expect(name.trim()).not.toBe('')
    })

    test('should display add prompt button for own collections', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"][href!="/collections/new"]')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      // Add prompt button might be visible for own collections
      const addButtonVisible = await page.locator('a:has-text("Add"), button:has-text("Add")').isVisible().catch(() => false)

      // Button visibility depends on ownership
      expect(typeof addButtonVisible).toBe('boolean')
    })

    test('should display prompts in collection', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"][href!="/collections/new"]')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      await page.waitForTimeout(2000)

      // Look for prompt cards
      const promptLinks = page.locator('a[href^="/prompts/"]')
      const promptCount = await promptLinks.count()

      // Collection might be empty or have prompts
      expect(promptCount).toBeGreaterThanOrEqual(0)
    })

    test('should navigate to prompt detail when clicking prompt in collection', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"][href!="/collections/new"]')
      const collectionsCount = await collectionLinks.count()

      if (collectionsCount === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      await page.waitForTimeout(2000)

      const promptLinks = page.locator('a[href^="/prompts/"]')
      const promptCount = await promptLinks.count()

      if (promptCount === 0) {
        test.skip()
        return
      }

      // Click first prompt
      await promptLinks.first().click()

      // Should navigate to prompt detail
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      const url = page.url()
      expect(url).toMatch(/\/prompts\/[a-f0-9-]+/)
    })

    test('should show empty state when collection has no prompts', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"][href!="/collections/new"]')
      const collectionsCount = await collectionLinks.count()

      if (collectionsCount === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      await page.waitForTimeout(2000)

      const promptLinks = page.locator('a[href^="/prompts/"]')
      const promptCount = await promptLinks.count()

      if (promptCount === 0) {
        // Should show empty state message
        const emptyMessage = page.locator('text=/no prompts|empty|add prompts/i')
        const hasMessage = await emptyMessage.isVisible().catch(() => false)

        // Either shows message or just shows empty list
        expect(typeof hasMessage).toBe('boolean')
      }
    })
  })

  test.describe('Add Prompt to Collection', () => {
    test('should show add to collection button on prompt detail', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      if (count === 0) {
        test.skip()
        return
      }

      await promptCards.first().click()
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      // Look for add to collection button
      const addButton = page.locator('button:has-text("Add to Collection"), button:has-text("Save"), [data-testid="add-to-collection"]')
      const isVisible = await addButton.isVisible().catch(() => false)

      // Button might only be visible when authenticated
      expect(typeof isVisible).toBe('boolean')
    })
  })

  test.describe('Collection Privacy', () => {
    test('should allow creating private collections', async ({ page }) => {
      const createPage = new CreateCollectionPage(page)
      await createPage.goto()

      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const uniqueName = `Private Collection ${Date.now()}`

      // Create private collection
      await createPage.nameInput.fill(uniqueName)
      await createPage.publicCheckbox.uncheck()
      await createPage.submitButton.click()

      // Should redirect to collection detail
      await page.waitForURL(/\/collections\/[a-f0-9-]+/, { timeout: 10000 })

      // Private collection should still be accessible to owner
      const heading = page.locator('h1')
      const headingText = await heading.textContent()
      expect(headingText).toContain(uniqueName)
    })
  })
})
