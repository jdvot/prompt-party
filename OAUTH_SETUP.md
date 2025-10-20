# OAuth Setup Guide - Google

Le bouton "Continue with Google" est déjà implémenté dans l'app. Il faut juste activer le provider dans Supabase.

## Configuration Google OAuth

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

## Test Local

Pour tester en local, ajoute aussi les URLs localhost dans Google OAuth App :
- Authorized JavaScript origins: `http://localhost:3000`
- Authorized redirect URIs: `http://localhost:54321/auth/v1/callback`

## Vérification

Une fois configuré, teste sur :
- Production: https://prompt-party-app.netlify.app/auth/login
- Local: http://localhost:3000/auth/login

Le bouton "Continue with Google" devrait fonctionner !

## Notes importantes

- **Gratuit** : Aucun coût pour Google OAuth
- **Supabase gratuit** : Inclus dans le tier gratuit (50k MAU)
- **Sécurité** : Les secrets OAuth doivent rester confidentiels
- **Production** : Les URLs de callback doivent correspondre exactement

## Création automatique du profil

Le trigger Supabase existant créera automatiquement un profil lors de l'inscription OAuth.
Google utilise le nom Google + email.

Tout est déjà configuré dans le code ! Il faut juste activer le provider dans Supabase Dashboard.
