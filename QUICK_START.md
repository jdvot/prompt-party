# Quick Start - Prompt Party

## 🚀 Démarrage en 5 minutes

### 1. Clone et installation
```bash
cd prompt-party
pnpm install
```

### 2. Configuration Supabase

#### Créer un projet Supabase
1. Aller sur https://supabase.com et créer un compte
2. Créer un nouveau projet (région EU recommandée)
3. Attendre que le projet soit prêt (~2 minutes)

#### Appliquer le schéma
1. Dans le Dashboard Supabase, aller dans **SQL Editor**
2. Créer une nouvelle query
3. Copier tout le contenu de `/supabase/migrations/20250101000000_initial_schema.sql`
4. Coller et exécuter (bouton RUN)

#### Configurer OAuth (optionnel pour MVP)
Dans **Authentication > Providers**:
- Activer **Email** (déjà activé par défaut)
- Pour Google: ajouter Client ID et Client Secret
- Pour GitHub: ajouter Client ID et Client Secret

#### Créer bucket Storage
Dans **Storage**:
1. Créer un bucket nommé `avatars`
2. Le rendre public
3. Ajouter policy pour upload authentifié

### 3. Variables d'environnement

Créer `.env.local` à la racine:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Où trouver ces valeurs:
- Dans Supabase Dashboard > **Settings > API**
- `Project URL` = `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` = `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Lancer le projet
```bash
pnpm dev
```

Ouvrir http://localhost:3000

### 5. Tester l'authentification
1. Aller sur http://localhost:3000/auth/signup
2. Créer un compte avec email/mot de passe
3. Vérifier l'email et confirmer
4. Se connecter

## ✅ Checklist de vérification

- [ ] Le site se charge sans erreurs
- [ ] La navigation fonctionne (Header, Footer)
- [ ] Je peux créer un compte
- [ ] Je peux me connecter
- [ ] Mon avatar apparaît dans le header
- [ ] Le menu utilisateur fonctionne

## 🎯 Prochaines étapes

Maintenant que la base fonctionne, implémentez dans l'ordre:

1. **Feed de prompts** (Phase 6)
   - Créer le composant pour afficher les prompts
   - Ajouter l'API route pour récupérer les prompts

2. **Création de prompts** (Phase 7)
   - Formulaire de création
   - Éditeur Markdown

3. **Page détail** (Phase 8)
   - Affichage d'un prompt individuel

4. **Likes** (Phase 9)
   - Système de likes avec realtime

5. **Commentaires** (Phase 10)
   - Système de commentaires

Voir `DEVELOPMENT.md` pour les instructions détaillées.

## 🐛 Problèmes fréquents

**"Invalid API key"**
```bash
# Vérifier que .env.local existe
cat .env.local

# Redémarrer le serveur
# Ctrl+C puis pnpm dev
```

**"Failed to fetch"**
- Vérifier que Supabase project est actif
- Vérifier l'URL dans .env.local
- Vérifier le schéma SQL a bien été exécuté

**"User not authorized"**
- Les policies RLS bloquent peut-être
- Aller dans Supabase Dashboard > Authentication > Policies
- Vérifier que les policies existent

## 📞 Support

- Documentation complète: `DEVELOPMENT.md`
- Schéma SQL: `supabase/migrations/20250101000000_initial_schema.sql`
- Guide Supabase: `supabase/README.md`
