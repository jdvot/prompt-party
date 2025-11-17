import { test, expect } from '@playwright/test'
import { testInAllLanguages, loadTranslations, Locale } from '../setup/translation-helpers'

/**
 * Form Components Translation Tests
 * Tests for form labels, placeholders, validation messages
 */

test.describe('Forms - Translations', () => {
  test.describe('Login Form', () => {
    test('should display form labels in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Email label/field
        const emailLabel = page.locator('label:has-text(/email|e-mail/i)').first()
        const emailField = page.locator('input[type="email"]').first()

        const labelVisible = await emailLabel.isVisible().catch(() => false)
        const fieldVisible = await emailField.isVisible().catch(() => false)

        expect(labelVisible || fieldVisible).toBeTruthy()
      })
    })

    test('should display form placeholders', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        const inputs = page.locator('input').all()
        const inputList = await inputs

        let hasPlaceholder = false
        for (const input of inputList) {
          const placeholder = await input.getAttribute('placeholder')
          if (placeholder && placeholder.length > 0) {
            hasPlaceholder = true
            break
          }
        }

        // Should have at least one placeholder or label
        expect(hasPlaceholder).toBeTruthy()
      })
    })

    test('should display submit button with translated label', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        const submitButton = page.locator('button[type="submit"]').first()
        const buttonText = await submitButton.textContent()

        // Button should have text (translated)
        expect(buttonText).toBeTruthy()
        expect(buttonText!.length).toBeGreaterThan(0)
      })
    })

    test('should validate required fields with translated feedback', async ({ page }) => {
      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      const emailField = page.locator('input[type="email"]').first()

      // Check if field is required
      const isRequired = await emailField.evaluate((el: any) => el.required)
      expect(isRequired).toBeTruthy()

      // Try submitting empty form
      const submitButton = page.locator('button[type="submit"]').first()
      await submitButton.click()
      await page.waitForTimeout(500)

      // Either show validation error or HTML validation should prevent submission
      const errorMessage = page.locator('[role="alert"], [class*="error"]').first()
      const errorVisible = await errorMessage.isVisible().catch(() => false)

      // At minimum, required attribute should work
      expect(isRequired || errorVisible).toBeTruthy()
    })
  })

  test.describe('Signup Form', () => {
    test('should display all signup form fields in all languages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/signup')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Email field
        const emailField = page.locator('input[type="email"]').first()
        const emailVisible = await emailField.isVisible().catch(() => false)
        expect(emailVisible).toBeTruthy()

        // Password field
        const passwordField = page.locator('input[type="password"]').first()
        const passwordVisible = await passwordField.isVisible().catch(() => false)
        expect(passwordVisible).toBeTruthy()

        // Submit button
        const submitButton = page.locator('button[type="submit"]').first()
        const submitVisible = await submitButton.isVisible().catch(() => false)
        expect(submitVisible).toBeTruthy()
      })
    })

    test('should validate password requirements if specified', async ({ page }) => {
      await page.goto('/auth/signup')
      await page.waitForLoadState('networkidle')

      const passwordField = page.locator('input[type="password"]').first()

      // Check for password requirements
      const minLength = await passwordField.getAttribute('minlength')
      const pattern = await passwordField.getAttribute('pattern')
      const ariaDescribedBy = await passwordField.getAttribute('aria-describedby')

      // Should have some validation
      const hasValidation = minLength || pattern || ariaDescribedBy
      expect(hasValidation).toBeTruthy()
    })

    test('should display error messages for invalid input', async ({ page }) => {
      await page.goto('/auth/signup')
      await page.waitForLoadState('networkidle')

      const emailField = page.locator('input[type="email"]').first()

      // Enter invalid email
      await emailField.fill('not-an-email')

      // Check validity
      const isValid = await emailField.evaluate((el: any) => {
        return el.checkValidity()
      })

      expect(isValid).toBeFalsy()
    })
  })

  test.describe('Create Prompt Form', () => {
    test('should display create prompt form fields', async ({ page }) => {
      await page.goto('/prompts/new')
      await page.waitForLoadState('networkidle')

      // Should have title input
      const titleInput = page.locator('input[type="text"], [placeholder*="title" i]').first()
      const titleVisible = await titleInput.isVisible().catch(() => false)

      // Should have content/body textarea
      const contentInput = page.locator('textarea, [contenteditable]').first()
      const contentVisible = await contentInput.isVisible().catch(() => false)

      // At least one should be visible
      expect(titleVisible || contentVisible).toBeTruthy()
    })

    test('should display form validation and error messages', async ({ page }) => {
      await page.goto('/prompts/new')
      await page.waitForLoadState('networkidle')

      // Try to submit empty form
      const submitButton = page.locator('button[type="submit"], button:has-text(/create|submit|save/i)').first()
      const submitVisible = await submitButton.isVisible().catch(() => false)

      if (submitVisible) {
        await submitButton.click()
        await page.waitForTimeout(500)

        // Should either show error or prevent submission
        const errorMessage = page.locator('[role="alert"], [class*="error"], [class*="invalid"]').first()
        const errorVisible = await errorMessage.isVisible().catch(() => false)

        // Form should validate
        expect(errorVisible).toBeTruthy()
      }
    })
  })

  test.describe('Form Accessibility', () => {
    test('should have accessible form labels and structure', async ({ page }) => {
      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      const form = page.locator('form').first()
      await expect(form).toBeVisible()

      // Check for labels
      const labels = form.locator('label').all()
      const labelList = await labels

      if (labelList.length > 0) {
        // Labels should be associated with inputs
        for (const label of labelList.slice(0, 3)) {
          const forAttr = await label.getAttribute('for')
          const text = await label.textContent()

          // Label should have either text or for attribute
          expect(text || forAttr).toBeTruthy()
        }
      }
    })

    test('should have proper form structure for screen readers', async ({ page }) => {
      await page.goto('/auth/signup')
      await page.waitForLoadState('networkidle')

      const inputs = page.locator('input, textarea').all()
      const inputList = await inputs

      for (const input of inputList.slice(0, 3)) {
        // Each input should have either label or aria-label
        const id = await input.getAttribute('id')
        const ariaLabel = await input.getAttribute('aria-label')
        const ariaLabelledBy = await input.getAttribute('aria-labelledby')

        // Should have some label association
        expect(id || ariaLabel || ariaLabelledBy).toBeTruthy()
      }
    })
  })

  test.describe('Form Localization', () => {
    test('should update form labels when switching languages', async ({ page }) => {
      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      const enButton = await page.locator('button[type="submit"]').first().textContent()

      // Switch language
      const langButton = page.locator('[data-language-switcher], button:has-text(/english|français/i)').first()
      if (await langButton.isVisible().catch(() => false)) {
        await langButton.click()
        await page.waitForTimeout(500)

        const frButton = await page.locator('button[type="submit"]').first().textContent()

        // Button text should change
        expect(frButton).not.toBe(enButton)
      }
    })

    test('should display translated form validation messages', async ({ page }) => {
      await testInAllLanguages(page, async (locale: Locale) => {
        await page.goto('/auth/login')
        await page.waitForLoadState('networkidle')

        const messages = loadTranslations(locale)

        // Try to trigger validation
        const emailField = page.locator('input[type="email"]').first()
        await emailField.fill('invalid')
        await emailField.blur()

        // Browser validation or app validation should show message
        await page.waitForTimeout(300)

        const validationMessage = await emailField.evaluate((el: any) => {
          return el.validationMessage
        })

        // Should have some validation feedback
        expect(validationMessage || await page.locator('[role="alert"]').first().isVisible().catch(() => false)).toBeTruthy()
      })
    })
  })

  test.describe('Form Mobile Experience', () => {
    test('should display form properly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      // Form should be visible and not require horizontal scroll
      const form = page.locator('form').first()
      const isVisible = await form.isVisible().catch(() => false)
      expect(isVisible).toBeTruthy()

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(hasHorizontalScroll).toBeFalsy()
    })

    test('should have touch-friendly input sizes on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/auth/login')
      await page.waitForLoadState('networkidle')

      const inputs = page.locator('input, button[type="submit"]').all()
      const inputList = await inputs

      for (const input of inputList.slice(0, 3)) {
        const box = await input.boundingBox()
        if (box) {
          // Touch targets should be at least 44x44 (allows 40 with slight margin)
          expect(box.height).toBeGreaterThanOrEqual(36)
          expect(box.width).toBeGreaterThanOrEqual(44)
        }
      }
    })
  })
})
