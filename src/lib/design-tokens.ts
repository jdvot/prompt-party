/**
 * Design Tokens
 *
 * Central source of truth for design values used throughout the application.
 * These tokens ensure consistency and make it easier to maintain the design system.
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Brand Colors
  brand: {
    primary: 'hsl(222.2, 47.4%, 11.2%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(210, 40%, 96.1%)',
    secondaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
    accent: 'hsl(210, 40%, 96.1%)',
    accentForeground: 'hsl(222.2, 47.4%, 11.2%)',
  },

  // Semantic Colors
  semantic: {
    destructive: 'hsl(0, 84.2%, 60.2%)',
    destructiveForeground: 'hsl(210, 40%, 98%)',
    success: 'hsl(142, 76%, 36%)',
    successForeground: 'hsl(210, 40%, 98%)',
    warning: 'hsl(38, 92%, 50%)',
    warningForeground: 'hsl(222.2, 84%, 4.9%)',
    info: 'hsl(199, 89%, 48%)',
    infoForeground: 'hsl(210, 40%, 98%)',
  },

  // Neutral Colors
  neutral: {
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222.2, 84%, 4.9%)',
    muted: 'hsl(210, 40%, 96.1%)',
    mutedForeground: 'hsl(215.4, 16.3%, 46.9%)',
  },

  // Surface Colors
  surface: {
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(222.2, 84%, 4.9%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(222.2, 84%, 4.9%)',
  },

  // Border & Input
  border: {
    default: 'hsl(214.3, 31.8%, 91.4%)',
    input: 'hsl(214.3, 31.8%, 91.4%)',
    focus: 'hsl(222.2, 84%, 4.9%)',
  },

  // Dark Mode
  dark: {
    background: 'hsl(222.2, 84%, 4.9%)',
    foreground: 'hsl(210, 40%, 98%)',
    card: 'hsl(222.2, 84%, 4.9%)',
    cardForeground: 'hsl(210, 40%, 98%)',
    popover: 'hsl(222.2, 84%, 4.9%)',
    popoverForeground: 'hsl(210, 40%, 98%)',
    primary: 'hsl(210, 40%, 98%)',
    primaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
    secondary: 'hsl(217.2, 32.6%, 17.5%)',
    secondaryForeground: 'hsl(210, 40%, 98%)',
    muted: 'hsl(217.2, 32.6%, 17.5%)',
    mutedForeground: 'hsl(215, 20.2%, 65.1%)',
    accent: 'hsl(217.2, 32.6%, 17.5%)',
    accentForeground: 'hsl(210, 40%, 98%)',
    destructive: 'hsl(0, 62.8%, 30.6%)',
    destructiveForeground: 'hsl(210, 40%, 98%)',
    border: 'hsl(217.2, 32.6%, 17.5%)',
    input: 'hsl(217.2, 32.6%, 17.5%)',
    ring: 'hsl(212.7, 26.8%, 83.9%)',
  },
} as const

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },

  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  full: '9999px',
} as const

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  sticky: 1100,
  dropdown: 1150,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
} as const

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const animation = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

export const layout = {
  container: {
    center: true,
    padding: '2rem',
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1400px',
    },
  },
} as const
