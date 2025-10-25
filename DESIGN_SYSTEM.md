# Prompt Party Design System

**Premium Modern UI - 2025 Edition**

Inspired by: OpenAI, Vercel, Linear, Stripe
Built with: Next.js 15 + Tailwind CSS + Shadcn UI

Welcome to the Prompt Party Design System documentation. This guide provides comprehensive information about our design tokens, components, and best practices.

## Table of Contents

- [Overview](#overview)
- [Design Tokens](#design-tokens)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Spacing](#spacing)
  - [Border Radius](#border-radius)
  - [Shadows](#shadows)
  - [Z-Index](#z-index)
  - [Animation](#animation)
- [Component Guidelines](#component-guidelines)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)

---

## Overview

The Prompt Party Design System is built on top of:
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality, customizable components
- **Design Tokens** - Centralized design values in `src/lib/design-tokens.ts`

### Key Principles

1. **Consistency** - Use design tokens for all design values
2. **Accessibility** - WCAG 2.1 AA compliance minimum
3. **Maintainability** - Single source of truth for design values
4. **Scalability** - Easy to extend and customize
5. **Performance** - Optimized for production use

---

## Design Tokens

All design tokens are centralized in `src/lib/design-tokens.ts` and integrated with Tailwind CSS via `tailwind.config.ts`.

### Colors

#### Brand Colors

Used for primary branding and call-to-action elements.

```tsx
// Tailwind classes
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground"
className="bg-accent text-accent-foreground"
```

**Examples:**
- Primary buttons
- Brand headers
- Important CTAs

#### Semantic Colors

Communicate meaning and state.

| Color | Usage | Tailwind Class |
|-------|-------|----------------|
| Destructive | Errors, deletions | `bg-destructive text-destructive-foreground` |
| Success | Success states | `bg-success text-success-foreground` |
| Warning | Warnings | `bg-warning text-warning-foreground` |
| Info | Informational | `bg-info text-info-foreground` |

**Examples:**
```tsx
// Error message
<div className="bg-destructive text-destructive-foreground p-4 rounded-md">
  Error: Something went wrong
</div>

// Success message
<div className="bg-success text-success-foreground p-4 rounded-md">
  Success! Your prompt was saved
</div>
```

#### Neutral Colors

Background, text, and subtle UI elements.

```tsx
className="bg-background text-foreground"     // Page background
className="bg-muted text-muted-foreground"    // Subtle elements
```

#### Surface Colors

Cards, popovers, and elevated surfaces.

```tsx
className="bg-card text-card-foreground"         // Card surfaces
className="bg-popover text-popover-foreground"   // Dropdown menus
```

#### Dark Mode

All colors automatically adapt to dark mode using the `.dark` class. Toggle dark mode by adding/removing the class from the root element.

```tsx
// Light mode (default)
<html>...</html>

// Dark mode
<html className="dark">...</html>
```

---

### Typography

Typography tokens ensure consistent text styling across the application.

#### Font Families

```tsx
className="font-sans"  // Default sans-serif (Geist Sans)
className="font-mono"  // Monospace (Geist Mono)
```

#### Font Sizes

| Size | Value | Tailwind Class | Use Case |
|------|-------|----------------|----------|
| xs   | 12px  | `text-xs`      | Captions, labels |
| sm   | 14px  | `text-sm`      | Secondary text |
| base | 16px  | `text-base`    | Body text |
| lg   | 18px  | `text-lg`      | Emphasized text |
| xl   | 20px  | `text-xl`      | Small headings |
| 2xl  | 24px  | `text-2xl`     | Headings |
| 3xl  | 30px  | `text-3xl`     | Large headings |
| 4xl  | 36px  | `text-4xl`     | Hero text |
| 5xl  | 48px  | `text-5xl`     | Display text |

#### Font Weights

```tsx
className="font-normal"     // 400
className="font-medium"     // 500
className="font-semibold"   // 600
className="font-bold"       // 700
```

#### Line Heights

```tsx
className="leading-none"     // 1
className="leading-tight"    // 1.25
className="leading-normal"   // 1.5
className="leading-relaxed"  // 1.625
```

#### Typography Examples

```tsx
// Page title
<h1 className="text-4xl font-bold leading-tight">
  Welcome to Prompt Party
</h1>

// Card title
<h2 className="text-xl font-semibold mb-2">
  How to use AI prompts
</h2>

// Body text
<p className="text-base leading-normal text-muted-foreground">
  Discover, share, and remix AI prompts with the community.
</p>

// Caption
<span className="text-xs text-muted-foreground">
  Posted 2 hours ago
</span>
```

---

### Spacing

Consistent spacing scale based on 4px increments.

| Token | Value | Tailwind Class |
|-------|-------|----------------|
| 0     | 0px   | `p-0`, `m-0`, `gap-0` |
| 1     | 4px   | `p-1`, `m-1`, `gap-1` |
| 2     | 8px   | `p-2`, `m-2`, `gap-2` |
| 3     | 12px  | `p-3`, `m-3`, `gap-3` |
| 4     | 16px  | `p-4`, `m-4`, `gap-4` |
| 5     | 20px  | `p-5`, `m-5`, `gap-5` |
| 6     | 24px  | `p-6`, `m-6`, `gap-6` |
| 8     | 32px  | `p-8`, `m-8`, `gap-8` |
| 10    | 40px  | `p-10`, `m-10`, `gap-10` |
| 12    | 48px  | `p-12`, `m-12`, `gap-12` |
| 16    | 64px  | `p-16`, `m-16`, `gap-16` |

**Examples:**
```tsx
// Card with consistent spacing
<div className="p-6 space-y-4">
  <h2 className="mb-2">Title</h2>
  <p className="mb-4">Content</p>
</div>

// Grid layout
<div className="grid grid-cols-3 gap-4">
  {/* Items */}
</div>
```

---

### Border Radius

Rounded corners for UI elements.

```tsx
className="rounded-sm"    // Smaller than default
className="rounded-md"    // Medium
className="rounded-lg"    // Default (8px)
className="rounded-xl"    // Larger than default
className="rounded-full"  // Fully rounded (pills, avatars)
```

**Examples:**
```tsx
// Card
<div className="rounded-lg border p-6">...</div>

// Button
<button className="rounded-md px-4 py-2">Click me</button>

// Avatar
<img className="rounded-full w-10 h-10" src="..." alt="..." />

// Pill badge
<span className="rounded-full px-3 py-1">Tag</span>
```

---

### Shadows

Elevation and depth using box shadows.

```tsx
className="shadow-sm"      // Subtle shadow
className="shadow-md"      // Default shadow
className="shadow-lg"      // Pronounced shadow
className="shadow-xl"      // Heavy shadow
className="shadow-2xl"     // Dramatic shadow
className="shadow-inner"   // Inset shadow
className="shadow-none"    // No shadow
```

**Usage Guidelines:**
- `shadow-sm`: Subtle elevation (input fields)
- `shadow-md`: Cards at rest
- `shadow-lg`: Hover states, important cards
- `shadow-xl`: Modals, important elevated content
- `shadow-2xl`: Hero sections, feature cards

**Examples:**
```tsx
// Card with hover effect
<div className="shadow-md hover:shadow-lg transition-shadow">
  Card content
</div>

// Modal
<div className="shadow-xl">
  Modal content
</div>
```

---

### Z-Index

Layering elements with predictable stacking.

| Token | Value | Usage |
|-------|-------|-------|
| hide  | -1    | Hidden elements |
| base  | 0     | Default level |
| dropdown | 1000 | Dropdown menus |
| sticky | 1100 | Sticky headers |
| fixed | 1200 | Fixed elements |
| modalBackdrop | 1300 | Modal overlays |
| modal | 1400 | Modal content |
| popover | 1500 | Popovers |
| tooltip | 1600 | Tooltips |

**Examples:**
```tsx
// Sticky header
<header className="sticky top-0 z-sticky">...</header>

// Modal backdrop
<div className="z-modalBackdrop">...</div>

// Modal
<div className="z-modal">...</div>
```

---

### Animation

Consistent timing and easing for transitions.

#### Duration

```tsx
className="duration-fast"    // 150ms
className="duration-base"    // 200ms
className="duration-slow"    // 300ms
className="duration-slower"  // 500ms
```

#### Easing

```tsx
className="ease-linear"   // Linear
className="ease-in"       // Ease in
className="ease-out"      // Ease out
className="ease-in-out"   // Ease in-out (default)
```

**Examples:**
```tsx
// Button hover
<button className="transition-colors duration-base ease-in-out hover:bg-primary/90">
  Hover me
</button>

// Card hover
<div className="transition-shadow duration-base hover:shadow-lg">
  Card content
</div>

// Fade in
<div className="transition-opacity duration-slow ease-out opacity-0 hover:opacity-100">
  Appears on hover
</div>
```

---

## Component Guidelines

### Cards

Cards are surfaces that group related content and actions.

```tsx
<div className="bg-card text-card-foreground border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground mb-4">Card description goes here.</p>
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
    Action
  </button>
</div>
```

**Best Practices:**
- Use consistent padding (typically `p-6`)
- Apply shadow for elevation
- Add hover effects for interactive cards
- Use semantic spacing between elements

### Buttons

Primary action triggers.

```tsx
// Primary button
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
  Primary Action
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors">
  Secondary Action
</button>

// Destructive button
<button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md font-medium hover:bg-destructive/90 transition-colors">
  Delete
</button>

// Ghost button
<button className="text-foreground px-4 py-2 rounded-md font-medium hover:bg-muted transition-colors">
  Cancel
</button>
```

**Best Practices:**
- Always include transition effects
- Use appropriate semantic colors
- Maintain consistent padding (`px-4 py-2`)
- Include hover states

### Forms

Form inputs and controls.

```tsx
// Text input
<input
  type="text"
  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
  placeholder="Enter text..."
/>

// Textarea
<textarea
  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
  rows={4}
  placeholder="Enter description..."
/>

// Label
<label className="text-sm font-medium mb-1 block">
  Field Label
</label>
```

**Best Practices:**
- Always include focus states
- Pair inputs with labels for accessibility
- Use consistent border and padding
- Show validation states clearly

### Tags

Categorization and metadata.

```tsx
<span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
  #prompt-engineering
</span>

<span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
  Featured
</span>
```

**Best Practices:**
- Use small text sizes (`text-xs` or `text-sm`)
- Keep padding minimal
- Consider rounded corners or pills
- Group with consistent spacing

### Alerts

Feedback and messaging.

```tsx
// Success alert
<div className="bg-success text-success-foreground p-4 rounded-md border border-success/20">
  <strong className="font-semibold">Success!</strong>
  <p className="mt-1">Your prompt has been published.</p>
</div>

// Error alert
<div className="bg-destructive text-destructive-foreground p-4 rounded-md border border-destructive/20">
  <strong className="font-semibold">Error!</strong>
  <p className="mt-1">Something went wrong. Please try again.</p>
</div>

// Warning alert
<div className="bg-warning text-warning-foreground p-4 rounded-md border border-warning/20">
  <strong className="font-semibold">Warning!</strong>
  <p className="mt-1">This action cannot be undone.</p>
</div>

// Info alert
<div className="bg-info text-info-foreground p-4 rounded-md border border-info/20">
  <strong className="font-semibold">Info</strong>
  <p className="mt-1">Your session will expire in 5 minutes.</p>
</div>
```

---

## Best Practices

### 1. Always Use Design Tokens

❌ **Don't:**
```tsx
<div style={{ padding: '24px', color: '#333' }}>
  Content
</div>
```

✅ **Do:**
```tsx
<div className="p-6 text-foreground">
  Content
</div>
```

### 2. Maintain Consistency

❌ **Don't:**
```tsx
<button className="px-3 py-1.5">Button 1</button>
<button className="px-4 py-2">Button 2</button>
<button className="px-5 py-3">Button 3</button>
```

✅ **Do:**
```tsx
<button className="px-4 py-2">Button 1</button>
<button className="px-4 py-2">Button 2</button>
<button className="px-4 py-2">Button 3</button>
```

### 3. Use Semantic Colors

❌ **Don't:**
```tsx
<button className="bg-red-500">Delete</button>
```

✅ **Do:**
```tsx
<button className="bg-destructive text-destructive-foreground">Delete</button>
```

### 4. Add Transitions

❌ **Don't:**
```tsx
<button className="bg-primary hover:bg-primary/90">
  Click me
</button>
```

✅ **Do:**
```tsx
<button className="bg-primary hover:bg-primary/90 transition-colors duration-base">
  Click me
</button>
```

### 5. Consider Responsive Design

❌ **Don't:**
```tsx
<div className="flex gap-4">
  <div className="w-1/3">Column 1</div>
  <div className="w-1/3">Column 2</div>
  <div className="w-1/3">Column 3</div>
</div>
```

✅ **Do:**
```tsx
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/3">Column 1</div>
  <div className="w-full md:w-1/3">Column 2</div>
  <div className="w-full md:w-1/3">Column 3</div>
</div>
```

### 6. Maintain Visual Hierarchy

❌ **Don't:**
```tsx
<div>
  <h1 className="text-base">Page Title</h1>
  <p className="text-xl">Body text</p>
</div>
```

✅ **Do:**
```tsx
<div className="space-y-2">
  <h1 className="text-4xl font-bold">Page Title</h1>
  <p className="text-base text-muted-foreground">Body text</p>
</div>
```

---

## Accessibility

### Color Contrast

All color combinations meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text).

**Testing Tools:**
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```tsx
// Good: Native button is keyboard accessible
<button onClick={handleClick}>Click me</button>

// Bad: Div with click handler isn't keyboard accessible
<div onClick={handleClick}>Click me</div>

// Fixed: Add proper keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

### Focus Indicators

Always maintain visible focus indicators:

```tsx
<button className="focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Accessible Button
</button>
```

### ARIA Labels

Provide proper labels for screen readers:

```tsx
// Icon button with aria-label
<button aria-label="Close modal">
  <svg>...</svg>
</button>

// Form input with associated label
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Semantic HTML

Use appropriate HTML elements:

```tsx
// Good: Semantic HTML
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Bad: Divs everywhere
<div>
  <div>
    <div onClick={goHome}>Home</div>
  </div>
</div>
```

---

## Resources

- **Design Tokens**: `src/lib/design-tokens.ts`
- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `src/styles/globals.css`
- **Component Showcase**: `/design-system` (see implementation below)

## Contributing

When adding new design tokens or components:

1. Add tokens to `src/lib/design-tokens.ts`
2. Update `tailwind.config.ts` if needed
3. Document in this file
4. Add examples to the design system showcase
5. Ensure accessibility compliance
6. Test in both light and dark modes

---

**Last Updated**: 2025-10-20
**Version**: 1.0.0
