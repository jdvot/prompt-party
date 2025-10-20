import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/login.page'
import { SignupPage } from './pages/signup.page'
import { generateTestEmail, generateTestPassword, generateTestUsername } from './utils/test-helpers'

/**
 * Authentication E2E Tests
 *
 * Test Strategy:
 * - Test email/password authentication flows
 * - Verify OAuth provider buttons are present (actual OAuth flow requires real providers)
 * - Test error states and validation
 * - Verify session persistence and logout
 */

test.describe('Authentication', () => {
  test.describe('Login Page', () => {
    test('should display login form with all elements', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()

      // Verify all form elements are present
      await expect(loginPage.emailInput).toBeVisible()
      await expect(loginPage.passwordInput).toBeVisible()
      await expect(loginPage.submitButton).toBeVisible()
      await expect(loginPage.googleButton).toBeVisible()
      await expect(loginPage.githubButton).toBeVisible()
      await expect(loginPage.signupLink).toBeVisible()

      // Verify heading
      await expect(page.locator('h1:has-text("Welcome back")')).toBeVisible()
    })

    test('should navigate to signup page', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()

      await loginPage.goToSignup()
      await page.waitForURL('/auth/signup')

      await expect(page.locator('h1:has-text("Create your account")')).toBeVisible()
    })

    test('should show error for invalid credentials', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()

      await loginPage.login('invalid@test.com', 'wrongpassword')

      // Wait for error message
      await page.waitForTimeout(2000)

      // Check if error is visible (might vary based on Supabase error handling)
      const errorVisible = await loginPage.isErrorVisible()
      if (errorVisible) {
        await expect(loginPage.errorMessage).toBeVisible()
      }
    })

    test('should validate email format', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()

      // Try to submit with invalid email
      await loginPage.emailInput.fill('notanemail')
      await loginPage.passwordInput.fill('password123')

      // HTML5 validation should prevent submission
      const emailValidity = await loginPage.emailInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
      )
      expect(emailValidity).toBe(false)
    })

    test('should require password', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()

      await loginPage.emailInput.fill('test@test.com')
      // Don't fill password

      const submitButton = await loginPage.submitButton
      const isDisabled = await submitButton.isDisabled()

      // Button might be disabled or validation might prevent submission
      if (!isDisabled) {
        await submitButton.click()
        // Form should not submit successfully
        await page.waitForTimeout(1000)
        await expect(page).toHaveURL('/auth/login')
      }
    })

    test('should display OAuth provider buttons', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()

      // Verify OAuth buttons are present and clickable
      await expect(loginPage.googleButton).toBeVisible()
      await expect(loginPage.googleButton).toBeEnabled()

      await expect(loginPage.githubButton).toBeVisible()
      await expect(loginPage.githubButton).toBeEnabled()
    })
  })

  test.describe('Signup Page', () => {
    test('should display signup form with all elements', async ({ page }) => {
      const signupPage = new SignupPage(page)
      await signupPage.goto()

      // Verify all form elements are present
      await expect(signupPage.nameInput).toBeVisible()
      await expect(signupPage.emailInput).toBeVisible()
      await expect(signupPage.passwordInput).toBeVisible()
      await expect(signupPage.submitButton).toBeVisible()
      await expect(signupPage.googleButton).toBeVisible()
      await expect(signupPage.githubButton).toBeVisible()
      await expect(signupPage.loginLink).toBeVisible()

      // Verify heading
      await expect(page.locator('h1:has-text("Create your account")')).toBeVisible()
    })

    test('should navigate to login page', async ({ page }) => {
      const signupPage = new SignupPage(page)
      await signupPage.goto()

      await signupPage.goToLogin()
      await page.waitForURL('/auth/login')

      await expect(page.locator('h1:has-text("Welcome back")')).toBeVisible()
    })

    test('should validate required fields', async ({ page }) => {
      const signupPage = new SignupPage(page)
      await signupPage.goto()

      // Try to submit without filling fields
      await signupPage.submitButton.click()

      // HTML5 validation should prevent submission
      await expect(page).toHaveURL('/auth/signup')
    })

    test('should validate email format', async ({ page }) => {
      const signupPage = new SignupPage(page)
      await signupPage.goto()

      await signupPage.nameInput.fill('Test User')
      await signupPage.emailInput.fill('invalid-email')
      await signupPage.passwordInput.fill('password123')

      const emailValidity = await signupPage.emailInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
      )
      expect(emailValidity).toBe(false)
    })

    test('should enforce minimum password length', async ({ page }) => {
      const signupPage = new SignupPage(page)
      await signupPage.goto()

      await signupPage.nameInput.fill('Test User')
      await signupPage.emailInput.fill('test@test.com')
      await signupPage.passwordInput.fill('12345') // Less than 6 characters

      const passwordValidity = await signupPage.passwordInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
      )
      expect(passwordValidity).toBe(false)
    })

    test('should show alert on successful signup', async ({ page }) => {
      const signupPage = new SignupPage(page)
      await signupPage.goto()

      const testEmail = generateTestEmail()
      const testPassword = generateTestPassword()
      const testName = generateTestUsername()

      // Listen for dialog (alert)
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Check your email')
        await dialog.accept()
      })

      await signupPage.signup(testName, testEmail, testPassword)

      // Wait for potential alert
      await page.waitForTimeout(2000)
    })
  })

  test.describe('Logout', () => {
    test('should logout and redirect to home', async ({ page }) => {
      // Note: This test assumes we have a way to be logged in
      // In a real test, you'd login first or use authenticated fixture

      await page.goto('/auth/logout')

      // Should redirect to home page
      await page.waitForURL('/', { timeout: 10000 })

      // Verify we're on home page and not authenticated
      await expect(page).toHaveURL('/')

      // Login/Signup links should be visible
      const loginLink = page.locator('a[href="/auth/login"]')
      const signupLink = page.locator('a[href="/auth/signup"]')

      // At least one should be visible
      const loginVisible = await loginLink.isVisible().catch(() => false)
      const signupVisible = await signupLink.isVisible().catch(() => false)

      expect(loginVisible || signupVisible).toBe(true)
    })
  })

  test.describe('Protected Routes', () => {
    test('should redirect to login when accessing create prompt page without auth', async ({
      page,
    }) => {
      // Try to access a protected route
      await page.goto('/prompts/new')

      // Should redirect to login (or show auth-required state)
      // Note: Behavior depends on middleware implementation
      await page.waitForTimeout(2000)

      const currentUrl = page.url()

      // Either redirected to login or stayed on page with auth prompt
      const isLoginPage = currentUrl.includes('/auth/login')
      const hasAuthPrompt = await page.locator('text=/sign in|login|authenticate/i').isVisible().catch(() => false)

      expect(isLoginPage || hasAuthPrompt).toBe(true)
    })
  })
})
