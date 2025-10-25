# 🚀 Collaborative Features Guide

## Overview

Prompt Party now includes **Version Control** and **Real-time Collaborative Editing** powered by Supabase Realtime - completely free on Supabase's free tier!

## 📋 Features Implemented

### 1. Prompt Versioning System

Track every change to your prompts with automatic version control.

**Features:**
- ✅ Automatic version creation on every save
- ✅ View complete version history
- ✅ Compare versions side-by-side
- ✅ Rollback to any previous version
- ✅ Track who made each change
- ✅ Add change notes/summaries
- ✅ Unlimited version history

**Usage:**

```tsx
import { VersionHistory } from '@/components/prompts/version-history'

<VersionHistory
  promptId={promptId}
  currentVersion={{
    title,
    body,
    tags,
    category
  }}
  onRestore={(version) => {
    // Restore to this version
    setTitle(version.title)
    setBody(version.body)
  }}
/>
```

**Database:**
- Table: `prompt_versions`
- Auto-versioning trigger on `prompts` table
- Function: `restore_prompt_version(prompt_id, version_id)`

---

### 2. Real-time Collaborative Editing

Multiple users can edit the same prompt simultaneously with live updates.

**Features:**
- ✅ Real-time presence indicators
- ✅ See who's editing (avatars + names)
- ✅ Live cursor tracking
- ✅ Instant content synchronization
- ✅ Join/leave notifications
- ✅ Color-coded user indicators
- ✅ Debounced updates (300ms)
- ✅ Automatic conflict resolution

**Usage:**

```tsx
import { CollaborativeEditor } from '@/components/prompts/collaborative-editor'

<CollaborativeEditor
  promptId={promptId}
  initialTitle={title}
  initialBody={body}
  currentUserId={user.id}
  currentUserName={user.name}
  onTitleChange={setTitle}
  onBodyChange={setBody}
/>
```

**Real-time Architecture:**

```
Supabase Realtime Channel: "prompt:{id}"

Events:
├── presence.sync      → Track active users
├── presence.join      → User joined
├── presence.leave     → User left
├── title_update       → Title changed
├── body_update        → Content changed
└── cursor_update      → Cursor moved
```

---

## 🗄️ Database Schema

### `prompt_versions` Table

```sql
CREATE TABLE prompt_versions (
  id UUID PRIMARY KEY,
  prompt_id UUID REFERENCES prompts(id),
  version_number INTEGER,
  title TEXT,
  body TEXT,
  category TEXT,
  tags TEXT[],
  changed_by UUID REFERENCES profiles(id),
  changed_by_name TEXT,
  change_summary TEXT,
  created_at TIMESTAMPTZ,

  UNIQUE(prompt_id, version_number)
);
```

### `prompt_presence` Table

```sql
CREATE TABLE prompt_presence (
  id UUID PRIMARY KEY,
  prompt_id UUID REFERENCES prompts(id),
  user_id UUID REFERENCES profiles(id),
  user_name TEXT,
  avatar_url TEXT,
  color TEXT,
  cursor_position INTEGER,
  last_seen TIMESTAMPTZ,

  UNIQUE(prompt_id, user_id)
);
```

---

## 🚀 Setup Instructions

### 1. Run Migration

```bash
# Apply the versioning migration
supabase db push
```

Or manually:
```bash
psql $DATABASE_URL -f supabase/migrations/add_prompt_versioning.sql
```

### 2. Configure Supabase Realtime

In your Supabase dashboard:

1. Go to **Database** → **Replication**
2. Enable Realtime for:
   - ✅ `prompt_versions`
   - ✅ `prompt_presence`

### 3. Environment Variables

Already configured in `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 📊 Free Tier Limits (Supabase)

| Feature | Free Tier | Sufficient for Prompt Party? |
|---------|-----------|------------------------------|
| Realtime connections | 200 concurrent | ✅ Yes (50-100 users) |
| Realtime messages | 2M/month | ✅ Yes (66k/day) |
| Database storage | 500 MB | ✅ Yes |
| Bandwidth | 5 GB | ✅ Yes |

**Calculation for versioning:**
- Average prompt: ~1 KB
- 10 versions per prompt: ~10 KB
- 1,000 prompts with versions: ~10 MB
- **Total storage needed: < 50 MB** ✅

---

## 🎯 Implementation Examples

### Example 1: Prompt Editor with Versioning

```tsx
'use client'

import { useState } from 'react'
import { CollaborativeEditor } from '@/components/prompts/collaborative-editor'
import { VersionHistory } from '@/components/prompts/version-history'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function PromptEditorPage({ prompt, user }) {
  const [title, setTitle] = useState(prompt.title)
  const [body, setBody] = useState(prompt.body)

  return (
    <Tabs defaultValue="edit">
      <TabsList>
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      <TabsContent value="edit">
        <CollaborativeEditor
          promptId={prompt.id}
          initialTitle={title}
          initialBody={body}
          currentUserId={user.id}
          currentUserName={user.name}
          onTitleChange={setTitle}
          onBodyChange={setBody}
        />
      </TabsContent>

      <TabsContent value="history">
        <VersionHistory
          promptId={prompt.id}
          currentVersion={{ title, body, tags: prompt.tags, category: prompt.category }}
          onRestore={(version) => {
            setTitle(version.title)
            setBody(version.body)
          }}
        />
      </TabsContent>
    </Tabs>
  )
}
```

### Example 2: Version Comparison

```tsx
import { VersionHistory } from '@/components/prompts/version-history'

// The component automatically shows diffs between versions
<VersionHistory
  promptId={promptId}
  currentVersion={currentVersion}
  onRestore={handleRestore}
/>
// Click any version to see:
// - Word count changes (+10, -5)
// - Change summary
// - Author and timestamp
// - Full content preview
```

---

## 🔒 Security (RLS Policies)

### Versioning

```sql
-- View versions of public prompts
"Public prompts versions are viewable by everyone"

-- View all versions of own prompts
"Authors can view all versions of their prompts"

-- Only authors can create versions
"Authors can create versions"
```

### Presence

```sql
-- View presence for accessible prompts
"Users can view presence for accessible prompts"

-- Manage own presence only
"Users can manage their own presence"
```

---

## 🎨 UI Components Created

| Component | File | Purpose |
|-----------|------|---------|
| VersionHistory | `/src/components/prompts/version-history.tsx` | Display version history with rollback |
| CollaborativeEditor | `/src/components/prompts/collaborative-editor.tsx` | Real-time editing with presence |

---

## 🧹 Maintenance

### Cleanup Old Presence Records

Add to your cron jobs (already in `vercel.json`):

```typescript
// /api/cron/cleanup-presence/route.ts
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()

  // Cleanup presence older than 5 minutes
  await supabase.rpc('cleanup_old_presence')

  return Response.json({ success: true })
}
```

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

---

## 🐛 Troubleshooting

### Issue: Realtime not working

**Solution:**
1. Check Supabase dashboard → Database → Replication
2. Ensure `prompt_versions` and `prompt_presence` are enabled
3. Check browser console for connection errors
4. Verify anon key in `.env.local`

### Issue: Versions not auto-saving

**Solution:**
1. Check trigger exists: `\df create_prompt_version` in psql
2. Verify RLS policies are correct
3. Check user is authenticated

### Issue: Presence not showing other users

**Solution:**
1. Open in multiple browser windows/tabs
2. Check different users are logged in
3. Verify channel subscription in Network tab
4. Ensure Realtime is enabled in Supabase

---

## 📈 Performance Tips

1. **Debounce Updates:** Already implemented (300ms delay)
2. **Limit Active Users Display:** Shows max 5 avatars
3. **Cleanup Stale Presence:** Cron job every 5 minutes
4. **Pagination:** Version history loads 50 at a time

---

## 🎉 What's Next?

Future enhancements:
- [ ] Visual diff viewer (line-by-line comparison)
- [ ] Branch/merge system (like Git)
- [ ] Comment threads on specific lines
- [ ] Video cursor (show actual mouse movement)
- [ ] Voice chat during editing
- [ ] Auto-save to drafts every 30 seconds

---

## 📚 Resources

- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [Supabase Presence](https://supabase.com/docs/guides/realtime/presence)
- [Supabase Broadcast](https://supabase.com/docs/guides/realtime/broadcast)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Created:** December 2024
**Status:** ✅ Production Ready
**Free Tier:** ✅ Fully Supported
