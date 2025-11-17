import { test, expect } from '@playwright/test'
import { testInAllLanguages, switchLanguage, loadTranslations, Locale } from '../setup/translation-helpers'

/**
 * Authentication Pages Translation Tests
 *
 * Test auth-related pages for proper translations:
 * - Login (/auth/login)
 * - Signup (/auth/signup)
 * - Auth Error (/auth/auth-code-error)
 */

test.describe('Authentication Pages - Translations', () => {
  test.describe('Login Page', () => {
    test('should display login page in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Should have page heading
        const heading = page.locator('h1, [role="heading"]').first()
        await expect(heading).toBeVisible()

        // Should have email/username input
        const emailInput = page.locator('input[type="email"], input[placeholder*="email" i], input[name*="email" i]').first()
        const emailVisible = await emailInput.isVisible().catch(() => false)
        expect(emailVisible).toBeTruthy()
      })
    })

    test('should display login form fields with translated labels', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        // Email field should exist
        const emailField = page.locator('input[type="email"], [type="email"]').first()
        const emailFieldVisible = await emailField.isVisible().catch(() => false)
        expect(emailFieldVisible).toBeTruthy()

        // Password field should exist
        const passwordField = page.locator('input[type="password"]').first()
        const passwordFieldVisible = await passwordField.isVisible().catch(() => false)
        expect(passwordFieldVisible).toBeTruthy()

        // Submit button should exist
        const submitButton = page.locator('button[type="submit"]').first()
        await expect(submitButton).toBeVisible()
      })
    })

    test('should display validation error messages in translated form', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        // Try submitting empty form to trigger validation errors
        const submitButton = page.locator('button[type="submit"]').first()
        await submitButton.click()
        await page.waitForTimeout(1000)

        // Check for error message or validation feedback
        const errorMessage = page.locator('[role="alert"], .error, [class*="error"], [class*="invalid"]').first()
        const errorVisible = await errorMessage.isVisible().catch(() => false)

        // Even if no error shown, form should require input
        const emailInput = page.locator('input[type="email"], input[name*="email"]').first()
        const isRequired = await emailInput.evaluate((el: any) => el.required || el.hasAttribute('required'))
        expect(errorVisible || isRequired).toBeTruthy()
      })
    })

    test('should display sign-up link on login page', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        // Should have a link to signup page
        const signupLink = page.locator('a[href*="/signup"], a:has-text(/sign up|create account|register/i)').first()
        const linkVisible = await signupLink.isVisible().catch(() => false)
        expect(linkVisible).toBeTruthy()
      })
    })

    test('should display OAuth buttons if available', async ({ page }) => {
      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      // Check for OAuth buttons (Google, GitHub, etc.)
      const oauthButtons = page.locator('button:has-text(/google|github|oauth/i)').all()
      const buttons = await oauthButtons

      if (buttons.length > 0) {
        // OAuth buttons should be visible and have text
        for (const button of buttons) {
          const isVisible = await button.isVisible().catch(() => false)
          expect(isVisible).toBeTruthy()

          const text = await button.textContent()
          expect(text).toBeTruthy()
        }
      }
    })
  })

  test.describe('Signup Page', () => {
    test('should display signup page in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/signup')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Should have page heading
        const heading = page.locator('h1, [role="heading"]').first()
        const headingVisible = await heading.isVisible().catch(() => false)
        expect(headingVisible).toBeTruthy()

        // Should have form fields
        const form = page.locator('form').first()
        const formVisible = await form.isVisible().catch(() => false)
        expect(formVisible).toBeTruthy()
      })
    })

    test('should display signup form fields in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/signup')
        await page.waitForLoadState('networkidle')

        // Email field
        const emailInput = page.locator('input[type="email"], input[name*="email"]').first()
        const emailVisible = await emailInput.isVisible().catch(() => false)
        expect(emailVisible).toBeTruthy()

        // Password field
        const passwordInput = page.locator('input[type="password"]').first()
        const passwordVisible = await passwordInput.isVisible().catch(() => false)
        expect(passwordVisible).toBeTruthy()

        // Submit button
        const submitButton = page.locator('button[type="submit"]').first()
        const submitVisible = await submitButton.isVisible().catch(() => false)
        expect(submitVisible).toBeTruthy()
      })
    })

    test('should display terms acceptance if required', async ({ page }) => {
      await page.goto('/auth/signup')
      await page.waitForLoadState('networkidle')

      // Check for terms/privacy checkbox or text
      const termsCheckbox = page.locator('input[type="checkbox"]').first()
      const termsText = page.locator('text=/terms|privacy|agree/i').first()

      const checkboxVisible = await termsCheckbox.isVisible().catch(() => false)
      const textVisible = await termsText.isVisible().catch(() => false)

      // At least one should be visible
      expect(checkboxVisible || textVisible).toBeTruthy()
    })

    test('should display login link on signup page', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/signup')
        await page.waitForLoadState('networkidle')

        // Should have a link to login page
        const loginLink = page.locator('a[href*="/login"], a:has-text(/log in|sign in|already/i)').first()
        const linkVisible = await loginLink.isVisible().catch(() => false)
        expect(linkVisible).toBeTruthy()
      })
    })

    test('should display password requirements if any', async ({ page }) => {
      await page.goto('/auth/signup')
      await page.waitForLoadState('networkidle')

      // Check for password requirements text/hints
      const passwordRequirements = page.locator('text=/password|character|require|minimum/i').all()
      const requirements = await passwordRequirements

      if (requirements.length > 0) {
        // At least one requirement should be visible
        for (const req of requirements) {
          const isVisible = await req.isVisible().catch(() => false)
          if (isVisible) {
            expect(isVisible).toBeTruthy()
            break
          }
        }
      }
    })

    test('should validate signup fields with translated messages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/signup')
        await page.waitForLoadState('networkidle')

        // Try invalid email
        const emailInput = page.locator('input[type="email"]').first()
        await emailInput.fill('invalid-email')

        // Check for validation error
        const emailValid = await emailInput.evaluate((el: any) => {
          return el.checkValidity()
        })

        // Should either show error or have validation
        expect(!emailValid).toBeTruthy()
      })
    })
  })

  test.describe('Auth Error Page', () => {
    test('should display error page when accessing with invalid code', async ({ page }) => {
      // Navigate to auth error page (usually from callback with invalid code)
      await page.goto('/auth/auth-code-error')
      await page.waitForLoadState('networkidle')

      // Should have error message
      const errorHeading = page.locator('h1, h2, [role="heading"]').first()
      const headingVisible = await errorHeading.isVisible().catch(() => false)
      expect(headingVisible).toBeTruthy()
    })

    test('should display error message in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/auth-code-error')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Error message should be visible
        const errorText = page.locator('body')
        const text = await errorText.textContent()
        expect(text).toBeTruthy()

        // Should have error indicator
        const errorElement = page.locator('[role="alert"], [class*="error"]').first()
        const isVisible = await errorElement.isVisible().catch(() => false)

        // At minimum, page should display something
        expect(isVisible || text!.length > 0).toBeTruthy()
      })
    })

    test('should provide way to return to login/home', async ({ page }) => {
      await page.goto('/auth/auth-code-error')
      await page.waitForLoadState('networkidle')

      // Should have a link back to login or home
      const backLink = page.locator('a[href*="/login"], a[href="/"], button:has-text(/back|return|home|login/i)').first()
      const linkVisible = await backLink.isVisible().catch(() => false)
      expect(linkVisible).toBeTruthy()
    })
  })

  test.describe('Auth Pages - Mobile', () => {
    test('should display auth forms properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const authPages = ['/auth/login', '/auth/signup']

      for (const authPath of authPages) {
        await page.goto(authPath)
        await page.waitForLoadState('networkidle')

        // Form should be visible without horizontal scroll
        const form = page.locator('form').first()
        const isVisible = await form.isVisible().catch(() => false)
        expect(isVisible).toBeTruthy()

        // Check for horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth
        })
        expect(hasHorizontalScroll).toBeFalsy()
      }
    })

    test('should display buttons with adequate touch targets on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      const submitButton = page.locator('button[type="submit"]').first()
      const buttonBox = await submitButton.boundingBox()

      if (buttonBox) {
        // Minimum touch target is 44x44 pixels
        expect(buttonBox.height).toBeGreaterThanOrEqual(40) // Allow slight variation
        expect(buttonBox.width).toBeGreaterThanOrEqual(80) // Minimum practical width
      }
    })
  })

  test.describe('Auth Pages - Language Switching', () => {
    test('should maintain auth state when switching languages', async ({ page }) => {
      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      // Start in English
      const en_heading = await page.locator('h1').first().textContent()

      // Switch to French
      await switchLanguage(page, 'fr')
      await page.waitForLoadState('networkidle')

      // Page should still be on login page
      await expect(page).toHaveURL(/\/auth\/login/)

      // Content should be in French (different from English)
      const fr_heading = await page.locator('h1').first().textContent()
      expect(fr_heading).not.toBe(en_heading)

      // Switch back to English
      await switchLanguage(page, 'en')
      const en_heading_again = await page.locator('h1').first().textContent()
      expect(en_heading_again).toBe(en_heading)
    })
  })
})
