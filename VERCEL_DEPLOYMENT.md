# Déploiement Vercel - Prompt Party

Guide complet pour déployer Prompt Party sur Vercel avec Supabase.

## Prérequis

- Compte Vercel (gratuit sur vercel.com)
- Compte Supabase (gratuit sur supabase.com)
- Compte Resend pour les emails (gratuit sur resend.com)
- GitHub repository connecté

## 1. Configuration Supabase

### 1.1 Créer un projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Noter les informations suivantes :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **Anon/Public Key** : visible dans Settings > API
   - **Service Role Key** : visible dans Settings > API (⚠️ à garder secret)

### 1.2 Appliquer les migrations

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter à Supabase
supabase login

# Lier le projet (remplacer xxxxx par votre project ref)
supabase link --project-ref xxxxx

# Appliquer toutes les migrations
supabase db push
```

### 1.3 Générer les types TypeScript (optionnel mais recommandé)

```bash
supabase gen types typescript --project-id xxxxx > src/types/supabase.ts
```

### 1.4 Configurer les Redirect URLs (IMPORTANT)

Supabase a besoin de connaître les URLs autorisées pour les redirections après authentification.

#### Dans Supabase Dashboard

1. Aller dans **Authentication > URL Configuration**
2. Configurer les **Redirect URLs** autorisées :

**Pour le développement local :**
```
http://localhost:3000/auth/callback
```

**Pour Vercel (production) :**
```
https://votre-app.vercel.app/auth/callback
https://votre-domaine-personnalise.com/auth/callback
```

**Pour Vercel (preview deployments) :**
```
https://*.vercel.app/auth/callback
```

#### Configuration complète recommandée

Dans **Authentication > URL Configuration**, ajouter :

**Site URL :**
```
https://votre-app.vercel.app
```

**Redirect URLs (une par ligne) :**
```
http://localhost:3000/auth/callback
http://localhost:8888/auth/callback
https://votre-app.vercel.app/auth/callback
https://*.vercel.app/auth/callback
```

⚠️ **Important** :
- Les wildcard (`*`) sont supportés pour les preview deployments Vercel
- Ajouter aussi votre domaine personnalisé si vous en avez un
- Sans ces URLs, l'authentification OAuth et les magic links ne fonctionneront pas

#### Tester la configuration

Après déploiement sur Vercel :

1. Aller sur `https://votre-app.vercel.app/auth/login`
2. Essayer de se connecter avec Google/GitHub (si configuré)
3. Vérifier la redirection vers `/auth/callback`
4. Si erreur "redirect_uri_mismatch", vérifier les URLs dans Supabase

### 1.5 Configurer les providers OAuth (optionnel)

#### Google OAuth

1. Dans Supabase : **Authentication > Providers > Google**
2. Activer Google provider
3. Créer un projet dans [Google Cloud Console](https://console.cloud.google.com)
4. Créer des credentials OAuth 2.0
5. Ajouter les **Authorized redirect URIs** :
   ```
   https://xxxxx.supabase.co/auth/v1/callback
   ```
6. Copier **Client ID** et **Client Secret** dans Supabase

**Redirect URIs autorisées dans Google Console :**
```
https://xxxxx.supabase.co/auth/v1/callback
```

#### GitHub OAuth

1. Dans Supabase : **Authentication > Providers > GitHub**
2. Activer GitHub provider
3. Aller dans [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
4. Créer une nouvelle OAuth App
5. Configurer :
   - **Homepage URL** : `https://votre-app.vercel.app`
   - **Authorization callback URL** : `https://xxxxx.supabase.co/auth/v1/callback`
6. Copier **Client ID** et **Client Secret** dans Supabase

#### Email Provider (Magic Links)

Par défaut, Supabase utilise les magic links pour l'authentification email.

**Configuration dans Supabase :**
1. **Authentication > Email Templates**
2. Personnaliser les templates si besoin :
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

**Variables disponibles dans les templates :**
- `{{ .ConfirmationURL }}` - URL de confirmation (pointe vers `/auth/callback`)
- `{{ .Token }}` - Token de vérification
- `{{ .TokenHash }}` - Hash du token
- `{{ .SiteURL }}` - Votre site URL

**Exemple de template personnalisé :**
```html
<h2>Confirmez votre inscription</h2>
<p>Cliquez sur le lien ci-dessous pour confirmer votre email :</p>
<p><a href="{{ .ConfirmationURL }}">Confirmer mon email</a></p>
```

### 1.6 Configurer Email Rate Limiting

Pour éviter l'abus des magic links :

1. Dans Supabase : **Authentication > Rate Limits**
2. Configurer les limites :
   - **Sign up** : 3-5 par heure par IP
   - **Sign in** : 10-20 par heure par IP
   - **Password reset** : 3-5 par heure par IP

### 1.7 Flow d'authentification complet

Comprendre comment l'authentification fonctionne avec Supabase et Vercel.

#### 🔐 Magic Link Flow (Email)

```
1. Utilisateur entre son email sur /auth/login
   ↓
2. Supabase envoie un email avec un lien magique
   Exemple: https://xxxxx.supabase.co/auth/v1/verify?token=...&type=magiclink&redirect_to=https://votre-app.vercel.app/auth/callback
   ↓
3. Utilisateur clique sur le lien dans l'email
   ↓
4. Supabase vérifie le token
   ↓
5. Supabase redirige vers: https://votre-app.vercel.app/auth/callback?code=xxx
   ↓
6. L'API route /auth/callback échange le code contre une session
   ↓
7. Redirection vers la page demandée (ou / par défaut)
   ✅ Utilisateur connecté
```

#### 🔐 OAuth Flow (Google/GitHub)

```
1. Utilisateur clique sur "Continue with Google"
   ↓
2. Redirection vers Google OAuth
   ↓
3. Utilisateur accepte les permissions
   ↓
4. Google redirige vers Supabase: https://xxxxx.supabase.co/auth/v1/callback
   ↓
5. Supabase crée/récupère le compte utilisateur
   ↓
6. Supabase redirige vers: https://votre-app.vercel.app/auth/callback?code=xxx
   ↓
7. L'API route /auth/callback échange le code contre une session
   ↓
8. Redirection vers la page demandée
   ✅ Utilisateur connecté
```

#### 🔐 Password Reset Flow

```
1. Utilisateur clique sur "Forgot password"
   ↓
2. Supabase envoie un email avec un lien de reset
   Exemple: https://xxxxx.supabase.co/auth/v1/verify?token=...&type=recovery&redirect_to=https://votre-app.vercel.app/auth/callback
   ↓
3. Utilisateur clique sur le lien dans l'email
   ↓
4. Supabase vérifie le token
   ↓
5. Supabase redirige vers: https://votre-app.vercel.app/auth/callback?code=xxx&type=recovery
   ↓
6. L'API route /auth/callback détecte le type=recovery
   ↓
7. Redirection vers /auth/reset-password (avec session temporaire)
   ↓
8. Utilisateur entre son nouveau mot de passe
   ✅ Mot de passe modifié
```

#### 📁 Fichiers impliqués

| Fichier | Rôle |
|---------|------|
| `src/app/auth/callback/route.ts` | Échange le code contre une session Supabase |
| `src/app/auth/auth-code-error/page.tsx` | Page d'erreur si le callback échoue |
| `src/middleware.ts` | Vérifie l'authentification sur toutes les pages |
| `src/lib/supabase/server.ts` | Client Supabase côté serveur |

#### ⚠️ Erreurs courantes et solutions

**Erreur: "redirect_uri_mismatch"**
- ❌ Cause : L'URL de callback n'est pas configurée dans Supabase
- ✅ Solution : Ajouter `https://votre-app.vercel.app/auth/callback` dans Supabase > Authentication > URL Configuration

**Erreur: "Invalid authentication code"**
- ❌ Cause : Le lien a expiré (>1h) ou déjà été utilisé
- ✅ Solution : Demander un nouveau lien

**Erreur: "PKCE verifier is missing"**
- ❌ Cause : Problème avec le flow PKCE de Supabase
- ✅ Solution : Vérifier que `exchangeCodeForSession` est utilisé (pas `getSession`)

**Redirection infinie**
- ❌ Cause : Le middleware redirige vers /auth/callback qui redirige vers middleware...
- ✅ Solution : Exclure `/auth/*` du matcher du middleware (déjà fait dans le projet)

#### 🔧 Debug de l'authentification

**Vérifier la session active :**
```typescript
// Dans n'importe quel Server Component
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
console.log('Current user:', user)
```

**Vérifier les cookies :**
```typescript
// Dans middleware ou API route
import { cookies } from 'next/headers'

const cookieStore = cookies()
const accessToken = cookieStore.get('sb-access-token')
const refreshToken = cookieStore.get('sb-refresh-token')
console.log('Has tokens:', !!accessToken, !!refreshToken)
```

**Logs Supabase :**
1. Supabase Dashboard > Logs
2. Filtrer par "auth"
3. Voir les tentatives de connexion, erreurs, etc.

#### 🎯 Checklist de configuration

Avant de déployer en production :

- [ ] Redirect URLs configurées dans Supabase (localhost + production + preview)
- [ ] Site URL configuré dans Supabase
- [ ] OAuth providers configurés (si utilisés)
- [ ] Email templates personnalisés (optionnel)
- [ ] Rate limiting activé
- [ ] Variables d'environnement définies sur Vercel :
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] Tester le flow complet :
  - [ ] Magic link
  - [ ] OAuth (si configuré)
  - [ ] Password reset
  - [ ] Logout
  - [ ] Routes protégées

## 2. Configuration Resend (Email)

1. Aller sur [resend.com](https://resend.com)
2. Créer un compte
3. Créer une API Key dans la section "API Keys"
4. Noter votre API Key : `re_xxxxxxxxxxxx`

### Configuration du domaine (optionnel)

Pour envoyer des emails depuis votre propre domaine :
1. Ajouter votre domaine dans Resend
2. Configurer les DNS records (SPF, DKIM)
3. Utiliser `EMAIL_FROM=Prompt Party <noreply@votredomaine.com>`

Sans domaine personnalisé, utiliser : `EMAIL_FROM=Prompt Party <onboarding@resend.dev>`

## 3. Déploiement sur Vercel

### 3.1 Import du projet

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "Add New Project"
3. Importer votre repository GitHub
4. Vercel détectera automatiquement Next.js

### 3.2 Configuration des variables d'environnement

Dans les paramètres du projet Vercel, ajouter ces variables d'environnement :

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://votre-app.vercel.app

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=Prompt Party <noreply@votredomaine.com>

# Cron Job Security (générer un token aléatoire)
CRON_SECRET=un_token_aleatoire_securise_123456
```

**Comment générer un CRON_SECRET sécurisé :**
```bash
openssl rand -hex 32
```

### 3.3 Déployer

1. Cliquer sur "Deploy"
2. Vercel va build et déployer automatiquement
3. Votre app sera disponible sur `https://votre-projet.vercel.app`

### 3.4 Configuration avancée (vercel.json)

Le fichier `vercel.json` contient des configurations importantes pour :

#### Headers de sécurité

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

**Ces headers protègent contre** :
- ✅ **XSS** (Cross-Site Scripting)
- ✅ **Clickjacking** (X-Frame-Options)
- ✅ **MIME sniffing**
- ✅ **Referrer leaks**

#### Redirections automatiques

Le projet configure des redirections SEO-friendly :

```json
{
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/login",
      "destination": "/auth/login",
      "permanent": true
    }
  ]
}
```

**Exemples de redirections** :
- `/home` → `/` (301 permanent)
- `/login` → `/auth/login` (301 permanent)
- `/signup` → `/auth/signup` (301 permanent)
- `/register` → `/auth/signup` (301 permanent)

#### Cache des API Routes

Les API routes ne sont jamais mises en cache :

```json
{
  "source": "/api/:path*",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "no-store, max-age=0"
    }
  ]
}
```

## 4. Middleware et Routes protégées

### 4.1 Middleware Next.js

Le projet utilise un middleware (`src/middleware.ts`) qui gère :

#### 1️⃣ **Internationalisation (i18n)**
- Support EN/FR automatique
- Détection de la langue du navigateur
- Pas de préfixe dans l'URL (`localePrefix: 'never'`)
- Utilise `next-intl` pour les traductions

#### 2️⃣ **Authentication Supabase**
- Rafraîchissement automatique du token
- Gestion des cookies de session
- Redirection si non authentifié

#### 3️⃣ **Routes protégées**
```typescript
const protectedPaths = [
  '/prompts/new',
  '/collections',
  '/profile/settings'
]
```

**Si utilisateur non connecté** → Redirection vers `/auth/login?redirectTo=...`

#### 4️⃣ **Onboarding**
- Nouveaux utilisateurs redirigés vers `/onboarding`
- Vérifie `onboarding_completed` dans la DB
- Skip si déjà complété

### 4.2 Matcher configuration

Le middleware s'applique sur toutes les routes SAUF :

```typescript
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

**Exclusions** :
- ❌ Fichiers statiques (`_next/static`)
- ❌ Images optimisées (`_next/image`)
- ❌ Favicon
- ❌ API routes (gérées séparément)
- ❌ Images (svg, png, jpg, etc.)

### 4.3 Changement de langue

L'utilisateur peut changer la langue via :
1. **Sélecteur dans le header** (composant LanguageSwitcher)
2. **Cookie** : `NEXT_LOCALE=fr` ou `NEXT_LOCALE=en`
3. **Accept-Language header** (détection auto du navigateur)

**Priorité** : Cookie > Accept-Language > Défaut (en)

## 5. Configuration du Cron Job (Weekly Digest)

Les cron jobs Vercel sont configurés dans `vercel.json` :

```json
{
  "crons": [
    {
      "path": "/api/cron/weekly-digest",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

- **Schedule** : `0 9 * * 1` = Tous les lundis à 9h00 UTC
- **Format** : Cron expression standard (minute heure jour mois jour_semaine)

### Tester le cron job manuellement

```bash
curl -X GET https://votre-app.vercel.app/api/cron/weekly-digest \
  -H "Authorization: Bearer votre_cron_secret"
```

**Note** : Les cron jobs nécessitent un plan Vercel Pro pour la production. En plan gratuit, vous devrez déclencher manuellement l'endpoint ou utiliser un service externe comme [cron-job.org](https://cron-job.org).

## 5. Configuration du domaine personnalisé (optionnel)

1. Dans Vercel, aller dans Settings > Domains
2. Ajouter votre domaine personnalisé
3. Configurer les DNS selon les instructions Vercel
4. Mettre à jour `NEXT_PUBLIC_SITE_URL` avec votre nouveau domaine

## 6. Vérifications post-déploiement

### 6.1 Tester l'authentification

1. Créer un compte sur votre app
2. Vérifier que vous recevez l'email de confirmation
3. Se connecter avec le compte créé

### 6.2 Tester les fonctionnalités

- [ ] Créer un prompt
- [ ] Liker un prompt
- [ ] Commenter un prompt
- [ ] Créer une collection
- [ ] Tester la recherche
- [ ] Tester les templates

### 6.3 Vérifier les emails (si configuré)

- [ ] Email de bienvenue
- [ ] Notifications de like
- [ ] Notifications de commentaire
- [ ] Notifications de follow

## 7. Monitoring et Logs

### Vercel Logs

Dans votre projet Vercel :
1. Aller dans "Deployments"
2. Cliquer sur un deployment
3. Voir les "Function Logs" pour les API Routes

### Supabase Logs

Dans votre projet Supabase :
1. Aller dans "Logs"
2. Voir les requêtes SQL et erreurs

### Resend Logs

Dans Resend :
1. Aller dans "Logs"
2. Voir tous les emails envoyés

## 8. Optimisations et Bonnes Pratiques

### 8.1 SEO et Performance

#### Metadata dynamique

Chaque page génère ses propres metadata pour le SEO :

```typescript
// src/app/prompts/[id]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prompt = await getPrompt(params.id)
  return {
    title: `${prompt.title} | Prompt Party`,
    description: prompt.body.substring(0, 160),
    openGraph: {
      title: prompt.title,
      description: prompt.body,
      type: 'article',
    }
  }
}
```

✅ **Résultat** : Chaque prompt a son propre titre/description pour Google et les réseaux sociaux

#### Images optimisées

Utiliser le composant `<Image>` de Next.js :

```tsx
import Image from 'next/image'

<Image
  src="/avatar.jpg"
  width={200}
  height={200}
  alt="Avatar"
  priority // Pour les images above the fold
/>
```

✅ **Bénéfices** :
- Lazy loading automatique
- Formats modernes (WebP)
- Responsive images
- Optimisation de la taille

### 8.2 Sécurité supplémentaire

#### Validation des données

**Côté serveur** : Toujours valider les inputs

```typescript
// src/app/api/prompts/route.ts
export async function POST(request: Request) {
  const body = await request.json()

  // Validation
  if (!body.title || body.title.length > 200) {
    return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
  }

  // Sanitization (éviter XSS)
  const sanitizedTitle = body.title.trim()

  // ...
}
```

#### Rate Limiting (recommandé pour production)

Installer `@upstash/ratelimit` pour limiter les requêtes API :

```bash
pnpm add @upstash/ratelimit @upstash/redis
```

```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  // Process request...
}
```

### 8.3 Analytics et Monitoring

#### Vercel Analytics (recommandé)

1. Activer dans Vercel Dashboard > Analytics
2. Plan gratuit : 2500 events/mois
3. Tracking automatique :
   - Page views
   - Core Web Vitals
   - Real User Monitoring

#### Supabase Realtime

Surveiller les connexions en temps réel :

```typescript
const channel = supabase
  .channel('online-users')
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState()
    console.log('Online users:', Object.keys(state).length)
  })
  .subscribe()
```

### 8.4 Cache et Performance

#### Static Generation (SSG)

Pour les pages qui changent rarement :

```typescript
// src/app/about/page.tsx
export const revalidate = 3600 // Revalider toutes les heures

export default function AboutPage() {
  return <div>About...</div>
}
```

#### Incremental Static Regeneration (ISR)

Pour les listes de prompts :

```typescript
// src/app/prompts/page.tsx
export const revalidate = 60 // Revalider chaque minute

export default async function PromptsPage() {
  const prompts = await getPrompts()
  return <PromptList prompts={prompts} />
}
```

#### Cache des requêtes Supabase

```typescript
const { data } = await supabase
  .from('prompts')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(20)

// Next.js 15 cache automatiquement les fetch() et requêtes
// Pour désactiver : { cache: 'no-store' }
```

### 8.5 Redirections avancées

#### Ajouter des redirections personnalisées

Dans `vercel.json`, ajouter :

```json
{
  "redirects": [
    {
      "source": "/blog/:slug",
      "destination": "/prompts/:slug",
      "permanent": true
    },
    {
      "source": "/old-url",
      "destination": "/new-url",
      "permanent": true,
      "statusCode": 301
    }
  ]
}
```

#### Redirections dynamiques dans middleware

```typescript
// src/middleware.ts
export async function middleware(request: NextRequest) {
  // Exemple : Rediriger les anciennes URLs
  if (request.nextUrl.pathname.startsWith('/old-path')) {
    return NextResponse.redirect(
      new URL('/new-path', request.url)
    )
  }

  // ...
}
```

### 8.6 Internationalisation (i18n)

#### Ajouter une nouvelle langue

1. Créer `messages/es.json` (espagnol)
2. Copier la structure de `messages/en.json`
3. Traduire tous les textes
4. Ajouter dans `src/i18n/request.ts` :

```typescript
export const locales = ['en', 'fr', 'es'] as const
```

5. Mettre à jour le middleware :

```typescript
const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en',
})
```

### 8.7 Monitoring des erreurs (optionnel)

#### Sentry pour tracking des erreurs

```bash
pnpm add @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.VERCEL_ENV,
})
```

## 9. Différences avec Netlify

| Aspect | Netlify | Vercel |
|--------|---------|--------|
| Functions | `netlify/functions/` | `src/app/api/` (API Routes) |
| Cron Jobs | Netlify Scheduled Functions | Vercel Cron Jobs (`vercel.json`) |
| Config | `netlify.toml` | `vercel.json` |
| CLI | `netlify dev` | `vercel dev` |
| Edge Functions | Netlify Edge Functions | Vercel Edge Functions |

## 9. Plan gratuit Vercel - Limites

- **Bandwidth** : 100 GB/mois
- **Function Invocations** : 100k/mois
- **Function Duration** : 10s max
- **Cron Jobs** : ❌ Non disponible (nécessite Pro)
- **Build Time** : 6000 minutes/mois

## 10. Alternative pour Cron Jobs (plan gratuit)

Si vous êtes sur le plan gratuit Vercel, utilisez un service externe :

### Option 1 : cron-job.org (gratuit)

1. Créer un compte sur [cron-job.org](https://cron-job.org)
2. Créer un nouveau cron job :
   - **URL** : `https://votre-app.vercel.app/api/cron/weekly-digest`
   - **Schedule** : `0 9 * * 1` (Lundi 9h)
   - **Headers** : `Authorization: Bearer votre_cron_secret`

### Option 2 : GitHub Actions (gratuit)

Créer `.github/workflows/weekly-digest.yml` :

```yaml
name: Weekly Digest

on:
  schedule:
    - cron: '0 9 * * 1'  # Lundi 9h UTC
  workflow_dispatch:  # Permet déclenchement manuel

jobs:
  run-digest:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Weekly Digest
        run: |
          curl -X GET ${{ secrets.SITE_URL }}/api/cron/weekly-digest \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

Ajouter dans GitHub Secrets :
- `SITE_URL` : `https://votre-app.vercel.app`
- `CRON_SECRET` : votre token secret

## 11. Commandes utiles

```bash
# Développement local
pnpm dev

# Build production
pnpm build

# Déployer sur Vercel via CLI
vercel

# Déployer en production
vercel --prod

# Voir les logs en temps réel
vercel logs

# Variables d'environnement
vercel env ls
vercel env add VARIABLE_NAME
```

## 12. Troubleshooting

### Build échoue sur Vercel

```bash
# Vérifier le build en local
pnpm build

# Si ça fonctionne en local, vérifier :
# - Les variables d'environnement sur Vercel
# - Les versions Node.js (package.json engines)
```

### Erreur "Invalid Supabase URL"

Vérifier que `NEXT_PUBLIC_SUPABASE_URL` est bien défini dans Vercel et commence par `https://`

### Emails non envoyés

1. Vérifier `RESEND_API_KEY` dans Vercel
2. Vérifier les logs Resend
3. Vérifier que `EMAIL_FROM` utilise un domaine vérifié

### Cron job ne se déclenche pas

- Plan gratuit : Les cron jobs ne sont pas disponibles, utiliser une alternative (voir section 10)
- Plan Pro : Vérifier dans Vercel > Settings > Cron Jobs

## Support

- Vercel Docs : https://vercel.com/docs
- Supabase Docs : https://supabase.com/docs
- Resend Docs : https://resend.com/docs
