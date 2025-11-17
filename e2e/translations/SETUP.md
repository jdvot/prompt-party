# Translation E2E Test Suite - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (package manager)
- Existing Next.js app running on `http://localhost:3001`

### Installation

The translation test suite is already integrated into the project. No additional installation needed!

```bash
# Install dependencies (if needed)
pnpm install

# Install Playwright browsers
pnpm exec playwright install
```

### Running Tests

```bash
# Run all translation tests
pnpm exec playwright test e2e/translations/

# Run specific test category
pnpm exec playwright test e2e/translations/completeness/
pnpm exec playwright test e2e/translations/static-pages/
pnpm exec playwright test e2e/translations/components/
pnpm exec playwright test e2e/translations/seo/
pnpm exec playwright test e2e/translations/accessibility/
pnpm exec playwright test e2e/translations/visual/

# Run for specific language
pnpm exec playwright test --project=translations-en
pnpm exec playwright test --project=translations-fr
pnpm exec playwright test --project=translations-nl

# Debug mode
pnpm exec playwright test e2e/translations/ --debug

# View report
pnpm exec playwright show-report
```

## File Structure

```
e2e/translations/
│
├── setup/
│   ├── translation-helpers.ts       # Core utilities for translation testing
│   └── visual-config.ts             # Visual regression configuration
│
├── completeness/
│   └── translation-keys.spec.ts     # Translation file validation (4 tests)
│
├── static-pages/
│   ├── public-pages.spec.ts         # 17 public pages (25+ tests)
│   ├── auth-pages.spec.ts           # 3 auth pages (10+ tests)
│   └── tutorial-pages.spec.ts       # 18 tutorial pages (20+ tests)
│
├── components/
│   ├── navigation.spec.ts           # Navigation elements (10+ tests)
│   ├── forms.spec.ts                # Form validation (10+ tests)
│   └── ui-elements.spec.ts          # UI components (15+ tests)
│
├── seo/
│   └── metadata.spec.ts             # SEO metadata (15+ tests)
│
├── accessibility/
│   └── aria-labels.spec.ts          # ARIA & a11y (15+ tests)
│
├── visual/
│   └── layout-regression.spec.ts    # Visual regression (20+ tests)
│
├── README.md                        # Detailed documentation
├── SETUP.md                         # This file
└── .gitignore                       # (if needed)
```

## Test Coverage Summary

### Total Test Count: ~150+ tests
- **Completeness:** 10 tests
- **Static Pages:** 55 tests
- **Components:** 35 tests
- **SEO:** 15 tests
- **Accessibility:** 15 tests
- **Visual:** 20 tests

### Languages: 3 (EN, FR, NL)
### Pages Tested: 55
### Components Tested: 30+

## What Gets Tested

### 1. Translation Completeness ✅
- All keys exist in EN, FR, NL
- No missing or empty translations
- Consistent key structure across languages
- Proper variable interpolation

### 2. Static Pages ✅
**Public Pages (17):**
- Home, About, FAQ, Terms, Privacy, Pricing, Docs
- Tech Stack, MCP pages, Feed (Top, Trending, Search)
- Leaderboard, Challenges, Access

**Auth Pages (3):**
- Login, Signup, Auth Error

**Tutorial Pages (18):**
- Tutorial Index + 14 individual tutorials
- 3 learning paths (Beginner, Pro, Expert)

### 3. Components ✅
**Navigation:**
- Header navigation, footer, breadcrumbs
- Mobile menu (hamburger), language switcher
- Link accessibility, active states

**Forms:**
- Login, signup, create prompt forms
- Field labels and placeholders
- Validation messages and errors
- Mobile input sizing

**UI Elements:**
- Button translations
- Empty states
- Toasts/notifications
- Modals and dialogs
- Badges, links, icons

### 4. SEO Metadata ✅
- Page titles (translated)
- Meta descriptions
- OpenGraph tags (og:title, og:description, og:image)
- Twitter card metadata
- Canonical URLs
- Language tags (hreflang)
- Robots directives

### 5. Accessibility ✅
- ARIA labels on buttons and icons
- Form field associations
- Semantic HTML structure
- Navigation landmarks
- Heading hierarchy (H1-H6)
- Image alt text
- Link context and text
- Screen reader support
- Color contrast
- Keyboard navigation

### 6. Visual Regression ✅
- Desktop/tablet/mobile snapshots
- Text overflow detection
- Text cutoff (line-clamp) issues
- Button size consistency
- Form field alignment
- Card layout stability
- Typography consistency
- Horizontal scroll detection
- No layout shifts across languages

## Key Helper Functions

### Translation Helpers (`setup/translation-helpers.ts`)

```typescript
// Switch language in tests
await switchLanguage(page, 'fr')

// Load translation messages
const messages = loadTranslations('en')

// Get nested translation
const value = getTranslation(messages, 'nav.home')

// Test in all 3 languages
await testInAllLanguages(page, async (locale) => {
  // Your test code
})

// Test in specific languages
await testInLanguages(page, ['en', 'fr'], async (locale) => {
  // Your test code
})

// Find missing translations (FR/NL vs EN)
const missing = findMissingTranslations(enMessages, frMessages)

// Compare key counts
const counts = compareTranslationCounts()

// Find empty translations
const empty = findEmptyTranslations(messages)

// Get all translation keys
const keys = getAllTranslationKeys(messages)

// Verify locale cookie
const isCorrect = await verifyLocaleCookie(page, 'en')
```

### Visual Config Helpers (`setup/visual-config.ts`)

```typescript
// Take screenshot for regression
await takeVisualSnapshot(page, 'testName', 'en')

// Set viewport size
await setViewport(page, 'desktop') // desktop, tablet, mobile

// Check text overflow
const overflows = await checkForTextOverflow(page)

// Check text cutoff
const cutoffs = await checkForTextCutoff(page)

// Validate element sizes
const issues = await validateInteractiveElementSizes(page)

// Check horizontal scroll
const hasScroll = await checkHorizontalScroll(page)

// Generate detailed report
const report = await generateVisualReport(page, 'Home', 'en')
```

## Test Execution Order (Recommended)

### 1. Run Completeness Tests First
```bash
pnpm exec playwright test e2e/translations/completeness/
```
✅ Validates translation files are complete and correct

### 2. Run Static Page Tests
```bash
pnpm exec playwright test e2e/translations/static-pages/
```
✅ Ensures all pages load and display translated content

### 3. Run Component Tests
```bash
pnpm exec playwright test e2e/translations/components/
```
✅ Validates forms, navigation, and UI elements

### 4. Run SEO & Accessibility Tests
```bash
pnpm exec playwright test e2e/translations/seo/
pnpm exec playwright test e2e/translations/accessibility/
```
✅ Ensures proper metadata and accessibility

### 5. Run Visual Regression Tests
```bash
pnpm exec playwright test e2e/translations/visual/
```
✅ Detects layout issues caused by translated text

### 6. View Report
```bash
pnpm exec playwright show-report
```

## Configuration

### Browser Settings
- **Default Browser:** Chromium
- **Viewport:** 1280x720 (desktop), 768x1024 (tablet), 375x667 (mobile)
- **Timeout:** 60 seconds per test
- **Retries:** 0 (locally), 2 (CI)

### Language Projects (in `playwright.config.ts`)
```typescript
{
  name: 'translations-en',
  testDir: './e2e/translations',
  locale: 'en-US'
},
{
  name: 'translations-fr',
  testDir: './e2e/translations',
  locale: 'fr-FR'
},
{
  name: 'translations-nl',
  testDir: './e2e/translations',
  locale: 'nl-NL'
}
```

## Troubleshooting

### Tests Won't Start
```bash
# Make sure dev server is running
PORT=3001 pnpm dev

# In another terminal
pnpm exec playwright test e2e/translations/
```

### "Cannot find module" Errors
```bash
# Reinstall dependencies
pnpm install

# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Tests Timing Out
```bash
# Increase timeout in specific test
test.setTimeout(120000) // 120 seconds

# Or set globally in playwright.config.ts
timeout: 120000
```

### Visual Snapshot Mismatches
```bash
# Review the difference in playwright-report
pnpm exec playwright show-report

# Update snapshots if changes are intentional
pnpm exec playwright test e2e/translations/visual/ --update-snapshots
```

### Language Switcher Not Working
- Check that `NEXT_LOCALE` cookie is being set
- Verify next-intl is properly configured
- Check `src/i18n/request.ts` for locale detection

## Best Practices

1. **Always run locally first** before pushing
   ```bash
   pnpm exec playwright test e2e/translations/
   ```

2. **Test in all 3 languages** when making changes
   ```bash
   pnpm exec playwright test --project=translations-en
   pnpm exec playwright test --project=translations-fr
   pnpm exec playwright test --project=translations-nl
   ```

3. **Update translations atomically** - add to all 3 files at once

4. **Check visual impact** - run visual tests after layout changes
   ```bash
   pnpm exec playwright test e2e/translations/visual/
   ```

5. **Add tests for new pages** - don't rely only on existing tests

6. **Use test.describe** for organization:
   ```typescript
   test.describe('Feature Name', () => {
     test('should do X in all languages', async ({ page }) => {
       // Test
     })
   })
   ```

7. **Leverage helpers** - use `testInAllLanguages()` for DRY tests

8. **Keep tests focused** - one test = one assertion when possible

## Integration with CI/CD

### GitHub Actions Example
```yaml
- name: Run Translation E2E Tests
  run: pnpm exec playwright test e2e/translations/
```

### Selective Testing
```bash
# Run only completeness tests in CI
pnpm exec playwright test e2e/translations/completeness/

# Run only critical tests
pnpm exec playwright test e2e/translations/static-pages/public-pages.spec.ts
```

## Performance Tips

### Run Tests in Parallel
```bash
# Default: runs in parallel
pnpm exec playwright test e2e/translations/

# Reduce workers to save resources
pnpm exec playwright test e2e/translations/ --workers=2
```

### Skip Slow Tests During Development
```bash
# Tag tests with @slow
// test.skip('@slow', () => { ... })

# Run without slow tests
pnpm exec playwright test e2e/translations/ --grep-invert @slow
```

## Next Steps

1. **Run the tests:** `pnpm exec playwright test e2e/translations/`
2. **Review results:** `pnpm exec playwright show-report`
3. **Check coverage:** Look at which pages/components are tested
4. **Add custom tests:** Extend for your specific needs
5. **Integrate with CI:** Add to your GitHub Actions workflow

## Support & Maintenance

### Adding New Tests
- Copy template from existing test file
- Use helpers from `setup/translation-helpers.ts`
- Follow naming convention: `describe('Feature - Translations')`

### Updating Existing Tests
- Keep translation-aware
- Test in all 3 languages
- Update snapshots thoughtfully
- Add comments for complex logic

### Troubleshooting Tests
1. Check test output: `pnpm exec playwright test --reporter=verbose`
2. Use debug mode: `pnpm exec playwright test --debug`
3. Review trace: Check artifacts in `playwright-report/`

## Related Documentation

- **README.md** - Complete test documentation
- **CLAUDE.md** - Project setup and conventions
- **playwright.config.ts** - Playwright configuration
- **messages/{locale}.json** - Translation files
