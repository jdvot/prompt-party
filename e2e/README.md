# E2E Tests for Prompt Party

Comprehensive end-to-end tests using Playwright to verify all major user flows in the Prompt Party application.

## Overview

This E2E test suite provides extensive coverage of the Prompt Party application, testing real user scenarios across authentication, prompt management, social features, and navigation.

## Test Structure

```
e2e/
├── README.md                 # This file
├── fixtures/
│   └── auth.fixture.ts       # Authentication fixtures for authenticated tests
├── pages/                    # Page Object Models
│   ├── login.page.ts
│   ├── signup.page.ts
│   ├── home.page.ts
│   ├── prompt.page.ts
│   ├── collection.page.ts
│   └── ...
├── utils/
│   └── test-helpers.ts       # Shared test utilities and helpers
└── *.spec.ts                 # Test specifications
    ├── auth.spec.ts          # Authentication tests
    ├── prompts.spec.ts       # Prompt creation and viewing
    ├── likes.spec.ts         # Like functionality
    ├── comments.spec.ts      # Comments and real-time updates
    ├── remix.spec.ts         # Remix/fork functionality
    ├── collections.spec.ts   # Collections management
    ├── profile.spec.ts       # User profiles
    └── navigation.spec.ts    # Navigation and feed filtering
```

## Test Coverage

### 1. Authentication (`auth.spec.ts`)
- ✅ Login page display and form validation
- ✅ Signup page display and form validation
- ✅ Email/password authentication
- ✅ OAuth provider buttons (Google, GitHub)
- ✅ Error handling for invalid credentials
- ✅ Logout functionality
- ✅ Protected route authentication

### 2. Prompts (`prompts.spec.ts`)
- ✅ Prompt creation form
- ✅ Form validation
- ✅ Public/private visibility toggle
- ✅ Tag handling
- ✅ Prompt display on feed
- ✅ Prompt detail page
- ✅ Markdown rendering
- ✅ Author information display
- ✅ 404 handling for non-existent prompts

### 3. Likes (`likes.spec.ts`)
- ✅ Like button display
- ✅ Like/unlike interaction
- ✅ Optimistic UI updates
- ✅ Real-time like count updates
- ✅ Authentication requirement
- ✅ Visual feedback for liked state
- ✅ Keyboard accessibility

### 4. Comments (`comments.spec.ts`)
- ✅ Comment form display
- ✅ Comment submission
- ✅ Empty comment validation
- ✅ Comments list display
- ✅ Author and timestamp display
- ✅ Real-time comment updates
- ✅ Authentication requirement
- ✅ Loading states

### 5. Remix/Fork (`remix.spec.ts`)
- ✅ Remix button display
- ✅ Navigation to remix editor
- ✅ Pre-filled content from original
- ✅ Remix submission
- ✅ Attribution to original author
- ✅ Authentication requirement

### 6. Collections (`collections.spec.ts`)
- ✅ Collections listing page
- ✅ Create collection form
- ✅ Public/private collections
- ✅ Collection detail view
- ✅ Adding prompts to collections
- ✅ Collection navigation
- ✅ Authentication requirement

### 7. Profile (`profile.spec.ts`)
- ✅ User profile display
- ✅ Profile settings page
- ✅ Avatar upload section
- ✅ Profile editing
- ✅ User's prompts display
- ✅ Public profile view
- ✅ Authentication requirement

### 8. Navigation (`navigation.spec.ts`)
- ✅ Home page navigation
- ✅ Header links
- ✅ Feed filters (New, Top, Trending)
- ✅ Filter highlighting
- ✅ Breadcrumb navigation
- ✅ Browser back/forward
- ✅ Responsive navigation
- ✅ 404 error handling

## Setup and Installation

### Prerequisites
- Node.js 16+ or compatible runtime
- PNPM (recommended) or npm
- Netlify CLI (for local development)

### Install Dependencies

```bash
# Install Playwright (already included in package.json)
pnpm install

# Install Playwright browsers
pnpm exec playwright install chromium
```

### Environment Setup

Ensure you have `.env.local` configured with Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## Running Tests

### Run All Tests

```bash
# Run all E2E tests (starts dev server automatically)
pnpm test:e2e

# Run in headed mode (see browser)
pnpm test:e2e:headed

# Run in debug mode
pnpm test:e2e:debug

# Run in UI mode (interactive)
pnpm test:e2e:ui
```

### Run Specific Test Files

```bash
# Run only authentication tests
pnpm exec playwright test auth.spec.ts

# Run multiple specific files
pnpm exec playwright test auth.spec.ts prompts.spec.ts

# Run tests matching a pattern
pnpm exec playwright test --grep "should display"
```

### Run Tests Against Production

```bash
# Set base URL to production
PLAYWRIGHT_BASE_URL=https://prompt-party-app.netlify.app pnpm test:e2e
```

### Run with Different Browsers

```bash
# Firefox (requires installation)
pnpm exec playwright test --project=firefox

# WebKit/Safari (requires installation)
pnpm exec playwright test --project=webkit

# All browsers
pnpm exec playwright test --project=chromium --project=firefox --project=webkit
```

## Viewing Test Results

### HTML Report

After running tests, view the HTML report:

```bash
pnpm exec playwright show-report
```

### Screenshots and Videos

Failed tests automatically capture:
- Screenshots (in `test-results/`)
- Videos (in `test-results/`)
- Trace files (viewable in Playwright Inspector)

View traces:

```bash
pnpm exec playwright show-trace test-results/path-to-trace.zip
```

## Writing New Tests

### Using Page Object Models

```typescript
import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/login.page'

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('test@example.com', 'password123')

  await expect(page).toHaveURL('/')
})
```

### Using Test Helpers

```typescript
import { login, createPrompt } from './utils/test-helpers'

test('should create prompt after login', async ({ page }) => {
  await login(page, 'test@example.com', 'password')
  const promptId = await createPrompt(page, 'Test Title', 'Test Body')

  await expect(page).toHaveURL(`/prompts/${promptId}`)
})
```

### Using Authenticated Fixture

```typescript
import { test, expect } from './fixtures/auth.fixture'

test('should access protected page', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/prompts/new')
  await expect(authenticatedPage).toHaveURL('/prompts/new')
})
```

## Best Practices

### 1. Test Independence
- Each test should be independent
- Don't rely on data from previous tests
- Clean up test data when possible

### 2. Waits and Timeouts
- Use explicit waits (`waitForSelector`, `waitForURL`)
- Avoid arbitrary `waitForTimeout` except for development
- Use `networkidle` for page load completion

### 3. Selectors
- Prefer data-testid attributes (when available)
- Use semantic selectors (role, label, text)
- Avoid CSS class selectors (they change frequently)
- Use Page Object Models for maintainability

### 4. Assertions
- Use meaningful assertion messages
- Check both positive and negative cases
- Verify visual feedback (button states, loading indicators)

### 5. Real-time Features
- Account for Supabase real-time delays
- Use proper waits for subscription updates
- Test optimistic UI updates separately from backend updates

## Continuous Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps chromium

      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Tests Failing Locally

1. **Server not starting**: Ensure `netlify dev` can start successfully
2. **Port conflicts**: Check if port 8888 is already in use
3. **Supabase connection**: Verify `.env.local` has correct credentials
4. **Browser issues**: Reinstall browsers with `pnpm exec playwright install`

### Flaky Tests

1. **Add explicit waits**: Replace `waitForTimeout` with `waitForSelector`
2. **Check network conditions**: Ensure Supabase responses complete
3. **Verify real-time subscriptions**: May need longer waits for live updates
4. **Increase timeouts**: Some operations may need more time in CI

### Authentication Issues

1. **Test users**: Create dedicated test users in Supabase
2. **Email confirmation**: Disable email confirmation for test environment
3. **Session persistence**: Clear cookies between tests if needed

## Test Data Management

### Approach
- Tests use dynamic test data (timestamps, random strings)
- No reliance on specific database state
- Tests are resilient to varying database content

### Future Improvements
- Add Supabase admin client for test data seeding
- Create database snapshots for test isolation
- Implement test user management utilities

## Performance Considerations

- Tests run in parallel by default (configured in `playwright.config.ts`)
- On CI, tests run serially to avoid resource contention
- Average test suite runtime: ~3-5 minutes (local), ~5-8 minutes (CI)

## Coverage Gaps and Future Tests

### Planned Additions
- [ ] Avatar upload E2E testing (file upload)
- [ ] Multi-user real-time scenarios (requires multiple contexts)
- [ ] Search functionality (when implemented)
- [ ] Email notification flows
- [ ] Admin/moderation features
- [ ] Performance/load testing
- [ ] Accessibility (a11y) testing with axe-core

### Known Limitations
- OAuth flows require real providers (tested only for button presence)
- Email verification flows require real email handling
- Some real-time features need multiple users (requires complex setup)

## Contributing

When adding new tests:

1. Follow the existing Page Object Model pattern
2. Add tests to appropriate spec file (or create new one)
3. Update this README with new coverage
4. Ensure tests pass locally before committing
5. Add meaningful test descriptions

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- [Supabase Testing Best Practices](https://supabase.com/docs/guides/testing)
- [Netlify Dev CLI](https://docs.netlify.com/cli/get-started/)

## Support

For questions or issues with E2E tests:
1. Check existing test examples
2. Review Playwright documentation
3. Verify Supabase and Netlify configurations
4. Check test output and error messages
