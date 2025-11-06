# Prompt Academy - Brand Assets

This directory contains all brand assets for the Prompt Academy application.

---

## 📁 Directory Structure

```
/public/branding/
├── icons/                    # App icons and favicons
├── logo/                     # Logo variations
│   ├── logo-full.svg        # Full logo with text
│   ├── logo-icon.svg        # Icon only
│   └── logo-wordmark.svg    # Text only
├── illustrations/            # Illustration library
│   ├── errors/              # Error page illustrations
│   │   ├── 404-not-found.svg
│   │   └── 500-server-error.svg
│   ├── empty-states/        # Empty state illustrations
│   │   ├── empty-bookmarks.svg
│   │   ├── empty-collections.svg
│   │   ├── empty-prompts.svg
│   │   └── empty-search.svg
│   ├── features/            # Feature illustrations
│   │   ├── learning-path.svg
│   │   └── success-celebration.svg
│   ├── onboarding/          # Onboarding illustrations
│   │   └── authentication.svg
│   └── hero-student-learning.svg
├── og-image.svg             # Social media preview image
├── ILLUSTRATION_GALLERY.md  # Visual showcase
└── README.md                # This file
```

---

## 🎨 Brand Guidelines

### Color Palette

**Primary Colors:**
- **Indigo** `#6366F1` - Primary brand color (trust, professionalism, tech)
- **Violet** `#8B5CF6` - Secondary color (creativity, innovation)
- **Cyan** `#22D3EE` - Accent color (energy, progression)

**Semantic Colors:**
- **Success** `#10B981` - Emerald 500
- **Error** `#EF4444` - Red 500
- **Warning** `#F59E0B` - Amber 500
- **Info** `#3B82F6` - Blue 500

### Typography
- **Primary Font**: Inter (sans-serif)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Design Principles
1. **Educational** - Professional but accessible
2. **Modern** - Clean, tech-forward aesthetic
3. **Clear** - Interface clarity for learning
4. **Inspiring** - Encouraging and motivating

---

## 🖼️ Illustration System

### Overview
- **Total Illustrations**: 10 (9 new + 1 existing)
- **Total Size**: 78.6KB (optimized)
- **Format**: SVG with inline animations
- **Style**: Isometric, clean, modern, educational

### Categories

#### 1. Error Pages (2)
- 404 Not Found - Lost explorer with map
- 500 Server Error - Robot fixing gears

#### 2. Empty States (4)
- Empty Bookmarks - Open book with blank pages
- Empty Collections - Filing cabinet with empty drawers
- Empty Search - Magnifying glass with no results
- Empty Prompts - Empty text editor

#### 3. Features (2)
- Success Celebration - Trophy with confetti
- Learning Path - Progress journey visualization

#### 4. Onboarding (1)
- Authentication - Secure login illustration

#### 5. Hero (1)
- Student Learning - Homepage hero

---

## 📖 Documentation

### Quick Links
- **Illustration Gallery**: [`ILLUSTRATION_GALLERY.md`](./ILLUSTRATION_GALLERY.md) - Visual showcase
- **Comprehensive Guide**: [`/docs/ILLUSTRATIONS.md`](/docs/ILLUSTRATIONS.md) - Full documentation
- **Design System**: [`/docs/DESIGN_SYSTEM.md`](/docs/DESIGN_SYSTEM.md) - Brand guidelines
- **Implementation Summary**: [`/ILLUSTRATION_SUMMARY.md`](/ILLUSTRATION_SUMMARY.md) - Project overview

---

## 🚀 Usage

### In Next.js Pages
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

### With EmptyState Component
```tsx
import { EmptyState } from '@/components/ui/empty-state'

<EmptyState
  illustrationSrc="/branding/illustrations/empty-states/empty-bookmarks.svg"
  title="No Bookmarks Yet"
  description="Start saving your favorites..."
  size="lg"
  action={{
    label: 'Browse Tutorials',
    onClick: () => {},
  }}
/>
```

### As Regular Image
```tsx
<img
  src="/branding/illustrations/features/success-celebration.svg"
  alt="Success!"
  className="w-full max-w-sm h-auto"
/>
```

---

## ✅ Quality Standards

### Design
- ✅ Follows brand color palette exclusively
- ✅ Consistent isometric/modern style
- ✅ Educational and approachable tone
- ✅ Minimalist and clean aesthetic

### Technical
- ✅ Optimized SVG (< 11KB per file)
- ✅ Inline animations (no external dependencies)
- ✅ Performance optimized
- ✅ Mobile responsive

### Accessibility
- ✅ WCAG AA color contrast
- ✅ Descriptive alt text
- ✅ Works in light/dark mode
- ✅ Respects `prefers-reduced-motion`
- ✅ Keyboard navigation support

---

## 🎯 Integration Status

| Asset Type | Status | Notes |
|------------|--------|-------|
| Logos | ✅ Complete | Multiple variations available |
| Icons | ✅ Complete | Favicon and app icons |
| Error Illustrations | ✅ Integrated | 404 and 500 pages updated |
| Empty State Illustrations | 🔄 Partial | 2 of 4 integrated, 2 ready |
| Feature Illustrations | 🔄 Ready | Awaiting integration |
| Onboarding Illustrations | 🔄 Ready | Awaiting integration |
| OG Image | ✅ Complete | Social media preview |

---

## 📊 File Statistics

### By Category
```
Error Pages:      13.6KB  (2 files)
Empty States:     28.3KB  (4 files)
Features:         21.0KB  (2 files)
Onboarding:        9.7KB  (1 file)
Hero:              6.0KB  (1 file)
-----------------------------------
Total:            78.6KB  (10 files)
```

### Performance
- Average file size: **7.86KB**
- Largest file: 11KB (learning-path.svg)
- Smallest file: 5.8KB (empty-bookmarks.svg)
- All files under 11KB ✅

---

## 🛠️ Maintenance

### Adding New Illustrations

1. **Follow naming convention**: `category-name.svg`
2. **Use brand colors only**: Indigo, Violet, Cyan
3. **Optimize file size**: Target < 10KB
4. **Include animations**: Subtle, 2-3s duration
5. **Test accessibility**: Color contrast, alt text, reduced motion
6. **Document**: Add to ILLUSTRATION_GALLERY.md

### Updating Existing Illustrations

1. Maintain current dimensions
2. Keep animation duration consistent
3. Test in light/dark mode
4. Update documentation if needed
5. Check integration points

---

## 🎓 Educational Theme

All assets reinforce the Prompt Academy brand identity:

- **Graduation cap** motif in logo and illustrations
- **Learning journey** visualizations
- **Educational** color psychology (trust, creativity)
- **Friendly** and approachable character design
- **Professional** but not corporate

---

## 📝 Notes

### File Formats
- **SVG**: All illustrations and logos (scalable)
- **PNG**: Fallback for older browsers (if needed)
- **ICO**: Favicon

### Optimization
- All SVGs are hand-optimized
- Gradient definitions reused
- Unnecessary attributes removed
- Path simplification applied

### Browser Support
- Modern browsers: Full support
- IE11: Basic support (no animations)
- Mobile: Full support
- Dark mode: Automatic adaptation

---

## 📮 Contact

For questions about brand assets or design guidelines:
- Review `/docs/DESIGN_SYSTEM.md`
- Check `/docs/ILLUSTRATIONS.md`
- See implementation examples in codebase

---

## 📜 License

All brand assets are proprietary to Prompt Academy.

---

**Version**: 1.0
**Last Updated**: November 2025
**Maintained by**: Prompt Academy Design Team
