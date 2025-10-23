# Guide Complet : Les 3 Types de Prompts IA

## 📚 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [System Prompt](#system-prompt)
3. [User Prompt](#user-prompt)
4. [Assistant Prompt](#assistant-prompt)
5. [Comment les combiner](#comment-les-combiner)
6. [Exemples concrets](#exemples-concrets)

---

## Vue d'ensemble

Les modèles de langage (LLM) utilisent **3 types de prompts** qui travaillent ensemble pour produire les meilleures réponses :

| Type | Rôle | Icône | Priorité |
|------|------|-------|----------|
| **System** | Définit le comportement global | 🧠 | Haute - S'applique toujours |
| **User** | La question/demande | 👤 | Moyenne - Ce que vous voulez |
| **Assistant** | Exemples de réponses | 💬 | Basse - Guide le format |

---

## System Prompt

### 🎯 Définition
Le **System Prompt** est l'instruction "cachée" qui définit :
- Le **rôle** de l'IA (expert, assistant, professeur...)
- Le **ton** (formel, amical, technique...)
- Les **contraintes** (longueur, format, limitations...)
- Le **contexte** général

### 💡 Pourquoi c'est important ?
C'est la **personnalité** de base de l'IA. Une fois défini, il s'applique à TOUTES les conversations suivantes.

### ✅ Bonnes pratiques

**À FAIRE :**
```
✅ Tu es un expert en cybersécurité avec 15 ans d'expérience.
✅ Tu vulgarises les concepts techniques pour des débutants.
✅ Tu donnes toujours 3 options avec avantages/inconvénients.
✅ Ton ton est professionnel mais accessible.
```

**À ÉVITER :**
```
❌ Aide-moi (trop vague)
❌ Sois intelligent (subjectif)
❌ Fais de ton mieux (inutile)
```

### 📝 Exemples par cas d'usage

#### Expert Technique
```
SYSTEM: Tu es un développeur senior spécialisé en React et TypeScript.
Tu expliques le code ligne par ligne et suggères des améliorations.
Tu utilises toujours les best practices modernes (hooks, TypeScript strict).
Ton format : 1) Explication, 2) Code optimisé, 3) Pourquoi cette approche.
```

#### Coach Personnel
```
SYSTEM: Tu es un coach sportif bienveillant et motivant.
Tu t'adaptes au niveau de la personne (débutant/intermédiaire/avancé).
Tu donnes des conseils réalistes et encourageants.
Tu demandes toujours le niveau et les objectifs avant de conseiller.
```

#### Assistant Marketing
```
SYSTEM: Tu es un expert en marketing digital avec expertise SEO, réseaux sociaux et copywriting.
Tu fournis des stratégies actionnables avec métriques de succès.
Tu adaptes tes conseils au budget (petit/moyen/grand).
Format : Stratégie → Tactiques → KPIs → Budget estimé.
```

---

## User Prompt

### 🎯 Définition
Le **User Prompt** est ce que VOUS demandez :
- Votre **question** spécifique
- Votre **tâche** à accomplir
- Les **détails** et le **contexte** de votre besoin

### 💡 Pourquoi c'est important ?
C'est votre **input**. Plus il est clair et spécifique, meilleure sera la réponse.

### ✅ Formule magique : CORFEE

**C**ontexte - Donnez le contexte
**O**bjectif - Quel est le but ?
**R**ésultat - Format attendu
**F**iltres - Contraintes (longueur, ton...)
**E**xemples - Si applicable
**E**xperts - Niveau d'expertise souhaité

### 📝 Exemples AVANT/APRÈS

#### ❌ MAUVAIS (vague)
```
USER: Aide-moi avec Instagram
```

#### ✅ BON (spécifique)
```
USER: Je lance une marque de café artisanal bio.

OBJECTIF: Créer une stratégie de contenu Instagram pour attirer
des jeunes urbains (25-40 ans) sensibles à l'écologie.

FORMAT ATTENDU:
- 3 piliers de contenu
- 10 idées de posts par pilier
- Meilleur moment de publication
- 3 hashtags principaux

CONTRAINTES:
- Budget limité (pas d'influenceurs payants)
- Équipe de 1 personne
- Contenu facile à produire

NIVEAU: Je suis débutant sur Instagram business.
```

#### Autre exemple - Code

❌ **MAUVAIS**
```
USER: Corrige ce code
```

✅ **BON**
```
USER: J'ai un composant React qui affiche une liste de produits.

PROBLÈME: La page lag quand il y a plus de 100 produits.

CODE:
[coller le code]

ATTENDU:
1. Identifier les problèmes de performance
2. Solution optimisée avec explication
3. Tests de performance avant/après

CONTEXTE: Next.js 15, TypeScript, utilise déjà useMemo
```

---

## Assistant Prompt

### 🎯 Définition
Le **Assistant Prompt** montre des **exemples** de réponses attendues.
C'est ce qu'on appelle le **few-shot learning** : vous montrez à l'IA comment répondre.

### 💡 Pourquoi c'est important ?
L'IA apprend par **l'exemple**. Montrez-lui le format exact que vous voulez.

### ✅ Quand l'utiliser ?

**OUI, utilisez Assistant Prompt quand :**
- Vous voulez un **format spécifique** (JSON, tableau, liste structurée)
- Le **ton** est crucial (commercial, académique, humoristique)
- Vous avez besoin de **cohérence** entre plusieurs réponses
- Le format est **complexe** ou inhabituel

**NON, pas besoin si :**
- Format simple (texte libre)
- Première fois que vous utilisez le prompt
- Question unique sans besoin de cohérence

### 📝 Exemples concrets

#### Exemple 1 : Format JSON

```
USER: Analyse le sentiment de ce tweet : "J'adore ce produit !"

ASSISTANT (exemple):
{
  "sentiment": "positif",
  "score_confiance": 0.95,
  "emotions": ["joie", "satisfaction"],
  "entites": ["produit"],
  "ton": "enthousiaste"
}
```

Maintenant l'IA sait qu'elle doit TOUJOURS répondre en JSON avec cette structure.

#### Exemple 2 : Style de rédaction

```
USER: Écris un post LinkedIn sur l'IA

ASSISTANT (exemple):
🚀 L'IA transforme le travail

3 tendances que j'observe en 2025 :

1️⃣ Automatisation intelligente
Les tâches répétitives disparaissent. Focus sur la créativité.

2️⃣ Collaboration humain-IA
L'IA comme co-pilote, pas comme remplaçant.

3️⃣ Éthique d'abord
Les entreprises qui réussissent mettent l'humain au centre.

💡 Et vous, comment utilisez-vous l'IA au quotidien ?

#IA #Innovation #FutureOfWork
```

Maintenant l'IA sait qu'elle doit utiliser :
- Emojis
- Titres courts
- Listes numérotées
- Question d'engagement
- Hashtags

#### Exemple 3 : Format de cours

```
USER: Explique-moi les boucles en JavaScript

ASSISTANT (exemple):
📚 LES BOUCLES JAVASCRIPT - NIVEAU DÉBUTANT

🎯 CONCEPT CLÉ:
Une boucle répète une action plusieurs fois.

💻 CODE SIMPLE:
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

🔍 EXPLICATION LIGNE PAR LIGNE:
• let i = 0 → On commence à 0
• i < 5 → On continue tant que i est inférieur à 5
• i++ → On augmente i de 1 à chaque tour

✅ QUAND L'UTILISER:
- Parcourir un tableau
- Répéter une action X fois
- Générer une liste

⚠️ PIÈGE COURANT:
Oublier d'incrémenter i → boucle infinie !

🎓 EXERCICE:
Crée une boucle qui affiche les nombres pairs de 0 à 10.
```

---

## Comment les combiner

### 🎨 Architecture complète

```
┌─────────────────────────────────────────────┐
│  SYSTEM PROMPT (Personnalité globale)       │
│  ↓ S'applique à tout                        │
│  "Tu es un expert en [domaine]..."          │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  USER PROMPT (Votre demande)                │
│  "Crée-moi [chose] avec [contraintes]..."   │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  ASSISTANT PROMPT (Format exemple)          │
│  "Réponse attendue : [exemple]..."          │
└─────────────────────────────────────────────┘
            ↓
        RÉPONSE IA
```

### 📋 Template complet

```markdown
SYSTEM:
Tu es [rôle précis] avec [expertise/expérience].
Tu [comportement 1], [comportement 2], [comportement 3].
Ton ton est [adjectif], [adjectif].
Format : [structure de réponse].

---

CONTEXT (optionnel):
[Informations de contexte pertinentes]

---

USER:
[Contexte de la demande]

OBJECTIF: [But précis]

DÉTAILS:
- [Point 1]
- [Point 2]
- [Point 3]

FORMAT ATTENDU:
- [Format 1]
- [Format 2]

CONTRAINTES:
- [Contrainte 1]
- [Contrainte 2]

---

ASSISTANT (exemple - optionnel):
[Exemple de réponse dans le format exact souhaité]
```

---

## Exemples concrets

### 🎯 Exemple 1 : Coach Fitness

```
SYSTEM:
Tu es un coach sportif certifié avec 10 ans d'expérience.
Tu crées des programmes d'entraînement personnalisés et réalistes.
Tu t'assures toujours de connaître le niveau et les objectifs avant de conseiller.
Ton ton est motivant mais réaliste.

---

USER:
Je veux perdre 10kg en 3 mois.
Je n'ai jamais fait de sport.
Je travaille 9h-18h en bureau.
J'ai 30 minutes le soir.

Crée-moi un programme de démarrage.

---

ASSISTANT (exemple):
🎯 PROGRAMME PERTE DE POIDS - DÉBUTANT

📋 SEMAINE 1-2 (Adaptation):
Lundi: 20min marche rapide
Mercredi: 15min exercices poids du corps
Vendredi: 20min marche rapide

📈 PROGRESSION:
Semaine 3-4: +5min par session
Semaine 5-8: Ajouter intensité

🍽️ NUTRITION (Essentiel):
- Déficit calorique: -500 kcal/jour
- Protéines: 1.6g/kg de poids
- Hydratation: 2L/jour

⚠️ IMPORTANT:
Perte saine = 0.5-1kg/semaine max
Objectif réaliste sur 3 mois = 6-12kg

✅ PROCHAIN RENDEZ-VOUS:
Dans 2 semaines pour ajuster le programme
```

### 🎯 Exemple 2 : Développeur Senior

```
SYSTEM:
Tu es un développeur senior React/TypeScript avec expertise en performance.
Tu fais des code reviews détaillées avec explications pédagogiques.
Tu proposes toujours 3 solutions: simple, intermédiaire, avancée.
Tu utilises les standards modernes (React 19, TypeScript 5.5).

---

USER:
J'ai un composant qui re-render trop souvent:

```tsx
function ProductList({ products }) {
  const [filter, setFilter] = useState('')

  const filtered = products.filter(p =>
    p.name.includes(filter)
  )

  return (
    <div>
      <input onChange={(e) => setFilter(e.target.value)} />
      {filtered.map(p => <Product key={p.id} data={p} />)}
    </div>
  )
}
```

Optimise ce code.

---

ASSISTANT (exemple):
🔍 ANALYSE DU CODE

❌ PROBLÈMES DÉTECTÉS:
1. Filter recalculé à chaque render (ligne 5)
2. Pas de debounce sur l'input
3. Product peut re-render inutilement

---

✅ SOLUTION 1 - SIMPLE (useMemo):
```tsx
const filtered = useMemo(
  () => products.filter(p => p.name.includes(filter)),
  [products, filter]
)
```
Impact: Évite recalculs inutiles

---

⚡ SOLUTION 2 - INTERMÉDIAIRE (+ debounce):
[code avec useDebounce]

Impact: -80% de re-renders

---

🚀 SOLUTION 3 - AVANCÉE (Virtual scrolling):
[code avec react-window]

Impact: Gère 10,000+ produits sans lag

---

📊 BENCHMARKS:
Simple: 100ms → 20ms
Intermédiaire: 100ms → 5ms
Avancée: 100ms → 2ms (+ 100k items OK)
```

### 🎯 Exemple 3 : Expert Marketing

```
SYSTEM:
Tu es un stratège marketing digital avec 15 ans d'expérience.
Tu crées des stratégies actionnables avec ROI mesurable.
Tu adaptes toujours au budget (petit/moyen/grand).
Format: Stratégie → Tactiques → KPIs → Budget.

---

USER:
Startup SaaS B2B (outil de gestion de projet).
Budget marketing: 5000€/mois.
Objectif: 100 leads qualifiés/mois.
Cible: CTOs et Product Managers.

Crée une stratégie d'acquisition.

---

ASSISTANT (exemple):
🎯 STRATÉGIE ACQUISITION B2B - BUDGET 5K€

📊 OBJECTIF:
100 leads qualifiés/mois → 25 leads/semaine
Budget/lead: 50€ max

---

🚀 PILIER 1: CONTENU SEO (Budget: 2000€, 60 leads)

TACTIQUES:
• 8 articles/mois sur problèmes PM/CTO
• Guest posts sur Dev.to, Medium
• Études de cas clients

KPIs:
- 10,000 visites organiques/mois
- Taux conversion: 0.6%

ROI: 33€/lead

---

💰 PILIER 2: LINKEDIN ADS (Budget: 2000€, 30 leads)

TACTIQUES:
• Campagne Lead Gen Forms
• Ciblage: CTO, Product Manager, France
• A/B test 3 créatives/semaine

KPIs:
- CTR: 2%+
- CPL: 65€ max

ROI: 67€/lead

---

🎓 PILIER 3: COMMUNITY (Budget: 1000€, 10 leads)

TACTIQUES:
• Webinaires bi-mensuels
• Slack/Discord de PMs
• Partenariats avec influenceurs tech

KPIs:
- 200 participants/webinar
- Taux conversion: 5%

ROI: 100€/lead

---

📈 TIMELINE:
Mois 1: Setup + Quick wins (20 leads)
Mois 2-3: Scaling (60-80 leads)
Mois 4+: 100+ leads/mois

⚠️ RISQUES:
- Saturation LinkedIn → Diversifier sur Twitter
- Budget serré → Focus SEO (long terme)
```

---

## 🎓 Résumé - Aide-mémoire

| Élément | Quoi | Quand | Exemple |
|---------|------|-------|---------|
| **SYSTEM** | Qui est l'IA | Toujours | "Tu es un expert en X avec Y années..." |
| **USER** | Ce que vous voulez | Toujours | "Crée-moi Z avec contraintes A, B, C" |
| **ASSISTANT** | Format souhaité | Si format complexe | `{"result": "exemple"}` |

### ✅ Checklist avant d'envoyer

**System Prompt:**
- [ ] Rôle clairement défini ?
- [ ] Ton/style précisé ?
- [ ] Contraintes listées ?
- [ ] Format de réponse défini ?

**User Prompt:**
- [ ] Contexte donné ?
- [ ] Objectif clair ?
- [ ] Détails suffisants ?
- [ ] Contraintes mentionnées ?
- [ ] Format attendu précisé ?

**Assistant Prompt (si nécessaire):**
- [ ] Exemple concret fourni ?
- [ ] Format exact montré ?
- [ ] Style démontré ?

---

## 🚀 Pro Tips

1. **Commencez simple** : System + User suffisent dans 80% des cas
2. **Itérez** : Ajoutez Assistant si le format n'est pas bon
3. **Testez** : Essayez le prompt 3 fois, ajustez
4. **Documentez** : Gardez vos meilleurs prompts
5. **Partagez** : Les bons prompts s'améliorent en communauté

---

**Créé pour Prompt Party** - Le réseau social des prompts IA
