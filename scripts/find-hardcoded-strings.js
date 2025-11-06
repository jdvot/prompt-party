#!/usr/bin/env node

/**
 * Script to find all hardcoded strings in TSX/TS files
 * This helps identify text that needs i18n translation
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const results = [];

// Patterns to detect hardcoded strings
const patterns = [
  // JSX text content with common words
  />([A-Z][a-zA-Z\s]{3,})</,
  // String literals in JSX attributes
  /placeholder="([^{"][^"]+)"/,
  /title="([^{"][^"]+)"/,
  /alt="([^{"][^"]+)"/,
  /aria-label="([^{"][^"]+)"/,
  /label="([^{"][^"]+)"/,
  // Button and link text patterns
  /<[Bb]utton[^>]*>([A-Z][a-zA-Z\s]+)</,
  /<Link[^>]*>([A-Z][a-zA-Z\s]+)</,
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(process.cwd(), filePath);
  const findings = [];

  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip import statements
    if (line.trim().startsWith('import ')) return;
    // Skip type definitions
    if (line.includes('type ') || line.includes('interface ')) return;
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;

    // Check for string literals that look like user-facing text
    const stringMatches = line.match(/"([A-Z][a-zA-Z\s,'!?.]{5,})"/g);
    if (stringMatches) {
      stringMatches.forEach(match => {
        // Skip if it's already using translation
        if (!line.includes('t(') && !line.includes('useTranslations')) {
          findings.push({
            line: index + 1,
            text: match.substring(1, match.length - 1),
            context: line.trim()
          });
        }
      });
    }
  });

  if (findings.length > 0) {
    results.push({
      file: relativePath,
      count: findings.length,
      findings
    });
  }
}

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(entry.name)) {
        scanDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      // Only process .tsx and .ts files
      if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        scanFile(fullPath);
      }
    }
  }
}

console.log('Scanning for hardcoded strings...\n');
scanDirectory(srcDir);

// Sort results by count (descending)
results.sort((a, b) => b.count - a.count);

// Output results
console.log(`Found ${results.length} files with potential hardcoded strings:\n`);

results.forEach(result => {
  console.log(`${result.file} (${result.count} strings)`);
  result.findings.slice(0, 3).forEach(finding => {
    console.log(`  Line ${finding.line}: "${finding.text}"`);
  });
  if (result.findings.length > 3) {
    console.log(`  ... and ${result.findings.length - 3} more\n`);
  } else {
    console.log('');
  }
});

console.log(`\nTotal: ${results.reduce((sum, r) => sum + r.count, 0)} hardcoded strings in ${results.length} files`);
