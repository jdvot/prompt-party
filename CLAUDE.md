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

## Development Tools

### Claude Code

**Claude Code** is an AI-powered coding assistant that integrates seamlessly with this repository. It reads this CLAUDE.md file to understand project context, architecture, and conventions.

**Setup & Usage:**
- Access at [claude.ai/code](https://claude.ai/code) or via the Claude Code CLI
- Link this repository for context-aware assistance
- Claude Code will automatically reference CLAUDE.md for project guidelines

**Key Capabilities:**
- Generate new features following Next.js 15 + Supabase patterns
- Refactor code while maintaining TypeScript safety and Tailwind consistency
- Debug issues with full project context understanding
- Generate documentation aligned with project standards
- Create tests and migrations following established patterns

**Common Workflows:**
```
# Feature development
- Describe feature requirements → Claude Code generates implementation
- Ask for code review → Validates against CLAUDE.md patterns
- Request documentation → Generates markdown following project style

# Bug fixes
- Provide error context → Claude Code identifies root cause
- Ask for solution → Implementation respects existing architecture
```

### Ragas

**Ragas** is an open-source framework for evaluating the quality and effectiveness of AI prompts and responses. It's essential for Prompt Party to measure and improve prompt quality.

**Installation:**
```bash
pnpm add ragas
# or
npm install ragas
```

**Purpose & Metrics:**
Ragas evaluates prompts using key metrics:
- **Faithfulness**: How closely responses adhere to the prompt intent
- **Answer Relevancy**: Relevance of generated responses to the prompt
- **Context Precision**: Quality and relevance of retrieved context
- **Context Recall**: Completeness of context retrieval
- **Semantic Similarity**: Alignment between prompt expectations and responses

**Usage for Prompt Party:**
```bash
# Evaluate a prompt's effectiveness
ragas evaluate --prompt "your-prompt-here" --responses "response-data"

# Batch evaluate prompts from collection
ragas evaluate-batch --input prompts.json --output metrics.json

# Generate quality reports
ragas report --metrics faithfulness,relevancy,context-precision
```

**Integration Example:**
```typescript
// Evaluate prompts before adding to featured collection
import { evaluatePrompt } from '@/lib/ragas'

const metrics = await evaluatePrompt({
  prompt: promptText,
  responses: testResponses,
  model: 'gpt-4'
})

if (metrics.faithfulness > 0.8 && metrics.relevancy > 0.85) {
  // Add to featured prompts
}
```

**Best Practice:** Use Ragas evaluations when:
- Creating featured or trending prompts
- Evaluating community-submitted prompts
- Benchmarking prompt quality improvements
- A/B testing prompt variations

### Spec Driven Development

**Spec Driven** is a development methodology that prioritizes clear specifications before implementation. It ensures alignment between requirements, design, code, and validation.

**Workflow:**
1. **Write Spec**: Create detailed feature specification in GitHub issue or discussion
2. **Review & Validate**: Team reviews spec for clarity, feasibility, and alignment
3. **Implement**: Developers code following the approved specification
4. **Validate**: Testing against spec ensures requirements are met
5. **Documentation**: Update CLAUDE.md and relevant docs with new patterns

**GitHub Integration:**
- Use **Issues** for feature specifications with `spec` label
- Create **Discussions** for design decisions and architecture questions
- Link **PRs** to specification issues for traceability
- Use **Checklists** in issues to track spec completion

**Example Spec Template:**
```markdown
# [Feature Name] Specification

## Description
Brief overview of the feature

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Architecture
How this fits into existing system

## Database Changes
Tables/columns to be created or modified

## API Endpoints
Endpoints to be created or modified

## UI Components
New components or modifications

## Testing Strategy
How to validate the feature

## Success Criteria
Definition of done for this feature
```

**Benefits for Prompt Party:**
- **Clear Alignment**: Everyone understands feature requirements before coding
- **Reduced Rework**: Specs catch issues early, avoiding implementation cycles
- **Better Code Reviews**: PRs reference clear specifications
- **Easier Onboarding**: New developers understand feature intent from specs
- **Quality Assurance**: Testing team has clear spec to validate against

**Best Practices:**
- Write specs in accessible language (avoid jargon where possible)
- Include examples and use cases
- Define scope boundaries clearly (what's included/excluded)
- Get spec approval before starting implementation
- Update spec if requirements change during development

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
