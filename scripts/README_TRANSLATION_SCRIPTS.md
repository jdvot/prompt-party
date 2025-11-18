# Translation Audit & Management Scripts

This directory contains Python scripts for auditing and managing translations across the Prompt Party application.

## Overview

The translation system supports three languages:
- **English (en)** - Reference language
- **French (fr)** - 88.4% translated
- **Dutch (nl)** - 90.5% translated

## Available Scripts

### 1. `audit_translations.py` - Complete Translation Audit

**Purpose:** Scans the entire codebase to identify missing or untranslated keys.

**What it does:**
- Loads all translation files (en.json, fr.json, nl.json)
- Scans 239 TSX files for translation usage
- Identifies missing keys between languages
- Finds values that are identical to English (likely untranslated)
- Detects potentially orphaned keys (unused in code)
- Generates comprehensive audit report

**Usage:**
```bash
python3 scripts/audit_translations.py
```

**Output:**
- Console report with statistics and findings
- `translation-audit-report.json` - Machine-readable full report

**Example Output:**
```
📊 TRANSLATION STATISTICS
EN: 4,095 keys
FR: 4,095 keys
NL: 4,095 keys

❌ MISSING KEYS
FR missing 0 keys
NL missing 0 keys

⚠️  POTENTIALLY UNTRANSLATED VALUES
FR has 476 values identical to English
NL has 391 values identical to English
```

---

### 2. `analyze_untranslated.py` - Priority Analysis

**Purpose:** Categorizes untranslated items by priority and type.

**What it does:**
- Categorizes translations by priority (High/Medium/Low)
- Groups by content type (long text, short text, CSS, numbers)
- Analyzes by namespace to find problem areas
- Generates prioritized action lists

**Usage:**
```bash
python3 scripts/analyze_untranslated.py
```

**Output:**
- `untranslated_fr_prioritized.json` - French translations by priority
- `untranslated_nl_prioritized.json` - Dutch translations by priority

**Priority Categories:**
- 🔴 **High Priority:** Long text, user-facing content (14 items)
- 🟡 **Medium Priority:** Short text, labels, buttons (522 items)
- 🟢 **Low Priority:** CSS classes, numbers, URLs (17 items)

---

### 3. `generate_translations.py` - Auto-Translation Generator

**Purpose:** Auto-translates common terms and generates patch files.

**What it does:**
- Auto-translates 32 common French terms
- Auto-translates 28 common Dutch terms
- Marks remaining items with `[TRANSLATE]` for manual work
- Generates ready-to-apply patch files
- Creates backups before applying changes

**Usage:**
```bash
python3 scripts/generate_translations.py
```

**Output:**
- `translations_fr_patch.json` - French translation suggestions
- `translations_nl_patch.json` - Dutch translation suggestions

**Auto-Translated Terms (Examples):**
```json
{
  "Collections": "Collections",
  "Comments": "Commentaires",
  "AI Model": "Modèle IA",
  "Deep Learning": "Apprentissage Profond",
  "Machine Learning": "Apprentissage Automatique"
}
```

---

### 4. `translation_stats.py` - Detailed Statistics

**Purpose:** Generate comprehensive statistics and visualizations.

**What it does:**
- Calculates completion rates per language
- Shows namespace-level breakdown
- Estimates translation effort (time & cost)
- Generates quality scores

**Usage:**
```bash
python3 scripts/translation_stats.py
```

**Output:**
```
TRANSLATION COMPLETION RATE
French:   ███████████████████████████████████░░░░░ 88.4%
Dutch:    ████████████████████████████████████░░░░ 90.5%

TRANSLATION EFFORT ESTIMATION
French:   11.1 hours (~$555 USD)
Dutch:    8.9 hours (~$445 USD)
Total:    20.0 hours (~$1,001 USD)
```

---

### 5. `show_translation_examples.py` - Concrete Examples

**Purpose:** Display specific examples of what needs translation.

**What it does:**
- Shows high-priority translation examples
- Displays quick-win opportunities
- Lists tutorial content examples
- Provides side-by-side comparisons

**Usage:**
```bash
python3 scripts/show_translation_examples.py
```

**Output:** Human-readable examples with context:
```
🔴 HIGH PRIORITY EXAMPLES
1. tutorials.claude_code_basics.page_description
   English: "Master Claude Code, the AI development assistant..."
   French: ❌ NEEDS TRANSLATION

🟡 QUICK WINS
1. common.filter → "Filter"
2. profile.collections_tab → "Collections"
3. notifications.form_comments → "Comments"
```

---

## Complete Workflow

### Phase 1: Initial Audit
```bash
# Step 1: Run complete audit
python3 scripts/audit_translations.py

# Step 2: Analyze by priority
python3 scripts/analyze_untranslated.py

# Step 3: View statistics
python3 scripts/translation_stats.py

# Step 4: See concrete examples
python3 scripts/show_translation_examples.py
```

### Phase 2: Generate Translations
```bash
# Generate patch files with auto-translations
python3 scripts/generate_translations.py

# Review the generated files
cat translations_fr_patch.json | grep "TRANSLATE" | wc -l  # Count manual items
cat translations_nl_patch.json | grep "TRANSLATE" | wc -l
```

### Phase 3: Manual Translation
1. Open `translations_fr_patch.json`
2. Find items marked with `[TRANSLATE]`
3. Replace `[TRANSLATE] English text` with actual translation
4. Save the file

**Example:**
```json
{
  "common.filter": "[TRANSLATE] Filter"
}
```

Becomes:
```json
{
  "common.filter": "Filtrer"
}
```

### Phase 4: Apply Translations
```bash
# Apply translations (creates backup first)
python3 scripts/apply_translations.py fr
python3 scripts/apply_translations.py nl

# Verify changes
git diff messages/fr.json
git diff messages/nl.json
```

### Phase 5: Test & Verify
```bash
# Run the application
npm run dev

# Test in each language:
# 1. Switch language in UI
# 2. Navigate through pages
# 3. Test forms and buttons
# 4. Check tutorial content
# 5. Verify error messages
```

---

## File Structure

```
messages/
├── en.json              # English (reference)
├── fr.json              # French (target)
└── nl.json              # Dutch (target)

scripts/
├── audit_translations.py          # Main audit script
├── analyze_untranslated.py        # Priority analysis
├── generate_translations.py       # Auto-translation
├── translation_stats.py           # Statistics
└── show_translation_examples.py   # Examples viewer

Generated files:
├── TRANSLATION_AUDIT_REPORT.md        # Full audit report
├── translation-audit-report.json      # Machine-readable data
├── untranslated_fr_prioritized.json   # FR priorities
├── untranslated_nl_prioritized.json   # NL priorities
├── translations_fr_patch.json         # FR patch file
└── translations_nl_patch.json         # NL patch file
```

---

## Understanding the Audit Results

### Key Metrics

**Coverage Percentage:**
- Percentage of keys that exist in each language
- All languages have 100% key coverage (no missing keys)

**Quality Score:**
- Percentage of translations that differ from English
- French: 88.4% (476 untranslated values)
- Dutch: 90.5% (391 untranslated values)

**Untranslated Values:**
- Translation keys exist but values are identical to English
- Likely copied over without translation

**Orphaned Keys:**
- Keys that appear in translation files but may not be used in code
- Requires manual verification before removal

---

## Common Issues & Solutions

### Issue: Too many items to translate

**Solution:** Use priority-based approach
1. Start with HIGH priority (28 items, ~2-4 hours)
2. Then MEDIUM priority (522 items, ~1-2 days)
3. Skip LOW priority (CSS, numbers - optional)

### Issue: Don't know the context of a translation

**Solution:** Search for usage in code
```bash
# Find where a key is used
grep -r "tutorials.claude_code_basics.page_description" src/
```

### Issue: Unsure about technical terminology

**Solution:** Check existing translations
```bash
# See how similar terms are translated
cat messages/fr.json | grep -i "machine learning"
cat messages/nl.json | grep -i "deep learning"
```

### Issue: Want to see all items for a specific namespace

**Solution:** Use jq to filter
```bash
# See all 'tutorials' translations
cat messages/en.json | jq '.tutorials'
```

---

## Translation Best Practices

### 1. Consistency
- Use the same translation for the same term throughout
- Check existing translations before adding new ones
- Create a glossary for technical terms

### 2. Context Awareness
- Consider where the text appears (button, heading, paragraph)
- Adapt translation length to UI constraints
- Maintain tone and formality level

### 3. Cultural Adaptation
- Not all idioms translate directly
- Adapt examples to target culture when appropriate
- Consider regional variations (FR vs FR-CA, NL vs BE)

### 4. Quality Assurance
- Have native speakers review translations
- Test translations in actual UI
- Verify placeholder variables remain unchanged (`{{variable}}`)

### 5. Technical Terms
- Some terms are better left untranslated:
  - Brand names (Claude, GitHub, Anthropic)
  - Technical acronyms (API, CLI, AI)
  - Programming terms (git, npm, TypeScript)

---

## Automation & CI/CD

### Pre-commit Hook (Recommended)

Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
# Check for translation consistency
python3 scripts/audit_translations.py --quick-check

if [ $? -ne 0 ]; then
  echo "⚠️  Translation check failed. Run: python3 scripts/audit_translations.py"
  exit 1
fi
```

### GitHub Actions (Recommended)

Add to `.github/workflows/translation-check.yml`:
```yaml
name: Translation Check

on: [pull_request]

jobs:
  check-translations:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Check translations
        run: |
          python3 scripts/audit_translations.py
          # Fail if untranslated count increases
```

---

## FAQ

**Q: Should CSS classes be translated?**
A: No. Classes like `bg-info` are technical and should remain unchanged.

**Q: Should numbers be translated?**
A: Usually no. Format `10k+` or `1M+` is universal. Only translate if it includes units.

**Q: What about URLs?**
A: Keep URLs unchanged, they're technical paths.

**Q: Can I use Google Translate for this?**
A: For initial pass, yes. But always have a native speaker review, especially for user-facing content.

**Q: How do I add a new translation key?**
A: Add it to all three files (en.json, fr.json, nl.json) at the same time to avoid inconsistencies.

**Q: What's the difference between missing keys and untranslated values?**
A: Missing keys = key doesn't exist in translation file. Untranslated values = key exists but value is same as English.

---

## Support & Documentation

- **Main Report:** `TRANSLATION_AUDIT_REPORT.md`
- **Issues:** Check generated JSON files for details
- **Examples:** Run `show_translation_examples.py`

For questions about specific translations, search the codebase to see usage context.

---

**Last Updated:** 2025-11-18
**Version:** 1.0
**Maintainer:** Prompt Party Team
