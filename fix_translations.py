#!/usr/bin/env python3
"""
Automatically fix missing translation keys in Prompt Party application.
This script:
1. Identifies missing keys in FR/NL by comparing with EN
2. Adds missing keys with [AUTO-TRANSLATED] marker
3. Removes orphaned keys that don't exist in EN
4. Validates JSON integrity
"""

import json
import sys
from pathlib import Path
from typing import Dict, List, Tuple, Set

def load_json(file_path: Path) -> Dict:
    """Load and parse JSON file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(file_path: Path, data: Dict) -> None:
    """Save data as formatted JSON."""
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')  # Add trailing newline

def get_all_keys(obj: Dict, prefix: str = '') -> Set[str]:
    """Recursively get all keys from nested dictionary."""
    keys = set()
    for key, value in obj.items():
        full_key = f"{prefix}.{key}" if prefix else key
        keys.add(full_key)
        if isinstance(value, dict):
            keys.update(get_all_keys(value, full_key))
    return keys

def get_value_by_path(obj: Dict, path: str):
    """Get value from nested dict using dot notation path."""
    keys = path.split('.')
    value = obj
    for key in keys:
        if isinstance(value, dict) and key in value:
            value = value[key]
        else:
            return None
    return value

def set_value_by_path(obj: Dict, path: str, value) -> None:
    """Set value in nested dict using dot notation path."""
    keys = path.split('.')
    target = obj
    for key in keys[:-1]:
        if key not in target:
            target[key] = {}
        target = target[key]
    target[keys[-1]] = value

def delete_key_by_path(obj: Dict, path: str) -> bool:
    """Delete key from nested dict using dot notation path."""
    keys = path.split('.')
    target = obj
    for key in keys[:-1]:
        if key not in target:
            return False
        target = target[key]
    if keys[-1] in target:
        del target[keys[-1]]
        return True
    return False

def fix_translations(en_file: Path, target_file: Path, lang: str) -> Tuple[int, int]:
    """
    Fix translations by adding missing keys and removing orphaned ones.
    Returns: (keys_added, keys_removed)
    """
    print(f"\n{'='*60}")
    print(f"Processing {lang.upper()} translations...")
    print(f"{'='*60}")

    # Load files
    en_data = load_json(en_file)
    target_data = load_json(target_file)

    # Get all keys
    en_keys = get_all_keys(en_data)
    target_keys = get_all_keys(target_data)

    print(f"\nEnglish keys: {len(en_keys)}")
    print(f"{lang.upper()} keys: {len(target_keys)}")

    # Find missing and orphaned keys
    missing_keys = en_keys - target_keys
    orphaned_keys = target_keys - en_keys

    print(f"\nMissing keys in {lang.upper()}: {len(missing_keys)}")
    print(f"Orphaned keys in {lang.upper()}: {len(orphaned_keys)}")

    # Add missing keys with [AUTO-TRANSLATED] marker
    keys_added = 0
    if missing_keys:
        print(f"\nAdding {len(missing_keys)} missing keys...")
        for i, key in enumerate(sorted(missing_keys), 1):
            en_value = get_value_by_path(en_data, key)
            if en_value is not None and isinstance(en_value, str):
                auto_value = f"{en_value} [AUTO-TRANSLATED]"
                set_value_by_path(target_data, key, auto_value)
                keys_added += 1
                if i <= 5:  # Show first 5 examples
                    print(f"  {i}. {key}: '{en_value}' -> '{auto_value}'")
            elif en_value is not None and isinstance(en_value, dict):
                # For nested objects, just copy the structure
                set_value_by_path(target_data, key, en_value)
                keys_added += 1
        if len(missing_keys) > 5:
            print(f"  ... and {len(missing_keys) - 5} more")

    # Remove orphaned keys
    keys_removed = 0
    if orphaned_keys:
        print(f"\nRemoving {len(orphaned_keys)} orphaned keys...")
        for i, key in enumerate(sorted(orphaned_keys), 1):
            if delete_key_by_path(target_data, key):
                keys_removed += 1
                if i <= 5:  # Show first 5 examples
                    print(f"  {i}. {key}")
        if len(orphaned_keys) > 5:
            print(f"  ... and {len(orphaned_keys) - 5} more")

    # Save updated file
    print(f"\nSaving updated {lang.upper()} translations...")
    save_json(target_file, target_data)

    # Verify
    print(f"\nVerifying {lang.upper()} translations...")
    updated_data = load_json(target_file)
    updated_keys = get_all_keys(updated_data)
    print(f"  Final key count: {len(updated_keys)}")
    print(f"  Keys match English: {updated_keys == en_keys}")

    return keys_added, keys_removed

def main():
    """Main execution function."""
    base_path = Path('/Users/admin/prompt-party')
    en_file = base_path / 'messages' / 'en.json'
    fr_file = base_path / 'messages' / 'fr.json'
    nl_file = base_path / 'messages' / 'nl.json'

    print("Prompt Party - Automatic Translation Key Fixer")
    print("=" * 60)

    # Verify files exist
    for file in [en_file, fr_file, nl_file]:
        if not file.exists():
            print(f"ERROR: File not found: {file}")
            sys.exit(1)

    # Fix French translations
    fr_added, fr_removed = fix_translations(en_file, fr_file, 'french')

    # Fix Dutch translations
    nl_added, nl_removed = fix_translations(en_file, nl_file, 'dutch')

    # Summary
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    print(f"\nFrench (FR):")
    print(f"  - Keys added: {fr_added}")
    print(f"  - Keys removed: {fr_removed}")
    print(f"\nDutch (NL):")
    print(f"  - Keys added: {nl_added}")
    print(f"  - Keys removed: {nl_removed}")
    print(f"\nTotal changes:")
    print(f"  - Total keys added: {fr_added + nl_added}")
    print(f"  - Total keys removed: {fr_removed + nl_removed}")

    print(f"\n{'='*60}")
    print("All translation files updated successfully!")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
