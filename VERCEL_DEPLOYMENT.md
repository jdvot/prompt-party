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

## 4. Configuration du Cron Job (Weekly Digest)

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

## 8. Différences avec Netlify

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
