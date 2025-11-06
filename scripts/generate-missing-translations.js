#!/usr/bin/env node

/**
 * Generate missing translation keys from audit results
 * Creates a JSON file with all new keys to be added to en.json, fr.json, nl.json
 */

const fs = require('fs');
const path = require('path');

const AUDIT_FILE = path.join(__dirname, '../I18N_COMPREHENSIVE_SCAN_RESULTS.json');
const OUTPUT_FILE = path.join(__dirname, '../scripts/generated-translation-keys.json');

// Load audit results
const auditResults = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));

// Translation key generator
function generateKey(text, category, fileContext) {
  // Clean text for key generation
  let key = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);

  // Determine namespace based on file path
  let namespace = 'common';

  if (fileContext.includes('/auth/')) {
    namespace = 'auth';
  } else if (fileContext.includes('/collections/')) {
    namespace = 'collections';
  } else if (fileContext.includes('/profile/')) {
    namespace = 'profile';
  } else if (fileContext.includes('/tutorials/')) {
    namespace = 'tutorials';
  } else if (fileContext.includes('/prompts/')) {
    namespace = 'prompts';
  } else if (fileContext.includes('/components/ui/')) {
    namespace = 'ui';
  } else if (fileContext.includes('/components/api/')) {
    namespace = 'api';
  } else if (fileContext.includes('/components/search/')) {
    namespace = 'search';
  } else if (fileContext.includes('/components/notifications/')) {
    namespace = 'notifications';
  } else if (fileContext.includes('/components/onboarding/')) {
    namespace = 'onboarding';
  } else if (fileContext.includes('/settings/')) {
    namespace = 'settings';
  }

  // Add category suffix if appropriate
  if (category === 'actions') {
    key = `action_${key}`;
  } else if (category === 'messages') {
    key = `message_${key}`;
  } else if (category === 'forms') {
    key = `form_${key}`;
  } else if (category === 'headings') {
    key = `heading_${key}`;
  }

  return `${namespace}.${key}`;
}

// Generate translations with AI-friendly format
const translations = {
  en: {},
  fr: {},
  nl: {}
};

const translationList = [];

// Process each file
Object.entries(auditResults.files).forEach(([file, findings]) => {
  findings.forEach(finding => {
    const key = generateKey(finding.text, finding.category, file);
    const baseKey = key.split('.').pop();

    // Skip if already exists
    if (translations.en[key]) return;

    // Add to English
    translations.en[key] = finding.text;

    // Add to list for bulk translation
    translationList.push({
      file,
      line: finding.line,
      context: finding.context,
      category: finding.category,
      priority: finding.priority,
      key,
      baseKey,
      namespace: key.split('.')[0],
      en: finding.text,
      fr: '', // To be filled
      nl: ''  // To be filled
    });
  });
});

// Organize by namespace
const byNamespace = {};
translationList.forEach(item => {
  if (!byNamespace[item.namespace]) {
    byNamespace[item.namespace] = [];
  }
  byNamespace[item.namespace].push(item);
});

// Generate output
const output = {
  summary: {
    total: translationList.length,
    byNamespace: Object.entries(byNamespace).map(([ns, items]) => ({
      namespace: ns,
      count: items.length
    })),
    byPriority: {
      high: translationList.filter(i => i.priority === 'high').length,
      medium: translationList.filter(i => i.priority === 'medium').length,
      low: translationList.filter(i => i.priority === 'low').length
    }
  },
  byNamespace,
  allKeys: translationList,

  // Formatted for easy copy-paste into JSON files
  keysForEN: {},
  keysForFR: {},
  keysForNL: {}
};

// Organize by namespace for JSON files
translationList.forEach(item => {
  const parts = item.key.split('.');
  const namespace = parts[0];
  const key = parts.slice(1).join('.');

  if (!output.keysForEN[namespace]) {
    output.keysForEN[namespace] = {};
    output.keysForFR[namespace] = {};
    output.keysForNL[namespace] = {};
  }

  output.keysForEN[namespace][key] = item.en;
  output.keysForFR[namespace][key] = `[FR] ${item.en}`; // Placeholder
  output.keysForNL[namespace][key] = `[NL] ${item.en}`; // Placeholder
});

// Save results
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

console.log('\n' + '='.repeat(80));
console.log('TRANSLATION KEYS GENERATED');
console.log('='.repeat(80));
console.log(`\nTotal keys: ${output.summary.total}`);
console.log('\nBy namespace:');
output.summary.byNamespace.forEach(item => {
  console.log(`  ${item.namespace}: ${item.count}`);
});
console.log('\nBy priority:');
console.log(`  High:   ${output.summary.byPriority.high}`);
console.log(`  Medium: ${output.summary.byPriority.medium}`);
console.log(`  Low:    ${output.summary.byPriority.low}`);
console.log(`\n💾 Saved to: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
console.log('\nNext steps:');
console.log('1. Review generated keys in the output file');
console.log('2. Copy keys from keysForEN/FR/NL into respective message files');
console.log('3. Translate FR and NL placeholders to actual translations');
console.log('4. Run the replacement script to update all files');
console.log('='.repeat(80) + '\n');
