# 🚀 Instructions Supabase - Activation Temps Réel

## ✅ Statut Actuel

- ✅ Serveur local: **http://localhost:3001** (en cours d'exécution)
- ✅ Migration SQL: **copiée dans le presse-papiers**
- ✅ Pages Supabase: **ouvertes dans ton navigateur**

---

## 📋 Étape 1: Appliquer la Migration (2 minutes)

### Dans l'onglet "SQL Editor":

1. **Coller le SQL** (déjà dans ton presse-papiers)
   - `Cmd + V` (ou clic droit → Coller)

2. **Exécuter**
   - Cliquer sur **"Run"** (bouton vert en haut à droite)
   - Ou appuyer sur `Cmd + Enter`

3. **Vérifier le succès**
   - Attendre le message: ✅ **"Success. No rows returned"**
   - Ou: **"Query completed successfully"**

---

## ⚡ Étape 2: Activer Realtime (1 minute)

### Dans l'onglet "Replication":

**Tu es déjà sur cette page!** Il faut juste **scroller vers le bas** 👇

Tu verras une liste de tables avec des toggles (boutons ON/OFF).

### Activer ces 2 tables:

1. **Chercher `prompt_versions`**
   - Cliquer sur le toggle pour passer à **ON** (vert)

2. **Chercher `prompt_presence`**
   - Cliquer sur le toggle pour passer à **ON** (vert)

### Visual:
```
┌─────────────────────────────────────────┐
│ Name              | Enabled             │
├─────────────────────────────────────────┤
│ prompt_versions   | [●] ON  ← Active ça │
│ prompt_presence   | [●] ON  ← Active ça │
└─────────────────────────────────────────┘
```

---

## 🎉 Étape 3: Tester

Une fois les 2 étapes terminées:

1. **Va sur ton app locale**: http://localhost:3001
2. **Connecte-toi** (ou inscris-toi)
3. **Ouvre n'importe quel prompt**
4. **Cherche le bouton "Version History"**
5. **Teste la collaboration** en ouvrant 2 fenêtres

---

## 🔍 Comment savoir si ça marche?

### ✅ Migration réussie:
- Message "Success" dans SQL Editor
- Pas d'erreur en rouge

### ✅ Realtime activé:
- Les 2 toggles sont en vert (ON)
- Tu verras "Enabled" à côté des noms

### ✅ Features fonctionnent:
- Bouton "Version History" visible
- Avatars des utilisateurs actifs
- Badge "Live" en vert

---

## ❓ Problèmes?

### "Permission denied" dans SQL Editor:
- Tu n'as pas les droits admin
- Demande à l'admin du projet Supabase

### Tables pas visibles dans Replication:
- La migration n'a pas été appliquée
- Retourne à l'étape 1

### Features ne marchent pas:
- Vérifie que les 2 toggles sont ON
- Rafraîchis la page (F5)
- Regarde la console du navigateur (F12)

---

## 📸 Dans ta capture d'écran

Je vois que tu es déjà sur la page **Replication** ✅

**Action immédiate:**
1. **Scroll vers le bas** sur cette page
2. Tu verras la liste des tables
3. Active `prompt_versions` et `prompt_presence`

**Note:** Si tu ne vois pas ces tables dans la liste, c'est que la migration n'a pas encore été appliquée. Va d'abord dans l'onglet SQL Editor et exécute la migration!

---

## 🎯 Résumé Express

```bash
# 1. SQL Editor (onglet déjà ouvert)
Cmd+V → Run (ou Cmd+Enter)

# 2. Replication (tu y es déjà!)
Scroll ↓ → Active prompt_versions → Active prompt_presence

# 3. Test
Ouvre http://localhost:3001
```

---

**Temps total: ~3 minutes** ⏱️

Une fois fait, tes features collaboratives seront 100% opérationnelles! 🚀
