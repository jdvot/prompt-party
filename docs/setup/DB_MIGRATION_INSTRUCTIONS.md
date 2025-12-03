# Database Migration Instructions

## Problem
The app now displays comment counts on prompt cards, but the `comments_count` column doesn't exist in the database yet. This causes 500 errors when loading the feed.

## Solution
Run the SQL migration to add the `comments_count` column and auto-updating triggers.

---

## Option 1: Via Supabase CLI (Recommended)

### Prerequisites
You need the database password. Get it from:
1. Supabase Dashboard → Project Settings → Database
2. Look for "Database password" or reset it

### Steps

1. **Set the password as an environment variable:**
```bash
export PGPASSWORD="your-database-password-here"
```

2. **Run the migration:**
```bash
supabase db push
```

3. **Verify:**
```bash
supabase db remote commit
```

---

## Option 2: Via Supabase Dashboard (Manual)

### Steps

1. **Go to Supabase Dashboard:**
   - Open: https://supabase.com/dashboard/project/hfswbeyptqqhvhnxzcbh/sql/new

2. **Copy the SQL:**
   - Open the file: `MANUAL_DB_MIGRATION.sql`
   - Copy all its contents

3. **Execute:**
   - Paste into the SQL Editor
   - Click "Run" button

4. **Verify:**
   - Run this query to check:
   ```sql
   SELECT id, title, comments_count
   FROM prompts
   LIMIT 10;
   ```

---

## What This Migration Does

1. ✅ Adds `comments_count INTEGER DEFAULT 0` column to `prompts` table
2. ✅ Populates existing prompts with current comment counts
3. ✅ Creates trigger function `update_comments_count()`
4. ✅ Creates trigger `update_prompt_comments_count` on INSERT/DELETE

### Auto-updating behavior:
- When a comment is created → `comments_count` increases by 1
- When a comment is deleted → `comments_count` decreases by 1

---

## After Migration

Once the migration is applied, the app will:
- ✅ Show comment counts on all prompt cards
- ✅ Display comment icons with numbers (e.g., "💬 5")
- ✅ Auto-update counts when comments are added/removed
- ✅ No more 500 errors on feed pages

---

## Files Involved

- `supabase/migrations/20250121000000_add_comments_count.sql` - Auto migration file
- `MANUAL_DB_MIGRATION.sql` - Manual SQL script
- This file - Instructions

---

## Troubleshooting

### If you get "password authentication failed":
1. Reset your database password in Supabase Dashboard
2. Update the password in your local environment
3. Try again

### If the column already exists:
The migration uses `IF NOT EXISTS`, so it's safe to run multiple times.

### If triggers aren't working:
Verify with:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'update_prompt_comments_count';
```

---

**Need help?** Check the Supabase docs: https://supabase.com/docs/guides/database/migrations
