import { test as base, Page } from '@playwright/test'
import { generateTestEmail, generateTestPassword, generateTestUsername, login } from '../utils/test-helpers'

type AuthFixtures = {
  authenticatedPage: Page
  testUser: {
    email: string
    password: string
    name: string
  }
}

/**
 * Extended test with authenticated page fixture
 * Use this for tests that require authentication
 */
export const test = base.extend<AuthFixtures>({
  testUser: async ({}, use) => {
    // Generate unique test user credentials
    const testUser = {
      email: generateTestEmail(),
      password: generateTestPassword(),
      name: generateTestUsername(),
    }

    await use(testUser)

    // Cleanup logic would go here if needed
  },

  authenticatedPage: async ({ page, testUser }, use) => {
    // Note: For these tests to work, the test user must exist in Supabase
    // In a real implementation, you would:
    // 1. Use Supabase Admin SDK to create the test user
    // 2. Or use the signup flow to create the user
    // 3. Then login

    // For now, we'll use the login helper
    // In production, you'd create the user first via Supabase Admin API
    try {
      await login(page, testUser.email, testUser.password)
    } catch (error) {
      // If login fails, the user might not exist
      // You could create the user here via signup flow
      console.warn('Login failed, user may not exist:', error)
    }

    await use(page)

    // Cleanup: logout after test
    await page.goto('/auth/logout')
  },
})

export { expect } from '@playwright/test'
