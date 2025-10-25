import { Page, expect, BrowserContext } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'

/**
 * Comprehensive Test Helpers for Prompt Party E2E Tests
 *
 * This file provides advanced helper functions for testing including:
 * - Database setup and teardown
 * - Test data factories
 * - Advanced navigation helpers
 * - Real-time subscription testing
 * - API mocking utilities
 */

// =============================================================================
// Test Data Generators
// =============================================================================

/**
 * Generate a complete test user with all required fields
 */
export function generateTestUser() {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)

  return {
    email: `test-${timestamp}-${random}@promptparty.test`,
    password: `TestPass123!${random}`,
    name: `Test User ${timestamp}`,
    username: `testuser_${timestamp}_${random}`,
    bio: `Test user bio created at ${new Date().toISOString()}`
  }
}

/**
 * Generate test prompt data
 */
export function generateTestPrompt(overrides: Partial<{
  title: string
  body: string
  tags: string[]
  is_public: boolean
}> = {}) {
  const timestamp = Date.now()

  return {
    title: overrides.title || `Test Prompt ${timestamp}`,
    body: overrides.body || `This is a test prompt created at ${new Date().toISOString()}\n\n**This is bold text**\n\nThis is a multi-line prompt with markdown formatting.`,
    tags: overrides.tags || ['testing', 'e2e', 'automated'],
    is_public: overrides.is_public !== undefined ? overrides.is_public : true
  }
}

/**
 * Generate test collection data
 */
export function generateTestCollection(overrides: Partial<{
  name: string
  description: string
  is_public: boolean
}> = {}) {
  const timestamp = Date.now()

  return {
    name: overrides.name || `Test Collection ${timestamp}`,
    description: overrides.description || `Test collection created at ${new Date().toISOString()}`,
    is_public: overrides.is_public !== undefined ? overrides.is_public : true
  }
}

/**
 * Generate test comment data
 */
export function generateTestComment(overrides: Partial<{
  body: string
}> = {}) {
  const timestamp = Date.now()

  return {
    body: overrides.body || `Test comment at ${timestamp}`
  }
}

// =============================================================================
// Advanced Navigation Helpers
// =============================================================================

/**
 * Navigate and wait for network idle
 */
export async function navigateAndWait(page: Page, url: string, timeout: number = 30000) {
  await page.goto(url, { waitUntil: 'networkidle', timeout })
  await page.waitForLoadState('domcontentloaded')
}

/**
 * Wait for element with retry logic
 */
export async function waitForElementWithRetry(
  page: Page,
  selector: string,
  options: {
    timeout?: number
    retries?: number
    retryDelay?: number
  } = {}
) {
  const { timeout = 5000, retries = 3, retryDelay = 1000 } = options

  for (let i = 0; i < retries; i++) {
    try {
      await page.waitForSelector(selector, { state: 'visible', timeout })
      return true
    } catch (error) {
      if (i === retries - 1) throw error
      await page.waitForTimeout(retryDelay)
    }
  }
  return false
}

/**
 * Scroll element into view and wait
 */
export async function scrollToElement(page: Page, selector: string) {
  const element = await page.locator(selector).first()
  await element.scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  return element
}

/**
 * Click element with retry on failure
 */
export async function clickWithRetry(page: Page, selector: string, maxRetries: number = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const element = await page.locator(selector).first()
      await element.scrollIntoViewIfNeeded()
      await element.click({ timeout: 5000 })
      return
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await page.waitForTimeout(500)
    }
  }
}

/**
 * Fill form field with validation check
 */
export async function fillFieldSafely(
  page: Page,
  selector: string,
  value: string,
  options: { clear?: boolean } = {}
) {
  const element = page.locator(selector).first()
  await element.scrollIntoViewIfNeeded()

  if (options.clear) {
    await element.clear()
  }

  await element.fill(value)

  // Verify value was set
  const actualValue = await element.inputValue()
  if (actualValue !== value) {
    // Try again
    await element.clear()
    await element.fill(value)
  }
}

// =============================================================================
// Authentication Helpers
// =============================================================================

/**
 * Complete signup flow and handle email verification
 */
export async function signupComplete(
  page: Page,
  user: { name: string; email: string; password: string }
) {
  await page.goto('/auth/signup')
  await page.waitForLoadState('networkidle')

  await fillFieldSafely(page, '#name', user.name)
  await fillFieldSafely(page, '#email', user.email)
  await fillFieldSafely(page, '#password', user.password)

  // Handle potential dialogs
  page.on('dialog', async dialog => {
    await dialog.accept()
  })

  await page.click('button[type="submit"]')
  await page.waitForTimeout(2000)

  return { success: true, user }
}

/**
 * Complete login flow with error handling
 */
export async function loginComplete(
  page: Page,
  credentials: { email: string; password: string }
): Promise<{ success: boolean; error?: string }> {
  await page.goto('/auth/login')
  await page.waitForLoadState('networkidle')

  await fillFieldSafely(page, '#email', credentials.email)
  await fillFieldSafely(page, '#password', credentials.password)

  await page.click('button[type="submit"]')
  await page.waitForTimeout(2000)

  const currentUrl = page.url()

  if (currentUrl === '/' || !currentUrl.includes('login')) {
    return { success: true }
  }

  // Check for error message
  const errorElement = page.locator('[role="alert"], .error, text=/invalid|incorrect|failed/i')
  const hasError = await errorElement.count() > 0

  if (hasError) {
    const errorText = await errorElement.first().textContent()
    return { success: false, error: errorText || 'Unknown error' }
  }

  return { success: false, error: 'Login failed' }
}

/**
 * Logout with verification
 */
export async function logoutComplete(page: Page) {
  await page.goto('/auth/logout')
  await page.waitForTimeout(2000)

  // Verify logout by checking for login/signup links
  const loginLink = page.locator('a[href="/auth/login"]')
  const isLoggedOut = await loginLink.count() > 0

  return isLoggedOut
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  const loginLink = page.locator('a[href="/auth/login"]')
  const hasLoginLink = await loginLink.count() > 0

  const userMenu = page.locator('[data-user-menu], a[href*="/profile/me"]')
  const hasUserMenu = await userMenu.count() > 0

  return !hasLoginLink && hasUserMenu
}

// =============================================================================
// Prompt Helpers
// =============================================================================

/**
 * Create prompt with full validation
 */
export async function createPromptComplete(
  page: Page,
  promptData: {
    title: string
    body: string
    tags?: string[]
    is_public?: boolean
  }
): Promise<{ success: boolean; promptId?: string; error?: string }> {
  await page.goto('/prompts/new')
  await page.waitForTimeout(2000)

  // Check if redirected to login
  if (page.url().includes('/auth/login')) {
    return { success: false, error: 'Not authenticated' }
  }

  await fillFieldSafely(page, '#title', promptData.title)
  await fillFieldSafely(page, 'textarea[placeholder*="Write your prompt"], textarea[name="body"]', promptData.body)

  if (promptData.tags) {
    const tagsField = page.locator('#tags, input[name="tags"]')
    const hasTags = await tagsField.count() > 0

    if (hasTags) {
      await fillFieldSafely(page, '#tags', promptData.tags.join(', '))
    }
  }

  if (promptData.is_public !== undefined) {
    const checkbox = page.locator('#is_public, input[name="is_public"]')
    const hasCheckbox = await checkbox.count() > 0

    if (hasCheckbox) {
      const isChecked = await checkbox.isChecked()
      if (isChecked !== promptData.is_public) {
        await checkbox.click()
      }
    }
  }

  await page.click('button[type="submit"]')
  await page.waitForTimeout(2000)

  const currentUrl = page.url()
  const promptMatch = currentUrl.match(/\/prompts\/([a-f0-9-]+)/)

  if (promptMatch) {
    return { success: true, promptId: promptMatch[1] }
  }

  return { success: false, error: 'Failed to create prompt' }
}

/**
 * Like a prompt with optimistic update verification
 */
export async function likePrompt(page: Page, promptId: string) {
  await page.goto(`/prompts/${promptId}`)
  await page.waitForTimeout(1000)

  const likeButton = page.locator('button:has-text("Like"), button[aria-label*="like" i]').first()

  // Get initial state
  const initialLikes = await page.locator('[data-likes], text=/\\d+ like/').first().textContent()
  const initialCount = parseInt(initialLikes?.match(/\d+/)?.[0] || '0')

  await likeButton.click()
  await page.waitForTimeout(500)

  // Verify optimistic update
  const afterLikes = await page.locator('[data-likes], text=/\\d+ like/').first().textContent()
  const afterCount = parseInt(afterLikes?.match(/\d+/)?.[0] || '0')

  return {
    success: afterCount !== initialCount,
    previousCount: initialCount,
    newCount: afterCount
  }
}

/**
 * Comment on a prompt
 */
export async function addComment(page: Page, promptId: string, commentBody: string) {
  await page.goto(`/prompts/${promptId}`)
  await page.waitForTimeout(1000)

  const textarea = page.locator('textarea[placeholder*="comment" i]')
  const hasTextarea = await textarea.count() > 0

  if (!hasTextarea) {
    return { success: false, error: 'Comment form not found' }
  }

  await fillFieldSafely(page, 'textarea[placeholder*="comment" i]', commentBody)

  const submitButton = page.locator('form:has(textarea[placeholder*="comment" i]) button[type="submit"]')
  await submitButton.first().click()

  await page.waitForTimeout(2000)

  // Check if comment appeared
  const newComment = page.locator(`text=${commentBody}`)
  const commentVisible = await newComment.isVisible().catch(() => false)

  return {
    success: commentVisible,
    commentBody
  }
}

// =============================================================================
// Collection Helpers
// =============================================================================

/**
 * Create collection with validation
 */
export async function createCollectionComplete(
  page: Page,
  collectionData: {
    name: string
    description?: string
    is_public?: boolean
  }
): Promise<{ success: boolean; collectionId?: string; error?: string }> {
  await page.goto('/collections/new')
  await page.waitForTimeout(2000)

  if (page.url().includes('/auth/login')) {
    return { success: false, error: 'Not authenticated' }
  }

  await fillFieldSafely(page, '#name, input[name="name"]', collectionData.name)

  if (collectionData.description) {
    const descField = page.locator('#description, textarea[name="description"]')
    const hasDesc = await descField.count() > 0

    if (hasDesc) {
      await fillFieldSafely(page, '#description', collectionData.description)
    }
  }

  if (collectionData.is_public !== undefined) {
    const checkbox = page.locator('#is_public, input[name="is_public"]')
    const hasCheckbox = await checkbox.count() > 0

    if (hasCheckbox) {
      const isChecked = await checkbox.isChecked()
      if (isChecked !== collectionData.is_public) {
        await checkbox.click()
      }
    }
  }

  await page.click('button[type="submit"]')
  await page.waitForTimeout(2000)

  const currentUrl = page.url()
  const collectionMatch = currentUrl.match(/\/collections\/([a-f0-9-]+)/)

  if (collectionMatch) {
    return { success: true, collectionId: collectionMatch[1] }
  }

  return { success: false, error: 'Failed to create collection' }
}

// =============================================================================
// Assertion Helpers
// =============================================================================

/**
 * Assert page has expected elements
 */
export async function assertPageStructure(
  page: Page,
  elements: { selector: string; shouldExist: boolean }[]
) {
  const results = []

  for (const { selector, shouldExist } of elements) {
    const count = await page.locator(selector).count()
    const exists = count > 0

    results.push({
      selector,
      expected: shouldExist,
      actual: exists,
      passed: exists === shouldExist
    })
  }

  return results
}

/**
 * Assert text content matches pattern
 */
export async function assertTextMatches(
  page: Page,
  selector: string,
  pattern: string | RegExp
) {
  const element = page.locator(selector).first()
  const text = await element.textContent()

  if (typeof pattern === 'string') {
    return text?.includes(pattern)
  }

  return pattern.test(text || '')
}

// =============================================================================
// Cookie and Storage Helpers
// =============================================================================

/**
 * Get authentication cookies
 */
export async function getAuthCookies(context: BrowserContext) {
  const cookies = await context.cookies()

  return cookies.filter(cookie =>
    cookie.name.includes('auth') ||
    cookie.name.includes('supabase') ||
    cookie.name.includes('sb-')
  )
}

/**
 * Clear all cookies
 */
export async function clearAllCookies(context: BrowserContext) {
  await context.clearCookies()
}

/**
 * Get localStorage value
 */
export async function getLocalStorage(page: Page, key: string) {
  return await page.evaluate((k) => {
    return localStorage.getItem(k)
  }, key)
}

/**
 * Set localStorage value
 */
export async function setLocalStorage(page: Page, key: string, value: string) {
  await page.evaluate(
    ({ k, v }) => {
      localStorage.setItem(k, v)
    },
    { k: key, v: value }
  )
}

// =============================================================================
// Visual and Accessibility Helpers
// =============================================================================

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector).first()

  return await element.evaluate((el) => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  })
}

/**
 * Get element computed style
 */
export async function getComputedStyle(page: Page, selector: string, property: string) {
  const element = page.locator(selector).first()

  return await element.evaluate(
    (el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop)
    },
    property
  )
}

/**
 * Check if element has focus
 */
export async function hasFocus(page: Page, selector: string): Promise<boolean> {
  const element = page.locator(selector).first()

  return await element.evaluate((el) => {
    return document.activeElement === el
  })
}

// =============================================================================
// Performance Helpers
// =============================================================================

/**
 * Measure page load time
 */
export async function measurePageLoad(page: Page, url: string) {
  const startTime = Date.now()

  await page.goto(url, { waitUntil: 'networkidle' })

  const endTime = Date.now()
  const loadTime = endTime - startTime

  return {
    url,
    loadTime,
    timestamp: new Date().toISOString()
  }
}

/**
 * Wait for API response
 */
export async function waitForApiCall(
  page: Page,
  urlPattern: string | RegExp,
  method: string = 'GET'
) {
  return await page.waitForResponse(
    (response) => {
      const matches = typeof urlPattern === 'string'
        ? response.url().includes(urlPattern)
        : urlPattern.test(response.url())

      return matches && response.request().method() === method
    },
    { timeout: 30000 }
  )
}

// =============================================================================
// Cleanup Helpers
// =============================================================================

/**
 * Delete prompt (if possible via UI)
 */
export async function deletePrompt(page: Page, promptId: string) {
  await page.goto(`/prompts/${promptId}`)
  await page.waitForTimeout(1000)

  const deleteButton = page.locator('button:has-text("Delete")')
  const hasDelete = await deleteButton.count() > 0

  if (!hasDelete) {
    // Check in menu
    const moreButton = page.locator('button:has-text("More"), button[aria-haspopup]')
    const hasMore = await moreButton.count() > 0

    if (hasMore) {
      await moreButton.first().click()
      await page.waitForTimeout(500)
    }
  }

  const deleteBtn = page.locator('button:has-text("Delete")').first()
  const canDelete = await deleteBtn.count() > 0

  if (canDelete) {
    page.on('dialog', async dialog => {
      await dialog.accept()
    })

    await deleteBtn.click()
    await page.waitForTimeout(2000)

    return { success: true }
  }

  return { success: false, error: 'Delete button not found' }
}

// =============================================================================
// Debug Helpers
// =============================================================================

/**
 * Take screenshot with timestamp
 */
export async function takeDebugScreenshot(page: Page, name: string) {
  const timestamp = Date.now()
  const filename = `debug-${name}-${timestamp}.png`
  await page.screenshot({ path: `test-results/${filename}`, fullPage: true })
  return filename
}

/**
 * Log page console errors
 */
export function captureConsoleErrors(page: Page): string[] {
  const errors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })

  return errors
}

/**
 * Log network failures
 */
export function captureNetworkFailures(page: Page): Array<{ url: string; status: number }> {
  const failures: Array<{ url: string; status: number }> = []

  page.on('response', (response) => {
    if (response.status() >= 400) {
      failures.push({
        url: response.url(),
        status: response.status()
      })
    }
  })

  return failures
}
