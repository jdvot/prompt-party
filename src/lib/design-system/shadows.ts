/**
 * Shadow & Elevation System - Prompt Party Design System
 *
 * A 6-level elevation system with semantic shadows and glow effects.
 * Provides depth and hierarchy to the UI.
 *
 * @module shadows
 */

// ============================================================================
// ELEVATION SHADOWS - 6-level system
// ============================================================================

export const elevationShadows = {
  0: 'none',
  1: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  2: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  3: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  4: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  5: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  6: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const

// ============================================================================
// NAMED SHADOWS - Semantic usage
// ============================================================================

export const namedShadows = {
  // Standard shadows
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Inner shadow
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  innerLg: 'inset 0 4px 8px 0 rgb(0 0 0 / 0.1)',

  // Outline shadow (for focus states)
  outline: '0 0 0 3px rgb(0 0 0 / 0.05)',
} as const

// ============================================================================
// GLOW EFFECTS - Brand color glows
// ============================================================================

export const glowShadows = {
  // Primary purple glow
  primary: {
    sm: '0 0 10px hsl(256, 67%, 59% / 0.3)',
    md: '0 0 20px hsl(256, 67%, 59% / 0.4)',
    lg: '0 0 30px hsl(256, 67%, 59% / 0.4)',
    xl: '0 0 40px hsl(256, 67%, 59% / 0.5)',
  },

  // Secondary blue glow
  secondary: {
    sm: '0 0 10px hsl(221, 83%, 53% / 0.3)',
    md: '0 0 20px hsl(221, 83%, 53% / 0.4)',
    lg: '0 0 30px hsl(221, 83%, 53% / 0.4)',
    xl: '0 0 40px hsl(221, 83%, 53% / 0.5)',
  },

  // Accent magenta glow
  accent: {
    sm: '0 0 10px hsl(280, 87%, 65% / 0.3)',
    md: '0 0 20px hsl(280, 87%, 65% / 0.4)',
    lg: '0 0 30px hsl(280, 87%, 65% / 0.4)',
    xl: '0 0 40px hsl(280, 87%, 65% / 0.5)',
  },

  // Success green glow
  success: {
    sm: '0 0 10px hsl(142, 71%, 45% / 0.3)',
    md: '0 0 20px hsl(142, 71%, 45% / 0.4)',
    lg: '0 0 30px hsl(142, 71%, 45% / 0.4)',
    xl: '0 0 40px hsl(142, 71%, 45% / 0.5)',
  },

  // Error red glow
  error: {
    sm: '0 0 10px hsl(0, 84%, 60% / 0.3)',
    md: '0 0 20px hsl(0, 84%, 60% / 0.4)',
    lg: '0 0 30px hsl(0, 84%, 60% / 0.4)',
    xl: '0 0 40px hsl(0, 84%, 60% / 0.5)',
  },

  // Warning orange glow
  warning: {
    sm: '0 0 10px hsl(38, 92%, 50% / 0.3)',
    md: '0 0 20px hsl(38, 92%, 50% / 0.4)',
    lg: '0 0 30px hsl(38, 92%, 50% / 0.4)',
    xl: '0 0 40px hsl(38, 92%, 50% / 0.5)',
  },

  // Info blue glow
  info: {
    sm: '0 0 10px hsl(199, 89%, 48% / 0.3)',
    md: '0 0 20px hsl(199, 89%, 48% / 0.4)',
    lg: '0 0 30px hsl(199, 89%, 48% / 0.4)',
    xl: '0 0 40px hsl(199, 89%, 48% / 0.5)',
  },
} as const

// ============================================================================
// FOCUS SHADOWS - For interactive elements
// ============================================================================

export const focusShadows = {
  // Ring-style focus (modern approach)
  ring: {
    primary: '0 0 0 3px hsl(256, 67%, 59% / 0.2)',
    secondary: '0 0 0 3px hsl(221, 83%, 53% / 0.2)',
    accent: '0 0 0 3px hsl(280, 87%, 65% / 0.2)',
    error: '0 0 0 3px hsl(0, 84%, 60% / 0.2)',
    default: '0 0 0 3px hsl(220, 16%, 92%)',
  },

  // Glow-style focus (for dark backgrounds)
  glow: {
    primary: '0 0 0 3px hsl(256, 67%, 59% / 0.2), 0 0 20px hsl(256, 67%, 59% / 0.3)',
    secondary: '0 0 0 3px hsl(221, 83%, 53% / 0.2), 0 0 20px hsl(221, 83%, 53% / 0.3)',
    accent: '0 0 0 3px hsl(280, 87%, 65% / 0.2), 0 0 20px hsl(280, 87%, 65% / 0.3)',
  },
} as const

// ============================================================================
// HOVER SHADOWS - Enhanced elevation on hover
// ============================================================================

export const hoverShadows = {
  sm: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
  md: '0 6px 12px -2px rgb(0 0 0 / 0.15), 0 3px 6px -3px rgb(0 0 0 / 0.1)',
  lg: '0 15px 25px -5px rgb(0 0 0 / 0.15), 0 6px 10px -6px rgb(0 0 0 / 0.1)',
  xl: '0 25px 35px -7px rgb(0 0 0 / 0.2), 0 10px 15px -8px rgb(0 0 0 / 0.1)',
  '2xl': '0 30px 60px -15px rgb(0 0 0 / 0.3)',

  // With brand color
  primaryGlow: '0 10px 25px -5px hsl(256, 67%, 59% / 0.4), 0 0 30px hsl(256, 67%, 59% / 0.3)',
  secondaryGlow: '0 10px 25px -5px hsl(221, 83%, 53% / 0.4), 0 0 30px hsl(221, 83%, 53% / 0.3)',
  accentGlow: '0 10px 25px -5px hsl(280, 87%, 65% / 0.4), 0 0 30px hsl(280, 87%, 65% / 0.3)',
} as const

// ============================================================================
// COMPONENT-SPECIFIC SHADOWS
// ============================================================================

export const componentShadows = {
  button: {
    default: namedShadows.sm,
    hover: hoverShadows.md,
    active: namedShadows.inner,
  },

  card: {
    default: elevationShadows[2],
    hover: elevationShadows[4],
    elevated: elevationShadows[3],
  },

  dropdown: {
    default: elevationShadows[4],
  },

  modal: {
    backdrop: '0 0 0 1000px rgb(0 0 0 / 0.5)',
    content: elevationShadows[6],
  },

  popover: {
    default: elevationShadows[4],
  },

  tooltip: {
    default: elevationShadows[3],
  },

  toast: {
    default: elevationShadows[5],
  },

  navbar: {
    default: elevationShadows[2],
    scrolled: elevationShadows[3],
  },
} as const

// ============================================================================
// DARK MODE SHADOWS - Adjusted for dark backgrounds
// ============================================================================

export const darkModeShadows = {
  elevation: {
    0: 'none',
    1: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    2: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
    3: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    4: '0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
    5: '0 20px 25px -5px rgb(0 0 0 / 0.7), 0 8px 10px -6px rgb(0 0 0 / 0.6)',
    6: '0 25px 50px -12px rgb(0 0 0 / 0.8)',
  },

  // Lighter inner glow for dark mode
  innerGlow: {
    sm: 'inset 0 1px 2px 0 rgb(255 255 255 / 0.05)',
    md: 'inset 0 2px 4px 0 rgb(255 255 255 / 0.08)',
  },
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Combine multiple shadows
 */
export function combineShadows(...shadows: string[]): string {
  return shadows.filter(s => s !== 'none').join(', ')
}

/**
 * Create custom colored shadow
 */
export function createColoredShadow(
  color: string,
  intensity: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): string {
  const sizes = {
    sm: '0 0 10px',
    md: '0 0 20px',
    lg: '0 0 30px',
    xl: '0 0 40px',
  }
  return `${sizes[intensity]} ${color}`
}

/**
 * Get elevation shadow by level
 */
export function getElevation(level: 0 | 1 | 2 | 3 | 4 | 5 | 6): string {
  return elevationShadows[level]
}

/**
 * Get component shadow by type and state
 */
export function getComponentShadow(
  component: keyof typeof componentShadows,
  state: 'default' | 'hover' | 'active' | 'elevated' = 'default'
): string {
  const shadowSet = componentShadows[component]
  return (shadowSet as any)[state] || (shadowSet as any).default || 'none'
}

// ============================================================================
// EXPORTS
// ============================================================================

export const shadows = {
  elevation: elevationShadows,
  named: namedShadows,
  glow: glowShadows,
  focus: focusShadows,
  hover: hoverShadows,
  component: componentShadows,
  darkMode: darkModeShadows,
} as const

export type ShadowToken = typeof shadows
