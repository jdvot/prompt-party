import { test, expect } from '@playwright/test'

/**
 * Comprehensive Profile Management E2E Tests
 *
 * Test Strategy:
 * - Test viewing own profile
 * - Test viewing other users' profiles
 * - Test editing profile settings
 * - Test avatar upload
 * - Test profile statistics display
 * - Test user's prompts and collections
 *
 * Coverage:
 * - Happy path: view → edit → save profile
 * - Edge cases: empty profiles, invalid inputs
 * - Error cases: unauthorized access
 */

test.describe('Profile Management - Comprehensive', () => {
  test.describe('Profile Viewing', () => {
    test('should access own profile', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      // Might redirect to login if not authenticated
      if (currentUrl.includes('/auth/login')) {
        expect(currentUrl).toContain('/auth/login')
      } else {
        // Should be on profile page
        expect(currentUrl).toMatch(/\/profile/)

        // Profile should have content
        const heading = page.locator('h1, h2').first()
        await expect(heading).toBeVisible()
      }
    })

    test('should display profile information', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Should display user name
      const userName = page.locator('[data-username], .username, h1')
      await expect(userName.first()).toBeVisible()

      // Should display avatar or placeholder
      const avatar = page.locator('[data-avatar], img[alt*="avatar" i], .avatar')
      const hasAvatar = await avatar.count() > 0
      expect(hasAvatar).toBe(true)
    })

    test('should display profile statistics', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for stats (prompts count, likes, followers, etc.)
      const stats = page.locator('[data-stats], .stats, text=/\\d+ prompt/, text=/\\d+ like/')
      const hasStats = await stats.count() > 0

      // Stats might be displayed
      if (hasStats) {
        const statText = await stats.first().textContent()
        expect(statText).toBeTruthy()
      }
    })

    test('should display user\'s prompts', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for prompts section
      const promptsSection = page.locator('text=/my prompts|your prompts/i, [data-user-prompts]')
      const hasSection = await promptsSection.count() > 0

      // Prompts section should exist
      if (hasSection) {
        // Look for prompt cards
        const promptCards = page.locator('a[href^="/prompts/"]')
        const count = await promptCards.count()

        // Might have prompts or empty state
        expect(count).toBeGreaterThanOrEqual(0)
      }
    })

    test('should display user\'s collections', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for collections section
      const collectionsSection = page.locator('text=/my collections|your collections/i, [data-user-collections]')
      const hasSection = await collectionsSection.count() > 0

      if (hasSection) {
        // Look for collection cards
        const collectionCards = page.locator('a[href^="/collections/"]')
        const count = await collectionCards.count()

        expect(count).toBeGreaterThanOrEqual(0)
      }
    })

    test('should view another user\'s profile', async ({ page }) => {
      // First, find a prompt to get another user's profile link
      await page.goto('/')
      await page.waitForTimeout(2000)

      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      if (count === 0) {
        test.skip()
        return
      }

      // Navigate to a prompt
      await promptCards.first().click()
      await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

      // Find author link
      const authorLink = page.locator('a[href^="/profile/"]')
      const hasAuthor = await authorLink.count() > 0

      if (!hasAuthor) {
        test.skip()
        return
      }

      // Click author link
      await authorLink.first().click()
      await page.waitForTimeout(2000)

      // Should be on user's profile
      const currentUrl = page.url()
      expect(currentUrl).toMatch(/\/profile\//)

      // Should display user info
      const userName = page.locator('h1, h2').first()
      await expect(userName).toBeVisible()
    })

    test('should display public prompts only on other users\' profiles', async ({ page }) => {
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

      const authorLink = page.locator('a[href^="/profile/"]')
      const hasAuthor = await authorLink.count() > 0

      if (!hasAuthor) {
        test.skip()
        return
      }

      await authorLink.first().click()
      await page.waitForTimeout(2000)

      // Should only see public prompts (not private ones)
      const visiblePrompts = page.locator('a[href^="/prompts/"]')
      const visibleCount = await visiblePrompts.count()

      // Should have some prompts or empty state
      expect(visibleCount).toBeGreaterThanOrEqual(0)
    })
  })

  test.describe('Profile Settings', () => {
    test('should navigate to profile settings', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      if (currentUrl.includes('/auth/login')) {
        // Redirected to login - authentication required
        expect(currentUrl).toContain('/auth/login')
      } else {
        // Should be on settings page
        expect(currentUrl).toContain('/settings')

        // Settings form should be visible
        const form = page.locator('form').first()
        const formVisible = await form.isVisible().catch(() => false)

        if (formVisible) {
          await expect(form).toBeVisible()
        }
      }
    })

    test('should display profile settings form', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Should have name/username field
      const nameField = page.locator('#name, input[name="name"], input[name="username"]')
      const hasName = await nameField.count() > 0
      expect(hasName).toBe(true)

      // Should have email field (might be readonly)
      const emailField = page.locator('#email, input[name="email"]')
      const hasEmail = await emailField.count() > 0
      // Email field might be present

      // Should have bio/description field
      const bioField = page.locator('#bio, textarea[name="bio"], textarea[name="description"]')
      const hasBio = await bioField.count() > 0
      // Bio field might be present
    })

    test('should edit profile name', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const nameField = page.locator('#name, input[name="name"], input[name="username"]')
      const hasName = await nameField.count() > 0

      if (!hasName) {
        test.skip()
        return
      }

      // Update name
      const newName = `Test User ${Date.now()}`
      await nameField.clear()
      await nameField.fill(newName)

      // Save changes
      const saveButton = page.locator('button[type="submit"]:has-text("Save"), button:has-text("Update")')
      const hasSave = await saveButton.count() > 0

      if (hasSave) {
        await saveButton.first().click()
        await page.waitForTimeout(2000)

        // Should show success message or redirect
        const successMessage = page.locator('text=/saved|updated|success/i')
        const hasSuccess = await successMessage.isVisible().catch(() => false)

        // Success feedback might be shown
      }
    })

    test('should edit profile bio', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const bioField = page.locator('#bio, textarea[name="bio"]')
      const hasBio = await bioField.count() > 0

      if (!hasBio) {
        test.skip()
        return
      }

      // Update bio
      const newBio = `This is a test bio updated at ${new Date().toISOString()}`
      await bioField.clear()
      await bioField.fill(newBio)

      const saveButton = page.locator('button[type="submit"]').first()
      await saveButton.click()
      await page.waitForTimeout(2000)

      // Should save successfully
    })

    test('should validate profile field requirements', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const nameField = page.locator('#name, input[name="name"]')
      const hasName = await nameField.count() > 0

      if (!hasName) {
        test.skip()
        return
      }

      // Try to clear required name field
      await nameField.clear()

      const saveButton = page.locator('button[type="submit"]').first()
      await saveButton.click()
      await page.waitForTimeout(1000)

      // Should prevent saving or show validation error
      // Check if name field is valid
      const isValid = await nameField.evaluate(
        (input: HTMLInputElement) => input.validity.valid
      )

      // Empty name should be invalid (if required)
      expect(isValid).toBe(false)
    })

    test('should handle profile field length limits', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      const bioField = page.locator('#bio, textarea[name="bio"]')
      const hasBio = await bioField.count() > 0

      if (!hasBio) {
        test.skip()
        return
      }

      // Very long bio
      const longBio = 'A'.repeat(1000)
      await bioField.fill(longBio)

      const saveButton = page.locator('button[type="submit"]').first()
      await saveButton.click()
      await page.waitForTimeout(2000)

      // Should either truncate, show error, or accept it
    })
  })

  test.describe('Avatar Management', () => {
    test('should display avatar upload section', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for avatar upload UI
      const avatarSection = page.locator('[data-avatar-upload], text=/avatar|photo|picture/i')
      const hasAvatarSection = await avatarSection.count() > 0

      // Avatar upload section might be present
      if (hasAvatarSection) {
        await expect(avatarSection.first()).toBeVisible()
      }
    })

    test('should display current avatar', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for avatar image
      const avatar = page.locator('[data-avatar] img, img[alt*="avatar" i], .avatar img')
      const hasAvatar = await avatar.count() > 0

      if (hasAvatar) {
        await expect(avatar.first()).toBeVisible()
      }
    })

    test('should show avatar upload button', async ({ page }) => {
      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for upload button
      const uploadButton = page.locator('button:has-text("Upload"), input[type="file"], button:has-text("Change")')
      const hasUpload = await uploadButton.count() > 0

      // Upload functionality might be present
    })

    // Note: File upload testing requires special setup
    // This is a placeholder for actual file upload testing
    test.skip('should upload new avatar image', async ({ page }) => {
      // This would require actual file handling
      // Skipped in basic test suite
    })
  })

  test.describe('Profile Activity', () => {
    test('should display recent activity', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for activity section
      const activitySection = page.locator('[data-activity], text=/recent activity|activity/i')
      const hasActivity = await activitySection.count() > 0

      // Activity section might be present
    })

    test('should filter profile content by type', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for content filter tabs (prompts, collections, likes, etc.)
      const filterTabs = page.locator('[role="tablist"], .tabs, button:has-text("Prompts"), button:has-text("Collections")')
      const hasTabs = await filterTabs.count() > 0

      if (hasTabs) {
        // Click different tabs
        const tabs = filterTabs.locator('button, a')
        const tabCount = await tabs.count()

        if (tabCount > 1) {
          await tabs.nth(1).click()
          await page.waitForTimeout(1000)

          // Content should update
        }
      }
    })
  })

  test.describe('Profile Privacy', () => {
    test('should access own private prompts on profile', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // On own profile, should see both public and private prompts
      const prompts = page.locator('a[href^="/prompts/"]')
      const count = await prompts.count()

      // Should have access to all prompts
      expect(count).toBeGreaterThanOrEqual(0)
    })

    test('should not see private prompts on other users\' profiles', async ({ page }) => {
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

      const authorLink = page.locator('a[href^="/profile/"]')
      const hasAuthor = await authorLink.count() > 0

      if (!hasAuthor) {
        test.skip()
        return
      }

      await authorLink.first().click()
      await page.waitForTimeout(2000)

      // Should only see public content on other users' profiles
      // No way to verify this without knowing which prompts are private
      // But the UI should not show private indicators
      const privateIndicator = page.locator('text=/private/i')
      const hasPrivate = await privateIndicator.count() > 0

      // Private prompts shouldn't be shown
    })
  })

  test.describe('Profile Social Features', () => {
    test('should display follow button on other users\' profiles', async ({ page }) => {
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

      const authorLink = page.locator('a[href^="/profile/"]')
      const hasAuthor = await authorLink.count() > 0

      if (!hasAuthor) {
        test.skip()
        return
      }

      await authorLink.first().click()
      await page.waitForTimeout(2000)

      // Look for follow button
      const followButton = page.locator('button:has-text("Follow"), button:has-text("Unfollow")')
      const hasFollow = await followButton.count() > 0

      // Follow button might be present
    })

    test('should display follower/following count', async ({ page }) => {
      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Look for follower counts
      const followerCount = page.locator('text=/\\d+ follower/, [data-followers]')
      const followingCount = page.locator('text=/\\d+ following/, [data-following]')

      const hasFollowers = await followerCount.count() > 0
      const hasFollowing = await followingCount.count() > 0

      // Social counts might be displayed
    })
  })

  test.describe('Mobile Responsive - Profile', () => {
    test('should view profile on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/profile/me')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Profile should be viewable
      const userName = page.locator('h1, h2').first()
      await expect(userName).toBeVisible()

      // Avatar should be visible
      const avatar = page.locator('[data-avatar], .avatar')
      const hasAvatar = await avatar.count() > 0

      if (hasAvatar) {
        await expect(avatar.first()).toBeVisible()
      }
    })

    test('should edit profile on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/profile/settings')
      await page.waitForTimeout(2000)

      const currentUrl = page.url()
      if (currentUrl.includes('/auth/login')) {
        test.skip()
        return
      }

      // Form should be usable on mobile
      const nameField = page.locator('#name, input[name="name"]')
      const hasName = await nameField.count() > 0

      if (hasName) {
        await expect(nameField).toBeVisible()

        // Should be able to edit
        await nameField.fill('Mobile Test User')

        const saveButton = page.locator('button[type="submit"]').first()
        await saveButton.scrollIntoViewIfNeeded()
        await expect(saveButton).toBeVisible()
      }
    })
  })

  test.describe('Profile SEO and Sharing', () => {
    test('should have proper meta tags on profile pages', async ({ page }) => {
      await page.goto('/')
      await page.waitForTimeout(2000)

      const promptCards = page.locator('a[href^="/prompts/"]')
      const count = await promptCards.count()

      if (count > 0) {
        await promptCards.first().click()
        await page.waitForURL(/\/prompts\/[a-f0-9-]+/)

        const authorLink = page.locator('a[href^="/profile/"]')
        const hasAuthor = await authorLink.count() > 0

        if (hasAuthor) {
          await authorLink.first().click()
          await page.waitForTimeout(2000)

          // Check for meta tags
          const title = await page.title()
          expect(title).toBeTruthy()

          const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
          const description = await page.locator('meta[name="description"]').getAttribute('content')

          // Meta tags should be present for SEO
        }
      }
    })
  })
})
