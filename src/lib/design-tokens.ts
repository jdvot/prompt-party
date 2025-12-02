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

  /**
   * Font Sizes with Line Heights (POR-32)
   * Heading sizes (xl+) include tight letter-spacing for better readability
   */
  fontSize: {
    xs: { size: '0.75rem', lineHeight: '1rem' },           // 12px / 16px
    sm: { size: '0.875rem', lineHeight: '1.4rem' },        // 14px / 22.4px (1.6 ratio)
    base: { size: '1rem', lineHeight: '1.5rem' },          // 16px / 24px (1.5 ratio)
    lg: { size: '1.125rem', lineHeight: '1.75rem' },       // 18px / 28px
    xl: { size: '1.25rem', lineHeight: '1.75rem', letterSpacing: '-0.025em' },  // 20px
    '2xl': { size: '1.5rem', lineHeight: '2rem', letterSpacing: '-0.025em' },   // 24px
    '3xl': { size: '1.875rem', lineHeight: '2.25rem', letterSpacing: '-0.025em' }, // 30px
    '4xl': { size: '2.25rem', lineHeight: '2.5rem', letterSpacing: '-0.025em' },   // 36px
    '5xl': { size: '3rem', lineHeight: '1.2', letterSpacing: '-0.025em' },         // 48px
    '6xl': { size: '3.75rem', lineHeight: '1.1', letterSpacing: '-0.025em' },      // 60px
    '7xl': { size: '4.5rem', lineHeight: '1', letterSpacing: '-0.025em' },         // 72px
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

  // Letter Spacing (CSS Variables in globals.css)
  letterSpacing: {
    tighter: 'var(--tracking-tighter)',  // -0.05em
    tight: 'var(--tracking-tight)',      // -0.025em
    normal: 'var(--tracking-normal)',    // 0
    wide: 'var(--tracking-wide)',        // 0.025em
    wider: 'var(--tracking-wider)',      // 0.05em
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
  40: '10rem',    // 160px
} as const

// ============================================================================
// SECTION PADDING TOKENS (POR-29)
// ============================================================================

/**
 * Standardized section padding for consistent vertical rhythm
 * Used by the Section component with spacing variants
 */
export const sectionPadding = {
  /** No padding */
  none: { base: '0', md: '0', lg: '0' },
  /** Small: py-12 md:py-16 lg:py-20 */
  sm: { base: '3rem', md: '4rem', lg: '5rem' },
  /** Medium: py-24 md:py-32 lg:py-40 (Default) */
  md: { base: '6rem', md: '8rem', lg: '10rem' },
  /** Large: py-32 md:py-40 lg:py-48 */
  lg: { base: '8rem', md: '10rem', lg: '12rem' },
} as const

// ============================================================================
// ICON CONTAINER TOKENS (POR-30)
// ============================================================================

/**
 * Standardized icon container sizes
 * Used by the IconContainer component
 */
export const iconContainer = {
  sizes: {
    /** 48px - For compact layouts */
    sm: '3rem',
    /** 56px - Standard size (default) */
    md: '3.5rem',
    /** 64px - For hero sections */
    lg: '4rem',
  },
  /** Standard border radius for all icon containers */
  borderRadius: '1rem', // rounded-xl (16px)
} as const

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',   // ~8px
  md: 'calc(var(--radius) - 2px)',   // ~10px
  lg: 'var(--radius)',               // 12px (default)
  xl: 'calc(var(--radius) + 4px)',   // 16px
  '2xl': 'calc(var(--radius) + 8px)', // 20px
  '3xl': 'calc(var(--radius) + 12px)', // 24px
  full: '9999px',
} as const

// ============================================================================
// CARD VARIANT TOKENS (POR-31)
// ============================================================================

/**
 * Card component variant specifications
 * Used by the Card component with cva
 */
export const cardVariants = {
  /** Standard card with subtle border */
  default: { padding: '1.5rem', borderRadius: '1rem' },
  /** Interactive card with hover effects */
  interactive: { padding: '1.5rem', borderRadius: '1rem' },
  /** Modern bento-style card */
  bento: { padding: '1.5rem', borderRadius: '1.5rem' },
  /** Feature highlight card */
  feature: { padding: '2rem', borderRadius: '1.25rem' },
  /** Glassmorphism effect card */
  glass: { padding: '1.5rem', borderRadius: '1rem' },
  /** Prominent border card */
  outlined: { padding: '1.5rem', borderRadius: '1rem' },
  /** Strong shadow card */
  elevated: { padding: '1.5rem', borderRadius: '1rem' },
  /** Compact card for tight layouts */
  compact: { padding: '1rem', borderRadius: '0.75rem' },
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
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  dropdown: 9999,
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
