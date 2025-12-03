# 🏠 Brief Design - Homepage Redesign

**Date**: November 6, 2025
**Version**: 1.0
**Pour**: Équipe UX/UI
**Deadline**: 2 semaines

---

## 🎯 Contexte & Objectifs

### Mission
Redesigner la homepage de **Prompt Academy** pour :
1. Refléter la nouvelle identité visuelle (Indigo/Violet/Cyan)
2. Améliorer la conversion vers les parcours d'apprentissage
3. Clarifier la proposition de valeur éducative
4. Créer une expérience premium et moderne

### Page Actuelle
URL: `/` (src/app/page.tsx)
**Problèmes identifiés**:
- ⚠️ Utilise ancienne palette (violet-fuchsia aux lignes 130, 161, 167, 173)
- ⚠️ Hero section manque d'impact visuel
- ⚠️ Stats section trop basique
- ⚠️ Pas de hero illustration
- ✅ Structure globale est bonne (à conserver)

---

## 📐 Structure Actuelle (à maintenir)

La structure fonctionne bien, on garde l'ossature :

1. **Hero Section** - Badge + Titre + Subtitle + 2 CTAs + Stats
2. **3 Cartes Principales** - Learn, Experiment, Community
3. **Learning Paths** - 3 parcours (Beginner, Intermediate, Advanced)
4. **Key Concepts** - 3 concepts clés
5. **Community Prompts** - Feed de prompts récents
6. **CTA Final** - Call to action de fin

**À améliorer**: Visuels, couleurs, micro-interactions, animations

---

## 🎨 Section par Section - Redesign

### 1. Hero Section 🚀

**Actuel**:
```tsx
- Badge "✨ Free & Open Source"
- Titre: "Master AI Prompting" (gradient violet-fuchsia)
- Subtitle: 2 lignes de texte
- 2 CTAs: "Start Learning" + "Explore Tutorials"
- Stats: 3 colonnes (users, prompts, "100% Free")
```

**Nouveau Design**:

**Background**:
- Base: Subtle gradient Indigo → Violet (vertical, très subtil)
- Layer: Mesh gradient avec 4 radial gradients aux coins (comme dans globals.css `.bg-mesh`)
- Pattern: Dot pattern très subtil (opacity 5%)
- Animation: Gentle floating particles (Cyan accent, très subtil)

**Badge**:
- Actuel: Soft variant avec SparklesIcon
- Nouveau: `bg-indigo-100 dark:bg-indigo-900/30` avec border `border-indigo-200`
- Icon: Garde SparklesIcon en Cyan accent

**Titre**:
- Texte gradient: Remplacer `from-violet-600 via-fuchsia-600 to-violet-600`
- Par: `from-indigo-600 via-violet-600 to-cyan-500`
- Animation: Subtle gradient shift (keyframe `gradient-shift`)

**Stats** (3 colonnes):
- Gradient actuel: `from-violet-600 to-fuchsia-600`
- Nouveau: `from-indigo-600 via-violet-600 to-cyan-500`
- Amélioration: Ajouter number counter animation (count-up effect)
- Icons: Ajouter small icons avant chaque stat (Users icon, Zap icon, Heart icon)

**Hero Illustration** (NOUVEAU):
- Position: À droite du hero text (desktop) ou en dessous (mobile)
- Style: Isometric illustration
- Concept: Student avec laptop + floating prompt cards autour
- Couleurs: Indigo, Violet, Cyan uniquement
- Format: SVG optimisé, lazy load

**CTAs**:
- Primary: `bg-gradient-to-r from-indigo-600 to-violet-600` (déjà dans globals.css `.btn-primary`)
- Secondary: `border-gray-300 hover:border-indigo-500`
- Animation: Hover scale(1.05) + shadow glow

---

### 2. 3 Cartes Principales 📚

**Structure actuelle**: Parfaite, on garde
**Changements de couleur**:

**Card 1: Learn** (Green)
- Actuel: `from-green-500 to-emerald-600` ✅ OK (déjà aligné)
- Icon background: Garde
- Hover overlay: `from-green-500/5 to-emerald-500/5` ✅ OK

**Card 2: Experiment** (Violet → Indigo-Violet)
- Actuel: `from-violet-500 to-purple-600`
- Nouveau: `from-indigo-500 to-violet-600`
- Icon background: Même gradient
- Hover overlay: `from-indigo-500/5 to-violet-500/5`

**Card 3: Community** (Orange-Red → Cyan-Blue)
- Actuel: `from-orange-500 to-red-600`
- Nouveau: `from-cyan-500 to-blue-600`
- Icon: Garde UsersIcon
- Icon background: `from-cyan-500 to-blue-600`
- Hover overlay: `from-cyan-500/5 to-blue-500/5`

**Améliorations**:
- Ajouter subtle border glow au hover (`.bento-card` style)
- Smooth transition 300ms sur toutes propriétés
- CTA button avec arrow animation au hover

---

### 3. Learning Paths Section 🎓

**Actuel**: Structure excellente
**Améliorations visuelles**:

**Background**:
- Actuel: `bg-muted/30`
- Nouveau: `bg-muted/30` + subtle dot pattern
- Pattern: `.bg-dots` class (déjà définie dans globals.css)

**Cards**:
- Gradients actuels: OK (green, violet, orange)
- Amélioration: Ajouter glassmorphism au hover
  - `backdrop-blur-sm`
  - `bg-white/80 dark:bg-gray-900/80`
  - Border glow effect

**Progress Indicator** (NOUVEAU):
- Ajouter circular progress ring sur chaque card
- Couleur: Même gradient que l'icon
- Valeur: Nombre de leçons complétées / total
- Position: Top-right corner de la card

**Icons**:
- Actuel: BookOpenIcon, BrainIcon, RocketIcon ✅ OK
- Animation: Rotate subtle au hover (5deg)

---

### 4. Key Concepts Cards 💡

**Actuel**: 3 cards avec emoji icons
**Améliorations**:

**Card Design**:
- Remplacer emojis par illustrations custom SVG
  - MCP vs RAG: Network diagram avec nodes
  - Prompt Wizard: Magic wand avec sparkles
  - Playground: Terminal window avec code

**Hover Effect**:
- Card lift: `translateY(-4px)`
- Shadow: `hover:shadow-2xl hover:shadow-indigo-500/10`
- Title color: `group-hover:text-indigo-600`

**Background Pattern**:
- Chaque card: Unique subtle pattern
  - Card 1: Dots
  - Card 2: Grid
  - Card 3: Diagonal lines

---

### 5. Community Prompts Section 👥

**Actuel**: Feed component (bon)
**Améliorations**:

**Section Background**:
- Même style que Learning Paths
- `bg-muted/30` + pattern

**Header**:
- Titre avec gradient: `text-gradient-primary` class
- "View All" button: Subtle animation au hover

**Feed Cards** (dans FeedContent component):
- Garder design actuel si bon
- Améliorer hover states avec nouvelle palette
- Likes/comments icons en Cyan accent

---

### 6. CTA Final 🎯

**Actuel**: Card avec AwardIcon
**Redesign Complet**:

**Background Section**:
- `variant="gradient"` (garde)
- Améliorer avec mesh gradient + animation

**Card**:
- Actuel: `border-2 border-primary/20 bg-background/95 backdrop-blur`
- Nouveau: Glassmorphism premium
  - `bg-white/70 dark:bg-gray-900/70`
  - `backdrop-blur-xl`
  - Border glow: Indigo gradient animé
  - Shadow: Large shadow avec Indigo tint

**Icon**:
- Actuel: AwardIcon (badge trophy)
- Nouveau: Graduation cap custom icon (même que logo)
- Couleur: Gradient Indigo → Violet
- Animation: Gentle float (translateY)

**CTA Buttons**:
- Primary: Large size, gradient Indigo-Violet
- Secondary: Ghost style avec hover Indigo

**Background Effects**:
- Floating particles (Cyan accents)
- Animated grid background (very subtle)

---

## 🎨 Palette de Couleurs - Référence Rapide

**Remplacements à faire**:

| Ancien | Nouveau | Usage |
|--------|---------|-------|
| `violet-600` | `indigo-600` | Primary buttons, titles |
| `fuchsia-600` | `violet-600` | Gradients mid-point |
| `pink-500` | `cyan-500` | Accents, highlights |
| `from-violet-600 via-fuchsia-600 to-violet-600` | `from-indigo-600 via-violet-600 to-cyan-500` | Hero title gradient |
| `from-violet-500 to-purple-600` | `from-indigo-500 to-violet-600` | Experiment card |
| `from-orange-500 to-red-600` | `from-cyan-500 to-blue-600` | Community card |

**Nouveaux gradients**:
```css
/* Hero background */
bg-gradient-to-b from-indigo-50 via-violet-50 to-cyan-50
dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900

/* Stats numbers */
bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500

/* CTA section */
bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-cyan-500/20
```

---

## ✨ Micro-interactions & Animations

### À Ajouter

**Hero Section**:
- [ ] Title gradient shifts subtly (8s loop)
- [ ] Stats count-up animation on viewport enter
- [ ] Floating particles background (Cyan, subtle)
- [ ] CTA buttons scale on hover

**Cards**:
- [ ] Hover lift with shadow (300ms ease-out)
- [ ] Icon scale on card hover (1.1x)
- [ ] Border glow fade in (200ms)
- [ ] Arrow icon slide on button hover

**Learning Paths**:
- [ ] Progress rings animate on scroll into view
- [ ] Cards stagger in (100ms delay each)

**CTA Final**:
- [ ] Graduation cap icon gentle float (2s loop)
- [ ] Background particles drift
- [ ] Border glow pulse (3s loop)

### Performance
- Tous les animations: `will-change: transform` uniquement au hover
- GPU acceleration: `transform: translateZ(0)` sur animated elements
- Reduce motion: Respecter `prefers-reduced-motion` (déjà dans globals.css)

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
```
sm:  640px  - Mobile large
md:  768px  - Tablet
lg:  1024px - Desktop small
xl:  1280px - Desktop
2xl: 1400px - Desktop large
```

### Mobile-First Adaptations

**Hero Section**:
- Stack titre + illustration verticalement (mobile)
- Stats: Grid 1 column (mobile), 3 columns (md+)
- CTAs: Full width (mobile), auto width (sm+)

**3 Cartes**:
- Grid 1 column (mobile)
- Grid 2 columns (md)
- Grid 3 columns (lg+)

**Learning Paths**:
- Même structure que cartes principales

**Illustration**:
- Hide sur mobile si performance issue
- Show simplified version sur tablet
- Full detail sur desktop

---

## 📦 Assets à Créer

### Illustrations

**Hero Illustration**:
- **File**: `hero-student-learning.svg`
- **Size**: 600x500px viewport
- **Style**: Isometric, flat colors (Indigo/Violet/Cyan)
- **Elements**:
  - Student avec laptop
  - 3-4 floating prompt cards
  - Subtle glow effects
- **Format**: SVG optimized (<50KB)

**Key Concepts Icons**:
- **File**: `icon-mcp-rag.svg`, `icon-wizard.svg`, `icon-playground.svg`
- **Size**: 120x120px
- **Style**: Line art avec accent colors
- **Format**: SVG

**Background Patterns**:
- **Dots**: Déjà dans globals.css (`.bg-dots`)
- **Grid**: Déjà dans globals.css (`.bg-grid`)
- **Mesh**: Déjà dans globals.css (`.bg-mesh`)

### Icons Custom

**Graduation Cap Icon** (pour CTA final):
- **Size**: 64x64px
- **Style**: Outlined, 2px stroke
- **Colors**: Gradient Indigo → Violet
- **Format**: SVG, exportable en React component

---

## 🎯 Wireframes & Mockups

### Livrables Attendus

**Phase 1: Wireframes** (Jours 1-2)
- [ ] Homepage wireframe mobile
- [ ] Homepage wireframe tablet
- [ ] Homepage wireframe desktop
- [ ] Annotations des interactions

**Phase 2: High-Fidelity** (Jours 3-5)
- [ ] Mockup homepage light mode (desktop)
- [ ] Mockup homepage dark mode (desktop)
- [ ] Mockup homepage mobile
- [ ] States: Default, Hover, Active pour les cards

**Phase 3: Prototype** (Jours 6-7)
- [ ] Figma prototype interactif
- [ ] Animations mockées
- [ ] User flow hero → learning path
- [ ] Responsive behavior démo

**Phase 4: Assets** (Jours 8-10)
- [ ] Toutes les illustrations exportées
- [ ] Icons custom en SVG
- [ ] Specs détaillées pour dev (Figma Dev Mode ou Zeplin)

---

## ✅ Checklist de Validation

### Design Quality

**Visuel**:
- [ ] Utilise uniquement nouvelle palette (Indigo/Violet/Cyan)
- [ ] Aucun rose/fuchsia/magenta
- [ ] Contraste texte ≥ 4.5:1 (WCAG AA)
- [ ] Cohérent avec design system (docs/DESIGN_SYSTEM.md)

**UX**:
- [ ] Hierarchy claire (titre → CTA → features)
- [ ] CTA principal évident ("Start Learning")
- [ ] Mobile-friendly (touch targets ≥ 44px)
- [ ] Chargement progressif (hero d'abord)

**Performance**:
- [ ] Images < 200KB chacune
- [ ] SVGs optimisés (SVGO)
- [ ] Animations 60fps
- [ ] Lazy load pour below-fold content

**Accessibilité**:
- [ ] Focus states visibles
- [ ] Alt text pour illustrations
- [ ] Headings sémantiques (h1, h2, h3)
- [ ] Réduit animations si `prefers-reduced-motion`

---

## 🔧 Specs Techniques pour Dev

### CSS Classes Disponibles

**Gradients**:
- `.text-gradient-primary` - Indigo → Cyan → Violet
- `.text-gradient-vibrant` - Indigo → Violet → Cyan
- `.btn-primary` - Button gradient Indigo → Violet

**Cards**:
- `.bento-card` - Card avec border glow au hover
- `.card-interactive` - Card hover avec lift
- `.glass` - Glassmorphism effect

**Animations**:
- `.animate-fade-in-up` - Fade + slide up
- `.animate-scale-in` - Scale from 0.95
- `.hover-lift` - Translate Y -4px au hover

**Patterns**:
- `.bg-mesh` - Mesh gradient background
- `.bg-dots` - Dot pattern background
- `.bg-grid` - Grid pattern background

### Component Props Suggérés

```tsx
// Hero Section
<Hero
  badge="Free & Open Source"
  title="Master AI Prompting"
  subtitle="Learn prompt engineering..."
  primaryCta={{ text: "Start Learning", href: "/tutorials/paths/beginner" }}
  secondaryCta={{ text: "Explore Tutorials", href: "/tutorials" }}
  stats={[
    { value: totalUsers, label: "Learners" },
    { value: totalPrompts, label: "Prompts" },
    { value: "100%", label: "Free" }
  ]}
  illustration="/images/hero-student.svg"
/>

// Feature Card
<FeatureCard
  icon={BookOpenIcon}
  iconGradient="from-green-500 to-emerald-600"
  title="Learn"
  description="..."
  features={["12 interactive tutorials", "3 learning paths", ...]}
  cta={{ text: "Start Learning", href: "/tutorials" }}
/>
```

---

## 📚 Références & Inspiration

### Competitors (à surpasser)

**FlowGPT**:
- ❌ UI datée, pas moderne
- ✅ Bonne structure de features
- 🎯 Notre avantage: Design premium

**Duolingo**:
- ✅ Gamification excellente
- ✅ Learning paths clairs
- ✅ Friendly, accessible
- 🎯 S'inspirer: Progress indicators, achievements

**Linear**:
- ✅ Animations smooth et performantes
- ✅ Dark mode parfait
- ✅ Typography impeccable
- 🎯 S'inspirer: Micro-interactions, glass effects

### Best Practices SaaS

**Vercel.com**:
- Hero avec gradient backgrounds
- Subtle animations
- Premium feel

**Stripe.com**:
- Clarity dans les features
- Great illustrations
- Mobile-first

**Cal.com**:
- Open-source aesthetic
- Modern, clean
- Developer-friendly

---

## 📞 Collaboration Dev

### Handoff Process

1. **Figma File Partagé**
   - Permissions: Edit pour l'équipe design, View pour dev
   - Organization: Pages par breakpoint (Mobile, Tablet, Desktop)
   - Components: Tous les éléments réutilisables

2. **Specs Export**
   - Figma Dev Mode activé (spacing, colors auto-extracted)
   - OU: Zeplin pour specs détaillées
   - CSS snippets pour gradients custom

3. **Assets Export**
   - SVGs: Optimisés avec SVGO
   - PNGs: @1x, @2x, @3x pour Retina
   - Naming: `hero-illustration-student.svg`, `icon-graduation-cap.svg`

4. **Review Cycles**
   - Semaine 1: Wireframes review
   - Semaine 2: Mockups review (mi-parcours + final)
   - Semaine 3: Dev implementation
   - Semaine 4: Design QA + polish

---

## 🎯 Success Metrics

### KPIs Design

**Conversion**:
- [ ] Hero CTA click rate +20% vs. actuel
- [ ] Scroll depth to Learning Paths +15%
- [ ] Mobile bounce rate -10%

**Engagement**:
- [ ] Time on page +30s average
- [ ] CTA final conversion +25%
- [ ] Return visitors +15%

**Performance**:
- [ ] Lighthouse Performance score ≥ 90
- [ ] First Contentful Paint < 1.5s
- [ ] Cumulative Layout Shift < 0.1

**Qualitative**:
- [ ] User feedback: "Modern", "Professional", "Clear"
- [ ] Team satisfaction: Design ≥ 4/5
- [ ] Brand consistency: Aligned avec Prompt Academy identity

---

## 🚀 Next Steps

1. **Kickoff Meeting** (30 min)
   - Review ce brief
   - Q&A
   - Assign responsabilités

2. **Design Sprint** (2 semaines)
   - Wireframes → Mockups → Prototype → Assets

3. **Dev Handoff** (1 jour)
   - Transfer Figma + Assets
   - Walkthrough des specs

4. **Implementation** (1 semaine)
   - Dev builds
   - Design QA ongoing

5. **Launch** 🎉
   - Deploy to production
   - Monitor metrics
   - Iterate based on data

---

**Let's create an amazing homepage! 🎨✨**

Questions ? Contactez l'équipe product.
