#!/usr/bin/env node

/**
 * CI/CD Translation Check Script
 *
 * This script validates that all translation files have the same keys.
 * It compares fr.json and nl.json against en.json (the reference).
 *
 * Usage:
 *   node scripts/check-translations.js           # Check all translations
 *   node scripts/check-translations.js --strict  # Fail on any missing key
 *   node scripts/check-translations.js --fix     # Show which keys need to be added
 *
 * Exit codes:
 *   0 - All translations are complete
 *   1 - Missing translations found (in strict mode)
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const REFERENCE_LOCALE = 'en';
const LOCALES = ['fr', 'nl'];

// Parse command line arguments
const args = process.argv.slice(2);
const isStrict = args.includes('--strict');
const showFix = args.includes('--fix');

/**
 * Recursively get all keys from a nested object
 * @param {object} obj - The object to extract keys from
 * @param {string} prefix - Current key prefix
 * @returns {string[]} - Array of dot-notation keys
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

/**
 * Get value at a dot-notation path
 * @param {object} obj - The object to get value from
 * @param {string} path - Dot-notation path
 * @returns {any} - The value at the path
 */
function getValueAtPath(obj, path) {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
}

/**
 * Load JSON file
 * @param {string} locale - Locale code
 * @returns {object} - Parsed JSON
 */
function loadTranslations(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${locale}.json:`, error.message);
    process.exit(1);
  }
}

/**
 * Main function
 */
function main() {
  console.log('Translation Check Script');
  console.log('========================\n');

  // Load reference translations
  const reference = loadTranslations(REFERENCE_LOCALE);
  const referenceKeys = getAllKeys(reference);

  console.log(`Reference locale: ${REFERENCE_LOCALE}`);
  console.log(`Total keys: ${referenceKeys.length}\n`);

  let hasErrors = false;
  const results = {};

  // Check each locale
  for (const locale of LOCALES) {
    console.log(`Checking ${locale}.json...`);

    const translations = loadTranslations(locale);
    const translationKeys = getAllKeys(translations);

    // Find missing keys (in reference but not in locale)
    const missingKeys = referenceKeys.filter((key) => !translationKeys.includes(key));

    // Find extra keys (in locale but not in reference)
    const extraKeys = translationKeys.filter((key) => !referenceKeys.includes(key));

    // Find empty values
    const emptyValues = translationKeys.filter((key) => {
      const value = getValueAtPath(translations, key);
      return value === '' || value === null || value === undefined;
    });

    results[locale] = { missingKeys, extraKeys, emptyValues };

    if (missingKeys.length > 0) {
      hasErrors = true;
      console.log(`  Missing keys: ${missingKeys.length}`);

      if (showFix) {
        console.log('  Keys to add:');
        missingKeys.slice(0, 20).forEach((key) => {
          const refValue = getValueAtPath(reference, key);
          console.log(`    "${key}": "${refValue}"`);
        });
        if (missingKeys.length > 20) {
          console.log(`    ... and ${missingKeys.length - 20} more`);
        }
      }
    } else {
      console.log('  Missing keys: 0');
    }

    if (extraKeys.length > 0) {
      console.log(`  Extra keys (not in reference): ${extraKeys.length}`);
      if (showFix && extraKeys.length <= 10) {
        extraKeys.forEach((key) => console.log(`    - ${key}`));
      }
    }

    if (emptyValues.length > 0) {
      console.log(`  Empty values: ${emptyValues.length}`);
    }

    // Calculate completion percentage
    const completion = ((referenceKeys.length - missingKeys.length) / referenceKeys.length * 100).toFixed(1);
    console.log(`  Completion: ${completion}%\n`);
  }

  // Summary
  console.log('Summary');
  console.log('-------');

  let totalMissing = 0;
  for (const locale of LOCALES) {
    const { missingKeys } = results[locale];
    totalMissing += missingKeys.length;
    const status = missingKeys.length === 0 ? 'PASS' : 'INCOMPLETE';
    console.log(`${locale}: ${status} (${missingKeys.length} missing)`);
  }

  console.log('');

  // Exit with error in strict mode if there are missing translations
  if (isStrict && hasErrors) {
    console.log('FAILED: Missing translations found. Run with --fix to see details.');
    process.exit(1);
  }

  if (hasErrors) {
    console.log('WARNING: Some translations are incomplete.');
    console.log('Run with --fix to see which keys need to be added.');
    console.log('Run with --strict to fail the build on missing translations.');
  } else {
    console.log('SUCCESS: All translations are complete!');
  }

  process.exit(0);
}

main();
