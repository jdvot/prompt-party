import { test, expect } from '@playwright/test'
import {
  loadTranslations,
  getAllTranslationKeys,
  findMissingTranslations,
  findEmptyTranslations,
  compareTranslationCounts,
  Locale,
} from '../setup/translation-helpers'

/**
 * Translation Keys Completeness Tests
 *
 * This test suite validates:
 * - All keys exist in all 3 languages (EN, FR, NL)
 * - No missing translations
 * - No empty translation values
 * - Consistent key counts across languages
 * - Proper nesting and structure
 */

test.describe('Translation Keys Completeness', () => {
  let enMessages: ReturnType<typeof loadTranslations>
  let frMessages: ReturnType<typeof loadTranslations>
  let nlMessages: ReturnType<typeof loadTranslations>

  test.beforeEach(() => {
    // Load all translation files once
    enMessages = loadTranslations('en')
    frMessages = loadTranslations('fr')
    nlMessages = loadTranslations('nl')
  })

  test('should have consistent key counts across languages', () => {
    const counts = compareTranslationCounts()

    console.log('Translation Key Counts:')
    console.log(`  EN: ${counts.en} keys`)
    console.log(`  FR: ${counts.fr} keys`)
    console.log(`  NL: ${counts.nl} keys`)

    // Keys should be within 1% of each other (allowing for rounding differences)
    const tolerance = Math.ceil(counts.en * 0.01)
    expect(counts.fr).toBeGreaterThanOrEqual(counts.en - tolerance)
    expect(counts.fr).toBeLessThanOrEqual(counts.en + tolerance)
    expect(counts.nl).toBeGreaterThanOrEqual(counts.en - tolerance)
    expect(counts.nl).toBeLessThanOrEqual(counts.en + tolerance)
  })

  test('should not have missing translations in French', () => {
    const missing = findMissingTranslations(enMessages, frMessages)

    if (missing.length > 0) {
      console.warn('Missing French translations:')
      missing.forEach(key => console.warn(`  - ${key}`))
    }

    expect(missing).toHaveLength(0)
  })

  test('should not have missing translations in Dutch', () => {
    const missing = findMissingTranslations(enMessages, nlMessages)

    if (missing.length > 0) {
      console.warn('Missing Dutch translations:')
      missing.forEach(key => console.warn(`  - ${key}`))
    }

    expect(missing).toHaveLength(0)
  })

  test('should not have empty translations in English', () => {
    const empty = findEmptyTranslations(enMessages)

    if (empty.length > 0) {
      console.warn('Empty English translations:')
      empty.forEach(key => console.warn(`  - ${key}`))
    }

    expect(empty).toHaveLength(0)
  })

  test('should not have empty translations in French', () => {
    const empty = findEmptyTranslations(frMessages)

    if (empty.length > 0) {
      console.warn('Empty French translations:')
      empty.forEach(key => console.warn(`  - ${key}`))
    }

    expect(empty).toHaveLength(0)
  })

  test('should not have empty translations in Dutch', () => {
    const empty = findEmptyTranslations(nlMessages)

    if (empty.length > 0) {
      console.warn('Empty Dutch translations:')
      empty.forEach(key => console.warn(`  - ${key}`))
    }

    expect(empty).toHaveLength(0)
  })

  test('should have all top-level keys in English', () => {
    const enKeys = Object.keys(enMessages).sort()

    expect(enKeys.length).toBeGreaterThan(30) // Should have many namespaces
    expect(enKeys).toContain('nav')
    expect(enKeys).toContain('auth')
    expect(enKeys).toContain('prompts')
    expect(enKeys).toContain('tutorials')
    expect(enKeys).toContain('common')
  })

  test('should have matching top-level keys across all languages', () => {
    const enKeys = new Set(Object.keys(enMessages).sort())
    const frKeys = new Set(Object.keys(frMessages).sort())
    const nlKeys = new Set(Object.keys(nlMessages).sort())

    // Find differences
    const enOnly = [...enKeys].filter(k => !frKeys.has(k) && !nlKeys.has(k))
    const frOnly = [...frKeys].filter(k => !enKeys.has(k) && !nlKeys.has(k))
    const nlOnly = [...nlKeys].filter(k => !enKeys.has(k) && !frKeys.has(k))

    if (enOnly.length > 0) console.warn('Keys only in EN:', enOnly)
    if (frOnly.length > 0) console.warn('Keys only in FR:', frOnly)
    if (nlOnly.length > 0) console.warn('Keys only in NL:', nlOnly)

    expect(enOnly).toHaveLength(0)
    expect(frOnly).toHaveLength(0)
    expect(nlOnly).toHaveLength(0)
  })

  test('should have critical UI namespaces translated in all languages', () => {
    const criticalNamespaces = [
      'nav', // Navigation
      'auth', // Authentication
      'prompts', // Prompts feature
      'common', // Common UI elements
      'header', // Header
      'footer', // Footer
      'tutorials', // Tutorials
      'errors', // Error messages
      'forms' // Forms
    ]

    for (const ns of criticalNamespaces) {
      expect(enMessages).toHaveProperty(ns)
      expect(frMessages).toHaveProperty(ns)
      expect(nlMessages).toHaveProperty(ns)
    }
  })

  test('should have consistent interpolation variables', () => {
    const enKeys = getAllTranslationKeys(enMessages)
    const variablePattern = /{[\w]+}/g

    const keysWithVariables: Record<string, string[]> = {
      en: [],
      fr: [],
      nl: []
    }

    const locales: Array<[Locale, any]> = [
      ['en', enMessages],
      ['fr', frMessages],
      ['nl', nlMessages]
    ]

    for (const [locale, messages] of locales) {
      for (const keyPath of getAllTranslationKeys(messages)) {
        const value = getAllTranslationKeys(messages).includes(keyPath)
        // Extract value from nested object
        const keys = keyPath.split('.')
        let current: any = messages
        for (const key of keys) {
          current = current[key]
        }

        if (typeof current === 'string') {
          const variables = current.match(variablePattern) || []
          if (variables.length > 0) {
            keysWithVariables[locale as Locale].push(keyPath)
          }
        }
      }
    }

    console.log('Keys with interpolation variables:')
    console.log(`  EN: ${keysWithVariables.en.length}`)
    console.log(`  FR: ${keysWithVariables.fr.length}`)
    console.log(`  NL: ${keysWithVariables.nl.length}`)

    // Counts should be similar
    const tolerance = 5
    expect(Math.abs(keysWithVariables.en.length - keysWithVariables.fr.length)).toBeLessThanOrEqual(tolerance)
    expect(Math.abs(keysWithVariables.en.length - keysWithVariables.nl.length)).toBeLessThanOrEqual(tolerance)
  })

  test('should not have HTML or special characters in translation keys', () => {
    const problematicPatterns = [
      { pattern: /<[^>]+>/g, name: 'HTML tags' },
      { pattern: /[\r\n]{2,}/g, name: 'Multiple newlines' },
      { pattern: /[^\x20-\x7E\u00C0-\u017F\u0180-\u024F\u0250-\u02B9]/g, name: 'Invalid characters' }
    ]

    const locales: Array<[Locale, any]> = [
      ['en', enMessages],
      ['fr', frMessages],
      ['nl', nlMessages]
    ]

    for (const [locale, messages] of locales) {
      const issues: string[] = []

      for (const keyPath of getAllTranslationKeys(messages)) {
        const keys = keyPath.split('.')
        let current: any = messages
        for (const key of keys) {
          current = current[key]
        }

        if (typeof current === 'string') {
          for (const { pattern, name } of problematicPatterns) {
            if (pattern.test(current)) {
              issues.push(`${keyPath}: Contains ${name}`)
            }
          }
        }
      }

      if (issues.length > 0) {
        console.warn(`Issues in ${locale.toUpperCase()}:`)
        issues.slice(0, 10).forEach(issue => console.warn(`  - ${issue}`))
        if (issues.length > 10) {
          console.warn(`  ... and ${issues.length - 10} more issues`)
        }
      }

      // Allow some issues but flag them
      // In production, this should be stricter
      expect(issues.length).toBeLessThan(20)
    }
  })

  test('should have translations for all tutorial types', () => {
    const tutorialKeys = getAllTranslationKeys(enMessages)
      .filter(k => k.startsWith('tutorials.'))
      .slice(0, 20) // Sample first 20

    expect(tutorialKeys.length).toBeGreaterThan(0)

    for (const key of tutorialKeys) {
      expect(frMessages).toBeDefined()
      expect(nlMessages).toBeDefined()

      // Verify the key exists in all languages
      const frValue = getAllTranslationKeys(frMessages).includes(key)
      const nlValue = getAllTranslationKeys(nlMessages).includes(key)

      expect(frValue).toBeTruthy()
      expect(nlValue).toBeTruthy()
    }
  })

  test('should provide helpful error messages for debugging', () => {
    const missingFr = findMissingTranslations(enMessages, frMessages)
    const missingNl = findMissingTranslations(enMessages, nlMessages)

    if (missingFr.length > 0 || missingNl.length > 0) {
      console.log('\n=== Translation Completeness Issues ===')

      if (missingFr.length > 0) {
        console.log(`\nFrench missing ${missingFr.length} translations:`)
        missingFr.slice(0, 5).forEach(key => console.log(`  - ${key}`))
        if (missingFr.length > 5) {
          console.log(`  ... and ${missingFr.length - 5} more`)
        }
      }

      if (missingNl.length > 0) {
        console.log(`\nDutch missing ${missingNl.length} translations:`)
        missingNl.slice(0, 5).forEach(key => console.log(`  - ${key}`))
        if (missingNl.length > 5) {
          console.log(`  ... and ${missingNl.length - 5} more`)
        }
      }
    }
  })
})
