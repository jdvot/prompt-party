# 🚀 Setup Guide: Collaborative Features

This guide will help you activate the **Prompt Versioning** and **Real-time Collaborative Editing** features.

## ⏱️ Time Required: 5 minutes

---

## Step 1: Apply Database Migration

### Option A: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project**:
   - Visit [supabase.com](https://supabase.com)
   - Select your project

2. **Open SQL Editor**:
   - Click **SQL Editor** in the left sidebar
   - Click **New query**

3. **Copy and paste the migration**:
   - Open the file: `/supabase/migrations/add_prompt_versioning.sql`
   - Copy ALL the content (238 lines)
   - Paste it into the SQL Editor

4. **Run the migration**:
   - Click **Run** button (or press `Ctrl/Cmd + Enter`)
   - Wait for success message: ✅ "Success. No rows returned"

### Option B: Using Supabase CLI (If you have it installed)

```bash
# If you have Supabase CLI installed locally
supabase db push
```

---

## Step 2: Enable Realtime

1. **Go to Database Settings**:
   - Click **Database** in the left sidebar
   - Click **Replication** tab

2. **Enable Realtime for these tables**:
   - ✅ Find `prompt_versions` → Toggle **ON**
   - ✅ Find `prompt_presence` → Toggle **ON**

3. **Save changes** (automatic)

---

## Step 3: Verify Installation

### Check Tables Created

In SQL Editor, run:

```sql
-- Check if tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('prompt_versions', 'prompt_presence');
```

You should see 2 rows returned:
- `prompt_versions`
- `prompt_presence`

### Check Functions Created

```sql
-- Check if functions exist
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN ('create_prompt_version', 'restore_prompt_version', 'cleanup_old_presence');
```

You should see 3 rows returned.

### Check Trigger Created

```sql
-- Check if trigger exists
SELECT trigger_name
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name = 'trigger_create_prompt_version';
```

You should see 1 row returned.

---

## Step 4: Test the Features

### Test Version History

1. **Edit any existing prompt**:
   - Go to any prompt you created
   - Click **Edit**
   - Make a change to the title or body
   - Click **Save**

2. **View version history**:
   - You should see a **"Version History"** button
   - Click it to see all versions
   - Click on a version to expand details
   - Try restoring a previous version

### Test Collaborative Editing

1. **Open a prompt in two browser windows**:
   - Window 1: Open a prompt in edit mode
   - Window 2: Open the same prompt in edit mode (incognito or different browser)

2. **Verify real-time updates**:
   - Type in Window 1 → Changes appear in Window 2 after 300ms
   - You should see user avatars at the top
   - See "2 users editing" badge
   - See colored indicators for active users

---

## Step 5: Set Up Cleanup Cron Job (Optional)

To automatically clean up old presence records:

### Create API Route (Already done ✅)

The file `/src/app/api/cron/cleanup-presence/route.ts` should exist.

### Add to Vercel Cron (If using Vercel)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup-presence",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

### Or use external cron service

Set up a cron job to call:
```
POST https://your-domain.com/api/cron/cleanup-presence
```

Every 5 minutes.

---

## 🎉 Done!

Your collaborative features are now active!

### What You Get:

✅ **Automatic versioning** on every prompt save
✅ **Version history** with full rollback capability
✅ **Real-time collaborative editing** with presence tracking
✅ **Live cursor positions** and user indicators
✅ **All FREE** on Supabase free tier

---

## 📊 Free Tier Limits

| Feature | Free Tier | Status |
|---------|-----------|--------|
| Realtime connections | 200 concurrent | ✅ More than enough |
| Realtime messages | 2M/month | ✅ ~66k/day |
| Database storage | 500 MB | ✅ Plenty of space |
| Bandwidth | 5 GB/month | ✅ Sufficient |

**Estimated usage for 100 active users:**
- Concurrent connections: ~20-50
- Messages per day: ~5,000-10,000
- Storage for versions: <10 MB

**All within free tier limits!** ✅

---

## 🐛 Troubleshooting

### Problem: "Function restore_prompt_version does not exist"

**Solution**: The migration didn't run successfully. Re-run Step 1.

### Problem: Realtime not working

**Solution**:
1. Check that Realtime is enabled (Step 2)
2. Check browser console for connection errors
3. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

### Problem: Version history is empty

**Solution**:
1. Make sure you've edited a prompt AFTER applying the migration
2. The trigger only creates versions on UPDATE, not on initial creation
3. Try editing and saving a prompt again

### Problem: Can't restore versions

**Solution**:
1. Make sure you're logged in as the prompt author
2. Check that RLS policies are correct (should be applied by migration)
3. Check browser console for error messages

---

## 📚 Documentation

For complete documentation, see:
- `/FEATURES_COLLABORATIVE.md` - Full feature documentation
- `/supabase/migrations/add_prompt_versioning.sql` - Database schema

---

**Need help?** Check the troubleshooting section or review the code in:
- `/src/components/prompts/version-history.tsx`
- `/src/components/prompts/collaborative-editor.tsx`
- `/src/app/api/prompts/[id]/versions/route.ts`
