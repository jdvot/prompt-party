# 🚀 PROMPT PARTY - BUSINESS PLAN

**Date**: November 1, 2025
**Version**: 1.0
**Confidential**

---

## 📋 TABLE DES MATIÈRES

1. [Executive Summary](#executive-summary)
2. [Analyse de Marché](#analyse-de-marché)
3. [Business Model & Monetization](#business-model--monetization)
4. [Projections Financières](#projections-financières)
5. [Stratégie de Financement](#stratégie-de-financement)
6. [Go-to-Market Strategy](#go-to-market-strategy)
7. [Plan Marketing](#plan-marketing)
8. [Timeline 12 Mois](#timeline-12-mois)
9. [Équipe & Advisors](#équipe--advisors)
10. [Annexes](#annexes)

---

## 1. EXECUTIVE SUMMARY

### 🎯 Vision

**Prompt Party** est le premier **réseau social pour prompts LLM professionnels** - une plateforme où développeurs, marketeurs, créateurs de contenu et entrepreneurs collaborent, remixent et monétisent leurs meilleurs prompts pour ChatGPT, Claude et Gemini.

### 💡 Le Problème

Avec **800 millions d'utilisateurs hebdomadaires** de ChatGPT et l'explosion de l'adoption des LLMs, un nouveau problème émerge :

- **Prompts éparpillés** : Reddit, Discord, Google Docs - aucune source centralisée
- **Qualité variable** : Pas de système de curation ou validation communautaire
- **Collaboration impossible** : Pas d'outil pour remixer, améliorer, versionner les prompts
- **Pas de monétisation** : Les créateurs de prompts ne peuvent pas valoriser leur expertise

### ✨ La Solution

Une **plateforme sociale freemium** combinant :

1. **Réseau social** : Follow, like, comment, remix (comme GitHub pour le code)
2. **Multi-LLM testing** : Tester le même prompt sur GPT-4, Claude 3.5, Gemini
3. **Gamification** : Challenges, leaderboards, badges, XP
4. **Monétisation** : Freemium (€10/mois Pro) + marketplace (20% commission)
5. **Collaboration** : Teams, workspaces, version control

### 📊 Marché

- **TAM** : $505B marché du prompt engineering (2025) → $6,533B (2034)
- **SAM** : 10M+ power users LLM (développeurs, marketeurs, créateurs)
- **SOM** (3 ans) : 100K utilisateurs, 15K payants, **€1.8M ARR**

### 🎪 Concurrence

**Pas de concurrent direct** sur le segment "réseau social LLM conversationnel" :

- ✅ **FlowGPT** : Community prompts (10M users, $10M levés) - MAIS UI datée, pas de réseau social
- ❌ **PromptBase/Hero** : Marketplace prompts **images** (Midjourney, DALL-E) - marché différent
- ❌ **LangChain/LangSmith** : Outils dev/LLMOps - pas consumer-facing

**Notre avantage compétitif** : Seule plateforme combinant aspects sociaux + collaboration + multi-LLM + business focus.

### 💰 Business Model

**Freemium SaaS** avec 4 tiers :

- **Free** (€0) : 10 AI tests/mois, prompts publics illimités
- **Pro** (€9.99/mois) : Tests illimités, analytics, badges premium
- **Team** (€29/mois) : 5 sièges, collaboration, API basique
- **Business** (€99/mois) : White-label, API avancée, support dédié

**Autres revenus** :
- Commission marketplace (20% comme PromptBase)
- Sponsored challenges (€2K-€5K/challenge)
- API commerciale (€0.10-€0.50/requête)

### 📈 Traction & Projections

**Actuellement** :
- MVP fonctionnel deployed sur Vercel
- 57 routes/features, 111 composants React
- Stack moderne : Next.js 15, Supabase, Vercel
- Bootstrap, €0 levés

**Projections 18 mois** :
- **M6** : 1,000 users, €800 MRR (bootstrap)
- **M12** : 8,000 users, €9,600 MRR (post pre-seed)
- **M18** : 25,000 users, €37,500 MRR, **€450K ARR** (seed round)

### 💸 The Ask

**Pre-Seed Round** : **€500K - €800K** @ €2M-€3M valuation cap

**Use of funds** :
- 40% Technique (dev senior, infra premium, API LLM)
- 35% Marketing (growth marketer, campaigns, SEO)
- 15% Ops (juridique, compta, RGPD)
- 10% Runway & imprévus

**Objectif** : Atteindre **€30K MRR** et **10K users** en 12 mois pour lever Seed de €1M-€1.5M.

---

## 2. ANALYSE DE MARCHÉ

### 2.1 Taille du Marché

#### TAM (Total Addressable Market)

Le marché global du **prompt engineering** est évalué à :

- **2025** : $505.18 milliards
- **2034** : $6,533.87 milliards
- **CAGR** : 32.9%

Source : Precedence Research, 2025

**Contexte** :
- 800M utilisateurs hebdomadaires ChatGPT (OpenAI, 2025)
- ChatGPT génère $10B ARR (2025)
- 81.13% de market share en IA générative
- 2+ milliards de requêtes quotidiennes

#### SAM (Serviceable Available Market)

**Cible** : Power users LLM professionnels

- **Développeurs** : 28M+ worldwide (Stack Overflow, 2025)
  - Utilisent GitHub Copilot, ChatGPT pour code
  - Budget outils dev : $50-$200/mois

- **Marketeurs & Créateurs** : 15M+ (Content Marketing Institute)
  - Utilisent ChatGPT pour copywriting, SEO, ads
  - Budget outils marketing : $100-$500/mois

- **Entrepreneurs & Consultants** : 5M+
  - Utilisent LLM pour business plans, pitchs, consulting
  - Budget SaaS : $200-$1000/mois

**SAM total** : ~10M professionnels prêts à payer pour outils prompt engineering

#### SOM (Serviceable Obtainable Market)

**Objectif 3 ans** :
- 0.1% du SAM = **100,000 utilisateurs**
- Conversion Pro : 15% = **15,000 payants**
- ARPU : €10/mois
- **ARR cible** : €1.8M

### 2.2 Analyse Concurrentielle

#### Concurrents Directs (Prompts LLM Conversationnels)

**1. FlowGPT** - Concurrent principal

- **Profil** : Community-driven AI app platform
- **Users** : 10M+ monthly (110 pays)
- **Funding** : $10M Pre-Series A (Goodwater Capital, Feb 2024)
- **Business Model** : Freemium ($19.99/mois Pro), revenue sharing creators
- **Forces** : Grande base users, 100K+ prompts/apps, profitabilité atteinte
- **Faiblesses** :
  - UI/UX datée, peu intuitive
  - Pas de vraie dimension sociale (pas de follow, remix, collaboration)
  - Focus "AI apps" diffus vs. focus prompts purs
  - Pas de multi-LLM testing

**Notre avantage** :
- ✅ UI/UX moderne (Shadcn UI, design premium)
- ✅ Réseau social natif (follow, remix tree, gamification)
- ✅ Multi-LLM comparison (GPT vs Claude vs Gemini)
- ✅ Focus business/professionnel vs. consumer générique

---

**2. PromptPerfect (Jina AI)**

- **Profil** : Outil d'optimisation automatique de prompts
- **Type** : B2B SaaS, pas communauté
- **Forces** : Optimisation AI, support multi-modèles
- **Faiblesses** :
  - Pas de dimension sociale/communauté
  - Outil technique, pas marketplace
  - Pricing élevé (B2B)

**Notre avantage** : Community-driven vs. tool-driven

---

#### Concurrents Indirects

**3. PromptBase & PromptHero**

- **Profil** : Marketplace prompts **images** (Midjourney, DALL-E, Stable Diffusion)
- **Funding** : PromptBase $2M, PromptHero $1.3M
- **Business Model** : Commission 20% sur ventes
- **Marché** : Text-to-image, art génératif

**Pourquoi PAS concurrents** :
- ❌ Marché différent (images vs. text/conversationnel)
- ❌ Audience différente (artistes vs. business professionals)
- ❌ Use cases différents (art vs. productivité)

---

**4. Outils LLMOps (LangChain, LangSmith, Helicone)**

- **Profil** : Frameworks/plateformes développeurs
- **Cible** : Engineers, MLOps teams
- **Forces** : Puissants, observability, debugging
- **Faiblesses** :
  - Complexité technique (pas accessible non-devs)
  - Pas de dimension communauté
  - Pricing B2B élevé

**Notre avantage** : Accessible à tous (marketeurs, créateurs) vs. dev-only

---

**5. Reddit, Discord, Twitter**

- **Profil** : Communautés organiques
- **Canaux** : r/ChatGPT (2M+ members), r/ClaudeAI, Discord servers
- **Forces** : Gratuit, actif, diverse
- **Faiblesses** :
  - Désorganisé, difficile de trouver quality prompts
  - Pas de curation, modération faible
  - Pas de version control, remix, collaboration

**Notre avantage** : Plateforme dédiée, structurée, qualité curée

---

### 2.3 Positionnement Unique

**Value Proposition** :

> "Le GitHub des prompts IA - Collaborez, remixez et monétisez vos meilleurs prompts avec une communauté de 100K+ créateurs professionnels"

**Matrice de positionnement** :

|  | **Social** | **Pas Social** |
|---|---|---|
| **Consumer** | **Prompt Party** ⭐ | FlowGPT |
| **Dev/Technical** | - | LangChain, LangSmith |
| **Images** | PromptHero | PromptBase |

**Différenciation clé** :

1. ✅ **Seul réseau social** dédié prompts LLM conversationnels
2. ✅ **Multi-LLM testing** : GPT-4, Claude 3.5, Gemini dans 1 interface
3. ✅ **Remix system** : Fork, améliorer, version control (comme GitHub)
4. ✅ **Business focus** : Prompts pour productivité, marketing, code, consulting
5. ✅ **Gamification** : Challenges, leaderboards, badges, XP
6. ✅ **Freemium accessible** : €9.99/mois vs. $50-$100 concurrence B2B

---

### 2.4 Tendances du Marché

**1. Explosion adoption LLMs**

- ChatGPT : 800M weekly users (2025) vs. 100M (2023) = **8x croissance**
- Claude : Anthropic ARR multiplié par 10 en 2024
- Gemini : Integration Google Workspace = 3B+ potentiels users

**2. Professionnalisation du prompt engineering**

- Nouveaux métiers : Prompt Engineer ($100K-$175K salaire US)
- Formations : Cours Coursera, Udemy, bootcamps
- Certification : "Certified Prompt Engineer" émerge

**3. Fragmentation outils AI**

- 15,000+ AI tools lancés en 2024 (There's An AI For That)
- Users moyens utilisent 3-5 LLMs différents
- Besoin de centralisation, comparaison

**4. Community-driven content**

- 76% des prompts ChatGPT proviennent de sharing communautaire (OpenAI study)
- Reddit r/ChatGPT = 2M+ members, 500K+ prompts partagés
- Volonté de monétiser expertise (73% creators OpenAI survey)

**5. Enterprise AI adoption**

- 65% des entreprises utilisent GenAI en production (McKinsey, 2025)
- Budget moyen AI/entreprise : $50K-$500K/an
- Besoin de quality prompts, best practices

---

## 3. BUSINESS MODEL & MONETIZATION

### 3.1 Structure Tarifaire

#### Freemium Tiers

**FREE** - €0/mois

- ✅ Prompts publics illimités (création, like, comment)
- ✅ 10 AI tests/mois (GPT-3.5, Claude Haiku, Gemini Flash)
- ✅ Collections publiques
- ✅ Profil basique + stats
- ✅ Badges communauté
- ❌ Pas de prompts privés
- ❌ Pas d'analytics
- ❌ Pas de multi-LLM comparison

**Objectif** : Acquisition massive, viral growth

---

**PRO** - €9.99/mois (ou €99/an -17%)

- ✅ **Tout Free +**
- ✅ **Tests AI illimités** (tous modèles premium : GPT-4, Claude Opus, Gemini Pro)
- ✅ **Multi-LLM comparison** : Tester simultanément GPT vs Claude vs Gemini
- ✅ **Prompts privés** illimités
- ✅ **Analytics avancées** : Performance prompts, A/B testing results
- ✅ **Collections privées** illimitées
- ✅ **Badges premium** : Verified, Pro Creator
- ✅ **Export prompts** (PDF, JSON, API)
- ✅ **Priority support**
- ✅ **Pas de publicités**

**Cible** : Power users, freelancers, créateurs de contenu

---

**TEAM** - €29/mois (5 sièges inclus, +€5/siège additionnel)

- ✅ **Tout Pro (pour chaque membre) +**
- ✅ **Workspace partagé** : Bibliothèque prompts team
- ✅ **Collaboration real-time** : Editing simultané
- ✅ **Roles & permissions** : Admin, Editor, Viewer
- ✅ **Team analytics** : Usage, performance collective
- ✅ **API basique** : 10K requêtes/mois
- ✅ **SSO** (Single Sign-On)
- ✅ **Onboarding personnalisé**

**Cible** : Startups, agences, équipes marketing

---

**BUSINESS** - €99/mois (10 sièges inclus, +€8/siège additionnel)

- ✅ **Tout Team +**
- ✅ **White-label** : Custom domain, branding
- ✅ **API avancée** : 100K requêtes/mois, webhooks
- ✅ **SLA 99.9%** uptime
- ✅ **Support prioritaire 24/7**
- ✅ **Custom integrations** : Slack, Teams, Discord
- ✅ **Advanced security** : SOC 2, RGPD, audit logs
- ✅ **Dedicated account manager**
- ✅ **Custom billing** : Invoicing, PO

**Cible** : Entreprises, cabinets conseil, plateformes

---

### 3.2 Revenue Streams

#### 1. Subscriptions (Revenue principal - 70%)

**Modèle freemium classique** :

- Conversion rate cible : **12-15%** Free → Pro (benchmark SaaS : 2-5%, nous ciblons plus haut car value prop forte)
- ARPU moyen : **€12** (mix Pro €10 + Team €6/seat + Business €10/seat)

**Projections** :

| Mois | Users Total | Pro (12%) | Team (2%) | Business (1%) | MRR Sub |
|------|------------|-----------|-----------|---------------|---------|
| M6 | 1,000 | 120 | 20 | 10 | €1,440 |
| M12 | 8,000 | 960 | 160 | 80 | €11,520 |
| M18 | 25,000 | 3,000 | 500 | 250 | €36,000 |

---

#### 2. Marketplace Commission (15-20%)

**Modèle PromptBase** : Vendeurs proposent prompts premium, nous prenons 20% commission.

**Prix moyen prompt** : €3-€10
**Commission** : 20% = €0.60-€2/vente

**Projections conservatrices** :

| Mois | Transactions/mois | Panier moyen | Commission 20% | MRR Commission |
|------|-------------------|--------------|----------------|----------------|
| M6 | 100 | €5 | €1 | €100 |
| M12 | 1,000 | €6 | €1.20 | €1,200 |
| M18 | 5,000 | €7 | €1.40 | €7,000 |

---

#### 3. Sponsored Challenges (5-10%)

**Marques & entreprises** sponsorisent challenges hebdo/mensuels :

- Exemples : "Meilleur prompt copywriting e-commerce" sponsorisé par Shopify
- "Meilleur prompt code Python" sponsorisé par GitHub
- Prix : **€2,000 - €5,000/challenge**

**Projections** :

| Mois | Challenges/mois | Prix moyen | MRR Challenges |
|------|-----------------|------------|----------------|
| M6 | 0 | - | €0 |
| M12 | 2 | €3,000 | €6,000 |
| M18 | 4 | €3,500 | €14,000 |

---

#### 4. API Commerciale (3-5%)

**Developers & businesses** intègrent notre API pour accéder prompts curés.

**Pricing** :
- **Hobby** : Gratuit (1K requêtes/mois)
- **Startup** : €49/mois (25K requêtes)
- **Growth** : €199/mois (150K requêtes)
- **Enterprise** : Custom (millions requêtes)

**Projections** (conservatrices, pas avant M12) :

| Mois | Clients API | MRR moyen | MRR API |
|------|-------------|-----------|---------|
| M12 | 10 | €50 | €500 |
| M18 | 50 | €75 | €3,750 |

---

#### 5. Advertising (2-3%) - Optionnel

**Display ads ciblées** pour comptes Free uniquement (opt-in RGPD).

- CPM : €5-€10 (tech audience premium)
- Impressions : 100K-500K/mois (M18)
- MRR : €500-€2,500

**Note** : Low priority, peut nuire UX. À considérer uniquement si croissance rapide.

---

### 3.3 Unit Economics

#### Customer Acquisition Cost (CAC)

**Benchmark B2B SaaS** : <€395
**Notre cible** : **€20-€25** (mix organic + paid)

**Breakdown par canal** :

| Canal | % Mix | CAC | Conversion |
|-------|------|-----|------------|
| Organic (SEO, Product Hunt) | 40% | €5 | 3% |
| Social (Twitter, LinkedIn) | 25% | €20 | 1.5% |
| Paid Ads (Google, LinkedIn) | 25% | €40 | 0.8% |
| Referral | 10% | €0 | 5% |

**CAC Blended** : (0.4 × €5) + (0.25 × €20) + (0.25 × €40) + (0.1 × €0) = **€17**

---

#### Lifetime Value (LTV)

**Calcul** :

- ARPU : €10/mois
- Churn mensuel : 8% (benchmark SaaS : 5-10%)
- Customer lifetime : 1 / 0.08 = **12.5 mois**
- **LTV** : €10 × 12.5 = **€125**

**Avec upsells** (Team, Business, marketplace) :
- ARPU effectif : €12/mois
- **LTV** : €12 × 12.5 = **€150**

---

#### LTV:CAC Ratio

**Ratio** : €150 / €17 = **8.8:1** 🎯

**Benchmark** :
- ✅ Excellent : >5:1
- ✅ Healthy : 3:1
- ⚠️ Danger : <2:1

**Conclusion** : Unit economics très solides, permettent de scaler agressivement.

---

#### Payback Period

**Formule** : CAC / (ARPU × Gross Margin)

- CAC : €17
- ARPU : €10
- Gross Margin : 85% (SaaS standard)
- **Payback** : €17 / (€10 × 0.85) = **2 mois** ✅

**Benchmark** : 6-12 mois acceptable, <6 mois excellent.

---

## 4. PROJECTIONS FINANCIÈRES

### 4.1 Hypothèses Clés

**Growth Rate** :
- M1-M6 (Bootstrap) : 60% MoM user growth
- M7-M12 (Post Pre-Seed) : 40% MoM user growth
- M13-M18 (Post Seed) : 30% MoM user growth

**Conversion Rates** :
- Free → Pro : 12% (vs. benchmark 2-5%)
- Pro → Team : 15%
- Team → Business : 10%

**Churn** :
- M1-M6 : 15% mensuel (early adopters volatiles)
- M7-M12 : 10% mensuel
- M13-M18 : 8% mensuel (product-market fit)

**CAC Evolution** :
- M1-M6 : €5 (organic only)
- M7-M12 : €20 (mix organic + paid €2K/mois)
- M13-M18 : €25 (paid scaling €8K/mois)

---

### 4.2 Projections 18 Mois

#### Phase 1 : Bootstrap (M1-M6)

| Metric | M1 | M2 | M3 | M4 | M5 | M6 |
|--------|----|----|----|----|----|----|
| **New Users** | 100 | 160 | 256 | 410 | 656 | 1,049 |
| **Total Users** | 100 | 260 | 516 | 926 | 1,582 | 2,631 |
| **Active Users (40%)** | 40 | 104 | 206 | 370 | 633 | 1,052 |
| **Pro (12%)** | 5 | 12 | 25 | 44 | 76 | 126 |
| **MRR Subscriptions** | €50 | €124 | €247 | €443 | €759 | €1,263 |
| **MRR Total** | €50 | €124 | €247 | €443 | €759 | €1,263 |
| **Marketing Spend** | €0 | €100 | €200 | €300 | €400 | €500 |
| **CAC** | €0 | €5 | €5 | €5 | €5 | €5 |

**Highlights M6** :
- 2,631 users total
- €1,263 MRR
- **€15K ARR run rate**
- 100% organic growth
- Proof of concept validé

---

#### Phase 2 : Post Pre-Seed (M7-M12)

**Funding** : €500K levés M6

| Metric | M7 | M8 | M9 | M10 | M11 | M12 |
|--------|----|----|----|----|-----|----|
| **New Users** | 1,469 | 2,057 | 2,880 | 4,032 | 5,645 | 7,903 |
| **Total Users** | 4,100 | 6,157 | 9,037 | 13,069 | 18,714 | 26,617 |
| **Active Users** | 1,640 | 2,463 | 3,615 | 5,228 | 7,486 | 10,647 |
| **Pro (12%)** | 197 | 296 | 434 | 627 | 898 | 1,278 |
| **Team (2%)** | 33 | 49 | 72 | 105 | 150 | 213 |
| **MRR Sub** | €2,224 | €3,343 | €4,904 | €7,084 | €10,144 | €14,439 |
| **MRR Commission** | €200 | €350 | €550 | €800 | €1,100 | €1,500 |
| **MRR Challenges** | €0 | €0 | €3,000 | €3,000 | €4,500 | €6,000 |
| **MRR Total** | €2,424 | €3,693 | €8,454 | €10,884 | €15,744 | €21,939 |
| **Marketing** | €2,000 | €2,500 | €3,000 | €3,500 | €4,000 | €5,000 |
| **CAC** | €15 | €18 | €20 | €20 | €22 | €25 |

**Highlights M12** :
- 26,617 users (+900% vs M6)
- €21,939 MRR (+1,638% vs M6)
- **€263K ARR run rate**
- LTV:CAC = 7:1
- Ready for Seed round

---

#### Phase 3 : Post Seed (M13-M18)

**Funding** : €1M-€1.5M levés M12

| Metric | M13 | M14 | M15 | M16 | M17 | M18 |
|--------|-----|-----|-----|-----|-----|-----|
| **New Users** | 10,274 | 13,356 | 17,363 | 22,572 | 29,344 | 38,147 |
| **Total Users** | 36,891 | 50,247 | 67,610 | 90,182 | 119,526 | 157,673 |
| **Active Users** | 14,756 | 20,099 | 27,044 | 36,073 | 47,810 | 63,069 |
| **Pro (12%)** | 1,771 | 2,412 | 3,245 | 4,329 | 5,737 | 7,568 |
| **Team (2%)** | 295 | 402 | 541 | 721 | 956 | 1,261 |
| **Business (1%)** | 148 | 201 | 270 | 361 | 478 | 631 |
| **MRR Sub** | €21,193 | €28,856 | €38,835 | €51,805 | €68,642 | €90,738 |
| **MRR Marketplace** | €2,500 | €3,500 | €5,000 | €7,000 | €9,000 | €12,000 |
| **MRR Challenges** | €7,000 | €10,500 | €10,500 | €14,000 | €14,000 | €17,500 |
| **MRR API** | €500 | €750 | €1,000 | €1,500 | €2,250 | €3,750 |
| **MRR Total** | €31,193 | €43,606 | €55,335 | €74,305 | €93,892 | €123,988 |
| **Marketing** | €8,000 | €10,000 | €12,000 | €14,000 | €16,000 | €18,000 |
| **CAC** | €25 | €25 | €25 | €25 | €25 | €25 |

**Highlights M18** :
- 157,673 users (+5,900% vs M1)
- €123,988 MRR
- **€1.49M ARR** 🎯
- 7,568 Pro users (€75K MRR)
- 1,261 Team users (€36K MRR)
- 631 Business users (€62K MRR)
- LTV:CAC = 6:1 maintenu

---

### 4.3 P&L Synthétique (M18)

| Ligne | Montant Annuel | % Revenue |
|-------|----------------|-----------|
| **Revenue Total** | €1,487,856 | 100% |
| Subscriptions | €1,088,856 | 73% |
| Marketplace | €144,000 | 10% |
| Challenges | €168,000 | 11% |
| API | €87,000 | 6% |
| **COGS** | €223,178 | 15% |
| Hosting (Vercel, Supabase) | €36,000 | 2.4% |
| LLM API costs (GPT, Claude) | €120,000 | 8% |
| Payment fees (Stripe 2.9%) | €43,178 | 2.9% |
| CDN & Storage | €24,000 | 1.6% |
| **Gross Profit** | €1,264,678 | 85% |
| **OpEx** | €840,000 | 56% |
| Personnel (6 FTEs) | €480,000 | 32% |
| Marketing & Sales | €180,000 | 12% |
| G&A (legal, compta, office) | €120,000 | 8% |
| R&D (tools, infra) | €60,000 | 4% |
| **EBITDA** | €424,678 | 29% |

**Burn Rate M18** : ~€35K/mois (après revenue)
**Runway** : 18+ mois avec €1M Seed round ✅

---

## 5. STRATÉGIE DE FINANCEMENT

### 5.1 Roadmap Levées

#### Phase Actuelle : Bootstrap (M0-M6)

**Statut** : En cours
**Capital** : €0 levés, self-funded
**Objectif** : Valider product-market fit

**Milestones** :
- ✅ MVP fonctionnel deployed
- ✅ 57 features/routes implémentées
- ✅ Stack technique moderne (Next.js 15, Supabase, Vercel)
- 🎯 1,000 early adopters
- 🎯 €1,500 MRR organique
- 🎯 Product Hunt Top 5

**Coûts** :
- Vercel Hobby : €0/mois
- Supabase Free : €0/mois
- Domain : €10/mois
- **Total** : €10/mois 🎉

---

#### Phase 1 : Pre-Seed (M6-M12)

**Timing** : Q2 2025 (après validation traction)
**Montant** : **€500,000 - €800,000**
**Valuation** : €2M-€3M (cap SAFE ou post-money)
**Dilution** : 20-25%

**Critères pour lever** :
- ✅ 1,000+ users validés
- ✅ €1,500+ MRR organique
- ✅ NPS >40
- ✅ 15%+ retention D30
- ✅ Testimonials & case studies

**Use of Funds (18 mois runway)** :

| Catégorie | Montant | % | Détail |
|-----------|---------|---|--------|
| **Technique** | €240K | 40% | - Dev senior full-stack (€70K/an × 1.5 ans)<br>- Vercel Pro (€2K/an)<br>- Supabase Pro (€3K/an)<br>- LLM API credits (€50K)<br>- Freelance design/UX (€30K) |
| **Marketing** | €210K | 35% | - Growth marketer (€50K/an × 1.5 ans)<br>- Paid ads (€5K/mois × 18 mois)<br>- Influenceurs & partnerships (€30K)<br>- Content creation (€20K)<br>- Events & sponsoring (€15K) |
| **Ops** | €90K | 15% | - Legal (incorporation, CGV, RGPD) (€30K)<br>- Comptabilité & CFO fractional (€25K)<br>- Assurances & licences (€15K)<br>- Office & remote tools (€20K) |
| **Runway** | €60K | 10% | - Buffer pour imprévus<br>- Opportunités (acquisitions, partnerships) |
| **TOTAL** | €600K | 100% | |

**Milestones M12** :
- 10,000 users
- €25K MRR
- 15% conversion Free → Pro
- CAC <€25, LTV €150+
- Ready for Seed

---

#### Phase 2 : Seed (M12-M18)

**Timing** : Q1 2026
**Montant** : **€1,000,000 - €1,500,000**
**Valuation** : €8M-€12M (5-8x ARR de €300K projeté M12)
**Dilution** : 15-20% (post-dilution totale 35-40%)

**Critères pour lever** :
- ✅ 25,000+ users
- ✅ €25K+ MRR (€300K ARR)
- ✅ 1,500+ paying customers
- ✅ Churn <10%
- ✅ LTV:CAC >3:1
- ✅ Équipe 5-6 personnes

**Use of Funds (24 mois runway)** :

| Catégorie | Montant | % | Objectif |
|-----------|---------|---|----------|
| **Équipe** | €600K | 50% | Passer de 6 à 15 personnes :<br>- 3 devs (€210K)<br>- 2 sales/BDR (€120K)<br>- 2 marketing (€110K)<br>- 1 product manager (€80K)<br>- 1 customer success (€50K)<br>- 1 CFO fractional (€30K) |
| **Sales & Marketing** | €450K | 37.5% | - Paid acquisition scale (€15K/mois)<br>- Sales enablement tools<br>- Content factory (blog, video)<br>- Partnerships & affiliates |
| **Product** | €150K | 12.5% | - Infra scale (Vercel Pro, Supabase Pro)<br>- Security (SOC 2, pentests)<br>- Mobile app (React Native) |

**Milestones M18** :
- 100,000 users
- €100K+ MRR (€1.2M ARR)
- 10,000+ paying customers
- Expansion EU (DE, ES, IT)
- Series A ready

---

### 5.2 Investisseurs Cibles

#### VCs Pre-Seed (€500K-€2M tickets)

**1. Point Nine Capital** ⭐ Top choice

- **Focus** : B2B SaaS, Marketplaces
- **Ticket** : €500K-€5M (seed), €1M-€3M (pre-seed)
- **Sweet Spot** : SaaS avec early traction, path to $100M ARR
- **Portfolio** : Zendesk, Algolia, Contentful, Loom
- **Pourquoi nous** : Perfect fit SaaS + marketplace, EU-focused
- **Contact** : Christoph Janz (General Partner)

---

**2. Kima Ventures**

- **Focus** : Early-stage tech, SaaS, AI
- **Ticket** : €150K-€500K
- **Sweet Spot** : Produits innovants, strong founder
- **Portfolio** : 700+ startups (Alan, Mindsay, Shift Technology)
- **Pourquoi nous** : AI-first, consumer + B2B hybrid
- **Contact** : Jeremie Berrebi (Founder)

---

**3. eFounders (SaaS Studio)**

- **Focus** : B2B SaaS exclusively
- **Ticket** : Studio model (€150K-€300K + equity)
- **Sweet Spot** : SaaS avec potentiel scalabilité
- **Portfolio** : Front, Aircall, Spendesk, Forest Admin
- **Pourquoi nous** : SaaS DNA, accompagnement opérationnel
- **Contact** : Thibaud Elziere (Co-Founder)

---

**4. Serena Capital**

- **Focus** : Digital, SaaS, Consumer Tech
- **Ticket** : €500K-€3M
- **Portfolio** : ManoMano, Doctolib, Payfit, Qonto
- **Pourquoi nous** : Track record SaaS français unicorns

---

**5. Fly Ventures**

- **Focus** : Deep tech, AI, Marketplaces
- **Ticket** : €500K-€2M
- **Portfolio** : DeepL, Synthesia, Helsing
- **Pourquoi nous** : AI + marketplace combo

---

#### Business Angels Stratégiques

**AI/Prompt Engineering Space** :

- **Founders PromptBase** : Strategic, connaissent le marché
- **Founders FlowGPT** : Peuvent apporter insights
- **Yann LeCun network** : Crédibilité AI

**SaaS Operators** :

- Ex-executives Notion, Linear, Figma
- Founders exits SaaS €10M+
- Growth leads PayFit, Qonto, Alan

**Target check** : €10K-€50K/angel, 10-15 angels = €200K-€400K

---

### 5.3 Pitch Deck Outline

**10 slides, 5 minutes**

1. **Problem** (1 slide)
   - 800M users ChatGPT, prompts éparpillés
   - Pas de collaboration, curation, monétisation

2. **Solution** (1 slide)
   - GitHub pour prompts IA
   - Social + Multi-LLM + Gamification

3. **Product Demo** (2 slides)
   - Screenshots feed, prompt detail, multi-LLM test
   - Unique features : Remix tree, challenges

4. **Market** (1 slide)
   - $505B → $6,533B marché prompt engineering
   - 10M SAM, FlowGPT $10M levés

5. **Business Model** (1 slide)
   - Freemium €10/mois, 4 tiers
   - 5 revenue streams

6. **Traction** (1 slide)
   - Users, MRR, growth rate, testimonials

7. **Competition** (1 slide)
   - FlowGPT, outils LLMOps
   - Notre avantage : Social + Multi-LLM + Business focus

8. **Go-to-Market** (1 slide)
   - Community-led → Performance → B2B
   - CAC €20, LTV €150, 8:1 ratio

9. **Team** (1 slide)
   - Founder + advisors

10. **Ask** (1 slide)
    - €600K @ €2.5M cap
    - 18 mois runway → €25K MRR → Seed ready

---

## 6. GO-TO-MARKET STRATEGY

### 6.1 Phase 1 : Community-Led Growth (M1-M6)

**Objectif** : 1,000 early adopters, €0 marketing spend

#### 1. Product Hunt Launch

**Timing** : M1 (dès MVP ready)

**Préparation (2 semaines avant)** :
- Teaser sur Twitter/LinkedIn (build in public)
- Beta access list (Product Hunt upcoming page)
- Hunter identifié (Top 1% hunter)
- Assets : Screenshots, GIF, video demo (60sec)

**Jour J** :
- Launch 12:01 AM PST (maximize exposure)
- Team mobilisée : répondre tous comments dans l'heure
- Upvote sprint : First 50 votes cruciales

**Target** : Top 5 Product of the Day = 2,000+ visitors, 200+ signups

---

#### 2. Reddit Organic

**Subreddits cibles** (2M+ members combinés) :

- r/ChatGPT (2M) : "I built a social network for sharing ChatGPT prompts"
- r/ClaudeAI (50K) : "Claude prompt library with remix feature"
- r/ArtificialIntelligence (500K) : "How I'm using gamification to improve prompt quality"
- r/Entrepreneur (3M) : "Free tool to test prompts across GPT-4, Claude, Gemini"
- r/SaaS (100K) : "Lessons from building a prompt community SaaS"

**Format gagnants** :
- Tutorial : "How to write better ChatGPT prompts (with examples)"
- Tool showcase : "I made a free tool to compare AI models side-by-side"
- Case study : "How I grew my consulting business 3x with AI prompts"

**Règles** :
- ❌ Pas de spam, self-promo pure
- ✅ Apporter valeur (tutorial, insights, free tier généreux)
- ✅ Répondre à tous comments, être helpful
- ✅ Lien en commentaire, pas titre

**Target** : 500 signups sur 6 mois

---

#### 3. Twitter/X Growth

**Stratégie** :

- **Daily prompt tips** : 1 thread/jour (7 tweets)
  - Exemple : "10 ChatGPT prompts that will save you 10 hours/week"
  - Format : Problem → Prompt → Result screenshot

- **Engagement** : 30 min/jour reply to AI/tech tweets
  - Accounts to engage : @sama, @goodside, @AnthropicAI, @GoogleAI

- **Live-tweeting** : Challenges results, community highlights

**Growth tactics** :
- Giveaways : "RT + Follow pour 3 mois Pro gratuit"
- Quote tweets viral AI content avec notre spin
- Collaborate avec micro-influencers AI (10K-50K followers)

**Target** : 2,000 followers M6, 100 signups

---

#### 4. Content SEO (Long-term)

**Pillar strategy** : 3 clusters

**Cluster 1 : "Best [X] Prompts"** (transactional, high-volume)

- "50 best ChatGPT prompts for marketing"
- "Best Claude prompts for coding"
- "Top Gemini prompts for data analysis"

**Volume** : 1,500-10,000 searches/mois par KW
**Competition** : Medium (DR 30-50 sites ranking)
**Target** : 20 articles M1-M6

---

**Cluster 2 : "How to [X] with AI"** (educational)

- "How to write effective prompts for ChatGPT"
- "How to use Claude for content creation"
- "How to compare AI models for your use case"

**Volume** : 500-2,000/mois
**Target** : 15 articles M1-M6

---

**Cluster 3 : "[Tool] vs [Tool]"** (comparison)

- "ChatGPT vs Claude vs Gemini: Which is best?"
- "FlowGPT vs Prompt Party comparison"
- "PromptBase vs Prompt Party for LLM prompts"

**Volume** : 200-1,000/mois
**Target** : 10 articles M1-M6

---

**SEO targets M6** :
- 45 articles published
- 5,000 organic visitors/mois
- 100 signups/mois from SEO

---

#### 5. Partenariats Early Adopters

**Micro-influenceurs AI** (5K-20K followers) :

- Proposer : 6 mois Pro gratuit + affiliate 20% recurring
- Demander : 1 post + 1 newsletter mention
- Budget : €0 (contra deal)

**Cibles** :
- YouTubers AI tutorials (Matt Wolfe, AI Jason, etc.)
- Substack AI newsletters
- TikTokers prompt tips

**Target** : 5 partenariats M1-M6 = 500 signups

---

### 6.2 Phase 2 : Performance Marketing (M7-M12)

**Budget** : €2K-€5K/mois (€48K total)
**Objectif** : Scale acquisition, 8,000 users M12

#### 1. Google Search Ads

**Budget** : 40% = €20K

**Campaigns** :

**Campaign 1 : High-intent keywords**

- Keywords : "chatgpt prompts", "best ai prompts", "claude prompts"
- Match type : Phrase match
- CPC target : €1.50-€3
- Landing page : Homepage + "/prompts"
- Target CPA : €25

**Campaign 2 : Competitor keywords**

- Keywords : "flowgpt alternative", "promptbase for chatgpt"
- CPC : €2-€4
- Landing page : "/vs/flowgpt"
- Target CPA : €30

**Projections** :
- Budget : €20K
- Clicks : 8,000 (CPC €2.50)
- Conversion : 10% = 800 signups
- CAC : €25 ✅

---

#### 2. LinkedIn Ads

**Budget** : 30% = €15K

**Audiences** :

- **Job Titles** : Marketing Manager, Content Creator, Developer, Consultant
- **Industries** : Tech, Marketing, Consulting
- **Company Size** : 20-500 employees
- **Seniority** : Manager+

**Ad formats** :

- **Sponsored Content** : Carousel "5 ways we use AI prompts at [Company]"
- **Message Ads** : "Get early access to Prompt Party Pro (50% off)"

**Projections** :
- CPM : €50 (B2B premium)
- CTR : 0.8%
- CPC : €6
- Clicks : 2,500
- Conversion : 12% = 300 signups
- CAC : €50 (mais LTV plus élevé B2B) ✅

---

#### 3. Twitter/X Ads

**Budget** : 20% = €10K

**Campaigns** :

- **Promoted Tweets** : Best-performing organic content
- **Follower Campaigns** : Grow account to 10K
- **Engagement** : Boost tutorials, tips

**Targeting** :
- Followers of : @OpenAI, @AnthropicAI, @GoogleAI
- Keywords : ChatGPT, AI prompts, prompt engineering
- Interests : Technology, Artificial Intelligence

**Projections** :
- CPC : €1.50
- Clicks : 6,600
- Conversion : 8% = 530 signups
- CAC : €19 ✅

---

#### 4. Retargeting

**Budget** : 10% = €5K

**Audiences** :

- Visited site, no signup (70% traffic)
- Started signup, didn't complete
- Free users, not upgraded to Pro

**Platforms** : Google Display, Facebook/Instagram, Twitter

**Ads** :
- Social proof : "Join 5,000+ prompt creators"
- FOMO : "Limited time: 50% off Pro"
- Value : "Compare GPT-4 vs Claude side-by-side"

**Projections** :
- Impressions : 1M
- CTR : 0.5%
- Clicks : 5,000
- Conversion : 15% (warm audience) = 750 signups
- CAC : €6.70 🔥

---

**Total Performance Marketing M7-M12** :
- Spend : €50K
- Signups : 2,380
- CAC blended : €21 ✅
- LTV:CAC : 7:1 ✅

---

### 6.3 Phase 3 : B2B Sales Motion (M13-M18)

**Objectif** : Closer 50+ Team/Business deals (€29-€99/mois)

#### 1. Outbound Sales

**Équipe** :
- 1 SDR (M12)
- 1 Account Executive (M14)

**Process** :

1. **Lead Gen** :
   - LinkedIn Sales Navigator : Target CMOs, Heads of Marketing, AI teams
   - Company size : 50-500 employees
   - Industries : SaaS, Agencies, Consulting

2. **Outreach** :
   - Cold email sequences (5 touches)
   - LinkedIn connection + message
   - Value : "See how [Competitor] uses Prompt Party to 10x their content output"

3. **Demo** :
   - 30 min product demo
   - Custom workspace setup
   - 14-day trial Team plan

4. **Close** :
   - Annual contract (2 months free)
   - PO/invoicing
   - Onboarding call

**Targets** :
- Outreach : 500 companies/mois
- Reply rate : 10% = 50
- Demo rate : 30% = 15
- Close rate : 20% = 3 deals/mois

**M13-M18** : 18 deals Team/Business = €10K-€15K MRR additionnel

---

#### 2. Partnerships

**Channel Partners** :

- **Agencies Marketing/Consulting** : White-label for clients
- **Plateformes no-code** : Make.com, Zapier integrations
- **Outils complémentaires** : Notion, Obsidian templates

**Deal structure** :
- 20% recurring commission
- Co-marketing (webinars, blog posts)
- Dedicated partner portal

**Target** : 5 partnerships M13-M18 = €5K MRR

---

## 7. PLAN MARKETING

### 7.1 Brand & Positioning

**Brand Voice** :
- 🎉 Friendly, approachable (pas corporate)
- 🧠 Expert, credible (pas amateur)
- ⚡ Energetic, modern (pas boring B2B)

**Tone examples** :
- ❌ "Leverage our enterprise-grade prompt optimization solution"
- ✅ "Find amazing prompts. Remix them. Make them yours."

**Visual Identity** :
- Colors : Violet/Fuchsia gradients (modern, AI-feel)
- Typography : Inter (clean, readable)
- Imagery : Real screenshots, pas stock photos

---

### 7.2 Content Marketing

#### Blog Strategy

**Frequency** : 3 articles/semaine = 12/mois

**Mix** :
- 40% SEO (pillar + cluster content)
- 30% Product (features, use cases, tutorials)
- 20% Thought leadership (future of prompts, AI trends)
- 10% Company (behind-the-scenes, team, milestones)

**Distribution** :
- Email newsletter (weekly digest)
- Social (Twitter threads, LinkedIn posts)
- Reddit (value-driven, not spammy)

**Targets M12** :
- 150 articles published
- 50K organic visitors/mois
- 500 signups/mois from blog

---

#### Newsletter

**Strategy** : Weekly "Prompt of the Week"

**Content** :
- 1 featured prompt curée (avec author spotlight)
- Top 5 prompts cette semaine
- Tutorial tip
- Community highlight
- Product update

**Growth** :
- Lead magnet : "50 Best ChatGPT Prompts (PDF)"
- Exit-intent popup
- Social share (unlock bonus prompts)

**Targets M12** :
- 5,000 subscribers
- 35% open rate
- 8% CTR

---

#### Video Content

**YouTube** (M6+) :

- **Format** : Tutorials 5-10 min
- **Frequency** : 1/semaine
- **Topics** :
  - "How to write better ChatGPT prompts"
  - "GPT-4 vs Claude vs Gemini: Side-by-side comparison"
  - "10 prompts that will 10x your productivity"

**Shorts/TikTok** :
- Quick tips 30-60sec
- Viral prompt reveals
- Before/after results

**Target M12** :
- 2,000 YouTube subscribers
- 100K views
- 200 signups

---

### 7.3 Community Management

#### Discord Server

**Launch** : M3

**Channels** :
- #announcements
- #general
- #prompt-showcase
- #feedback
- #help
- #challenges
- #off-topic

**Moderation** :
- 2-3 community moderators (volunteers → paid M12)
- Code of conduct strict (pas spam, respectful)

**Events** :
- Weekly "Prompt Battle" : Theme, best prompt wins
- Monthly AMA avec AI experts
- Office hours founder (Q&A)

**Targets M12** :
- 2,000 Discord members
- 500 DAU
- 50% retention W4

---

#### Twitter Community

**Strategy** :

- **Daily** : Prompt tip thread
- **Weekly** : Community spotlight (feature user + their best prompt)
- **Monthly** : Twitter Spaces "Prompt Engineering 101"

**Engagement tactics** :
- RT + Like user prompts
- Quote tweet avec insights
- Polls (favorite LLM, prompt styles)

**Targets M12** :
- 10,000 followers
- 5% engagement rate
- 100 mentions/semaine

---

### 7.4 Influencer Marketing

**Tiers** :

**Tier 1 : Mega (500K+ followers)**
- Budget : €5K-€10K/mention
- Target : 1-2 partenariats/an
- ROI attendu : 5,000+ signups

**Tier 2 : Macro (100K-500K)**
- Budget : €1K-€3K
- Target : 4-6 partenariats/an
- ROI : 1,000-3,000 signups

**Tier 3 : Micro (10K-100K)** ⭐ Sweet spot
- Budget : €200-€500 (ou contra deal)
- Target : 20-30 partenariats/an
- ROI : 200-500 signups each

**Total budget M7-M18** : €30K influenceurs = 15,000 signups = CAC €2 🔥

---

### 7.5 Events & Sponsoring

**Conférences Tech** :

- **VivaTech Paris** (M12) : Booth €10K, ROI : brand awareness
- **Web Summit Lisbon** (M18) : Booth €15K
- **Locales** : AI meetups Paris, London, Berlin

**Webinars** :

- **Monthly** : "Prompt Engineering Masterclass"
- **Guests** : AI influencers, power users
- **Format** : 45 min presentation + 15 min Q&A
- **Promotion** : LinkedIn ads, email list
- **Replay** : YouTube, blog post

**Hackathons** :

- Sponsor AI hackathons (€2K-€5K)
- Challenge : "Best use of Prompt Party API"
- Prize : 1 year Business plan

---

## 8. TIMELINE 12 MOIS

### M1-M3 : Foundation

**Product** :
- ✅ P0 features : AI testing réel (OpenAI, Anthropic, Google APIs)
- ✅ Payments Stripe (checkout, subscriptions, webhooks)
- ✅ Email notifications (Resend/Postmark)

**Marketing** :
- 🚀 Product Hunt launch (M1)
- 📝 20 articles SEO published
- 🐦 Twitter 500 followers
- 💬 Discord server 200 members

**Milestones** :
- 300 users
- €300 MRR
- 5 Pro users

---

### M4-M6 : Traction

**Product** :
- ✅ P1 features : Multi-LLM comparison
- ✅ Search avancé (Algolia/Typesense)
- ✅ Moderation tools

**Marketing** :
- 📝 40 articles SEO total
- 🤝 5 micro-influenceurs partnerships
- 📧 Newsletter 1,000 subscribers

**Fundraising** :
- 📊 Deck finalisé
- 🎤 Pitch 10 VCs
- 💰 Pre-seed term sheet

**Milestones** :
- 1,000 users
- €1,500 MRR
- 15% conversion
- **€500K levés** 🎉

---

### M7-M9 : Scale Acquisition

**Team** :
- 👨‍💻 Dev senior hired
- 📈 Growth marketer hired

**Marketing** :
- 💸 Paid ads launched (€2K/mois)
- 📺 YouTube channel started
- 🎤 First webinar hosted

**Milestones** :
- 5,000 users
- €6,000 MRR
- CAC €20

---

### M10-M12 : Pre-Seed Goals

**Product** :
- ✅ API publique launched
- ✅ Analytics dashboard Pro users
- ✅ Mobile-responsive optimized

**Marketing** :
- 💸 Paid ads €5K/mois
- 🎯 First sponsored challenge
- 🤝 2 channel partnerships

**Fundraising** :
- 📊 Seed deck drafted
- 🎯 Seed pipeline started

**Milestones** :
- **10,000 users** ✅
- **€25,000 MRR** ✅
- **1,500 paying customers** ✅
- **LTV:CAC 6:1** ✅
- **Churn <10%** ✅
- **Ready for Seed** 🚀

---

## 9. ÉQUIPE & ADVISORS

### 9.1 Founder

**Julien Devot** - CEO & Founder

- **Background** :
  - Fullstack Developer (React, Next.js, Flutter, Java)
  - 5+ ans expérience développement SaaS
  - LinkedIn : [linkedin.com/in/julien-devot](https://www.linkedin.com/in/julien-devot)

- **Skills** :
  - ✅ Product development : Built entire MVP solo
  - ✅ Technical architecture : Next.js 15, Supabase, Vercel
  - ✅ UI/UX : Shadcn, modern design systems
  - 🎯 Need : Sales, fundraising, team building

---

### 9.2 Advisors Recherchés

**AI/LLM Expert**

- Profil : Ex-OpenAI, Anthropic, Google AI
- Aide : Product roadmap, AI integrations, credibility
- Equity : 0.5-1%

**SaaS Growth Expert**

- Profil : VP Growth @Notion, @Linear, @Figma
- Aide : Go-to-market, growth hacking, metrics
- Equity : 0.5-1%

**VC/Fundraising**

- Profil : Ex-VC associate, serial founder
- Aide : Pitch, term sheets, investor intros
- Equity : 0.25-0.5%

---

### 9.3 Hiring Plan 18 Mois

| Rôle | Timing | Salaire (€K) | Responsabilité |
|------|--------|--------------|----------------|
| **Dev Senior** | M7 | 70 | Backend, API LLM, scale |
| **Growth Marketer** | M7 | 50 | SEO, paid ads, content |
| **SDR** | M12 | 45 | Outbound B2B, demos |
| **Product Designer** | M14 | 55 | UI/UX, design system |
| **Account Executive** | M14 | 60 | B2B sales, closing |
| **DevOps** | M16 | 65 | Infra, monitoring, scale |

**Total M18** : 6 FTEs, €345K payroll/an

---

## 10. ANNEXES

### 10.1 KPIs Dashboard

**Acquisition** :
- New signups/semaine
- CAC par canal
- Conversion rate landing pages

**Activation** :
- % users créent 1er prompt <5 min
- Onboarding completion rate
- Time to first value

**Retention** :
- D1, D7, D30 retention
- WAU/MAU ratio
- Churn mensuel par cohort

**Revenue** :
- MRR, ARR
- ARPU par tier
- Expansion revenue (upsells)

**Engagement** :
- Prompts créés/user/mois
- Likes, comments/prompt
- Remix rate

---

### 10.2 Competitive Intel Sources

- FlowGPT : Crunchbase, Pitchbook, TechCrunch
- PromptBase/Hero : Website, Twitter, community forums
- Market data : Precedence Research, Grand View Research
- ChatGPT stats : OpenAI blog, SimilarWeb, Data.ai

---

### 10.3 Ressources Externes

**Benchmarks** :
- SaaS Capital Index (2025)
- OpenView SaaS Benchmarks
- Chartmogul State of SaaS

**Outils utilisés** :
- Analytics : Mixpanel, PostHog
- Marketing : HubSpot, Mailchimp
- Sales : Pipedrive, Apollo
- Support : Intercom, Crisp

---

**Document créé le** : 1 novembre 2025
**Version** : 1.0
**Confidentialité** : Interne uniquement

---

Pour questions : [votre email]
Pitch deck disponible sur demande.
