# Supabase Setup

## Local Development

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Start local Supabase:
```bash
supabase start
```

3. Apply migrations:
```bash
supabase db push
```

## Production Setup

1. Create a Supabase project at https://supabase.com

2. Get your credentials from Project Settings > API:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Add to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Apply migrations via Supabase Dashboard or CLI:
```bash
supabase db push --linked
```

## Authentication Providers

Configure in Supabase Dashboard > Authentication > Providers:

- **Email**: Enable Email provider
- **Google**: Add OAuth credentials
- **GitHub**: Add OAuth credentials

## Storage

Create a bucket named `avatars` in Storage for user profile pictures:
- Set as public
- Add policy for authenticated uploads
