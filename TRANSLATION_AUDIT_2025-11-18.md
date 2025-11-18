# Translation Audit - November 18, 2025

## Quick Access Guide

This document serves as an index to all translation audit files generated on November 18, 2025.

---

## Executive Summary

**Status:** Translation infrastructure is excellent, but 867 values need translation work.

**Key Stats:**
- Total translation keys: 4,095
- French coverage: 88.4% (476 items need translation)
- Dutch coverage: 90.5% (391 items need translation)
- Overall quality score: 89.4%

**Estimated effort:** 20 hours (~$1,001 at $50/hour)

---

## File Directory

### 1. Main Documentation

#### `/TRANSLATION_AUDIT_REPORT.md`
**Purpose:** Complete audit report with detailed analysis and recommendations

**Contents:**
- Executive summary with statistics
- Detailed analysis by priority level
- Translation coverage by namespace
- Auto-translation results
- Phase-by-phase action plan
- Technical implementation guide
- Best practices and recommendations

**When to read:** First document to review for complete understanding

---

#### `/scripts/README_TRANSLATION_SCRIPTS.md`
**Purpose:** How-to guide for all translation scripts and workflows

**Contents:**
- Detailed script documentation
- Usage examples for each script
- Complete workflow guide (5 phases)
- File structure explanation
- Common issues and solutions
- Translation best practices
- Automation and CI/CD setup
- FAQ section

**When to read:** Before running any scripts or starting translation work

---

### 2. Data Files

#### `/translation-audit-report.json` (139 KB)
**Purpose:** Machine-readable audit data

**Contents:**
```json
{
  "statistics": { ... },
  "coverage": { ... },
  "missing_keys": { ... },
  "untranslated_values": { ... },
  "orphaned_keys": [ ... ],
  "namespaces_used": [ ... ]
}
```

**When to use:** For programmatic access to audit data

---

#### `/untranslated_fr_prioritized.json` (93 KB)
**Purpose:** French translations categorized by priority

**Contents:**
```json
{
  "summary": {
    "total": 476,
    "high_priority": 14,
    "medium_priority": 295,
    "low_priority": 17
  },
  "categories": {
    "high_priority": [ ... ],
    "medium_priority": [ ... ],
    "low_priority": { ... }
  },
  "by_namespace": [ ... ]
}
```

**When to use:** To see all French translations organized by priority

---

#### `/untranslated_nl_prioritized.json` (78 KB)
**Purpose:** Dutch translations categorized by priority

**Contents:**
```json
{
  "summary": {
    "total": 391,
    "high_priority": 14,
    "medium_priority": 227,
    "low_priority": 17
  },
  "categories": {
    "high_priority": [ ... ],
    "medium_priority": [ ... ],
    "low_priority": { ... }
  },
  "by_namespace": [ ... ]
}
```

**When to use:** To see all Dutch translations organized by priority

---

### 3. Patch Files (Ready to Apply)

#### `/translations_fr_patch.json` (20 KB)
**Purpose:** French translation suggestions (307 items)

**Contents:**
- 32 auto-translated common terms (ready to apply)
- 275 items marked with `[TRANSLATE]` (need manual translation)

**Example:**
```json
{
  "ml.hero_title": "Apprentissage Automatique vs Apprentissage Profond",
  "common.filter": "[TRANSLATE] Filter",
  "notifications.form_comments": "Commentaires"
}
```

**When to use:** Edit this file to add manual translations, then apply with script

---

#### `/translations_nl_patch.json` (16 KB)
**Purpose:** Dutch translation suggestions (239 items)

**Contents:**
- 28 auto-translated common terms (ready to apply)
- 211 items marked with `[TRANSLATE]` (need manual translation)

**Example:**
```json
{
  "ml.hero_title": "Machinaal Leren vs Diep Leren",
  "common.filter": "Filteren",
  "notifications.form_comments": "Reacties"
}
```

**When to use:** Edit this file to add manual translations, then apply with script

---

### 4. Python Scripts

#### `/scripts/audit_translations.py` (13 KB)
**What it does:**
- Scans all 239 TSX files for translation usage
- Compares en.json, fr.json, nl.json
- Identifies missing keys and untranslated values
- Generates audit reports

**Usage:**
```bash
python3 scripts/audit_translations.py
```

**Output:** Console report + `translation-audit-report.json`

---

#### `/scripts/analyze_untranslated.py` (7.0 KB)
**What it does:**
- Categorizes translations by priority (high/medium/low)
- Groups by namespace
- Generates prioritized lists

**Usage:**
```bash
python3 scripts/analyze_untranslated.py
```

**Output:**
- `untranslated_fr_prioritized.json`
- `untranslated_nl_prioritized.json`

---

#### `/scripts/generate_translations.py` (9.6 KB)
**What it does:**
- Auto-translates common terms
- Marks remaining items with `[TRANSLATE]`
- Generates ready-to-apply patch files
- Creates backups before applying

**Usage:**
```bash
python3 scripts/generate_translations.py
```

**Output:**
- `translations_fr_patch.json`
- `translations_nl_patch.json`

---

#### `/scripts/translation_stats.py` (8.8 KB)
**What it does:**
- Calculates completion rates
- Shows namespace-level breakdown
- Estimates translation effort (time & cost)
- Generates quality scores

**Usage:**
```bash
python3 scripts/translation_stats.py
```

**Output:** Console report with statistics and visualizations

---

#### `/scripts/show_translation_examples.py` (6.5 KB)
**What it does:**
- Shows concrete examples of what needs translation
- Displays quick-win opportunities
- Lists tutorial content examples
- Provides side-by-side comparisons

**Usage:**
```bash
python3 scripts/show_translation_examples.py
```

**Output:** Human-readable examples with context

---

## Quick Start Guide

### For Project Managers

1. Read `/TRANSLATION_AUDIT_REPORT.md` (Executive Summary)
2. Review effort estimation: 20 hours, ~$1,001
3. Prioritize translation work in sprint planning
4. Consider hiring professional translator

### For Translators

1. Read `/scripts/README_TRANSLATION_SCRIPTS.md` (Complete workflow)
2. Run `python3 scripts/show_translation_examples.py` (See examples)
3. Edit patch files:
   - Open `/translations_fr_patch.json`
   - Replace `[TRANSLATE] English text` with French translation
   - Repeat for `/translations_nl_patch.json`
4. Apply translations: `python3 scripts/apply_translations.py [fr|nl]`
5. Test in browser

### For Developers

1. Read `/scripts/README_TRANSLATION_SCRIPTS.md` (Technical details)
2. Review `/translation-audit-report.json` (Raw data)
3. Run scripts to understand current state:
   ```bash
   python3 scripts/audit_translations.py
   python3 scripts/translation_stats.py
   ```
4. Set up automated checks (see README section on CI/CD)

---

## Priority Action Items

### Phase 1: High Priority (2-4 hours)
**Target:** 28 items (long-form content)

**Key translations needed:**
1. `tutorials.claude_code_basics.page_description`
2. `tutorials.claude_code_basics.section_3_refactoring_desc`
3. `tutorials.claude_code_basics.section_3_tip`
4. `tutorials.claude_code_basics.vs_copilot_desc`

**Impact:** Critical UX and SEO

---

### Phase 2: Medium Priority (1-2 days)
**Target:** 522 items (UI elements)

**Top namespaces:**
1. tutorials (449 items)
2. components (96 items)
3. common (38 items)
4. prompts (30 items)

**Impact:** User-facing UI consistency

---

### Phase 3: Low Priority (1 hour)
**Target:** 17 items (optional)

**Items:**
- CSS classes (11 items) - Can skip
- Numbers/stats (5 items) - Universal format
- URLs (1 item) - Technical

**Impact:** Minimal (can skip)

---

## Workflow Diagram

```
1. AUDIT
   ├─ Run: audit_translations.py
   ├─ Output: translation-audit-report.json
   └─ Review: TRANSLATION_AUDIT_REPORT.md

2. PRIORITIZE
   ├─ Run: analyze_untranslated.py
   ├─ Output: untranslated_fr_prioritized.json, untranslated_nl_prioritized.json
   └─ Review: Priority levels (high/medium/low)

3. GENERATE
   ├─ Run: generate_translations.py
   ├─ Output: translations_fr_patch.json, translations_nl_patch.json
   └─ Review: Auto-translations + [TRANSLATE] markers

4. TRANSLATE
   ├─ Edit: translations_fr_patch.json
   ├─ Replace: [TRANSLATE] markers with actual translations
   └─ Repeat: For translations_nl_patch.json

5. APPLY
   ├─ Run: apply_translations.py fr
   ├─ Run: apply_translations.py nl
   ├─ Verify: git diff messages/fr.json, messages/nl.json
   └─ Test: npm run dev (test each language)

6. VERIFY
   ├─ Test: All pages in French
   ├─ Test: All pages in Dutch
   ├─ Review: Native speaker QA
   └─ Deploy: Commit and push
```

---

## Checklist

### Before Starting
- [ ] Read TRANSLATION_AUDIT_REPORT.md
- [ ] Read scripts/README_TRANSLATION_SCRIPTS.md
- [ ] Review effort estimation
- [ ] Assign translator(s)
- [ ] Set timeline

### During Translation
- [ ] Start with high-priority items (28 items)
- [ ] Use patch files for guidance
- [ ] Maintain consistency with existing translations
- [ ] Check technical terms in context
- [ ] Test translations in UI as you go

### After Translation
- [ ] Run all scripts to verify completeness
- [ ] Test all pages in each language
- [ ] Get native speaker review
- [ ] Document any new terminology
- [ ] Update translation workflow docs

### Automation Setup
- [ ] Add pre-commit hook for translation checks
- [ ] Set up CI/CD translation validation
- [ ] Document translation workflow for team
- [ ] Create translation style guide
- [ ] Consider Translation Management System

---

## Key Metrics

**Current State:**
- English: 4,095 keys (100% reference)
- French: 3,619 translated (88.4%)
- Dutch: 3,704 translated (90.5%)
- Overall: 89.4% quality score

**Target State:**
- French: 4,078+ translated (98%+)
- Dutch: 4,078+ translated (98%+)
- Overall: 98%+ quality score

**Gap to Close:**
- French: 459 translations (skip 17 CSS/numbers)
- Dutch: 374 translations (skip 17 CSS/numbers)
- Total: 833 translation items

---

## Next Steps

1. **This week:** Review reports with team, start high-priority items
2. **This month:** Complete medium-priority UI translations
3. **This quarter:** Set up automation, establish translation workflow

---

## Questions?

**For audit details:** See `TRANSLATION_AUDIT_REPORT.md`
**For script usage:** See `scripts/README_TRANSLATION_SCRIPTS.md`
**For examples:** Run `python3 scripts/show_translation_examples.py`
**For statistics:** Run `python3 scripts/translation_stats.py`

---

**Generated:** November 18, 2025
**Version:** 1.0
**Status:** Ready for translation work
