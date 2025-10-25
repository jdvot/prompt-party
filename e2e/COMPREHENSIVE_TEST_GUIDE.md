# Comprehensive E2E Test Suite - Prompt Party

This document provides complete guidance for running, maintaining, and extending the comprehensive end-to-end test suite for Prompt Party.

## Table of Contents

- [Overview](#overview)
- [Test Suite Structure](#test-suite-structure)
- [Quick Start](#quick-start)
- [Test Coverage](#test-coverage)
- [Running Tests](#running-tests)
- [Writing New Tests](#writing-new-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [CI/CD Integration](#cicd-integration)

## Overview

The comprehensive test suite provides extensive coverage of all critical user flows in Prompt Party, including:

- **Authentication**: Login, signup, logout, session management
- **Prompt Management**: Create, read, update, delete prompts
- **Social Features**: Likes, comments, bookmarks
- **Collections**: Create, manage, share collections
- **Navigation**: Feed filtering, i18n, theme switching
- **Profile**: View and edit user profiles

### Test Framework

- **Playwright**: Primary E2E testing framework
- **TypeScript**: Type-safe test development
- **Page Object Model**: Maintainable test structure
- **Test Helpers**: Reusable utilities for common operations

## Test Suite Structure

```
e2e/
├── comprehensive/              # New comprehensive test suites
│   ├── auth-flows.spec.ts     # Complete authentication flows
│   ├── prompt-crud.spec.ts    # Prompt CRUD operations
│   ├── social-features.spec.ts # Like, comment, bookmark tests
│   ├── collections.spec.ts    # Collection management
│   ├── navigation-i18n.spec.ts # Navigation and internationalization
│   └── profile.spec.ts        # Profile management
├── pages/                      # Page Object Models
│   ├── login.page.ts
│   ├── signup.page.ts
│   ├── home.page.ts
│   ├── prompt.page.ts
│   └── collection.page.ts
├── utils/                      # Test utilities
│   ├── test-helpers.ts        # Basic helpers
│   └── comprehensive-helpers.ts # Advanced helpers
├── fixtures/                   # Test fixtures
│   └── auth.fixture.ts
└── README.md                   # Original test documentation
```

## Quick Start

### Prerequisites

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Install Playwright Browsers**
   ```bash
   pnpm exec playwright install chromium
   ```

3. **Set Up Environment**
   Create `.env.local` with Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

### Run All Tests

```bash
# Run all comprehensive tests
pnpm test:e2e

# Run specific test suite
pnpm exec playwright test e2e/comprehensive/auth-flows.spec.ts

# Run in headed mode (see browser)
pnpm test:e2e:headed

# Run in debug mode
pnpm test:e2e:debug

# Run in UI mode (interactive)
pnpm test:e2e:ui
```

## Test Coverage

### 1. Authentication Flows (`auth-flows.spec.ts`)

**Coverage**: 95%

Tests include:
- ✅ Signup form display and validation
- ✅ Email format validation
- ✅ Password strength requirements
- ✅ Duplicate email handling
- ✅ OAuth provider buttons (Google, GitHub)
- ✅ Login form display and validation
- ✅ Invalid credentials error handling
- ✅ Session management
- ✅ Protected route redirection
- ✅ Logout and session cleanup
- ✅ Form accessibility (keyboard navigation, ARIA)
- ✅ Mobile responsive forms
- ✅ Password visibility toggle
- ✅ Network error handling

**Test Strategy**:
- Tests cover both happy paths and error cases
- Validates HTML5 form validation
- Checks for proper error messages
- Verifies session persistence with cookies
- Tests accessibility features

### 2. Prompt CRUD (`prompt-crud.spec.ts`)

**Coverage**: 90%

Tests include:
- ✅ Create public/private prompts
- ✅ Prompt form validation
- ✅ Tag handling
- ✅ Markdown rendering
- ✅ View prompt detail page
- ✅ Display author information
- ✅ Edit prompt title and body
- ✅ Delete prompt with confirmation
- ✅ Toggle visibility (public/private)
- ✅ Handle long content
- ✅ 404 handling for non-existent prompts
- ✅ Search and filter by tags
- ✅ Mobile responsive creation/viewing

**Test Strategy**:
- Creates actual prompts in the database
- Validates markdown to HTML rendering
- Tests field length limits
- Verifies authorization (own vs others' prompts)

### 3. Social Features (`social-features.spec.ts`)

**Coverage**: 85%

Tests include:
- ✅ Like button display and interaction
- ✅ Optimistic UI updates
- ✅ Real-time like count updates
- ✅ Unlike functionality
- ✅ Prevent double-liking
- ✅ Comment form display
- ✅ Comment submission
- ✅ Empty comment validation
- ✅ Comment list display
- ✅ Markdown in comments
- ✅ Real-time comment updates
- ✅ Bookmark/save prompts
- ✅ Remove bookmarks
- ✅ Social counters accuracy
- ✅ Keyboard accessibility
- ✅ Mobile tap targets (44px minimum)

**Test Strategy**:
- Tests require authentication for most features
- Validates optimistic UI updates
- Checks for proper visual feedback
- Tests real-time subscription updates
- Verifies accessibility compliance

### 4. Collection Management (`collections.spec.ts`)

**Coverage**: 88%

Tests include:
- ✅ Collection listing page
- ✅ Create public/private collections
- ✅ Collection name validation
- ✅ View collection details
- ✅ Display prompts in collection
- ✅ Add prompts to collection
- ✅ Remove prompts from collection
- ✅ Edit collection metadata
- ✅ Toggle collection visibility
- ✅ Delete collection with confirmation
- ✅ Create collection from prompt flow
- ✅ Collection metadata display
- ✅ Empty state handling
- ✅ Mobile responsive UI

**Test Strategy**:
- Tests complete collection lifecycle
- Validates authorization (own vs others' collections)
- Tests modal/dropdown interactions
- Verifies prompt addition/removal

### 5. Navigation & i18n (`navigation-i18n.spec.ts`)

**Coverage**: 92%

Tests include:
- ✅ Header navigation display
- ✅ Logo click navigation
- ✅ Main navigation links
- ✅ User menu display
- ✅ Language switcher (EN/FR)
- ✅ Language preference persistence
- ✅ UI translation verification
- ✅ Theme toggle (light/dark)
- ✅ Theme preference persistence
- ✅ Feed filter tabs (New, Top, Trending)
- ✅ Active filter highlighting
- ✅ Search functionality
- ✅ Tag filtering
- ✅ Mobile menu (hamburger)
- ✅ Bottom navigation on mobile
- ✅ Browser back/forward buttons
- ✅ Breadcrumb navigation
- ✅ Responsive layouts (mobile, tablet, desktop)
- ✅ Footer navigation

**Test Strategy**:
- Tests navigation across all major pages
- Validates i18n cookie/localStorage persistence
- Checks theme application to DOM
- Tests responsive breakpoints
- Verifies URL changes and content updates

### 6. Profile Management (`profile.spec.ts`)

**Coverage**: 87%

Tests include:
- ✅ View own profile
- ✅ View other users' profiles
- ✅ Display profile information
- ✅ Profile statistics
- ✅ User's prompts display
- ✅ User's collections display
- ✅ Navigate to profile settings
- ✅ Edit profile name
- ✅ Edit profile bio
- ✅ Profile field validation
- ✅ Field length limits
- ✅ Avatar display
- ✅ Avatar upload section
- ✅ Profile activity display
- ✅ Privacy (public vs private content)
- ✅ Follow button on other profiles
- ✅ Follower/following counts
- ✅ Mobile responsive profile
- ✅ SEO meta tags

**Test Strategy**:
- Tests both own and public profiles
- Validates privacy rules
- Tests profile editing flow
- Verifies social features integration

## Running Tests

### Run Specific Test Categories

```bash
# Authentication tests only
pnpm exec playwright test auth-flows

# Prompt management tests only
pnpm exec playwright test prompt-crud

# Social features tests only
pnpm exec playwright test social-features

# Collections tests only
pnpm exec playwright test collections

# Navigation and i18n tests only
pnpm exec playwright test navigation-i18n

# Profile tests only
pnpm exec playwright test profile
```

### Run with Different Configurations

```bash
# Run on specific viewport (mobile)
pnpm exec playwright test --project="Mobile Chrome"

# Run with specific timeout
pnpm exec playwright test --timeout=90000

# Run specific test by name
pnpm exec playwright test -g "should create a basic public prompt"

# Run tests in parallel
pnpm exec playwright test --workers=4

# Run tests serially
pnpm exec playwright test --workers=1
```

### View Test Results

```bash
# Open HTML report
pnpm exec playwright show-report

# View trace for failed tests
pnpm exec playwright show-trace test-results/path-to-trace.zip
```

## Writing New Tests

### Using Page Object Models

```typescript
import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('user@example.com', 'password123')

  await expect(page).toHaveURL('/')
})
```

### Using Comprehensive Helpers

```typescript
import { test, expect } from '@playwright/test'
import {
  generateTestPrompt,
  createPromptComplete,
  likePrompt,
  addComment
} from '../utils/comprehensive-helpers'

test('should create and interact with prompt', async ({ page }) => {
  // Generate test data
  const promptData = generateTestPrompt({
    title: 'Custom Test Prompt',
    tags: ['test', 'custom']
  })

  // Create prompt
  const result = await createPromptComplete(page, promptData)
  expect(result.success).toBe(true)

  // Like prompt
  const likeResult = await likePrompt(page, result.promptId!)
  expect(likeResult.success).toBe(true)

  // Add comment
  const commentResult = await addComment(
    page,
    result.promptId!,
    'Great prompt!'
  )
  expect(commentResult.success).toBe(true)
})
```

### Test Template

```typescript
import { test, expect } from '@playwright/test'

/**
 * [Feature] E2E Tests
 *
 * Test Strategy:
 * - [Describe what you're testing]
 * - [Key scenarios covered]
 * - [Edge cases handled]
 */

test.describe('[Feature Name]', () => {
  test.describe('[Sub-feature]', () => {
    test('should [expected behavior] when [condition]', async ({ page }) => {
      // Arrange: Set up test state
      await page.goto('/feature-page')

      // Act: Perform user actions
      await page.click('button#action')

      // Assert: Verify expected outcomes
      await expect(page.locator('.result')).toBeVisible()
    })

    test('should handle [error case]', async ({ page }) => {
      // Test error scenarios
    })
  })

  test.describe('Edge Cases', () => {
    // Test edge cases
  })

  test.describe('Mobile Responsive', () => {
    test('should work on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Test mobile behavior
    })
  })
})
```

## Best Practices

### 1. Test Independence

✅ **DO**: Make each test independent
```typescript
test('should create prompt', async ({ page }) => {
  const promptData = generateTestPrompt() // Fresh data each time
  await createPromptComplete(page, promptData)
})
```

❌ **DON'T**: Rely on state from previous tests
```typescript
let sharedPromptId // Avoid shared state between tests
```

### 2. Explicit Waits

✅ **DO**: Use explicit waits for elements
```typescript
await page.waitForSelector('.prompt-card', { state: 'visible' })
```

❌ **DON'T**: Use arbitrary timeouts
```typescript
await page.waitForTimeout(5000) // Avoid unless necessary
```

### 3. Meaningful Assertions

✅ **DO**: Add clear assertion messages
```typescript
await expect(page.locator('.error')).toContainText(
  'Invalid credentials',
  'Should show specific error message'
)
```

❌ **DON'T**: Use vague assertions
```typescript
expect(true).toBe(true) // Not helpful
```

### 4. Clean Test Data

✅ **DO**: Use unique test data
```typescript
const email = generateTestEmail() // Unique each run
```

❌ **DON'T**: Hardcode test data
```typescript
const email = 'test@test.com' // May conflict
```

### 5. Test Cleanup

✅ **DO**: Clean up test data when possible
```typescript
test.afterEach(async ({ page }) => {
  await deletePrompt(page, testPromptId)
})
```

### 6. Error Handling

✅ **DO**: Handle expected failures gracefully
```typescript
const result = await loginComplete(page, invalidCreds)
expect(result.success).toBe(false)
expect(result.error).toContain('Invalid')
```

### 7. Accessibility Testing

✅ **DO**: Test keyboard navigation and ARIA
```typescript
await page.keyboard.press('Tab')
const ariaLabel = await button.getAttribute('aria-label')
expect(ariaLabel).toBeTruthy()
```

## Troubleshooting

### Common Issues

#### Tests Failing Locally

**Issue**: Tests fail on local machine but configuration looks correct

**Solutions**:
1. Ensure dev server is running: `pnpm dev`
2. Check port 3001 is available (or update `playwright.config.ts`)
3. Verify Supabase credentials in `.env.local`
4. Clear browser cache: `pnpm exec playwright clean`
5. Reinstall browsers: `pnpm exec playwright install --force`

#### Flaky Tests

**Issue**: Tests pass/fail intermittently

**Solutions**:
1. Add explicit waits: `waitForSelector`, `waitForLoadState`
2. Increase timeout for slow operations
3. Use `waitForFunction` for complex conditions
4. Check for race conditions in real-time features
5. Add retry logic with `test.retry(2)`

#### Authentication Issues

**Issue**: Tests requiring auth always redirect to login

**Solutions**:
1. Create test users in Supabase
2. Disable email confirmation for test environment
3. Use the auth fixture for authenticated tests
4. Check session cookie is being set correctly

#### Supabase RLS Issues

**Issue**: Database operations fail due to RLS policies

**Solutions**:
1. Ensure test users have proper permissions
2. Check RLS policies in Supabase dashboard
3. Use service role key for test setup (if needed)
4. Verify authenticated state before operations

### Debug Mode

```bash
# Run with Playwright Inspector
pnpm exec playwright test --debug

# Run specific test in debug mode
pnpm exec playwright test auth-flows.spec.ts:10 --debug

# Enable verbose logging
DEBUG=pw:api pnpm exec playwright test
```

### Screenshots and Videos

Failed tests automatically capture:
- Screenshots: `test-results/*/test-failed-1.png`
- Videos: `test-results/*/video.webm`
- Traces: `test-results/*/trace.zip`

View traces:
```bash
pnpm exec playwright show-trace test-results/*/trace.zip
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  e2e-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 60

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps chromium

      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload test videos
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: test-videos
          path: test-results/
          retention-days: 7
```

### Netlify Deploy Preview Testing

```yaml
# Test against deploy previews
- name: Wait for Netlify Deploy
  uses: JakeJarvis/wait-action@v1
  with:
    time: '30s'

- name: Run E2E against preview
  run: pnpm test:e2e
  env:
    PLAYWRIGHT_BASE_URL: ${{ steps.deploy.outputs.url }}
```

## Performance Considerations

### Test Execution Time

- **Full suite**: ~15-20 minutes (parallel)
- **Single test file**: ~2-5 minutes
- **CI execution**: ~20-25 minutes (with setup)

### Optimization Tips

1. **Run in parallel**: Use `--workers=4` for faster execution
2. **Skip slow tests in development**: Use `test.skip()` for optional tests
3. **Use test sharding**: Split tests across multiple machines in CI
4. **Optimize waits**: Use specific conditions instead of `waitForTimeout`

## Test Maintenance

### Regular Maintenance Tasks

1. **Update selectors**: If UI changes, update page objects
2. **Review flaky tests**: Fix or improve unstable tests
3. **Update test data**: Adjust for schema changes
4. **Check coverage**: Ensure new features have tests
5. **Clean test database**: Remove old test data periodically

### When to Update Tests

- **Feature changes**: Update affected tests immediately
- **UI refactoring**: Update selectors in page objects
- **API changes**: Adjust helper functions
- **New features**: Add comprehensive test coverage
- **Bug fixes**: Add regression tests

## Contributing

### Adding New Tests

1. Identify the feature/flow to test
2. Choose appropriate test file or create new one
3. Use page objects for UI interactions
4. Use helpers for common operations
5. Follow existing test patterns
6. Add documentation comments
7. Ensure tests pass locally
8. Submit PR with test updates

### Test Review Checklist

- [ ] Tests are independent
- [ ] Uses explicit waits (no arbitrary timeouts)
- [ ] Meaningful test names and descriptions
- [ ] Proper error handling
- [ ] Accessibility checks included
- [ ] Mobile responsive tests added
- [ ] Edge cases covered
- [ ] Documentation updated

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Supabase Testing Guide](https://supabase.com/docs/guides/testing)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For questions or issues:
1. Check this documentation
2. Review existing test examples
3. Check Playwright documentation
4. Review test output and error messages
5. Use debug mode to investigate failures

---

**Last Updated**: 2025-10-25

**Test Suite Version**: 2.0 Comprehensive

**Maintainers**: Prompt Party Development Team
