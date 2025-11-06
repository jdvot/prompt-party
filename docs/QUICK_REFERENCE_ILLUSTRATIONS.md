# Quick Reference: Illustrations Integration

## 📍 Where to Find Each Illustration

| Illustration File | Page/Component | Location |
|-------------------|----------------|----------|
| `challenge-trophy.svg` | Challenges Page | `/app/challenges/page.tsx` (hero) |
| `leaderboard-podium.svg` | Leaderboard Page | `/app/leaderboard/page.tsx` (hero) |
| `learning-path.svg` | Tutorials Page | `/app/tutorials/page.tsx` (hero) |
| `authentication.svg` | Login & Signup | `/app/auth/login/page.tsx` + `/app/auth/signup/page.tsx` |
| `empty-search.svg` | Search Results | `/app/search/page.tsx` (empty state) |
| `empty-prompts.svg` | User Profile | `/app/profile/[username]/page.tsx` (empty state) |
| `success-celebration.svg` | Success Modal | `/components/ui/success-celebration.tsx` (reusable) |

## 🎨 Design Tokens

### Illustration Sizes
```tsx
// Hero illustrations (feature pages)
width={400} height={400}  // Challenges, Leaderboard
width={500} height={500}  // Tutorials, Auth

// Empty state illustrations
width={256} height={256}  // Search, Profile

// Success modal
width={192} height={192}  // Success celebration
```

### Gradient Glows
```tsx
// Yellow/Orange (Challenges, Leaderboard)
className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse"

// Violet/Indigo/Cyan (Tutorials, Auth, Empty States)
className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"

// Green/Emerald (Success)
className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse"
```

### Animations
```tsx
// Hero entrance
className="animate-in fade-in slide-in-from-right-4 duration-700"

// Empty state entrance
className="animate-in fade-in zoom-in duration-500"

// Hover effect
className="hover:scale-105 transition-transform duration-500"

// Drop shadow
className="drop-shadow-2xl"  // Hero
className="drop-shadow-lg"   // Empty states
```

## 🚀 Code Snippets

### Add Hero Illustration
```tsx
import Image from 'next/image'

// In your page component
<div className="grid lg:grid-cols-2 gap-12 items-center py-8">
  {/* Content */}
  <div className="text-center lg:text-left">
    <h1>Your Title</h1>
    <p>Your description</p>
  </div>

  {/* Illustration */}
  <div className="hidden lg:block relative">
    <div className="relative aspect-square max-w-md mx-auto animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <Image
        src="/branding/illustrations/features/your-illustration.svg"
        alt="Description"
        width={400}
        height={400}
        className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        priority
      />
    </div>
  </div>
</div>
```

### Add Empty State Illustration
```tsx
import Image from 'next/image'

{items.length === 0 ? (
  <div className="text-center py-16 max-w-2xl mx-auto">
    <div className="relative w-64 h-64 mx-auto mb-8 animate-in fade-in zoom-in duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-cyan-500/10 rounded-full blur-2xl" />
      <Image
        src="/branding/illustrations/empty-states/your-empty-state.svg"
        alt="No items"
        width={256}
        height={256}
        className="relative z-10 drop-shadow-lg"
      />
    </div>
    <h3 className="text-3xl font-bold mb-3">No items found</h3>
    <p className="text-lg text-muted-foreground mb-6">
      Try a different search or create a new item
    </p>
  </div>
) : (
  // Your items list
)}
```

### Add Success Celebration
```tsx
'use client'

import { useState } from 'react'
import { SuccessCelebration } from '@/components/ui/success-celebration'

export default function MyPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAction = async () => {
    // Your action logic
    await createItem()

    // Show success
    setShowSuccess(true)
  }

  return (
    <>
      <button onClick={handleAction}>Create Item</button>

      <SuccessCelebration
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success!"
        message="Your item was created successfully"
        duration={3000}
        showConfetti={true}
      />
    </>
  )
}
```

## 🎯 Common Patterns

### Pattern: 2-Column Hero
**When to use**: Feature pages (Challenges, Leaderboard, Tutorials, Auth)
**Breakpoint**: `lg:grid-cols-2` (1024px)
**Illustration side**: Right
**Content side**: Left

### Pattern: Centered Empty State
**When to use**: Empty lists, no results, empty searches
**Size**: 256x256px
**Position**: Center
**Elements**: Illustration → Heading → Description → CTAs (optional)

### Pattern: Success Modal
**When to use**: Successful actions (create, update, complete)
**Duration**: 3000ms default (customizable)
**Confetti**: 20 particles
**Auto-close**: Yes (optional)

## ⚡ Performance Tips

1. **Use `priority`** prop for hero illustrations (above the fold)
2. **Omit `priority`** for empty state illustrations (conditional render)
3. **Hide on mobile** with `hidden lg:block` to save bandwidth
4. **SVG optimization**: Already optimized in `/public/branding/illustrations/`
5. **Lazy load**: Next.js Image component handles this automatically

## 🎨 Customization Guide

### Change Glow Color
Replace gradient colors in the backdrop:
```tsx
// Before
from-violet-500/20 via-indigo-500/20 to-cyan-500/20

// After (e.g., for pink glow)
from-pink-500/20 via-rose-500/20 to-red-500/20
```

### Change Animation Speed
Adjust duration classes:
```tsx
// Slower
duration-1000

// Faster
duration-300

// Default
duration-500 or duration-700
```

### Disable Animations
```tsx
// Remove animation classes
// Before
className="animate-in fade-in zoom-in duration-500"

// After
className=""
```

### Adjust Illustration Size
```tsx
// Smaller
width={300} height={300}
className="max-w-sm"

// Larger
width={600} height={600}
className="max-w-xl"
```

## 🐛 Troubleshooting

### Illustration not showing
1. Check file path: `/branding/illustrations/...` (no leading slash in path)
2. Verify Image import: `import Image from 'next/image'`
3. Check responsive classes: `hidden lg:block` hides on mobile
4. Inspect browser console for 404 errors

### Animation not playing
1. Check CSS classes are applied: `animate-in fade-in`
2. Verify globals.css is imported in layout
3. Check for conflicting CSS
4. Test in different browser

### Glow not visible
1. Check gradient opacity: `/20` or `/10`
2. Verify dark mode compatibility
3. Adjust blur amount: `blur-2xl` or `blur-3xl`
4. Check if animation is applied: `animate-pulse`

### Success modal not closing
1. Check `onClose` prop is passed
2. Verify `isOpen` state is managed correctly
3. Test auto-close with `duration` prop
4. Check for JavaScript errors in console

## 📱 Mobile Considerations

All hero illustrations are **hidden on mobile** (`< 1024px`) to:
- Reduce page weight and improve load time
- Save vertical space on small screens
- Improve mobile UX with focused content

Empty state illustrations **remain visible on mobile** because:
- They're smaller (256x256px)
- They only appear conditionally (no items)
- They enhance the empty state UX

## 🌙 Dark Mode

All illustrations work in dark mode because:
- SVGs use theme-independent colors
- Gradient glows use opacity (works in any theme)
- No hard-coded colors in implementation
- CSS variables adapt to theme

## ♿ Accessibility

- All images have descriptive `alt` text
- Animations respect `prefers-reduced-motion`
- Success modal is keyboard accessible
- Color contrast meets WCAG AA standards
- Illustrations are decorative (don't convey critical info)

## 📊 Checklist for New Illustration

- [ ] File placed in correct subfolder (`/public/branding/illustrations/`)
- [ ] Import Next.js Image component
- [ ] Set appropriate width/height
- [ ] Add descriptive alt text
- [ ] Apply gradient glow backdrop
- [ ] Add entrance animation
- [ ] Apply drop shadow
- [ ] Test on desktop and mobile
- [ ] Test in light and dark mode
- [ ] Test with reduced motion preference
- [ ] Verify keyboard accessibility (if interactive)

## 🔗 Related Documentation

- [Full Integration Summary](./ILLUSTRATIONS_INTEGRATION_SUMMARY.md)
- [Visual Guide](./ILLUSTRATIONS_VISUAL_GUIDE.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Component Library](./COMPONENT_LIBRARY.md)

---

**Last Updated**: 2025-11-06
**Maintained By**: UI/UX Design System Team
