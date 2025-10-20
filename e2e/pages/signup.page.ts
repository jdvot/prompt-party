import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for Signup Page
 */
export class SignupPage {
  readonly page: Page
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly googleButton: Locator
  readonly githubButton: Locator
  readonly loginLink: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.emailInput = page.locator('#email')
    this.passwordInput = page.locator('#password')
    this.submitButton = page.locator('button[type="submit"]')
    this.googleButton = page.locator('button:has-text("Continue with Google")')
    this.githubButton = page.locator('button:has-text("Continue with GitHub")')
    this.loginLink = page.locator('a[href="/auth/login"]')
    this.errorMessage = page.locator('.bg-destructive\\/10')
  }

  async goto() {
    await this.page.goto('/auth/signup')
  }

  async signup(name: string, email: string, password: string) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  async signupWithGoogle() {
    await this.googleButton.click()
  }

  async signupWithGithub() {
    await this.githubButton.click()
  }

  async goToLogin() {
    await this.loginLink.click()
  }

  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() || ''
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible()
  }
}
