# Translation E2E Test Suite

Comprehensive end-to-end tests for validating translations across all 3 supported languages (English, French, Dutch) on all pages and components of the Prompt Party application.

## Overview

This test suite provides complete coverage for translation functionality:

- **55 pages** tested across 3 languages (165 page×language combinations)
- **Static page translations** (public pages, auth pages, tutorials)
- **Component translations** (navigation, forms, UI elements)
- **SEO metadata translations** (titles, descriptions, OG tags)
- **Accessibility translations** (ARIA labels, screen reader support)
- **Visual regression testing** (layout validation across translations)
- **Translation completeness** (detecting missing keys and gaps)

## Directory Structure

```
e2e/translations/
├── setup/
│   ├── translation-helpers.ts          # Common utilities for translation testing
│   └── visual-config.ts                # Visual regression testing config
├── completeness/
│   └── translation-keys.spec.ts        # Validation of translation file completeness
├── static-pages/
│   ├── public-pages.spec.ts            # 17 public pages (home, about, pricing, etc.)
│   ├── auth-pages.spec.ts              # 3 auth pages (login, signup, error)
│   └── tutorial-pages.spec.ts          # 18 tutorial pages + 3 learning paths
├── components/
│   ├── navigation.spec.ts              # Header, footer, breadcrumbs, menus
│   ├── forms.spec.ts                   # Form labels, validation messages, inputs
│   └── ui-elements.spec.ts             # Buttons, modals, toasts, empty states
├── seo/
│   └── metadata.spec.ts                # Page titles, meta descriptions, OG tags
├── accessibility/
│   └── aria-labels.spec.ts             # ARIA labels, screen reader support
└── visual/
    └── layout-regression.spec.ts       # Visual snapshots and layout validation
```

## Running Tests

### Run all translation tests
```bash
pnpm exec playwright test e2e/translations/
```

### Run by language
```bash
# English only
pnpm exec playwright test --project=translations-en

# French only
pnpm exec playwright test --project=translations-fr

# Dutch only
pnpm exec playwright test --project=translations-nl
```

### Run by test category
```bash
# Translation key completeness
pnpm exec playwright test e2e/translations/completeness/

# Static pages
pnpm exec playwright test e2e/translations/static-pages/

# Components
pnpm exec playwright test e2e/translations/components/

# SEO metadata
pnpm exec playwright test e2e/translations/seo/

# Accessibility
pnpm exec playwright test e2e/translations/accessibility/

# Visual regression
pnpm exec playwright test e2e/translations/visual/
```

### Run specific test file
```bash
pnpm exec playwright test e2e/translations/static-pages/public-pages.spec.ts
```

### Run with debug mode
```bash
pnpm exec playwright test e2e/translations/ --debug
```

### Update visual snapshots
```bash
pnpm exec playwright test e2e/translations/visual/ --update-snapshots
```

### View test report
```bash
pnpm exec playwright show-report
```

## Test Categories

### 1. Translation Keys Completeness (`completeness/translation-keys.spec.ts`)
- Validates all translation keys exist in all 3 languages
- Detects missing translations
- Checks for empty translation values
- Compares key counts and structure
- Validates interpolation variables

**Key Tests:**
- Consistent key counts across EN/FR/NL
- No missing translations in FR/NL
- No empty values
- Matching top-level namespaces

### 2. Public Pages (`static-pages/public-pages.spec.ts`)
Tests 17 public pages for proper translations:
- Home `/`
- About `/about`
- FAQ `/faq`
- Terms `/terms`
- Privacy `/privacy`
- Pricing `/pricing`
- Docs `/docs`
- Tech Stack `/tech-stack`
- MCP pages
- Feed pages (Top, Trending, Search)
- Leaderboard `/leaderboard`
- Challenges `/challenges`
- Access `/access`

**Key Tests:**
- Page visibility and structure
- Translated content display
- Language switcher functionality
- Mobile responsiveness
- Language persistence across navigation

### 3. Auth Pages (`static-pages/auth-pages.spec.ts`)
Tests authentication pages for translations:
- Login `/auth/login`
- Signup `/auth/signup`
- Auth error `/auth/auth-code-error`

**Key Tests:**
- Form fields displayed in all languages
- Validation messages translated
- Error messages in correct language
- OAuth buttons accessible
- Mobile form experience

### 4. Tutorial Pages (`static-pages/tutorial-pages.spec.ts`)
Tests 18 tutorial pages + 3 learning paths:
- Tutorial index `/tutorials`
- Individual tutorials (Claude Basics, Advanced Prompting, etc.)
- Learning paths (Beginner, Pro, Expert)

**Key Tests:**
- Tutorial cards with metadata (duration, level)
- Tutorial content structure
- Pro tips displayed correctly
- Navigation between tutorials
- Progress tracking indicators
- Mobile layout

### 5. Navigation Components (`components/navigation.spec.ts`)
Tests navigation elements across the app:
- Header navigation links
- Footer links and structure
- Breadcrumb navigation
- Mobile menu (hamburger)
- Language switcher
- Active state indicators

**Key Tests:**
- Navigation visibility
- Link accessibility
- Language persistence
- Mobile menu functionality
- Semantic navigation structure

### 6. Forms (`components/forms.spec.ts`)
Tests form elements and validation:
- Login form
- Signup form
- Create prompt form
- Form field labels and placeholders
- Validation messages
- Error feedback

**Key Tests:**
- Form labels associated with inputs
- Placeholders visible
- Validation errors translated
- Password requirements
- Form accessibility (ARIA)
- Mobile input sizes

### 7. UI Elements (`components/ui-elements.spec.ts`)
Tests interactive UI components:
- Buttons with translated text
- Empty states
- Toast notifications
- Modals/dialogs
- Badges and labels
- Links and anchors
- Icon accessibility

**Key Tests:**
- Button text readability
- Empty state messages
- Modal content visibility
- Badge content
- Link context and text
- Icon alt text/aria-labels

### 8. SEO Metadata (`seo/metadata.spec.ts`)
Tests translated metadata for SEO:
- Page `<title>` tags
- Meta descriptions
- OpenGraph tags (og:title, og:description, og:image)
- Twitter card metadata
- Canonical URLs
- Language meta tags
- Robots directives

**Key Tests:**
- Unique titles per page
- Proper description length (150-160 chars)
- OG tags for social sharing
- Consistent formats across languages
- Canonical tag presence

### 9. Accessibility (`accessibility/aria-labels.spec.ts`)
Tests accessibility features with translations:
- ARIA labels on buttons
- Form field associations
- Navigation landmarks
- Heading hierarchy
- Image alt text
- Link context
- Screen reader text
- Color contrast
- Focus indicators

**Key Tests:**
- Icon buttons have aria-labels
- Form inputs have labels or aria-labels
- Proper semantic structure
- Skip links for keyboard users
- Screen reader friendly content
- Accessible heading hierarchy

### 10. Visual Regression (`visual/layout-regression.spec.ts`)
Tests layout stability across translations:
- Desktop/tablet/mobile snapshots
- Text overflow detection
- Text cutoff detection
- Button sizing consistency
- Horizontal scroll detection
- Responsive layout validation
- Typography consistency
- Card layout stability
- Navigation height stability

**Key Tests:**
- No horizontal scrolling
- Text doesn't overflow containers
- Buttons maintain alignment
- Form fields properly aligned
- Cards have consistent heights
- Navigation stable across languages

## Translation Helpers

The test suite provides utility functions in `setup/translation-helpers.ts`:

```typescript
// Switch application language
await switchLanguage(page, 'fr')

// Load translation messages
const messages = loadTranslations('en')

// Get nested translation value
const title = getTranslation(messages, 'nav.home')

// Test function in all 3 languages
await testInAllLanguages(page, async (locale) => {
  // Test code runs for EN, FR, NL
})

// Find missing translations
const missing = findMissingTranslations(enMessages, frMessages)

// Compare translation counts
const counts = compareTranslationCounts()

// Check for empty translations
const empty = findEmptyTranslations(messages)
```

## Visual Configuration

The test suite provides visual testing utilities in `setup/visual-config.ts`:

```typescript
// Take screenshot for visual regression
await takeVisualSnapshot(page, 'testName', 'en')

// Check for text overflow
const overflows = await checkForTextOverflow(page)

// Check for text cutoff
const cutoffs = await checkForTextCutoff(page)

// Validate button sizes
const issues = await validateInteractiveElementSizes(page)

// Check horizontal scroll
const hasScroll = await checkHorizontalScroll(page)

// Generate visual report
const report = await generateVisualReport(page, 'Page Name', 'en')
```

## Expected Test Results

### Typical Coverage
- **Total Tests:** ~500+ assertions
- **Languages Tested:** 3 (EN, FR, NL)
- **Pages Covered:** 55
- **Components Tested:** 30+
- **Estimated Run Time:** 15-30 minutes (all tests in parallel)

### Success Criteria
- ✅ All translation keys exist in all 3 languages
- ✅ No empty translation values
- ✅ No text overflow or cutoff issues
- ✅ No horizontal scrolling on any viewport
- ✅ All buttons/forms properly sized
- ✅ Navigation accessible and functioning
- ✅ ARIA labels present where needed
- ✅ SEO metadata properly formatted
- ✅ Mobile layout responsive

## Common Issues and Troubleshooting

### Issue: "Translation key not found"
**Solution:** Verify the key exists in messages/en.json and is properly nested

### Issue: "Text overflow detected"
**Solution:** Check container widths and text length. Consider ellipsis or better wrapping.

### Issue: "Horizontal scroll detected on mobile"
**Solution:** Check for fixed-width elements. Use responsive width: auto or max-width: 100vw

### Issue: "Button size too small"
**Solution:** Ensure buttons are at least 44x44px for mobile touch targets

### Issue: "Missing aria-labels"
**Solution:** Add aria-label to icon-only buttons or form inputs without visible labels

### Issue: "Visual snapshot mismatch"
**Solution:** Review the difference. If expected, update snapshots with --update-snapshots flag

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Translation E2E Tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm exec playwright install
      - run: pnpm exec playwright test e2e/translations/
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Best Practices

1. **Run Before PR:** Always run translation tests before creating pull requests
2. **Update Translations Together:** When adding new keys, add to all 3 language files
3. **Test Locally First:** Run tests locally before pushing to catch issues early
4. **Use Helper Functions:** Use provided helpers (`testInAllLanguages`, `switchLanguage`) for consistency
5. **Check Mobile:** Don't forget to test mobile layouts with translations
6. **Verify New Pages:** Always add translation tests when creating new pages
7. **Monitor Snapshots:** Review visual snapshots before updating baselines

## Maintenance

### Adding New Page Tests
1. Create test in appropriate file (`public-pages.spec.ts`, etc.)
2. Include tests for all 3 languages using `testInAllLanguages()`
3. Add visual regression snapshot test in `layout-regression.spec.ts`
4. Verify SEO metadata in `metadata.spec.ts`

### Updating Translations
1. Update all 3 language files simultaneously
2. Run completeness tests to verify: `pnpm exec playwright test translations/completeness/`
3. Run affected page tests: `pnpm exec playwright test --project=translations-en`
4. Review visual snapshots for layout changes

### Keeping Tests Current
- Review monthly for new pages not yet tested
- Add new translation keys to completeness tests
- Update snapshots when layout/styling changes intentionally
- Monitor for flaky tests and add waits as needed

## Documentation

- **CLAUDE.md:** Project overview and tech stack
- **This README:** Translation E2E test suite documentation
- **Test Files:** Inline comments explaining each test

## Support

For issues or questions:
1. Check test failure messages and logs
2. Review the relevant test file for what's being tested
3. Consult translation helpers documentation
4. Check visual snapshots in `playwright-report/`
