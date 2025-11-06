#!/usr/bin/env node

/**
 * i18n Audit Script
 * Scans all TSX files to detect hardcoded strings that should be internationalized
 */

const fs = require('fs');
const path = require('path');

// Configuration
const APP_DIR = path.join(__dirname, '../src/app');
const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const MESSAGES_DIR = path.join(__dirname, '../messages');

// Patterns to detect hardcoded strings
const PATTERNS = {
  // JSX text content: <div>Some text</div>
  jsxText: />([A-Z][a-zA-Z\s,.'!?:;-]{2,})</g,

  // String literals in JSX attributes
  jsxAttribute: /(\w+)=["']([A-Z][^"']{2,})["']/g,

  // Common UI text patterns
  placeholder: /placeholder=["']([^"']+)["']/g,
  title: /title=["']([^"']+)["']/g,
  ariaLabel: /aria-label=["']([^"']+)["']/g,
  label: /label=["']([^"']+)["']/g,

  // Button and link text
  buttonText: /<[Bb]utton[^>]*>([A-Z][^<]+)</g,
  linkText: /<[Ll]ink[^>]*>([A-Z][^<]+)</g,

  // Headings
  h1: /<h1[^>]*>([^<]+)</g,
  h2: /<h2[^>]*>([^<]+)</g,
  h3: /<h3[^>]*>([^<]+)</g,
  h4: /<h4[^>]*>([^<]+)</g,

  // Paragraphs
  paragraph: /<p[^>]*>([A-Z][^<]{3,})</g,
};

// Exceptions - technical strings that shouldn't be translated
const EXCEPTIONS = [
  // Technical values
  /^(email|password|username|text|number|tel|url|search)$/i,
  /^(true|false|null|undefined)$/i,
  /^(id|className|onClick|onChange|onSubmit)$/i,

  // CSS classes
  /^[\w-]+$/,

  // URLs
  /^https?:\/\//,
  /^\/[\w-/]+$/,

  // File extensions
  /\.(png|jpg|jpeg|svg|gif|webp|mp4|pdf)$/i,

  // Single words or very short strings
  /^[\w-]{1,2}$/,

  // Already using i18n
  /t\(['"]/,
  /useTranslations/,
  /getTranslations/,

  // Component names
  /^[A-Z][a-zA-Z]+$/,

  // Numbers and dates
  /^\d+$/,
  /^\d{4}-\d{2}-\d{2}/,
];

function isException(text) {
  if (!text || typeof text !== 'string') return true;

  const trimmed = text.trim();

  // Empty or too short
  if (trimmed.length < 3) return true;

  // Check against exception patterns
  return EXCEPTIONS.some(pattern => pattern.test(trimmed));
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.tsx')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

function extractHardcodedStrings(content, filePath) {
  const findings = [];
  const lines = content.split('\n');

  // Pattern 1: Text between JSX tags
  const jsxTextRegex = />([^<>{}\n]+)</g;
  let match;

  while ((match = jsxTextRegex.exec(content)) !== null) {
    const text = match[1].trim();

    // Skip if it's just whitespace, variables, or exceptions
    if (text &&
        !text.startsWith('{') &&
        !text.startsWith('$') &&
        !isException(text) &&
        /[A-Za-z]/.test(text)) {

      const lineNumber = content.substring(0, match.index).split('\n').length;
      findings.push({
        line: lineNumber,
        text: text,
        type: 'jsx-text',
        context: lines[lineNumber - 1]?.trim() || ''
      });
    }
  }

  // Pattern 2: String attributes (placeholder, title, etc.)
  const attributePatterns = [
    { name: 'placeholder', regex: /placeholder=["']([^"']+)["']/g },
    { name: 'title', regex: /title=["']([^"']+)["']/g },
    { name: 'aria-label', regex: /aria-label=["']([^"']+)["']/g },
    { name: 'label', regex: /(?:^|\s)label=["']([^"']+)["']/g },
    { name: 'alt', regex: /alt=["']([^"']+)["']/g },
  ];

  attributePatterns.forEach(({ name, regex }) => {
    while ((match = regex.exec(content)) !== null) {
      const text = match[1];

      if (!isException(text)) {
        const lineNumber = content.substring(0, match.index).split('\n').length;
        findings.push({
          line: lineNumber,
          text: text,
          type: `attribute-${name}`,
          context: lines[lineNumber - 1]?.trim() || ''
        });
      }
    }
  });

  return findings;
}

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

function main() {
  console.log('🔍 Starting i18n audit...\n');

  // Collect all TSX files
  const appFiles = getAllFiles(APP_DIR);
  const componentFiles = getAllFiles(COMPONENTS_DIR);
  const allFiles = [...appFiles, ...componentFiles];

  console.log(`📁 Scanning ${allFiles.length} files...\n`);

  // Scan each file
  const results = [];
  let totalHardcodedStrings = 0;

  allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = extractHardcodedStrings(content, filePath);

    if (findings.length > 0) {
      const relativePath = path.relative(path.join(__dirname, '..'), filePath);
      results.push({
        file: relativePath,
        findings: findings
      });
      totalHardcodedStrings += findings.length;
    }
  });

  // Load translation files
  console.log('📚 Loading translation files...\n');
  const enKeys = getAllKeys(loadTranslationKeys('en'));
  const frKeys = getAllKeys(loadTranslationKeys('fr'));
  const nlKeys = getAllKeys(loadTranslationKeys('nl'));

  // Find missing keys
  const missingInFr = enKeys.filter(key => !frKeys.includes(key));
  const missingInNl = enKeys.filter(key => !nlKeys.includes(key));

  // Generate report
  console.log('=' .repeat(80));
  console.log('# AUDIT i18n - TEXTES EN DUR DÉTECTÉS');
  console.log('=' .repeat(80));
  console.log('\n## RÉSUMÉ\n');
  console.log(`- Nombre de fichiers scannés: ${allFiles.length}`);
  console.log(`- Nombre de fichiers avec textes en dur: ${results.length}`);
  console.log(`- Nombre total de textes en dur trouvés: ${totalHardcodedStrings}`);

  const coverage = ((1 - (totalHardcodedStrings / (totalHardcodedStrings + enKeys.length))) * 100).toFixed(1);
  console.log(`- Taux de couverture i18n: ${coverage}%`);

  console.log('\n## DÉTAILS PAR FICHIER\n');

  // Sort by number of findings
  results.sort((a, b) => b.findings.length - a.findings.length);

  results.forEach(({ file, findings }) => {
    console.log(`\n### ${file}`);
    console.log(`   ${findings.length} texte(s) en dur trouvé(s)\n`);

    findings.forEach(({ line, text, type, context }) => {
      console.log(`   - Ligne ${line} [${type}]: "${text}"`);
      if (context) {
        console.log(`     Context: ${context.substring(0, 100)}${context.length > 100 ? '...' : ''}`);
      }
    });
  });

  console.log('\n' + '=' .repeat(80));
  console.log('## VÉRIFICATION DES TRADUCTIONS EXISTANTES');
  console.log('=' .repeat(80));
  console.log(`\n- Clés totales en EN: ${enKeys.length}`);
  console.log(`- Clés totales en FR: ${frKeys.length}`);
  console.log(`- Clés totales en NL: ${nlKeys.length}`);

  if (missingInFr.length > 0) {
    console.log(`\n### Clés manquantes en FR (${missingInFr.length}):\n`);
    missingInFr.slice(0, 20).forEach(key => console.log(`   - ${key}`));
    if (missingInFr.length > 20) {
      console.log(`   ... et ${missingInFr.length - 20} autres`);
    }
  } else {
    console.log('\n✅ Toutes les clés EN sont présentes en FR');
  }

  if (missingInNl.length > 0) {
    console.log(`\n### Clés manquantes en NL (${missingInNl.length}):\n`);
    missingInNl.slice(0, 20).forEach(key => console.log(`   - ${key}`));
    if (missingInNl.length > 20) {
      console.log(`   ... et ${missingInNl.length - 20} autres`);
    }
  } else {
    console.log('\n✅ Toutes les clés EN sont présentes en NL');
  }

  console.log('\n' + '=' .repeat(80));
  console.log('## RECOMMANDATIONS');
  console.log('=' .repeat(80));
  console.log('\n1. Remplacer tous les textes en dur par des appels à t()');
  console.log('2. Utiliser useTranslations() dans les Client Components');
  console.log('3. Utiliser getTranslations() dans les Server Components');
  console.log('4. Compléter les traductions manquantes en FR et NL');
  console.log('5. Mettre en place des hooks pre-commit pour détecter les nouveaux textes en dur');
  console.log('\n');

  // Save report to file
  const reportPath = path.join(__dirname, '../i18n-audit-report.txt');
  // (We won't save to avoid file creation, just output to console)

  console.log(`✅ Audit terminé!`);
  console.log(`\nPour corriger automatiquement, utilisez: npm run fix-i18n`);
}

main();
