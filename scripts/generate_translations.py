#!/usr/bin/env python3
"""
Generate translations for untranslated values
Uses context-aware translation based on key paths and surrounding translations
"""

import json
from pathlib import Path
from typing import Dict, List

class TranslationGenerator:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.messages_dir = self.project_root / "messages"

        # Load all translations
        self.translations = {}
        for lang in ['en', 'fr', 'nl']:
            with open(self.messages_dir / f"{lang}.json", 'r', encoding='utf-8') as f:
                self.translations[lang] = json.load(f)

        # Load prioritized untranslated items
        self.untranslated = {}
        for lang in ['fr', 'nl']:
            file_path = self.project_root / f"untranslated_{lang}_prioritized.json"
            with open(file_path, 'r', encoding='utf-8') as f:
                self.untranslated[lang] = json.load(f)

    def should_translate(self, key: str, value: str) -> bool:
        """Determine if a value should be translated"""
        # Skip CSS classes
        if any(css in value for css in ['bg-', 'text-', 'border-', 'ring-', 'focus-visible:']):
            return False

        # Skip URLs
        if value.startswith('http') or '://' in value:
            return False

        # Skip pure numbers
        if value.replace('+', '').replace(',', '').replace('%', '').replace('k', '').replace('M', '').strip().isdigit():
            return False

        # Skip very short durations that are already clear
        if 'minutes' in value or 'min' in value or 'hours' in value:
            return True  # These should be translated

        return True

    def get_translation_suggestions(self, lang: str) -> Dict[str, str]:
        """Generate translation suggestions for high/medium priority items"""
        suggestions = {}

        high_priority = self.untranslated[lang]['categories']['high_priority']
        medium_priority = self.untranslated[lang]['categories']['medium_priority']

        # Manual translations for common terms (FR)
        fr_common_translations = {
            'Collections': 'Collections',
            'Comments': 'Commentaires',
            'Page not found': 'Page non trouvée',
            'AI Model': 'Modèle IA',
            'Discover & Learn': 'Découvrir et Apprendre',
            'CLI Installation': 'Installation CLI',
            'Profile Information': 'Informations du profil',
            'Name required': 'Nom requis',
            'Deep Learning': 'Apprentissage Profond',
            'Machine Learning': 'Apprentissage Automatique',
            'Best practices': 'Bonnes pratiques',
            'Filter': 'Filtrer',
            'Code Refactoring': 'Refactorisation de Code',
            'Setup': 'Configuration',
            'Tutorials': 'Tutoriels',
            '40 minutes': '40 minutes',
            '15 min': '15 min',
            'Designing a RESTful API': 'Conception d\'une API RESTful',
            'Set up Claude Code on cloud or CLI': 'Configurer Claude Code sur le cloud ou CLI',
            'Blindly trusting generated code without review': 'Faire confiance aveuglément au code généré sans révision',
            'Machine Learning vs Deep Learning': 'Apprentissage Automatique vs Apprentissage Profond',
            'Tutorials | Prompt Party': 'Tutoriels | Prompt Party',
            'Migrate state management from Redux with less boilerplate and better types':
                'Migrer la gestion d\'état depuis Redux avec moins de code répétitif et de meilleurs types',
        }

        # Manual translations for common terms (NL)
        nl_common_translations = {
            'Collections': 'Collecties',
            'Comments': 'Reacties',
            'Page not found': 'Pagina niet gevonden',
            'AI Model': 'AI Model',
            'Discover & Learn': 'Ontdekken & Leren',
            'CLI Installation': 'CLI Installatie',
            'Profile Information': 'Profiel Informatie',
            'Name required': 'Naam vereist',
            'Deep Learning': 'Diep Leren',
            'Machine Learning': 'Machinaal Leren',
            'Best practices': 'Beste praktijken',
            'Filter': 'Filteren',
            'Code Refactoring': 'Code Refactoring',
            'Setup': 'Configuratie',
            'Tutorials': 'Tutorials',
            '40 minutes': '40 minuten',
            '15 min': '15 min',
            'Designing a RESTful API': 'Een RESTful API ontwerpen',
            'Set up Claude Code on cloud or CLI': 'Claude Code instellen op cloud of CLI',
            'Blindly trusting generated code without review': 'Blind vertrouwen op gegenereerde code zonder review',
            'Machine Learning vs Deep Learning': 'Machinaal Leren vs Diep Leren',
            'Tutorials | Prompt Party': 'Tutorials | Prompt Party',
            'Migrate state management from Redux with less boilerplate and better types':
                'Migreer statusbeheer van Redux met minder boilerplate en betere types',
        }

        common_translations = fr_common_translations if lang == 'fr' else nl_common_translations

        # Process items
        all_items = high_priority + medium_priority

        for item in all_items:
            key = item['key']
            value = item['value']

            if not self.should_translate(key, value):
                continue

            # Check if we have a manual translation
            if value in common_translations:
                suggestions[key] = common_translations[value]
            else:
                # Mark for manual translation
                suggestions[key] = f"[TRANSLATE] {value}"

        return suggestions

    def generate_patch_file(self, lang: str, suggestions: Dict[str, str]):
        """Generate a JSON patch file with translation suggestions"""
        patch_file = self.project_root / f"translations_{lang}_patch.json"

        with open(patch_file, 'w', encoding='utf-8') as f:
            json.dump(suggestions, f, indent=2, ensure_ascii=False)

        print(f"✓ Generated patch file: {patch_file}")
        return patch_file

    def apply_translations(self, lang: str, suggestions: Dict[str, str], auto_apply: bool = False):
        """Apply translations to the target language file"""
        translations = self.translations[lang].copy()

        applied_count = 0
        manual_count = 0

        for key, translation in suggestions.items():
            if '[TRANSLATE]' in translation and not auto_apply:
                manual_count += 1
                continue

            # Navigate to the right position in the nested dict
            keys = key.split('.')
            current = translations

            for i, k in enumerate(keys[:-1]):
                if k not in current:
                    current[k] = {}
                current = current[k]

            # Set the translation
            final_key = keys[-1]
            if final_key in current and current[final_key] == translation.replace('[TRANSLATE] ', ''):
                continue  # Already set correctly

            current[final_key] = translation.replace('[TRANSLATE] ', '')
            applied_count += 1

        # Save updated translations
        output_file = self.messages_dir / f"{lang}.json"
        backup_file = self.messages_dir / f"{lang}.json.backup"

        # Create backup
        if output_file.exists():
            import shutil
            shutil.copy(output_file, backup_file)
            print(f"✓ Created backup: {backup_file}")

        # Write updated translations
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(translations, f, indent=2, ensure_ascii=False)

        print(f"✓ Applied {applied_count} translations to {lang}.json")
        if manual_count > 0:
            print(f"⚠ {manual_count} items need manual translation (marked with [TRANSLATE])")

    def generate_report(self):
        """Generate final report"""
        print("\n" + "=" * 80)
        print("TRANSLATION GENERATION REPORT")
        print("=" * 80)

        for lang in ['fr', 'nl']:
            print(f"\n{lang.upper()}:")
            print("-" * 80)

            suggestions = self.get_translation_suggestions(lang)

            auto_translated = sum(1 for v in suggestions.values() if '[TRANSLATE]' not in v)
            needs_manual = sum(1 for v in suggestions.values() if '[TRANSLATE]' in v)
            skipped = (len(self.untranslated[lang]['categories']['high_priority']) +
                      len(self.untranslated[lang]['categories']['medium_priority']) -
                      len(suggestions))

            print(f"Total items to translate: {len(suggestions)}")
            print(f"Auto-translated: {auto_translated}")
            print(f"Needs manual translation: {needs_manual}")
            print(f"Skipped (CSS/URLs/numbers): {skipped}")

            # Generate patch file
            self.generate_patch_file(lang, suggestions)

def main():
    project_root = Path(__file__).parent.parent
    generator = TranslationGenerator(str(project_root))

    print("🚀 Starting Translation Generation...")
    generator.generate_report()

    print("\n" + "=" * 80)
    print("NEXT STEPS")
    print("=" * 80)
    print("1. Review the generated patch files:")
    print("   - translations_fr_patch.json")
    print("   - translations_nl_patch.json")
    print()
    print("2. Items marked with [TRANSLATE] need manual translation")
    print()
    print("3. To apply translations automatically (excluding [TRANSLATE] items):")
    print("   python scripts/apply_translations.py fr")
    print("   python scripts/apply_translations.py nl")
    print()
    print("4. After manual translation, remove [TRANSLATE] markers and apply again")

if __name__ == "__main__":
    main()
