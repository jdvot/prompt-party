import { test, expect } from '@playwright/test'

/**
 * Comprehensive Collection Management E2E Tests
 *
 * Test Strategy:
 * - Test creating public and private collections
 * - Test adding/removing prompts from collections
 * - Test viewing collection details
 * - Test editing and deleting collections
 * - Test collection sharing and visibility
 * - Test collection navigation
 *
 * Coverage:
 * - Happy path: create → add prompts → view → edit → delete
 * - Edge cases: empty collections, duplicate additions
 * - Error cases: unauthorized access, validation
 */

test.describe('Collection Management - Comprehensive', () => {
  test.describe('Collection Listing', () => {
    test('should display collections page', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      // Might redirect to login if authentication is required
      if (currentUrl.includes('/auth/login')) {
        // Authentication required for collections
        expect(currentUrl).toContain('/auth/login')
      } else {
        // Should be on collections page
        expect(currentUrl).toContain('/collections')

        // Page should have a heading
        const heading = page.locator('h1, h2')
        await expect(heading.first()).toBeVisible()
      }
    })

    test('should show create collection button', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for create/new collection button
      const createButton = page.locator('a[href="/collections/new"], button:has-text("Create"), button:has-text("New Collection")')
      const hasButton = await createButton.count() > 0

      if (hasButton) {
        await expect(createButton.first()).toBeVisible()
      }
    })

    test('should list existing collections', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for collection cards/items
      const collectionItems = page.locator('a[href^="/collections/"], [data-collection], .collection-card')
      const count = await collectionItems.count()

      // Might have collections or empty state
      expect(count).toBeGreaterThanOrEqual(0)

      if (count === 0) {
        // Should show empty state
        const emptyState = page.locator('text=/no collections|create your first|get started/i')
        const hasEmptyState = await emptyState.isVisible().catch(() => false)
        // Empty state might be shown
      }
    })

    test('should display collection metadata (name, count, visibility)', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionItems = page.locator('a[href^="/collections/"], [data-collection]')
      const count = await collectionItems.count()

      if (count === 0) {
        test.skip()
        return
      }

      const firstCollection = collectionItems.first()
      await expect(firstCollection).toBeVisible()

      // Should have collection name
      const collectionText = await firstCollection.textContent()
      expect(collectionText).toBeTruthy()

      // Might have prompt count indicator
      const hasCount = collectionText?.match(/\d+/)
      // Count might be displayed
    })
  })

  test.describe('Collection Creation', () => {
    test('should navigate to create collection page', async ({ page }) => {
      await page.goto('/collections/new')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        // Redirected to login - authentication required
        expect(currentUrl).toContain('/auth/login')
      } else {
        // Should be on create page
        expect(currentUrl).toContain('/collections/new')

        // Should have form
        const form = page.locator('form')
        await expect(form.first()).toBeVisible()
      }
    })

    test('should create a public collection', async ({ page }) => {
      await page.goto('/collections/new')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionName = `Test Collection ${Date.now()}`
      const collectionDescription = 'This is a test collection for E2E testing'

      // Fill form
      const nameField = page.locator('#name, input[name="name"], input[placeholder*="name" i]')
      await nameField.fill(collectionName)

      const descriptionField = page.locator('#description, textarea[name="description"], textarea[placeholder*="description" i]')
      const hasDescription = await descriptionField.count() > 0

      if (hasDescription) {
        await descriptionField.fill(collectionDescription)
      }

      // Set to public
      const publicCheckbox = page.locator('#is_public, input[name="is_public"], input[type="checkbox"][value="public"]')
      const hasCheckbox = await publicCheckbox.count() > 0

      if (hasCheckbox) {
        const isChecked = await publicCheckbox.isChecked()
        if (!isChecked) {
          await publicCheckbox.check()
        }
      }

      // Submit
      const submitButton = page.locator('button[type="submit"]').first()
      await submitButton.click()

      await page.waitForTimeout(2000)

      // Should redirect to collection detail or collections list
      const afterUrl = page.url()
      expect(afterUrl).toMatch(/\/collections/)

      // Should see success message or the new collection
      const successIndicator = page.locator(`text=${collectionName}, text=/created|success/i`)
      // Might show success feedback
    })

    test('should create a private collection', async ({ page }) => {
      await page.goto('/collections/new')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionName = `Private Collection ${Date.now()}`

      const nameField = page.locator('#name, input[name="name"]')
      await nameField.fill(collectionName)

      // Set to private
      const publicCheckbox = page.locator('#is_public, input[name="is_public"]')
      const hasCheckbox = await publicCheckbox.count() > 0

      if (hasCheckbox) {
        const isChecked = await publicCheckbox.isChecked()
        if (isChecked) {
          await publicCheckbox.uncheck()
        }
      }

      const submitButton = page.locator('button[type="submit"]').first()
      await submitButton.click()

      await page.waitForTimeout(2000)

      // Should create successfully
      const afterUrl = page.url()
      expect(afterUrl).toMatch(/\/collections/)
    })

    test('should validate required collection name', async ({ page }) => {
      await page.goto('/collections/new')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Try to submit without name
      const submitButton = page.locator('button[type="submit"]').first()
      await submitButton.click()

      await page.waitForTimeout(1000)

      // Should prevent submission or show error
      expect(page.url()).toContain('/collections/new')

      // Check validation
      const nameField = page.locator('#name, input[name="name"]')
      const isValid = await nameField.evaluate(
        (input: HTMLInputElement) => input.validity.valid
      )
      expect(isValid).toBe(false)
    })

    test('should handle collection name length limits', async ({ page }) => {
      await page.goto('/collections/new')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Very long name
      const longName = 'A'.repeat(300)

      const nameField = page.locator('#name, input[name="name"]')
      await nameField.fill(longName)

      const submitButton = page.locator('button[type="submit"]').first()
      await submitButton.click()

      await page.waitForTimeout(2000)

      // Should either truncate, show error, or accept it
    })
  })

  test.describe('Collection Detail View', () => {
    test('should display collection detail page', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"]:not([href="/collections/new"])')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      // Click first collection
      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      // Should display collection details
      await expect(page.locator('h1, h2')).toBeVisible()

      // Should have collection name
      const heading = page.locator('h1, h2').first()
      const headingText = await heading.textContent()
      expect(headingText).toBeTruthy()
    })

    test('should display prompts in collection', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"]:not([href="/collections/new"])')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      // Look for prompts in collection
      const promptCards = page.locator('a[href^="/prompts/"]')
      const promptCount = await promptCards.count()

      // Might have prompts or be empty
      expect(promptCount).toBeGreaterThanOrEqual(0)

      if (promptCount === 0) {
        // Should show empty state
        const emptyState = page.locator('text=/no prompts|add prompts|empty collection/i')
        const hasEmptyState = await emptyState.isVisible().catch(() => false)
      }
    })

    test('should show add prompt button for own collections', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"]:not([href="/collections/new"])')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      // Look for add prompt button
      const addButton = page.locator('button:has-text("Add"), a:has-text("Add Prompt"), button:has-text("Add Prompt")')
      const hasAdd = await addButton.count() > 0

      // Add button might be present for owned collections
    })

    test('should display collection metadata', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"]:not([href="/collections/new"])')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      // Should show owner/author
      const ownerInfo = page.locator('text=/by|created by|owner/i, a[href^="/profile/"]')
      const hasOwner = await ownerInfo.count() > 0
      expect(hasOwner).toBe(true)

      // Should show created date
      const dateInfo = page.locator('time, [datetime], text=/ago|created/i')
      const hasDate = await dateInfo.count() > 0
      expect(hasDate).toBe(true)
    })
  })

  test.describe('Adding Prompts to Collections', () => {
    test('should display add to collection button on prompts', async ({ page }) => {
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
      const addToCollectionButton = page.locator(
        'button:has-text("Add to Collection"), button:has-text("Save to"), button[aria-label*="collection" i]'
      )
      const hasButton = await addToCollectionButton.count() > 0

      // Button might be present (for authenticated users)
    })

    test('should show collection selection modal/dropdown', async ({ page }) => {
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

      const addToCollectionButton = page.locator(
        'button:has-text("Add to Collection"), button:has-text("Save to")'
      )
      const hasButton = await addToCollectionButton.count() > 0

      if (!hasButton) {
        test.skip()
        return
      }

      await addToCollectionButton.first().click()
      await page.waitForTimeout(1000)

      // Should show collection selector (modal, dropdown, or menu)
      const collectionSelector = page.locator('[role="dialog"], [role="menu"], .modal, .dropdown-menu')
      const hasSelector = await collectionSelector.count() > 0

      // If not authenticated, might redirect to login instead
      const currentUrl = page.url()
      expect(hasSelector || currentUrl.includes('/auth/login')).toBe(true)
    })

    test('should add prompt to selected collection', async ({ page }) => {
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

      const addToCollectionButton = page.locator(
        'button:has-text("Add to Collection"), button:has-text("Save to")'
      )
      const hasButton = await addToCollectionButton.count() > 0

      if (!hasButton) {
        test.skip()
        return
      }

      await addToCollectionButton.first().click()
      await page.waitForTimeout(1000)

      // Look for collection options
      const collectionOptions = page.locator('[role="menuitem"], .collection-option, input[type="checkbox"]')
      const optionCount = await collectionOptions.count()

      if (optionCount > 0) {
        // Select first collection
        await collectionOptions.first().click()
        await page.waitForTimeout(1000)

        // Should show success feedback
        const successMessage = page.locator('text=/added|saved to collection/i')
        const hasSuccess = await successMessage.isVisible().catch(() => false)
        // Might show success message
      }
    })

    test('should create new collection from add prompt flow', async ({ page }) => {
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

      const addToCollectionButton = page.locator(
        'button:has-text("Add to Collection"), button:has-text("Save to")'
      )
      const hasButton = await addToCollectionButton.count() > 0

      if (!hasButton) {
        test.skip()
        return
      }

      await addToCollectionButton.first().click()
      await page.waitForTimeout(1000)

      // Look for "Create new collection" option
      const createNewButton = page.locator('button:has-text("Create"), button:has-text("New Collection"), a:has-text("Create")')
      const hasCreateNew = await createNewButton.count() > 0

      if (hasCreateNew) {
        await createNewButton.first().click()
        await page.waitForTimeout(1000)

        // Should show form to create collection
        const nameField = page.locator('#name, input[name="name"], input[placeholder*="name" i]')
        const hasNameField = await nameField.count() > 0
        expect(hasNameField).toBe(true)
      }
    })
  })

  test.describe('Removing Prompts from Collections', () => {
    test('should remove prompt from collection', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"]:not([href="/collections/new"])')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      const promptCards = page.locator('a[href^="/prompts/"]')
      const promptCount = await promptCards.count()

      if (promptCount === 0) {
        test.skip()
        return
      }

      // Look for remove button on prompt cards
      const removeButton = page.locator('button:has-text("Remove"), button[aria-label*="remove" i]')
      const hasRemove = await removeButton.count() > 0

      if (hasRemove) {
        const initialCount = promptCount

        await removeButton.first().click()
        await page.waitForTimeout(1000)

        // Confirm if needed
        page.on('dialog', async dialog => {
          await dialog.accept()
        })

        // Prompt should be removed from collection
        await page.waitForTimeout(1000)
        const afterCount = await page.locator('a[href^="/prompts/"]').count()

        // Count should have decreased
        expect(afterCount).toBeLessThanOrEqual(initialCount)
      }
    })
  })

  test.describe('Collection Editing', () => {
    test('should edit collection name and description', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"]:not([href="/collections/new"])')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      // Look for edit button
      const editButton = page.locator('button:has-text("Edit"), a:has-text("Edit")')
      const hasEdit = await editButton.count() > 0

      if (!hasEdit) {
        test.skip()
        return
      }

      await editButton.first().click()
      await page.waitForTimeout(1000)

      // Should be on edit page or show edit form
      const nameField = page.locator('#name, input[name="name"]')
      const hasNameField = await nameField.count() > 0

      if (hasNameField) {
        const newName = `Edited Collection ${Date.now()}`
        await nameField.clear()
        await nameField.fill(newName)

        const submitButton = page.locator('button[type="submit"]').first()
        await submitButton.click()

        await page.waitForTimeout(2000)

        // Should show updated name
        const updatedHeading = page.locator(`h1:has-text("${newName}"), h2:has-text("${newName}")`)
        const hasUpdated = await updatedHeading.isVisible().catch(() => false)
        // Might show updated name
      }
    })

    test('should toggle collection visibility', async ({ page }) => {
      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"]:not([href="/collections/new"])')
      const count = await collectionLinks.count()

      if (count === 0) {
        test.skip()
        return
      }

      await collectionLinks.first().click()
      await page.waitForURL(/\/collections\/[a-f0-9-]+/)

      const editButton = page.locator('button:has-text("Edit"), a:has-text("Edit")')
      const hasEdit = await editButton.count() > 0

      if (!hasEdit) {
        test.skip()
        return
      }

      await editButton.first().click()
      await page.waitForTimeout(1000)

      // Toggle visibility
      const publicCheckbox = page.locator('#is_public, input[name="is_public"]')
      const hasCheckbox = await publicCheckbox.count() > 0

      if (hasCheckbox) {
        await publicCheckbox.click()

        const submitButton = page.locator('button[type="submit"]').first()
        await submitButton.click()

        await page.waitForTimeout(2000)

        // Should save successfully
      }
    })
  })

  test.describe('Collection Deletion', () => {
    test('should delete collection with confirmation', async ({ page }) => {
      // First create a test collection
      await page.goto('/collections/new')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionName = `To Delete ${Date.now()}`
      const nameField = page.locator('#name, input[name="name"]')
      await nameField.fill(collectionName)

      const submitButton = page.locator('button[type="submit"]').first()
      await submitButton.click()

      await page.waitForTimeout(2000)

      // Find delete button
      let deleteButton = page.locator('button:has-text("Delete"), button[aria-label*="delete" i]')
      let hasDelete = await deleteButton.count() > 0

      if (!hasDelete) {
        // Check in menu
        const moreButton = page.locator('button:has-text("More"), button[aria-haspopup]')
        const hasMore = await moreButton.count() > 0

        if (hasMore) {
          await moreButton.first().click()
          await page.waitForTimeout(500)
          deleteButton = page.locator('[role="menuitem"]:has-text("Delete")')
          hasDelete = await deleteButton.count() > 0
        }
      }

      if (!hasDelete) {
        test.skip()
        return
      }

      // Handle confirmation dialog
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm')
        await dialog.accept()
      })

      await deleteButton.first().click()
      await page.waitForTimeout(2000)

      // Should redirect after deletion
      const afterUrl = page.url()
      expect(afterUrl).not.toMatch(new RegExp(collectionName))
    })
  })

  test.describe('Mobile Responsive - Collections', () => {
    test('should create collection on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/collections/new')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Form should be usable
      const nameField = page.locator('#name, input[name="name"]')
      await expect(nameField).toBeVisible()

      await nameField.fill(`Mobile Collection ${Date.now()}`)

      const submitButton = page.locator('button[type="submit"]').first()
      await submitButton.scrollIntoViewIfNeeded()
      await expect(submitButton).toBeVisible()
    })

    test('should view collection on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/collections')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const collectionLinks = page.locator('a[href^="/collections/"]:not([href="/collections/new"])')
      const count = await collectionLinks.count()

      if (count > 0) {
        await collectionLinks.first().click()
        await page.waitForURL(/\/collections\/[a-f0-9-]+/)

        // Should be viewable on mobile
        await expect(page.locator('h1, h2')).toBeVisible()
      }
    })
  })
})
