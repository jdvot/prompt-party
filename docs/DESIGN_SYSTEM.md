# 🎨 Prompt Academy - Design System

## 🎯 Vision

**Prompt Academy** est une plateforme d'apprentissage moderne et accessible pour maîtriser le prompt engineering. Le design system reflète :
- 🎓 **Éducation** - Professionnel mais accessible
- 🚀 **Innovation** - Moderne et tech-forward
- 💡 **Clarté** - Interface claire pour l'apprentissage
- 🌈 **Inspiration** - Encourageant et motivant

---

## 🎨 Palette de Couleurs

### Couleurs Primaires (Brand)

**Indigo Académique** - Couleur principale (confiance, professionnalisme, tech)
```
--brand-primary: 238 80% 58%        /* #6366F1 - Indigo 500 */
--brand-primary-light: 238 80% 68%  /* #818CF8 - Indigo 400 */
--brand-primary-dark: 238 80% 48%   /* #4F46E5 - Indigo 600 */
```

**Violet Créatif** - Couleur secondaire (créativité, innovation)
```
--brand-secondary: 271 81% 56%      /* #8B5CF6 - Violet 500 */
--brand-secondary-light: 271 81% 66%/* #A78BFA - Violet 400 */
--brand-secondary-dark: 271 81% 46% /* #7C3AED - Violet 600 */
```

**Cyan Accent** - Accent dynamique (énergie, progression)
```
--brand-accent: 198 93% 60%         /* #22D3EE - Cyan 400 */
--brand-accent-light: 198 93% 70%   /* #67E8F9 - Cyan 300 */
```

### Couleurs Sémantiques

**Success** - Validation, complétion
```
--color-success: 142 76% 36%        /* #10B981 - Emerald 500 */
--color-success-light: 142 76% 46%
--color-success-bg: 142 76% 96%
```

**Error** - Erreurs, danger
```
--color-error: 0 84% 60%            /* #EF4444 - Red 500 */
--color-error-light: 0 84% 70%
--color-error-bg: 0 84% 95%
```

**Warning** - Attention, prudence
```
--color-warning: 38 92% 50%         /* #F59E0B - Amber 500 */
--color-warning-light: 38 92% 60%
--color-warning-bg: 38 92% 95%
```

**Info** - Information, aide
```
--color-info: 217 91% 60%           /* #3B82F6 - Blue 500 */
--color-info-light: 217 91% 70%
--color-info-bg: 217 91% 95%
```

### Échelle de Gris (Neutre)

**Light Mode**
```
--gray-50:  220 18% 98%   /* #FAFBFC - Arrière-plan */
--gray-100: 220 18% 96%   /* #F4F5F7 - Surface élevée */
--gray-200: 220 16% 92%   /* #E8EAF0 - Bordures */
--gray-300: 220 14% 85%   /* #D1D5DB - Bordures actives */
--gray-400: 220 12% 70%   /* #9CA3AF - Placeholders */
--gray-500: 220 10% 50%   /* #6B7280 - Texte secondaire */
--gray-600: 220 13% 41%   /* #4B5563 - Texte tertiaire */
--gray-700: 220 20% 30%   /* #374151 - Texte primaire */
--gray-800: 220 24% 20%   /* #1F2937 - Titres */
--gray-900: 220 28% 12%   /* #111827 - Noir */
```

**Dark Mode**
```
--gray-50:  220 30% 8%    /* #0F1419 - Noir */
--gray-100: 220 28% 12%   /* #111827 - Titres */
--gray-200: 220 24% 20%   /* #1F2937 - Texte primaire */
--gray-300: 220 20% 30%   /* #374151 - Texte tertiaire */
--gray-400: 220 13% 41%   /* #4B5563 - Texte secondaire */
--gray-500: 220 10% 50%   /* #6B7280 - Placeholders */
--gray-600: 220 12% 70%   /* #9CA3AF - Bordures actives */
--gray-700: 220 14% 85%   /* #D1D5DB - Bordures */
--gray-800: 220 16% 92%   /* #E8EAF0 - Surface élevée */
--gray-900: 220 18% 96%   /* #F4F5F7 - Arrière-plan */
```

---

## 🎭 Utilisation des Couleurs

### Hiérarchie Visuelle

1. **Primaire (Indigo)** - Actions principales, liens, focus
2. **Secondaire (Violet)** - Actions secondaires, badges premium
3. **Accent (Cyan)** - Highlights, notifications, progression
4. **Gris** - Texte, bordures, arrière-plans

### Exemples d'Application

**Boutons**
```
Primary Button:   bg-gradient indigo-600 → violet-600
Secondary Button: bg-violet-500
Outline Button:   border-gray-300, hover:border-indigo-500
Ghost Button:     hover:bg-gray-100
```

**Badges**
```
Default:    bg-gray-100 text-gray-700
Primary:    bg-indigo-100 text-indigo-700
Success:    bg-emerald-100 text-emerald-700
Premium:    bg-gradient indigo-500 → violet-500, text-white
```

**Cards**
```
Background:     bg-white dark:bg-gray-800
Border:         border-gray-200 dark:border-gray-700
Hover:          hover:border-indigo-300 hover:shadow-lg
```

**Progress**
```
Track:          bg-gray-200
Fill:           bg-gradient indigo-500 → cyan-400
Complete:       bg-gradient emerald-500 → green-400
```

---

## 📐 Typographie

### Fonts

**Primary**: Inter (sans-serif)
- Headers: 700 (Bold)
- Body: 400 (Regular), 500 (Medium)
- UI: 600 (Semi-bold)

### Scale

```
text-xs:    0.75rem (12px)  - Captions, labels
text-sm:    0.875rem (14px) - Body small
text-base:  1rem (16px)     - Body standard
text-lg:    1.125rem (18px) - Lead text
text-xl:    1.25rem (20px)  - H4
text-2xl:   1.5rem (24px)   - H3
text-3xl:   1.875rem (30px) - H2
text-4xl:   2.25rem (36px)  - H1
text-5xl:   3rem (48px)     - Hero
```

---

## 🎯 Composants Clés

### Lessons Cards
```
Background: white
Border: 2px solid gray-200
Hover: border-indigo-300, shadow-lg
Completed: border-emerald-400, checkmark icon
```

### Course Progress
```
Progress bar: Gradient indigo → cyan
Percentage: Bold, indigo-600
Badge: "X% Complete" in cyan-100 bg
```

### Achievements
```
Gold: gradient(amber-400 → yellow-300)
Silver: gradient(gray-300 → gray-200)
Bronze: gradient(orange-400 → amber-500)
```

### Code Blocks
```
Background: gray-900 (dark mode always)
Syntax: VS Code Dark+ theme
Border-radius: 12px
Padding: 24px
```

---

## ✨ Animations

### Transitions
```
Fast:    150ms - Hovers, simple states
Base:    200ms - Default
Slow:    300ms - Complex transitions
Slower:  500ms - Elaborate animations
```

### Easing
```
ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Micro-interactions
- ✅ Buttons: scale(1.02) on hover, scale(0.98) on active
- ✅ Cards: translateY(-4px) + shadow on hover
- ✅ Checkboxes: checkmark slide-in
- ✅ Progress bars: smooth width transition
- ✅ Loading skeletons: shimmer effect (2s infinite)
- ✅ Floating elements: gentle float animation (3s infinite)
- ✅ Bounce-subtle: 2s ease-in-out infinite for attention

### New Animation Utilities (2025)
```css
.animate-bounce-subtle   - Subtle bounce for CTAs
.animate-float          - Floating effect for illustrations
.animate-fade-in-up     - Entrance animation
.animate-scale-in       - Scale entrance with spring
.interaction-scale      - Hover scale with press feedback
.interaction-lift       - Lift and shadow on hover
.interaction-glow       - Glow effect on hover
.interaction-brighten   - Brightness increase on hover
```

---

## 🌙 Dark Mode

### Stratégie
- Auto-detect system preference
- Toggle manuel disponible
- Smooth transition (300ms)

### Ajustements
- Reduce contrast for comfort
- Dimmer shadows
- Slightly desaturated colors
- Higher elevation for cards

---

## 📱 Responsive

### Breakpoints
```
sm:  640px  - Mobile large
md:  768px  - Tablet
lg:  1024px - Desktop small
xl:  1280px - Desktop
2xl: 1400px - Desktop large
```

### Mobile-First
- Base styles for mobile
- Add complexity at larger breakpoints
- Touch-friendly (44px min tap target)

---

## ♿ Accessibilité (WCAG 2.2 AA Compliant)

### Contrast Ratios
- Text: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum
- UI elements: 3:1 minimum
- All brand colors tested and compliant

### Focus States
- Visible focus ring (2px indigo-500 with 2px offset)
- Skip to main content link (keyboard accessible)
- Keyboard navigation support throughout
- Focus-visible pseudo-class for better UX
- `.focus-ring-brand` utility for consistent focus styles
- `.focus-visible-enhanced` for elevated focus states

### Screen Readers
- Semantic HTML5 elements
- ARIA labels on all interactive elements
- `role="status"` on loading states with `aria-live="polite"`
- `aria-busy` states on buttons during loading
- Alt text for all images and illustrations
- Screen reader-only text with `.sr-only` class

### Keyboard Navigation
- All interactive elements keyboard accessible
- Logical tab order maintained
- Escape key to close modals/dialogs
- Arrow keys for navigation where appropriate
- Enter/Space for activation

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode Support
```css
@media (prefers-contrast: high) {
  .high-contrast-border { border-width: 2px !important; }
  .high-contrast-text { font-weight: 600 !important; }
}
```

---

## 🎨 Logo

**Concept**: Graduation cap (🎓) stylisé + Book ouvert

**Colors**:
- Primary: Indigo gradient
- Accent: Cyan highlight

**Versions**:
- Full logo (icon + text)
- Icon only (favicon)
- Wordmark only (mobile header)

**Sizes**:
- 512x512 (app icon)
- 192x192 (PWA)
- 32x32 (favicon)

---

## 📦 Assets

### Icons
- Lucide React (consistent style)
- 24px default size
- Stroke width: 2px

### Illustrations
- Undraw.co style (customized indigo)
- Isometric when possible
- Education-themed

### Images
- WebP format (fallback JPG)
- Lazy loading
- Responsive srcset

---

## 🚀 Implementation

### CSS Variables
All colors defined in `src/styles/globals.css`

### Tailwind Config
Extended palette in `tailwind.config.ts`

### Component Library
Shadcn UI customized with brand colors

---

## 🎁 Enhanced Components (2025 Update)

### Button Component
**Location**: `src/components/ui/button.tsx`

**Variants**:
- `primary` - Gradient indigo to accent with glow
- `secondary` - Violet gradient
- `gradient` - Full spectrum gradient animation
- `outline` - Border with hover fill
- `ghost` - Subtle hover
- `soft` - Tinted background
- `destructive` - Error actions
- `success` - Confirmation actions
- `link` - Text-only

**Sizes**: `sm`, `md`, `lg`, `xl`, `icon`

**Features**:
- ✅ Loading states with spinner
- ✅ Disabled states with reduced opacity
- ✅ Accessibility: `aria-busy`, `aria-disabled`
- ✅ Screen reader loading announcements
- ✅ Keyboard navigation support
- ✅ Press feedback (scale on active)

**Usage**:
```tsx
<Button variant="primary" size="lg" loading={isSubmitting}>
  Submit Form
</Button>
```

### Card Component
**Location**: `src/components/ui/card.tsx`

**Variants**:
- `default` - Standard card
- `interactive` - Hover lift effect
- `bento` - Modern trendy style with gradient border
- `feature` - For feature sections
- `glass` - Glassmorphism effect
- `outlined` - Prominent border
- `elevated` - Strong shadow

**Props**:
- `padding`: `none`, `sm`, `md`, `lg`
- `radius`: `default`, `sm`, `lg`, `xl`

**Features**:
- ✅ Smooth hover transitions
- ✅ Responsive padding system
- ✅ Dark mode optimized
- ✅ Semantic sub-components (CardHeader, CardTitle, CardContent, CardFooter)

### Skeleton Component (Enhanced)
**Location**: `src/components/ui/skeleton.tsx`

**Features**:
- ✅ Shimmer animation variant
- ✅ Wave animation variant
- ✅ Shape variants: `default`, `circle`, `rect`, `pill`
- ✅ Width/height props for precise sizing
- ✅ Accessibility: `role="status"`, `aria-label`

**Pre-built Patterns**:
- `SkeletonText` - Multi-line text skeleton
- `SkeletonCard` - Complete card skeleton
- `SkeletonAvatar` - Avatar placeholder (sm/md/lg/xl)
- `SkeletonButton` - Button placeholder
- `SkeletonTable` - Table with headers and rows
- `SkeletonList` - List with avatars

**Usage**:
```tsx
<Skeleton variant="shimmer" shape="circle" className="h-10 w-10" />
<SkeletonCard showImage showAvatar />
<SkeletonList items={5} showAvatar />
```

### Badge Component
**Location**: `src/components/ui/badge.tsx`

**Variants**:
- Solid: `default`, `secondary`, `destructive`, `success`, `warning`, `info`
- Soft: `soft`, `softSecondary`, `softDestructive`, etc.
- Outline: `outline`, `outlinePrimary`, `outlineSecondary`, etc.
- Special: `gradient`, `gradientSecondary`, `glow`

**Features**:
- ✅ Start/end icons support
- ✅ Dot indicator option
- ✅ Removable with X button
- ✅ Three sizes: sm, md, lg
- ✅ Three shapes: default, pill, square

**Pre-built Variants**:
- `StatusBadge` - Active, Inactive, Pending, Success, Error, Warning
- `CountBadge` - Notification counts with max value

### Input Component
**Location**: `src/components/ui/input.tsx`

**Variants**: `default`, `filled`, `ghost`

**Validation States**: `error`, `success`, `warning`

**Features**:
- ✅ Start/end icon support
- ✅ Clearable with X button
- ✅ Character count display
- ✅ Max character enforcement
- ✅ Helper/error/success text
- ✅ Accessibility: proper ARIA attributes

**Advanced Components**:
- `InputGroup` - Combine inputs with addons
- `InputAddon` - Prefix/suffix for inputs

### Loading States
**Location**: `src/components/ui/loading-states.tsx`

**Specialized Skeletons**:
- `PromptCardSkeleton` - Prompt card loading
- `PromptGridSkeleton` - Grid of prompt cards
- `ProfileSkeleton` - User profile loading
- `CommentSkeleton` - Comment thread loading
- `TableSkeleton` - Data table loading
- `ChartSkeleton` - Chart/graph loading
- `StatCardSkeleton` - Stat card loading
- `DashboardSkeleton` - Complete dashboard loading

**Features**:
- ✅ `LoadingContainer` wrapper with accessibility
- ✅ `aria-live="polite"` for screen readers
- ✅ Fade-in-up animation on mount
- ✅ Customizable counts and configurations

### Empty States
**Location**: `src/components/ui/empty-states.tsx`

**Pre-built States**:
- `NoPromptsFound` - No prompts available
- `NoSearchResults` - Search returned nothing
- `NoLikes` - No liked content
- `NoComments` - No comments yet
- `NoFollowers` - No followers yet
- `NoCollections` - No collections created
- `NoNotifications` - No new notifications
- `NoBookmarks` - No saved bookmarks
- `NoActivity` - No recent activity
- `NoData` - Generic no data state
- `CompactEmptyState` - Smaller version for tight spaces

**Features**:
- ✅ Icon, title, description structure
- ✅ Optional action button
- ✅ Internationalization support
- ✅ Consistent styling
- ✅ Responsive design

---

## 🛠 Utility Classes (2025 Enhanced)

### Typography Utilities
```css
/* Display text for hero sections */
.text-display-sm, .text-display-md, .text-display-lg

/* Semantic heading classes */
.text-h1, .text-h2, .text-h3, .text-h4, .text-h5, .text-h6

/* Body text variants */
.text-body-lg, .text-body, .text-body-sm

/* Special text styles */
.text-caption, .text-overline, .text-code
.text-emphasis, .text-muted, .text-subtle

/* Gradient text */
.text-gradient-brand, .text-gradient-primary, .text-gradient-vibrant
.gradient-text (with animation)
```

### Layout Utilities
```css
/* Container variants */
.container-narrow    /* max-w-4xl */
.container-wide      /* max-w-7xl */
.full-bleed         /* 100vw breakout */

/* Centering */
.center, .center-x, .center-y

/* Responsive display */
.mobile-only, .desktop-only, .tablet-up
```

### State Utilities
```css
.state-loading      /* Loading state styles */
.state-disabled     /* Disabled state styles */
.state-error        /* Error state styles */
.state-success      /* Success state styles */
```

### Interaction Utilities
```css
.interaction-scale      /* Scale on hover + press feedback */
.interaction-lift       /* Lift and shadow on hover */
.interaction-glow       /* Glow effect on hover */
.interaction-brighten   /* Brightness increase */
.interaction-rotate     /* Rotate on hover */
.hover-lift            /* translateY(-1px) on hover */
.hover-grow            /* scale(1.05) on hover */
.press-scale           /* scale(0.95) on active */
```

### Background Utilities
```css
.bg-mesh           /* Mesh gradient background */
.bg-dots           /* Dotted pattern */
.bg-grid           /* Grid pattern */
.bg-noise          /* Noise texture overlay */
.glass             /* Glassmorphism effect */
```

### Elevation Utilities
```css
.elevation-1 through .elevation-6
.shadow-glow-primary, .shadow-glow-secondary, .shadow-glow-accent
```

### Accessibility Utilities
```css
.sr-only-focusable         /* Screen reader only until focused */
.focus-visible-enhanced    /* Enhanced focus ring */
.keyboard-only-focus       /* Focus only for keyboard nav */
.high-contrast-border      /* @media (prefers-contrast: high) */
.high-contrast-text        /* @media (prefers-contrast: high) */
```

### Scrollbar Utilities
```css
.scrollbar-thin       /* Thin custom scrollbar */
.scrollbar-hide       /* Hide scrollbar but keep function */
.scroll-smooth-container  /* Smooth scrolling container */
```

### Performance Utilities
```css
.gpu-accelerated       /* Force GPU acceleration */
.prevent-layout-shift  /* content-visibility optimization */
```

### Truncation Utilities
```css
.truncate-2, .truncate-3, .truncate-4  /* Line clamping */
```

---

## 📊 Usage Guidelines

### Do's ✅
- Use indigo for primary actions
- Use emerald for success states
- Maintain consistent spacing (8px grid)
- Use shadows for elevation

### Don'ts ❌
- Don't mix too many colors (max 3 per view)
- Don't use pure black (#000)
- Don't ignore contrast ratios
- Don't animate everything

---

**Version**: 1.0
**Last Updated**: November 2025
**Maintainer**: Prompt Academy Design Team
