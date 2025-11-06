#!/usr/bin/env node

/**
 * Replace hardcoded strings in TSX/TS files with translation calls
 * This script automatically updates files based on the audit and generated keys
 */

const fs = require('fs');
const path = require('path');

const AUDIT_FILE = path.join(__dirname, '../I18N_COMPREHENSIVE_SCAN_RESULTS.json');
const GENERATED_FILE = path.join(__dirname, 'generated-translation-keys.json');

// Load data
const auditResults = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
const generatedKeys = JSON.parse(fs.readFileSync(GENERATED_FILE, 'utf8'));

// Create a map of text -> translation key
const textToKey = new Map();
generatedKeys.allKeys.forEach(item => {
  textToKey.set(item.en, item.key);
});

const stats = {
  filesProcessed: 0,
  stringsReplaced: 0,
  filesModified: 0,
  errors: []
};

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function shouldSkipFile(filePath) {
  // Skip test files, API routes, middleware
  return /\.(test|spec)\.tsx?$/.test(filePath) ||
         /route\.ts$/.test(filePath) ||
         /middleware/.test(filePath) ||
         /database\.types\.ts/.test(filePath) ||
         /design-system-test/.test(filePath); // Skip test pages
}

function needsUseClient(content) {
  // Check if file already has 'use client'
  if (content.includes("'use client'")) return false;

  // Check if file uses hooks or client-side features
  return /use(State|Effect|Ref|Callback|Memo|Context|Translations)\(/.test(content) ||
         /onClick|onChange|onSubmit|onBlur|onFocus/.test(content);
}

function hasTranslationImport(content) {
  return /import.*useTranslations.*from.*next-intl/.test(content);
}

function getNamespaceFromFile(filePath) {
  if (filePath.includes('/auth/')) return 'auth';
  if (filePath.includes('/collections/')) return 'collections';
  if (filePath.includes('/profile/')) return 'profile';
  if (filePath.includes('/tutorials/')) return 'tutorials';
  if (filePath.includes('/prompts/')) return 'prompts';
  if (filePath.includes('/settings/')) return 'settings';
  if (filePath.includes('/components/api/')) return 'api';
  if (filePath.includes('/components/notifications/')) return 'notifications';
  if (filePath.includes('/components/onboarding/')) return 'onboarding';
  if (filePath.includes('/components/search/')) return 'search';
  if (filePath.includes('/components/ui/')) return 'ui';
  return 'common';
}

function addTranslationImport(content, isClientComponent) {
  const hasImport = hasTranslationImport(content);
  if (hasImport) return content;

  // Find the last import statement
  const lines = content.split('\n');
  let lastImportIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      lastImportIndex = i;
    } else if (lines[i].trim() && !lines[i].trim().startsWith('import ') && lastImportIndex >= 0) {
      break;
    }
  }

  const importLine = isClientComponent
    ? "import { useTranslations } from 'next-intl'"
    : "import { getTranslations } from 'next-intl/server'";

  if (lastImportIndex >= 0) {
    lines.splice(lastImportIndex + 1, 0, importLine);
  } else {
    // No imports found, add at the beginning (after 'use client' if present)
    const useClientIndex = lines.findIndex(l => l.includes("'use client'"));
    if (useClientIndex >= 0) {
      lines.splice(useClientIndex + 1, 0, '', importLine);
    } else {
      lines.unshift(importLine, '');
    }
  }

  return lines.join('\n');
}

function addTranslationHook(content, namespace) {
  // Check if already has translation hook
  if (/const\s+t\s*=\s*useTranslations/.test(content)) {
    return content;
  }

  // Find the component function
  const componentMatch = content.match(/(export\s+default\s+function\s+\w+[^{]*\{)/);
  if (!componentMatch) {
    // Try arrow function
    const arrowMatch = content.match(/(export\s+default\s+(?:async\s+)?function\s*\([^)]*\)[^{]*\{)/);
    if (!arrowMatch) return content;
  }

  const hookLine = `  const t = useTranslations('${namespace}')`;

  // Insert after the opening brace of the function
  const match = componentMatch || content.match(/(export\s+default\s+(?:async\s+)?function\s*\([^)]*\)[^{]*\{)/);
  const insertPos = match.index + match[0].length;

  return content.slice(0, insertPos) +
         '\n' + hookLine +
         content.slice(insertPos);
}

function replaceString(content, text, key) {
  const namespace = key.split('.')[0];
  const keyPath = key.split('.').slice(1).join('.');

  let replaced = false;

  // Pattern 1: Plain text between tags >text<
  const pattern1 = new RegExp(`>\\s*${escapeRegex(text)}\\s*<`, 'g');
  if (pattern1.test(content)) {
    content = content.replace(pattern1, `>{t('${keyPath}')}<`);
    replaced = true;
  }

  // Pattern 2: Quoted attribute values like placeholder="text"
  const pattern2 = new RegExp(`(['"])${escapeRegex(text)}\\1`, 'g');
  if (pattern2.test(content)) {
    content = content.replace(pattern2, `{t('${keyPath}')}`);
    replaced = true;
  }

  // Pattern 3: alt="text" specifically
  const pattern3 = new RegExp(`alt="${escapeRegex(text)}"`, 'g');
  if (pattern3.test(content)) {
    content = content.replace(pattern3, `alt={t('${keyPath}')}`);
    replaced = true;
  }

  return { content, replaced };
}

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    stats.errors.push({ file: filePath, error: 'File not found' });
    return;
  }

  if (shouldSkipFile(filePath)) {
    console.log(`⊘ Skipped: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  const findings = auditResults.files[filePath];

  if (!findings || findings.length === 0) {
    return;
  }

  stats.filesProcessed++;

  const namespace = getNamespaceFromFile(filePath);
  const isClientComponent = needsUseClient(content);

  let stringsReplacedInFile = 0;

  // Process each finding
  findings.forEach(finding => {
    const key = textToKey.get(finding.text);
    if (!key) {
      stats.errors.push({ file: filePath, text: finding.text, error: 'No key found' });
      return;
    }

    const result = replaceString(content, finding.text, key);
    if (result.replaced) {
      content = result.content;
      stringsReplacedInFile++;
      stats.stringsReplaced++;
    }
  });

  // If strings were replaced, add necessary imports and hooks
  if (stringsReplacedInFile > 0) {
    // Add translation import
    content = addTranslationImport(content, isClientComponent);

    // Add translation hook for client components
    if (isClientComponent) {
      content = addTranslationHook(content, namespace);
    }

    // Write back to file
    fs.writeFileSync(fullPath, content);
    stats.filesModified++;

    console.log(`✅ ${filePath}: Replaced ${stringsReplacedInFile} strings`);
  } else {
    console.log(`⊘ ${filePath}: No replacements made`);
  }
}

// Main execution
console.log('\n' + '='.repeat(80));
console.log('REPLACING HARDCODED STRINGS WITH TRANSLATION CALLS');
console.log('='.repeat(80) + '\n');

// Process high priority files first
const highPriorityFiles = Object.entries(auditResults.files)
  .filter(([_, findings]) => findings.some(f => f.priority === 'high'))
  .map(([file]) => file);

console.log(`\n🔴 HIGH PRIORITY (${highPriorityFiles.length} files)\n`);
highPriorityFiles.forEach(file => processFile(file));

// Then medium priority
const mediumPriorityFiles = Object.entries(auditResults.files)
  .filter(([_, findings]) => findings.every(f => f.priority !== 'high') && findings.some(f => f.priority === 'medium'))
  .map(([file]) => file);

console.log(`\n🟡 MEDIUM PRIORITY (${mediumPriorityFiles.length} files)\n`);
mediumPriorityFiles.forEach(file => processFile(file));

// Then low priority
const lowPriorityFiles = Object.entries(auditResults.files)
  .filter(([_, findings]) => findings.every(f => f.priority === 'low'))
  .map(([file]) => file);

console.log(`\n🟢 LOW PRIORITY (${lowPriorityFiles.length} files)\n`);
lowPriorityFiles.forEach(file => processFile(file));

// Print summary
console.log('\n' + '='.repeat(80));
console.log('REPLACEMENT SUMMARY');
console.log('='.repeat(80));
console.log(`\nFiles processed: ${stats.filesProcessed}`);
console.log(`Files modified: ${stats.filesModified}`);
console.log(`Strings replaced: ${stats.stringsReplaced}`);
console.log(`Errors: ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\n❌ ERRORS:');
  stats.errors.forEach(err => {
    console.log(`  ${err.file}: ${err.error}`);
    if (err.text) console.log(`    Text: "${err.text}"`);
  });
}

console.log('\n✅ Replacement complete!');
console.log('\nNext steps:');
console.log('1. Review the modified files');
console.log('2. Run your build to check for TypeScript errors');
console.log('3. Test the application in all 3 languages');
console.log('4. Commit the changes');
console.log('='.repeat(80) + '\n');

// Save stats
fs.writeFileSync(
  path.join(__dirname, '../I18N_REPLACEMENT_STATS.json'),
  JSON.stringify(stats, null, 2)
);
