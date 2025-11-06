# 🎨 UX/UI Team - Prompt Academy Rebranding

**Date**: November 6, 2025
**Project**: Prompt Academy Visual Identity
**Status**: 🟢 Ready to Start

---

## 👋 Bienvenue !

Ce document est votre point d'entrée pour le projet de rebranding **Prompt Academy**. Vous trouverez ici tous les liens, ressources et contexte nécessaires pour commencer.

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Documents de Brief](#documents-de-brief)
3. [Ressources & Assets](#ressources--assets)
4. [Timeline & Deadlines](#timeline--deadlines)
5. [Process de Travail](#process-de-travail)
6. [Contacts](#contacts)

---

## 🎯 Vue d'ensemble

### Contexte du Projet

**Prompt Academy** (anciennement "Prompt Party") est une plateforme éducative pour apprendre le prompt engineering avec l'IA. Nous pivotant d'un réseau social vers une **académie premium** focalisée sur l'éducation.

### Objectifs du Rebranding

1. **Nouvelle identité visuelle** : Logo + couleurs + guidelines
2. **Homepage redesign** : Première impression premium
3. **Assets complets** : Tout ce qu'il faut pour lancer
4. **Design system** : Pour la cohérence future

### Transformation Visuelle

**Avant** (Prompt Party):
- Palette: Violet/Fuchsia/Rose
- Tone: Fun, social, party vibes
- Focus: Réseau social pour prompts

**Après** (Prompt Academy):
- Palette: **Indigo/Violet/Cyan**
- Tone: **Éducatif, premium, professionnel**
- Focus: **Académie d'apprentissage IA**

---

## 📚 Documents de Brief

### 1. Design System
📁 **Fichier**: `docs/DESIGN_SYSTEM.md`

**Contenu**:
- ✅ Palette de couleurs complète (Indigo/Violet/Cyan)
- ✅ Typography scale (Inter font)
- ✅ Spacing & Layout (8px grid)
- ✅ Components guidelines
- ✅ Dark mode strategy
- ✅ Accessibility standards

**À lire en premier** - C'est votre bible design !

### 2. Brief Logo
📁 **Fichier**: `docs/DESIGN_BRIEF_LOGO.md`

**Scope**:
- Logo complet (icon + wordmark)
- Favicon & app icons
- Toutes les variations (light/dark/mono)
- OG images pour social sharing

**Deadline**: 1 semaine
**Concept**: Graduation cap 🎓 + Book ouvert

### 3. Brief Homepage
📁 **Fichier**: `docs/DESIGN_MOCKUP_HOMEPAGE.md`

**Scope**:
- Redesign complet homepage
- Nouvelle palette de couleurs
- Illustrations custom
- Micro-interactions & animations

**Deadline**: 2 semaines
**URL**: `/` (page d'accueil)

---

## 🎨 Ressources & Assets

### Design System - Couleurs

**Palette Primaire**:
```
Indigo 500:  #6366F1  (HSL: 238 80% 58%)
Violet 500:  #8B5CF6  (HSL: 271 81% 56%)
Cyan 400:    #22D3EE  (HSL: 198 93% 60%)
```

**Usage**:
- **Indigo** : Primaire (CTAs, links, headers)
- **Violet** : Secondaire (badges, highlights)
- **Cyan** : Accent (notifications, success states)

### Typography

**Font**: Inter (Google Fonts)
- Headers: 700 (Bold)
- Body: 400 (Regular)
- UI: 600 (Semi-bold)

**Scale**: 12px → 48px (voir DESIGN_SYSTEM.md)

### Current Implementation

**Tech Stack**:
- Next.js 15 (React 19)
- Tailwind CSS
- Shadcn UI components

**Fichiers importants**:
- `src/styles/globals.css` - CSS variables, utility classes
- `tailwind.config.ts` - Tailwind configuration
- `src/app/page.tsx` - Homepage actuelle

### Où Sont les Assets Actuels ?

```
/public/
  /images/          - Images générales
  /icons/           - Icons actuels (à remplacer)
  /branding/        - 📁 NOUVEAU : Vos assets iront ici
```

---

## 📅 Timeline & Deadlines

### Phase 1: Logo & Branding (Semaine 1)

**Jours 1-2** : Exploration
- [ ] 3-5 concepts différents
- [ ] Variations de couleurs

**Jours 3-4** : Refinement
- [ ] 2 directions finales
- [ ] Mockups en contexte

**Jour 5** : Finalisation
- [ ] 1 logo final
- [ ] Tous les exports
- [ ] Guide d'utilisation

### Phase 2: Homepage Design (Semaines 2-3)

**Semaine 2, Jours 1-2** : Wireframes
- [ ] Mobile, Tablet, Desktop
- [ ] User flows

**Semaine 2, Jours 3-5** : Mockups
- [ ] High-fidelity light mode
- [ ] High-fidelity dark mode

**Semaine 3, Jours 1-3** : Prototype
- [ ] Figma prototype interactif
- [ ] Animations mockées

**Semaine 3, Jours 4-5** : Assets
- [ ] Illustrations exportées
- [ ] Icons custom
- [ ] Specs pour dev

### Phase 3: Handoff & QA (Semaine 4)

**Semaine 4** : Dev Implementation
- Design team en support
- QA continu
- Ajustements si nécessaire

---

## 🔄 Process de Travail

### 1. Kickoff (30 min)

**Agenda**:
- Review des briefs
- Q&A
- Setup Figma workspace
- Assign tasks

**Participants**:
- Product Owner
- Design Lead
- Dev Lead (optional)

### 2. Design Sprints

**Daily standups** (15 min) :
- Hier : ce qui a été fait
- Aujourd'hui : ce qui sera fait
- Blockers : obstacles éventuels

**Weekly reviews** (vendredi) :
- Démo du travail de la semaine
- Feedback collectif
- Ajustements pour semaine suivante

### 3. Design Reviews

**Mid-week checkpoint** (mercredi) :
- Review work-in-progress
- Early feedback
- Course correction si nécessaire

**End-of-week presentation** (vendredi) :
- Présentation formelle
- Stakeholders feedback
- Go/No-go pour phase suivante

### 4. Handoff à Dev

**Livrables** :
- Figma file avec Dev Mode activé
- Tous les assets exportés et organisés
- Specs document (spacing, colors, typography)
- Prototype interactif pour référence

**Format** :
```
/design-handoff/
  /figma/
    - link-to-figma.txt
  /assets/
    /logo/
    /illustrations/
    /icons/
  /specs/
    - homepage-specs.pdf
    - component-specs.pdf
  /prototype/
    - link-to-prototype.txt
```

---

## 🛠️ Outils Recommandés

### Design

**Figma** (Fortement recommandé) :
- Collaboration en temps réel
- Dev Mode pour handoff facile
- Plugins : Stark (accessibility), SVGO (optimize SVG)

**Alternatives** :
- Adobe XD
- Sketch (macOS only)
- Penpot (open-source)

### Assets

**Illustrations** :
- Undraw.co (customizable)
- Humaaans (characters)
- Blush Design (mix & match)

**Icons** :
- Lucide Icons (déjà utilisé dans l'app)
- Heroicons
- Feather Icons

**Colors** :
- Coolors.co (palette exploration)
- Contrast Checker (accessibility)

### Export & Optimization

**SVG** :
- SVGO (optimization)
- SVGOMG (web interface)

**PNG** :
- TinyPNG (compression)
- ImageOptim (macOS)

---

## ✅ Deliverables Checklist

### Logo & Branding

- [ ] **Logo Files**
  - [ ] SVG: Full, Icon, Wordmark (light, dark, mono)
  - [ ] PNG: All sizes (512, 256, 128, 64, 32, 16)
  - [ ] ICO: Favicon (32x32, 16x16)

- [ ] **App Icons**
  - [ ] Apple Touch Icon (180x180)
  - [ ] Android Chrome (192x192, 512x512)

- [ ] **Social**
  - [ ] OG Image (1200x630)
  - [ ] Twitter Card (1200x600)

- [ ] **Documentation**
  - [ ] Logo usage guidelines
  - [ ] Do's and Don'ts
  - [ ] Spacing & sizing rules

### Homepage Design

- [ ] **Wireframes**
  - [ ] Mobile (375px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1440px)

- [ ] **High-Fidelity Mockups**
  - [ ] Light mode (desktop)
  - [ ] Dark mode (desktop)
  - [ ] Mobile version
  - [ ] Hover/Active states

- [ ] **Prototype**
  - [ ] Figma interactive prototype
  - [ ] Animations documented
  - [ ] User flows mapped

- [ ] **Assets**
  - [ ] Hero illustration SVG
  - [ ] Key concepts icons (3x)
  - [ ] Graduation cap icon custom
  - [ ] Background patterns

- [ ] **Specs**
  - [ ] Component breakdown
  - [ ] Spacing & layout
  - [ ] Typography specs
  - [ ] Color usage

---

## 🎯 Success Criteria

### Qualitative

**Logo** :
- [ ] Communique "éducation" clairement
- [ ] Moderne et premium
- [ ] Unique et mémorable
- [ ] Fonctionne à toutes tailles

**Homepage** :
- [ ] Visuellement cohérent avec nouveau branding
- [ ] Message clair : "Apprendre le prompt engineering"
- [ ] Encourage l'action (CTAs évidents)
- [ ] Professional et digne de confiance

### Quantitative

**Performance** :
- [ ] Lighthouse score ≥ 90
- [ ] First Contentful Paint < 1.5s
- [ ] Assets totaux < 1MB

**Conversion** :
- [ ] Hero CTA click rate +20%
- [ ] Scroll depth to Learning Paths +15%
- [ ] Mobile bounce rate -10%

**Accessibility** :
- [ ] WCAG AA compliant (contraste 4.5:1)
- [ ] Keyboard navigation 100%
- [ ] Screen reader friendly

---

## 📞 Contacts

### Product Team

**Product Owner** : [Nom]
- Email: [email]
- Slack: @[handle]
- Rôle: Vision produit, validation finale

**Design Lead** : [À assigner]
- Rôle: Direction artistique, quality control

**Dev Lead** : [Nom]
- Email: [email]
- Rôle: Faisabilité technique, handoff

### Communication

**Channels** :
- 💬 Slack : `#design-prompt-academy`
- 📧 Email : design@promptacademy.com
- 🎥 Meetings : Google Meet / Zoom

**Response Time** :
- Urgent : 2h
- Normal : 24h
- Feedback : 48h

---

## 📖 Learning Resources

### UX/UI Best Practices

**Articles** :
- [Laws of UX](https://lawsofux.com/)
- [Material Design](https://material.io/design)
- [Inclusive Design](https://www.microsoft.com/design/inclusive/)

**Books** :
- "Don't Make Me Think" - Steve Krug
- "The Design of Everyday Things" - Don Norman
- "Refactoring UI" - Adam Wathan & Steve Schoger

### Tailwind CSS

**Docs** :
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Headless UI](https://headlessui.com/)
- [Shadcn UI](https://ui.shadcn.com/)

**Our Config** :
- `tailwind.config.ts` - Notre configuration custom
- `globals.css` - Nos utility classes custom

### Figma Mastery

**Courses** :
- Figma official tutorials
- Auto Layout best practices
- Component architecture

---

## 🚀 Getting Started

### Pour Commencer Aujourd'hui

1. **✅ Lire ce document** - Vous y êtes !

2. **📖 Lire DESIGN_SYSTEM.md**
   - Comprendre la palette
   - Noter les guidelines
   - Bookmark pour référence

3. **📝 Lire DESIGN_BRIEF_LOGO.md**
   - Votre premier deliverable
   - Concepts à explorer
   - Formats requis

4. **🖥️ Setup Figma**
   - Créer workspace "Prompt Academy"
   - Importer couleurs du design system
   - Créer artboards de base

5. **💬 Join Slack**
   - Channel `#design-prompt-academy`
   - Se présenter à l'équipe
   - Poser vos premières questions

6. **📅 Schedule Kickoff**
   - Meeting avec Product Owner
   - Clarifier questions
   - Aligner sur timeline

### Première Semaine - Focus Logo

Votre objectif semaine 1 : **Livrer le logo Prompt Academy complet**

**Jour 1** :
- Mood board & inspiration
- 3 directions de concept (sketches)

**Jour 2** :
- Refinement de 3 concepts
- Présentation mid-week

**Jour 3** :
- Feedback intégré
- 2 directions finales en HD

**Jour 4** :
- Mockups en contexte
- Variations (light/dark)

**Jour 5** :
- Finalisation choix
- Exports tous formats
- Documentation usage

---

## ❓ FAQ

**Q: Puis-je m'écarter des concepts suggérés (cap + book) ?**
A: Oui ! Les briefs sont des guides, pas des contraintes. Si vous avez une meilleure idée qui communique l'éducation IA, allez-y !

**Q: Quel niveau de détail pour les mockups ?**
A: Pixel-perfect. Spacing exact, couleurs exactes, typography précise. Les devs vont implémenter directement depuis vos designs.

**Q: Dark mode est obligatoire ?**
A: Oui, absolument. L'app supporte déjà le dark mode, vos designs doivent inclure les deux versions.

**Q: Puis-je utiliser des assets/illustrations externes ?**
A: Oui pour inspiration et placeholder, mais les assets finaux doivent être custom ou open-source (avec attribution).

**Q: Comment gérer les feedbacks contradictoires ?**
A: Product Owner a le dernier mot. Documentez les décisions et rationales.

**Q: Timeline trop serré ?**
A: Communiquez immédiatement. On préfère ajuster le scope que la qualité.

**Q: Besoin d'accès au code actuel ?**
A: Oui ! Demandez accès au repo GitHub pour voir l'implémentation actuelle.

---

## 🎉 Let's Build Something Amazing!

Vous avez tout ce qu'il faut pour réussir ce projet. L'équipe est là pour vous supporter.

**Remember** :
- 🎨 Créativité avant tout
- 💬 Communication constante
- ✨ Qualité > Quantité
- 🚀 User experience first

**Questions ?** → Slack `#design-prompt-academy`

**Prêt ?** → Lisez les briefs et lancez-vous ! 💪

---

**Last Updated**: November 6, 2025
**Version**: 1.0
**Next Review**: Après Phase 1 (logo)
