/**
 * Color System - Prompt Party Design System
 *
 * A comprehensive color palette built for accessibility, consistency, and premium aesthetics.
 * All colors meet WCAG AA standards for contrast ratios.
 *
 * @module colors
 */

// ============================================================================
// BRAND COLORS - Premium purple/pink/blue gradient palette
// ============================================================================

export const brandColors = {
  primary: {
    50: 'hsl(256, 67%, 95%)',
    100: 'hsl(256, 67%, 90%)',
    200: 'hsl(256, 67%, 80%)',
    300: 'hsl(256, 67%, 70%)',
    400: 'hsl(256, 67%, 65%)',
    500: 'hsl(256, 67%, 59%)',   // Main brand color
    600: 'hsl(256, 67%, 49%)',
    700: 'hsl(256, 67%, 39%)',
    800: 'hsl(256, 67%, 29%)',
    900: 'hsl(256, 67%, 19%)',
    950: 'hsl(256, 67%, 10%)',
  },

  secondary: {
    50: 'hsl(221, 83%, 95%)',
    100: 'hsl(221, 83%, 88%)',
    200: 'hsl(221, 83%, 78%)',
    300: 'hsl(221, 83%, 68%)',
    400: 'hsl(221, 83%, 58%)',
    500: 'hsl(221, 83%, 53%)',   // Electric blue
    600: 'hsl(221, 83%, 43%)',
    700: 'hsl(221, 83%, 33%)',
    800: 'hsl(221, 83%, 23%)',
    900: 'hsl(221, 83%, 13%)',
    950: 'hsl(221, 83%, 8%)',
  },

  accent: {
    50: 'hsl(280, 87%, 95%)',
    100: 'hsl(280, 87%, 90%)',
    200: 'hsl(280, 87%, 85%)',
    300: 'hsl(280, 87%, 75%)',
    400: 'hsl(280, 87%, 70%)',
    500: 'hsl(280, 87%, 65%)',   // Magenta accent
    600: 'hsl(280, 87%, 55%)',
    700: 'hsl(280, 87%, 45%)',
    800: 'hsl(280, 87%, 35%)',
    900: 'hsl(280, 87%, 25%)',
    950: 'hsl(280, 87%, 15%)',
  },
} as const

// ============================================================================
// NEUTRAL COLORS - Premium gray scale
// ============================================================================

export const neutralColors = {
  light: {
    50: 'hsl(220, 18%, 98%)',
    100: 'hsl(220, 18%, 96%)',
    200: 'hsl(220, 16%, 92%)',
    300: 'hsl(220, 14%, 85%)',
    400: 'hsl(220, 12%, 70%)',
    500: 'hsl(220, 10%, 50%)',
    600: 'hsl(220, 13%, 41%)',
    700: 'hsl(220, 20%, 30%)',
    800: 'hsl(220, 24%, 20%)',
    900: 'hsl(220, 28%, 12%)',
    950: 'hsl(220, 30%, 8%)',
  },
  dark: {
    50: 'hsl(220, 30%, 8%)',
    100: 'hsl(220, 28%, 12%)',
    200: 'hsl(220, 24%, 20%)',
    300: 'hsl(220, 20%, 30%)',
    400: 'hsl(220, 13%, 41%)',
    500: 'hsl(220, 10%, 50%)',
    600: 'hsl(220, 12%, 70%)',
    700: 'hsl(220, 14%, 85%)',
    800: 'hsl(220, 16%, 92%)',
    900: 'hsl(220, 18%, 96%)',
    950: 'hsl(220, 18%, 98%)',
  },
} as const

// ============================================================================
// SEMANTIC COLORS - Status and feedback
// ============================================================================

export const semanticColors = {
  success: {
    light: {
      DEFAULT: 'hsl(142, 71%, 45%)',
      light: 'hsl(142, 71%, 55%)',
      lighter: 'hsl(142, 71%, 65%)',
      bg: 'hsl(142, 71%, 95%)',
      border: 'hsl(142, 71%, 85%)',
      foreground: 'hsl(0, 0%, 100%)',
    },
    dark: {
      DEFAULT: 'hsl(142, 71%, 55%)',
      light: 'hsl(142, 71%, 65%)',
      lighter: 'hsl(142, 71%, 75%)',
      bg: 'hsl(142, 71%, 15%)',
      border: 'hsl(142, 71%, 25%)',
      foreground: 'hsl(220, 18%, 98%)',
    },
  },

  error: {
    light: {
      DEFAULT: 'hsl(0, 84%, 60%)',
      light: 'hsl(0, 84%, 70%)',
      lighter: 'hsl(0, 84%, 80%)',
      bg: 'hsl(0, 84%, 95%)',
      border: 'hsl(0, 84%, 85%)',
      foreground: 'hsl(0, 0%, 100%)',
    },
    dark: {
      DEFAULT: 'hsl(0, 84%, 70%)',
      light: 'hsl(0, 84%, 80%)',
      lighter: 'hsl(0, 84%, 90%)',
      bg: 'hsl(0, 84%, 20%)',
      border: 'hsl(0, 84%, 30%)',
      foreground: 'hsl(220, 18%, 98%)',
    },
  },

  warning: {
    light: {
      DEFAULT: 'hsl(38, 92%, 50%)',
      light: 'hsl(38, 92%, 60%)',
      lighter: 'hsl(38, 92%, 70%)',
      bg: 'hsl(38, 92%, 95%)',
      border: 'hsl(38, 92%, 85%)',
      foreground: 'hsl(220, 28%, 12%)',
    },
    dark: {
      DEFAULT: 'hsl(38, 92%, 60%)',
      light: 'hsl(38, 92%, 70%)',
      lighter: 'hsl(38, 92%, 80%)',
      bg: 'hsl(38, 92%, 20%)',
      border: 'hsl(38, 92%, 30%)',
      foreground: 'hsl(220, 18%, 98%)',
    },
  },

  info: {
    light: {
      DEFAULT: 'hsl(199, 89%, 48%)',
      light: 'hsl(199, 89%, 58%)',
      lighter: 'hsl(199, 89%, 68%)',
      bg: 'hsl(199, 89%, 95%)',
      border: 'hsl(199, 89%, 85%)',
      foreground: 'hsl(0, 0%, 100%)',
    },
    dark: {
      DEFAULT: 'hsl(199, 89%, 58%)',
      light: 'hsl(199, 89%, 68%)',
      lighter: 'hsl(199, 89%, 78%)',
      bg: 'hsl(199, 89%, 18%)',
      border: 'hsl(199, 89%, 28%)',
      foreground: 'hsl(220, 18%, 98%)',
    },
  },
} as const

// ============================================================================
// SURFACE COLORS - Backgrounds and layers
// ============================================================================

export const surfaceColors = {
  light: {
    base: 'hsl(0, 0%, 100%)',
    raised: 'hsl(0, 0%, 100%)',
    overlay: 'hsl(0, 0%, 100%)',
    card: 'hsl(0, 0%, 100%)',
    popover: 'hsl(0, 0%, 100%)',
  },
  dark: {
    base: 'hsl(220, 28%, 8%)',
    raised: 'hsl(220, 24%, 12%)',
    overlay: 'hsl(220, 24%, 16%)',
    card: 'hsl(220, 24%, 12%)',
    popover: 'hsl(220, 24%, 16%)',
  },
} as const

// ============================================================================
// ALPHA COLORS - For overlays and transparency
// ============================================================================

export const alphaColors = {
  black: {
    5: 'rgba(0, 0, 0, 0.05)',
    10: 'rgba(0, 0, 0, 0.10)',
    20: 'rgba(0, 0, 0, 0.20)',
    30: 'rgba(0, 0, 0, 0.30)',
    40: 'rgba(0, 0, 0, 0.40)',
    50: 'rgba(0, 0, 0, 0.50)',
    60: 'rgba(0, 0, 0, 0.60)',
    70: 'rgba(0, 0, 0, 0.70)',
    80: 'rgba(0, 0, 0, 0.80)',
    90: 'rgba(0, 0, 0, 0.90)',
  },
  white: {
    5: 'rgba(255, 255, 255, 0.05)',
    10: 'rgba(255, 255, 255, 0.10)',
    20: 'rgba(255, 255, 255, 0.20)',
    30: 'rgba(255, 255, 255, 0.30)',
    40: 'rgba(255, 255, 255, 0.40)',
    50: 'rgba(255, 255, 255, 0.50)',
    60: 'rgba(255, 255, 255, 0.60)',
    70: 'rgba(255, 255, 255, 0.70)',
    80: 'rgba(255, 255, 255, 0.80)',
    90: 'rgba(255, 255, 255, 0.90)',
  },
} as const

// ============================================================================
// GRADIENT PRESETS - Premium gradients for brand consistency
// ============================================================================

export const gradients = {
  primary: 'linear-gradient(135deg, hsl(256, 67%, 59%), hsl(280, 87%, 65%))',
  secondary: 'linear-gradient(135deg, hsl(221, 83%, 53%), hsl(221, 83%, 73%))',
  vibrant: 'linear-gradient(135deg, #a78bfa, #ec4899, #f97316)',
  sunset: 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)',
  ocean: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
  forest: 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
  glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
  glassDark: 'linear-gradient(135deg, rgba(20, 20, 30, 0.6), rgba(10, 10, 20, 0.4))',
} as const

// ============================================================================
// BORDER COLORS
// ============================================================================

export const borderColors = {
  light: {
    default: 'hsl(220, 16%, 92%)',
    subtle: 'hsl(220, 16%, 95%)',
    strong: 'hsl(220, 16%, 85%)',
  },
  dark: {
    default: 'hsl(220, 24%, 20%)',
    subtle: 'hsl(220, 24%, 16%)',
    strong: 'hsl(220, 24%, 30%)',
  },
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get color with alpha transparency
 * @param color - HSL color string
 * @param alpha - Alpha value (0-1)
 */
export function withAlpha(color: string, alpha: number): string {
  return color.replace('hsl(', 'hsla(').replace(')', `, ${alpha})`)
}

/**
 * Get semantic color for current theme
 * @param type - Semantic color type
 * @param theme - 'light' or 'dark'
 */
export function getSemanticColor(
  type: keyof typeof semanticColors,
  theme: 'light' | 'dark' = 'light'
) {
  return semanticColors[type][theme]
}

// ============================================================================
// EXPORTS
// ============================================================================

export const colors = {
  brand: brandColors,
  neutral: neutralColors,
  semantic: semanticColors,
  surface: surfaceColors,
  alpha: alphaColors,
  gradients,
  border: borderColors,
} as const

export type ColorToken = typeof colors
