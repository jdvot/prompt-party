#!/usr/bin/env node

/**
 * Comprehensive i18n Audit Script
 * Scans all TSX/TS files for hardcoded strings and generates actionable reports
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '../src');
const MESSAGES_DIR = path.join(__dirname, '../messages');
const OUTPUT_FILE = path.join(__dirname, '../I18N_COMPREHENSIVE_SCAN_RESULTS.json');

// Patterns to detect hardcoded text
const TEXT_PATTERNS = [
  // JSX text content
  />\s*(['"`])((?:(?!\1).)+)\1\s*</g,
  // String literals in JSX (but not imports, requires, etc)
  /(?:title|label|placeholder|alt|aria-label|content|text|message|description|tooltip|hint|caption)=['"`]([^'"`]+)['"`]/gi,
  // Template literals in JSX attributes
  /(?:title|label|placeholder|alt|aria-label|content|text)=\{`([^`]+)`\}/gi,
  // Plain JSX text between tags (not whitespace)
  />([A-Z][a-zA-Z\s,\.!?:;'-]{2,})</g,
  // Button/link text
  /<(?:button|a|Button|Link)[^>]*>([^<{]+)</gi,
  // Heading text
  /<h[1-6][^>]*>([^<{]+)</gi,
  // Paragraph text
  /<p[^>]*>([^<{]+)</gi,
  // Label text
  /<label[^>]*>([^<{]+)</gi,
  // Error/success messages
  /(?:error|success|warning|info):\s*['"`]([^'"`]+)['"`]/gi,
];

// Strings to ignore (not translatable)
const IGNORE_PATTERNS = [
  /^[\s\n\r]*$/,  // Whitespace only
  /^[0-9\s]+$/,   // Numbers only
  /^[#/\-_\s]+$/, // Symbols only
  /^https?:\/\//i, // URLs
  /^mailto:/i,     // Email links
  /^tel:/i,        // Phone links
  /^\$\{.*\}$/,    // Template variable only
  /^import /,      // Import statements
  /^export /,      // Export statements
  /^const /,       // Const declarations
  /^function /,    // Function declarations
  /^class /,       // Class declarations
  /^interface /,   // Interface declarations
  /^type /,        // Type declarations
  /^\w+\(\)/,      // Function calls
  /^[a-z][a-zA-Z0-9_]*$/,  // Single camelCase word (likely variable)
  /^[A-Z][A-Z0-9_]*$/,     // CONSTANT_NAME
  /^[\w-]+\.[\w-]+$/,      // file.extension or namespace.key
  /^px|em|rem|%|vh|vw$/i,  // CSS units
  /^#[0-9a-f]{3,8}$/i,     // Hex colors
  /^rgb\(|rgba\(/i,        // RGB colors
  /^var\(--/,              // CSS variables
  /^className|style|onClick|onChange|onSubmit|href|src/i, // Props
];

// Files to skip
const SKIP_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /\.test\./,
  /\.spec\./,
  /\.d\.ts$/,
  /supabase\.ts$/,
  /database\.types\.ts$/,
  /middleware/,
  /route\.ts$/,  // API routes
];

const results = {
  scanned: 0,
  withIssues: 0,
  totalStrings: 0,
  files: {},
  summary: {
    byCategory: {},
    byPriority: {},
    suggestions: []
  }
};

function shouldSkipFile(filePath) {
  return SKIP_PATTERNS.some(pattern => pattern.test(filePath));
}

function shouldIgnoreString(str) {
  if (!str || str.length < 2 || str.length > 200) return true;
  return IGNORE_PATTERNS.some(pattern => pattern.test(str.trim()));
}

function isAlreadyTranslated(str) {
  // Check if string contains translation function calls
  return /t\(['"`]/.test(str) ||
         /useTranslations\(/.test(str) ||
         /getTranslations\(/.test(str) ||
         /\{t\(['"`]/.test(str);
}

function categorizeString(str, context) {
  if (/button|submit|cancel|save|delete|edit|create|add|remove/i.test(context)) {
    return 'actions';
  } else if (/error|warning|success|info|alert/i.test(context)) {
    return 'messages';
  } else if (/title|heading|h[1-6]/i.test(context)) {
    return 'headings';
  } else if (/label|placeholder|hint|tooltip/i.test(context)) {
    return 'forms';
  } else if (/description|paragraph|p>/i.test(context)) {
    return 'content';
  } else if (/nav|menu|link/i.test(context)) {
    return 'navigation';
  }
  return 'other';
}

function getPriority(category, fileContext) {
  // High priority: UI components, pages, forms, navigation
  if (fileContext.includes('/ui/') ||
      fileContext.includes('/page.tsx') ||
      category === 'actions' ||
      category === 'navigation') {
    return 'high';
  }

  // Medium priority: messages, content
  if (category === 'messages' || category === 'content') {
    return 'medium';
  }

  // Low priority: other
  return 'low';
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(process.cwd(), filePath);

  // Skip if file already uses translations extensively
  const translationCalls = (content.match(/t\(['"`]/g) || []).length;
  if (translationCalls > 10) {
    console.log(`✓ ${relativePath} (already translated)`);
    return;
  }

  const findings = [];
  const lines = content.split('\n');

  // Scan line by line for better context
  lines.forEach((line, lineIndex) => {
    if (isAlreadyTranslated(line)) return;

    TEXT_PATTERNS.forEach(pattern => {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(line)) !== null) {
        const text = match[1] || match[0];
        const cleanText = text.replace(/^['"`>]|['"`<]$/g, '').trim();

        if (shouldIgnoreString(cleanText)) continue;
        if (cleanText.includes('${') || cleanText.includes('{')) continue;

        const category = categorizeString(cleanText, line);
        const priority = getPriority(category, relativePath);

        findings.push({
          text: cleanText,
          line: lineIndex + 1,
          context: line.trim().substring(0, 100),
          category,
          priority
        });
      }
    });
  });

  if (findings.length > 0) {
    results.withIssues++;
    results.totalStrings += findings.length;
    results.files[relativePath] = findings;

    console.log(`⚠ ${relativePath}: ${findings.length} hardcoded strings`);
  } else {
    console.log(`✓ ${relativePath}`);
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!shouldSkipFile(filePath)) {
        walkDirectory(filePath);
      }
    } else if ((file.endsWith('.tsx') || file.endsWith('.ts')) && !shouldSkipFile(filePath)) {
      results.scanned++;
      scanFile(filePath);
    }
  });
}

function generateSummary() {
  // Count by category
  Object.values(results.files).forEach(findings => {
    findings.forEach(finding => {
      const category = finding.category;
      results.summary.byCategory[category] = (results.summary.byCategory[category] || 0) + 1;

      const priority = finding.priority;
      results.summary.byPriority[priority] = (results.summary.byPriority[priority] || 0) + 1;
    });
  });

  // Generate suggestions
  const topFiles = Object.entries(results.files)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 20)
    .map(([file, findings]) => ({ file, count: findings.length }));

  results.summary.topFiles = topFiles;

  // Priority recommendations
  const highPriority = Object.entries(results.files)
    .filter(([_, findings]) => findings.some(f => f.priority === 'high'))
    .map(([file]) => file);

  results.summary.highPriorityFiles = highPriority;
}

function printReport() {
  console.log('\n' + '='.repeat(80));
  console.log('COMPREHENSIVE i18n AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`\nFiles scanned: ${results.scanned}`);
  console.log(`Files with issues: ${results.withIssues}`);
  console.log(`Total hardcoded strings: ${results.totalStrings}`);
  console.log(`Coverage: ${((1 - results.withIssues / results.scanned) * 100).toFixed(1)}%`);

  console.log('\n📊 BY CATEGORY:');
  Object.entries(results.summary.byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat.padEnd(15)}: ${count}`);
    });

  console.log('\n🎯 BY PRIORITY:');
  Object.entries(results.summary.byPriority)
    .sort((a, b) => b[1] - a[1])
    .forEach(([priority, count]) => {
      const icon = priority === 'high' ? '🔴' : priority === 'medium' ? '🟡' : '🟢';
      console.log(`  ${icon} ${priority.padEnd(10)}: ${count}`);
    });

  console.log('\n🔝 TOP 10 FILES TO FIX:');
  results.summary.topFiles.slice(0, 10).forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.file} (${item.count} strings)`);
  });

  console.log('\n🎯 HIGH PRIORITY FILES (need immediate attention):');
  results.summary.highPriorityFiles.slice(0, 10).forEach((file, i) => {
    const count = results.files[file].length;
    console.log(`  ${i + 1}. ${file} (${count} strings)`);
  });

  console.log(`\n💾 Detailed results saved to: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  console.log('='.repeat(80) + '\n');
}

// Main execution
console.log('🔍 Starting comprehensive i18n audit...\n');

walkDirectory(SRC_DIR);
generateSummary();

// Save detailed results
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

printReport();

// Exit with error code if issues found
process.exit(results.withIssues > 0 ? 1 : 0);
