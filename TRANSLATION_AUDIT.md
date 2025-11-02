# Audit des Traductions - Prompt Party

## ✅ Pages AVEC traductions (i18n intégré)

- ✅ `/about` - Page À propos
- ✅ `/faq` - FAQ
- ✅ `/docs` - Documentation
- ✅ `/mcp` - MCP expliqué
- ✅ `/mcp-vs-rag` - Comparaison MCP vs RAG
- ✅ `/search` - Recherche
- ✅ `/bookmarks` - Signets
- ✅ `/following` - Abonnements
- ✅ `/top` - Top prompts
- ✅ `/trending` - Tendances
- ✅ `/templates` - Templates
- ✅ `/challenges` - Challenges (corrigé)
- ✅ `/leaderboard` - Classement (corrigé)
- ✅ `/profile/me` - Profil (corrigé)
- ✅ `/access` - Protection d'accès
- ✅ Composant `MarkdownEditor` - Éditeur avec write/preview

## ❌ Pages SANS traductions (texte en dur)

### 🔴 PRIORITÉ HAUTE

#### 1. `/` (Homepage) - `src/app/page.tsx`
**Problèmes:**
- Titre: "Apprends à parler à l'IA comme un pro"
- Badge: "100% Gratuit" (hardcodé)
- Description des parcours (Débutant, Intermédiaire, Avancé)
- Textes des 3 cartes principales: "Apprendre", "Expérimenter", "Communauté"
- Stats: "Apprenants", "Prompts partagés", "Gratuit"
- Tous les paragraphes descriptifs

**Textes à traduire (lignes approximatives):**
- L68-93: Descriptions des parcours d'apprentissage
- L96-114: Descriptions des concepts
- L124: Badge "100% Gratuit"
- L129-137: Titre et sous-titre hero
- L145-152: Boutons CTA
- L162-174: Stats
- L191-264: Cartes principales et leurs contenus
- L274-309: Section parcours
- L316-346: Concepts clés
- L354-363: Prompts communautaires
- L377-398: CTA final

#### 2. `/pricing` - `src/app/pricing/page.tsx`
**Problèmes:**
- Metadata: titre et description en dur
- Noms des plans: "Gratuit", "Soutien"
- Liste complète des fonctionnalités (25+ items)
- Badge "100% Gratuit" (hardcodé)
- Descriptions, boutons, FAQ

**Textes à traduire (lignes 1-50+):**
- L12-14: Metadata
- L19-32: Plan Gratuit
- L36-49: Plan Soutien
- Toutes les features des deux plans
- Tous les textes descriptifs

## 🔧 Composants à vérifier

Les composants suivants utilisent probablement des traductions:
- ✅ Header/Footer - À vérifier
- ✅ BottomNav - À vérifier
- ❓ FeedContent - Vérifier les labels
- ❓ PromptCard - Vérifier les labels (likes, commentaires, etc.)

## 📝 Recommandations

### Actions immédiates:

1. **Homepage (`/`)** - Ajouter ~50 clés de traduction
2. **Pricing** - Ajouter ~40 clés de traduction
3. Créer des sections dans messages/en.json et messages/fr.json:
   - `home.*` pour la homepage
   - `pricing.*` pour le pricing (déjà existe partiellement)

### Clés manquantes estimées:

- Homepage: ~50 clés
- Pricing: ~40 clés (certaines existent déjà)

**Total:** ~90 clés de traduction à ajouter

## ⚠️ Notes importantes

- Le système i18n est déjà en place avec `next-intl`
- Les fichiers `messages/en.json` et `messages/fr.json` sont synchronisés
- Toutes les pages récemment corrigées (challenges, leaderboard, profile) utilisent maintenant les traductions
- L'éditeur Markdown utilise déjà `editor.write` et `editor.preview` correctement
