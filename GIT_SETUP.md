# 🚀 Configuration Git et GitHub

## Initialiser le dépôt Git local

```bash
cd /Users/admin/prompt-party

# Initialiser le dépôt
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Prompt Party MVP complete

- Next.js 15 + TypeScript setup
- Supabase authentication and database
- Feed with sorting (New/Top/Trending)
- Markdown editor for prompt creation
- User profiles and settings
- Complete UI with Tailwind + Shadcn
- 14 routes implemented
- All core MVP features working"
```

## Créer le dépôt sur GitHub

### Option 1: Via l'interface GitHub
1. Aller sur https://github.com/new
2. Nom du dépôt: `prompt-party`
3. Description: "The social network for AI prompts - Next.js + Supabase"
4. Visibilité: Public ou Private
5. **NE PAS** initialiser avec README (nous en avons déjà un)
6. Créer le dépôt

### Option 2: Via GitHub CLI (si installé)
```bash
gh repo create prompt-party --public --source=. --remote=origin --description="The social network for AI prompts - Next.js + Supabase"
```

## Connecter le dépôt local à GitHub

```bash
# Ajouter l'origin (remplacer 'jdvot' par votre username si différent)
git remote add origin https://github.com/jdvot/prompt-party.git

# Vérifier
git remote -v

# Pousser le code
git branch -M main
git push -u origin main
```

## Structure des branches recommandée

```bash
# Créer une branche de développement
git checkout -b develop

# Pour une nouvelle feature
git checkout -b feature/likes-system
git checkout -b feature/comments
git checkout -b feature/remix

# Pour un fix
git checkout -b fix/auth-redirect
```

## Fichiers Git importants

Votre `.gitignore` est déjà configuré pour exclure:
- `node_modules/`
- `.next/`
- `.env` et `.env*.local`
- Build artifacts
- IDE files

## Commandes Git utiles

```bash
# Voir le statut
git status

# Ajouter des modifications
git add .
git add src/app/new-feature.tsx

# Commit
git commit -m "Add: feature description"

# Push
git push origin main

# Pull les dernières modifications
git pull origin main

# Voir l'historique
git log --oneline

# Créer un tag pour une release
git tag -a v1.0.0 -m "MVP Release"
git push origin v1.0.0
```

## GitHub Actions (CI/CD) - Optionnel

Créer `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'

    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8

    - name: Install dependencies
      run: pnpm install

    - name: Lint
      run: pnpm lint

    - name: Build
      run: pnpm build
      env:
        NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
```

## Netlify + GitHub Integration

Une fois le dépôt sur GitHub:

1. Aller sur https://app.netlify.com
2. "Add new site" > "Import an existing project"
3. Sélectionner "GitHub"
4. Autoriser Netlify à accéder à vos repos
5. Sélectionner `jdvot/prompt-party`
6. Configuration build:
   - Build command: `pnpm build`
   - Publish directory: `.next`
7. Ajouter les variables d'environnement
8. Deploy!

Netlify va automatiquement:
- Builder à chaque push sur `main`
- Créer des preview deployments pour les PRs
- Générer des URLs de preview

## Protection de branche (recommandé)

Sur GitHub > Settings > Branches:
- Protéger la branche `main`
- Require pull request reviews
- Require status checks (CI)

## Collaborateurs

Pour ajouter des collaborateurs:
1. GitHub repo > Settings > Collaborators
2. Ajouter par username ou email

## README Badge

Ajouter au README.md:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
```

## Premier déploiement

```bash
# Après avoir connecté à GitHub et Netlify

# 1. Commit et push
git add .
git commit -m "Ready for production deployment"
git push origin main

# 2. Netlify va builder automatiquement
# 3. Vérifier sur https://app.netlify.com

# 4. Configurer le domaine personnalisé (optionnel)
# Netlify > Domain settings > Add custom domain
```

## Gestion des releases

```bash
# Créer une release
git tag -a v1.0.0 -m "MVP Release - Core features complete"
git push origin v1.0.0

# Créer la release sur GitHub
# GitHub > Releases > Draft a new release
# Sélectionner le tag v1.0.0
# Ajouter les release notes
```

## Troubleshooting

**Push rejeté:**
```bash
git pull origin main --rebase
git push origin main
```

**Supprimer fichiers du cache Git:**
```bash
git rm -r --cached node_modules/
git commit -m "Remove node_modules from git"
```

**Changer l'URL remote:**
```bash
git remote set-url origin https://github.com/jdvot/prompt-party.git
```

Votre projet est maintenant prêt pour Git et GitHub! 🚀
