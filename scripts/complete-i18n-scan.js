#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Patterns that indicate hardcoded strings (excluding imports, types, etc.)
const HARDCODED_PATTERNS = [
  // JSX text content
  /<[^>]+>([^<{]+)<\/[^>]+>/g,
  // String literals in JSX attributes (title, placeholder, etc.)
  /(title|placeholder|aria-label|alt|label)=["']([^"']+)["']/g,
  // Button/Link text
  /<(button|Button|a|Link)[^>]*>([^<{]+)<\//gi,
  // Direct string assignments
  /const \w+ = ["']([^"']{10,})["']/g,
];

// Patterns to IGNORE (these are not user-facing strings)
const IGNORE_PATTERNS = [
  /^import /,
  /^export /,
  /^\/\//,
  /^\/\*/,
  /className=/,
  /\.tsx?$/,
  /\.css$/,
  /\.json$/,
  /\bkey=/,
  /\bid=/,
  /\bdata-/,
  /\bhref=["']\/[^"']*["']/,
  /\bsrc=["'][^"']*["']/,
  /^[A-Z_]+$/, // Constants
  /^[a-z-]+$/, // kebab-case (likely CSS classes)
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
  'messages', // Skip translation files themselves
];

function shouldSkipPath(filePath) {
  return SKIP_PATHS.some(skip => filePath.includes(skip));
}

function isLikelyHardcodedString(text) {
  if (!text || text.length < 3) return false;
  if (/^[^a-zA-Z]*$/.test(text)) return false; // No letters
  if (/^[A-Z_]+$/.test(text)) return false; // All caps constants
  if (/^[a-z-]+$/.test(text)) return false; // kebab-case
  if (/^[\d.]+$/.test(text)) return false; // Numbers only
  if (text.startsWith('/')) return false; // Paths
  return true;
}

function extractHardcodedStrings(content, filePath) {
  const lines = content.split('\n');
  const findings = [];

  lines.forEach((line, index) => {
    // Skip import/export lines
    if (line.trim().startsWith('import ') || line.trim().startsWith('export ')) {
      return;
    }

    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
      return;
    }

    // Look for JSX text content between tags
    const jsxTextMatch = line.match(/>([^<>{]+)</);
    if (jsxTextMatch && jsxTextMatch[1]) {
      const text = jsxTextMatch[1].trim();
      if (isLikelyHardcodedString(text) && !text.includes('{') && !text.includes('t(')) {
        findings.push({
          line: index + 1,
          text: text,
          context: line.trim(),
          type: 'jsx-text'
        });
      }
    }

    // Look for string literals in quotes (excluding imports, classNames, etc.)
    const stringMatches = line.matchAll(/["']([^"']{5,})["']/g);
    for (const match of stringMatches) {
      const text = match[1];

      // Skip if it's part of className, import, or other non-translatable content
      const before = line.substring(0, match.index);
      if (before.includes('className') ||
          before.includes('import') ||
          before.includes('require') ||
          before.includes('href') ||
          before.includes('src') ||
          text.includes('/') ||
          text.includes('.')) {
        continue;
      }

      if (isLikelyHardcodedString(text)) {
        findings.push({
          line: index + 1,
          text: text,
          context: line.trim(),
          type: 'string-literal'
        });
      }
    }
  });

  return findings;
}

function scanDirectory(dir) {
  const results = {
    files: {},
    summary: {
      totalFiles: 0,
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
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        results.summary.totalFiles++;

        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const findings = extractHardcodedStrings(content, fullPath);

          if (findings.length > 0) {
            results.summary.filesWithHardcoded++;
            results.summary.totalHardcodedStrings += findings.length;

            const relativePath = path.relative(process.cwd(), fullPath);
            results.files[relativePath] = findings;
          }
        } catch (error) {
          console.error(`Error reading ${fullPath}:`, error.message);
        }
      }
    }
  }

  scan(dir);
  return results;
}

function generateReport(results) {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('           COMPLETE I18N HARDCODED STRINGS SCAN');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log('📊 SUMMARY');
  console.log('─────────────────────────────────────────────────────────────');
  console.log(`Total Files Scanned:        ${results.summary.totalFiles}`);
  console.log(`Files with Hardcoded Text:  ${results.summary.filesWithHardcoded}`);
  console.log(`Total Hardcoded Strings:    ${results.summary.totalHardcodedStrings}`);
  console.log(`Clean Files:                ${results.summary.totalFiles - results.summary.filesWithHardcoded}\n`);

  if (results.summary.filesWithHardcoded === 0) {
    console.log('✅ No hardcoded strings found! All files are properly internationalized.\n');
    return;
  }

  console.log('📝 FILES WITH HARDCODED STRINGS');
  console.log('─────────────────────────────────────────────────────────────\n');

  const sortedFiles = Object.entries(results.files).sort((a, b) => b[1].length - a[1].length);

  sortedFiles.forEach(([filePath, findings]) => {
    console.log(`\n📄 ${filePath}`);
    console.log(`   ${findings.length} hardcoded string(s) found\n`);

    findings.slice(0, 5).forEach((finding, index) => {
      console.log(`   ${index + 1}. Line ${finding.line} [${finding.type}]`);
      console.log(`      Text: "${finding.text}"`);
      console.log(`      Context: ${finding.context.substring(0, 80)}${finding.context.length > 80 ? '...' : ''}\n`);
    });

    if (findings.length > 5) {
      console.log(`   ... and ${findings.length - 5} more\n`);
    }
  });

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('                    END OF REPORT');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Write detailed JSON report
  const reportPath = path.join(process.cwd(), 'I18N_SCAN_RESULTS.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📁 Detailed JSON report saved to: ${reportPath}\n`);
}

// Main execution
const srcPath = path.join(process.cwd(), 'src');

console.log('🔍 Scanning for hardcoded strings in src/ directory...\n');
console.log('This may take a moment...\n');

const results = scanDirectory(srcPath);
generateReport(results);
