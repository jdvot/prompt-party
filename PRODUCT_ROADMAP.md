# 🗺️ PROMPT PARTY - PRODUCT ROADMAP

**Date**: November 1, 2025
**Version**: 1.0
**Status**: Q4 2025 - En cours

---

## 📋 TABLE DES MATIÈRES

1. [État Actuel du Produit](#état-actuel-du-produit)
2. [P0 : Features Critiques Manquantes](#p0-features-critiques-manquantes)
3. [P1 : Features Différenciantes](#p1-features-différenciantes)
4. [P2 : Nice-to-Have](#p2-nice-to-have)
5. [Architecture Technique](#architecture-technique)
6. [Roadmap Q4 2025 - Q4 2026](#roadmap-q4-2025---q4-2026)
7. [Métriques Produit](#métriques-produit)
8. [Sprints Planning](#sprints-planning)

---

## 1. ÉTAT ACTUEL DU PRODUIT

### 1.1 Inventory Features Existantes

**Date audit** : November 1, 2025

#### ✅ Core Features (Implémentées)

**Authentication & Users**
- ✅ Supabase Auth (Email, Google, GitHub)
- ✅ User profiles avec avatars
- ✅ Multi-langue (EN, FR, NL via next-intl)
- ✅ Onboarding flow (4 steps)
- ✅ Settings & preferences

**Prompts Management**
- ✅ Create, Read, Update, Delete prompts
- ✅ Markdown editor avec preview
- ✅ Tags système
- ✅ Public/Private prompts
- ✅ Duplicate prompts (templates)
- ✅ Version history (15 versions/prompt)
- ✅ Import/Export (JSON, Markdown, PDF)

**Social Features**
- ✅ Like système (realtime)
- ✅ Comments système (nested threads)
- ✅ Follow users
- ✅ Remix/Fork system avec tree visualization
- ✅ View counter (session-based deduplication)
- ✅ Share buttons (Twitter, LinkedIn, native share API)

**Collections & Organization**
- ✅ Collections (public/private)
- ✅ Bookmarks system
- ✅ Add prompts to multiple collections
- ✅ Collection sharing

**Discovery & Feed**
- ✅ Feed (Top, New, Trending, Following)
- ✅ Trending tags (7 days)
- ✅ Search basique (titre, tags)
- ✅ Feed filters
- ✅ Leaderboard

**Teams & Collaboration**
- ✅ Team workspaces
- ✅ Team members management
- ✅ Roles (Admin, Editor, Viewer)
- ✅ Team invites
- ✅ Collaborative editing (basic)

**Gamification**
- ✅ Challenges system
- ✅ Weekly challenges création
- ✅ Submissions & voting
- ✅ Achievement badges (Creator, Popular, Veteran, etc.)
- ✅ Community voting
- ✅ XP & levels (placeholder)

**Monetization Infrastructure**
- ✅ Pricing page (4 tiers: Free, Pro, Team, Business)
- ✅ Plan management (profils)
- ✅ API access tokens
- ✅ API rate limiting (basique)
- ✅ Credit system (structure DB)

**Analytics & Monitoring**
- ✅ Analytics dashboard (basique)
- ✅ Profile stats (prompts, likes, views, remixes)
- ✅ Prompt performance tracking

**Additional Features**
- ✅ Notifications center
- ✅ Notification settings
- ✅ Templates library
- ✅ Embeddable widgets (iframe)
- ✅ Keyboard shortcuts (global + page-specific)
- ✅ Dark mode
- ✅ Responsive mobile design
- ✅ Design system (Shadcn UI + Tailwind)
- ✅ 57 routes fonctionnelles
- ✅ 111 composants React
- ✅ E2E tests setup (Playwright)

---

#### ❌ Features Implémentées mais NON Fonctionnelles

**AI Prompt Tester**
- ❌ **STATUS** : Placeholder uniquement
- ❌ UI existe (`src/components/ai-tester/prompt-playground.tsx`)
- ❌ Pas d'intégration API réelle (OpenAI, Anthropic, Google)
- ❌ Système de crédits non connecté

**Payments Stripe**
- ❌ **STATUS** : Non implémenté
- ❌ Pricing page existe, mais pas de checkout
- ❌ Pas de webhooks Stripe
- ❌ Pas de gestion subscriptions

**Email Notifications**
- ❌ **STATUS** : Placeholder
- ❌ In-app notifications existent
- ❌ Pas d'emails transactionnels
- ❌ Pas de digest hebdo

**Search Avancé**
- ❌ **STATUS** : Basique uniquement
- ❌ Search par titre/tags fonctionne
- ❌ Pas de full-text search
- ❌ Pas de filtres avancés (date, author, performance)
- ❌ Pas d'autocomplete

**Moderation**
- ❌ **STATUS** : Basique
- ❌ Pas de queue modération
- ❌ Pas de bad-word filter
- ❌ Pas de user reporting

---

### 1.2 Stack Technique Actuel

#### Frontend

**Framework**
- Next.js 15.0.0 (App Router)
- React 19.0.0
- TypeScript 5.x

**UI & Styling**
- Tailwind CSS 3.4.1
- Shadcn UI (Radix UI components)
- Framer Motion 12.23.24 (animations)
- Lucide React (icons)

**State & Forms**
- React Hook Form 7.65.0
- Zod 4.1.12 (validation)

**Internationalization**
- next-intl 4.3.12

**Markdown**
- react-markdown 10.1.0
- remark-gfm 4.0.1
- rehype-sanitize 6.0.0

**Charts & Viz**
- Recharts 3.3.0

**Other**
- date-fns 4.1.0
- cmdk 1.1.1 (command palette)
- jspdf 3.0.3 (PDF export)

---

#### Backend & Database

**Database**
- Supabase (PostgreSQL)
- 15 migrations déployées
- Row Level Security (RLS) activé

**Auth**
- Supabase Auth (@supabase/ssr 0.5.0)
- Email, Google OAuth, GitHub OAuth

**Realtime**
- Supabase Realtime (likes, comments live)

---

#### Infrastructure

**Hosting**
- Vercel (Hobby tier actuellement)
- Next.js Edge Functions
- ISR (Incremental Static Regeneration)

**CI/CD**
- GitHub Actions (implicite Vercel)
- Automated deployments

**Monitoring**
- ❌ Pas de Sentry/monitoring erreurs
- ❌ Pas de analytics produit (Mixpanel/PostHog)
- ❌ Pas de uptime monitoring

---

#### Testing

**Setup**
- Vitest 3.2.4 (unit tests)
- Testing Library React 16.3.0
- Playwright 1.56.1 (E2E tests)
- Happy DOM 20.0.7

**Coverage**
- ❌ Tests non écrits (setup uniquement)

---

### 1.3 Database Schema (15 Migrations)

#### Tables Principales

**1. profiles**
```sql
- id (uuid, pk)
- user_id (uuid, fk auth.users)
- name (text)
- avatar_url (text)
- plan (text) -- free, pro, team, business
- ai_credits (integer)
- onboarding_completed (boolean)
- onboarding_step (integer)
- selected_interests (text[])
- created_at (timestamp)
```

**2. prompts**
```sql
- id (uuid, pk)
- title (text)
- body (text)
- tags (text[])
- author (uuid, fk profiles)
- likes_count (integer)
- comments_count (integer)
- views_count (integer)
- remix_count (integer)
- is_public (boolean)
- created_at (timestamp)
- updated_at (timestamp)
```

**3. likes**
```sql
- user_id (uuid, fk profiles)
- prompt_id (uuid, fk prompts)
- created_at (timestamp)
- PRIMARY KEY (user_id, prompt_id)
```

**4. comments**
```sql
- id (uuid, pk)
- prompt_id (uuid, fk prompts)
- user_id (uuid, fk profiles)
- content (text)
- parent_id (uuid, fk comments) -- nested comments
- created_at (timestamp)
```

**5. forks** (Remix system)
```sql
- id (uuid, pk)
- original_prompt_id (uuid, fk prompts)
- forked_prompt_id (uuid, fk prompts)
- user_id (uuid, fk profiles)
- created_at (timestamp)
```

**6. collections**
```sql
- id (uuid, pk)
- user_id (uuid, fk profiles)
- name (text)
- description (text)
- is_public (boolean)
- created_at (timestamp)
```

**7. collection_items**
```sql
- collection_id (uuid, fk collections)
- prompt_id (uuid, fk prompts)
- added_at (timestamp)
- PRIMARY KEY (collection_id, prompt_id)
```

**8. follows**
```sql
- follower_id (uuid, fk profiles)
- following_id (uuid, fk profiles)
- created_at (timestamp)
- PRIMARY KEY (follower_id, following_id)
```

**9. bookmarks**
```sql
- user_id (uuid, fk profiles)
- prompt_id (uuid, fk prompts)
- folder_id (uuid, fk bookmark_folders, nullable)
- created_at (timestamp)
```

**10. teams** (Workspaces)
```sql
- id (uuid, pk)
- name (text)
- slug (text, unique)
- owner_id (uuid, fk profiles)
- plan (text)
- created_at (timestamp)
```

**11. team_members**
```sql
- team_id (uuid, fk teams)
- user_id (uuid, fk profiles)
- role (text) -- admin, editor, viewer
- joined_at (timestamp)
```

**12. challenges**
```sql
- id (uuid, pk)
- title (text)
- description (text)
- category (text)
- difficulty (text)
- start_date (timestamp)
- end_date (timestamp)
- prize (text)
- created_by (uuid, fk profiles)
```

**13. challenge_submissions**
```sql
- id (uuid, pk)
- challenge_id (uuid, fk challenges)
- prompt_id (uuid, fk prompts)
- user_id (uuid, fk profiles)
- votes_count (integer)
- submitted_at (timestamp)
```

**14. notifications**
```sql
- id (uuid, pk)
- user_id (uuid, fk profiles)
- type (text) -- like, comment, follow, remix
- content (jsonb)
- read (boolean)
- created_at (timestamp)
```

**15. api_keys**
```sql
- id (uuid, pk)
- user_id (uuid, fk profiles)
- key_hash (text)
- name (text)
- last_used (timestamp)
- created_at (timestamp)
```

**16. prompt_versions**
```sql
- id (uuid, pk)
- prompt_id (uuid, fk prompts)
- title (text)
- body (text)
- version_number (integer)
- created_by (uuid, fk profiles)
- created_at (timestamp)
```

**17. templates**
```sql
- id (uuid, pk)
- title (text)
- description (text)
- content (text)
- category (text)
- use_case (text)
- created_at (timestamp)
```

---

## 2. P0 : FEATURES CRITIQUES MANQUANTES

**Priorité** : MUST HAVE pour lancer commercialement
**Timeline** : Q4 2025 - Q1 2026 (Nov 2025 - Feb 2026)

---

### 2.1 AI Prompt Testing RÉEL

**Status** : ❌ Placeholder uniquement
**Priorité** : **P0 - CRITIQUE**
**Effort** : 3 semaines
**Valeur business** : 🔥🔥🔥🔥🔥 (Core value prop)

#### Problème

L'UI de test AI existe (`prompt-playground.tsx`) mais ne fait rien. Aucune intégration API OpenAI, Anthropic ou Google.

#### Solution

**Phase 1 : Single LLM Testing**

1. **Intégration OpenAI API**
   - Endpoint Next.js : `POST /api/ai/test-prompt`
   - Input : `{ prompt: string, model: "gpt-3.5-turbo" | "gpt-4" }`
   - Output : `{ response: string, tokens: number, latency: ms }`
   - Rate limiting par user (Free : 10/mois, Pro : unlimited)

2. **Intégration Anthropic (Claude)**
   - Modèles : Claude 3.5 Sonnet, Claude 3.5 Haiku
   - Même interface que OpenAI

3. **Intégration Google (Gemini)**
   - Modèles : Gemini 1.5 Flash, Gemini 1.5 Pro
   - Via Vertex AI ou API directe

**Phase 2 : Multi-LLM Comparison** (P1)

- Tester même prompt sur GPT-4 + Claude + Gemini simultanément
- Tableau comparatif : Response, Tokens, Latency, Cost
- Save comparison results

#### Technical Specs

**API Routes**

```typescript
// POST /api/ai/test-prompt
interface TestPromptRequest {
  prompt: string
  model: 'gpt-3.5-turbo' | 'gpt-4' | 'claude-3.5-sonnet' | 'gemini-1.5-flash'
  systemPrompt?: string
  temperature?: number
}

interface TestPromptResponse {
  response: string
  model: string
  tokens: {
    input: number
    output: number
    total: number
  }
  latency: number
  cost: number
  timestamp: string
}
```

**Credit System**

```typescript
// Update profiles table
alter table profiles add column ai_credits_used integer default 0;
alter table profiles add column ai_credits_limit integer default 10;

// Free plan: 10 tests/month
// Pro plan: unlimited (9999)
// Team plan: unlimited per member
// Business plan: unlimited
```

**Cost Management**

| Model | Cost/1M tokens (input/output) | Free tier cost | Pro tier cost |
|-------|-------------------------------|----------------|---------------|
| GPT-3.5 Turbo | $0.50/$1.50 | €0.001/test | €0.001/test |
| GPT-4 | $30/$60 | N/A | €0.05/test |
| Claude 3.5 Sonnet | $3/$15 | €0.005/test | €0.01/test |
| Gemini Flash | $0.15/$0.60 | €0.0005/test | €0.0005/test |

**Monthly API costs estimés** :
- 1,000 users Free (10 tests) = 10K tests × €0.001 = €10
- 100 users Pro (100 tests avg) = 10K tests × €0.01 = €100
- **Total M6** : €110/mois (marginal)

#### Deliverables

- [ ] OpenAI integration (1 semaine)
- [ ] Claude integration (3 jours)
- [ ] Gemini integration (3 jours)
- [ ] Credit system + rate limiting (1 semaine)
- [ ] UI updates (2 jours)
- [ ] Tests E2E (2 jours)

---

### 2.2 Payments Stripe

**Status** : ❌ Non implémenté
**Priorité** : **P0 - CRITIQUE**
**Effort** : 2 semaines
**Valeur business** : 🔥🔥🔥🔥🔥 (Revenus!)

#### Problème

Pricing page existe, mais impossible de payer. Pas de checkout, pas de subscriptions.

#### Solution

**1. Stripe Setup**

- Compte Stripe (mode test → production)
- Products créés : Free, Pro (€9.99/mois), Team (€29/mois), Business (€99/mois)
- Webhooks configurés

**2. Checkout Flow**

```typescript
// User clicks "Upgrade to Pro"
// → POST /api/stripe/create-checkout-session
// → Redirect to Stripe Checkout
// → Success → /api/stripe/webhooks (checkout.session.completed)
// → Update profile.plan = 'pro'
// → Redirect /success
```

**3. Webhooks**

Events à gérer :
- `checkout.session.completed` : Nouvelle subscription
- `customer.subscription.updated` : Changement plan
- `customer.subscription.deleted` : Annulation
- `invoice.payment_succeeded` : Paiement mensuel OK
- `invoice.payment_failed` : Paiement échoué

**4. Customer Portal**

- Stripe Customer Portal intégré
- User peut : Upgrade, Downgrade, Cancel, Update card
- Link : `/settings/billing` → Redirect Stripe Portal

#### Technical Specs

**API Routes**

```typescript
// POST /api/stripe/create-checkout-session
interface CreateCheckoutRequest {
  priceId: string // Stripe Price ID
  successUrl: string
  cancelUrl: string
}

// POST /api/stripe/create-portal-session
// Returns: { url: string } → Redirect

// POST /api/stripe/webhooks (Stripe signatures verification)
```

**Database Updates**

```sql
-- Add to profiles table
alter table profiles add column stripe_customer_id text;
alter table profiles add column stripe_subscription_id text;
alter table profiles add column subscription_status text; -- active, canceled, past_due
alter table profiles add column subscription_current_period_end timestamp;
```

**Environment Variables**

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Price IDs
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_TEAM_MONTHLY=price_...
STRIPE_PRICE_BUSINESS_MONTHLY=price_...
```

#### Deliverables

- [ ] Stripe account setup (1 jour)
- [ ] Checkout flow (3 jours)
- [ ] Webhooks handler (3 jours)
- [ ] Customer Portal integration (2 jours)
- [ ] Database schema updates (1 jour)
- [ ] UI updates (Settings > Billing page) (2 jours)
- [ ] Tests E2E checkout (2 jours)

---

### 2.3 Email Notifications

**Status** : ❌ Placeholder
**Priorité** : **P0 - IMPORTANT**
**Effort** : 1 semaine
**Valeur business** : 🔥🔥🔥 (Retention)

#### Problème

In-app notifications existent, mais pas d'emails. Users ne reviennent pas sur la plateforme.

#### Solution

**Service Email** : **Resend** (recommended) ou Postmark

**Templates à créer** :

1. **Transactionnels**
   - Welcome email (signup)
   - Email verification
   - Password reset
   - Payment confirmation
   - Subscription renewal reminder

2. **Engagement**
   - New follower
   - Prompt liked
   - Prompt commented
   - Prompt remixed
   - Challenge submission voted

3. **Digest**
   - Weekly digest : Top prompts, Your stats, Challenges
   - Monthly recap

#### Technical Specs

**Email Service : Resend**

Avantages :
- €0 jusqu'à 3K emails/mois (parfait bootstrap)
- API simple (vs. SendGrid complexe)
- React Email templates (TSX → HTML)
- Analytics built-in

**Implementation**

```typescript
// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'Prompt Party <hello@promptparty.ai>',
    to,
    subject: 'Welcome to Prompt Party! 🎉',
    react: WelcomeEmail({ name }),
  })
}
```

**React Email Templates**

```tsx
// emails/welcome.tsx
import { Html, Button, Text } from '@react-email/components'

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Text>Hi {name}! 👋</Text>
      <Text>Welcome to Prompt Party, the social network for AI prompts.</Text>
      <Button href="https://promptparty.ai/feed">
        Explore Top Prompts
      </Button>
    </Html>
  )
}
```

**Notification Preferences**

```sql
-- Add to profiles table
alter table profiles add column email_notifications jsonb default '{
  "new_follower": true,
  "prompt_liked": true,
  "prompt_commented": true,
  "prompt_remixed": true,
  "weekly_digest": true,
  "product_updates": true
}'::jsonb;
```

#### Deliverables

- [ ] Resend setup (1 jour)
- [ ] React Email templates (3 jours)
- [ ] Transactional emails (2 jours)
- [ ] Notification preferences UI (1 jour)
- [ ] Weekly digest cron (Vercel Cron) (2 jours)

---

### 2.4 Search Avancé

**Status** : ❌ Basique uniquement
**Priorité** : **P0 - IMPORTANT**
**Effort** : 1 semaine
**Valeur business** : 🔥🔥🔥 (Discovery)

#### Problème

Search actuel = `WHERE title ILIKE '%query%'`. Lent, pas de ranking, pas de filtres.

#### Solution

**Option A : Postgres Full-Text Search** (Recommandé pour MVP)

Avantages :
- Gratuit (Supabase inclus)
- Performant (GIN index)
- Pas de service externe

Implementation :

```sql
-- Add tsvector column
alter table prompts add column search_vector tsvector;

-- Populate on insert/update
create function prompts_search_vector_update() returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.body, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(new.tags, ' '), '')), 'C');
  return new;
end;
$$ language plpgsql;

create trigger prompts_search_vector_trigger
before insert or update on prompts
for each row execute function prompts_search_vector_update();

-- GIN index
create index prompts_search_vector_idx on prompts using gin(search_vector);

-- Search query
select * from prompts
where search_vector @@ plainto_tsquery('english', 'chatgpt marketing')
order by ts_rank(search_vector, plainto_tsquery('english', 'chatgpt marketing')) desc;
```

**Option B : Typesense/Algolia** (Pour scale futur)

- Typesense : Self-hosted ou cloud ($0.03/h = €20/mois)
- Algolia : €1/1K searches (cher pour volume)

**Recommandation** : Postgres FTS pour P0, migrer Typesense M12+

#### Features

1. **Full-text search** : Titre + Body + Tags
2. **Autocomplete** : Top 10 suggestions
3. **Filtres** :
   - Tags (multi-select)
   - Author
   - Date range
   - Likes/Views range
   - Public/Private (own prompts)
4. **Tri** :
   - Relevance (default)
   - Most recent
   - Most liked
   - Most viewed

#### Deliverables

- [ ] Postgres FTS setup (2 jours)
- [ ] API route `/api/search` (1 jour)
- [ ] Autocomplete component (2 jours)
- [ ] Advanced filters UI (2 jours)
- [ ] Tests (1 jour)

---

### 2.5 Moderation Tools

**Status** : ❌ Aucun
**Priorité** : **P0 - IMPORTANT**
**Effort** : 1 semaine
**Valeur business** : 🔥🔥 (Qualité, légal)

#### Problème

Actuellement : 0 modération. Risque spam, contenu inapproprié, RGPD non-compliant.

#### Solution

**1. Bad-Word Filter (Auto)**

```typescript
// lib/moderation.ts
import Filter from 'bad-words'

const filter = new Filter()

export function moderateContent(text: string): {
  clean: boolean
  flagged: string[]
} {
  const flagged = filter.list.filter(word =>
    text.toLowerCase().includes(word)
  )

  return {
    clean: flagged.length === 0,
    flagged,
  }
}
```

Usage :
- Run on prompt create/update
- If flagged → Queue for manual review
- Notify user "Your prompt is under review"

**2. User Reporting**

UI : "Report" button sur prompts, comments

```sql
-- New table
create table reports (
  id uuid primary key default uuid_generate_v4(),
  reported_content_type text, -- 'prompt' | 'comment' | 'user'
  reported_content_id uuid,
  reported_by uuid references profiles(user_id),
  reason text,
  status text default 'pending', -- pending, resolved, ignored
  created_at timestamp default now()
);
```

**3. Moderation Queue**

Admin page : `/admin/moderation`

Features :
- List of flagged prompts/comments
- Actions : Approve, Delete, Ban user
- Analytics : Reports/day, resolution time

**4. Rate Limiting (Spam protection)**

```typescript
// Vercel Edge Middleware or Redis
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 prompts/hour
})

// In API route
const { success } = await ratelimit.limit(userId)
if (!success) {
  return new Response('Too many requests', { status: 429 })
}
```

#### Deliverables

- [ ] Bad-words filter (1 jour)
- [ ] User reporting system (2 jours)
- [ ] Moderation queue UI (2 jours)
- [ ] Rate limiting (Upstash) (2 jours)

---

## 3. P1 : FEATURES DIFFÉRENCIANTES

**Priorité** : SHOULD HAVE pour compétitivité
**Timeline** : Q1-Q2 2026 (Feb - Jun 2026)

---

### 3.1 Multi-LLM Comparison

**Priorité** : **P1 - HIGH**
**Effort** : 2 semaines
**Valeur business** : 🔥🔥🔥🔥 (Killer feature)

#### Problème

Users doivent tester prompts sur ChatGPT, puis Claude, puis Gemini séparément. Chronophage, pas de vue d'ensemble.

#### Solution

**UI : Split-screen comparison**

```
+------------------------+------------------------+------------------------+
| GPT-4                  | Claude 3.5 Sonnet      | Gemini 1.5 Pro        |
| Response...            | Response...            | Response...            |
| Tokens: 150            | Tokens: 142            | Tokens: 138            |
| Latency: 1.2s          | Latency: 0.9s          | Latency: 0.8s          |
| Cost: €0.009           | Cost: €0.002           | Cost: €0.0004          |
+------------------------+------------------------+------------------------+
           [Save Comparison] [Export Table] [Share]
```

**Backend**

```typescript
// POST /api/ai/compare
interface CompareRequest {
  prompt: string
  models: string[] // ['gpt-4', 'claude-3.5-sonnet', 'gemini-1.5-pro']
  systemPrompt?: string
}

// Run in parallel
const results = await Promise.all(
  models.map(model => testPrompt({ prompt, model }))
)

return {
  results,
  winner: determineWinner(results), // by speed, quality, cost
}
```

**Save Comparisons**

```sql
create table prompt_comparisons (
  id uuid primary key,
  user_id uuid references profiles,
  prompt text,
  results jsonb, -- { model, response, tokens, latency, cost }[]
  created_at timestamp
);
```

#### Deliverables

- [ ] API parallel testing (3 jours)
- [ ] Split-screen UI (1 semaine)
- [ ] Save comparisons (2 jours)
- [ ] Export/Share (1 jour)

---

### 3.2 Prompt Optimization AI

**Priorité** : **P1 - MEDIUM**
**Effort** : 2 semaines
**Valeur business** : 🔥🔥🔥 (Différenciant)

#### Problème

Users écrivent des prompts suboptimaux (vagues, trop courts, mal structurés).

#### Solution

**AI Prompt Optimizer** : Feed un prompt → AI le réécrit de manière optimisée

**UI** :

```
Original Prompt:
"Write a blog post about AI"

[Optimize with AI]

Optimized Prompt:
"You are an expert tech blogger with 10 years of experience.
Write a comprehensive 1,500-word blog post about the impact
of AI on software development in 2025.

Structure:
1. Introduction (hook + context)
2. 3 main trends with examples
3. Challenges and ethical considerations
4. Conclusion with actionable takeaways

Tone: Professional but accessible
Audience: Mid-level developers and tech managers"

[Apply] [Compare Results]
```

**Backend**

```typescript
// Use GPT-4 to optimize prompts
const systemPrompt = `You are a prompt engineering expert.
Given a user's rough prompt, rewrite it to be:
- Clear and specific
- Well-structured
- Context-rich
- Include desired format, tone, audience

Output only the optimized prompt, no explanation.`

const optimized = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ],
})
```

**Cost** : €0.05/optimization (GPT-4 tokens)

**Limitation** : Pro users only, 10 optimizations/mois Free

#### Deliverables

- [ ] Optimizer API (3 jours)
- [ ] UI component (1 semaine)
- [ ] Usage limits (2 jours)

---

### 3.3 Collaborative Editing Real-Time

**Priorité** : **P1 - MEDIUM**
**Effort** : 3 semaines
**Valeur business** : 🔥🔥🔥 (Team feature)

#### Problème

Teams ne peuvent pas co-éditer prompts en temps réel (Google Docs style).

#### Solution

**Tech** : Yjs + Supabase Realtime ou Liveblocks

**Option A : Yjs + Supabase** (Gratuit)

```typescript
import * as Y from 'yjs'
import { SupabaseProvider } from 'y-supabase'

const ydoc = new Y.Doc()
const provider = new SupabaseProvider(ydoc, supabase, 'prompts', promptId)

const ytext = ydoc.getText('content')

// Bind to editor
ytext.observe(event => {
  editor.setValue(ytext.toString())
})

editor.on('change', () => {
  ytext.delete(0, ytext.length)
  ytext.insert(0, editor.getValue())
})
```

**Option B : Liveblocks** (€99/mois 100 users)

Plus simple, meilleure UX (cursors, présence users).

**Recommandation** : Yjs pour P1, migrer Liveblocks si traction Team plans.

#### Deliverables

- [ ] Yjs integration (1 semaine)
- [ ] Editor bindings (1 semaine)
- [ ] Presence indicators (cursors, users online) (3 jours)
- [ ] Conflict resolution (2 jours)

---

### 3.4 Marketplace Transactions

**Priorité** : **P1 - MEDIUM**
**Effort** : 2 semaines
**Valeur business** : 🔥🔥 (Revenue diversification)

#### Problème

Actuellement, tous prompts sont gratuits. Pas de modèle marketplace (vendre prompts premium).

#### Solution

**Model PromptBase** : Users vendent prompts, nous prenons 20% commission.

**Flow** :

1. Creator marks prompt as "For Sale" (€3-€10)
2. Buyer clicks "Buy" → Stripe Checkout
3. Payment processed → 80% to creator, 20% to platform
4. Buyer gains access to prompt (unlocked)

**Technical**

```sql
-- Add to prompts table
alter table prompts add column for_sale boolean default false;
alter table prompts add column price_cents integer;

-- New table: purchases
create table purchases (
  id uuid primary key,
  buyer_id uuid references profiles,
  prompt_id uuid references prompts,
  price_cents integer,
  platform_fee_cents integer, -- 20%
  seller_payout_cents integer, -- 80%
  stripe_payment_intent_id text,
  created_at timestamp
);
```

**Stripe Connect** (Payouts to creators)

- Creators connect Stripe account
- Platform collects full payment
- Auto-transfer 80% to creator (daily batches)

#### Deliverables

- [ ] Stripe Connect setup (3 jours)
- [ ] Sell prompt flow (3 jours)
- [ ] Buy prompt flow (3 jours)
- [ ] Payout system (1 semaine)

---

### 3.5 Analytics Dashboard Pro

**Priorité** : **P1 - LOW**
**Effort** : 1 semaine
**Valeur business** : 🔥🔥 (Pro value-add)

#### Problème

Pro users veulent insights détaillés sur leurs prompts (performance, engagement, virality).

#### Solution

**Dashboard Pro** (like TikTok Analytics)

**Métriques** :

1. **Prompt Performance**
   - Views graph (7 days, 30 days)
   - Likes evolution
   - Comments engagement rate
   - Remix virality score

2. **Audience Insights**
   - Top countries
   - User roles (developers, marketers, etc.)
   - Peak engagement hours

3. **Competitive Benchmarks**
   - Your avg views vs. category average
   - Percentile ranking

**UI** :

```
+---------------------------------------+
| Your Prompts (Last 30 days)          |
| Total Views: 12,453 (+23% vs. prev)  |
| Avg Likes/Prompt: 42                 |
| Top Performer: "ChatGPT Marketing"   |
+---------------------------------------+

[Graph: Views over time]

+-------------------+-------------------+
| Top Countries     | Engagement Hours  |
| 🇺🇸 USA: 45%      | 9AM: 🔥🔥🔥         |
| 🇬🇧 UK: 22%       | 2PM: 🔥🔥🔥🔥        |
| 🇫🇷 France: 15%   | 8PM: 🔥🔥           |
+-------------------+-------------------+
```

**Backend**

```sql
-- New table: prompt_analytics_daily
create table prompt_analytics_daily (
  prompt_id uuid,
  date date,
  views_count integer,
  likes_count integer,
  comments_count integer,
  remixes_count integer,
  primary key (prompt_id, date)
);

-- Populate via cron daily
```

#### Deliverables

- [ ] Analytics schema (2 jours)
- [ ] Cron aggregation (2 jours)
- [ ] Dashboard UI (3 jours)

---

## 4. P2 : NICE-TO-HAVE

**Priorité** : COULD HAVE (après PMF)
**Timeline** : Q3-Q4 2026 (Jul - Dec 2026)

---

### 4.1 Browser Extension

**Effort** : 2 semaines
**Valeur** : 🔥🔥 (Convenience)

**Concept** : Save prompts from ChatGPT, Claude web → Prompt Party

**Features** :
- Detect prompt in ChatGPT textarea
- "Save to Prompt Party" button
- Auto-tag based on conversation

**Tech** : Chrome Extension Manifest V3

---

### 4.2 Mobile App (React Native)

**Effort** : 2 mois
**Valeur** : 🔥🔥🔥 (Mobile-first users)

**Scope** :
- Browse feed
- Create/edit prompts (mobile keyboard)
- Like, comment
- Notifications push

**Tech** : React Native, Expo

---

### 4.3 Slack/Discord Bots

**Effort** : 1 semaine
**Valeur** : 🔥🔥 (B2B teams)

**Features** :
- `/prompt search [query]` → Top 5 results
- `/prompt save [content]` → Save to Prompt Party
- Daily digest in #ai-prompts channel

---

### 4.4 White-Label Enterprise

**Effort** : 3 semaines
**Valeur** : 🔥🔥🔥 (Business tier)

**Features** :
- Custom domain (prompts.company.com)
- Custom branding (logo, colors)
- SSO (Okta, Azure AD)
- Private instance (data isolation)

---

## 5. ARCHITECTURE TECHNIQUE

### 5.1 Current Stack Evaluation

#### ✅ What's Working Well

**Next.js 15 + App Router**
- SSR, ISR working great
- Edge functions performant
- Good DX

**Supabase**
- Auth solid
- Realtime works (likes, comments)
- RLS protects data
- Free tier généreux (0.5GB DB, 1GB storage)

**Vercel**
- Deploy seamless
- Edge network fast
- Hobby tier OK pour MVP

**Shadcn UI**
- Beautiful components
- Customizable
- Great DX

---

#### ⚠️ What Needs Improvement

**1. Monitoring & Observability**

Current : ❌ Aucun

Needed :
- **Sentry** : Error tracking, performance (€0 jusqu'à 5K events/mois)
- **Vercel Analytics** : Web vitals, traffic (inclus)
- **PostHog** ou **Mixpanel** : Product analytics, funnels (€0 jusqu'à 1M events)
- **Uptime monitoring** : Better Uptime, Pingdom (€10/mois)

**2. Caching Strategy**

Current : Next.js ISR basique

Needed :
- **Redis** (Upstash) : Cache hot prompts, session data (€0.20/100K requests)
- **CDN** : Vercel Edge déjà inclus, mais optimiser headers

**3. Database Performance**

Current : Supabase Free (Postgres)

Scaling concerns :
- Connection pooling (Supabase Pooler)
- Indexes optimisation (analyze slow queries)
- Read replicas (Supabase Pro @ €25/mois)

**4. Image Optimization**

Current : Next.js Image component

Needed :
- **Cloudinary** ou **Uploadcare** : Avatar uploads, transformations (€0 jusqu'à 25GB)

**5. Background Jobs**

Current : Vercel Cron (limited)

Needed :
- **Inngest** ou **Quirrel** : Scheduled jobs, retries (€0 jusqu'à 10K runs)
- Use cases : Weekly digest, analytics aggregation, cleanup

---

### 5.2 Scaling Plan

#### M1-M6 : Hobby Tier

- Vercel Hobby : €0
- Supabase Free : €0
- Total infra : **€10/mois** (domain)

**Limits** :
- 100GB bandwidth/mois
- 100K function invocations
- 0.5GB database

**OK jusqu'à** : ~2,000 users

---

#### M7-M12 : Pro Tier

- **Vercel Pro** : €20/mois
  - 1TB bandwidth
  - 1M function invocations
  - Team collaboration

- **Supabase Pro** : €25/mois
  - 8GB database
  - 100GB storage
  - Daily backups
  - Compute optimized

- **Upstash Redis** : €10/mois
  - 1GB cache
  - 1M requests

- **Resend** : €20/mois
  - 50K emails

- **PostHog** : €0 (free tier)

**Total** : **€75/mois**

**OK jusqu'à** : ~25,000 users

---

#### M13+ : Scale Tier

- Vercel Pro : €20/mois
- Supabase Team : €99/mois (larger DB, read replicas)
- Upstash Pro : €30/mois
- Resend : €80/mois (200K emails)
- PostHog : €50/mois (unlimited events)
- Sentry : €26/mois (errors + performance)
- Cloudinary : €89/mois (images)

**Total** : **€394/mois**

**OK jusqu'à** : 100K+ users

---

### 5.3 Security & Compliance

#### RGPD Compliance

**Current status** : ⚠️ Basique

**TODO** :

- [ ] Privacy Policy page (update)
- [ ] Cookie consent banner
- [ ] Data export (GDPR Article 20)
- [ ] Data deletion (right to be forgotten)
- [ ] Email opt-out/unsubscribe
- [ ] DPO contact (si >250 employees ou data sensitive)

**Resources** :
- [CNIL Guide](https://www.cnil.fr/)
- Template privacy policy : Termly, Iubenda

---

#### Security Best Practices

**Current** :
- ✅ Supabase RLS (Row Level Security)
- ✅ JWT Auth
- ✅ HTTPS (Vercel)
- ✅ CORS configured
- ⚠️ Rate limiting basique

**TODO** :

- [ ] **Helmet.js** : Security headers
- [ ] **CSRF protection** : Next.js built-in
- [ ] **SQL injection** : Already protected (Supabase Postgrest)
- [ ] **XSS** : DOMPurify for user content (already using rehype-sanitize ✅)
- [ ] **Rate limiting** : Upstash Ratelimit (API routes)
- [ ] **Secrets rotation** : Stripe keys, API keys
- [ ] **Penetration testing** : M12 (bug bounty HackerOne)

---

## 6. ROADMAP Q4 2025 - Q4 2026

### Q4 2025 (Nov - Dec 2025) - FOUNDATION

**Objectif** : P0 features + First paying users

**Product** :
- ✅ AI Testing RÉEL (OpenAI, Claude, Gemini)
- ✅ Stripe Payments (checkout, webhooks)
- ✅ Email notifications (Resend)
- ✅ Search avancé (Postgres FTS)
- ✅ Moderation tools (bad-words, reporting)

**Marketing** :
- 🚀 Product Hunt launch
- 📝 20 articles SEO
- 🐦 Twitter growth (500 followers)

**Milestones** :
- 500 users
- €500 MRR
- 10 Pro users
- NPS >40

---

### Q1 2026 (Jan - Mar 2026) - TRACTION

**Objectif** : 1,000 users + Pre-Seed fundraising

**Product** :
- ✅ Multi-LLM Comparison
- ✅ Prompt Optimizer AI
- ✅ Analytics Dashboard Pro
- ✅ Monitoring (Sentry, PostHog)

**Marketing** :
- 💸 Paid ads start (€2K/mois)
- 🤝 5 micro-influenceurs partnerships
- 📧 Newsletter 1,000 subscribers

**Fundraising** :
- 📊 Deck finalisé
- 🎤 Pitch 10 VCs
- 💰 **€500K-€800K levés** 🎯

**Milestones** :
- 1,500 users
- €2,000 MRR
- 200 Pro users
- **Pre-Seed closed**

---

### Q2 2026 (Apr - Jun 2026) - GROWTH

**Objectif** : Scale acquisition, 5K users

**Product** :
- ✅ Collaborative Editing Real-Time
- ✅ Marketplace Transactions
- ✅ API Publique v1
- ✅ Mobile-responsive optimizations

**Team** :
- 👨‍💻 Dev senior hired
- 📈 Growth marketer hired

**Marketing** :
- 💸 Paid ads scale (€5K/mois)
- 📺 YouTube channel (10 videos)
- 🎤 First webinar hosted

**Milestones** :
- 6,000 users
- €8,000 MRR
- CAC €20, LTV €150

---

### Q3 2026 (Jul - Sep 2026) - SCALE

**Objectif** : 15K users, prepare Seed

**Product** :
- ✅ Browser Extension (Chrome)
- ✅ Advanced Analytics (benchmarks, insights)
- ✅ Team features enhancements (SSO, roles)
- ✅ Performance optimizations

**Marketing** :
- 💸 Paid ads €8K/mois
- 🎯 First sponsored challenge
- 🤝 Channel partnerships (2)
- 🎪 VivaTech booth

**Milestones** :
- 18,000 users
- €20,000 MRR
- 2,500 paying customers
- Seed deck drafted

---

### Q4 2026 (Oct - Dec 2026) - ENTERPRISE

**Objectif** : 25K users, Seed round

**Product** :
- ✅ White-Label (Business tier)
- ✅ Slack/Discord bots
- ✅ Mobile App (React Native) beta
- ✅ API v2 (webhooks, advanced)

**Team** :
- Scale to 10 people (devs, sales, marketing)

**Fundraising** :
- 💰 **Seed €1M-€1.5M levés** 🎯

**Milestones** :
- 30,000 users
- €40,000 MRR (**€480K ARR**)
- 5,000 paying customers
- Series A ready (2027)

---

## 7. MÉTRIQUES PRODUIT

### 7.1 North Star Metric

**WAC : Weekly Active Creators**

Users qui créent ou remixent ≥1 prompt/semaine

**Pourquoi** :
- Mesure vraie valeur (création, pas consommation passive)
- Prédit rétention long-terme
- Corrèle avec conversion Pro

**Target** :
- M6 : 200 WAC (20% des 1,000 users)
- M12 : 2,000 WAC (25% des 8,000)
- M18 : 6,000 WAC (24% des 25,000)

---

### 7.2 Acquisition Metrics

**1. Signups**
- Target M6 : 1,000
- Target M12 : 8,000
- Target M18 : 25,000

**2. CAC (Customer Acquisition Cost)**
- M1-M6 : €5 (organic)
- M7-M12 : €20 (mix)
- M13-M18 : €25 (paid scale)

**3. Conversion Rate (Landing → Signup)**
- Target : 15-25%
- Benchmark : 5-10% (SaaS standard)

**4. Source Mix**
- Organic (SEO, Product Hunt) : 40%
- Social : 25%
- Paid : 25%
- Referral : 10%

---

### 7.3 Activation Metrics

**1. Time to First Prompt**
- Target : <5 minutes
- Measure : Median time signup → first prompt created

**2. Onboarding Completion**
- Target : >70%
- 4 steps : Welcome → Interests → Follow → Tour

**3. First Week Actions**
- Created ≥1 prompt : >60%
- Liked ≥1 prompt : >80%
- Commented : >20%
- Followed ≥1 user : >40%

---

### 7.4 Retention Metrics

**1. Cohort Retention**

| Day | Target | Benchmark |
|-----|--------|-----------|
| D1 | 60% | 40-50% |
| D7 | 40% | 20-30% |
| D30 | 25% | 10-15% |

**2. WAU/MAU Ratio**
- Target : >30% (stickiness)

**3. Churn Mensuel**
- Free users : 15% acceptable
- Pro users : <10% target (benchmark : 5-7%)

---

### 7.5 Engagement Metrics

**1. Prompts Created**
- Per user/month : >3
- WAC : >4

**2. Social Actions**
- Likes/prompt : >15
- Comments/prompt : >2
- Remix rate : >5%

**3. Session Metrics**
- Sessions/user/week : >3
- Avg session duration : >8 min
- Pages/session : >5

---

### 7.6 Revenue Metrics

**1. MRR (Monthly Recurring Revenue)**
- M6 : €1,500
- M12 : €25,000
- M18 : €40,000

**2. ARPU (Average Revenue Per User)**
- Target : €12/mois (paying users)

**3. Free → Pro Conversion**
- Target : 12-15% (vs. benchmark 2-5%)

**4. LTV (Lifetime Value)**
- Calculation : ARPU / Churn
- Target : €150 (€10/mois × 15 mois)

**5. LTV:CAC Ratio**
- Target : >3:1
- Projected : 6-8:1 🎯

**6. Payback Period**
- Target : <6 mois
- Projected : 2 mois 🔥

---

### 7.7 Technical Metrics

**1. Uptime**
- Target : 99.5%+ (M1-M6)
- Target : 99.9%+ (M12+, SLA Business plan)

**2. API Latency**
- P50 : <200ms
- P95 : <500ms
- P99 : <1s

**3. Error Rate**
- Target : <0.5%
- Critical errors : <0.1%

**4. Build Times**
- Vercel deploy : <3 min
- E2E tests : <5 min

---

## 8. SPRINTS PLANNING

### Sprint Structure

**Duration** : 2 semaines
**Team** : 1 dev (M1-M6) → 2 devs (M7+) → 4 devs (M12+)
**Velocity** : 20 story points/sprint (solo) → 40 SP (2 devs) → 80 SP (4 devs)

---

### Q4 2025 Sprints (Nov-Dec 2025)

#### Sprint 1 (Nov 1-15) - AI TESTING

**Goal** : Lancer AI testing réel

**Tasks** :
- [ ] OpenAI API integration (8 SP)
- [ ] Claude API integration (5 SP)
- [ ] Gemini API integration (5 SP)
- [ ] Credit system + rate limiting (5 SP)
- [ ] UI updates (3 SP)

**Total** : 26 SP

**Demo** : User teste prompt sur GPT-4, voit résultat + tokens + cost

---

#### Sprint 2 (Nov 16-30) - PAYMENTS

**Goal** : Premiers €€€

**Tasks** :
- [ ] Stripe setup (products, webhooks) (5 SP)
- [ ] Checkout flow (8 SP)
- [ ] Webhooks handler (8 SP)
- [ ] Customer Portal (3 SP)
- [ ] Billing page UI (3 SP)

**Total** : 27 SP

**Demo** : User upgrade to Pro, payment works, plan updated

---

#### Sprint 3 (Dec 1-15) - EMAIL + SEARCH

**Goal** : Retention + Discovery

**Tasks** :
- [ ] Resend setup + templates (5 SP)
- [ ] Transactional emails (5 SP)
- [ ] Postgres FTS setup (8 SP)
- [ ] Search API + UI (8 SP)

**Total** : 26 SP

**Demo** : User receives welcome email, searches "chatgpt marketing", gets relevant prompts

---

#### Sprint 4 (Dec 16-31) - MODERATION

**Goal** : Qualité + sécurité

**Tasks** :
- [ ] Bad-words filter (3 SP)
- [ ] User reporting (5 SP)
- [ ] Moderation queue UI (8 SP)
- [ ] Rate limiting (Upstash) (5 SP)
- [ ] Buffer / bugs fixes (4 SP)

**Total** : 25 SP

**Demo** : Prompt avec contenu inapproprié → Flagged → Moderation queue

---

### Q1 2026 Sprints (Jan-Mar 2026)

#### Sprint 5-6 (Jan) - MULTI-LLM + OPTIMIZER

- Multi-LLM comparison side-by-side
- Prompt optimizer AI
- Monitoring (Sentry, PostHog)

#### Sprint 7-8 (Feb) - ANALYTICS PRO

- Dashboard Pro avec graphs
- Audience insights
- Benchmarks vs. category

#### Sprint 9-10 (Mar) - POLISH + FUNDRAISE

- Bug fixes
- Performance optimizations
- Deck finalization
- Pitch prep

---

## CONCLUSION

Ce **Product Roadmap** est aligné avec le **Business Plan** pour atteindre :

✅ **M6** : 1,000 users, €1,500 MRR (Bootstrap)
✅ **M12** : 8,000 users, €25K MRR, **Pre-Seed levée €500K**
✅ **M18** : 25,000 users, €40K MRR, **Ready for Seed €1M+**

**Priorisation** : P0 (Q4 2025) → P1 (Q1-Q2 2026) → P2 (Q3-Q4 2026)

**Focus** :
1. Ship P0 features (AI testing, payments, emails) → Commercialement viable
2. Build P1 differentiators (multi-LLM, optimizer) → Compétitivité
3. Scale (P2 features) → Growth

---

**Document créé le** : 1 novembre 2025
**Prochaine revue** : 1 décembre 2025
**Owner** : Julien Devot (CEO)

Pour questions techniques : [votre email]
