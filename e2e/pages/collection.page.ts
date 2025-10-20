import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for Collections List Page
 */
export class CollectionsPage {
  readonly page: Page
  readonly createButton: Locator
  readonly collectionsList: Locator

  constructor(page: Page) {
    this.page = page
    this.createButton = page.locator('a[href="/collections/new"], button:has-text("Create Collection")')
    this.collectionsList = page.locator('[data-testid="collections-list"], .grid, .space-y-4')
  }

  async goto() {
    await this.page.goto('/collections')
  }

  async clickCreateCollection() {
    await this.createButton.click()
  }

  async getCollectionByName(name: string) {
    return this.page.locator(`text="${name}"`).first()
  }
}

/**
 * Page Object Model for Create Collection Page
 */
export class CreateCollectionPage {
  readonly page: Page
  readonly nameInput: Locator
  readonly descriptionTextarea: Locator
  readonly publicCheckbox: Locator
  readonly submitButton: Locator
  readonly cancelButton: Locator

  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.descriptionTextarea = page.locator('#description')
    this.publicCheckbox = page.locator('#is_public')
    this.submitButton = page.locator('button[type="submit"]')
    this.cancelButton = page.locator('a[href="/collections"]')
  }

  async goto() {
    await this.page.goto('/collections/new')
  }

  async createCollection(name: string, description?: string, isPublic: boolean = true) {
    await this.nameInput.fill(name)

    if (description) {
      await this.descriptionTextarea.fill(description)
    }

    if (!isPublic) {
      await this.publicCheckbox.uncheck()
    }

    await this.submitButton.click()
  }

  async cancel() {
    await this.cancelButton.click()
  }
}

/**
 * Page Object Model for Collection Detail Page
 */
export class CollectionDetailPage {
  readonly page: Page
  readonly collectionName: Locator
  readonly collectionDescription: Locator
  readonly addPromptButton: Locator
  readonly promptsList: Locator

  constructor(page: Page) {
    this.page = page
    this.collectionName = page.locator('h1')
    this.collectionDescription = page.locator('p').first()
    this.addPromptButton = page.locator('a:has-text("Add Prompt"), button:has-text("Add Prompt")')
    this.promptsList = page.locator('[data-testid="collection-prompts"], .grid, .space-y-4')
  }

  async gotoCollection(id: string) {
    await this.page.goto(`/collections/${id}`)
  }

  async getName(): Promise<string> {
    return await this.collectionName.textContent() || ''
  }

  async getDescription(): Promise<string> {
    return await this.collectionDescription.textContent() || ''
  }

  async clickAddPrompt() {
    await this.addPromptButton.click()
  }

  async getPromptCount(): Promise<number> {
    const prompts = await this.promptsList.locator('a[href^="/prompts/"]').all()
    return prompts.length
  }
}
