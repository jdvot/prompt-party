# Badge Component Usage Guide

## Overview

The Badge component is a versatile UI element for displaying labels, statuses, tags, and metadata. This guide covers proper usage patterns, especially for **perfect icon alignment**.

## Critical Fix: Icon Alignment

### Problem

Previously, icons inside badges were misaligned with text due to:
- Incorrect line-height inheritance
- Manual negative margins (hacky solution)
- Icons embedded directly as children instead of using props

### Solution

The Badge component now has:
1. **`leading-none`** on the base component for perfect vertical centering
2. **`startIcon` and `endIcon` props** for proper icon placement
3. **Proper flexbox alignment** with `items-center` and `justify-center`
4. **Consistent gap spacing** based on badge size

## Proper Usage

### ✅ CORRECT: Using startIcon/endIcon Props

```tsx
import { Badge } from '@/components/ui/badge'
import { SparklesIcon, CheckCircle2Icon } from 'lucide-react'

// Small badge
<Badge
  size="sm"
  variant="soft"
  startIcon={<SparklesIcon className="w-3 h-3" />}
>
  Small Badge
</Badge>

// Medium badge (default)
<Badge
  size="md"
  variant="soft"
  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
>
  Maîtrisez l'ingénierie de prompts IA
</Badge>

// Large badge
<Badge
  size="lg"
  variant="gradient"
  startIcon={<SparklesIcon className="w-4 h-4" />}
  endIcon={<CheckCircle2Icon className="w-4 h-4" />}
>
  Premium Feature
</Badge>
```

### ❌ INCORRECT: Inline Icons with Margins

```tsx
// DON'T DO THIS - Icons will be misaligned
<Badge variant="soft">
  <SparklesIcon className="w-3.5 h-3.5 mr-1.5" />
  Misaligned Badge
</Badge>
```

## Icon Sizing Guidelines

Use these icon sizes for perfect alignment:

| Badge Size | Icon Size Class | Actual Size |
|------------|-----------------|-------------|
| `sm`       | `w-3 h-3`       | 12px        |
| `md`       | `w-3.5 h-3.5`   | 14px        |
| `lg`       | `w-4 h-4`       | 16px        |

## Badge Variants

### Solid Variants
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
```

### Soft Variants (Recommended for Light Backgrounds)
```tsx
<Badge variant="soft">Soft Primary</Badge>
<Badge variant="softSecondary">Soft Secondary</Badge>
<Badge variant="softSuccess">Soft Success</Badge>
<Badge variant="softWarning">Soft Warning</Badge>
<Badge variant="softDestructive">Soft Destructive</Badge>
```

### Outline Variants
```tsx
<Badge variant="outline">Outline</Badge>
<Badge variant="outlinePrimary">Outline Primary</Badge>
<Badge variant="outlineSecondary">Outline Secondary</Badge>
```

### Special Variants
```tsx
<Badge variant="gradient">Gradient</Badge>
<Badge variant="glow">Glow Effect</Badge>
```

## Badge Shapes

```tsx
<Badge shape="default">Rounded Default</Badge>
<Badge shape="pill">Pill Shape</Badge>
<Badge shape="square">Square Corners</Badge>
```

## Status Indicators with Dots

```tsx
<Badge variant="softSuccess" dot dotColor="#22C55E">
  Active
</Badge>

<Badge variant="softWarning" dot dotColor="#F59E0B">
  Pending
</Badge>

<Badge variant="soft" dot dotColor="#94A3B8">
  Inactive
</Badge>
```

## Removable Badges

```tsx
<Badge
  variant="soft"
  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
  removable
  onRemove={() => console.log('Removed')}
>
  Removable Tag
</Badge>
```

## Real-World Examples

### Tutorial Header
```tsx
<Badge
  variant="soft"
  size="md"
  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
>
  Maîtrisez l'ingénierie de prompts IA
</Badge>
```

### Challenge Badge
```tsx
<Badge
  variant="soft"
  size="sm"
  startIcon={<TrophyIcon className="w-3 h-3" />}
  className="bg-violet-500/10 text-violet-700 dark:text-violet-400"
>
  Monthly Challenge
</Badge>
```

### Feature Highlight
```tsx
<Badge
  variant="gradient"
  size="lg"
  startIcon={<ZapIcon className="w-4 h-4" />}
>
  Premium Feature
</Badge>
```

### Status Badge Group
```tsx
import { BadgeGroup } from '@/components/ui/badge'

<BadgeGroup spacing="md">
  <Badge variant="softSuccess" size="sm" dot>Active</Badge>
  <Badge variant="softWarning" size="sm" dot>Pending</Badge>
  <Badge variant="soft" size="sm" dot>Draft</Badge>
</BadgeGroup>
```

## Accessibility Considerations

1. **Semantic Usage**: Use badges for metadata, not critical actions
2. **Color Contrast**: All badge variants meet WCAG AA standards
3. **Icon Accessibility**: Icons have `aria-hidden="true"` by default
4. **Removable Badges**: Remove buttons have proper `aria-label`

```tsx
// Good - Clear semantic meaning
<Badge variant="softSuccess">Completed</Badge>

// Avoid - Don't use for important actions
// ❌ <Badge>Click to Submit</Badge>
```

## Dark Mode

All badge variants automatically adapt to dark mode with proper contrast ratios:

```tsx
// Works perfectly in both light and dark mode
<Badge variant="soft">Adapts to Theme</Badge>
<Badge variant="gradient">Always Readable</Badge>
```

## Migration Guide

If you have existing badges with inline icons, update them:

### Before
```tsx
<Badge variant="soft" className="text-sm">
  <SparklesIcon className="w-3.5 h-3.5 mr-1.5" />
  Old Badge
</Badge>
```

### After
```tsx
<Badge
  variant="soft"
  size="md"
  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
>
  New Badge
</Badge>
```

## Testing

A comprehensive test page is available at:
- **Route**: `/design-system-test/badge-test`
- **Tests**: All sizes, variants, shapes, and icon combinations
- **Purpose**: Visual verification of icon alignment in light/dark modes

## Common Mistakes to Avoid

1. ❌ **Don't** add margin classes to icons (`mr-1`, `ml-1`, etc.)
2. ❌ **Don't** embed icons directly as children
3. ❌ **Don't** use mismatched icon sizes (e.g., `w-4 h-4` on `sm` badge)
4. ❌ **Don't** override `line-height` on badge content
5. ✅ **Do** use `startIcon`/`endIcon` props
6. ✅ **Do** match icon size to badge size
7. ✅ **Do** use semantic variant names
8. ✅ **Do** test in both light and dark modes

## Performance Notes

- Badge components are lightweight (~2KB gzipped)
- Icons are tree-shaken when using lucide-react
- No runtime performance impact from icon alignment fix
- Server-rendered by default (no hydration issues)

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Flexbox alignment works in IE11+ (if needed)
- Perfect rendering on mobile devices
- Tested on iOS Safari, Chrome Mobile, Samsung Internet

## Design Tokens

Badge styling uses Tailwind CSS design tokens:

```typescript
// From tailwind.config.ts
colors: {
  primary: 'hsl(var(--primary))',
  success: 'hsl(var(--success))',
  warning: 'hsl(var(--warning))',
  // ... etc
}

// Badge sizes use consistent spacing scale
sm: 'h-5 px-2 text-xs gap-1.5',
md: 'h-6 px-2.5 text-xs gap-1.5',
lg: 'h-7 px-3 text-sm gap-2',
```

## Summary

The Badge component now provides:
- ✅ **Perfect icon alignment** across all sizes
- ✅ **Consistent API** with `startIcon`/`endIcon` props
- ✅ **Accessibility** built-in
- ✅ **Dark mode** support
- ✅ **TypeScript** types
- ✅ **Documentation** and examples

For questions or issues, refer to:
- Component source: `/src/components/ui/badge.tsx`
- Test page: `/src/app/design-system-test/badge-test/page.tsx`
- Design system: `/docs/DESIGN_SYSTEM.md`
