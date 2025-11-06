# 📁 Documentation Design - Guide Rapide

Tous les documents pour l'équipe UX/UI sont dans ce dossier `/docs/`.

---

## 🚀 Pour Commencer - Ordre de Lecture

1. **📖 UX_UI_TEAM_OVERVIEW.md** ⭐
   - **Start here!** Vue d'ensemble complète du projet
   - Timeline, process, contacts, FAQ
   - Checklist de tous les livrables

2. **🎨 DESIGN_SYSTEM.md**
   - Palette de couleurs Indigo/Violet/Cyan
   - Typography, spacing, components
   - Guidelines d'accessibilité et dark mode

3. **🎓 DESIGN_BRIEF_LOGO.md**
   - Brief complet pour création du logo
   - Concept: Graduation cap + Book
   - Tous les formats requis (SVG, PNG, ICO, OG images)

4. **🏠 DESIGN_MOCKUP_HOMEPAGE.md**
   - Brief redesign de la homepage
   - Section par section avec specs détaillées
   - Assets à créer (illustrations, icons)

---

## 📂 Structure des Fichiers

```
/docs/
  ├── README_DESIGN.md              ← Vous êtes ici
  ├── UX_UI_TEAM_OVERVIEW.md        ← START HERE
  ├── DESIGN_SYSTEM.md              ← Palette & Guidelines
  ├── DESIGN_BRIEF_LOGO.md          ← Logo Brief
  ├── DESIGN_MOCKUP_HOMEPAGE.md     ← Homepage Brief
  └── BUSINESS_PLAN.md              ← Contexte business (optionnel)

/src/styles/
  └── globals.css                    ← CSS avec nouvelle palette

/tailwind.config.ts                  ← Configuration Tailwind

/src/app/page.tsx                    ← Homepage actuelle à redesigner
```

---

## 🎯 Livrables Principaux

### Semaine 1: Logo
- Logo complet (icon + wordmark)
- Favicon & app icons
- Versions light/dark/mono
- OG images social

### Semaines 2-3: Homepage
- Wireframes (mobile/tablet/desktop)
- Mockups haute-fidélité (light & dark)
- Prototype Figma interactif
- Illustrations & icons custom

---

## 📋 Quick Links

**Design System**:
- Palette: Indigo #6366F1, Violet #8B5CF6, Cyan #22D3EE
- Font: Inter (Google Fonts)
- Grid: 8px spacing system

**Current Code**:
- Homepage: `src/app/page.tsx`
- Styles: `src/styles/globals.css`
- Config: `tailwind.config.ts`

**Assets Delivery**:
- Export vers: `/public/branding/`
- Format: SVG (optimisé) + PNG (@1x, @2x, @3x)

---

## ❓ Questions ?

Contactez le Product Owner ou postez dans `#design-prompt-academy` sur Slack.

---

**Version**: 1.0 | **Date**: Nov 6, 2025
