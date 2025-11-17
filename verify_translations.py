#!/usr/bin/env python3
"""
Comprehensive Translation Verification Script for Prompt Party
Analyzes en.json, fr.json, and nl.json translation files
"""

import json
import sys
from pathlib import Path
from typing import Dict, Set, List, Tuple, Any
from collections import defaultdict

class TranslationVerifier:
    def __init__(self, messages_dir: Path):
        self.messages_dir = messages_dir
        self.languages = ['en', 'fr', 'nl']
        self.translations = {}
        self.errors = []

    def load_translations(self) -> bool:
        """Load all translation files"""
        print("Loading translation files...")
        for lang in self.languages:
            file_path = self.messages_dir / f"{lang}.json"
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    self.translations[lang] = json.load(f)
                print(f"✓ Loaded {lang}.json ({len(json.dumps(self.translations[lang]))} bytes)")
            except json.JSONDecodeError as e:
                self.errors.append(f"JSON syntax error in {lang}.json: {e}")
                print(f"✗ Failed to load {lang}.json: {e}")
                return False
            except FileNotFoundError:
                self.errors.append(f"File not found: {file_path}")
                print(f"✗ File not found: {file_path}")
                return False
        return True

    def flatten_dict(self, d: Dict, parent_key: str = '', sep: str = '.') -> Dict[str, Any]:
        """Flatten nested dictionary with dot notation keys"""
        items = []
        for k, v in d.items():
            new_key = f"{parent_key}{sep}{k}" if parent_key else k
            if isinstance(v, dict):
                items.extend(self.flatten_dict(v, new_key, sep=sep).items())
            else:
                items.append((new_key, v))
        return dict(items)

    def get_all_keys(self, lang: str) -> Set[str]:
        """Get all keys from a language translation file"""
        flat = self.flatten_dict(self.translations[lang])
        return set(flat.keys())

    def get_empty_keys(self, lang: str) -> List[str]:
        """Find keys with empty or null values"""
        flat = self.flatten_dict(self.translations[lang])
        empty = []
        for key, value in flat.items():
            if value is None or value == "" or (isinstance(value, str) and value.strip() == ""):
                empty.append(key)
        return empty

    def compare_translations(self) -> Dict:
        """Compare all translation files and identify issues"""
        print("\n" + "="*80)
        print("COMPREHENSIVE TRANSLATION VERIFICATION REPORT")
        print("="*80)

        # Get all keys for each language
        all_keys = {lang: self.get_all_keys(lang) for lang in self.languages}
        en_keys = all_keys['en']
        fr_keys = all_keys['fr']
        nl_keys = all_keys['nl']

        # Calculate statistics
        stats = {
            'en': {'total': len(en_keys), 'empty': len(self.get_empty_keys('en'))},
            'fr': {'total': len(fr_keys), 'empty': len(self.get_empty_keys('fr'))},
            'nl': {'total': len(nl_keys), 'empty': len(self.get_empty_keys('nl'))},
        }

        # Find missing keys (keys in EN but not in other languages)
        missing_in_fr = sorted(en_keys - fr_keys)
        missing_in_nl = sorted(en_keys - nl_keys)

        # Find extra keys (keys in other languages but not in EN)
        extra_in_fr = sorted(fr_keys - en_keys)
        extra_in_nl = sorted(nl_keys - en_keys)

        # Find empty values
        empty_in_en = sorted(self.get_empty_keys('en'))
        empty_in_fr = sorted(self.get_empty_keys('fr'))
        empty_in_nl = sorted(self.get_empty_keys('nl'))

        # Calculate coverage
        fr_coverage = ((len(fr_keys) - len(missing_in_fr)) / len(en_keys) * 100) if en_keys else 0
        nl_coverage = ((len(nl_keys) - len(missing_in_nl)) / len(en_keys) * 100) if en_keys else 0

        results = {
            'stats': stats,
            'coverage': {
                'en': 100.0,
                'fr': fr_coverage,
                'nl': nl_coverage
            },
            'missing': {
                'fr': missing_in_fr,
                'nl': missing_in_nl
            },
            'extra': {
                'fr': extra_in_fr,
                'nl': extra_in_nl
            },
            'empty': {
                'en': empty_in_en,
                'fr': empty_in_fr,
                'nl': empty_in_nl
            }
        }

        self.print_report(results)
        return results

    def print_report(self, results: Dict):
        """Print comprehensive report"""

        print("\n" + "-"*80)
        print("1. TRANSLATION STATISTICS")
        print("-"*80)
        for lang in self.languages:
            total = results['stats'][lang]['total']
            empty = results['stats'][lang]['empty']
            coverage = results['coverage'][lang]
            print(f"\n{lang.upper()}:")
            print(f"  Total Keys: {total}")
            print(f"  Empty Values: {empty}")
            print(f"  Coverage: {coverage:.2f}%")

        print("\n" + "-"*80)
        print("2. MISSING TRANSLATIONS (Keys in English but missing in other languages)")
        print("-"*80)

        for lang in ['fr', 'nl']:
            missing = results['missing'][lang]
            print(f"\n{lang.upper()} - Missing {len(missing)} keys:")
            if missing:
                for i, key in enumerate(missing[:20], 1):
                    print(f"  {i}. {key}")
                if len(missing) > 20:
                    print(f"  ... and {len(missing) - 20} more")
            else:
                print("  ✓ No missing keys!")

        print("\n" + "-"*80)
        print("3. EXTRA TRANSLATIONS (Keys in other languages but NOT in English)")
        print("-"*80)

        for lang in ['fr', 'nl']:
            extra = results['extra'][lang]
            print(f"\n{lang.upper()} - Extra {len(extra)} keys:")
            if extra:
                for i, key in enumerate(extra[:20], 1):
                    print(f"  {i}. {key}")
                if len(extra) > 20:
                    print(f"  ... and {len(extra) - 20} more")
            else:
                print("  ✓ No extra keys!")

        print("\n" + "-"*80)
        print("4. EMPTY OR NULL VALUES")
        print("-"*80)

        for lang in self.languages:
            empty = results['empty'][lang]
            print(f"\n{lang.upper()} - {len(empty)} empty values:")
            if empty:
                for i, key in enumerate(empty[:20], 1):
                    print(f"  {i}. {key}")
                if len(empty) > 20:
                    print(f"  ... and {len(empty) - 20} more")
            else:
                print("  ✓ No empty values!")

        print("\n" + "-"*80)
        print("5. PRIORITY FIXES NEEDED")
        print("-"*80)

        priority_issues = []

        # Critical: Missing translations
        if results['missing']['fr']:
            priority_issues.append(f"HIGH: {len(results['missing']['fr'])} missing French translations")
        if results['missing']['nl']:
            priority_issues.append(f"HIGH: {len(results['missing']['nl'])} missing Dutch translations")

        # Medium: Empty values
        if results['empty']['en']:
            priority_issues.append(f"MEDIUM: {len(results['empty']['en'])} empty English values")
        if results['empty']['fr']:
            priority_issues.append(f"MEDIUM: {len(results['empty']['fr'])} empty French values")
        if results['empty']['nl']:
            priority_issues.append(f"MEDIUM: {len(results['empty']['nl'])} empty Dutch values")

        # Low: Extra keys
        if results['extra']['fr']:
            priority_issues.append(f"LOW: {len(results['extra']['fr'])} extra French keys (not in English)")
        if results['extra']['nl']:
            priority_issues.append(f"LOW: {len(results['extra']['nl'])} extra Dutch keys (not in English)")

        if priority_issues:
            for issue in priority_issues:
                print(f"\n  • {issue}")
        else:
            print("\n  ✓ No critical issues found!")

        print("\n" + "-"*80)
        print("6. RECOMMENDATIONS")
        print("-"*80)

        print("\n1. Missing Keys:")
        print("   - Add missing translations for French and Dutch")
        print("   - Use English values as placeholders if needed")
        print("   - Mark untranslated strings with [EN] prefix for easy identification")

        print("\n2. Empty Values:")
        print("   - Review and populate all empty translation values")
        print("   - Verify these aren't intentionally empty")

        print("\n3. Extra Keys:")
        print("   - Verify if extra keys are actually used in the codebase")
        print("   - Remove unused keys to maintain consistency")
        print("   - Or add missing keys to English if they should exist")

        print("\n4. Consistency:")
        print("   - Run automated tests to verify translation keys match code usage")
        print("   - Use TypeScript types for translation keys to catch errors at compile time")

        print("\n" + "="*80)
        print("END OF REPORT")
        print("="*80 + "\n")

    def save_detailed_report(self, results: Dict, output_file: Path):
        """Save detailed JSON report"""
        from datetime import datetime
        report = {
            'timestamp': datetime.now().isoformat(),
            'summary': {
                'total_languages': len(self.languages),
                'statistics': results['stats'],
                'coverage': results['coverage']
            },
            'issues': {
                'missing_translations': {
                    'fr': results['missing']['fr'],
                    'nl': results['missing']['nl']
                },
                'extra_keys': {
                    'fr': results['extra']['fr'],
                    'nl': results['extra']['nl']
                },
                'empty_values': {
                    'en': results['empty']['en'],
                    'fr': results['empty']['fr'],
                    'nl': results['empty']['nl']
                }
            },
            'errors': self.errors
        }

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"\n✓ Detailed report saved to: {output_file}")

def main():
    script_dir = Path(__file__).parent
    messages_dir = script_dir / 'messages'

    if not messages_dir.exists():
        print(f"Error: messages directory not found at {messages_dir}")
        sys.exit(1)

    verifier = TranslationVerifier(messages_dir)

    if not verifier.load_translations():
        print("\n✗ Failed to load translation files. Please fix JSON syntax errors.")
        sys.exit(1)

    results = verifier.compare_translations()

    # Save detailed report
    output_file = script_dir / 'translation_verification_report.json'
    verifier.save_detailed_report(results, output_file)

    # Exit with error code if there are issues
    has_issues = (
        len(results['missing']['fr']) > 0 or
        len(results['missing']['nl']) > 0 or
        len(results['empty']['en']) > 0 or
        len(results['empty']['fr']) > 0 or
        len(results['empty']['nl']) > 0
    )

    if has_issues:
        print("\n⚠ Translation issues detected. Please review the report above.")
        sys.exit(1)
    else:
        print("\n✓ All translations verified successfully!")
        sys.exit(0)

if __name__ == '__main__':
    main()
