#!/usr/bin/env python3
"""
Translation Files Integrity Analysis Script
Analyzes i18n translation files for Prompt Party
"""

import json
import sys
from pathlib import Path
from typing import Dict, Set, List, Tuple
from collections import defaultdict

class TranslationAnalyzer:
    def __init__(self, messages_dir: str):
        self.messages_dir = Path(messages_dir)
        self.translations = {}
        self.issues = defaultdict(list)

    def load_translations(self) -> Dict[str, dict]:
        """Load all translation JSON files"""
        json_files = list(self.messages_dir.glob("*.json"))
        # Filter out backup files
        json_files = [f for f in json_files if not f.name.endswith(('.backup', '.bak'))]

        print(f"Found {len(json_files)} translation files:")
        for file in json_files:
            lang = file.stem
            print(f"  - {file.name} ({file.stat().st_size / 1024:.1f} KB)")
            try:
                with open(file, 'r', encoding='utf-8') as f:
                    self.translations[lang] = json.load(f)
            except json.JSONDecodeError as e:
                self.issues['json_errors'].append({
                    'file': file.name,
                    'error': str(e)
                })
                print(f"    ❌ JSON Error: {e}")
            except Exception as e:
                self.issues['file_errors'].append({
                    'file': file.name,
                    'error': str(e)
                })
                print(f"    ❌ Error: {e}")

        return self.translations

    def get_all_keys(self, obj: dict, prefix: str = "") -> Set[str]:
        """Recursively get all keys from nested dict"""
        keys = set()
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            keys.add(full_key)
            if isinstance(value, dict):
                keys.update(self.get_all_keys(value, full_key))
        return keys

    def get_value_at_path(self, obj: dict, path: str):
        """Get value at a dot-separated path"""
        parts = path.split('.')
        current = obj
        for part in parts:
            if isinstance(current, dict) and part in current:
                current = current[part]
            else:
                return None
        return current

    def check_empty_values(self, obj: dict, prefix: str = "", lang: str = "") -> List[str]:
        """Find empty or whitespace-only values"""
        empty_keys = []
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                empty_keys.extend(self.check_empty_values(value, full_key, lang))
            elif isinstance(value, str):
                if not value or value.strip() == "":
                    empty_keys.append(full_key)
        return empty_keys

    def analyze(self):
        """Perform comprehensive analysis"""
        if not self.translations:
            print("\n❌ No translations loaded!")
            return

        print("\n" + "="*80)
        print("TRANSLATION INTEGRITY ANALYSIS REPORT")
        print("="*80)

        # Get all unique keys from all languages
        all_keys_by_lang = {}
        for lang, data in self.translations.items():
            all_keys_by_lang[lang] = self.get_all_keys(data)

        # Find union of all keys
        all_keys = set()
        for keys in all_keys_by_lang.values():
            all_keys.update(keys)

        print(f"\n📊 STATISTICS")
        print("-" * 80)
        for lang, keys in all_keys_by_lang.items():
            print(f"  {lang}: {len(keys)} keys")
        print(f"  Total unique keys across all languages: {len(all_keys)}")

        # Check for missing keys
        print(f"\n🔍 MISSING KEYS ANALYSIS")
        print("-" * 80)
        has_missing = False
        for lang, keys in all_keys_by_lang.items():
            missing = all_keys - keys
            if missing:
                has_missing = True
                print(f"\n  ❌ {lang}.json is missing {len(missing)} keys:")
                for key in sorted(list(missing)[:20]):  # Show first 20
                    print(f"     - {key}")
                if len(missing) > 20:
                    print(f"     ... and {len(missing) - 20} more")
                self.issues['missing_keys'].append({
                    'lang': lang,
                    'count': len(missing),
                    'keys': list(missing)
                })

        if not has_missing:
            print("  ✅ No missing keys found - all languages have the same keys!")

        # Check for extra keys
        print(f"\n🔍 EXTRA KEYS ANALYSIS")
        print("-" * 80)
        has_extra = False

        # Find the language with the most keys (likely the reference)
        reference_lang = max(all_keys_by_lang, key=lambda k: len(all_keys_by_lang[k]))
        reference_keys = all_keys_by_lang[reference_lang]

        for lang, keys in all_keys_by_lang.items():
            if lang == reference_lang:
                continue
            extra = keys - reference_keys
            if extra:
                has_extra = True
                print(f"\n  ⚠️  {lang}.json has {len(extra)} extra keys not in {reference_lang}.json:")
                for key in sorted(list(extra)[:20]):
                    print(f"     - {key}")
                if len(extra) > 20:
                    print(f"     ... and {len(extra) - 20} more")
                self.issues['extra_keys'].append({
                    'lang': lang,
                    'count': len(extra),
                    'keys': list(extra)
                })

        if not has_extra:
            print(f"  ✅ No extra keys found - all languages align with {reference_lang}.json")

        # Check for empty values
        print(f"\n🔍 EMPTY VALUES ANALYSIS")
        print("-" * 80)
        has_empty = False
        for lang, data in self.translations.items():
            empty_keys = self.check_empty_values(data, lang=lang)
            if empty_keys:
                has_empty = True
                print(f"\n  ⚠️  {lang}.json has {len(empty_keys)} empty values:")
                for key in empty_keys[:20]:
                    print(f"     - {key}")
                if len(empty_keys) > 20:
                    print(f"     ... and {len(empty_keys) - 20} more")
                self.issues['empty_values'].append({
                    'lang': lang,
                    'count': len(empty_keys),
                    'keys': empty_keys
                })

        if not has_empty:
            print("  ✅ No empty values found!")

        # Check for inconsistent value types
        print(f"\n🔍 VALUE TYPE CONSISTENCY ANALYSIS")
        print("-" * 80)
        has_inconsistent = False
        for key in sorted(all_keys):
            types_by_lang = {}
            for lang in self.translations:
                value = self.get_value_at_path(self.translations[lang], key)
                if value is not None:
                    types_by_lang[lang] = type(value).__name__

            # Check if all types are the same
            unique_types = set(types_by_lang.values())
            if len(unique_types) > 1:
                has_inconsistent = True
                print(f"\n  ⚠️  Key '{key}' has inconsistent types:")
                for lang, type_name in types_by_lang.items():
                    print(f"     - {lang}: {type_name}")
                self.issues['type_inconsistencies'].append({
                    'key': key,
                    'types': types_by_lang
                })

        if not has_inconsistent:
            print("  ✅ All keys have consistent value types across languages!")

        # Summary
        print(f"\n📋 SUMMARY")
        print("-" * 80)
        total_issues = sum(len(v) if isinstance(v, list) else 0 for v in self.issues.values())
        if total_issues == 0:
            print("  ✅ No issues found! All translation files are consistent and complete.")
        else:
            print(f"  ⚠️  Found {total_issues} issue(s) across all categories:")
            for category, items in self.issues.items():
                if items:
                    print(f"     - {category}: {len(items)} issue(s)")

        return self.issues

    def export_report(self, output_file: str = "translation_report.json"):
        """Export detailed report as JSON"""
        report = {
            'summary': {
                'languages': list(self.translations.keys()),
                'total_issues': sum(len(v) if isinstance(v, list) else 0 for v in self.issues.values())
            },
            'statistics': {
                lang: len(self.get_all_keys(data))
                for lang, data in self.translations.items()
            },
            'issues': dict(self.issues)
        }

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"\n📄 Detailed report exported to: {output_file}")

def main():
    messages_dir = sys.argv[1] if len(sys.argv) > 1 else "./messages"

    analyzer = TranslationAnalyzer(messages_dir)
    analyzer.load_translations()
    analyzer.analyze()
    analyzer.export_report()

if __name__ == "__main__":
    main()
