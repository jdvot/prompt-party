# E2E Testing Quick Start Guide

This guide provides a quick overview of running E2E tests for Prompt Party.

## Prerequisites

Before running E2E tests, ensure you have:

1. **Dependencies installed**:
   ```bash
   pnpm install
   ```

2. **Playwright browsers installed**:
   ```bash
   pnpm exec playwright install chromium
   ```

3. **Environment variables configured** in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

## Quick Start

### Run All Tests

The simplest way to run all E2E tests:

```bash
pnpm test:e2e
```

This command will:
- Start the Netlify dev server automatically (`netlify dev`)
- Run all E2E tests in headless mode
- Generate an HTML report
- Display results in the terminal

### View Test Results

After tests complete, view the interactive HTML report:

```bash
pnpm test:e2e:report
```

## Common Testing Scenarios

### Run Tests in Visual Mode

See the browser while tests run:

```bash
pnpm test:e2e:headed
```

### Debug a Failing Test

Open Playwright Inspector for step-by-step debugging:

```bash
pnpm test:e2e:debug
```

### Interactive Test UI

Use Playwright's UI mode for the best development experience:

```bash
pnpm test:e2e:ui
```

### Run Specific Test File

```bash
pnpm exec playwright test auth.spec.ts
```

### Run Specific Test by Name

```bash
pnpm exec playwright test --grep "should login"
```

## Test Files Overview

| Test File | Coverage |
|-----------|----------|
| `auth.spec.ts` | Login, signup, logout, OAuth buttons |
| `prompts.spec.ts` | Create, view, edit prompts |
| `likes.spec.ts` | Like/unlike functionality, real-time updates |
| `comments.spec.ts` | Post comments, real-time updates |
| `remix.spec.ts` | Fork/remix prompts |
| `collections.spec.ts` | Create, manage collections |
| `profile.spec.ts` | User profiles, settings |
| `navigation.spec.ts` | Feed filters, navigation, routing |

## Understanding Test Output

### Successful Test
```
✓ should display login form with all elements (1.2s)
```

### Failed Test
```
✗ should login with valid credentials (2.1s)

  Error: expect(received).toHaveURL(expected)

  Expected URL: "/"
  Received URL: "/auth/login"
```

Failed tests will generate:
- Screenshot (`test-results/*/screenshot.png`)
- Video (`test-results/*/video.webm`)
- Trace file (`test-results/*/trace.zip`)

### View Trace File

```bash
pnpm exec playwright show-trace test-results/path-to-trace.zip
```

## Testing Against Different Environments

### Local Development (Default)
```bash
pnpm test:e2e
```
Runs against `http://localhost:8888`

### Staging/Production
```bash
PLAYWRIGHT_BASE_URL=https://prompt-party-app.netlify.app pnpm test:e2e
```

## Common Issues and Solutions

### Issue: "Server timeout"
**Solution**: Ensure Netlify CLI is installed and `netlify dev` works:
```bash
netlify dev
```

### Issue: "Browser not found"
**Solution**: Install Playwright browsers:
```bash
pnpm exec playwright install
```

### Issue: "Tests timing out"
**Solution**: Increase timeout in individual tests or check Supabase connectivity

### Issue: "Port 8888 already in use"
**Solution**: Kill the process using port 8888 or change port in `playwright.config.ts`

## Test Development Workflow

1. **Create/modify test**:
   - Add test to appropriate spec file in `e2e/`
   - Use Page Object Models from `e2e/pages/`
   - Use helpers from `e2e/utils/test-helpers.ts`

2. **Run test in UI mode**:
   ```bash
   pnpm test:e2e:ui
   ```

3. **Debug if needed**:
   ```bash
   pnpm test:e2e:debug
   ```

4. **Run full suite before committing**:
   ```bash
   pnpm test:e2e
   ```

## CI/CD Integration

Tests are designed to run in CI environments:

- Automatic server startup
- Headless browser mode
- Retry logic for flaky tests
- Screenshot/video capture on failure

See `e2e/README.md` for GitHub Actions example.

## Best Practices

1. **Run tests locally** before pushing
2. **Use Page Object Models** for maintainability
3. **Add data-testid attributes** to components for stable selectors
4. **Test user flows**, not implementation details
5. **Keep tests independent** - don't rely on test execution order
6. **Use meaningful test names** that describe the expected behavior

## Next Steps

- Read the full documentation: `e2e/README.md`
- Explore test examples in `e2e/*.spec.ts`
- Review Page Object Models in `e2e/pages/`
- Check Playwright docs: https://playwright.dev

## Need Help?

1. Check test output and error messages
2. Review `e2e/README.md` for detailed documentation
3. Consult Playwright documentation
4. Verify Supabase and Netlify configurations

---

**Happy Testing!** 🎭
