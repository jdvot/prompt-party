#!/usr/bin/env python3
"""
Show concrete examples of translations that need work
"""

import json
from pathlib import Path

def load_prioritized(lang):
    """Load prioritized translations"""
    file_path = Path(__file__).parent.parent / f"untranslated_{lang}_prioritized.json"
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def show_examples():
    print("\n" + "=" * 80)
    print("TRANSLATION EXAMPLES - WHAT NEEDS TO BE DONE")
    print("=" * 80)

    for lang_code, lang_name in [('fr', 'FRENCH'), ('nl', 'DUTCH')]:
        data = load_prioritized(lang_code)

        print(f"\n{'=' * 80}")
        print(f"{lang_name} ({lang_code.upper()}) EXAMPLES")
        print(f"{'=' * 80}")

        # High priority examples
        print("\n🔴 HIGH PRIORITY EXAMPLES (Long Text)")
        print("-" * 80)

        high_priority = data['categories']['high_priority']

        for i, item in enumerate(high_priority[:3], 1):
            print(f"\n{i}. Key: {item['key']}")
            print(f"   English: \"{item['value']}\"")
            print(f"   {lang_name.title()}: ❌ NEEDS TRANSLATION")
            print(f"   Priority: Critical (user-facing description)")

        # Medium priority examples
        print("\n\n🟡 MEDIUM PRIORITY EXAMPLES (Short Text)")
        print("-" * 80)

        medium_priority = data['categories']['medium_priority']

        for i, item in enumerate(medium_priority[:10], 1):
            print(f"\n{i}. Key: {item['key']}")
            print(f"   English: \"{item['value']}\"")
            print(f"   {lang_name.title()}: ❌ NEEDS TRANSLATION")

        # Show some by namespace
        print("\n\n📦 EXAMPLES BY NAMESPACE")
        print("-" * 80)

        by_namespace = data['by_namespace']

        for ns_data in by_namespace[:5]:
            namespace = ns_data['namespace']
            items = ns_data['items']

            print(f"\n{namespace.upper()} ({len(items)} items):")
            for item in items[:3]:
                key_short = item['key'].replace(f"{namespace}.", "")
                value_short = item['value'][:60] + '...' if len(item['value']) > 60 else item['value']
                print(f"  - {key_short}")
                print(f"    \"{value_short}\"")

    # Show comparison
    print("\n\n" + "=" * 80)
    print("SIDE-BY-SIDE COMPARISON")
    print("=" * 80)

    fr_data = load_prioritized('fr')
    nl_data = load_prioritized('nl')

    print("\nSame keys needing translation in both languages:\n")

    # Find common keys
    fr_keys = {item['key'] for item in fr_data['categories']['high_priority']}
    nl_keys = {item['key'] for item in nl_data['categories']['high_priority']}
    common_keys = fr_keys & nl_keys

    fr_dict = {item['key']: item['value'] for item in fr_data['categories']['high_priority']}

    for i, key in enumerate(sorted(list(common_keys))[:5], 1):
        value = fr_dict[key]
        print(f"{i}. {key}")
        print(f"   EN: {value}")
        print(f"   FR: ❌ (needs translation)")
        print(f"   NL: ❌ (needs translation)")
        print()

def show_tutorial_examples():
    """Show specific tutorial translation examples"""
    print("\n" + "=" * 80)
    print("TUTORIAL CONTENT EXAMPLES")
    print("=" * 80)
    print("\nThe 'tutorials' namespace has the most untranslated content.")
    print("Here are some critical tutorial items:\n")

    fr_data = load_prioritized('fr')

    tutorial_items = [
        item for ns_data in fr_data['by_namespace']
        if ns_data['namespace'] == 'tutorials'
        for item in ns_data['items']
    ]

    # Show tutorial structure
    tutorial_keys = defaultdict(list)
    for item in tutorial_items[:30]:
        key_parts = item['key'].split('.')
        if len(key_parts) >= 2:
            tutorial_name = key_parts[1]
            tutorial_keys[tutorial_name].append(item)

    print("Tutorials with most untranslated content:\n")
    for tutorial, items in sorted(tutorial_keys.items(), key=lambda x: len(x[1]), reverse=True)[:5]:
        print(f"\n{tutorial.upper()} ({len(items)} untranslated):")
        for item in items[:3]:
            key_short = item['key'].split('.')[-1]
            value_short = item['value'][:70] + '...' if len(item['value']) > 70 else item['value']
            print(f"  - {key_short}: \"{value_short}\"")

def show_quick_wins():
    """Show easy quick-win translations"""
    print("\n" + "=" * 80)
    print("QUICK WINS - Easy Translations to Start With")
    print("=" * 80)

    fr_data = load_prioritized('fr')
    nl_data = load_prioritized('nl')

    quick_wins_fr = [
        item for item in fr_data['categories']['medium_priority']
        if len(item['value']) < 30 and ' ' not in item['value'] or item['value'].count(' ') <= 2
    ]

    quick_wins_nl = [
        item for item in nl_data['categories']['medium_priority']
        if len(item['value']) < 30 and ' ' not in item['value'] or item['value'].count(' ') <= 2
    ]

    print("\nFRENCH - Simple 1-3 word translations:\n")
    for i, item in enumerate(quick_wins_fr[:15], 1):
        print(f"{i:2}. {item['key']:50} → \"{item['value']}\"")

    print("\n\nDUTCH - Simple 1-3 word translations:\n")
    for i, item in enumerate(quick_wins_nl[:15], 1):
        print(f"{i:2}. {item['key']:50} → \"{item['value']}\"")

from collections import defaultdict

def main():
    show_examples()
    show_tutorial_examples()
    show_quick_wins()

    print("\n" + "=" * 80)
    print("HOW TO PROCEED")
    print("=" * 80)
    print("""
1. START WITH QUICK WINS
   - Translate simple 1-3 word items first
   - Build momentum and establish terminology
   - ~30 minutes per language

2. TACKLE HIGH PRIORITY
   - Focus on tutorial descriptions
   - User-facing page content
   - SEO meta descriptions
   - ~2-4 hours per language

3. COMPLETE MEDIUM PRIORITY
   - UI labels and buttons
   - Navigation items
   - Form fields
   - ~1-2 days per language

4. REVIEW AND TEST
   - Test all translations in context
   - Verify terminology consistency
   - Check cultural appropriateness
   - Get native speaker review

5. AUTOMATE FUTURE CHECKS
   - Add pre-commit hooks
   - Set up CI/CD checks
   - Document translation workflow
""")

    print("=" * 80)
    print("READY TO START?")
    print("=" * 80)
    print("\n1. Review the examples above")
    print("2. Open translations_fr_patch.json and translations_nl_patch.json")
    print("3. Replace [TRANSLATE] markers with actual translations")
    print("4. Run: python scripts/apply_translations.py [fr|nl]")
    print("\nFor questions, see TRANSLATION_AUDIT_REPORT.md\n")

if __name__ == "__main__":
    main()
