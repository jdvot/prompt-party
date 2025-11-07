# HARDCODED TEXT - DETAILED FILE-BY-FILE BREAKDOWN

## Quick Navigation
- [CRITICAL ISSUES](#critical-issues)
- [Components (Most Issues)](#components)
- [Pages](#pages)
- [API Routes](#api-routes)
- [Utilities](#utilities)

---

## CRITICAL ISSUES

### Issue #1: Dutch Language Disabled
**File:** `src/i18n/request.ts`  
**Lines:** 4  
**Severity:** CRITICAL  

```typescript
// CURRENT (WRONG):
export const locales = ['en', 'fr'] as const;

// SHOULD BE:
export const locales = ['en', 'fr', 'nl'] as const;
```

**Impact:** Dutch translation file exists but is completely inaccessible to users.

---

### Issue #2: Language Switcher Missing Dutch
**File:** `src/components/layout/language-switcher.tsx`  
**Lines:** 15-18  
**Severity:** CRITICAL  

```typescript
// CURRENT (WRONG):
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

// SHOULD BE:
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
];
```

**Hardcoded strings:**
- Line 16: `"English"` - should use t('en')
- Line 17: `"Français"` - should use t('fr')
- Missing: `"Nederlands"` translation key

---

## COMPONENTS

### 1. PROFILE SETTINGS FORM
**File:** `src/components/profile/settings-form.tsx`  
**Total Issues:** 9  
**Severity:** HIGH  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 40 | `setMessage({ type: 'success', text: 'Profile updated successfully!' })` | Success message | Add to profile.settings.success_message |
| 53 | `<h2 className="text-xl font-semibold mb-4">Profile Information</h2>` | Heading | Add to profile.settings.heading |
| 70 | `<label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>` | Label | Add to profile.settings.email_label |
| 80 | `<p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>` | Helper text | Add to profile.settings.email_readonly |
| 86 | `<label htmlFor="name" className="block text-sm font-medium mb-2">Display Name</label>` | Label | Add to profile.settings.display_name_label |
| 93 | `placeholder="Your name"` | Placeholder | Add to profile.settings.display_name_placeholder |
| 100 | `<label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>` | Label | Add to profile.settings.username_label |
| 105 | `placeholder="username"` | Placeholder | Add to profile.settings.username_placeholder |
| 109 | `Your public profile will be at /profile/username` | Helper text | Add to profile.settings.username_helper |

**Fix Priority:** HIGH  
**Complexity:** Low - straightforward string extraction

---

### 2. API KEY MANAGER
**File:** `src/components/api/api-key-manager.tsx`  
**Total Issues:** 5  
**Severity:** HIGH  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 78 | `confirm('Are you sure you want to delete this API key? This action cannot be undone.')` | Confirmation | Add to apiKeys.delete_confirm |
| 96 | `<CardTitle>API Key Created!</CardTitle>` | Title | Add to apiKeys.created_title |
| 98 | `Copy this key now. You won't be able to see it again.` | Description | Add to apiKeys.created_desc |
| 145 | `placeholder="My App Integration"` | Placeholder | Add to apiKeys.placeholder |
| 225-226 | `"GET /prompts"`, `"POST /prompts"` | Endpoint labels | Keep as-is (technical documentation) |

**Fix Priority:** HIGH  
**Complexity:** Medium - involves confirmation dialog handling

---

### 3. PROMPT PLAYGROUND (AI TESTER)
**File:** `src/components/ai-tester/prompt-playground.tsx`  
**Total Issues:** 10  
**Severity:** HIGH  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 30 | `setError('Please sign in to test prompts')` | Error message | Add to common.signin_to_test |
| 52 | `throw new Error(data.error \|\| 'Failed to test prompt')` | Error message | Add to common.test_prompt_failed |
| 72 | `<span>Test with AI</span>` | Button text | Add to prompts.test_with_ai |
| 74 | `<Badge variant="secondary" className="ml-2 text-xs inline-flex items-center">Premium</Badge>` | Badge | Add to common.premium |
| 85 | `<h3 className="text-lg font-semibold">AI Prompt Tester</h3>` | Heading | Add to prompts.ai_tester_heading |
| 100 | `<label className="text-sm font-medium mb-2 block">AI Model</label>` | Label | Add to prompts.ai_model_label |
| 123 | `<label className="block text-sm font-medium">Test Input (Optional)</label>` | Label | Add to prompts.test_input_label |
| 127 | `placeholder="Add any variables or context for your prompt..."` | Placeholder | Add to prompts.test_input_placeholder |
| 169 | `<label className="block text-sm font-medium">AI Response</label>` | Label | Add to prompts.ai_response_label |
| 187 | `<span>Upgrade</span>` | Button text | Add to common.upgrade |

**Fix Priority:** HIGH  
**Complexity:** High - multiple UI elements need translation

---

### 4. PROMPT EDITOR - REMIX
**File:** `src/components/editor/remix-editor.tsx`  
**Total Issues:** 4  
**Severity:** HIGH  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 28 | `Write` | Tab label | Add to prompts.write_tab |
| 39 | `Preview` | Tab label | Add to prompts.preview_tab |
| 50 | `placeholder="Write your prompt here... (Markdown supported)"` | Placeholder | Add to prompts.editor_placeholder |
| 63 | `Markdown supported: **bold**, *italic*, `code`, [links](url), etc.` | Helper text | Add to prompts.markdown_helper |

**Fix Priority:** HIGH  
**Complexity:** Low

---

### 5. PROMPT SHARE BUTTON
**File:** `src/components/prompts/share-button.tsx`  
**Total Issues:** 6  
**Severity:** HIGH  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 81 | `aria-label="Share prompt"` | Accessibility | Add to prompts.share_aria |
| 95 | `Share on Twitter` | Link text | Add to prompts.share_twitter |
| 103 | `Share on LinkedIn` | Link text | Add to prompts.share_linkedin |
| 112 | `Share...` | Button text | Add to prompts.share_button |
| 125 | `Copied!` | Feedback | Add to common.copied |
| 130 | `Copy link` | Button text | Add to prompts.copy_link |

**Fix Priority:** HIGH  
**Complexity:** Medium

---

### 6. PROMPT EMBED BUTTON
**File:** `src/components/prompts/embed-button.tsx`  
**Total Issues:** 6  
**Severity:** HIGH  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 46 | `aria-label="Embed prompt"` | Accessibility | Add to prompts.embed_aria |
| 63 | `Embed Prompt` | Dialog title | Add to prompts.embed_title |
| 67 | `aria-label="Close"` | Accessibility | Add to common.close_aria |
| 113 | `Theme` | Label | Add to common.theme |
| 141 | `Preview` | Tab | Add to common.preview |
| 165 | `aria-label="Copy code"` | Accessibility | Add to prompts.copy_code_aria |

**Fix Priority:** HIGH  
**Complexity:** Medium

---

### 7. COMMENT ITEM
**File:** `src/components/comments/comment-item.tsx`  
**Total Issues:** 2  
**Severity:** HIGH  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 34 | `confirm('Delete this comment?')` | Confirmation | Add to comments.delete_confirm |
| 74 | `Delete comment` | Button text | Add to comments.delete_button |

**Fix Priority:** HIGH  
**Complexity:** Low

---

### 8. AI OPTIMIZER
**File:** `src/components/ai-optimizer/prompt-optimizer.tsx`  
**Total Issues:** 4  
**Severity:** HIGH  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 103 | `Analyzing your prompt...` | Status message | Add to prompts.analyzing |
| 111 | `Prompt Quality Score` | Heading | Add to prompts.quality_score |
| 189 | `AI-Optimized Prompt` | Heading | Add to prompts.optimized_prompt |
| 211 | `Key Improvements Made` | Heading | Add to prompts.improvements |

**Fix Priority:** MEDIUM  
**Complexity:** Low

---

### 9. COLLABORATIVE EDITOR
**File:** `src/components/prompts/collaborative-editor.tsx`  
**Total Issues:** 2  
**Severity:** MEDIUM  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 301 | `placeholder="Prompt title..."` | Placeholder | Add to prompts.title_placeholder |
| 325 | `placeholder="Write your prompt here..."` | Placeholder | Add to prompts.content_placeholder |

**Fix Priority:** MEDIUM  
**Complexity:** Low

---

### 10. ONBOARDING - WELCOME SCREEN
**File:** `src/components/onboarding/welcome-screen.tsx`  
**Total Issues:** 4  
**Severity:** MEDIUM  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 39 | `Join the Community` | Heading | Add to onboarding.join_community |
| 49 | `Discover & Learn` | Heading | Add to onboarding.discover_learn |
| 59 | `Remix & Create` | Heading | Add to onboarding.remix_create |
| 88 | `Step 1 of 4` | Progress text | Add to onboarding.step_1 |

**Fix Priority:** MEDIUM  
**Complexity:** Low

---

### 11. ONBOARDING - OTHER STEPS
**Files:** Various onboarding components  
**Total Issues:** 3  
**Severity:** MEDIUM  

| File | Line | Current | Recommendation |
|------|------|---------|---|
| `interest-selection.tsx` | 122 | `Step 2 of 4` | Add to onboarding.step_2 |
| `follow-creators.tsx` | 152 | `Step 3 of 4` | Add to onboarding.step_3 |
| `feature-tour.tsx` | 121 | `Step 4 of 4` | Add to onboarding.step_4 |

---

### 12. NOTIFICATIONS
**File:** `src/components/notifications/notification-center.tsx`  
**Total Issues:** 2  
**Severity:** MEDIUM  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 218 | `Notifications` | Heading | Add to notifications.heading |
| 247 | `No notifications yet` | Empty state | Add to emptyStates.noNotifications.title |

---

### 13. SEARCH FILTERS
**File:** `src/components/search/advanced-filters.tsx`  
**Total Issues:** 3  
**Severity:** MEDIUM  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 178 | `Tags` | Heading | Add to search.tags_heading |
| 195 | `AI Models` | Heading | Add to search.models_heading |
| 212 | `Date Range` | Heading | Add to search.date_range_heading |

---

### 14. SEARCH FORMS
**Files:** Various search components  
**Total Issues:** 3  
**Severity:** MEDIUM  

| File | Line | Current | Recommendation |
|------|------|---------|---|
| `saved-searches.tsx` | 109 | `placeholder="Name this search..."` | Add to search.name_placeholder |
| `saved-searches.tsx` | 124-125 | `No saved searches yet` / `Search for something...` | Already in translations |
| `search-autocomplete.tsx` | 182 | `placeholder="Search prompts, tags..."` | Already in translations |

---

### 15. UI COMPONENTS (Reusable)
**Files:** `src/components/ui/*.tsx`  
**Total Issues:** 8  
**Severity:** LOW  

| File | Line | Current | Recommendation |
|------|------|---------|---|
| `badge.tsx` | 146 | `aria-label="Remove"` | Add to ui.remove_aria |
| `button.tsx` | 138 | `Loading...` | Add to ui.loading |
| `dialog.tsx` | 49 | `Close` | Add to ui.close |
| `input.tsx` | 167 | `aria-label="Clear input"` | Add to ui.clear_input_aria |
| `sheet.tsx` | 70 | `Close` | Add to ui.close |
| `skeleton.tsx` | 57 | `aria-label="Loading..."` | Add to ui.loading_aria |
| `success-celebration.tsx` | 75 | `aria-label="Close"` | Add to ui.close_aria |
| `theme/theme-toggle.tsx` | 18, 37, 87 | `Toggle theme` | Add to theme.toggle |

**Fix Priority:** LOW (used across app)  
**Complexity:** Low

---

## PAGES

### 1. SETTINGS - NOTIFICATIONS
**File:** `src/app/settings/notifications/page.tsx`  
**Total Issues:** 1  
**Severity:** MEDIUM  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 45 | `Notification Settings` | Heading | Add to settings.notifications_heading |

---

### 2. NOT FOUND
**File:** `src/app/prompts/[id]/not-found.tsx`  
**Total Issues:** 1  
**Severity:** LOW  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 8 | `Prompt Not Found` | Heading | Add to prompts.not_found |

---

### 3. DESIGN SYSTEM TEST
**File:** `src/app/design-system-test/badge-test/page.tsx`  
**Total Issues:** 9  
**Severity:** LOW (Test page only)  

All hardcoded strings in this file are for testing purposes and can be left as-is or wrapped in translations.

---

## API ROUTES

### API Error Logging (24+ locations)
**Severity:** LOW  
**Recommendation:** Keep in English (console-only, developer-facing)  

These include:
- `"Error fetching prompts:"`
- `"Error in access API:"`
- `"Error optimizing prompt:"`
- `"Error creating prompt:"`
- etc.

**Note:** These are console.error() calls and are acceptable to remain in English as they are not user-facing.

---

## UTILITIES

### Email Notifications
**File:** `src/lib/email/send-notification.ts`  
**Total Issues:** 1  
**Severity:** MEDIUM  

| Line | Current | Type | Recommendation |
|------|---------|------|---|
| 161 | `Your week on Prompt Party` | Email subject | Add to email.week_summary_subject |

---

## SUMMARY BY SEVERITY

### CRITICAL (2 issues)
1. Dutch (nl) not enabled in i18n config
2. Language switcher missing Dutch option

### HIGH (80+ issues)
- Settings form: 9 strings
- API key manager: 5 strings
- Prompt playground: 10 strings
- Share/Embed buttons: 12 strings
- Editor components: 4 strings
- Comment management: 2 strings
- And 30+ more in various components

### MEDIUM (50+ issues)
- Placeholders in forms
- Helper text
- Status messages
- Aria-labels
- Headings and sections

### LOW (25+ issues)
- Console error messages (acceptable)
- UI component utilities
- Test page content

---

## TRANSLATION KEY STRUCTURE RECOMMENDATION

```
common/
├── ui/
│   ├── close
│   ├── loading
│   ├── toggle_theme
│   └── clear_input
├── buttons/
│   ├── save
│   ├── delete
│   └── upgrade
├── messages/
│   ├── success
│   ├── error
│   └── copied

prompts/
├── editor/
│   ├── placeholder
│   ├── write_tab
│   ├── preview_tab
│   └── markdown_helper
├── sharing/
│   ├── share_button
│   ├── share_twitter
│   ├── share_linkedin
│   ├── copy_link
│   ├── embed_button
│   └── embed_title
├── tools/
│   ├── ai_tester
│   ├── optimizer
│   └── quality_score
└── forms/
    ├── title_placeholder
    └── content_placeholder

profile/
├── settings/
│   ├── heading
│   ├── email_label
│   ├── display_name_label
│   ├── username_label
│   └── success_message
└── badges/
    └── heading

search/
├── tags
├── ai_models
├── date_range
└── placeholder

notifications/
├── heading
└── no_notifications

onboarding/
├── step_1
├── step_2
├── step_3
└── step_4

settings/
└── notifications/
    └── heading
```

