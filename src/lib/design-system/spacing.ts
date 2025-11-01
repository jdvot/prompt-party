/**
 * Spacing System - Prompt Party Design System
 *
 * 8px base unit system for consistent spacing throughout the application.
 * Follows 8-point grid methodology for pixel-perfect layouts.
 *
 * @module spacing
 */

// ============================================================================
// SPACING SCALE - 8px base unit
// ============================================================================

export const spacing = {
  0: '0',           // 0px
  px: '1px',        // 1px
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px - base unit
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  18: '4.5rem',     // 72px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  88: '22rem',      // 352px
  96: '24rem',      // 384px
  128: '32rem',     // 512px
  160: '40rem',     // 640px
} as const

// ============================================================================
// SEMANTIC SPACING - Component-specific presets
// ============================================================================

export const semanticSpacing = {
  // Component padding
  padding: {
    xs: spacing[2],      // 8px
    sm: spacing[3],      // 12px
    md: spacing[4],      // 16px
    lg: spacing[6],      // 24px
    xl: spacing[8],      // 32px
    '2xl': spacing[12],  // 48px
  },

  // Component gaps (for flex/grid)
  gap: {
    xs: spacing[1],      // 4px
    sm: spacing[2],      // 8px
    md: spacing[4],      // 16px
    lg: spacing[6],      // 24px
    xl: spacing[8],      // 32px
  },

  // Section spacing (for page layout)
  section: {
    xs: spacing[8],      // 32px
    sm: spacing[12],     // 48px
    md: spacing[16],     // 64px
    lg: spacing[24],     // 96px
    xl: spacing[32],     // 128px
  },

  // Container padding
  container: {
    xs: spacing[4],      // 16px
    sm: spacing[6],      // 24px
    md: spacing[8],      // 32px
    lg: spacing[12],     // 48px
  },

  // Card spacing
  card: {
    compact: spacing[4],  // 16px
    default: spacing[6],  // 24px
    relaxed: spacing[8],  // 32px
  },

  // Stack spacing
  stack: {
    xs: spacing[1],      // 4px
    sm: spacing[2],      // 8px
    md: spacing[4],      // 16px
    lg: spacing[6],      // 24px
    xl: spacing[8],      // 32px
  },

  // Inline spacing (for text elements)
  inline: {
    xs: spacing[1],      // 4px
    sm: spacing[2],      // 8px
    md: spacing[3],      // 12px
    lg: spacing[4],      // 16px
  },
} as const

// ============================================================================
// GRID SYSTEM
// ============================================================================

export const grid = {
  columns: {
    default: 12,
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
  gutter: {
    xs: spacing[4],      // 16px
    sm: spacing[6],      // 24px
    md: spacing[8],      // 32px
    lg: spacing[12],     // 48px
  },
  margin: {
    xs: spacing[4],      // 16px
    sm: spacing[6],      // 24px
    md: spacing[8],      // 32px
    lg: spacing[12],     // 48px
  },
} as const

// ============================================================================
// LAYOUT WIDTHS
// ============================================================================

export const widths = {
  xs: '20rem',      // 320px
  sm: '24rem',      // 384px
  md: '28rem',      // 448px
  lg: '32rem',      // 512px
  xl: '36rem',      // 576px
  '2xl': '42rem',   // 672px
  '3xl': '48rem',   // 768px
  '4xl': '56rem',   // 896px
  '5xl': '64rem',   // 1024px
  '6xl': '72rem',   // 1152px
  '7xl': '80rem',   // 1280px
  '8xl': '88rem',   // 1408px
  '9xl': '96rem',   // 1536px
  full: '100%',
  screen: '100vw',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
} as const

// ============================================================================
// LAYOUT HEIGHTS
// ============================================================================

export const heights = {
  xs: '20rem',      // 320px
  sm: '24rem',      // 384px
  md: '28rem',      // 448px
  lg: '32rem',      // 512px
  xl: '36rem',      // 576px
  '2xl': '42rem',   // 672px
  '3xl': '48rem',   // 768px
  full: '100%',
  screen: '100vh',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
} as const

// ============================================================================
// CONTAINER MAX WIDTHS
// ============================================================================

export const containerMaxWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
  '3xl': '1600px',
  '4xl': '1920px',
  full: '100%',
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get spacing value by key
 */
export function getSpacing(key: keyof typeof spacing): string {
  return spacing[key]
}

/**
 * Get responsive padding values
 */
export function getResponsivePadding(size: 'xs' | 'sm' | 'md' | 'lg' = 'md') {
  return {
    DEFAULT: semanticSpacing.padding[size],
    sm: semanticSpacing.padding[size],
    md: semanticSpacing.padding[size === 'xs' ? 'sm' : size === 'sm' ? 'md' : 'lg'],
    lg: semanticSpacing.padding[size === 'xs' ? 'md' : size === 'sm' ? 'lg' : 'xl'],
  }
}

/**
 * Create custom spacing with multiplier
 */
export function customSpacing(baseUnit: number, multiplier: number): string {
  return `${baseUnit * multiplier}px`
}

// ============================================================================
// EXPORTS
// ============================================================================

export const spacingSystem = {
  spacing,
  semantic: semanticSpacing,
  grid,
  widths,
  heights,
  container: containerMaxWidths,
} as const

export type SpacingToken = typeof spacingSystem
