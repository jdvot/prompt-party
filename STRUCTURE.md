# Structure du Projet - Prompt Party

## 📁 Arborescence Complète

```
prompt-party/
├── 📄 Configuration
│   ├── package.json              # Dépendances et scripts
│   ├── pnpm-lock.yaml            # Lock file PNPM
│   ├── tsconfig.json             # Configuration TypeScript
│   ├── next.config.ts            # Configuration Next.js
│   ├── tailwind.config.ts        # Configuration Tailwind CSS
│   ├── postcss.config.mjs        # Configuration PostCSS
│   ├── components.json           # Configuration Shadcn UI
│   ├── netlify.toml              # Configuration Netlify
│   ├── .eslintrc.json            # Configuration ESLint
│   ├── .gitignore                # Fichiers ignorés par Git
│   └── .env.example              # Exemple de variables d'env
│
├── 📚 Documentation
│   ├── README.md                 # Présentation du projet
│   ├── CLAUDE.md                 # Guide pour Claude Code
│   ├── DEVELOPMENT.md            # Guide de développement complet
│   ├── QUICK_START.md            # Démarrage rapide (5 min)
│   ├── STATUS.md                 # État actuel du projet
│   └── STRUCTURE.md              # Ce fichier
│
├── 🗄️ Database (Supabase)
│   └── supabase/
│       ├── README.md             # Guide Supabase setup
│       └── migrations/
│           └── 20250101000000_initial_schema.sql
│                                 # Schéma complet avec RLS
│
├── 💻 Source Code
│   └── src/
│       ├── app/                  # Next.js App Router
│       │   ├── layout.tsx        # ✅ Layout racine
│       │   ├── page.tsx          # ✅ Page d'accueil (placeholder)
│       │   ├── auth/             # ✅ Authentification
│       │   │   ├── login/
│       │   │   │   └── page.tsx
│       │   │   ├── signup/
│       │   │   │   └── page.tsx
│       │   │   ├── callback/
│       │   │   │   └── route.ts
│       │   │   └── logout/
│       │   │       └── route.ts
│       │   └── api/              # API Routes (à créer)
│       │       └── prompts/
│       │           └── route.ts  # 🚧 À créer (Phase 6)
│       │
│       ├── components/           # Composants React
│       │   ├── auth/             # ✅ Composants auth
│       │   │   └── auth-form.tsx # Formulaire login/signup
│       │   ├── layout/           # ✅ Composants layout
│       │   │   ├── header.tsx    # Navigation principale
│       │   │   ├── user-menu.tsx # Menu dropdown utilisateur
│       │   │   └── footer.tsx    # Footer du site
│       │   └── feed/             # 🚧 À créer (Phase 6)
│       │       ├── prompt-card.tsx
│       │       ├── feed-filters.tsx
│       │       └── prompt-list.tsx
│       │
│       ├── lib/                  # Utilitaires et services
│       │   ├── utils.ts          # ✅ Helpers (cn, etc.)
│       │   └── supabase/         # ✅ Clients Supabase
│       │       ├── client.ts     # Client browser
│       │       ├── server.ts     # Client server
│       │       └── hooks.ts      # Hook useUser()
│       │
│       ├── types/                # Types TypeScript
│       │   └── database.types.ts # ✅ Types générés depuis DB
│       │
│       ├── styles/               # Styles
│       │   └── globals.css       # ✅ CSS global avec Tailwind
│       │
│       └── middleware.ts         # ✅ Middleware auth Next.js
│
└── 📦 Dependencies
    └── node_modules/             # Packages installés (ignoré par git)
```

## 🎨 Composants UI à créer (Futures phases)

```
src/components/
├── feed/                         # Phase 6 (Feed)
│   ├── prompt-card.tsx
│   ├── feed-filters.tsx
│   └── prompt-list.tsx
│
├── editor/                       # Phase 7 (Création)
│   ├── markdown-editor.tsx
│   └── markdown-preview.tsx
│
├── prompts/                      # Phase 9 (Likes)
│   └── like-button.tsx
│
├── comments/                     # Phase 10 (Commentaires)
│   ├── comment-list.tsx
│   ├── comment-form.tsx
│   └── comment-item.tsx
│
├── collections/                  # Phase 12 (Collections)
│   ├── collection-card.tsx
│   └── add-to-collection-modal.tsx
│
└── ui/                           # Shadcn UI components
    ├── button.tsx                # À installer avec npx shadcn add
    ├── card.tsx
    ├── input.tsx
    ├── textarea.tsx
    └── ...
```

## 🛣️ Routes Next.js

### ✅ Routes Existantes
```
/                               # Page d'accueil (placeholder)
/auth/login                     # Page de connexion
/auth/signup                    # Page d'inscription
/auth/callback                  # Callback OAuth
POST /auth/logout               # Déconnexion
```

### 🚧 Routes à Créer
```
# Phase 6 - Feed
/                               # Feed principal avec prompts
/trending                       # Prompts trending
/top                           # Top prompts

# Phase 7 - Création
/prompts/new                    # Créer un nouveau prompt

# Phase 8 - Détail
/prompts/[id]                   # Détail d'un prompt

# Phase 11 - Remix
/prompts/[id]/remix             # Remixer un prompt

# Phase 12 - Collections
/collections                    # Mes collections
/collections/new                # Créer une collection
/collections/[id]               # Détail d'une collection

# Phase 13 - Profils
/profile/[username]             # Profil public
/profile/settings               # Paramètres du compte
```

## 🔌 API Routes

### 🚧 À Créer
```
# Prompts
GET    /api/prompts                    # Liste des prompts
POST   /api/prompts                    # Créer un prompt
GET    /api/prompts/[id]               # Détail d'un prompt
PATCH  /api/prompts/[id]               # Modifier un prompt
DELETE /api/prompts/[id]               # Supprimer un prompt

# Likes
POST   /api/prompts/[id]/like          # Liker un prompt
DELETE /api/prompts/[id]/like          # Unliker un prompt

# Comments
GET    /api/prompts/[id]/comments      # Liste des commentaires
POST   /api/prompts/[id]/comments      # Créer un commentaire
DELETE /api/comments/[id]              # Supprimer un commentaire

# Collections
GET    /api/collections                # Mes collections
POST   /api/collections                # Créer une collection
GET    /api/collections/[id]           # Détail d'une collection
PATCH  /api/collections/[id]           # Modifier une collection
DELETE /api/collections/[id]           # Supprimer une collection
POST   /api/collections/[id]/items     # Ajouter un prompt
DELETE /api/collections/[id]/items/[promptId] # Retirer un prompt

# Profile
GET    /api/profile                    # Mon profil
PATCH  /api/profile                    # Modifier mon profil
POST   /api/profile/avatar             # Upload avatar
```

## 🗃️ Schéma de la Base de Données

### Tables (7 au total)

```sql
profiles
├── id (UUID, PK)
├── user_id (UUID, FK → auth.users)
├── name (TEXT)
├── avatar_url (TEXT)
├── plan (TEXT: 'free' | 'pro')
└── created_at (TIMESTAMPTZ)

prompts
├── id (UUID, PK)
├── title (TEXT)
├── body (TEXT)
├── tags (TEXT[])
├── author (UUID, FK → auth.users)
├── likes_count (INTEGER)
├── is_public (BOOLEAN)
├── created_at (TIMESTAMPTZ)
└── updated_at (TIMESTAMPTZ)

likes
├── user_id (UUID, FK → auth.users)
├── prompt_id (UUID, FK → prompts)
└── created_at (TIMESTAMPTZ)
└── PK (user_id, prompt_id)

comments
├── id (UUID, PK)
├── prompt_id (UUID, FK → prompts)
├── user_id (UUID, FK → auth.users)
├── content (TEXT)
└── created_at (TIMESTAMPTZ)

forks
├── id (UUID, PK)
├── original_prompt_id (UUID, FK → prompts)
├── forked_prompt_id (UUID, FK → prompts)
└── created_at (TIMESTAMPTZ)

collections
├── id (UUID, PK)
├── user_id (UUID, FK → auth.users)
├── name (TEXT)
├── description (TEXT)
├── is_public (BOOLEAN)
└── created_at (TIMESTAMPTZ)

collection_items
├── collection_id (UUID, FK → collections)
├── prompt_id (UUID, FK → prompts)
└── added_at (TIMESTAMPTZ)
└── PK (collection_id, prompt_id)
```

### Relations

```
auth.users (Supabase Auth)
    ↓
    ├─→ profiles (1:1)
    ├─→ prompts (1:N)
    ├─→ likes (1:N)
    ├─→ comments (1:N)
    └─→ collections (1:N)

prompts
    ├─→ likes (1:N)
    ├─→ comments (1:N)
    ├─→ forks (1:N pour original_prompt)
    ├─→ forks (1:1 pour forked_prompt)
    └─→ collection_items (N:M via collections)

collections
    └─→ collection_items (1:N)
    └─→ prompts (N:M)
```

## 📦 Packages Installés

### Production
```json
{
  "@supabase/ssr": "^0.5.0",
  "@supabase/supabase-js": "^2.45.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.546.0",
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwind-merge": "^3.3.1"
}
```

### Développement
```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^8",
  "eslint-config-next": "15.0.0",
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  "tailwindcss-animate": "^1.0.7",
  "typescript": "^5"
}
```

### À Installer (Futures phases)
```bash
# Phase 7 - Éditeur Markdown
pnpm add react-markdown remark-gfm react-simplemde-editor easymde

# Utilitaires
pnpm add lodash.debounce
pnpm add -D @types/lodash.debounce

# Shadcn UI components (au besoin)
npx shadcn@latest add button card input textarea badge tabs dialog
```

## 🔐 Variables d'Environnement

### Requises
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### Optionnelles (Futures phases)
```env
# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

## 🎯 État d'Avancement

```
✅ Infrastructure (100%)
✅ Base de données (100%)
✅ Authentification (100%)
✅ Layout & Navigation (100%)
🚧 Features métier (0%)
   └─ Feed (0%)
   └─ Création (0%)
   └─ Détail (0%)
   └─ Likes (0%)
   └─ Commentaires (0%)
   └─ Remix (0%)
   └─ Collections (0%)
```

**Total completion: ~30%**

La base est solide, il ne reste "que" l'implémentation des features métier.
