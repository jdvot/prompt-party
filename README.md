# 🪩 Prompt Party

**The social network for the best AI prompts — create, share, and discover the most inspiring prompts.**

> A modern **Next.js + Supabase** web app deployed on **Netlify**.  
> Built for AI creators, developers, and curious minds who love sharing and remixing prompts.

---

## 🚀 Features

### Core Features
✅ **Supabase Authentication** — email / Google / GitHub
✅ **Realtime votes & comments**
✅ **Public or private prompt collections**
✅ **Remix system** — fork and enhance prompts
✅ **Markdown editor & preview**
✅ **RLS (Row Level Security)** for safety
✅ **Next.js App Router + Edge Functions**
✅ **Netlify Free Tier** — deploy instantly via CLI
✅ **Optimized for SEO & social sharing**

### New Features ✨

#### 🎯 Viral Growth
- **Social Sharing** — Twitter, LinkedIn, native share API, copy link
- **View Counter** — Real-time view tracking with session-based deduplication
- **Duplicate Prompts** — One-click template creation
- **Trending Tags** — Discover top tags from last 7 days

#### ⌨️ Power User Features
- **Keyboard Shortcuts** — Global (`H`, `T`, `C`, `Cmd+N`, `?`) and page-specific (`L`, `S`, `D`, `R`, `Shift+S`)
- **Embeddable Widgets** — Share prompts anywhere with iframe embeds
- **Enhanced Profiles** — Stats dashboard (prompts, likes, views, remixes) + achievement badges

#### 🤖 AI & Monetization
- **AI Prompt Tester** — Test prompts with GPT-4, Claude 3, Gemini Pro
- **Credit System** — Free: 10 tests/month, Pro: unlimited
- **Pricing Tiers** — Free, Pro ($9.99/mo), Team ($29/mo), Business ($99/mo)

#### 🏆 Gamification
- **Prompt Challenges** — Weekly challenges with categories, difficulty levels, and rewards
- **Achievement Badges** — Creator, Popular, Influencer, Veteran, Prolific, Premium
- **Community Voting** — Vote on challenge submissions

---

## 🧱 Tech Stack

| Layer               | Technology                                                                     | Description                          |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------------------ |
| **Frontend**        | [Next.js 15](https://nextjs.org/)                                              | React 19 app with App Router         |
| **UI**              | [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) | Beautiful, composable UI             |
| **Database / Auth** | [Supabase](https://supabase.com/)                                              | Postgres + Auth + Storage + Realtime |
| **Language**        | TypeScript                                                                     | Full-stack type safety               |
| **Deployment**      | [Netlify](https://www.netlify.com/)                                            | Free tier hosting with Functions     |
| **Monitoring**      | [PostHog](https://posthog.com/) / [Sentry](https://sentry.io/) _(optional)_    | Analytics & crash tracking           |
| **CLI**             | [Netlify CLI](https://docs.netlify.com/cli/get-started/)                       | Local dev & deployment               |

---

## ⚙️ Local Setup

### 1️⃣ Prerequisites

- [Node.js 20+](https://nodejs.org/en/download/)
- [PNPM](https://pnpm.io/) or npm
- [Netlify CLI](https://docs.netlify.com/cli/get-started/):
  ```bash
  npm install -g netlify-cli
  ```
- Supabase project (EU region recommended)

---

### 2️⃣ Environment Variables

Create a `.env.local` at project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

If you need server-side secrets (e.g. service key), use a `.env` file **not committed** to git.

---

### 3️⃣ Install dependencies

```bash
pnpm install
```

---

### 4️⃣ Run locally (with Netlify Dev)

```bash
netlify dev
```

Runs a full local environment with:

- Next.js + SSR
- API Routes as Netlify Functions
- Env vars loaded automatically
- Supabase connected

App available at 👉 **http://localhost:8888**

---

## 🧩 Project Structure

```
src/
 ├── app/                     # Next.js App Router
 │    ├── layout.tsx          # Global layout
 │    ├── page.tsx            # Home feed
 │    ├── prompts/            # Prompt detail & editor
 │    ├── collections/        # User collections
 │    ├── profile/            # Profile pages
 │    └── api/                # Route Handlers (API endpoints)
 ├── components/              # UI components
 ├── lib/                     # Supabase client & utils
 ├── styles/                  # Tailwind styles
 └── types/                   # TypeScript types
```

---

## 🧠 How It Works

1. Users sign in with Supabase Auth (Magic Link, Google, GitHub).
2. The app displays a **feed** of prompts sorted by popularity.
3. Each prompt supports **likes**, **comments**, and **remixes**.
4. Updates appear in **real-time** through Supabase Realtime.
5. Users can **save** prompts in private/public **collections**.
6. Everything is **SSR-ready** and SEO-optimized for public sharing.

---

## 🔐 Security

- **RLS (Row Level Security)** on all Supabase tables.
- **Policies** → read public, write restricted to `auth.uid()`.
- Basic **moderation** layer (bad-word filter, user reports).
- JWT auth verified by Supabase middleware.
- HTTPS enforced automatically by Netlify.

---

## 🌍 Deploy to Netlify (Free Tier)

### 1️⃣ Initialize project

```bash
netlify init
```

- Choose “**Create & configure a new site**” or link an existing one.
- The CLI generates a `netlify.toml` automatically.

### 2️⃣ Example `netlify.toml`

```toml
[build]
  command = "pnpm build"
  publish = ".next"
  functions = ".netlify/functions"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[dev]
  command = "pnpm dev"
  port = 3000
```

### 3️⃣ Environment variables

```bash
netlify env:set NEXT_PUBLIC_SUPABASE_URL https://xxxxx.supabase.co
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY eyJhbGciOi...
```

### 4️⃣ Deploy manually

```bash
netlify deploy --prod
```

### 5️⃣ Free tier limits

- 100 GB/month bandwidth
- 125 k Function calls
- 300 build minutes
- 1 M Edge Function invocations
- SSL + custom domain included

---

## 🧰 Useful Netlify CLI Commands

| Command                     | Description                            |
| --------------------------- | -------------------------------------- |
| `netlify dev`               | Run app locally with Functions         |
| `netlify init`              | Create or link to a site               |
| `netlify deploy`            | Deploy to staging                      |
| `netlify deploy --prod`     | Deploy to production                   |
| `netlify env:list`          | Show environment variables             |
| `netlify env:set KEY VALUE` | Add/edit environment variables         |
| `netlify status`            | Check link between local & remote site |

---

## 🗃️ Supabase Schema (simplified)

| Table              | Description                  |
| ------------------ | ---------------------------- |
| `profiles`         | User profiles                |
| `prompts`          | Main prompt content          |
| `likes`            | Likes (user + prompt)        |
| `comments`         | Comments on prompts          |
| `forks`            | Remix links                  |
| `collections`      | User’s collections           |
| `collection_items` | Prompts saved to collections |

**RLS examples:**

```sql
-- Only owners can insert/update/delete their prompts
CREATE POLICY "Users can manage own prompts"
ON prompts
FOR ALL
USING (auth.uid() = author)
WITH CHECK (auth.uid() = author);
```

---

## 💰 Cost Overview

| Service      | Tier | Quotas                                                      |
| ------------ | ---- | ----------------------------------------------------------- |
| **Netlify**  | Free | 100 GB bandwidth, 125 k Functions, 300 build minutes        |
| **Supabase** | Free | 0.5 GB DB, 1 GB storage, 50 k Auth users, Realtime included |

→ Fully functional **MVP at zero cost**.  
Upgrade only if your traffic explodes 🚀

---

## 🧭 Roadmap

### Phase 1: Core MVP ✅
- [x] Supabase Auth & Profiles
- [x] CRUD Prompts
- [x] Likes & Comments (Realtime)
- [x] Remix & Collections
- [x] Trending / Top Feeds

### Phase 2: Viral Growth ✅
- [x] Social sharing
- [x] View counter
- [x] Duplicate prompts
- [x] Trending tags
- [x] Embeddable widgets

### Phase 3: Power Features ✅
- [x] Keyboard shortcuts
- [x] Enhanced profiles with stats
- [x] Achievement badges
- [x] AI Prompt Tester
- [x] Credit system

### Phase 4: Monetization ✅
- [x] Pricing page
- [x] Freemium tiers (Free, Pro, Team, Business)
- [x] Prompt challenges
- [x] Community voting

### Phase 5: Next Up 🚧
- [ ] Email notifications
- [ ] Search autocomplete
- [ ] Analytics dashboard (Pro feature)
- [ ] Team workspaces
- [ ] API access (Business tier)
- [ ] Public Beta Launch

---

## 🧑‍🎨 Author

**Julien Devot** — Fullstack Developer (React + Flutter + Java)  
→ [LinkedIn](https://www.linkedin.com/in/julien-devot) • [GitHub](https://github.com/juliendevot)

---

## 🤝 Contributing

1. Fork this repository
2. Create a branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push: `git push origin feature/new-feature`
5. Open a Pull Request 🚀

---

## 📜 License

Released under the **MIT License**.  
You’re free to use, modify, and distribute it with attribution.

---
