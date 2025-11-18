#!/usr/bin/env python3
"""
Analyze untranslated values and categorize them by priority
"""

import json
import re
from pathlib import Path
from collections import defaultdict

def load_report():
    """Load the audit report"""
    report_path = Path(__file__).parent.parent / "translation-audit-report.json"
    with open(report_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def categorize_untranslated(untranslated_items):
    """Categorize untranslated items by type and priority"""
    categories = {
        'ui_classes': [],      # CSS classes (low priority)
        'numbers': [],         # Numbers and stats (low priority)
        'urls': [],           # URLs (low priority)
        'technical': [],      # Technical terms
        'short_text': [],     # Short text (1-3 words)
        'long_text': [],      # Long text (sentences/paragraphs)
        'mixed': []           # Mixed content
    }

    for item in untranslated_items:
        key = item['key']
        value = item['value']

        # Categorize based on content
        if 'bg-' in value or 'text-' in value or 'border-' in value or 'ring-' in value:
            categories['ui_classes'].append(item)
        elif re.match(r'^[\d\s,+%]+$', value):
            categories['numbers'].append(item)
        elif value.startswith('http') or '://' in value:
            categories['urls'].append(item)
        elif len(value.split()) <= 3 and not any(c in value for c in '.!?'):
            categories['short_text'].append(item)
        elif len(value) > 100 or '\n' in value:
            categories['long_text'].append(item)
        else:
            categories['mixed'].append(item)

    return categories

def analyze_by_namespace(untranslated_items):
    """Group untranslated items by namespace"""
    by_namespace = defaultdict(list)

    for item in untranslated_items:
        key = item['key']
        namespace = key.split('.')[0] if '.' in key else 'root'
        by_namespace[namespace].append(item)

    # Sort by count
    sorted_namespaces = sorted(by_namespace.items(), key=lambda x: len(x[1]), reverse=True)
    return sorted_namespaces

def generate_priority_list(report):
    """Generate prioritized list of translations to fix"""

    print("\n" + "=" * 80)
    print("TRANSLATION PRIORITY ANALYSIS")
    print("=" * 80)

    for lang in ['fr', 'nl']:
        untranslated = report['untranslated_values'][lang]

        print(f"\n{'='*80}")
        print(f"{lang.upper()}: {len(untranslated)} untranslated values")
        print(f"{'='*80}")

        # Categorize
        categories = categorize_untranslated(untranslated)

        print("\n📊 BY CATEGORY:")
        print("-" * 80)
        priority_order = [
            ('long_text', '🔴 High Priority - Long Text', categories['long_text']),
            ('short_text', '🟡 Medium Priority - Short Text', categories['short_text']),
            ('mixed', '🟡 Medium Priority - Mixed Content', categories['mixed']),
            ('technical', '🟢 Low Priority - Technical Terms', categories['technical']),
            ('numbers', '⚪ Very Low - Numbers/Stats', categories['numbers']),
            ('urls', '⚪ Very Low - URLs', categories['urls']),
            ('ui_classes', '⚪ Very Low - CSS Classes', categories['ui_classes'])
        ]

        for cat_key, cat_label, items in priority_order:
            print(f"\n{cat_label}: {len(items)} items")
            if len(items) > 0 and cat_key in ['long_text', 'short_text', 'mixed']:
                for item in items[:5]:
                    print(f"  - {item['key']}")
                    preview = item['value'][:80] + '...' if len(item['value']) > 80 else item['value']
                    print(f"    \"{preview}\"")
                if len(items) > 5:
                    print(f"  ... and {len(items) - 5} more")

        # By namespace
        print("\n\n📦 BY NAMESPACE (Top 10):")
        print("-" * 80)
        by_namespace = analyze_by_namespace(untranslated)

        for i, (namespace, items) in enumerate(by_namespace[:10], 1):
            print(f"{i:2}. {namespace:30} {len(items):4} untranslated")
            # Show a few examples
            for item in items[:2]:
                key_short = item['key'].replace(f"{namespace}.", "")
                print(f"    - {key_short}")

        # Priority recommendations
        print("\n\n✅ RECOMMENDED PRIORITY ORDER:")
        print("-" * 80)

        high_priority = categories['long_text'] + categories['mixed'][:10]
        medium_priority = categories['short_text']

        print(f"1. HIGH PRIORITY ({len(high_priority)} items):")
        print(f"   - Long text content (user-facing messages, descriptions)")
        print(f"   - Mixed content that affects UX")

        print(f"\n2. MEDIUM PRIORITY ({len(medium_priority)} items):")
        print(f"   - Short text (labels, buttons, headings)")
        print(f"   - Navigation items")

        print(f"\n3. LOW PRIORITY ({len(categories['numbers']) + len(categories['urls']) + len(categories['ui_classes'])} items):")
        print(f"   - CSS classes: {len(categories['ui_classes'])}")
        print(f"   - Numbers/stats: {len(categories['numbers'])}")
        print(f"   - URLs: {len(categories['urls'])}")

        # Save to file
        output_file = Path(__file__).parent.parent / f"untranslated_{lang}_prioritized.json"
        output_data = {
            'summary': {
                'total': len(untranslated),
                'high_priority': len(high_priority),
                'medium_priority': len(medium_priority),
                'low_priority': len(categories['numbers']) + len(categories['urls']) + len(categories['ui_classes'])
            },
            'categories': {
                'high_priority': high_priority,
                'medium_priority': medium_priority,
                'low_priority': {
                    'numbers': categories['numbers'],
                    'urls': categories['urls'],
                    'ui_classes': categories['ui_classes']
                }
            },
            'by_namespace': [
                {
                    'namespace': ns,
                    'count': len(items),
                    'items': items
                }
                for ns, items in by_namespace
            ]
        }

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)

        print(f"\n💾 Detailed analysis saved to: {output_file}")

def main():
    report = load_report()
    generate_priority_list(report)

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Total French untranslated: {len(report['untranslated_values']['fr'])}")
    print(f"Total Dutch untranslated: {len(report['untranslated_values']['nl'])}")
    print("\nNext steps:")
    print("1. Review the prioritized lists generated above")
    print("2. Start with HIGH PRIORITY items (long text, user-facing content)")
    print("3. Use AI translation for initial pass, then human review")
    print("4. CSS classes and numbers can be left as-is (they're identical by design)")

if __name__ == "__main__":
    main()
