#!/usr/bin/env python3
"""Analyze which tutorial categories are missing translations"""

import json
from collections import defaultdict

# Read the verification report
with open('translation_verification_report.json', 'r') as f:
    report = json.load(f)

missing_fr = report['issues']['missing_translations']['fr']
missing_nl = report['issues']['missing_translations']['nl']

# Group by category (first part of the key before the second dot)
def categorize_keys(keys):
    categories = defaultdict(list)
    for key in keys:
        parts = key.split('.')
        if len(parts) >= 2:
            # tutorials.ai_ethics_responsible.* -> ai_ethics_responsible
            # tutorials.claude_basics.* -> claude_basics
            if parts[0] == 'tutorials' and len(parts) >= 3:
                category = parts[1]
                categories[category].append(key)
            else:
                categories['.'.join(parts[:2])].append(key)
        else:
            categories['other'].append(key)
    return categories

print("="*80)
print("MISSING TRANSLATION CATEGORIES ANALYSIS")
print("="*80)

print("\nFRENCH - Missing by Category:")
fr_categories = categorize_keys(missing_fr)
for category, keys in sorted(fr_categories.items(), key=lambda x: -len(x[1])):
    print(f"\n  {category}: {len(keys)} missing keys")
    if len(keys) <= 5:
        for key in keys:
            print(f"    - {key}")

print("\n" + "="*80)
print("\nDUTCH - Missing by Category:")
nl_categories = categorize_keys(missing_nl)
for category, keys in sorted(nl_categories.items(), key=lambda x: -len(x[1])):
    print(f"\n  {category}: {len(keys)} missing keys")
    if len(keys) <= 5:
        for key in keys:
            print(f"    - {key}")

print("\n" + "="*80)
print("\nEXTRA KEYS ANALYSIS")
print("="*80)

extra_fr = report['issues']['extra_keys']['fr']
extra_nl = report['issues']['extra_keys']['nl']

print(f"\nFrench has {len(extra_fr)} extra keys not in English:")
for key in extra_fr:
    print(f"  - {key}")

print(f"\nDutch has {len(extra_nl)} extra keys not in English:")
for key in extra_nl:
    print(f"  - {key}")

print("\n" + "="*80)
print("TUTORIAL CATEGORIES STATUS")
print("="*80)

# Identify all tutorial categories
all_categories = set(fr_categories.keys()) | set(nl_categories.keys())
tutorial_categories = [cat for cat in all_categories if cat not in ['tutorials.index', 'other']]

print(f"\nTotal tutorial categories found: {len(tutorial_categories)}")
print(f"\nCategories with missing translations:")
for category in sorted(tutorial_categories):
    fr_count = len(fr_categories.get(category, []))
    nl_count = len(nl_categories.get(category, []))
    if fr_count > 0 or nl_count > 0:
        print(f"  - {category}: FR={fr_count}, NL={nl_count}")
