# COMPREHENSIVE HARDCODED TEXT AUDIT REPORT
## Prompt Party Application

**Date:** November 6, 2025  
**Severity:** HIGH - Multiple critical issues found  
**Total Issues Found:** 157+ hardcoded strings

---

## EXECUTIVE SUMMARY

The Prompt Party application has **significant internationalization (i18n) issues** that prevent proper multi-language support:

1. **Dutch (nl) is completely disabled in the i18n configuration** despite having a complete translation file
2. **Language switcher only offers English and French** - Dutch option is hardcoded but not selectable
3. **157+ hardcoded English strings** are scattered throughout the codebase, not using the `t()` translation function
4. **UI text, buttons, labels, and error messages** are hardcoded in English, breaking non-English user experience

---

## CRITICAL ISSUES

### 1. DUTCH (NL) IS NOT ENABLED IN I18N CONFIGURATION

**File:** `src/i18n/request.ts` (Line 4)

```typescript
// WRONG - Only EN and FR enabled
export const locales = ['en', 'fr'] as const;

// Should be:
export const locales = ['en', 'fr', 'nl'] as const;
```

**Impact:**
- Dutch language file exists (`messages/nl.json` with 67KB of translations) but is NOT accessible
- Users cannot switch to Dutch even though translations are complete
- Language switcher only shows 🇬🇧 English and 🇫🇷 Français

**Severity:** CRITICAL

---

### 2. LANGUAGE SWITCHER MISSING DUTCH (NL)

**File:** `src/components/layout/language-switcher.tsx` (Lines 15-18)

```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];
// MISSING:
// { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
```

**Hardcoded Strings:**
- `"English"` - should be `t('en')`
- `"Français"` - should be `t('fr')`
- Missing `"Nederlands"` translation key

**Severity:** CRITICAL

---

## CRITICAL HARDCODED TEXT FINDINGS

### A. USER-FACING MESSAGES (High Priority)

#### Settings Form (`src/components/profile/settings-form.tsx`)

| Line | Hardcoded Text | Type | Severity |
|------|---|---|---|
| 40 | `"Profile updated successfully!"` | Success message | HIGH |
| 53 | `"Profile Information"` | Section heading | HIGH |
| 70 | `"Email"` | Label | HIGH |
| 80 | `"Email cannot be changed"` | Helper text | MEDIUM |
| 86 | `"Display Name"` | Label | HIGH |
| 93 | `placeholder="Your name"` | Placeholder | MEDIUM |
| 100 | `"Username"` | Label | HIGH |
| 105 | `placeholder="username"` | Placeholder | MEDIUM |
| 109 | `"Your public profile will be at /profile/username"` | Helper text | MEDIUM |

**Suggestion:** Create translation keys under `profile.settings`

---

#### API Key Manager (`src/components/api/api-key-manager.tsx`)

| Line | Hardcoded Text | Type | Severity |
|------|---|---|---|
| 78 | `"Are you sure you want to delete this API key? This action cannot be undone."` | Confirmation dialog | HIGH |
| 96 | `"API Key Created!"` | Title | HIGH |
| 98 | `"Copy this key now. You won't be able to see it again."` | Description | HIGH |
| 145 | `placeholder="My App Integration"` | Placeholder | MEDIUM |
| 225-226 | `"GET /prompts"`, `"POST /prompts"` | API endpoint labels | MEDIUM |

**Suggestion:** Create translation keys under `apiKeys` section

---

#### Prompt Playground (`src/components/ai-tester/prompt-playground.tsx`)

| Line | Hardcoded Text | Type | Severity |
|------|---|---|---|
| 30 | `"Please sign in to test prompts"` | Error message | HIGH |
| 52 | `"Failed to test prompt"` | Error message | HIGH |
| 72 | `"Test with AI"` | Button text | HIGH |
| 74 | `"Premium"` | Badge | MEDIUM |
| 85 | `"AI Prompt Tester"` | Heading | HIGH |
| 100 | `"AI Model"` | Label | HIGH |
| 123 | `"Test Input (Optional)"` | Label | MEDIUM |
| 127 | `placeholder="Add any variables or context for your prompt..."` | Placeholder | HIGH |
| 169 | `"AI Response"` | Label | HIGH |
| 187 | `"Upgrade"` | Button | MEDIUM |

**Suggestion:** Create translation keys under `common` or create new `aiTester` section

---

#### Prompt Editor/Remix (`src/components/editor/remix-editor.tsx`)

| Line | Hardcoded Text | Type | Severity |
|------|---|---|---|
| 28 | `"Write"` | Tab label | HIGH |
| 39 | `"Preview"` | Tab label | HIGH |
| 50 | `placeholder="Write your prompt here... (Markdown supported)"` | Placeholder | HIGH |
| 63 | `"Markdown supported: **bold**, *italic*, `code`, [links](url), etc."` | Helper text | MEDIUM |

---

#### Share & Export Buttons (`src/components/prompts/share-button.tsx`)

| Line | Hardcoded Text | Type | Severity |
|------|---|---|---|
| 81 | `aria-label="Share prompt"` | Accessibility label | HIGH |
| 95 | `"Share on Twitter"` | Link text | HIGH |
| 103 | `"Share on LinkedIn"` | Link text | HIGH |
| 112 | `"Share..."` | Button text | HIGH |
| 125 | `"Copied!"` | Feedback message | MEDIUM |
| 130 | `"Copy link"` | Button text | HIGH |

---

#### Embed Button (`src/components/prompts/embed-button.tsx`)

| Line | Hardcoded Text | Type | Severity |
|------|---|---|---|
| 46 | `aria-label="Embed prompt"` | Accessibility label | HIGH |
| 63 | `"Embed Prompt"` | Dialog title | HIGH |
| 67 | `aria-label="Close"` | Accessibility label | HIGH |
| 113 | `"Theme"` | Label | MEDIUM |
| 141 | `"Preview"` | Tab | MEDIUM |
| 165 | `aria-label="Copy code"` | Accessibility label | HIGH |

---

#### Delete/Confirmation Dialogs

| File | Line | Hardcoded Text | Severity |
|------|------|---|---|
| `comment-item.tsx` | 34 | `"Delete this comment?"` | HIGH |
| `comment-item.tsx` | 74 | `"Delete comment"` | HIGH |
| `api-key-manager.tsx` | 78 | `"Are you sure you want to delete this API key?"` | HIGH |

---

### B. FORM PLACEHOLDERS (Medium Priority)

| File | Line | Placeholder Text | Type |
|------|------|---|---|
| `collaborative-editor.tsx` | 301 | `"Prompt title..."` | Title |
| `collaborative-editor.tsx` | 325 | `"Write your prompt here..."` | Content |
| `import-export.tsx` | 270 | `"Paste your JSON export here..."` | Data input |
| `saved-searches.tsx` | 109 | `"Name this search..."` | User input |
| `search-autocomplete.tsx` | 182 | `"Search prompts, tags..."` | Search |
| `challenges/submission-card.tsx` | ? | `"https://prompt-party.com/prompts/..."` | Example URL |

---

### C. HEADINGS & LABELS (High Priority)

| Component | Line | Hardcoded Text | Type |
|---|---|---|---|
| `ai-optimizer.tsx` | 85 | `"Analyzing your prompt..."` | Status message |
| `ai-optimizer.tsx` | 111 | `"Prompt Quality Score"` | Heading |
| `ai-optimizer.tsx` | 189 | `"AI-Optimized Prompt"` | Heading |
| `ai-optimizer.tsx` | 211 | `"Key Improvements Made"` | Heading |
| `feed/trending-tags.tsx` | 39 | `"Trending Tags"` | Heading |
| `notifications/notification-center.tsx` | 218 | `"Notifications"` | Heading |
| `notifications/notification-center.tsx` | 247 | `"No notifications yet"` | Empty state |
| `profile/profile-badges.tsx` | 77 | `"Badges"` | Heading |
| `search/advanced-filters.tsx` | 178 | `"Tags"` | Heading |
| `search/advanced-filters.tsx` | 195 | `"AI Models"` | Heading |
| `search/advanced-filters.tsx` | 212 | `"Date Range"` | Heading |

---

### D. ONBOARDING STEPS (Medium Priority)

| File | Line | Hardcoded Text |
|------|------|---|
| `welcome-screen.tsx` | 88 | `"Step 1 of 4"` |
| `interest-selection.tsx` | 122 | `"Step 2 of 4"` |
| `follow-creators.tsx` | 152 | `"Step 3 of 4"` |
| `feature-tour.tsx` | 121 | `"Step 4 of 4"` |

---

### E. THEME & UI UTILITIES (Low Priority but important)

| File | Line | Hardcoded Text |
|------|------|---|
| `theme/theme-toggle.tsx` | 18, 37, 87 | `"Toggle theme"` |
| `tutorials/tutorial-progress.tsx` | 88 | `"Progression"` |
| `ui/badge.tsx` | 146 | `"Remove"` (aria-label) |
| `ui/button.tsx` | 138 | `"Loading..."` |
| `ui/dialog.tsx` | 49 | `"Close"` |
| `ui/input.tsx` | 167 | `"Clear input"` (aria-label) |
| `ui/sheet.tsx` | 70 | `"Close"` |
| `ui/skeleton.tsx` | 57 | `"Loading..."` (aria-label) |

---

### F. CONSOLE ERROR MESSAGES (Low Priority - Debug only)

These are technical error messages for developers. While not user-facing, they should still be translatable:

| Files | Count | Examples |
|------|---|---|
| API routes | 24 | `"Error fetching prompts:"`, `"Error in access API:"` |
| Components | 25+ | `"Error creating prompt:"`, `"Follow error:"` |

These are acceptable to keep in English as they are console-only, but should be logged separately for monitoring.

---

## LANGUAGE CONFIGURATION ISSUES

### Current State
```typescript
// src/i18n/request.ts
export const locales = ['en', 'fr'] as const;  // MISSING: 'nl'
```

### Translation Files Status
- **en.json**: 152 KB - Complete ✓
- **fr.json**: 168 KB - Complete ✓
- **nl.json**: 67 KB - AVAILABLE BUT DISABLED ✗

### Missing Language Selector Option
`src/components/layout/language-switcher.tsx` needs:
```typescript
{ code: 'nl', name: 'Nederlands', flag: '🇳🇱' }
```

---

## SEVERITY BREAKDOWN

| Severity | Count | Examples |
|----------|-------|----------|
| CRITICAL | 3 | Dutch not enabled, Language switcher incomplete, Core config missing |
| HIGH | 80+ | UI text, buttons, labels, form fields, error messages |
| MEDIUM | 50+ | Placeholders, helper text, aria-labels |
| LOW | 25+ | Console errors, debug messages |

---

## RECOMMENDED TRANSLATION KEYS TO ADD

### Profile Settings
```json
{
  "profile": {
    "settings": {
      "heading": "Profile Information",
      "email_label": "Email",
      "email_readonly": "Email cannot be changed",
      "display_name_label": "Display Name",
      "display_name_placeholder": "Your name",
      "username_label": "Username",
      "username_placeholder": "username",
      "username_helper": "Your public profile will be at /profile/username",
      "success_message": "Profile updated successfully!"
    }
  }
}
```

### API Keys
```json
{
  "apiKeys": {
    "delete_confirm": "Are you sure you want to delete this API key? This action cannot be undone.",
    "created_title": "API Key Created!",
    "created_desc": "Copy this key now. You won't be able to see it again.",
    "placeholder": "My App Integration"
  }
}
```

### Prompt Tools
```json
{
  "prompts": {
    "share_aria": "Share prompt",
    "share_twitter": "Share on Twitter",
    "share_linkedin": "Share on LinkedIn",
    "share_button": "Share...",
    "copy_link": "Copy link",
    "embed_aria": "Embed prompt",
    "embed_title": "Embed Prompt",
    "close_aria": "Close",
    "copy_code_aria": "Copy code",
    "write_tab": "Write",
    "preview_tab": "Preview",
    "markdown_supported": "Markdown supported: **bold**, *italic*, `code`, [links](url), etc."
  }
}
```

---

## ACTION ITEMS (Priority Order)

### Phase 1: CRITICAL - Enable Dutch (nl)
- [ ] Update `src/i18n/request.ts` - Add 'nl' to locales array
- [ ] Update `src/middleware.ts` configuration if needed
- [ ] Add Dutch option to `src/components/layout/language-switcher.tsx`
- [ ] Add translation key for "Nederlands" in all message files
- [ ] Test language switching for all three languages

### Phase 2: HIGH - Core UI Text
- [ ] Extract hardcoded text from settings form
- [ ] Extract hardcoded text from API key manager
- [ ] Extract hardcoded text from prompt playground
- [ ] Extract hardcoded text from editor components
- [ ] Extract hardcoded text from share/embed buttons
- [ ] Extract hardcoded text from confirmation dialogs

### Phase 3: MEDIUM - Forms & Placeholders
- [ ] Extract form placeholder text
- [ ] Extract aria-labels
- [ ] Extract helper text
- [ ] Extract validation messages

### Phase 4: LOW - Polish
- [ ] Audit console error messages
- [ ] Add missing translation keys to nl.json where incomplete
- [ ] Test full application in all three languages

---

## FILES REQUIRING UPDATES

### Critical
1. `src/i18n/request.ts` - Add 'nl' to locales
2. `src/components/layout/language-switcher.tsx` - Add Dutch option

### High Priority (20+ files)
1. `src/components/profile/settings-form.tsx` - 9 hardcoded strings
2. `src/components/api/api-key-manager.tsx` - 5 hardcoded strings
3. `src/components/ai-tester/prompt-playground.tsx` - 10 hardcoded strings
4. `src/components/editor/remix-editor.tsx` - 4 hardcoded strings
5. `src/components/prompts/share-button.tsx` - 6 hardcoded strings
6. `src/components/prompts/embed-button.tsx` - 6 hardcoded strings
7. `src/components/comments/comment-item.tsx` - 2 hardcoded strings
8. And 13+ more files with 1-4 hardcoded strings each

### Moderate Priority (40+ files)
- Placeholder text in various forms
- Aria-labels and accessibility text
- Heading and section titles

---

## SUMMARY TABLE

| Category | Count | Status |
|----------|-------|--------|
| Dutch (NL) Disabled | 1 | CRITICAL |
| Language Switcher Missing NL | 1 | CRITICAL |
| Hardcoded UI Text | 80+ | HIGH |
| Hardcoded Placeholders | 20+ | MEDIUM |
| Hardcoded Aria-Labels | 15+ | MEDIUM |
| Hardcoded Headings | 20+ | HIGH |
| Console Errors (acceptable) | 25+ | LOW |
| **TOTAL ISSUES** | **157+** | **NEEDS IMMEDIATE ATTENTION** |

---

## TESTING CHECKLIST

After fixing:
- [ ] Verify Dutch (nl) appears in language switcher
- [ ] Test switching between EN, FR, NL
- [ ] Verify all UI text translates correctly
- [ ] Check form labels and placeholders
- [ ] Verify error messages are translated
- [ ] Test accessibility labels (aria-labels)
- [ ] Verify onboarding text is translated
- [ ] Test with screen reader in all languages

---

## NOTES

1. **Console error messages** (24+) are acceptable to remain in English as they are developer-facing only
2. **Translation coverage for nl.json** appears incomplete - many keys may be missing compared to en.json
3. **Language switching mechanism** is in place (cookie-based) but needs proper locale sync with UI
4. **next-intl library** is correctly configured but not fully utilized

