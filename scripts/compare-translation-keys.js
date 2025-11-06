#!/usr/bin/env node

/**
 * Translation Keys Comparison Script
 * Compares translation keys across en.json, fr.json, and nl.json
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../messages');

// Helper to flatten nested object to dot notation
function flattenObject(obj, prefix = '') {
  const flattened = {};

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(flattened, flattenObject(obj[key], fullKey));
    } else {
      flattened[fullKey] = obj[key];
    }
  }

  return flattened;
}

// Load translation files
console.log('Loading translation files...\n');

const en = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf8'));
const fr = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'fr.json'), 'utf8'));
const nl = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'nl.json'), 'utf8'));

const enFlat = flattenObject(en);
const frFlat = flattenObject(fr);
const nlFlat = flattenObject(nl);

const enKeys = Object.keys(enFlat);
const frKeys = Object.keys(frFlat);
const nlKeys = Object.keys(nlFlat);

console.log('📊 Translation Keys Statistics:');
console.log(`   English: ${enKeys.length} keys`);
console.log(`   French:  ${frKeys.length} keys`);
console.log(`   Dutch:   ${nlKeys.length} keys\n`);

// Find missing keys
const missingInFr = enKeys.filter(key => !frKeys.includes(key));
const missingInNl = enKeys.filter(key => !nlKeys.includes(key));
const onlyInFr = frKeys.filter(key => !enKeys.includes(key));
const onlyInNl = nlKeys.filter(key => !enKeys.includes(key));

// Find untranslated values (same as English)
const untranslatedFr = enKeys.filter(key => {
  return frFlat[key] && frFlat[key] === enFlat[key] && typeof enFlat[key] === 'string';
});

const untranslatedNl = enKeys.filter(key => {
  return nlFlat[key] && nlFlat[key] === enFlat[key] && typeof enFlat[key] === 'string';
});

// Find empty values
const emptyFr = frKeys.filter(key => !frFlat[key] || frFlat[key] === '');
const emptyNl = nlKeys.filter(key => !nlFlat[key] || nlFlat[key] === '');

// Report
console.log('='.repeat(80));
console.log('TRANSLATION KEYS COMPARISON REPORT');
console.log('='.repeat(80));

console.log('\n🔍 MISSING KEYS (keys that exist in English but not in other languages)\n');
console.log(`French - Missing ${missingInFr.length} keys:`);
if (missingInFr.length > 0) {
  console.log('First 30 keys:');
  missingInFr.slice(0, 30).forEach((key, i) => {
    console.log(`  ${i + 1}. ${key}`);
    console.log(`     EN: "${enFlat[key]}"`);
  });
  if (missingInFr.length > 30) {
    console.log(`  ... and ${missingInFr.length - 30} more`);
  }
}

console.log(`\nDutch - Missing ${missingInNl.length} keys:`);
if (missingInNl.length > 0) {
  console.log('First 30 keys:');
  missingInNl.slice(0, 30).forEach((key, i) => {
    console.log(`  ${i + 1}. ${key}`);
    console.log(`     EN: "${enFlat[key]}"`);
  });
  if (missingInNl.length > 30) {
    console.log(`  ... and ${missingInNl.length - 30} more`);
  }
}

console.log('\n\n🚨 EXTRA KEYS (keys that exist in translations but not in English)\n');
console.log(`French - ${onlyInFr.length} extra keys:`);
onlyInFr.forEach(key => console.log(`  - ${key}`));

console.log(`\nDutch - ${onlyInNl.length} extra keys:`);
onlyInNl.forEach(key => console.log(`  - ${key}`));

console.log('\n\n⚠️  UNTRANSLATED VALUES (values identical to English)\n');
console.log(`French - ${untranslatedFr.length} untranslated values:`);
if (untranslatedFr.length > 0) {
  console.log('First 20:');
  untranslatedFr.slice(0, 20).forEach((key, i) => {
    console.log(`  ${i + 1}. ${key} = "${enFlat[key]}"`);
  });
  if (untranslatedFr.length > 20) {
    console.log(`  ... and ${untranslatedFr.length - 20} more`);
  }
}

console.log(`\nDutch - ${untranslatedNl.length} untranslated values:`);
if (untranslatedNl.length > 0) {
  console.log('First 20:');
  untranslatedNl.slice(0, 20).forEach((key, i) => {
    console.log(`  ${i + 1}. ${key} = "${enFlat[key]}"`);
  });
  if (untranslatedNl.length > 20) {
    console.log(`  ... and ${untranslatedNl.length - 20} more`);
  }
}

console.log('\n\n📉 EMPTY VALUES\n');
console.log(`French - ${emptyFr.length} empty values:`);
emptyFr.forEach(key => console.log(`  - ${key}`));

console.log(`\nDutch - ${emptyNl.length} empty values:`);
emptyNl.forEach(key => console.log(`  - ${key}`));

console.log('\n\n' + '='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));

const frCoverage = ((frKeys.length / enKeys.length) * 100).toFixed(1);
const nlCoverage = ((nlKeys.length / enKeys.length) * 100).toFixed(1);

console.log(`
📊 Coverage:
   French:  ${frCoverage}% (${frKeys.length}/${enKeys.length} keys)
   Dutch:   ${nlCoverage}% (${nlKeys.length}/${enKeys.length} keys)

🚨 Issues:
   French:
     - ${missingInFr.length} missing keys
     - ${untranslatedFr.length} untranslated values
     - ${emptyFr.length} empty values
     - ${onlyInFr.length} orphaned keys (not in English)

   Dutch:
     - ${missingInNl.length} missing keys
     - ${untranslatedNl.length} untranslated values
     - ${emptyNl.length} empty values
     - ${onlyInNl.length} orphaned keys (not in English)

🎯 Priority Actions:
   1. Add ${missingInFr.length} missing keys to French
   2. Add ${missingInNl.length} missing keys to Dutch
   3. Translate ${untranslatedFr.length} French values
   4. Translate ${untranslatedNl.length} Dutch values
   5. Remove ${onlyInFr.length + onlyInNl.length} orphaned keys
`);

// Save detailed results
const results = {
  statistics: {
    en: enKeys.length,
    fr: frKeys.length,
    nl: nlKeys.length,
  },
  missing: {
    fr: missingInFr,
    nl: missingInNl,
  },
  orphaned: {
    fr: onlyInFr,
    nl: onlyInNl,
  },
  untranslated: {
    fr: untranslatedFr.map(key => ({ key, value: enFlat[key] })),
    nl: untranslatedNl.map(key => ({ key, value: enFlat[key] })),
  },
  empty: {
    fr: emptyFr,
    nl: emptyNl,
  },
};

const outputPath = path.join(__dirname, '../I18N_TRANSLATION_COMPARISON.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`\n💾 Detailed results saved to: ${path.relative(process.cwd(), outputPath)}\n`);
console.log('='.repeat(80) + '\n');
