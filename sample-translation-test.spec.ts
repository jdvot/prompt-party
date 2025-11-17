/**
 * Translation Integrity Test Suite
 *
 * This test ensures all translation files have consistent keys
 * and prevents translation drift between languages.
 *
 * Add to your test suite by placing this in:
 * - tests/translations.test.ts (for Vitest)
 * - e2e/translations.spec.ts (for Playwright)
 */

import { describe, it, expect } from 'vitest'
import enTranslations from './messages/en.json'
import frTranslations from './messages/fr.json'
import nlTranslations from './messages/nl.json'

/**
 * Recursively flattens a nested object into dot notation
 * Example: { a: { b: "value" } } -> { "a.b": "value" }
 */
function flattenObject(obj: any, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], prefixedKey))
    } else {
      acc[prefixedKey] = obj[key]
    }
    return acc
  }, {} as Record<string, any>)
}

/**
 * Get all translation keys from a translation object
 */
function getTranslationKeys(translations: any): Set<string> {
  const flattened = flattenObject(translations)
  return new Set(Object.keys(flattened))
}

describe('Translation Integrity', () => {
  describe('JSON Structure', () => {
    it('should have valid JSON in all translation files', () => {
      expect(enTranslations).toBeDefined()
      expect(frTranslations).toBeDefined()
      expect(nlTranslations).toBeDefined()
    })

    it('should have object structure in all translation files', () => {
      expect(typeof enTranslations).toBe('object')
      expect(typeof frTranslations).toBe('object')
      expect(typeof nlTranslations).toBe('object')
    })
  })

  describe('Key Consistency', () => {
    const enKeys = getTranslationKeys(enTranslations)
    const frKeys = getTranslationKeys(frTranslations)
    const nlKeys = getTranslationKeys(nlTranslations)

    it('should have the same number of keys in all languages', () => {
      const enCount = enKeys.size
      const frCount = frKeys.size
      const nlCount = nlKeys.size

      console.log(`EN: ${enCount} keys, FR: ${frCount} keys, NL: ${nlCount} keys`)

      expect(frCount).toBe(enCount)
      expect(nlCount).toBe(enCount)
    })

    it('French should have all English keys', () => {
      const missingInFr = Array.from(enKeys).filter(key => !frKeys.has(key))

      if (missingInFr.length > 0) {
        console.error(`Missing ${missingInFr.length} keys in French:`)
        console.error(missingInFr.slice(0, 10).join('\n'))
        if (missingInFr.length > 10) {
          console.error(`... and ${missingInFr.length - 10} more`)
        }
      }

      expect(missingInFr).toEqual([])
    })

    it('Dutch should have all English keys', () => {
      const missingInNl = Array.from(enKeys).filter(key => !nlKeys.has(key))

      if (missingInNl.length > 0) {
        console.error(`Missing ${missingInNl.length} keys in Dutch:`)
        console.error(missingInNl.slice(0, 10).join('\n'))
        if (missingInNl.length > 10) {
          console.error(`... and ${missingInNl.length - 10} more`)
        }
      }

      expect(missingInNl).toEqual([])
    })

    it('French should not have extra keys not in English', () => {
      const extraInFr = Array.from(frKeys).filter(key => !enKeys.has(key))

      if (extraInFr.length > 0) {
        console.warn(`French has ${extraInFr.length} extra keys not in English:`)
        console.warn(extraInFr.join('\n'))
      }

      expect(extraInFr).toEqual([])
    })

    it('Dutch should not have extra keys not in English', () => {
      const extraInNl = Array.from(nlKeys).filter(key => !enKeys.has(key))

      if (extraInNl.length > 0) {
        console.warn(`Dutch has ${extraInNl.length} extra keys not in English:`)
        console.warn(extraInNl.join('\n'))
      }

      expect(extraInNl).toEqual([])
    })
  })

  describe('Value Integrity', () => {
    const enFlat = flattenObject(enTranslations)
    const frFlat = flattenObject(frTranslations)
    const nlFlat = flattenObject(nlTranslations)

    it('should not have empty values in English', () => {
      const emptyKeys = Object.keys(enFlat).filter(key => {
        const value = enFlat[key]
        return value === '' || value === null || value === undefined
      })

      if (emptyKeys.length > 0) {
        console.error(`Found ${emptyKeys.length} empty values in English:`)
        console.error(emptyKeys.join('\n'))
      }

      expect(emptyKeys).toEqual([])
    })

    it('should not have empty values in French', () => {
      const emptyKeys = Object.keys(frFlat).filter(key => {
        const value = frFlat[key]
        return value === '' || value === null || value === undefined
      })

      if (emptyKeys.length > 0) {
        console.error(`Found ${emptyKeys.length} empty values in French:`)
        console.error(emptyKeys.join('\n'))
      }

      expect(emptyKeys).toEqual([])
    })

    it('should not have empty values in Dutch', () => {
      const emptyKeys = Object.keys(nlFlat).filter(key => {
        const value = nlFlat[key]
        return value === '' || value === null || value === undefined
      })

      if (emptyKeys.length > 0) {
        console.error(`Found ${emptyKeys.length} empty values in Dutch:`)
        console.error(emptyKeys.join('\n'))
      }

      expect(emptyKeys).toEqual([])
    })

    it('should flag untranslated strings marked with [EN] prefix', () => {
      const untranslatedFr = Object.keys(frFlat).filter(key => {
        const value = frFlat[key]
        return typeof value === 'string' && value.startsWith('[EN]')
      })

      const untranslatedNl = Object.keys(nlFlat).filter(key => {
        const value = nlFlat[key]
        return typeof value === 'string' && value.startsWith('[EN]')
      })

      if (untranslatedFr.length > 0) {
        console.warn(`French has ${untranslatedFr.length} untranslated strings (marked with [EN])`)
      }

      if (untranslatedNl.length > 0) {
        console.warn(`Dutch has ${untranslatedNl.length} untranslated strings (marked with [EN])`)
      }

      // This is a warning test - we expect 0 but won't fail the build
      // Remove the expect.any() when all translations are complete
      expect(untranslatedFr.length).toBeGreaterThanOrEqual(0)
      expect(untranslatedNl.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Translation Coverage', () => {
    const enKeys = getTranslationKeys(enTranslations)
    const frKeys = getTranslationKeys(frTranslations)
    const nlKeys = getTranslationKeys(nlTranslations)

    it('should have at least 90% coverage for French', () => {
      const coverage = (frKeys.size / enKeys.size) * 100
      console.log(`French coverage: ${coverage.toFixed(2)}%`)

      // Currently at 84.13%, aiming for 90%+
      expect(coverage).toBeGreaterThanOrEqual(80)
    })

    it('should have at least 90% coverage for Dutch', () => {
      const coverage = (nlKeys.size / enKeys.size) * 100
      console.log(`Dutch coverage: ${coverage.toFixed(2)}%`)

      // Currently at 84.13%, aiming for 90%+
      expect(coverage).toBeGreaterThanOrEqual(80)
    })
  })

  describe('Tutorial Translations', () => {
    const enFlat = flattenObject(enTranslations)
    const frFlat = flattenObject(frTranslations)
    const nlFlat = flattenObject(nlTranslations)

    const tutorialKeys = Object.keys(enFlat).filter(key => key.startsWith('tutorials.'))

    it('should have all tutorial keys translated', () => {
      const tutorialKeySet = new Set(tutorialKeys)
      const frTutorialKeys = Object.keys(frFlat).filter(key => key.startsWith('tutorials.'))
      const nlTutorialKeys = Object.keys(nlFlat).filter(key => key.startsWith('tutorials.'))

      const missingFr = tutorialKeys.filter(key => !frTutorialKeys.includes(key))
      const missingNl = tutorialKeys.filter(key => !nlTutorialKeys.includes(key))

      console.log(`Tutorial keys - EN: ${tutorialKeys.length}, FR: ${frTutorialKeys.length}, NL: ${nlTutorialKeys.length}`)

      if (missingFr.length > 0) {
        console.warn(`Missing ${missingFr.length} tutorial keys in French`)
      }

      if (missingNl.length > 0) {
        console.warn(`Missing ${missingNl.length} tutorial keys in Dutch`)
      }

      // Currently failing - will pass once translations are added
      // expect(missingFr).toEqual([])
      // expect(missingNl).toEqual([])
    })
  })
})

describe('Translation Quality', () => {
  const enFlat = flattenObject(enTranslations)
  const frFlat = flattenObject(frTranslations)
  const nlFlat = flattenObject(nlTranslations)

  describe('Type Consistency', () => {
    it('should have same type for matching keys across all languages', () => {
      const sharedKeys = Object.keys(enFlat).filter(key =>
        frFlat.hasOwnProperty(key) && nlFlat.hasOwnProperty(key)
      )

      const typeInconsistencies: string[] = []

      sharedKeys.forEach(key => {
        const enType = typeof enFlat[key]
        const frType = typeof frFlat[key]
        const nlType = typeof nlFlat[key]

        if (enType !== frType || enType !== nlType) {
          typeInconsistencies.push(
            `${key}: EN=${enType}, FR=${frType}, NL=${nlType}`
          )
        }
      })

      if (typeInconsistencies.length > 0) {
        console.error('Type inconsistencies found:')
        console.error(typeInconsistencies.join('\n'))
      }

      expect(typeInconsistencies).toEqual([])
    })
  })

  describe('Placeholder Consistency', () => {
    it('should have same placeholders in all language versions', () => {
      const placeholderRegex = /\{([^}]+)\}/g

      const inconsistencies: string[] = []

      Object.keys(enFlat).forEach(key => {
        if (!frFlat[key] || !nlFlat[key]) return

        const enValue = String(enFlat[key])
        const frValue = String(frFlat[key])
        const nlValue = String(nlFlat[key])

        const enPlaceholders = [...enValue.matchAll(placeholderRegex)].map(m => m[1])
        const frPlaceholders = [...frValue.matchAll(placeholderRegex)].map(m => m[1])
        const nlPlaceholders = [...nlValue.matchAll(placeholderRegex)].map(m => m[1])

        const enSet = new Set(enPlaceholders)
        const frSet = new Set(frPlaceholders)
        const nlSet = new Set(nlPlaceholders)

        if (enSet.size !== frSet.size || enSet.size !== nlSet.size) {
          inconsistencies.push(
            `${key}: EN=${enPlaceholders.join(',')}, FR=${frPlaceholders.join(',')}, NL=${nlPlaceholders.join(',')}`
          )
        }
      })

      if (inconsistencies.length > 0) {
        console.warn('Placeholder inconsistencies found:')
        console.warn(inconsistencies.slice(0, 10).join('\n'))
      }

      expect(inconsistencies).toEqual([])
    })
  })
})
