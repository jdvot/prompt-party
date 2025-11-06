#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Patterns that indicate properly translated code (to SKIP)
const TRANSLATED_PATTERNS = [
  /t\(['"`][\w.]+['"`]\)/g,  // t('key') or t("key")
  /useTranslations\(/g,        // useTranslations()
  /getTranslations\(/g,        // getTranslations()
  /\{t\./g,                    // {t.something}
  /\{translations\./g,         // {translations.something}
];

// Files/directories to skip
const SKIP_PATHS = [
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
  'public',
  'scripts',
  'docs',
  'messages',
  'supabase.ts', // Type definitions
  'colors.ts',   // Design tokens
  'spacing.ts',  // Design tokens
  'animations.ts', // Design tokens
  'design-tokens.ts', // Design tokens
  '.test.ts',    // Test files
  'route.ts',    // API routes (backend messages)
];

function shouldSkipPath(filePath) {
  return SKIP_PATHS.some(skip => filePath.includes(skip));
}

function findHardcodedStrings(content, filePath) {
  const findings = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    // Skip comments
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    // Skip import/export lines
    if (trimmed.startsWith('import ') || trimmed.startsWith('export ')) {
      return;
    }

    // Skip if line contains translation function usage
    if (TRANSLATED_PATTERNS.some(pattern => pattern.test(line))) {
      return;
    }

    // Look for JSX text content (between > and <)
    const jsxTextRegex = />([^<>{}\n]+)</g;
    let match;
    while ((match = jsxTextRegex.exec(line)) !== null) {
      const text = match[1].trim();

      // Skip if it's just whitespace, numbers, or special chars
      if (!text || !/[a-zA-Z]{2,}/.test(text)) continue;

      // Skip if it's clearly a variable or code
      if (text.includes('{') || text.includes('$') || text.includes('()')) continue;

      // This looks like a real hardcoded string!
      if (text.length > 2) {
        findings.push({
          line: lineNum,
          text: text,
          context: trimmed.substring(0, 100),
          type: 'jsx-text'
        });
      }
    }

    // Look for hardcoded strings in common props (title, placeholder, alt, aria-label)
    const propRegex = /(title|placeholder|aria-label|alt)=["']([^"']+)["']/g;
    while ((match = propRegex.exec(line)) !== null) {
      const propName = match[1];
      const text = match[2];

      // Skip if it's a URL, path, or variable
      if (text.includes('/') || text.includes('{') || text.includes('$')) continue;

      // Skip if it's very short (likely not user-facing)
      if (text.length < 3) continue;

      findings.push({
        line: lineNum,
        text: text,
        context: trimmed.substring(0, 100),
        type: `prop-${propName}`
      });
    }
  });

  return findings;
}

function scanDirectory(dir) {
  const results = {
    files: {},
    summary: {
      totalFilesScanned: 0,
      filesWithHardcoded: 0,
      totalHardcodedStrings: 0
    }
  };

  function scan(currentPath) {
    if (shouldSkipPath(currentPath)) return;

    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) && !shouldSkipPath(fullPath)) {
        results.summary.totalFilesScanned++;

        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const findings = findHardcodedStrings(content, fullPath);

          if (findings.length > 0) {
            results.summary.filesWithHardcoded++;
            results.summary.totalHardcodedStrings += findings.length;

            const relativePath = path.relative(process.cwd(), fullPath);
            results.files[relativePath] = findings;
          }
        } catch (error) {
          // Silently skip files that can't be read
        }
      }
    }
  }

  scan(dir);
  return results;
}

function generateReport(results) {
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('           REAL HARDCODED STRINGS DETECTION REPORT');
  console.log('════════════════════════════════════════════════════════════════\n');

  console.log('📊 SUMMARY');
  console.log('────────────────────────────────────────────────────────────────');
  console.log(`Files Scanned:           ${results.summary.totalFilesScanned}`);
  console.log(`Files with Issues:       ${results.summary.filesWithHardcoded}`);
  console.log(`Total Hardcoded Strings: ${results.summary.totalHardcodedStrings}`);
  console.log(`Clean Files:             ${results.summary.totalFilesScanned - results.summary.filesWithHardcoded}\n`);

  if (results.summary.filesWithHardcoded === 0) {
    console.log('✅ No hardcoded strings found! All user-facing text is properly internationalized.\n');
    return;
  }

  console.log('🔍 FILES WITH HARDCODED STRINGS');
  console.log('────────────────────────────────────────────────────────────────\n');

  const sortedFiles = Object.entries(results.files).sort((a, b) => b[1].length - a[1].length);

  sortedFiles.slice(0, 30).forEach(([filePath, findings]) => {
    console.log(`\n📄 ${filePath}`);
    console.log(`   ${findings.length} hardcoded string(s)\n`);

    findings.forEach((finding, index) => {
      console.log(`   ${index + 1}. Line ${finding.line} [${finding.type}]`);
      console.log(`      "${finding.text}"`);
      console.log(`      ${finding.context}...\n`);
    });
  });

  if (sortedFiles.length > 30) {
    console.log(`\n... and ${sortedFiles.length - 30} more files\n`);
  }

  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('                       END OF REPORT');
  console.log('════════════════════════════════════════════════════════════════\n');

  // Write detailed JSON report
  const reportPath = path.join(process.cwd(), 'REAL_HARDCODED_STRINGS.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📁 Full report saved to: ${reportPath}\n`);
}

// Main execution
const srcPath = path.join(process.cwd(), 'src');

console.log('🔍 Scanning for REAL hardcoded user-facing strings...\n');
console.log('(Ignoring design tokens, API routes, and properly translated code)\n');

const results = scanDirectory(srcPath);
generateReport(results);

console.log('💡 Next steps:');
console.log('  1. Add missing translation keys to messages/en.json, fr.json, nl.json');
console.log('  2. Replace hardcoded strings with useTranslations() or getTranslations()');
console.log('  3. Re-run this scan to verify fixes\n');
