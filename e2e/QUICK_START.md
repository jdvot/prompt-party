# E2E Tests - Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
# Install project dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install chromium
```

### 2. Configure Environment
Ensure `.env.local` exists with Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 3. Run Tests
```bash
# Run all tests
pnpm test:e2e

# Or run specific suite
pnpm exec playwright test auth-flows
```

## Common Commands

### Run All Tests
```bash
pnpm test:e2e                    # Run all tests
pnpm test:e2e:headed             # See browser while running
pnpm test:e2e:debug              # Interactive debug mode
pnpm test:e2e:ui                 # UI mode for exploration
```

### Run Specific Tests
```bash
# By file
pnpm exec playwright test auth-flows.spec.ts
pnpm exec playwright test prompt-crud.spec.ts
pnpm exec playwright test social-features.spec.ts
pnpm exec playwright test collections.spec.ts
pnpm exec playwright test navigation-i18n.spec.ts
pnpm exec playwright test profile.spec.ts

# By pattern
pnpm exec playwright test -g "should login"
pnpm exec playwright test -g "should create"
```

### View Results
```bash
# Open HTML report
pnpm exec playwright show-report

# View trace for debugging
pnpm exec playwright show-trace test-results/*/trace.zip
```

## Test Suites Overview

| File | Tests | What It Covers |
|------|-------|----------------|
| `auth-flows.spec.ts` | 27 | Signup, login, logout, session management |
| `prompt-crud.spec.ts` | 25 | Create, edit, delete prompts |
| `social-features.spec.ts` | 22 | Likes, comments, bookmarks |
| `collections.spec.ts` | 20 | Collection management |
| `navigation-i18n.spec.ts` | 28 | Navigation, language, theme |
| `profile.spec.ts` | 23 | View and edit profiles |

## Quick Examples

### Run Just Authentication Tests
```bash
pnpm exec playwright test auth-flows
```

### Run in Debug Mode (Step Through Tests)
```bash
pnpm exec playwright test auth-flows --debug
```

### Run on Mobile Viewport
```bash
pnpm exec playwright test --project="Mobile Chrome"
```

### Run Specific Test
```bash
pnpm exec playwright test -g "should create a basic public prompt"
```

## Troubleshooting

### Tests Fail Immediately
**Problem**: Can't connect to dev server

**Fix**:
```bash
# Make sure dev server is running on port 3001
PORT=3001 pnpm dev

# Or let Playwright start it automatically (default config)
```

### Tests Timeout
**Problem**: Elements not loading in time

**Fix**: Increase timeout in `playwright.config.ts`:
```typescript
timeout: 90000,  // 90 seconds
```

### Authentication Tests Fail
**Problem**: No test users exist

**Fix**: Tests use randomly generated credentials. Make sure:
1. Supabase credentials are correct in `.env.local`
2. Email confirmation is disabled for test environment
3. Or manually create a test user in Supabase

## Next Steps

1. ✅ Run tests to verify everything works
2. 📖 Read [COMPREHENSIVE_TEST_GUIDE.md](./COMPREHENSIVE_TEST_GUIDE.md) for details
3. 🔧 Add tests for new features using existing patterns
4. 🚀 Set up CI/CD with GitHub Actions (example in guide)

## File Locations

```
e2e/
├── comprehensive/              # Test suites
│   ├── auth-flows.spec.ts
│   ├── prompt-crud.spec.ts
│   ├── social-features.spec.ts
│   ├── collections.spec.ts
│   ├── navigation-i18n.spec.ts
│   └── profile.spec.ts
├── utils/
│   ├── test-helpers.ts        # Basic helpers
│   └── comprehensive-helpers.ts # Advanced helpers
├── pages/                      # Page Object Models
├── QUICK_START.md             # This file
└── COMPREHENSIVE_TEST_GUIDE.md # Full documentation
```

## Support

- Full guide: [COMPREHENSIVE_TEST_GUIDE.md](./COMPREHENSIVE_TEST_GUIDE.md)
- Implementation summary: [E2E_TEST_IMPLEMENTATION_SUMMARY.md](../E2E_TEST_IMPLEMENTATION_SUMMARY.md)
- Playwright docs: https://playwright.dev
- Original tests: [README.md](./README.md)

---

**Ready to test?** Run `pnpm test:e2e` 🚀
