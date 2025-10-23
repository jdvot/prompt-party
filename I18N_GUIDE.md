# Guide d'Internationalisation (i18n) - Prompt Party

## Vue d'ensemble

L'application Prompt Party supporte maintenant l'anglais (en) et le français (fr) grâce à next-intl.

## Configuration

### Fichiers de configuration

- **`src/i18n/request.ts`** - Configuration next-intl
- **`messages/en.json`** - Traductions anglaises
- **`messages/fr.json`** - Traductions françaises
- **`next.config.ts`** - Configuration Next.js avec plugin next-intl

### Langues supportées

```typescript
export const locales = ['en', 'fr'] as const;
```

## Utilisation

### Dans les composants client

```tsx
'use client'

import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('namespace')

  return <h1>{t('key')}</h1>
}
```

### Exemple avec le Header

```tsx
const t = useTranslations('nav')

<Link href="/">{t('home')}</Link>
<Link href="/trending">{t('trending')}</Link>
```

### Dans les composants serveur

```tsx
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('namespace')

  return <h1>{t('key')}</h1>
}
```

## Structure des traductions

Les traductions sont organisées par namespaces dans les fichiers JSON :

```json
{
  "common": {
    "loading": "Loading...",
    "error": "Error"
  },
  "nav": {
    "home": "Home",
    "trending": "Trending"
  },
  "prompts": {
    "create_title": "Create New Prompt"
  }
}
```

### Namespaces disponibles

- **common** - Textes communs (buttons, états)
- **nav** - Navigation
- **header** - En-tête
- **footer** - Pied de page
- **home** - Page d'accueil
- **auth** - Authentification
- **prompts** - Prompts
- **comments** - Commentaires
- **collections** - Collections
- **profile** - Profil
- **settings** - Paramètres
- **search** - Recherche
- **notifications** - Notifications
- **onboarding** - Onboarding
- **errors** - Messages d'erreur
- **wizard** - Assistant prompt
- **prompt_types** - Types de prompts
- **languages** - Noms des langues

## Changement de langue

### Composant LanguageSwitcher

Le composant `<LanguageSwitcher />` dans le Header permet aux utilisateurs de changer de langue.

```tsx
import { LanguageSwitcher } from './language-switcher'

<LanguageSwitcher />
```

### Fonctionnement

1. L'utilisateur sélectionne une langue dans le menu déroulant
2. Un cookie `NEXT_LOCALE` est défini avec la valeur de la langue
3. La page se recharge pour appliquer la nouvelle langue
4. Le layout root lit le cookie et charge les messages appropriés

### Cookie de langue

```typescript
// Définir la langue
document.cookie = `NEXT_LOCALE=fr; path=/; max-age=${60 * 60 * 24 * 365}`;

// Le layout lit automatiquement ce cookie
const cookieStore = await cookies();
const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
```

## Ajouter une nouvelle traduction

### 1. Ajouter dans les fichiers de traduction

**messages/en.json**
```json
{
  "myNamespace": {
    "myKey": "My English text"
  }
}
```

**messages/fr.json**
```json
{
  "myNamespace": {
    "myKey": "Mon texte français"
  }
}
```

### 2. Utiliser dans un composant

```tsx
'use client'

import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('myNamespace')

  return <p>{t('myKey')}</p>
}
```

## Traductions avec variables

Pour les traductions dynamiques :

```json
{
  "prompts": {
    "likes_count": "{count} likes"
  }
}
```

Utilisation :

```tsx
const t = useTranslations('prompts')

<span>{t('likes_count', { count: 42 })}</span>
// Résultat : "42 likes"
```

## Composants déjà traduits

✅ **Header** - Navigation principale
✅ **Footer** - Pied de page
✅ **LanguageSwitcher** - Sélecteur de langue

## Composants à traduire

Les composants suivants utilisent encore du texte en dur et doivent être traduits :

- Pages de contenu (about, faq, privacy, terms, docs)
- Composants de prompts (prompt-card, prompt-list, etc.)
- Composants de profil
- Formulaires (auth, collections, prompts)
- Modales et dialogs
- Messages d'erreur et toasts
- Bottom navigation
- Search autocomplete
- Et plus...

## Bonnes pratiques

1. **Toujours utiliser useTranslations** plutôt que du texte en dur
2. **Organiser par namespace** pour une meilleure structure
3. **Garder les clés cohérentes** entre EN et FR
4. **Tester les deux langues** après chaque modification
5. **Utiliser des variables** pour les contenus dynamiques
6. **Éviter les textes trop longs** dans les clés de traduction

## Tests

Pour tester les traductions :

1. Démarrer le serveur de développement : `pnpm dev`
2. Ouvrir http://localhost:3000 (ou 3001)
3. Cliquer sur le sélecteur de langue dans le Header
4. Vérifier que tous les textes changent correctement

## Déploiement

Les traductions sont automatiquement incluses dans le build :

```bash
pnpm build
```

Le plugin next-intl s'occupe de tout automatiquement.

## Ressources

- [Documentation next-intl](https://next-intl-docs.vercel.app/)
- [Next.js i18n routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
