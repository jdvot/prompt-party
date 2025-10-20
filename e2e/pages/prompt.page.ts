import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for Prompt Create/Edit Page
 */
export class PromptPage {
  readonly page: Page
  readonly titleInput: Locator
  readonly bodyTextarea: Locator
  readonly tagsInput: Locator
  readonly publicCheckbox: Locator
  readonly submitButton: Locator
  readonly cancelButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.titleInput = page.locator('#title')
    this.bodyTextarea = page.locator('textarea[placeholder*="Write your prompt"]')
    this.tagsInput = page.locator('#tags')
    this.publicCheckbox = page.locator('#is_public')
    this.submitButton = page.locator('button[type="submit"]')
    this.cancelButton = page.locator('button:has-text("Cancel")')
    this.errorMessage = page.locator('.bg-destructive\\/10')
  }

  async goto() {
    await this.page.goto('/prompts/new')
  }

  async createPrompt(
    title: string,
    body: string,
    tags?: string,
    isPublic: boolean = true
  ) {
    await this.titleInput.fill(title)
    await this.bodyTextarea.fill(body)

    if (tags) {
      await this.tagsInput.fill(tags)
    }

    if (!isPublic) {
      await this.publicCheckbox.uncheck()
    }

    await this.submitButton.click()
  }

  async cancel() {
    await this.cancelButton.click()
  }

  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() || ''
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible()
  }
}

/**
 * Page Object Model for Prompt Detail Page
 */
export class PromptDetailPage {
  readonly page: Page
  readonly promptTitle: Locator
  readonly promptBody: Locator
  readonly likeButton: Locator
  readonly likeCount: Locator
  readonly commentForm: Locator
  readonly commentTextarea: Locator
  readonly commentSubmitButton: Locator
  readonly commentsList: Locator
  readonly remixButton: Locator
  readonly addToCollectionButton: Locator
  readonly authorName: Locator

  constructor(page: Page) {
    this.page = page
    this.promptTitle = page.locator('h1')
    this.promptBody = page.locator('.prose')
    this.likeButton = page.locator('button:has(svg[stroke="currentColor"])')
    this.likeCount = this.likeButton.locator('span')
    this.commentForm = page.locator('form:has(textarea[placeholder*="Write a comment"])')
    this.commentTextarea = this.commentForm.locator('textarea')
    this.commentSubmitButton = this.commentForm.locator('button[type="submit"]')
    this.commentsList = page.locator('[data-testid="comments-list"], .space-y-4:has(.border-b)')
    this.remixButton = page.locator('a:has-text("Remix"), button:has-text("Remix")')
    this.addToCollectionButton = page.locator('button:has-text("Add to Collection")')
    this.authorName = page.locator('text=/by /')
  }

  async gotoPrompt(id: string) {
    await this.page.goto(`/prompts/${id}`)
  }

  async getTitle(): Promise<string> {
    return await this.promptTitle.textContent() || ''
  }

  async getBody(): Promise<string> {
    return await this.promptBody.textContent() || ''
  }

  async likePrompt() {
    await this.likeButton.click()
  }

  async getLikeCount(): Promise<number> {
    const text = await this.likeCount.textContent() || '0'
    return parseInt(text, 10)
  }

  async addComment(content: string) {
    await this.commentTextarea.fill(content)
    await this.commentSubmitButton.click()
  }

  async getComments(): Promise<string[]> {
    const comments = await this.commentsList.locator('.border-b, [data-testid="comment-item"]').all()
    const texts = await Promise.all(comments.map((c) => c.textContent()))
    return texts.filter((t): t is string => t !== null)
  }

  async clickRemix() {
    await this.remixButton.click()
  }

  async clickAddToCollection() {
    await this.addToCollectionButton.click()
  }
}
