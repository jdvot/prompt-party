import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for Login Page
 */
export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly googleButton: Locator
  readonly githubButton: Locator
  readonly signupLink: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('#email')
    this.passwordInput = page.locator('#password')
    this.submitButton = page.locator('button[type="submit"]')
    this.googleButton = page.locator('button:has-text("Continue with Google")')
    this.githubButton = page.locator('button:has-text("Continue with GitHub")')
    this.signupLink = page.locator('a[href="/auth/signup"]')
    this.errorMessage = page.locator('.bg-destructive\\/10')
  }

  async goto() {
    await this.page.goto('/auth/login')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  async loginWithGoogle() {
    await this.googleButton.click()
  }

  async loginWithGithub() {
    await this.githubButton.click()
  }

  async goToSignup() {
    await this.signupLink.click()
  }

  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() || ''
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible()
  }
}
