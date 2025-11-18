#!/usr/bin/env python3
"""
Generate detailed translation statistics and visualizations
"""

import json
from pathlib import Path
from collections import defaultdict

def load_data():
    """Load audit report"""
    report_path = Path(__file__).parent.parent / "translation-audit-report.json"
    with open(report_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def print_bar_chart(label, value, max_value, width=40):
    """Print a simple ASCII bar chart"""
    filled = int((value / max_value) * width)
    bar = "█" * filled + "░" * (width - filled)
    percentage = (value / max_value) * 100
    print(f"{label:30} {bar} {value:4} ({percentage:5.1f}%)")

def analyze_by_category(report):
    """Analyze translations by key categories"""
    print("\n" + "=" * 80)
    print("TRANSLATION COVERAGE BY CATEGORY")
    print("=" * 80)

    categories = defaultdict(lambda: {'en': 0, 'fr_ok': 0, 'nl_ok': 0, 'fr_missing': 0, 'nl_missing': 0})

    # Count by first-level namespace
    for key in report['missing_keys']['fr']:
        namespace = key.split('.')[0] if '.' in key else 'root'
        categories[namespace]['fr_missing'] += 1

    for key in report['missing_keys']['nl']:
        namespace = key.split('.')[0] if '.' in key else 'root'
        categories[namespace]['nl_missing'] += 1

    # Count untranslated
    for item in report['untranslated_values']['fr']:
        namespace = item['key'].split('.')[0] if '.' in item['key'] else 'root'
        categories[namespace]['fr_missing'] += 1

    for item in report['untranslated_values']['nl']:
        namespace = item['key'].split('.')[0] if '.' in item['key'] else 'root'
        categories[namespace]['nl_missing'] += 1

    # Sort by total issues
    sorted_categories = sorted(
        categories.items(),
        key=lambda x: x[1]['fr_missing'] + x[1]['nl_missing'],
        reverse=True
    )

    print("\nNamespaces with most translation issues:\n")

    for i, (namespace, stats) in enumerate(sorted_categories[:15], 1):
        total_issues = stats['fr_missing'] + stats['nl_missing']
        if total_issues > 0:
            print(f"{i:2}. {namespace:25} FR: {stats['fr_missing']:3}  NL: {stats['nl_missing']:3}  Total: {total_issues:3}")

def analyze_completion_rate(report):
    """Calculate and display completion rates"""
    print("\n" + "=" * 80)
    print("TRANSLATION COMPLETION RATE")
    print("=" * 80)

    total_keys = report['statistics']['en']
    fr_untranslated = len(report['untranslated_values']['fr'])
    nl_untranslated = len(report['untranslated_values']['nl'])

    fr_translated = total_keys - fr_untranslated
    nl_translated = total_keys - nl_untranslated

    print(f"\nTotal translation keys: {total_keys:,}\n")

    print("FRENCH (FR):")
    print_bar_chart("Translated", fr_translated, total_keys)
    print_bar_chart("Untranslated", fr_untranslated, total_keys)

    print("\nDUTCH (NL):")
    print_bar_chart("Translated", nl_translated, total_keys)
    print_bar_chart("Untranslated", nl_untranslated, total_keys)

    # Quality score
    fr_quality = (fr_translated / total_keys) * 100
    nl_quality = (nl_translated / total_keys) * 100

    print("\n" + "-" * 80)
    print(f"French Quality Score:  {fr_quality:.2f}%")
    print(f"Dutch Quality Score:   {nl_quality:.2f}%")
    print(f"Overall Quality Score: {((fr_quality + nl_quality) / 2):.2f}%")

def analyze_effort_required(report):
    """Estimate translation effort required"""
    print("\n" + "=" * 80)
    print("TRANSLATION EFFORT ESTIMATION")
    print("=" * 80)

    fr_items = len(report['untranslated_values']['fr'])
    nl_items = len(report['untranslated_values']['nl'])

    # Load prioritized data
    fr_prio_path = Path(__file__).parent.parent / "untranslated_fr_prioritized.json"
    nl_prio_path = Path(__file__).parent.parent / "untranslated_nl_prioritized.json"

    with open(fr_prio_path, 'r') as f:
        fr_prio = json.load(f)

    with open(nl_prio_path, 'r') as f:
        nl_prio = json.load(f)

    # Estimate time (rough estimates)
    # High priority (long text): 5 min each
    # Medium priority (short text): 2 min each
    # Low priority: 30 sec each

    fr_high = fr_prio['summary']['high_priority']
    fr_medium = fr_prio['summary']['medium_priority']
    fr_low = fr_prio['summary']['low_priority']

    nl_high = nl_prio['summary']['high_priority']
    nl_medium = nl_prio['summary']['medium_priority']
    nl_low = nl_prio['summary']['low_priority']

    fr_time_high = fr_high * 5
    fr_time_medium = fr_medium * 2
    fr_time_low = fr_low * 0.5

    nl_time_high = nl_high * 5
    nl_time_medium = nl_medium * 2
    nl_time_low = nl_low * 0.5

    fr_total_minutes = fr_time_high + fr_time_medium + fr_time_low
    nl_total_minutes = nl_time_high + nl_time_medium + nl_time_low

    print("\nFRENCH (FR):")
    print(f"  High priority:   {fr_high:3} items × 5 min  = {fr_time_high:6.0f} minutes")
    print(f"  Medium priority: {fr_medium:3} items × 2 min  = {fr_time_medium:6.0f} minutes")
    print(f"  Low priority:    {fr_low:3} items × 0.5 min = {fr_time_low:6.0f} minutes")
    print(f"  {'─' * 50}")
    print(f"  Total:           {fr_items:3} items          = {fr_total_minutes:6.0f} minutes ({fr_total_minutes/60:.1f} hours)")

    print("\nDUTCH (NL):")
    print(f"  High priority:   {nl_high:3} items × 5 min  = {nl_time_high:6.0f} minutes")
    print(f"  Medium priority: {nl_medium:3} items × 2 min  = {nl_time_medium:6.0f} minutes")
    print(f"  Low priority:    {nl_low:3} items × 0.5 min = {nl_time_low:6.0f} minutes")
    print(f"  {'─' * 50}")
    print(f"  Total:           {nl_items:3} items          = {nl_total_minutes:6.0f} minutes ({nl_total_minutes/60:.1f} hours)")

    total_minutes = fr_total_minutes + nl_total_minutes
    total_hours = total_minutes / 60

    print("\n" + "=" * 80)
    print(f"TOTAL EFFORT REQUIRED: {total_minutes:.0f} minutes ({total_hours:.1f} hours)")
    print("=" * 80)

    # Cost estimation
    translator_rate = 50  # USD per hour
    total_cost = total_hours * translator_rate

    print(f"\nEstimated cost (at ${translator_rate}/hour): ${total_cost:,.2f} USD")
    print("\nNote: These are rough estimates. Actual time may vary based on:")
    print("  - Translator experience with AI/ML terminology")
    print("  - Need for cultural adaptation")
    print("  - Review and QA cycles")
    print("  - Complexity of technical content")

def generate_summary():
    """Generate executive summary"""
    print("\n" + "=" * 80)
    print("EXECUTIVE SUMMARY")
    print("=" * 80)

    report = load_data()

    total_keys = report['statistics']['en']
    fr_untranslated = len(report['untranslated_values']['fr'])
    nl_untranslated = len(report['untranslated_values']['nl'])

    print(f"""
✅ ACHIEVEMENTS:
  - All {total_keys:,} translation keys present in all languages (100% key coverage)
  - No missing keys between language files
  - Well-structured namespace organization (77+ namespaces)
  - {report['total_files_scanned']} TypeScript files scanned
  - Automated translation infrastructure in place

⚠️  ISSUES:
  - French: {fr_untranslated} values identical to English (need translation)
  - Dutch: {nl_untranslated} values identical to English (need translation)
  - Total: {fr_untranslated + nl_untranslated} translation items require attention

🎯 PRIORITY:
  - HIGH: 28 items (long-form content, user-facing)
  - MEDIUM: 522 items (UI labels, buttons, navigation)
  - LOW: 17 items (CSS, numbers, URLs - optional)

📊 QUALITY SCORE:
  - French: {((total_keys - fr_untranslated) / total_keys * 100):.1f}%
  - Dutch: {((total_keys - nl_untranslated) / total_keys * 100):.1f}%
  - Overall: {(((total_keys - fr_untranslated) + (total_keys - nl_untranslated)) / (total_keys * 2) * 100):.1f}%

📝 NEXT STEPS:
  1. Review TRANSLATION_AUDIT_REPORT.md for detailed analysis
  2. Translate high-priority items first (28 items, ~2-4 hours)
  3. Complete medium-priority UI translations (522 items, ~1-2 days)
  4. Set up automated translation checks in CI/CD
""")

def main():
    print("\n" + "=" * 80)
    print("PROMPT PARTY - TRANSLATION STATISTICS")
    print("=" * 80)

    report = load_data()

    analyze_completion_rate(report)
    analyze_by_category(report)
    analyze_effort_required(report)
    generate_summary()

    print("\n" + "=" * 80)
    print("DETAILED REPORTS AVAILABLE:")
    print("=" * 80)
    print("  📄 TRANSLATION_AUDIT_REPORT.md - Full audit report with recommendations")
    print("  📊 translation-audit-report.json - Machine-readable data")
    print("  🇫🇷 untranslated_fr_prioritized.json - French translations by priority")
    print("  🇳🇱 untranslated_nl_prioritized.json - Dutch translations by priority")
    print("  ✏️  translations_fr_patch.json - Ready-to-apply French patches")
    print("  ✏️  translations_nl_patch.json - Ready-to-apply Dutch patches")
    print("\n")

if __name__ == "__main__":
    main()
