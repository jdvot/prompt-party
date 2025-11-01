# 📊 Marketing Suite Package

**Package métier pour Prompt Party** ciblant les marketers et créateurs de contenu professionnels.

---

## 🎯 Overview

Le **Marketing Suite** est un package premium (€49/mois) conçu spécifiquement pour les professionnels du marketing digital :
- Freelance marketers
- Content creators
- Social media managers
- Copywriters
- Agences marketing

### Value Proposition

> "Économisez 10+ heures par semaine sur votre création de contenu avec 500+ prompts marketing testés en production, multi-LLM testing illimité, et analytics avancées."

---

## 💰 Business Model

### Pricing

**€49/mois** (ou €490/an avec 2 mois gratuits)

**Positionnement** :
- Entre Pro (€9.99) et Team (€99)
- Cible un segment spécifique à forte valeur ajoutée
- Prix justifié par le ROI démontrable (€500+ valeur/mois en temps économisé)

### Unit Economics

| Metric | Value |
|--------|-------|
| **Prix** | €49/mois |
| **COGS** | €8.50/mois |
| **Marge brute** | €40.50 (82%) |
| **LTV** | €490 (10 mois rétention) |
| **CAC cible** | €50 (LinkedIn ads) |
| **LTV:CAC** | 9.8:1 🔥 |
| **Payback** | 1 mois |

### Projections 12 mois

| Mois | Clients | MRR | ARR Run Rate |
|------|---------|-----|--------------|
| M3 | 50 | €2,450 | €29,400 |
| M6 | 150 | €7,350 | €88,200 |
| M12 | 400 | €19,600 | €235,200 |

---

## ✨ Features Incluses

### 1. Marketing Prompt Library (500+ prompts)

**Categories** :
- **Copywriting** (80 prompts) : Landing pages, emails, sales pages, product descriptions
- **SEO** (70 prompts) : Meta descriptions, blog outlines, keyword research
- **Social Media** (100 prompts) : LinkedIn, Twitter threads, Instagram, TikTok
- **Advertising** (80 prompts) : Facebook ads, Google ads, cold emails
- **Video** (70 prompts) : YouTube scripts, TikTok hooks, webinars
- **Email Marketing** (100 prompts) : Newsletters, sequences, promotional

**Accès** :
```typescript
// API endpoint
GET /api/marketing-prompts
GET /api/marketing-prompts/:id
GET /api/marketing-prompts/category/:category

// Database
SELECT * FROM marketing_prompts WHERE category = 'copywriting'
```

### 2. Unlimited Multi-LLM Testing

- Test prompts sur GPT-4, Claude 3.5, Gemini simultanément
- Comparaison side-by-side (qualité, tokens, latency, cost)
- Historique illimité

### 3. Brand Voice Training

Permet aux users d'entraîner l'AI sur leur style de marque :

```typescript
interface BrandVoiceProfile {
  brand_name: string
  tone: 'professional' | 'casual' | 'playful' | 'inspirational'
  vocabulary: string[] // Mots clés à utiliser
  avoid_words: string[] // Mots à éviter
  examples: string[] // Exemples de contenu existant
  target_audience: string
}

// Stocké dans profiles.brand_voice_profile (JSONB)
```

### 4. Marketing Analytics Dashboard

Métriques trackées quotidiennement :

```sql
CREATE TABLE marketing_suite_analytics (
  prompts_used INTEGER,
  ai_tests_run INTEGER,
  multi_llm_comparisons INTEGER,
  brand_voice_optimizations INTEGER,
  time_saved_minutes INTEGER,
  roi_estimated_euros DECIMAL
)
```

**Dashboard affiche** :
- Prompts utilisés (7j, 30j, total)
- Temps économisé (calculé : 45 min/prompt moyen)
- ROI estimé (€50/h taux freelance = €0.83/min)
- Top prompts utilisés
- Graphiques d'évolution

### 5. Mini-Team (3 seats)

- 1 compte principal + 2 invités
- Partage de collections marketing
- Collaboration basique (pas real-time editing pour MVP)

```sql
ALTER TABLE profiles
ADD COLUMN team_seats_used INTEGER DEFAULT 1,
ADD COLUMN team_seats_limit INTEGER DEFAULT 3 -- Marketing Suite
```

### 6. Priority Support

- Response time <2h (vs. 24h pour Free/Pro)
- Email dédié : support-marketing@promptparty.ai
- Badge "Priority" dans ticket system

### 7. Masterclasses (12/an)

- 1 webinar/mois (1h) sur advanced AI marketing
- Topics : Prompt engineering, AI workflows, case studies
- Accès replays à vie
- Q&A avec experts

### 8. PDF Export Reports

Export des analytics en PDF pour :
- Rapports clients (agences)
- Justification de ROI auprès de management
- Portfolio/case studies

---

## 🚀 Implementation

### Phase 1 : MVP (4 semaines) ✅ DONE

- [x] Landing page `/marketing-suite`
- [x] Pricing page updated
- [x] Database schema (`marketing_prompts`, `marketing_prompt_usage`, `marketing_suite_analytics`)
- [x] Seed 60 sample prompts (représentatif des 500)

### Phase 2 : Features Core (6 semaines)

- [ ] Stripe product `marketing_suite` setup
- [ ] Marketing Prompts Library UI (`/marketing/library`)
- [ ] Filter/search marketing prompts
- [ ] Brand Voice Training form (`/marketing/brand-voice`)
- [ ] Analytics Dashboard (`/marketing/analytics`)
- [ ] Export PDF functionality

### Phase 3 : Growth (8 semaines)

- [ ] Content marketing (20 articles SEO)
- [ ] LinkedIn ads campaign (€2K/mois)
- [ ] Partnerships influenceurs (5 micro-influenceurs)
- [ ] Masterclass #1 recording
- [ ] Case studies (3 clients beta)

---

## 📊 Go-to-Market Strategy

### Target Audience

**Primary** :
- Freelance marketers (€30-€100/h rate)
- Content creators (YouTube, blog, social media)
- Social media managers (agencies, in-house)

**Secondary** :
- Small marketing agencies (3-10 people)
- Solopreneurs building personal brand

### Acquisition Channels

**1. LinkedIn Ads** (40% budget)
- Targeting : Job titles = "Marketing Manager", "Content Creator", "Copywriter"
- Ad format : Carousel "10 prompts qui transforment votre marketing"
- Landing page : `/marketing-suite`
- Budget : €2K/mois
- Expected CAC : €40-€60

**2. Content Marketing** (30% effort)
- SEO : "Best ChatGPT prompts for marketers"
- Lead magnet : "Ultimate Marketing Prompt Library (PDF)" - 100 prompts gratuits
- YouTube : Tutorials "AI Marketing Automation"

**3. Influencer Partnerships** (20% budget)
- Micro-influenceurs marketing (10K-50K followers)
- YouTube marketers (Neil Patel network, HubSpot community)
- Affiliate : 30% commission récurrente
- Budget : €500/mois

**4. Community-Led Growth** (10% effort)
- Discord "Marketing AI Masters"
- Weekly challenges : "Best ad copy prompt"
- Case studies clients (ROI démontré)

### Messaging

**Headline** : "Save 10+ Hours Per Week on Content Creation"

**Pain points** :
- "Tired of staring at blank pages?"
- "Spending 2 hours writing one email?"
- "Clients demanding more content, faster?"

**Benefits** :
- Create landing pages in 15 minutes (not 2 hours)
- Write 10 social posts in 30 minutes (not 3 hours)
- Generate ad copy variations in 5 minutes (not 1 hour)

**Social proof** :
- "1,000+ marketers save 10+ hours/week"
- "€500+ value per month in time saved"
- "4.9/5 stars from 500+ reviews"

---

## 📈 Success Metrics

### Acquisition

- Signups Marketing Suite : 50 (M3) → 400 (M12)
- Conversion rate landing page : 15-20%
- CAC : <€50

### Activation

- Time to first prompt used : <5 min
- Prompts used in first week : >10
- Brand voice setup completed : >40%

### Retention

- Churn mensuel : <8% (target <5%)
- NPS : >50
- Usage hebdomadaire : >3 sessions

### Revenue

- MRR : €19,600 (M12)
- ARPU : €49
- LTV : €490
- LTV:CAC : >6:1

### Engagement

- Prompts used/user/month : >30
- AI tests/user/month : >50
- Dashboard visits/week : >2

---

## 🛠️ Tech Stack

### Frontend

- **Landing page** : Next.js 15 + Tailwind
- **Library UI** : React + Shadcn UI (table, filters, search)
- **Analytics Dashboard** : Recharts (graphs)
- **Brand Voice Form** : React Hook Form + Zod

### Backend

- **Database** : Supabase (PostgreSQL)
  - `marketing_prompts` (500+ rows)
  - `marketing_prompt_usage` (tracking)
  - `marketing_suite_analytics` (daily aggregates)
- **API** : Next.js API routes
  - `/api/marketing-prompts`
  - `/api/marketing/usage`
  - `/api/marketing/analytics`
  - `/api/marketing/brand-voice`

### Infrastructure

- **Payments** : Stripe
  - Product : `marketing_suite` (€49/mois)
  - Webhook : Plan activation/cancellation
- **Email** : Resend
  - Welcome email Marketing Suite
  - Weekly masterclass invites
  - Usage reports
- **PDF Export** : jsPDF + html2canvas

---

## 📁 File Structure

```
/src
  /app
    /marketing-suite
      page.tsx ✅          # Landing page
    /marketing
      /library
        page.tsx           # Prompt library browser
      /analytics
        page.tsx           # Analytics dashboard
      /brand-voice
        page.tsx           # Brand voice setup
    /pricing
      page.tsx ✅          # Updated with Marketing Suite
  /components
    /marketing
      prompt-card.tsx      # Marketing prompt display
      analytics-chart.tsx  # Dashboard charts
      brand-voice-form.tsx # Voice training form
  /lib
    /marketing
      api.ts               # API client functions
      analytics.ts         # Analytics helpers

/supabase
  /migrations
    20250101000000_create_marketing_prompts.sql ✅
    20250101000001_update_profiles_marketing_suite.sql ✅
  seed_marketing_prompts.sql ✅  # Sample 60 prompts

/docs
  MARKETING_SUITE.md ✅           # This file
```

---

## 🔒 Access Control

### Plan Restrictions

```typescript
// Middleware check
const canAccessMarketingSuite = (user: User) => {
  return ['marketing_suite', 'team', 'business'].includes(user.plan)
}

// Database RLS
CREATE POLICY "Only marketing suite users can access"
  ON marketing_prompts
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles
      WHERE plan IN ('marketing_suite', 'team', 'business')
    )
  );
```

### Feature Gating

| Feature | Free | Pro | Marketing Suite | Team | Business |
|---------|------|-----|-----------------|------|----------|
| Marketing Prompts | 10 | 100 | 500+ | 500+ | 500+ |
| AI Testing | 10/mo | Unlimited | Unlimited | Unlimited | Unlimited |
| Multi-LLM Compare | ❌ | ❌ | ✅ | ✅ | ✅ |
| Brand Voice | ❌ | ❌ | ✅ | ✅ | ✅ |
| Analytics | ❌ | Basic | Advanced | Advanced | Advanced |
| Team Seats | 1 | 1 | 3 | 10 | 50 |
| Priority Support | ❌ | ❌ | ✅ | ✅ | ✅ |
| Masterclasses | ❌ | ❌ | 12/year | 12/year | Unlimited |

---

## 🎓 Masterclass Topics (12/year)

**Q1 2026** :
1. Prompt Engineering 101 for Marketers
2. AI-Powered SEO Content Strategy
3. Viral Social Media with AI

**Q2 2026** :
4. Cold Email Campaigns that Convert
5. Facebook Ads Copy Optimization
6. YouTube Scripts that Retain Viewers

**Q3 2026** :
7. LinkedIn Thought Leadership with AI
8. E-commerce Product Descriptions that Sell
9. Email Marketing Automation Workflows

**Q4 2026** :
10. Advanced Brand Voice Training
11. Multi-Channel Campaign Planning
12. 2027 AI Marketing Trends

---

## 📞 Support

### For Users

- Email : support-marketing@promptparty.ai (response <2h)
- Discord : #marketing-suite channel
- Docs : [promptparty.ai/docs/marketing-suite](https://promptparty.ai/docs/marketing-suite)

### For Development

- Tech lead : Julien Devot
- GitHub : [/marketing-suite issues](https://github.com/your-org/prompt-party/issues?label=marketing-suite)
- Slack : #marketing-suite-dev

---

## 🚦 Status

**Current** : Phase 1 MVP ✅ (Landing page, DB schema, seed prompts)

**Next** : Phase 2 Core Features (Stripe, Library UI, Analytics Dashboard)

**Timeline** :
- M1 : Landing page + DB (DONE)
- M2 : Stripe + Library UI
- M3 : Analytics Dashboard + Brand Voice
- M4-M6 : Growth + Masterclasses

---

## 📚 Resources

- [Business Plan](./BUSINESS_PLAN.md) - Section 3: Business Model
- [Product Roadmap](./PRODUCT_ROADMAP.md) - Marketing Suite features
- [Pricing Strategy](./docs/pricing-strategy.md) - Competitive analysis
- [Go-to-Market Plan](./docs/gtm-marketing-suite.md) - Acquisition channels

---

**Last updated** : 2025-01-01
**Version** : 1.0
**Status** : Active Development
