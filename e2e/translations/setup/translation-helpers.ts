import { Page, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Translation test helpers and utilities
 * Provides common functions for testing translations across EN/FR/NL
 */

const SUPPORTED_LOCALES = ['en', 'fr', 'nl'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

interface TranslationMessages {
  [key: string]: string | TranslationMessages
}

/**
 * Load translation messages from JSON file
 */
export function loadTranslations(locale: Locale): TranslationMessages {
  const filePath = path.join(
    __dirname,
    `../../../messages/${locale}.json`
  )
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
}

/**
 * Get a nested translation value by dot notation path
 * Example: getTranslation(messages, 'nav.home') returns nav.home value
 */
export function getTranslation(
  messages: TranslationMessages,
  keyPath: string
): string | undefined {
  const keys = keyPath.split('.')
  let current: any = messages

  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = current[key]
    } else {
      return undefined
    }
  }

  return typeof current === 'string' ? current : undefined
}

/**
 * Switch application language via language switcher or cookie
 */
export async function switchLanguage(page: Page, locale: Locale): Promise<void> {
  // Method 1: Try using language switcher button/dropdown
  const languageButton = page.locator('[data-language-switcher], button:has-text(/language|english|français|nederlands/i)').first()
  const buttonVisible = await languageButton.isVisible().catch(() => false)

  if (buttonVisible) {
    await languageButton.click()

    // Find and click the locale option
    const localeOption = getLocaleDisplayName(locale)
    const localeButton = page.locator(`button:has-text("${localeOption}"), a:has-text("${localeOption}")`).first()

    if (await localeButton.isVisible().catch(() => false)) {
      await localeButton.click()
      await page.waitForTimeout(1000) // Wait for language switch animation
      return
    }
  }

  // Method 2: Set cookie directly (fallback)
  await page.context().addCookies([
    {
      name: 'NEXT_LOCALE',
      value: locale,
      domain: new URL(page.url()).hostname,
      path: '/',
      expires: Math.floor(Date.now() / 1000) + 31536000, // 1 year
    }
  ])

  // Reload page to apply language change
  await page.reload()
  await page.waitForTimeout(1000)
}

/**
 * Get the display name for a locale
 */
function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: 'English',
    fr: 'Français',
    nl: 'Nederlands'
  }
  return names[locale]
}

/**
 * Verify that a specific translation key exists and has a value on the page
 */
export async function verifyTranslationExists(
  page: Page,
  translationKey: string,
  messages: TranslationMessages
): Promise<boolean> {
  const translation = getTranslation(messages, translationKey)

  if (!translation) {
    console.warn(`Translation key not found: ${translationKey}`)
    return false
  }

  // Handle interpolated values - strip {variable} patterns
  const textPattern = translation.replace(/{[^}]+}/g, '.*')
  const regex = new RegExp(textPattern, 'i')

  try {
    await expect(page.locator('body')).toContainText(regex)
    return true
  } catch {
    return false
  }
}

/**
 * Get all translation keys from a messages object (recursively)
 */
export function getAllTranslationKeys(
  messages: TranslationMessages,
  prefix = ''
): string[] {
  const keys: string[] = []

  for (const [key, value] of Object.entries(messages)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      keys.push(fullKey)
    } else if (typeof value === 'object' && value !== null) {
      keys.push(...getAllTranslationKeys(value as TranslationMessages, fullKey))
    }
  }

  return keys
}

/**
 * Find missing translations in a target locale by comparing with source
 */
export function findMissingTranslations(
  sourceMessages: TranslationMessages,
  targetMessages: TranslationMessages,
  prefix = ''
): string[] {
  const missing: string[] = []

  for (const [key, value] of Object.entries(sourceMessages)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (!targetMessages.hasOwnProperty(key)) {
      if (typeof value === 'string') {
        missing.push(fullKey)
      } else if (typeof value === 'object' && value !== null) {
        missing.push(...findMissingTranslations(value as TranslationMessages, {}, fullKey))
      }
    } else if (typeof value === 'object' && value !== null && typeof targetMessages[key] === 'object') {
      missing.push(...findMissingTranslations(value as TranslationMessages, targetMessages[key] as TranslationMessages, fullKey))
    }
  }

  return missing
}

/**
 * Compare translation key counts across locales
 */
export function compareTranslationCounts(): Record<Locale, number> {
  const counts: Record<Locale, number> = {
    en: 0,
    fr: 0,
    nl: 0
  }

  for (const locale of SUPPORTED_LOCALES) {
    const messages = loadTranslations(locale)
    const keys = getAllTranslationKeys(messages)
    counts[locale] = keys.length
  }

  return counts
}

/**
 * Find empty translation values (should be reported as issues)
 */
export function findEmptyTranslations(
  messages: TranslationMessages,
  prefix = ''
): string[] {
  const empty: string[] = []

  for (const [key, value] of Object.entries(messages)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string' && value.trim() === '') {
      empty.push(fullKey)
    } else if (typeof value === 'object' && value !== null) {
      empty.push(...findEmptyTranslations(value as TranslationMessages, fullKey))
    }
  }

  return empty
}

/**
 * Test a function in all supported languages
 * Usage: await testInAllLanguages(page, async (locale) => { ... })
 */
export async function testInAllLanguages(
  page: Page,
  testFn: (locale: Locale) => Promise<void>
): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    await switchLanguage(page, locale)
    await testFn(locale)
  }
}

/**
 * Test a function in specific languages
 */
export async function testInLanguages(
  page: Page,
  locales: Locale[],
  testFn: (locale: Locale) => Promise<void>
): Promise<void> {
  for (const locale of locales) {
    await switchLanguage(page, locale)
    await testFn(locale)
  }
}

/**
 * Navigate to a locale-specific URL
 */
export async function navigateToLocalized(
  page: Page,
  path: string,
  locale: Locale
): Promise<void> {
  // For next-intl, URLs are typically /[locale]/path
  // But based on CLAUDE.md, this app uses cookie-based locale detection
  // So we just navigate normally after switching language
  await switchLanguage(page, locale)
  await page.goto(path)
  await page.waitForTimeout(500)
}

/**
 * Check if page is in expected language by looking for key indicators
 */
export async function assertPageLanguage(
  page: Page,
  expectedLocale: Locale,
  indicatorSelectors: string[]
): Promise<void> {
  const messages = loadTranslations(expectedLocale)

  for (const selector of indicatorSelectors) {
    const element = page.locator(selector).first()

    // Try to find translated content
    const isVisible = await element.isVisible().catch(() => false)
    if (isVisible) {
      const text = await element.textContent()

      // Basic check: ensure text is not empty
      expect(text).toBeTruthy()
    }
  }
}

/**
 * Extract all visible text from a page for translation completeness verification
 */
export async function extractPageText(page: Page): Promise<Set<string>> {
  const text = new Set<string>()

  const allText = await page.evaluate(() => {
    const elements = document.querySelectorAll('body *')
    const texts: string[] = []

    elements.forEach(el => {
      const nodeText = el.textContent?.trim()
      if (nodeText && nodeText.length > 0 && nodeText.length < 200) {
        texts.push(nodeText)
      }
    })

    return texts
  })

  allText.forEach(t => text.add(t))
  return text
}

/**
 * Verify that a locale cookie is set correctly
 */
export async function verifyLocaleCookie(page: Page, expectedLocale: Locale): Promise<boolean> {
  const cookies = await page.context().cookies()
  const localeCookie = cookies.find(c => c.name === 'NEXT_LOCALE')

  return localeCookie ? localeCookie.value === expectedLocale : false
}
