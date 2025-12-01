#!/usr/bin/env node

/**
 * Find Orphan Translation Keys
 * Scans all code files to find translation keys that are defined but not used
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '../src');
const MESSAGES_DIR = path.join(__dirname, '../messages');

// Get all keys from a nested object
function getAllKeys(obj, prefix = '') {
  let keys = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

// Load translation file
function loadTranslationKeys(locale) {
  try {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${locale}.json:`, error.message);
    return {};
  }
}

// Get all code files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      if (!file.includes('node_modules') && !file.startsWith('.')) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Read all code content
function readAllCode() {
  const files = getAllFiles(SRC_DIR);
  let allCode = '';

  files.forEach(file => {
    allCode += fs.readFileSync(file, 'utf8') + '\n';
  });

  return allCode;
}

// Check if a key is used in the code
function isKeyUsed(key, code) {
  // Split key into parts
  const parts = key.split('.');
  const namespace = parts[0];
  const subKey = parts.slice(1).join('.');

  // Patterns to check for key usage
  const patterns = [
    // Direct key usage: t('key') or t("key")
    new RegExp(`t\\(['"\`]${escapeRegex(key)}['"\`]`, 'g'),

    // Partial key with namespace: getTranslations('namespace') then t('subKey')
    new RegExp(`t\\(['"\`]${escapeRegex(subKey)}['"\`]`, 'g'),

    // Template literal usage: t(`${namespace}.key`)
    new RegExp(`${escapeRegex(namespace)}['\"\`]\\s*,\\s*['\"\`]${escapeRegex(subKey)}`, 'g'),

    // Object access pattern: translations.key
    new RegExp(`\\.${escapeRegex(parts[parts.length - 1])}\\b`, 'g'),

    // String concatenation
    new RegExp(`['"\`]${escapeRegex(subKey)}['"\`]`, 'g'),
  ];

  return patterns.some(pattern => pattern.test(code));
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  console.log('Finding orphan translation keys...\n');

  // Load all translation keys from en.json (reference)
  const enTranslations = loadTranslationKeys('en');
  const allKeys = getAllKeys(enTranslations);

  console.log(`Total keys in en.json: ${allKeys.length}\n`);

  // Read all code
  console.log('Reading all source files...');
  const allCode = readAllCode();

  // Find orphan keys
  console.log('Checking key usage...\n');
  const orphanKeys = [];
  const usedKeys = [];

  allKeys.forEach(key => {
    if (isKeyUsed(key, allCode)) {
      usedKeys.push(key);
    } else {
      orphanKeys.push(key);
    }
  });

  // Group orphan keys by namespace
  const orphansByNamespace = {};
  orphanKeys.forEach(key => {
    const namespace = key.split('.')[0];
    if (!orphansByNamespace[namespace]) {
      orphansByNamespace[namespace] = [];
    }
    orphansByNamespace[namespace].push(key);
  });

  // Report
  console.log('=' .repeat(80));
  console.log('ORPHAN KEYS REPORT');
  console.log('=' .repeat(80));
  console.log(`\nTotal keys: ${allKeys.length}`);
  console.log(`Used keys: ${usedKeys.length}`);
  console.log(`Potentially orphan keys: ${orphanKeys.length}`);
  console.log(`Usage rate: ${((usedKeys.length / allKeys.length) * 100).toFixed(1)}%\n`);

  console.log('ORPHAN KEYS BY NAMESPACE:\n');

  Object.keys(orphansByNamespace)
    .sort((a, b) => orphansByNamespace[b].length - orphansByNamespace[a].length)
    .forEach(namespace => {
      const keys = orphansByNamespace[namespace];
      console.log(`\n${namespace}: ${keys.length} orphan keys`);
      keys.slice(0, 10).forEach(key => {
        console.log(`  - ${key}`);
      });
      if (keys.length > 10) {
        console.log(`  ... and ${keys.length - 10} more`);
      }
    });

  // Save to file for further analysis
  const output = {
    summary: {
      totalKeys: allKeys.length,
      usedKeys: usedKeys.length,
      orphanKeys: orphanKeys.length,
      usageRate: ((usedKeys.length / allKeys.length) * 100).toFixed(1) + '%'
    },
    orphanKeysByNamespace: orphansByNamespace,
    allOrphanKeys: orphanKeys
  };

  const outputPath = path.join(__dirname, '../orphan-keys-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nReport saved to: ${outputPath}`);

  return orphanKeys;
}

main();
