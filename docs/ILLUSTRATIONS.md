# Prompt Academy - Illustrations Guide

This document provides a comprehensive overview of all illustrations used in the Prompt Academy application, their locations, usage guidelines, and implementation examples.

---

## Overview

All illustrations follow the Prompt Academy brand guidelines with:
- **Color Palette**: Indigo (#6366F1), Violet (#8B5CF6), Cyan (#22D3EE)
- **Style**: Isometric, clean, modern, educational
- **Format**: Optimized SVG with inline animations
- **Dark Mode**: Colors work in both light and dark themes

---

## Illustration Categories

### 1. Error Pages

Located in `/public/branding/illustrations/errors/`

#### 404 - Not Found
**File**: `404-not-found.svg`
**Size**: 400x400px
**Description**: Lost explorer with map, compass, and directional signposts
**Usage**: Page not found errors

```tsx
import Image from 'next/image'

<Image
  src="/branding/illustrations/errors/404-not-found.svg"
  alt="404 - Page not found"
  width={400}
  height={400}
  priority
  className="w-full max-w-md h-auto"
/>
```

**Features**:
- Confused character scratching head
- Unfolded map with confusing paths
- Spinning compass
- Question marks floating around
- Animated floating elements

---

#### 500 - Server Error
**File**: `500-server-error.svg`
**Size**: 400x400px
**Description**: Robot mechanic fixing broken gears with tools
**Usage**: Internal server errors, unexpected errors

```tsx
import Image from 'next/image'

<Image
  src="/branding/illustrations/errors/500-server-error.svg"
  alt="Server error"
  width={400}
  height={400}
  priority
  className="w-full max-w-md h-auto"
/>
```

**Features**:
- Worried robot with blinking error light
- Broken gears with cracks
- Wrench and screwdriver tools
- Animated sparks and oil drops
- Rotating gears animation

---

### 2. Empty States

Located in `/public/branding/illustrations/empty-states/`

#### Empty Bookmarks
**File**: `empty-bookmarks.svg`
**Size**: 400x350px
**Description**: Open book/folder with empty pages and floating bookmark ribbon
**Usage**: No saved bookmarks

```tsx
<EmptyState
  illustrationSrc="/branding/illustrations/empty-states/empty-bookmarks.svg"
  title="No Bookmarks Yet"
  description="Start saving your favorite prompts and tutorials..."
  size="lg"
/>
```

**Features**:
- Open book with blank pages
- Faded bookmark ribbon
- Plus icons suggesting "add" action
- Floating stars (save concept)
- Gentle floating animation

---

#### Empty Collections
**File**: `empty-collections.svg`
**Size**: 400x350px
**Description**: Filing cabinet with empty drawers and floating folder icons
**Usage**: No collections created

```tsx
<EmptyState
  illustrationSrc="/branding/illustrations/empty-states/empty-collections.svg"
  title="No Collections Yet"
  description="Organize your favorite prompts into collections..."
  size="lg"
/>
```

**Features**:
- Isometric filing cabinet
- Empty folder outlines
- Document icons
- Plus icon for creating
- Floating animations on folders

---

#### Empty Search Results
**File**: `empty-search.svg`
**Size**: 400x350px
**Description**: Large magnifying glass with X mark and faded result cards
**Usage**: No search results found

```tsx
<EmptyState
  illustrationSrc="/branding/illustrations/empty-states/empty-search.svg"
  title="No Results Found"
  description="Try adjusting your search terms or filters..."
  size="lg"
/>
```

**Features**:
- Large magnifying glass with X
- Faded/disappearing document cards
- Question marks floating
- Search tag elements
- Fade in/out animations

---

#### Empty Prompts
**File**: `empty-prompts.svg`
**Size**: 400x350px
**Description**: Empty text editor with blinking cursor and writing tools
**Usage**: No prompts created yet

```tsx
<EmptyState
  illustrationSrc="/branding/illustrations/empty-states/empty-prompts.svg"
  title="No Prompts Yet"
  description="Create your first prompt to get started..."
  size="lg"
/>
```

**Features**:
- Empty editor window
- Blinking cursor animation
- Pencil/writing tool
- Plus icon for creation
- Template card suggestions
- Lightbulb (idea indicator)

---

### 3. Feature Illustrations

Located in `/public/branding/illustrations/features/`

#### Success / Completion
**File**: `success-celebration.svg`
**Size**: 400x400px
**Description**: Trophy with graduation cap, confetti celebration
**Usage**: Course completion, achievements, success messages

```tsx
<div className="flex justify-center my-8">
  <img
    src="/branding/illustrations/features/success-celebration.svg"
    alt="Success!"
    className="w-full max-w-sm h-auto"
  />
</div>
```

**Features**:
- Golden trophy with star
- Floating graduation cap
- Animated confetti (circles, rectangles, stars, triangles)
- Sparkle bursts
- Celebration theme with continuous animations

---

#### Learning Path
**File**: `learning-path.svg`
**Size**: 500x400px
**Description**: Winding road with milestones from beginner to expert
**Usage**: Tutorial paths, progress tracking, learning journey

```tsx
<div className="flex justify-center my-8">
  <img
    src="/branding/illustrations/features/learning-path.svg"
    alt="Learning path"
    className="w-full max-w-lg h-auto"
  />
</div>
```

**Features**:
- Winding path with dashed centerline
- Four milestones: Beginner (Cyan), Intermediate (Violet), Advanced (Indigo), Expert (Green)
- Person climbing/progressing with graduation cap
- Signposts along the way
- Progress percentage indicator (75%)
- Clouds and decorative elements
- Animated progress particles

---

### 4. Onboarding Illustrations

Located in `/public/branding/illustrations/onboarding/`

#### Authentication
**File**: `authentication.svg`
**Size**: 400x400px
**Description**: Secure login with key, shield, and person with device
**Usage**: Login/signup pages, security features

```tsx
<div className="flex justify-center my-8">
  <img
    src="/branding/illustrations/onboarding/authentication.svg"
    alt="Secure authentication"
    className="w-full max-w-md h-auto"
  />
</div>
```

**Features**:
- Large security key
- Shield with checkmark (pulsing animation)
- Person holding device/tablet
- Lock and fingerprint icons
- Floating security particles
- Network connection lines
- Welcome badge
- Trust indicator sparkles

---

## Implementation Guidelines

### Using with EmptyState Component

The `EmptyState` component has been enhanced to support illustration sources:

```tsx
import { EmptyState } from '@/components/ui/empty-state'

<EmptyState
  illustrationSrc="/branding/illustrations/empty-states/empty-bookmarks.svg"
  title="No Bookmarks Yet"
  description="Your description here..."
  size="lg"
  action={{
    label: 'Primary Action',
    onClick: () => {},
  }}
  secondaryAction={{
    label: 'Secondary Action',
    onClick: () => {},
  }}
/>
```

### Using with Next.js Image Component

For better optimization (recommended for static pages):

```tsx
import Image from 'next/image'

<Image
  src="/branding/illustrations/errors/404-not-found.svg"
  alt="Descriptive alt text"
  width={400}
  height={400}
  priority // Use for above-the-fold content
  className="w-full max-w-md h-auto"
/>
```

### Using as Regular img Tag

For dynamic content or when Image component isn't suitable:

```tsx
<img
  src="/branding/illustrations/features/success-celebration.svg"
  alt="Descriptive alt text"
  className="w-full max-w-sm h-auto"
/>
```

---

## Design Specifications

### Color Usage

All illustrations use the brand color palette:

```css
/* Indigo - Primary */
--indigo-500: #6366F1
--indigo-600: #4F46E5

/* Violet - Secondary */
--violet-500: #8B5CF6
--violet-600: #7C3AED

/* Cyan - Accent */
--cyan-400: #22D3EE
--cyan-500: #06B6D4

/* Supporting Colors */
--emerald-500: #10B981 (Success)
--amber-400: #FCD34D (Gold/Trophy)
--red-500: #EF4444 (Error states)
```

### Animation Principles

1. **Subtle Movement**: All animations are gentle and non-distracting
2. **Performance**: CSS animations, no JavaScript required
3. **Accessibility**: Respect `prefers-reduced-motion`
4. **Duration**: 2-3 seconds for floating, 1-2 seconds for pulses
5. **Easing**: Natural, smooth transitions

### Responsive Behavior

Illustrations scale proportionally:

```tsx
className="w-full max-w-[size] h-auto"
```

Recommended max widths:
- **Small**: 200px
- **Medium**: 300px
- **Large**: 400px
- **Extra Large**: 500px

---

## Accessibility

All illustrations include:

1. **Alt Text**: Descriptive, concise
2. **ARIA Labels**: Where appropriate
3. **Keyboard Navigation**: Focusable elements have proper focus states
4. **Color Contrast**: Meets WCAG AA standards
5. **Reduced Motion**: Animations respect user preferences

```tsx
// Example with reduced motion support
<div className="motion-reduce:animate-none">
  <img src="..." alt="..." />
</div>
```

---

## Creating New Illustrations

When creating new illustrations, follow these guidelines:

### 1. File Setup
- Size: 400x400px or 500x400px (landscape)
- Format: SVG with optimized code
- Include gradients in `<defs>` section

### 2. Color Gradients
```svg
<defs>
  <linearGradient id="uniqueId" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:#6366F1"/>
    <stop offset="100%" style="stop-color:#4F46E5"/>
  </linearGradient>
</defs>
```

### 3. Naming Convention
- Location: `/public/branding/illustrations/[category]/[name].svg`
- File names: lowercase, hyphen-separated
- Examples: `empty-bookmarks.svg`, `404-not-found.svg`

### 4. Required Elements
- Shadow (radial gradient at bottom)
- Background decorative elements (circles, sparkles)
- At least one animated element
- Brand colors only

### 5. Animation Guidelines
```svg
<!-- Floating animation -->
<animate attributeName="cy" values="200;195;200" dur="2.5s" repeatCount="indefinite"/>

<!-- Opacity pulse -->
<animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite"/>

<!-- Rotation -->
<animateTransform
  attributeName="transform"
  type="rotate"
  from="0 100 100"
  to="360 100 100"
  dur="8s"
  repeatCount="indefinite"/>
```

---

## Performance Optimization

### File Size
- Target: < 10KB per illustration
- Use path simplification tools
- Remove unnecessary attributes
- Optimize gradients (reuse where possible)

### Loading Strategy
```tsx
// Critical illustrations (above fold)
<Image ... priority />

// Below fold
<Image ... loading="lazy" />

// Background decorative
<img ... loading="lazy" />
```

### Caching
SVG illustrations are cached by Next.js automatically when using the `Image` component.

---

## Troubleshooting

### Illustration Not Displaying
1. Check file path: `/public/branding/illustrations/...`
2. Verify file exists in correct location
3. Check console for 404 errors
4. Ensure proper import if using Image component

### Animations Not Working
1. Check browser support for SVG animations
2. Verify `prefers-reduced-motion` isn't enabled
3. Inspect SVG for syntax errors
4. Test in different browsers

### Styling Issues
1. Ensure parent container allows proper sizing
2. Check z-index if illustration is hidden
3. Verify responsive classes are applied
4. Test in light/dark mode

---

## Future Illustrations

Planned illustrations to be created:

- [ ] **Onboarding Welcome**: Welcome screen for new users
- [ ] **Tutorial Complete**: Specific to tutorial completion
- [ ] **Leaderboard**: Competitive/ranking visualization
- [ ] **Team Collaboration**: Team features illustration
- [ ] **API Integration**: Developer/API features
- [ ] **Loading States**: Animated loading indicators
- [ ] **No Internet**: Offline state illustration

---

## Resources

- **Design System**: `/docs/DESIGN_SYSTEM.md`
- **Brand Assets**: `/public/branding/`
- **Component Library**: `/src/components/ui/`
- **Figma MCP**: Use Figma tools for design reference

---

**Version**: 1.0
**Last Updated**: November 2025
**Maintainer**: Prompt Academy Design Team
