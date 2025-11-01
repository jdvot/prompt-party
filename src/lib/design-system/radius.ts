/**
 * Border Radius System - Prompt Party Design System
 *
 * Consistent border radius values for components and layouts.
 * Supports component-specific radius presets.
 *
 * @module radius
 */

// ============================================================================
// BORDER RADIUS SCALE
// ============================================================================

export const radiusScale = {
  none: '0',
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  full: '9999px',   // Fully rounded
} as const

// ============================================================================
// COMPONENT-SPECIFIC RADIUS
// ============================================================================

export const componentRadius = {
  // Buttons
  button: {
    sm: radiusScale.sm,
    md: radiusScale.lg,
    lg: radiusScale.xl,
  },

  // Cards
  card: {
    default: radiusScale.xl,
    compact: radiusScale.lg,
    relaxed: radiusScale['2xl'],
    bento: radiusScale['3xl'],
  },

  // Inputs
  input: {
    sm: radiusScale.sm,
    md: radiusScale.md,
    lg: radiusScale.lg,
  },

  // Badges
  badge: {
    default: radiusScale.md,
    pill: radiusScale.full,
  },

  // Avatars
  avatar: {
    square: radiusScale.md,
    rounded: radiusScale.lg,
    circle: radiusScale.full,
  },

  // Modals/Dialogs
  modal: {
    default: radiusScale['2xl'],
  },

  // Popovers/Dropdowns
  popover: {
    default: radiusScale.lg,
  },

  // Tooltips
  tooltip: {
    default: radiusScale.md,
  },

  // Images
  image: {
    none: radiusScale.none,
    subtle: radiusScale.sm,
    default: radiusScale.lg,
    rounded: radiusScale.xl,
  },
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get radius value by size
 */
export function getRadius(size: keyof typeof radiusScale): string {
  return radiusScale[size]
}

/**
 * Get component radius
 */
export function getComponentRadius(
  component: keyof typeof componentRadius,
  variant: string = 'default'
): string {
  const componentSet = componentRadius[component]
  return (componentSet as any)[variant] || (componentSet as any).default || radiusScale.md
}

// ============================================================================
// EXPORTS
// ============================================================================

export const radius = {
  scale: radiusScale,
  component: componentRadius,
} as const

export type RadiusToken = typeof radius
