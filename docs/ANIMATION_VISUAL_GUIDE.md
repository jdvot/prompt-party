# Animation Visual Guide

This guide provides a visual description of all animations implemented in the Prompt Party application.

---

## Home Page (`/`)

### Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [🌟 Badge]  ← Slides up, fades in (0.1s delay)           │
│                                                             │
│  Master the Art of                                         │
│  ╔═══════════════════╗                                     │
│  ║ AI Prompting     ║  ← Animated gradient (8s cycle)     │
│  ╚═══════════════════╝     shifts through colors          │
│                                                             │
│  Learn, create, and share...  ← Slides up (0.2s delay)    │
│                                                             │
│  [Get Started →]  [Explore]  ← Scale on hover             │
│   ↑ Lifts on hover            ↑ Smooth scale              │
│                                                             │
│  ┌────────┬────────┬────────┐                             │
│  │  200+  │  500+  │  100%  │  ← Stats counter            │
│  │ Bounce │ Bounce │ Bounce │     Spring animation        │
│  └────────┴────────┴────────┘     Staggered 0.15s         │
│                                                             │
│              ┌─────────────┐                               │
│              │             │  ← Illustration               │
│              │   [Image]   │     • Parallax (30px)         │
│              │      ∿      │     • Float (4s, 15px)        │
│              │     / \     │     • Zoom entrance (0.5s)    │
│              └─────────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

### Features Grid

```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│   [📚 Icon]     │   [✏️ Icon]      │   [👥 Icon]     │   [✨ Icon]      │
│   ↻ Rotate      │   ↻ Rotate      │   ↻ Rotate      │   ↻ Rotate      │
│   on hover      │   on hover      │   on hover      │   on hover      │
│                 │                 │                 │                 │
│  Learn          │  Create         │  Share          │  Optimize       │
│  ↑ Hover glow   │  ↑ Hover glow   │  ↑ Hover glow   │  ↑ Hover glow   │
│  ↑ Lifts -4px   │  ↑ Lifts -4px   │  ↑ Lifts -4px   │  ↑ Lifts -4px   │
│                 │                 │                 │                 │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
     ↑ Stagger         ↑ Stagger        ↑ Stagger        ↑ Stagger
     0.0s              0.1s             0.2s             0.3s
```

### Steps Section

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│            (1)━━━━━━━━━(2)━━━━━━━━━(3)                        │
│             │           │           │                          │
│             ↓           ↓           ↓                          │
│        ┌────────┐  ┌────────┐  ┌────────┐                    │
│        │   🔍   │  │   ✏️   │  │   👥   │                     │
│        │        │  │        │  │        │                     │
│        │Discover│  │ Create │  │ Share  │                     │
│        │        │  │        │  │        │                     │
│        └────────┘  └────────┘  └────────┘                    │
│            ↑           ↑           ↑                           │
│        Hover lift  Hover lift  Hover lift                     │
│        -8px        -8px        -8px                           │
│                                                                │
│        Step badges rotate 360° on hover                       │
│        Connecting lines animate from left (0.5s + index*0.2s) │
└────────────────────────────────────────────────────────────────┘
```

### CTA Section

```
┌─────────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ← Animated grid    │
│  ░ ┌───────┐                    ░     pattern         │
│  ░ │   🚀  │  ← Floating (3s)   ░     (2s cycle)      │
│  ░ └───────┘     + Glow pulse   ░                     │
│  ░                               ░                     │
│  ░  Ready to Start?              ░  ← Zoom in (0.2s)  │
│  ░  Begin your journey...        ░                     │
│  ░                               ░                     │
│  ░  [Start →] [View Pricing]    ░  ← Scale on hover   │
│  ░                               ░                     │
│  ░  No credit card required      ░  ← Fade in (0.6s)  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                      │
└─────────────────────────────────────────────────────────┘
```

---

## Trending Page (`/trending`)

### Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [🔥 Badge]  ← Pulse scale [1, 1.05, 1] (2s cycle)       │
│                                                             │
│  Discover                                                   │
│  ╔═══════════════════╗                                     │
│  ║ Trending Prompts ║  ← Fire gradient animation          │
│  ╚═══════════════════╝     Orange→Red→Pink (5s cycle)     │
│                                                             │
│  Explore the most popular...  ← Slides up (0.2s delay)    │
│                                                             │
│  ┌────────┬────────┬────────┐                             │
│  │  50+   │  1.2k  │   7d   │  ← Stats counter            │
│  │ Spring │ Spring │ Spring │     Spring physics           │
│  │ 200    │ 200    │ 200    │     Staggered 0.15s         │
│  └────────┴────────┴────────┘                             │
│                                                             │
│              ┌─────────────┐                               │
│              │             │  ← Illustration               │
│              │   [Fire]    │     • Parallax (40px)         │
│              │      ∿      │     • Float (3.5s, 12px)      │
│              │     🔥      │     • Fire glow pulse (2s)    │
│              └─────────────┘     • Zoom entrance (0.4s)    │
└─────────────────────────────────────────────────────────────┘
```

### Feed Section Header

```
┌────────────────────────────────────────────────────────┐
│  ┌────┐                                                │
│  │ 📈 │  Top Prompts      [Last 7 days]               │
│  └────┘  ↑                     ↑                       │
│          Most popular...    Scale on hover            │
│          ↑                                             │
│     Rotate 360° on hover (0.6s)                       │
│                                                        │
│  ──────────────────────────────────────────────       │
│                                                        │
│  [Prompt cards appear with fade-in...]                │
└────────────────────────────────────────────────────────┘
```

---

## Wizard Page (`/prompts/wizard`)

### Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [✨ Badge]  ← Rotate + Scale animation (4s cycle)         │
│               rotate: [0, 5, -5, 0]                        │
│               scale: [1, 1.05, 1]                          │
│                                                             │
│  ╔═══════════════════════╗                                 │
│  ║ AI Prompt Wizard     ║  ← Gradient animation           │
│  ╚═══════════════════════╝     8s linear cycle            │
│                                                             │
│  Generate perfect prompts...  ← Slides up (0.3s delay)    │
│                                                             │
│              ┌─────────────┐                               │
│              │             │  ← Illustration               │
│              │  [Student]  │     • Parallax (25px)         │
│              │      ∿      │     • Float (4s, 12px)        │
│              │     ⭐      │     • Purple glow (3s)        │
│              └─────────────┘     • Scale on hover (1.05x)  │
│                                  • Zoom entrance (0.4s)    │
└─────────────────────────────────────────────────────────────┘
```

### Wizard Form

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  [Wizard form slides up with fade after 0.6s delay]   │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │  Step 1: Select prompt type...               │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
│  [Form maintains normal interactivity]                │
│  [No animation interference during input]             │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Animation Timing Diagram

### Page Load Sequence

```
Time →
0.0s  |████| Background/Layout renders
      |
0.1s  |    |████| Badge appears (slide-up)
      |
0.2s  |         |████| Title appears (slide-up)
      |
0.3s  |              |████| Subtitle appears (slide-up)
      |
0.4s  |                   |████| Buttons appear (slide-up)
      |              |████| Stats begin (stagger)
      |
0.5s  |                        |████████| Illustration (zoom + float)
      |
0.6s  |                                 | ← User can interact
      ▼
```

### Scroll Animation Trigger Points

```
Viewport:
┌──────────────────────┐
│                      │  ← Top of viewport
│                      │
│    [100px margin]    │  ← Animation trigger zone begins
│    ┌────────────┐    │     (Intersection Observer)
│    │  Element   │    │  ← Element enters, animation starts
│    │  Animates  │    │
│    └────────────┘    │
│                      │
│                      │  ← Bottom of viewport
└──────────────────────┘
```

---

## Interactive States

### Button States

```
Normal:    [Get Started →]
           └─ shadow-lg

Hover:     [Get Started →]  ↑ -2px lift
           └─ shadow-xl (larger)
           └─ scale(1.05)

Tap:       [Get Started →]  ↓ pressed
           └─ scale(0.95)

Focus:     [Get Started →]
           └─ ring-2 ring-primary
```

### Card States

```
Normal:    ┌──────────────┐
           │    [Icon]    │
           │              │
           │    Title     │
           └──────────────┘

Hover:     ┌──────────────┐  ↑ -4px lift
           │  [Icon ↻]    │  ← Icon rotates
           │  scale(1.1)  │
           │    Title     │  ← Text color changes
           └──────────────┘  ← Border glows
           └─ shadow-lg (enhanced)
```

### Stats Counter Animation

```
Stage 1:   0   ← opacity: 0, scale: 0.5

Stage 2:   0   ← Spring animation begins
           ↓
Stage 3:   100 ← Target value appears
           ↑      opacity: 1, scale: 1
           └─ Spring stiffness: 200

Hover:     110 ← Slight lift and scale
           ↑      y: -4px, scale: 1.05
```

---

## Parallax Effect Visualization

### Scroll Direction: Down ↓

```
Layer 1 (Background): Moves up slowly
╔═════════════════════╗
║   ↑ (speed: 0.5x)  ║
║                     ║
╚═════════════════════╝

Layer 2 (Illustration): Moves up faster
  ┌───────────────┐
  │ ↑ (speed: 1x) │
  │               │
  └───────────────┘

Layer 3 (Foreground): Moves up fastest
    ┌─────────┐
    │↑(1.5x)  │
    └─────────┘

Result: Depth perception through differential motion
```

---

## Float Animation Cycle

```
Time:    0s      1s      2s      3s      4s
         │       │       │       │       │
         ↓       ↓       ↓       ↓       ↓
Y-Pos:   0px ─→ -10px ─→ 0px ─→ +10px ─→ 0px
Rotate:  0° ──→  -2° ──→  0° ──→  +2° ──→  0°

Visual:
  0s:  🎯        Normal position
  1s:    🎯      Floated up, rotated left
  2s:  🎯        Back to normal
  3s:  🎯        Floated down, rotated right
  4s:  🎯        Back to normal (cycle repeats)
```

---

## Gradient Animation

### Text Gradient Shift

```
Frame 1:  [▓▓▓░░░] Text
          Gradient at 0% position

Frame 2:  [░▓▓▓░░] Text
          Gradient at 50% position

Frame 3:  [░░▓▓▓░] Text
          Gradient at 100% position

Frame 4:  [▓▓▓░░░] Text
          Back to start (seamless loop)

Colors shift: Indigo → Violet → Cyan → Indigo
Duration: 8s continuous
```

---

## Stagger Animation

### Feature Grid (4 items)

```
Item 1:  ██████       (0.0s delay)
Item 2:    ██████     (0.1s delay)
Item 3:      ██████   (0.2s delay)
Item 4:        ██████ (0.3s delay)

Timeline:
0.0s ─┐
      └→ Item 1 starts
0.1s ─┐
      └→ Item 2 starts
0.2s ─┐
      └→ Item 3 starts
0.3s ─┐
      └→ Item 4 starts

All complete by 0.9s (0.3s + 0.6s duration)
```

---

## Glow Effect

### Fire Glow (Trending Page)

```
Stage 1: ◯           Stage 2: ◉           Stage 3: ◯
         Normal               Max glow              Normal

Shadow:  0 0 20px           0 0 40px              0 0 20px
         rgba(249,115,22)   rgba(239,68,68)       rgba(249,115,22)
         0.3 opacity         0.4 opacity           0.3 opacity

Duration: 2s ease-in-out infinite
```

### Purple Glow (Wizard Page)

```
Stage 1: ◯           Stage 2: ◉           Stage 3: ◯
         Normal               Max glow              Normal

Shadow:  0 0 20px           0 0 40px              0 0 20px
         rgba(99,102,241)   rgba(139,92,246)      rgba(99,102,241)
         0.3 opacity         0.4 opacity           0.3 opacity

Duration: 3s ease-in-out infinite
```

---

## Mobile Behavior

### Responsive Adjustments

```
Desktop (lg+):              Mobile (< lg):
┌──────┬──────┐            ┌──────────┐
│ Text │ Img  │            │   Text   │
│      │  ∿   │            └──────────┘
└──────┴──────┘
• Parallax: 30px           • Parallax: 15px (reduced)
• Float: 15px              • Float: 8px (reduced)
• 2-column grid            • Single column
• Hover effects            • Tap effects
```

---

## Performance Indicators

### Animation Properties Used

```
✅ transform: translate    (GPU accelerated)
✅ transform: scale        (GPU accelerated)
✅ transform: rotate       (GPU accelerated)
✅ opacity                 (GPU accelerated)
✅ filter: drop-shadow     (GPU accelerated)

❌ width/height            (Avoid - causes reflow)
❌ top/left                (Avoid - causes reflow)
❌ margin/padding          (Avoid - causes reflow)
```

### Frame Budget

```
Target: 60fps = 16.67ms per frame

Animation Breakdown:
┌──────────────────────────────┐
│ Render:    4ms   ████        │
│ Paint:     3ms   ███         │
│ Composite: 2ms   ██          │
│ Buffer:    7.67ms ███████    │
└──────────────────────────────┘
Total: 16.67ms ✅ On budget
```

---

## Color Palette

### Gradient Colors

**Primary Gradient (Home):**
```
Indigo → Violet → Cyan
#6366f1 → #8b5cf6 → #22d3ee
```

**Fire Gradient (Trending):**
```
Orange → Red → Pink
#ea580c → #dc2626 → #ec4899
```

**Purple Gradient (Wizard):**
```
Indigo → Violet → Purple
#6366f1 → #8b5cf6 → #a855f7
```

---

## Quick Reference

### Animation Component Selection

```
Need scroll-triggered animation?
└─→ Use AnimatedContainer

Need list/grid animation?
└─→ Use StaggerContainer

Need depth/parallax?
└─→ Use ParallaxContainer

Need floating effect?
└─→ Use FloatingElement

Need hover interaction?
└─→ Use ScaleOnHover + motion.div

Need custom complex animation?
└─→ Use motion.div directly
```

---

**Visual Guide Version:** 1.0.0
**Last Updated:** November 6, 2025
**Status:** ✅ Complete
