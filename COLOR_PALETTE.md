# Color Palette - Prompt Party Design System 2025

## Brand Colors

### Primary Purple
```
Light Mode: hsl(256 67% 59%) - #7C3AED
Dark Mode:  hsl(256 67% 69%) - #9F7AEA

Usage: Primary actions, links, brand elements
Tailwind: bg-brand-primary, text-brand-primary, border-brand-primary
```

### Secondary Blue
```
Light Mode: hsl(221 83% 53%) - #3B82F6
Dark Mode:  hsl(221 83% 63%) - #60A5FA

Usage: Secondary actions, accents
Tailwind: bg-brand-secondary, text-brand-secondary
```

### Accent Magenta
```
Light Mode: hsl(280 87% 65%) - #C026D3
Dark Mode:  hsl(280 87% 75%) - #D946EF

Usage: Highlights, CTAs, special elements
Tailwind: bg-brand-accent, text-brand-accent
```

## Semantic Colors

### Success (Green)
```
Default: hsl(142 76% 36%) - #16A34A
Light:   hsl(142 71% 45%)
BG:      hsl(142 76% 96%)

Usage: Success states, confirmations
Tailwind: bg-success, text-success, bg-success-bg
```

### Error (Red)
```
Default: hsl(0 84% 60%) - #EF4444
Light:   hsl(0 72% 70%)
BG:      hsl(0 84% 96%)

Usage: Errors, destructive actions
Tailwind: bg-error, text-error, bg-error-bg
```

### Warning (Orange)
```
Default: hsl(38 92% 50%) - #F59E0B
Light:   hsl(38 92% 60%)
BG:      hsl(38 92% 96%)

Usage: Warnings, alerts
Tailwind: bg-warning, text-warning, bg-warning-bg
```

### Info (Cyan)
```
Default: hsl(199 89% 48%) - #0EA5E9
Light:   hsl(199 89% 58%)
BG:      hsl(199 89% 96%)

Usage: Informational messages
Tailwind: bg-info, text-info, bg-info-bg
```

## Neutral Gray Scale

```
gray-50:  hsl(220 20% 98%)  - #F9FAFB  (Lightest)
gray-100: hsl(220 18% 96%)  - #F3F4F6
gray-200: hsl(220 16% 92%)  - #E5E7EB  (Borders)
gray-300: hsl(220 14% 84%)  - #D1D5DB
gray-400: hsl(220 12% 69%)  - #9CA3AF
gray-500: hsl(220 9% 54%)   - #6B7280  (Medium)
gray-600: hsl(220 13% 41%)  - #4B5563
gray-700: hsl(220 17% 32%)  - #374151
gray-800: hsl(220 24% 20%)  - #1F2937
gray-900: hsl(220 28% 12%)  - #111827
gray-950: hsl(220 32% 6%)   - #0A0E14  (Darkest)

Usage: Backgrounds, text, borders
Tailwind: bg-gray-50, text-gray-600, border-gray-200
```

## Surface Colors

### Light Mode
```
Base:    hsl(0 0% 100%)      - #FFFFFF  (White)
Raised:  hsl(220 20% 99%)    - #FCFCFD  (Subtle off-white)
Overlay: hsl(0 0% 100%)      - #FFFFFF  (White overlay)

Usage: Card backgrounds, elevated surfaces
Tailwind: bg-surface-base, bg-surface-raised
```

### Dark Mode
```
Base:    hsl(220 28% 8%)     - #0D1117  (Deep dark blue-gray)
Raised:  hsl(220 24% 12%)    - #161B22  (Slightly lighter)
Overlay: hsl(220 24% 16%)    - #1C2128  (Card overlay)

Usage: Card backgrounds, elevated surfaces
Tailwind: bg-surface-base, bg-surface-raised
```

## Gradients

### Primary Gradient
```
Light: linear-gradient(135deg, hsl(256 67% 59%), hsl(280 87% 65%))
Dark:  linear-gradient(135deg, hsl(256 67% 69%), hsl(280 87% 75%))

Usage: Primary buttons, premium elements
Tailwind: bg-gradient-to-r from-brand-primary to-brand-accent
```

### Secondary Gradient
```
Light: linear-gradient(135deg, hsl(221 83% 53%), hsl(256 67% 59%))
Dark:  linear-gradient(135deg, hsl(221 83% 63%), hsl(256 67% 69%))

Usage: Secondary buttons, accents
Tailwind: bg-gradient-to-r from-brand-secondary to-brand-primary
```

### Vibrant Gradient
```
Light: linear-gradient(135deg, hsl(256 67% 59%), hsl(280 87% 65%), hsl(221 83% 53%))
Dark:  linear-gradient(135deg, hsl(256 67% 69%), hsl(280 87% 75%), hsl(221 83% 63%))

Usage: Hero sections, special CTAs
Tailwind: bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary
```

## Accessibility

### Contrast Ratios (WCAG 2.2 AA)

All color combinations meet minimum requirements:

- **Text on Background**: 4.5:1 minimum
- **Large Text**: 3:1 minimum
- **UI Components**: 3:1 minimum

### Examples

```
✓ brand-primary on white:  8.2:1 (Excellent)
✓ gray-600 on white:       5.1:1 (Good)
✓ gray-500 on white:       4.6:1 (Pass)
✓ success on white:        4.8:1 (Pass)
✓ error on white:          4.5:1 (Pass)
```

## Usage Examples

### Buttons
```tsx
<Button variant="primary">       // Uses brand-primary gradient
<Button variant="secondary">     // Uses brand-secondary gradient
<Button variant="gradient">      // Uses vibrant gradient
<Button variant="success">       // Uses success color
<Button variant="destructive">   // Uses error color
```

### Backgrounds
```tsx
<div className="bg-brand-primary">         // Purple background
<div className="bg-gradient-to-r from-brand-primary to-brand-accent">  // Gradient
<div className="bg-surface-raised">        // Subtle elevated surface
<div className="bg-success-bg">            // Light success background
```

### Text
```tsx
<h1 className="text-brand-primary">        // Purple text
<p className="text-muted-foreground">      // Subtle gray text
<span className="text-gradient-primary">   // Gradient text effect
```

### Borders
```tsx
<div className="border border-brand-primary/20">  // Subtle purple border
<div className="border-2 border-brand-primary">   // Prominent purple border
```

## Color Philosophy

1. **Purple as Primary**: Modern, creative, tech-forward
2. **Blue as Secondary**: Trust, stability, professionalism
3. **Magenta as Accent**: Energy, innovation, premium feel
4. **Warm Semantics**: Clear, recognizable feedback colors
5. **Cool Neutrals**: Professional, readable gray scale

## Dark Mode Strategy

- **Lighten brand colors** in dark mode for better visibility
- **Increase saturation** slightly to compensate for darker backgrounds
- **Maintain contrast ratios** across both modes
- **Use deeper grays** instead of pure black for backgrounds
- **Subtle elevation** through color rather than heavy shadows

---

**Tip**: Use the `/design-demo` page to see all colors in action with live examples!
