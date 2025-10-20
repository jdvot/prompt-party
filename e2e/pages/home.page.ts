import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for Home/Feed Page
 */
export class HomePage {
  readonly page: Page
  readonly promptCards: Locator
  readonly newFilterTab: Locator
  readonly topFilterTab: Locator
  readonly trendingFilterTab: Locator
  readonly createPromptButton: Locator
  readonly loginButton: Locator
  readonly signupButton: Locator

  constructor(page: Page) {
    this.page = page
    this.promptCards = page.locator('a[href^="/prompts/"]')
    this.newFilterTab = page.locator('a[href="/"]')
    this.topFilterTab = page.locator('a[href="/top"]')
    this.trendingFilterTab = page.locator('a[href="/trending"]')
    this.createPromptButton = page.locator('a[href="/prompts/new"]')
    this.loginButton = page.locator('a[href="/auth/login"]')
    this.signupButton = page.locator('a[href="/auth/signup"]')
  }

  async goto() {
    await this.page.goto('/')
  }

  async gotoTop() {
    await this.page.goto('/top')
  }

  async gotoTrending() {
    await this.page.goto('/trending')
  }

  async clickNewFilter() {
    await this.newFilterTab.click()
  }

  async clickTopFilter() {
    await this.topFilterTab.click()
  }

  async clickTrendingFilter() {
    await this.trendingFilterTab.click()
  }

  async getPromptCardsCount(): Promise<number> {
    const cards = await this.promptCards.all()
    return cards.length
  }

  async clickFirstPrompt() {
    await this.promptCards.first().click()
  }

  async getPromptCardByTitle(title: string) {
    return this.page.locator(`a[href^="/prompts/"]:has-text("${title}")`).first()
  }

  async clickCreatePrompt() {
    await this.createPromptButton.click()
  }

  async clickLogin() {
    await this.loginButton.click()
  }

  async clickSignup() {
    await this.signupButton.click()
  }
}
