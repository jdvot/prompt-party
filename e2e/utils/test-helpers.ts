import { Page, expect } from '@playwright/test'

/**
 * Generate a unique test user email
 */
export function generateTestEmail(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  return `test-${timestamp}-${random}@promptparty.test`
}

/**
 * Generate a unique username
 */
export function generateTestUsername(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  return `testuser_${timestamp}_${random}`
}

/**
 * Generate test password
 */
export function generateTestPassword(): string {
  return `TestPass123!${Math.random().toString(36).substring(7)}`
}

/**
 * Wait for navigation to complete
 */
export async function waitForNavigation(page: Page, url?: string) {
  if (url) {
    await page.waitForURL(url, { timeout: 10000 })
  } else {
    await page.waitForLoadState('networkidle', { timeout: 10000 })
  }
}

/**
 * Login helper function
 */
export async function login(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto('/auth/login')
  await page.fill('#email', email)
  await page.fill('#password', password)
  await page.click('button[type="submit"]')

  // Wait for redirect to home page
  await page.waitForURL('/', { timeout: 15000 })
}

/**
 * Signup helper function
 */
export async function signup(
  page: Page,
  name: string,
  email: string,
  password: string
): Promise<void> {
  await page.goto('/auth/signup')
  await page.fill('#name', name)
  await page.fill('#email', email)
  await page.fill('#password', password)
  await page.click('button[type="submit"]')

  // Wait for alert or success message
  await page.waitForTimeout(1000)
}

/**
 * Logout helper function
 */
export async function logout(page: Page): Promise<void> {
  // Navigate to logout route
  await page.goto('/auth/logout')

  // Wait for redirect to home page
  await page.waitForURL('/', { timeout: 10000 })
}

/**
 * Create a test prompt
 */
export async function createPrompt(
  page: Page,
  title: string,
  body: string,
  tags?: string,
  isPublic: boolean = true
): Promise<string> {
  await page.goto('/prompts/new')

  await page.fill('#title', title)
  await page.fill('textarea[placeholder*="Write your prompt"]', body)

  if (tags) {
    await page.fill('#tags', tags)
  }

  if (!isPublic) {
    await page.uncheck('#is_public')
  }

  await page.click('button[type="submit"]')

  // Wait for redirect to prompt page and extract ID from URL
  await page.waitForURL(/\/prompts\/[a-f0-9-]+/, { timeout: 15000 })
  const url = page.url()
  const id = url.split('/prompts/')[1]

  return id
}

/**
 * Wait for element to be visible
 */
export async function waitForElement(page: Page, selector: string, timeout: number = 5000) {
  await page.waitForSelector(selector, { state: 'visible', timeout })
}

/**
 * Check if element exists
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  try {
    const element = await page.$(selector)
    return element !== null
  } catch {
    return false
  }
}

/**
 * Get element text content
 */
export async function getElementText(page: Page, selector: string): Promise<string> {
  const element = await page.$(selector)
  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }
  const text = await element.textContent()
  return text || ''
}

/**
 * Wait for API response
 */
export async function waitForApiResponse(page: Page, urlPattern: string | RegExp) {
  return page.waitForResponse(
    (response) => {
      const url = response.url()
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern)
      }
      return urlPattern.test(url)
    },
    { timeout: 10000 }
  )
}

/**
 * Clean up test data helper
 * Note: This would require admin Supabase access in a real implementation
 */
export async function cleanupTestData(userIds: string[]) {
  // This is a placeholder - in production you'd use Supabase admin client
  // to clean up test data created during tests
  console.log('Cleanup test data for users:', userIds)
}
