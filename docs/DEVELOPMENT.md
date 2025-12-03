# Development Guide - Prompt Party

## ✅ Ce qui a été implémenté

### Phase 1-5: Infrastructure de base (COMPLETÉ)

#### Configuration du projet
- ✅ Next.js 15 avec TypeScript et App Router
- ✅ Tailwind CSS configuré avec thème Shadcn UI
- ✅ Structure de dossiers (`src/app`, `src/components`, `src/lib`, `src/types`)
- ✅ Configuration Netlify (`netlify.toml`)
- ✅ Fichiers d'environnement (`.env.example`)

#### Base de données Supabase
- ✅ Schéma SQL complet dans `/supabase/migrations/20250101000000_initial_schema.sql`
- ✅ 7 tables créées: `profiles`, `prompts`, `likes`, `comments`, `forks`, `collections`, `collection_items`
- ✅ Row Level Security (RLS) configuré sur toutes les tables
- ✅ Indexes de performance
- ✅ Triggers automatiques (likes_count, updated_at, création de profil)

#### Configuration Supabase
- ✅ Client browser (`src/lib/supabase/client.ts`)
- ✅ Client server (`src/lib/supabase/server.ts`)
- ✅ Middleware Next.js (`src/middleware.ts`) pour auth
- ✅ Hook React personnalisé `useUser()` (`src/lib/supabase/hooks.ts`)
- ✅ Types TypeScript pour la base de données

#### Authentification
- ✅ Formulaire d'authentification unifié (`src/components/auth/auth-form.tsx`)
- ✅ Pages login et signup
- ✅ Support OAuth (Google, GitHub)
- ✅ Callback OAuth (`/auth/callback`)
- ✅ Route de déconnexion (`/auth/logout`)

#### Layout et Navigation
- ✅ Header avec navigation (`src/components/layout/header.tsx`)
- ✅ Menu utilisateur avec dropdown (`src/components/layout/user-menu.tsx`)
- ✅ Footer (`src/components/layout/footer.tsx`)
- ✅ Layout racine intégré
- ✅ Design responsive

## 🚀 Démarrage rapide

### 1. Installer les dépendances
```bash
pnpm install
```

### 2. Configuration Supabase

**Option A: Supabase Cloud (Recommandé pour production)**
1. Créer un projet sur https://supabase.com
2. Aller dans SQL Editor et exécuter le contenu de `/supabase/migrations/20250101000000_initial_schema.sql`
3. Configurer les providers OAuth dans Authentication > Providers:
   - Google
   - GitHub
4. Créer un bucket "avatars" dans Storage (public)
5. Copier `.env.example` vers `.env.local` et ajouter vos clés

**Option B: Supabase Local**
```bash
npm install -g supabase
supabase start
supabase db push
```

### 3. Lancer le serveur de développement
```bash
# Avec Netlify Dev (recommandé)
netlify dev

# OU avec Next.js direct
pnpm dev
```

L'app sera accessible sur http://localhost:8888 (Netlify) ou http://localhost:3000 (Next.js).

## 📋 Prochaines étapes d'implémentation

### Phase 6: Feed Principal (À FAIRE)

**Fichiers à créer:**
```
src/
├── app/
│   └── page.tsx                          # Mise à jour du feed principal
├── components/
│   └── feed/
│       ├── prompt-card.tsx               # Carte de prompt
│       ├── feed-filters.tsx              # Filtres Top/New/Trending
│       └── prompt-list.tsx               # Liste avec pagination
└── app/api/
    └── prompts/
        └── route.ts                      # GET /api/prompts
```

**Tâches:**
1. Créer composant `PromptCard` pour afficher un prompt
2. Créer `FeedFilters` avec tabs (New/Top/Trending)
3. Implémenter pagination (infinite scroll ou pages)
4. Créer API Route GET `/api/prompts?sort=new|top|trending&page=1`
5. Mettre à jour `app/page.tsx` pour afficher le feed

**Exemple de query Supabase pour le feed:**
```typescript
const { data: prompts } = await supabase
  .from('prompts')
  .select(`
    *,
    profiles:author (name, avatar_url),
    likes (count)
  `)
  .eq('is_public', true)
  .order('created_at', { ascending: false })
  .range(start, end)
```

### Phase 7: Création de Prompts (À FAIRE)

**Fichiers à créer:**
```
src/
├── app/
│   └── prompts/
│       └── new/
│           └── page.tsx                  # Formulaire de création
├── components/
│   └── editor/
│       ├── markdown-editor.tsx           # Éditeur Markdown
│       └── markdown-preview.tsx          # Preview temps réel
└── app/api/
    └── prompts/
        └── route.ts                      # POST /api/prompts
```

**Libraries à installer:**
```bash
pnpm add react-markdown react-simplemde-editor easymde
```

**Tâches:**
1. Créer éditeur Markdown avec preview en temps réel
2. Formulaire avec: titre, body (markdown), tags, public/privé
3. API Route POST `/api/prompts`
4. Validation des données
5. Redirection vers la page du prompt créé

### Phase 8: Page Détail de Prompt (À FAIRE)

**Fichiers à créer:**
```
src/
└── app/
    └── prompts/
        └── [id]/
            └── page.tsx                  # Page détail
```

**Tâches:**
1. Afficher prompt avec Markdown rendu
2. Métadonnées (auteur, date, likes, tags)
3. Bouton Like (non fonctionnel pour l'instant)
4. Section commentaires (non fonctionnelle pour l'instant)
5. Boutons Remix et Save to Collection
6. SSR pour SEO (generateMetadata)
7. Open Graph images

### Phase 9: Système de Likes + Realtime (À FAIRE)

**Fichiers à créer:**
```
src/
├── components/
│   └── prompts/
│       └── like-button.tsx               # Bouton like
└── app/api/
    └── prompts/
        └── [id]/
            └── like/
                └── route.ts              # POST/DELETE like
```

**Tâches:**
1. Composant `LikeButton` avec état (liked/unliked)
2. API Routes POST/DELETE `/api/prompts/[id]/like`
3. Optimistic updates (UI réagit avant la réponse serveur)
4. Realtime: écouter les changements de likes
5. Empêcher double-like (géré par constraint DB)

**Exemple Realtime:**
```typescript
supabase
  .channel('prompt-likes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'likes',
    filter: `prompt_id=eq.${promptId}`
  }, handleLikeChange)
  .subscribe()
```

### Phase 10: Système de Commentaires (À FAIRE)

**Fichiers à créer:**
```
src/
├── components/
│   └── comments/
│       ├── comment-list.tsx              # Liste de commentaires
│       ├── comment-form.tsx              # Formulaire
│       └── comment-item.tsx              # Un commentaire
└── app/api/
    └── prompts/
        └── [id]/
            └── comments/
                └── route.ts              # GET/POST comments
```

**Tâches:**
1. Liste de commentaires avec auteur et date
2. Formulaire d'ajout de commentaire (textarea)
3. API Routes GET/POST `/api/prompts/[id]/comments`
4. Bouton delete (uniquement pour l'auteur)
5. Realtime pour nouveaux commentaires
6. Support Markdown dans les commentaires

## 🔧 Commandes utiles

```bash
# Développement
pnpm dev                    # Next.js direct
netlify dev                 # Avec Netlify Functions

# Build
pnpm build                  # Build production
netlify deploy              # Deploy staging
netlify deploy --prod       # Deploy production

# Database
supabase db push            # Appliquer migrations
supabase db reset           # Reset DB locale
supabase gen types typescript --local > src/types/database.types.ts

# Netlify
netlify init                # Lier au site Netlify
netlify env:set KEY VALUE   # Ajouter variable d'env
netlify env:list            # Lister variables
```

## 📦 Packages à installer pour phases suivantes

```bash
# Pour l'éditeur Markdown (Phase 7)
pnpm add react-markdown remark-gfm react-simplemde-editor easymde

# Pour les tags (Phase 7)
pnpm add react-tag-input

# Pour les icônes (toutes phases)
# Déjà installé: lucide-react

# Pour le debouncing (recherche, etc.)
pnpm add lodash.debounce
pnpm add -D @types/lodash.debounce
```

## 🎨 Shadcn UI Components à installer

Quand vous en avez besoin:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add badge
npx shadcn@latest add tabs
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add separator
```

## 🔒 Variables d'environnement requises

`.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Pour Netlify (production):
```bash
netlify env:set NEXT_PUBLIC_SUPABASE_URL https://xxxxx.supabase.co
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY eyJhbGciOi...
```

## 📝 Notes importantes

### Architecture
- **Server Components par défaut**: Utilisez `'use client'` uniquement quand nécessaire
- **API Routes**: Deviennent automatiquement des Netlify Functions
- **Realtime**: Utilisez des Client Components pour les subscriptions Supabase
- **Types**: Générez les types depuis Supabase pour avoir l'autocomplétion

### Sécurité
- Toutes les tables ont RLS activé
- Middleware protège les routes privées
- Validation côté serveur dans les API Routes
- Sanitization du Markdown pour éviter XSS

### Performance
- Index créés sur les colonnes importantes
- Pagination pour éviter de charger trop de données
- Realtime uniquement sur les composants qui en ont besoin
- ISR (Incremental Static Regeneration) pour pages publiques

## 🐛 Debugging

### Problèmes courants

**Error: Invalid API key**
- Vérifier `.env.local` existe et contient les bonnes clés
- Redémarrer le serveur après modification

**RLS blocking queries**
- Vérifier que l'utilisateur est authentifié
- Vérifier les policies dans Supabase Dashboard
- Utiliser la console SQL pour tester les queries

**Realtime not working**
- Vérifier que Realtime est activé sur la table (Supabase Dashboard)
- Vérifier que le channel est subscribed
- Check la console browser pour erreurs

## 🎯 MVP Minimum (Pour lancer rapidement)

Si vous voulez lancer une version minimale rapidement:
1. ✅ Configuration (déjà fait)
2. ✅ Auth (déjà fait)
3. **Phase 6**: Feed basique (sans filtres avancés)
4. **Phase 7**: Création de prompts (sans preview temps réel)
5. **Phase 8**: Page détail (sans likes/comments)
6. Déployer sur Netlify

Puis ajouter progressivement:
- Likes (Phase 9)
- Commentaires (Phase 10)
- Remix (Phase 11)
- Collections (Phase 12)

## 📚 Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Netlify Docs](https://docs.netlify.com)
