#!/usr/bin/env python3
"""
Extract all hardcoded English strings from TSX files for i18n
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

# Patterns to find strings
PATTERNS = [
    # Double-quoted strings
    r'"([A-Z][^"]{2,})"',
    # Single-quoted strings
    r"'([A-Z][^']{2,})'",
    # Template literals with text
    r'`([A-Z][^`]{2,})`',
]

# Patterns to exclude (not actual text to translate)
EXCLUDE_PATTERNS = [
    r'^(className|displayName|aria-label|aria-labelledby)$',
    r'^[A-Z][a-z]+[A-Z]',  # CamelCase (likely component names)
    r'^[A-Z_]+$',  # CONSTANT_CASE
    r'^\w+\.\w+',  # imports/exports
    r'^\/.*',  # paths
    r'^http',  # URLs
    r'^\d',  # starts with number
    r'^(UTC|POST|GET|PUT|DELETE|PATCH)$',  # HTTP methods/timezones
    r'^(flex|grid|absolute|relative|fixed|sticky)$',  # CSS values
]

# Directories to scan
SCAN_DIRS = ['src/app', 'src/components']

def should_exclude(text):
    """Check if text should be excluded from translation"""
    if len(text) < 3:
        return True
    for pattern in EXCLUDE_PATTERNS:
        if re.match(pattern, text):
            return True
    return False

def extract_strings_from_file(filepath):
    """Extract translatable strings from a TSX file"""
    strings = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find all strings
        for pattern in PATTERNS:
            matches = re.finditer(pattern, content)
            for match in matches:
                text = match.group(1)
                if not should_exclude(text):
                    # Get line number
                    line_num = content[:match.start()].count('\n') + 1
                    strings.append({
                        'text': text,
                        'line': line_num,
                        'file': str(filepath)
                    })
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

    return strings

def scan_directory(base_path):
    """Scan directory recursively for TSX files"""
    all_strings = defaultdict(list)

    for dir_name in SCAN_DIRS:
        dir_path = Path(base_path) / dir_name
        if not dir_path.exists():
            continue

        for tsx_file in dir_path.rglob('*.tsx'):
            strings = extract_strings_from_file(tsx_file)
            if strings:
                relative_path = str(tsx_file.relative_to(base_path))
                all_strings[relative_path] = strings

    return all_strings

def main():
    base_path = Path(__file__).parent
    print("Scanning for hardcoded strings...")

    all_strings = scan_directory(base_path)

    # Generate report
    total_strings = sum(len(strings) for strings in all_strings.values())
    print(f"\nFound {total_strings} hardcoded strings in {len(all_strings)} files\n")

    # Save detailed report
    report = {
        'summary': {
            'total_files': len(all_strings),
            'total_strings': total_strings
        },
        'files': {}
    }

    for filepath, strings in sorted(all_strings.items()):
        print(f"\n{filepath}: {len(strings)} strings")
        report['files'][filepath] = []

        for item in strings[:10]:  # Show first 10
            print(f"  Line {item['line']}: \"{item['text']}\"")
            report['files'][filepath].append({
                'text': item['text'],
                'line': item['line']
            })

        if len(strings) > 10:
            print(f"  ... and {len(strings) - 10} more")
            for item in strings[10:]:
                report['files'][filepath].append({
                    'text': item['text'],
                    'line': item['line']
                })

    # Save report
    with open(base_path / 'i18n-extraction-report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"\n\nDetailed report saved to: i18n-extraction-report.json")
    print(f"Total: {total_strings} strings across {len(all_strings)} files")

if __name__ == '__main__':
    main()
