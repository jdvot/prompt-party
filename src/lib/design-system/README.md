# Prompt Party Design System

A comprehensive, production-ready design system built for scalability, accessibility, and premium aesthetics.

## Overview

The Prompt Party Design System provides a complete foundation for building consistent, beautiful, and accessible user interfaces. It includes:

- **Design Tokens**: Centralized source of truth for colors, typography, spacing, shadows, and animations
- **Component Library**: Production-ready React components built with Shadcn UI patterns
- **Layout Primitives**: Flexible layout components for building responsive interfaces
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive keyboard navigation
- **Dark Mode**: Full dark mode support with semantic color tokens
- **TypeScript**: Complete type safety and autocomplete support

## Philosophy

### Design Principles

1. **Accessibility First**: Every component meets WCAG AA standards minimum
2. **Progressive Enhancement**: Start with semantic HTML, enhance with JavaScript
3. **Performance**: Tree-shakeable tokens, minimal CSS footprint, GPU-accelerated animations
4. **Consistency**: Token-based system ensures visual and functional consistency
5. **Developer Experience**: Clear APIs, TypeScript support, comprehensive documentation

### Brand Identity

The design system embodies a premium, modern aesthetic with:

- **Color Palette**: Purple/pink/blue gradient scheme conveying creativity and innovation
- **Typography**: Clear hierarchy optimized for readability
- **Spacing**: 8px grid system for pixel-perfect layouts
- **Motion**: Smooth, purposeful animations that enhance UX

## Getting Started

### Installation

The design system is already integrated into the project. Import tokens and components as needed:

```typescript
// Import design tokens
import { designTokens } from '@/lib/design-system'

// Import individual token sets
import { colors, typography, spacing } from '@/lib/design-system'

// Import components
import { Button, Card, Badge } from '@/components/ui'
import { Stack, Grid, Flex } from '@/components/layout'
```

### Basic Usage

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Stack } from '@/components/layout/stack'

function Example() {
  return (
    <Card variant="bento" padding="lg">
      <Stack spacing="lg">
        <h2 className="text-2xl font-bold">Welcome</h2>
        <p className="text-muted-foreground">
          Get started with the design system
        </p>
        <Button variant="gradient" size="lg">
          Explore Components
        </Button>
      </Stack>
    </Card>
  )
}
```

## Design Tokens

### Colors

The color system provides semantic tokens for consistent color usage:

```typescript
import { colors } from '@/lib/design-system/colors'

// Brand colors
colors.brand.primary[500]   // Main brand purple
colors.brand.secondary[500] // Electric blue
colors.brand.accent[500]    // Magenta accent

// Semantic colors
colors.semantic.success.light.DEFAULT  // Success green
colors.semantic.error.light.DEFAULT    // Error red
colors.semantic.warning.light.DEFAULT  // Warning orange

// Neutral colors
colors.neutral.light[900]  // Dark text
colors.neutral.light[100]  // Light background

// Gradients
colors.gradients.primary    // Purple to magenta
colors.gradients.vibrant    // Multi-color gradient
```

**CSS Usage:**

```css
/* Use HSL custom properties */
.element {
  background-color: hsl(var(--brand-primary));
  color: hsl(var(--brand-primary-foreground));
}

/* Use Tailwind classes */
.element {
  @apply bg-brand-primary text-white;
}
```

### Typography

Type scale based on 1.25 ratio with semantic text styles:

```typescript
import { typography } from '@/lib/design-system/typography'

// Font sizes
typography.fontSize.xs      // 12px
typography.fontSize.base    // 16px
typography.fontSize['4xl']  // 36px

// Text styles (semantic)
typography.textStyle.h1             // Heading 1
typography.textStyle.body           // Body text
typography.textStyle.caption        // Small text
typography.textStyle.overline       // Uppercase labels

// Responsive styles
typography.responsive.hero.base     // Mobile hero
typography.responsive.hero.md       // Desktop hero
```

**CSS Usage:**

```tsx
<h1 className="text-4xl font-bold tracking-tight">
  Hero Heading
</h1>

<p className="text-base leading-relaxed text-muted-foreground">
  Body paragraph text
</p>
```

### Spacing

8px-based spacing system:

```typescript
import { spacingSystem } from '@/lib/design-system/spacing'

// Base spacing
spacingSystem.spacing[4]    // 16px (1rem)
spacingSystem.spacing[8]    // 32px (2rem)

// Semantic spacing
spacingSystem.semantic.padding.md      // Standard padding
spacingSystem.semantic.gap.lg          // Large gap
spacingSystem.semantic.section.xl      // Extra large section spacing
```

**CSS Usage:**

```tsx
<div className="p-6 gap-4">        {/* 24px padding, 16px gap */}
<div className="space-y-8">        {/* 32px vertical spacing */}
<div className="mt-12">            {/* 48px top margin */}
```

### Shadows

6-level elevation system with colored glows:

```typescript
import { shadows } from '@/lib/design-system/shadows'

// Elevation shadows
shadows.elevation[1]    // Subtle shadow
shadows.elevation[4]    // Strong shadow

// Glow effects
shadows.glow.primary.lg       // Large purple glow
shadows.glow.success.md       // Medium green glow

// Component shadows
shadows.component.card.hover  // Card hover shadow
shadows.component.modal.content
```

**CSS Usage:**

```tsx
<div className="shadow-elevation-3">
<div className="shadow-glow-primary">
<button className="hover:shadow-xl">
```

### Animations

Comprehensive animation system with easing curves:

```typescript
import { animations } from '@/lib/design-system/animations'

// Durations
animations.duration.fast    // 150ms
animations.duration.normal  // 300ms

// Easings
animations.easing.smooth    // cubic-bezier(0.4, 0, 0.2, 1)
animations.easing.spring    // cubic-bezier(0.34, 1.56, 0.64, 1)

// Presets
animations.preset.fadeIn
animations.preset.scaleIn
animations.preset.slideInFromBottom

// Microinteractions
animations.microinteraction.hoverLift
animations.microinteraction.buttonPress
```

**CSS Usage:**

```tsx
<div className="animate-fade-in-up">
<div className="transition-all duration-300 ease-smooth">
<div className="hover:-translate-y-1">
```

## Component Library

### Button

Versatile button component with multiple variants:

```tsx
import { Button } from '@/components/ui/button'

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="gradient">Gradient Style</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With loading state
<Button loading>Processing...</Button>

// With icon
<Button>
  <Plus className="h-4 w-4" />
  Add New
</Button>
```

### Card

Flexible card component with variants:

```tsx
import { Card } from '@/components/ui/card'

// Variants
<Card variant="default">Standard Card</Card>
<Card variant="bento">Modern Bento Card</Card>
<Card variant="interactive">Clickable Card</Card>
<Card variant="glass">Glassmorphism</Card>

// With subcomponents
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
```

### Input

Enhanced input with validation and icons:

```tsx
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

// Basic
<Input placeholder="Enter text..." />

// With icons
<Input
  startIcon={<Search className="h-4 w-4" />}
  placeholder="Search..."
/>

// Validation states
<Input
  errorText="Invalid email format"
  value={email}
/>

<Input
  successText="Available!"
  value={username}
/>

// With character limit
<Input
  maxCharacters={100}
  showCharacterCount
  placeholder="Bio"
/>

// Clearable
<Input
  clearable
  onClear={() => setValue('')}
/>
```

### Badge

Flexible badge component with status support:

```tsx
import { Badge, StatusBadge, CountBadge } from '@/components/ui/badge'

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="soft">Soft Background</Badge>
<Badge variant="outline">Outlined</Badge>
<Badge variant="gradient">Gradient</Badge>

// With dot indicator
<Badge dot dotColor="#10b981">Active</Badge>

// Status badges
<StatusBadge status="success" />
<StatusBadge status="pending" />
<StatusBadge status="error" />

// Count badge
<CountBadge count={42} />
<CountBadge count={150} max={99} /> {/* Shows "99+" */}

// Removable
<Badge removable onRemove={() => console.log('removed')}>
  Tag
</Badge>
```

## Layout Primitives

### Stack

Flexbox-based layout with automatic spacing:

```tsx
import { Stack, VStack, HStack } from '@/components/layout/stack'

// Vertical stack
<VStack spacing="lg" align="start">
  <h2>Title</h2>
  <p>Description</p>
  <Button>Action</Button>
</VStack>

// Horizontal stack
<HStack spacing="md" justify="between">
  <span>Label</span>
  <Badge>New</Badge>
</HStack>

// With divider
<VStack divider={<Separator />}>
  <Item />
  <Item />
  <Item />
</VStack>
```

### Grid

Responsive grid layout:

```tsx
import { Grid } from '@/components/layout/grid'

// Auto-responsive grid
<Grid cols={3} gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Auto-fit grid
<Grid cols="auto-fit" gap="md" minWidth="280px">
  <ProductCard />
  <ProductCard />
  <ProductCard />
</Grid>
```

### Flex

Flexible layout component:

```tsx
import { Flex } from '@/components/layout/flex'

<Flex justify="between" align="center" gap="md">
  <Logo />
  <Navigation />
  <UserMenu />
</Flex>

<Flex direction="column" gap="lg">
  <Header />
  <Content />
  <Footer />
</Flex>
```

## Composite Components

### Empty State

Consistent empty states:

```tsx
import { EmptyState } from '@/components/ui/empty-state'

// Preset variants
<EmptyState variant="no-results" />
<EmptyState variant="empty-inbox" />
<EmptyState variant="error" />

// Custom
<EmptyState
  icon={FileQuestion}
  title="No prompts yet"
  description="Create your first AI prompt to get started"
  action={{
    label: "Create Prompt",
    onClick: () => createPrompt(),
  }}
/>
```

### Loading States

Multiple loading patterns:

```tsx
import { LoadingSkeleton, LoadingSpinner, LoadingPage } from '@/components/ui/loading-skeleton'

// Skeleton loaders
<LoadingSkeleton variant="card" count={3} />
<LoadingSkeleton variant="list" />
<LoadingSkeleton variant="profile" />

// Inline spinner
<LoadingSpinner size="md" label="Loading..." />

// Full page
<LoadingPage message="Loading your data..." />
```

## Accessibility

### Keyboard Navigation

All interactive components support full keyboard navigation:

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dropdowns
- **Arrow Keys**: Navigate within menus and lists

### Screen Reader Support

- Semantic HTML structure
- ARIA labels and descriptions
- Focus management
- Live regions for dynamic content

### Color Contrast

All color combinations meet WCAG AA standards:

- **Text**: Minimum 4.5:1 contrast ratio
- **UI Elements**: Minimum 3:1 contrast ratio
- **Focus Indicators**: Clearly visible on all interactive elements

### Motion Preferences

Respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

### Mobile-First Approach

All components are built mobile-first:

```tsx
// Responsive utilities
<div className="text-sm md:text-base lg:text-lg">
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="p-4 md:p-6 lg:p-8">
```

### Breakpoints

```typescript
xs:  475px   // Extra small devices
sm:  640px   // Small devices (phones)
md:  768px   // Medium devices (tablets)
lg:  1024px  // Large devices (desktops)
xl:  1280px  // Extra large devices
2xl: 1400px  // XXL devices
```

### Touch Targets

Minimum touch target size: 44x44px (WCAG 2.5.5)

## Dark Mode

Full dark mode support with semantic tokens:

```tsx
// Automatic based on system preference
<html className="dark">

// Manual toggle
<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</button>

// Component-specific dark mode styles
<div className="bg-white dark:bg-gray-900">
<div className="text-gray-900 dark:text-gray-100">
```

## Best Practices

### Component Composition

```tsx
// Good: Compose small, reusable components
<Card variant="bento">
  <Stack spacing="lg">
    <HStack justify="between">
      <CardTitle>Title</CardTitle>
      <Badge>New</Badge>
    </HStack>
    <CardContent>Content</CardContent>
  </Stack>
</Card>

// Avoid: Large, monolithic components
```

### Semantic HTML

```tsx
// Good: Use semantic elements
<article>
  <header>
    <h1>Title</h1>
  </header>
  <section>
    <p>Content</p>
  </section>
</article>

// Avoid: Div soup
<div>
  <div>
    <div>Title</div>
  </div>
</div>
```

### Consistent Spacing

```tsx
// Good: Use spacing tokens
<Stack spacing="md">
<div className="p-6 gap-4">

// Avoid: Arbitrary values
<div className="p-[13px] gap-[17px]">
```

## Contributing

When adding new components:

1. Follow existing patterns and conventions
2. Ensure WCAG AA compliance
3. Add TypeScript types
4. Support dark mode
5. Include documentation and examples
6. Test keyboard navigation
7. Test with screen readers

## Support

For questions or issues:

- Check the component documentation
- Review example usage in the codebase
- Refer to the Shadcn UI documentation for base components

## Version

**v1.0.0** - Production-ready design system

---

Built with love by the Prompt Party team.
