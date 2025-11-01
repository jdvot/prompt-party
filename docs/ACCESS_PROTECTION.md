# Site Access Protection

Complete guide to setting up password-based site access protection for Prompt Party.

## Overview

The access protection system allows you to password-protect your entire site, useful for:
- Private beta/staging environments
- Pre-launch development
- Client demos with controlled access
- Testing before public launch

## Features

✅ JWT-based secure token authentication
✅ Bcrypt password hashing (no plaintext passwords)
✅ 2-hour session duration with auto-renewal
✅ Rate limiting (5 attempts per 15 minutes)
✅ CSRF protection
✅ Middleware-based enforcement (edge runtime compatible)
✅ Multilingual support (EN/FR/NL)
✅ Automatic redirect to original URL after login

## How It Works

1. **Password Validation**: API route validates password against bcrypt hash
2. **Token Issuance**: Server creates signed JWT token (2-hour expiration)
3. **Cookie Storage**: Token stored in secure HttpOnly cookie
4. **Middleware Check**: Every request validates token signature
5. **Auto-redirect**: Unauthorized users redirected to `/access` page

## Setup Instructions

### 1. Generate Password Hash

```bash
# Using Node.js
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-secure-password', 10))"

# Example output:
# $2a$10$N9qo8uLOickgx2ZMRZoMye...
```

### 2. Generate Access Token Secret

```bash
# Generate a random 32+ character secret
openssl rand -base64 32

# Example output:
# 9j8h7g6f5d4s3a2w1q0p9o8i7u6y5t4r3e2w1q0
```

### 3. Configure Environment Variables

Add to your `.env.local`:

```env
# Site Access Protection
ACCESS_PROTECTION_ENABLED=true
ACCESS_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMye...
ACCESS_TOKEN_SECRET=9j8h7g6f5d4s3a2w1q0p9o8i7u6y5t4r3e2w1q0
```

### 4. Deploy Configuration

**Vercel:**
```bash
# Add environment variables
vercel env add ACCESS_PROTECTION_ENABLED
# Enter: true

vercel env add ACCESS_PASSWORD_HASH
# Enter: your_bcrypt_hash

vercel env add ACCESS_TOKEN_SECRET
# Enter: your_random_secret

# Deploy
vercel --prod
```

**Netlify:**
```bash
netlify env:set ACCESS_PROTECTION_ENABLED true
netlify env:set ACCESS_PASSWORD_HASH "your_bcrypt_hash"
netlify env:set ACCESS_TOKEN_SECRET "your_random_secret"
netlify deploy --prod
```

## Configuration Options

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ACCESS_PROTECTION_ENABLED` | Yes | Set to `true` to enable protection |
| `ACCESS_PASSWORD_HASH` | Yes | Bcrypt hash of your password |
| `ACCESS_TOKEN_SECRET` | Yes | Min 32 chars, used to sign JWT tokens |

### Protected Routes

All routes are protected **except**:
- `/access` - Access page itself
- `/api/access` - Password validation endpoint
- `/api/webhooks/*` - Webhook endpoints (Stripe, etc.)
- Static assets (`/_next/*`, images, CSS, JS)

### Public Routes (when protection disabled)

When `ACCESS_PROTECTION_ENABLED=false`, these routes remain publicly accessible:
- `/` - Home page
- `/auth/*` - Authentication pages
- `/pricing` - Pricing page
- `/marketing-suite` - Marketing suite landing
- `/about`, `/terms`, `/privacy` - Legal pages

## Security Features

### Rate Limiting

- **5 attempts** per 15 minutes per IP address
- Prevents brute force attacks
- In-memory store (use Redis for multi-instance)

### CSRF Protection

- Origin header validation for POST requests
- Prevents cross-site request forgery
- Middleware-based enforcement

### Password Security

- ✅ Bcrypt hashing with salt rounds (10)
- ✅ No plaintext passwords stored
- ✅ Server-side validation only
- ❌ No password recovery (contact admin)

### Token Security

- ✅ JWT signed with HS256 algorithm
- ✅ 2-hour expiration (configurable)
- ✅ HttpOnly cookies (no JavaScript access)
- ✅ Secure flag in production (HTTPS only)
- ✅ SameSite=Lax (CSRF protection)
- ✅ Server-side signature verification

## Troubleshooting

### Issue: "Access protection not configured properly"

**Cause**: `ACCESS_PASSWORD_HASH` is not set or empty

**Solution**: Generate and set password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password', 10))"
```

### Issue: "Invalid password" but password is correct

**Cause**: Password hash mismatch

**Solution**:
1. Re-generate hash with same password
2. Ensure hash is copied completely (starts with `$2a$` or `$2b$`)
3. Check for trailing spaces in env var

### Issue: "JWT signing key accessed on client"

**Cause**: Access token functions called from client component

**Solution**: Only use `createAccessToken()` in API routes (server-only)

### Issue: Infinite redirect loop

**Cause**: Access page itself is being protected

**Solution**: Check `shouldSkipAccessProtection()` in `middleware/auth.ts`

### Issue: Token expired too quickly

**Cause**: 2-hour expiration is too short

**Solution**: Modify expiration in `lib/access-token.ts`:
```typescript
exp: now + (24 * 60 * 60), // 24 hours instead of 2
```

## Testing

### Test Password Protection Locally

1. Enable protection in `.env.local`:
```env
ACCESS_PROTECTION_ENABLED=true
ACCESS_PASSWORD_HASH=$2a$10$yourhashere
ACCESS_TOKEN_SECRET=your32charssecret
```

2. Start dev server:
```bash
pnpm dev
```

3. Visit `http://localhost:3000`
   - Should redirect to `/access`
   - Enter password
   - Should redirect to original URL

### Test Rate Limiting

1. Visit `/access` page
2. Enter wrong password 5 times
3. 6th attempt should return 429 (Too Many Requests)
4. Wait 15 minutes or restart server

### Test Token Expiration

1. Login successfully
2. Manually edit cookie expiration in browser DevTools
3. Refresh page - should redirect to `/access`

## Production Checklist

- [ ] Generate strong password (16+ chars, mixed case, symbols)
- [ ] Generate secure token secret (32+ chars)
- [ ] Set environment variables in production
- [ ] Test access page login flow
- [ ] Verify rate limiting works
- [ ] Confirm static assets load without authentication
- [ ] Test webhook endpoints still work (Stripe, etc.)
- [ ] Verify HTTPS/secure cookies enabled in production
- [ ] Document password for team (use password manager)
- [ ] Set up monitoring for failed login attempts

## Disabling Access Protection

To disable access protection:

1. Set environment variable:
```env
ACCESS_PROTECTION_ENABLED=false
```

2. Redeploy application

3. All routes become publicly accessible (except user-authenticated routes)

## Changing Password

1. Generate new hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('new-password', 10))"
```

2. Update environment variable:
```bash
vercel env rm ACCESS_PASSWORD_HASH production
vercel env add ACCESS_PASSWORD_HASH
# Enter new hash
```

3. Redeploy:
```bash
vercel --prod
```

4. All existing tokens remain valid until they expire (2 hours)

## Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Visit /pricing
       ▼
┌─────────────────┐
│   Middleware    │ ◄── Check access token cookie
└──────┬──────────┘
       │ 2. No valid token
       ▼
┌─────────────────┐
│  /access page   │
└──────┬──────────┘
       │ 3. Enter password
       ▼
┌─────────────────┐
│ POST /api/access│ ◄── Validate password, create JWT
└──────┬──────────┘
       │ 4. Set cookie
       ▼
┌─────────────────┐
│   Middleware    │ ◄── Verify JWT signature
└──────┬──────────┘
       │ 5. Token valid
       ▼
┌─────────────────┐
│  /pricing page  │ ◄── Allow access
└─────────────────┘
```

## Files Modified/Created

- `middleware.ts` - Main middleware orchestrator
- `src/middleware/auth.ts` - Access protection + auth logic
- `src/middleware/security.ts` - Rate limiting + CSRF
- `src/middleware/static.ts` - Static asset fast-path
- `src/lib/access-token.ts` - JWT token management
- `src/components/access/access-form.tsx` - Login form UI
- `src/app/access/page.tsx` - Access page route
- `src/app/api/access/route.ts` - Password validation API
- `messages/{en,fr,nl}.json` - Translations

## Support

For issues or questions:
1. Check this documentation
2. Review middleware logs in Vercel/Netlify dashboard
3. Test with `ACCESS_PROTECTION_ENABLED=false` to isolate issue
4. Contact support with error logs
