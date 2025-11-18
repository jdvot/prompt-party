#!/usr/bin/env python3
"""
Translation Audit Script for Prompt Party
Analyzes all translation files and component usage to identify:
- Missing translation keys
- Incomplete translations
- Orphaned keys
- Coverage statistics
"""

import json
import re
import os
from pathlib import Path
from typing import Dict, Set, List, Tuple
from collections import defaultdict

class TranslationAuditor:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.messages_dir = self.project_root / "messages"
        self.src_dir = self.project_root / "src"

        # Load translation files
        self.translations = {}
        self.load_translations()

        # Track usage
        self.used_keys = set()
        self.used_namespaces = set()

    def load_translations(self):
        """Load all translation JSON files"""
        for lang in ['en', 'fr', 'nl']:
            file_path = self.messages_dir / f"{lang}.json"
            if file_path.exists():
                with open(file_path, 'r', encoding='utf-8') as f:
                    self.translations[lang] = json.load(f)
                print(f"✓ Loaded {lang}.json: {self.count_keys(self.translations[lang])} keys")
            else:
                print(f"✗ Missing {lang}.json")
                self.translations[lang] = {}

    def count_keys(self, obj: dict, prefix: str = '') -> int:
        """Recursively count all translation keys"""
        count = 0
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                count += self.count_keys(value, full_key)
            else:
                count += 1
        return count

    def get_all_keys(self, obj: dict, prefix: str = '') -> Set[str]:
        """Get all translation keys as flat set"""
        keys = set()
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                keys.update(self.get_all_keys(value, full_key))
            else:
                keys.add(full_key)
        return keys

    def get_value_by_path(self, obj: dict, path: str) -> any:
        """Get value from nested dict by dot-separated path"""
        keys = path.split('.')
        current = obj
        for key in keys:
            if isinstance(current, dict) and key in current:
                current = current[key]
            else:
                return None
        return current

    def scan_tsx_files(self):
        """Scan all TSX files for translation usage"""
        tsx_files = list(self.src_dir.rglob("*.tsx"))
        print(f"\n🔍 Scanning {len(tsx_files)} TSX files for translation usage...")

        # Patterns to match translation usage
        use_translations_pattern = r"useTranslations\(['\"]([^'\"]+)['\"]\)"
        get_translations_pattern = r"getTranslations\(['\"]([^'\"]+)['\"]\)"
        t_key_pattern = r"t\(['\"]([^'\"]+)['\"]\)"

        files_with_translations = 0

        for tsx_file in tsx_files:
            try:
                content = tsx_file.read_text(encoding='utf-8')

                # Find namespace usage
                namespaces = re.findall(use_translations_pattern, content)
                namespaces.extend(re.findall(get_translations_pattern, content))

                # Find key usage
                keys = re.findall(t_key_pattern, content)

                if namespaces or keys:
                    files_with_translations += 1
                    for ns in namespaces:
                        self.used_namespaces.add(ns)
                    for key in keys:
                        self.used_keys.add(key)

            except Exception as e:
                print(f"⚠ Error reading {tsx_file}: {e}")

        print(f"✓ Found {files_with_translations} files using translations")
        print(f"✓ Found {len(self.used_namespaces)} unique namespaces")
        print(f"✓ Found {len(self.used_keys)} unique translation keys")

    def check_missing_keys(self) -> Dict[str, Set[str]]:
        """Check for keys present in en.json but missing in fr.json or nl.json"""
        en_keys = self.get_all_keys(self.translations['en'])
        fr_keys = self.get_all_keys(self.translations['fr'])
        nl_keys = self.get_all_keys(self.translations['nl'])

        missing = {
            'fr': en_keys - fr_keys,
            'nl': en_keys - nl_keys
        }

        return missing

    def check_untranslated_values(self) -> Dict[str, List[Tuple[str, str]]]:
        """Find values in fr/nl that are identical to English (likely untranslated)"""
        en_keys = self.get_all_keys(self.translations['en'])
        untranslated = {
            'fr': [],
            'nl': []
        }

        for key in en_keys:
            en_value = self.get_value_by_path(self.translations['en'], key)

            # Check French
            fr_value = self.get_value_by_path(self.translations['fr'], key)
            if fr_value == en_value and isinstance(en_value, str) and len(en_value) > 0:
                # Ignore keys that are intentionally the same (like brand names, etc.)
                if not self.is_intentionally_same(en_value):
                    untranslated['fr'].append((key, en_value))

            # Check Dutch
            nl_value = self.get_value_by_path(self.translations['nl'], key)
            if nl_value == en_value and isinstance(en_value, str) and len(en_value) > 0:
                if not self.is_intentionally_same(en_value):
                    untranslated['nl'].append((key, en_value))

        return untranslated

    def is_intentionally_same(self, value: str) -> bool:
        """Check if a value is intentionally the same across languages"""
        # Brand names, proper nouns, numbers, single chars
        intentional_patterns = [
            r'^Claude',
            r'^Anthropic',
            r'^GitHub',
            r'^Google',
            r'^Next\.js',
            r'^Supabase',
            r'^Vercel',
            r'^MCP',
            r'^RAG',
            r'^AI$',
            r'^API$',
            r'^\d+$',
            r'^[A-Z]{2,}$',  # Acronyms
        ]

        for pattern in intentional_patterns:
            if re.search(pattern, value):
                return True
        return False

    def check_orphaned_keys(self) -> Dict[str, Set[str]]:
        """Find keys in translation files that are never used in code"""
        en_keys = self.get_all_keys(self.translations['en'])

        # We need to match used keys with full paths
        # This is approximate - we check if any en key contains the used key
        potentially_orphaned = set()

        for en_key in en_keys:
            # Check if this key is referenced in used_keys
            key_parts = en_key.split('.')
            key_found = False

            # Check namespace usage
            if key_parts[0] in self.used_namespaces:
                # Check if the last part of the key is in used_keys
                if key_parts[-1] in self.used_keys:
                    key_found = True
                # Or if the full key (minus namespace) is used
                elif '.'.join(key_parts[1:]) in self.used_keys:
                    key_found = True

            if not key_found:
                potentially_orphaned.add(en_key)

        return {'orphaned': potentially_orphaned}

    def calculate_coverage(self) -> Dict[str, float]:
        """Calculate translation coverage percentage"""
        en_count = self.count_keys(self.translations['en'])
        fr_count = self.count_keys(self.translations['fr'])
        nl_count = self.count_keys(self.translations['nl'])

        return {
            'en': 100.0,
            'fr': (fr_count / en_count * 100) if en_count > 0 else 0,
            'nl': (nl_count / en_count * 100) if en_count > 0 else 0
        }

    def generate_report(self):
        """Generate comprehensive audit report"""
        print("\n" + "=" * 80)
        print("TRANSLATION AUDIT REPORT")
        print("=" * 80)

        # Key counts
        print("\n📊 TRANSLATION STATISTICS")
        print("-" * 80)
        for lang in ['en', 'fr', 'nl']:
            count = self.count_keys(self.translations[lang])
            print(f"{lang.upper()}: {count:,} keys")

        # Coverage
        print("\n📈 COVERAGE PERCENTAGE")
        print("-" * 80)
        coverage = self.calculate_coverage()
        for lang, percent in coverage.items():
            bar_length = int(percent / 2)
            bar = "█" * bar_length + "░" * (50 - bar_length)
            print(f"{lang.upper()}: {bar} {percent:.1f}%")

        # Missing keys
        print("\n❌ MISSING KEYS")
        print("-" * 80)
        missing = self.check_missing_keys()
        for lang, keys in missing.items():
            print(f"\n{lang.upper()} missing {len(keys)} keys:")
            if len(keys) > 0:
                for key in sorted(list(keys)[:20]):  # Show first 20
                    print(f"  - {key}")
                if len(keys) > 20:
                    print(f"  ... and {len(keys) - 20} more")

        # Untranslated values
        print("\n⚠️  POTENTIALLY UNTRANSLATED VALUES")
        print("-" * 80)
        untranslated = self.check_untranslated_values()
        for lang, items in untranslated.items():
            print(f"\n{lang.upper()} has {len(items)} values identical to English:")
            if len(items) > 0:
                for key, value in items[:15]:  # Show first 15
                    print(f"  - {key}: \"{value}\"")
                if len(items) > 15:
                    print(f"  ... and {len(items) - 15} more")

        # Orphaned keys (potentially unused)
        print("\n🗑️  POTENTIALLY ORPHANED KEYS")
        print("-" * 80)
        orphaned = self.check_orphaned_keys()
        orphaned_keys = orphaned['orphaned']
        print(f"Found {len(orphaned_keys)} keys that may not be used in code")
        print("(Note: This is approximate and may include false positives)")
        if len(orphaned_keys) > 0:
            for key in sorted(list(orphaned_keys)[:10]):
                print(f"  - {key}")
            if len(orphaned_keys) > 10:
                print(f"  ... and {len(orphaned_keys) - 10} more")

        # Action plan
        print("\n✅ ACTION PLAN")
        print("-" * 80)

        total_missing_fr = len(missing['fr'])
        total_missing_nl = len(missing['nl'])
        total_untranslated_fr = len(untranslated['fr'])
        total_untranslated_nl = len(untranslated['nl'])

        print(f"1. Add {total_missing_fr} missing keys to fr.json")
        print(f"2. Add {total_missing_nl} missing keys to nl.json")
        print(f"3. Translate {total_untranslated_fr} French values")
        print(f"4. Translate {total_untranslated_nl} Dutch values")
        print(f"5. Review {len(orphaned_keys)} potentially orphaned keys")

        total_issues = (total_missing_fr + total_missing_nl +
                       total_untranslated_fr + total_untranslated_nl)

        if total_issues == 0:
            print("\n🎉 All translations are complete!")
        else:
            print(f"\n⚡ Total issues to fix: {total_issues}")

        # Save detailed report to file
        self.save_detailed_report(missing, untranslated, orphaned)

    def save_detailed_report(self, missing, untranslated, orphaned):
        """Save detailed report to JSON file"""
        report = {
            'statistics': {
                'en': self.count_keys(self.translations['en']),
                'fr': self.count_keys(self.translations['fr']),
                'nl': self.count_keys(self.translations['nl'])
            },
            'coverage': self.calculate_coverage(),
            'missing_keys': {
                'fr': sorted(list(missing['fr'])),
                'nl': sorted(list(missing['nl']))
            },
            'untranslated_values': {
                'fr': [{'key': k, 'value': v} for k, v in untranslated['fr']],
                'nl': [{'key': k, 'value': v} for k, v in untranslated['nl']]
            },
            'orphaned_keys': sorted(list(orphaned['orphaned'])),
            'namespaces_used': sorted(list(self.used_namespaces)),
            'total_files_scanned': len(list(self.src_dir.rglob("*.tsx")))
        }

        report_path = self.project_root / "translation-audit-report.json"
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"\n💾 Detailed report saved to: {report_path}")

def main():
    project_root = Path(__file__).parent.parent
    auditor = TranslationAuditor(str(project_root))

    print("🚀 Starting Translation Audit...")
    auditor.scan_tsx_files()
    auditor.generate_report()

if __name__ == "__main__":
    main()
