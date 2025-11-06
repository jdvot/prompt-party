# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Prompt Party** is a social network for AI prompts. Users can create, share, discover, vote on, comment on, and remix AI prompts. Built with Next.js 15, Supabase, and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 15 (React 19) with App Router
- **Language**: TypeScript
- **UI**: Tailwind CSS + Shadcn UI
- **Database/Auth/Storage**: Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Deployment**: Vercel
- **Package Manager**: PNPM (preferred) or npm

## Development Commands

```bash
# Install dependencies
pnpm install

# Run locally
pnpm dev
# App runs at http://localhost:3000

# Build for production
pnpm build

# Vercel deployment
vercel              # Deploy to preview
vercel --prod       # Deploy to production
vercel env ls       # List environment variables
vercel env add NAME # Add environment variable

# Supabase migrations
# Apply migrations to your Supabase database
supabase db push        # Apply all migrations in supabase/migrations/

# Generate TypeScript types from Supabase schema
supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts

# Note: Make sure to run migrations and regenerate types after adding new tables/columns
```

## Environment Setup

Create `.env.local` at project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

**Vercel environment variables** can be set via:
- Vercel Dashboard (Settings > Environment Variables)
- `vercel env add` command

## Architecture

### Next.js App Router Structure

```
src/
 ├── app/                     # Next.js App Router (file-based routing)
 │    ├── layout.tsx          # Root layout with providers
 │    ├── page.tsx            # Home feed page
 │    ├── prompts/            # Prompt detail & editor routes
 │    ├── collections/        # Collection management routes
 │    ├── profile/            # User profile routes
 │    └── api/                # API Route Handlers (serverless functions)
 ├── components/              # React components (use Shadcn UI patterns)
 ├── lib/                     # Supabase client setup & utilities
 ├── styles/                  # Global Tailwind styles
 └── types/                   # TypeScript type definitions
```

### Key Architectural Patterns

1. **App Router**: Use Next.js 15 App Router conventions
   - Server Components by default
   - Client Components marked with `'use client'`
   - API routes in `app/api/` become serverless functions (Vercel Functions or Netlify Functions)

2. **Supabase Integration**:
   - Client initialization in `lib/` (separate client/server instances)
   - Use `.from()` queries with TypeScript types
   - Real-time subscriptions with `.stream()` for live votes/comments
   - Authentication via Supabase Auth (email, Google, GitHub)

3. **UI Components**: Use Shadcn UI
   - Components are copied into `components/ui/`
   - Styled with Tailwind CSS utility classes
   - Customizable, not installed as npm package

4. **Netlify Functions**: API routes automatically become serverless functions
   - Access at `/.netlify/functions/*` or via API routes
   - Automatically integrated when using `netlify dev`

### Supabase Data Model

Core tables (all with RLS enabled):

- `profiles` - User profiles (name, avatar, plan)
- `prompts` - Prompt content (title, body, tags, author, likes_count)
- `likes` - Vote tracking (user_id + prompt_id, unique)
- `comments` - Comments on prompts
- `forks` - Remix/fork relationships between prompts
- `collections` - User collections (public/private)
- `collection_items` - Many-to-many join table

**Row Level Security (RLS)**: All tables have policies
- Public read for public content
- Write access restricted to owner (`auth.uid()`)
- Example policy pattern:
  ```sql
  CREATE POLICY "Users can manage own prompts"
  ON prompts FOR ALL
  USING (auth.uid() = author)
  WITH CHECK (auth.uid() = author);
  ```

### Application Flow

1. User authenticates via Supabase Auth (Magic Link, OAuth)
2. Browse feed sorted by Top/New/Trending
3. Create prompts with Markdown editor
4. Like/comment/remix prompts
5. Real-time updates via Supabase Realtime channels
6. Save prompts to collections (public or private)
7. SSR rendering for SEO optimization

## Implementation Guidelines

### When Building Features

- **Server vs Client Components**: Default to Server Components, use Client Components only when needed (interactivity, hooks, browser APIs)
- **Data Fetching**: Use Server Components for initial data, Client Components + SWR/React Query for mutations
- **Real-time**: Subscribe to Supabase Realtime channels in Client Components
- **Authentication**: Check `auth.uid()` server-side, use middleware for protected routes
- **Types**: Generate TypeScript types from Supabase schema when possible
- **Markdown**: Prompts support Markdown formatting - sanitize user input

### Vercel Deployment

- API routes in `app/api/` become Vercel Serverless Functions automatically
- Edge Functions available for ultra-fast globally distributed logic
- Cron jobs configured in `vercel.json`
- Headers, redirects, and rewrites configured in `vercel.json`

## Deployment Notes

**Vercel Hobby Tier:**
- 100 GB/month bandwidth
- Unlimited serverless function invocations
- Unlimited build minutes
- Function duration: 10s max (60s on Pro)
- SSL + custom domain included
- Automatic HTTPS
- Edge Network (global CDN)

**Supabase Free Tier:**
- 0.5 GB database
- 1 GB storage
- 50k Auth users/month
- Unlimited Realtime
