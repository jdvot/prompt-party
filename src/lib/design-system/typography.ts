/**
 * Typography System - Prompt Party Design System
 *
 * A comprehensive type scale with semantic naming and responsive options.
 * Optimized for readability and hierarchy.
 *
 * @module typography
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================

export const fontFamilies = {
  sans: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'var(--font-geist-mono), "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  display: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const

// ============================================================================
// FONT SIZES - Type Scale (based on 1.25 ratio)
// ============================================================================

export const fontSizes = {
  xs: {
    size: '0.75rem',      // 12px
    lineHeight: '1rem',   // 16px
  },
  sm: {
    size: '0.875rem',     // 14px
    lineHeight: '1.25rem', // 20px
  },
  base: {
    size: '1rem',         // 16px
    lineHeight: '1.5rem', // 24px
  },
  lg: {
    size: '1.125rem',     // 18px
    lineHeight: '1.75rem', // 28px
  },
  xl: {
    size: '1.25rem',      // 20px
    lineHeight: '1.75rem', // 28px
  },
  '2xl': {
    size: '1.5rem',       // 24px
    lineHeight: '2rem',   // 32px
  },
  '3xl': {
    size: '1.875rem',     // 30px
    lineHeight: '2.25rem', // 36px
  },
  '4xl': {
    size: '2.25rem',      // 36px
    lineHeight: '2.5rem', // 40px
  },
  '5xl': {
    size: '3rem',         // 48px
    lineHeight: '1.2',
  },
  '6xl': {
    size: '3.75rem',      // 60px
    lineHeight: '1.1',
  },
  '7xl': {
    size: '4.5rem',       // 72px
    lineHeight: '1',
  },
  '8xl': {
    size: '6rem',         // 96px
    lineHeight: '1',
  },
  '9xl': {
    size: '8rem',         // 128px
    lineHeight: '1',
  },
} as const

// ============================================================================
// FONT WEIGHTS
// ============================================================================

export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const

// ============================================================================
// LINE HEIGHTS
// ============================================================================

export const lineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const

// ============================================================================
// LETTER SPACING
// ============================================================================

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

// ============================================================================
// TEXT STYLES - Semantic type styles
// ============================================================================

export const textStyles = {
  // Display styles (for headlines and hero text)
  displayLarge: {
    fontSize: fontSizes['7xl'].size,
    lineHeight: fontSizes['7xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tighter,
  },
  displayMedium: {
    fontSize: fontSizes['6xl'].size,
    lineHeight: fontSizes['6xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tighter,
  },
  displaySmall: {
    fontSize: fontSizes['5xl'].size,
    lineHeight: fontSizes['5xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },

  // Heading styles
  h1: {
    fontSize: fontSizes['4xl'].size,
    lineHeight: fontSizes['4xl'].lineHeight,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSizes['3xl'].size,
    lineHeight: fontSizes['3xl'].lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSizes['2xl'].size,
    lineHeight: fontSizes['2xl'].lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontSize: fontSizes.xl.size,
    lineHeight: fontSizes.xl.lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: fontSizes.lg.size,
    lineHeight: fontSizes.lg.lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: fontSizes.base.size,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
  },

  // Body styles
  bodyLarge: {
    fontSize: fontSizes.lg.size,
    lineHeight: fontSizes.lg.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontSize: fontSizes.base.size,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm.size,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Label styles
  label: {
    fontSize: fontSizes.sm.size,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
  },
  labelSmall: {
    fontSize: fontSizes.xs.size,
    lineHeight: fontSizes.xs.lineHeight,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
  },

  // Caption styles
  caption: {
    fontSize: fontSizes.sm.size,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  captionSmall: {
    fontSize: fontSizes.xs.size,
    lineHeight: fontSizes.xs.lineHeight,
    fontWeight: fontWeights.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Code styles
  code: {
    fontSize: fontSizes.sm.size,
    lineHeight: fontSizes.sm.lineHeight,
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.mono,
  },
  codeInline: {
    fontSize: '0.9em',
    fontWeight: fontWeights.normal,
    fontFamily: fontFamilies.mono,
  },

  // Overline (small uppercase labels)
  overline: {
    fontSize: fontSizes.xs.size,
    lineHeight: fontSizes.xs.lineHeight,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },

  // Link styles
  link: {
    fontSize: fontSizes.base.size,
    lineHeight: fontSizes.base.lineHeight,
    fontWeight: fontWeights.medium,
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '2px',
  },
} as const

// ============================================================================
// RESPONSIVE TYPOGRAPHY - Mobile-first breakpoints
// ============================================================================

export const responsiveTextStyles = {
  hero: {
    base: textStyles.displayMedium,
    md: textStyles.displayLarge,
  },
  title: {
    base: textStyles.h2,
    md: textStyles.h1,
  },
  subtitle: {
    base: textStyles.h4,
    md: textStyles.h3,
  },
  body: {
    base: textStyles.bodySmall,
    md: textStyles.body,
  },
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert text style to CSS properties
 */
export function textStyleToCSS(style: typeof textStyles[keyof typeof textStyles]) {
  const styleAny = style as any
  return {
    fontSize: style.fontSize,
    lineHeight: styleAny.lineHeight || lineHeights.normal,
    fontWeight: style.fontWeight,
    letterSpacing: styleAny.letterSpacing || letterSpacing.normal,
    ...(styleAny.fontFamily && { fontFamily: styleAny.fontFamily }),
    ...(styleAny.textTransform && { textTransform: styleAny.textTransform }),
    ...(styleAny.textDecoration && { textDecoration: styleAny.textDecoration }),
    ...(styleAny.textDecorationThickness && { textDecorationThickness: styleAny.textDecorationThickness }),
    ...(styleAny.textUnderlineOffset && { textUnderlineOffset: styleAny.textUnderlineOffset }),
  }
}

/**
 * Get font size with line height
 */
export function getFontSize(size: keyof typeof fontSizes) {
  return fontSizes[size]
}

// ============================================================================
// EXPORTS
// ============================================================================

export const typography = {
  fontFamily: fontFamilies,
  fontSize: fontSizes,
  fontWeight: fontWeights,
  lineHeight: lineHeights,
  letterSpacing,
  textStyle: textStyles,
  responsive: responsiveTextStyles,
} as const

export type TypographyToken = typeof typography
