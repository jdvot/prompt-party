# OAuth Setup Guide - Google & GitHub

Les boutons "Continue with Google" et "Continue with GitHub" sont déjà implémentés dans l'app. Il faut juste activer les providers dans Supabase.

## 1. Configuration Google OAuth

### Étape 1 : Créer une OAuth App dans Google Cloud Console
1. Va sur https://console.cloud.google.com/
2. Crée un nouveau projet ou sélectionne un projet existant
3. Dans le menu, va dans **APIs & Services > Credentials**
4. Clique sur **Create Credentials > OAuth 2.0 Client ID**
5. Configure l'écran de consentement si demandé :
   - User Type: **External**
   - App name: **Prompt Party**
   - User support email: ton email
   - Developer contact: ton email
6. Application type: **Web application**
7. Name: **Prompt Party**
8. Authorized JavaScript origins:
   ```
   https://prompt-party-app.netlify.app
   http://localhost:3000
   ```
9. Authorized redirect URIs:
   ```
   https://hfswbeyptqqhvhnxzcbh.supabase.co/auth/v1/callback
   http://localhost:54321/auth/v1/callback
   ```

### Étape 2 : Configuration dans Supabase
1. Va sur https://supabase.com/dashboard/project/hfswbeyptqqhvhnxzcbh/auth/providers
2. Trouve **Google** dans la liste des providers
3. Active le toggle **Enable Google**
4. Copie le **Client ID** et **Client Secret** de Google Console
5. Colle-les dans Supabase
6. Clique sur **Save**

## 2. Configuration GitHub OAuth

### Étape 1 : Créer une OAuth App dans GitHub
1. Va sur https://github.com/settings/developers
2. Clique sur **New OAuth App**
3. Remplis le formulaire :
   - Application name: **Prompt Party**
   - Homepage URL: `https://prompt-party-app.netlify.app`
   - Authorization callback URL: `https://hfswbeyptqqhvhnxzcbh.supabase.co/auth/v1/callback`
4. Clique sur **Register application**
5. Copie le **Client ID**
6. Clique sur **Generate a new client secret** et copie le secret

### Étape 2 : Configuration dans Supabase
1. Va sur https://supabase.com/dashboard/project/hfswbeyptqqhvhnxzcbh/auth/providers
2. Trouve **GitHub** dans la liste des providers
3. Active le toggle **Enable GitHub**
4. Colle le **Client ID** et **Client Secret** de GitHub
5. Clique sur **Save**

## 3. Test Local

Pour tester en local, ajoute aussi les URLs localhost dans les OAuth apps :

### Google:
- Authorized JavaScript origins: `http://localhost:3000`
- Authorized redirect URIs: `http://localhost:54321/auth/v1/callback`

### GitHub:
- Crée une deuxième OAuth App pour le développement local
- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:54321/auth/v1/callback`

## 4. Vérification

Une fois configuré, teste sur :
- Production: https://prompt-party-app.netlify.app/auth/login
- Local: http://localhost:3000/auth/login

Les boutons "Continue with Google" et "Continue with GitHub" devraient fonctionner !

## Notes importantes

- **Gratuit** : Aucun coût pour Google ou GitHub OAuth
- **Supabase gratuit** : Inclus dans le tier gratuit (50k MAU)
- **Sécurité** : Les secrets OAuth doivent rester confidentiels
- **Production** : Les URLs de callback doivent correspondre exactement

## Création automatique du profil

Le trigger Supabase existant créera automatiquement un profil lors de l'inscription OAuth :
- Google: Utilise le nom Google + email
- GitHub: Utilise le username GitHub + email

Tout est déjà configuré dans le code ! Il faut juste activer les providers dans Supabase Dashboard.
