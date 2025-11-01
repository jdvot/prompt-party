/**
 * Animation System - Prompt Party Design System
 *
 * Comprehensive animation presets with timing functions, durations, and keyframes.
 * Respects user's motion preferences (prefers-reduced-motion).
 *
 * @module animations
 */

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const durations = {
  instant: '0ms',
  fast: '150ms',
  base: '200ms',
  normal: '300ms',
  slow: '400ms',
  slower: '500ms',
  slowest: '700ms',
} as const

// ============================================================================
// EASING CURVES
// ============================================================================

export const easings = {
  // Standard easings
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Custom easings
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Enhanced easings (from Material Design)
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',

  // Gentle easings
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  gentleIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  gentleOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
} as const

// ============================================================================
// TRANSITION PRESETS
// ============================================================================

export const transitions = {
  // All properties
  all: {
    fast: `all ${durations.fast} ${easings.smooth}`,
    base: `all ${durations.base} ${easings.smooth}`,
    normal: `all ${durations.normal} ${easings.smooth}`,
    slow: `all ${durations.slow} ${easings.smooth}`,
  },

  // Opacity
  opacity: {
    fast: `opacity ${durations.fast} ${easings.easeOut}`,
    base: `opacity ${durations.base} ${easings.easeOut}`,
    normal: `opacity ${durations.normal} ${easings.easeOut}`,
  },

  // Transform
  transform: {
    fast: `transform ${durations.fast} ${easings.smooth}`,
    base: `transform ${durations.base} ${easings.smooth}`,
    normal: `transform ${durations.normal} ${easings.smooth}`,
    spring: `transform ${durations.slow} ${easings.spring}`,
    bounce: `transform ${durations.slow} ${easings.bounce}`,
  },

  // Colors
  colors: {
    fast: `color ${durations.fast} ${easings.easeOut}, background-color ${durations.fast} ${easings.easeOut}, border-color ${durations.fast} ${easings.easeOut}`,
    base: `color ${durations.base} ${easings.easeOut}, background-color ${durations.base} ${easings.easeOut}, border-color ${durations.base} ${easings.easeOut}`,
    normal: `color ${durations.normal} ${easings.easeOut}, background-color ${durations.normal} ${easings.easeOut}, border-color ${durations.normal} ${easings.easeOut}`,
  },

  // Box shadow
  shadow: {
    fast: `box-shadow ${durations.fast} ${easings.easeOut}`,
    base: `box-shadow ${durations.base} ${easings.easeOut}`,
    normal: `box-shadow ${durations.normal} ${easings.easeOut}`,
  },

  // Combined (common interactive elements)
  interactive: {
    fast: `transform ${durations.fast} ${easings.smooth}, box-shadow ${durations.fast} ${easings.easeOut}, opacity ${durations.fast} ${easings.easeOut}`,
    base: `transform ${durations.base} ${easings.smooth}, box-shadow ${durations.base} ${easings.easeOut}, opacity ${durations.base} ${easings.easeOut}`,
    normal: `transform ${durations.normal} ${easings.smooth}, box-shadow ${durations.normal} ${easings.easeOut}, opacity ${durations.normal} ${easings.easeOut}`,
  },
} as const

// ============================================================================
// KEYFRAME ANIMATIONS
// ============================================================================

export const keyframes = {
  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },

  // Slide animations
  slideInFromTop: {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInFromBottom: {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInFromLeft: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
  slideInFromRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },

  // Fade + Slide combinations
  fadeInUp: {
    from: { opacity: 0, transform: 'translateY(1rem)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeInDown: {
    from: { opacity: 0, transform: 'translateY(-1rem)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeInLeft: {
    from: { opacity: 0, transform: 'translateX(-1rem)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  fadeInRight: {
    from: { opacity: 0, transform: 'translateX(1rem)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },

  // Scale animations
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  scaleOut: {
    from: { opacity: 1, transform: 'scale(1)' },
    to: { opacity: 0, transform: 'scale(0.95)' },
  },

  // Zoom animations
  zoomIn: {
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  zoomOut: {
    from: { opacity: 1, transform: 'scale(1)' },
    to: { opacity: 0, transform: 'scale(0.8)' },
  },

  // Bounce
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-25%)' },
  },

  // Pulse
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },

  // Spin
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },

  // Ping (ripple effect)
  ping: {
    '75%, 100%': { transform: 'scale(2)', opacity: 0 },
  },

  // Shimmer (loading effect)
  shimmer: {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' },
  },

  // Gradient shift
  gradientShift: {
    '0%, 100%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
  },

  // Glow pulse
  glowPulse: {
    '0%, 100%': { boxShadow: '0 0 20px hsl(256, 67%, 59% / 0.4)' },
    '50%': { boxShadow: '0 0 40px hsl(256, 67%, 59% / 0.6)' },
  },

  // Shake
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
  },

  // Float
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },

  // Wiggle
  wiggle: {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  },
} as const

// ============================================================================
// ANIMATION PRESETS - Ready-to-use animations
// ============================================================================

export const animationPresets = {
  // Fade
  fadeIn: `fadeIn ${durations.normal} ${easings.easeOut}`,
  fadeOut: `fadeOut ${durations.normal} ${easings.easeOut}`,

  // Slide
  slideInFromTop: `slideInFromTop ${durations.normal} ${easings.easeOut}`,
  slideInFromBottom: `slideInFromBottom ${durations.normal} ${easings.easeOut}`,
  slideInFromLeft: `slideInFromLeft ${durations.normal} ${easings.easeOut}`,
  slideInFromRight: `slideInFromRight ${durations.normal} ${easings.easeOut}`,

  // Fade + Slide
  fadeInUp: `fadeInUp ${durations.normal} ${easings.easeOut}`,
  fadeInDown: `fadeInDown ${durations.normal} ${easings.easeOut}`,
  fadeInLeft: `fadeInLeft ${durations.normal} ${easings.easeOut}`,
  fadeInRight: `fadeInRight ${durations.normal} ${easings.easeOut}`,

  // Scale
  scaleIn: `scaleIn ${durations.base} ${easings.spring}`,
  scaleOut: `scaleOut ${durations.base} ${easings.easeOut}`,
  zoomIn: `zoomIn ${durations.normal} ${easings.spring}`,
  zoomOut: `zoomOut ${durations.normal} ${easings.easeOut}`,

  // Continuous
  bounce: `bounce 1s ${easings.easeInOut} infinite`,
  pulse: `pulse 2s ${easings.easeInOut} infinite`,
  spin: `spin 1s ${easings.linear} infinite`,
  ping: `ping 1s ${easings.spring} infinite`,
  shimmer: `shimmer 2s ${easings.linear} infinite`,
  gradientShift: `gradientShift 6s ${easings.easeInOut} infinite`,
  glowPulse: `glowPulse 2s ${easings.easeInOut} infinite`,
  float: `float 3s ${easings.easeInOut} infinite`,
  wiggle: `wiggle 1s ${easings.easeInOut} infinite`,

  // Attention seekers
  shake: `shake 0.5s ${easings.easeInOut}`,
} as const

// ============================================================================
// COMPONENT-SPECIFIC ANIMATIONS
// ============================================================================

export const componentAnimations = {
  // Modal/Dialog
  modal: {
    overlay: {
      enter: `fadeIn ${durations.normal} ${easings.easeOut}`,
      exit: `fadeOut ${durations.base} ${easings.easeIn}`,
    },
    content: {
      enter: `scaleIn ${durations.normal} ${easings.spring}`,
      exit: `scaleOut ${durations.base} ${easings.easeIn}`,
    },
  },

  // Dropdown/Menu
  dropdown: {
    enter: `scaleIn ${durations.fast} ${easings.easeOut}`,
    exit: `scaleOut ${durations.fast} ${easings.easeIn}`,
  },

  // Toast/Notification
  toast: {
    enter: `slideInFromRight ${durations.normal} ${easings.spring}`,
    exit: `slideInFromRight ${durations.base} ${easings.easeIn}`,
  },

  // Tooltip
  tooltip: {
    enter: `fadeIn ${durations.fast} ${easings.easeOut}`,
    exit: `fadeOut ${durations.fast} ${easings.easeIn}`,
  },

  // Accordion
  accordion: {
    open: `slideInFromTop ${durations.normal} ${easings.easeOut}`,
    close: `slideInFromTop ${durations.base} ${easings.easeIn}`,
  },

  // Tab
  tab: {
    enter: `fadeIn ${durations.base} ${easings.easeOut}`,
    exit: `fadeOut ${durations.base} ${easings.easeIn}`,
  },
} as const

// ============================================================================
// MICROINTERACTIONS - Subtle animations for better UX
// ============================================================================

export const microinteractions = {
  // Button press
  buttonPress: {
    transform: 'scale(0.98)',
    transition: transitions.transform.fast,
  },

  // Hover lift
  hoverLift: {
    transform: 'translateY(-2px)',
    transition: transitions.transform.base,
  },

  // Card hover
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)',
    transition: transitions.interactive.normal,
  },

  // Icon rotate
  iconRotate: {
    transform: 'rotate(90deg)',
    transition: transitions.transform.base,
  },

  // Badge pulse (for notifications)
  badgePulse: {
    animation: `pulse 2s ${easings.easeInOut} infinite`,
  },
} as const

// ============================================================================
// LOADING ANIMATIONS
// ============================================================================

export const loadingAnimations = {
  spinner: `spin 1s ${easings.linear} infinite`,
  dots: `pulse 1.4s ${easings.easeInOut} infinite`,
  skeleton: `shimmer 2s ${easings.linear} infinite`,
  progress: `slideInFromLeft ${durations.slower} ${easings.linear}`,
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create custom animation with options
 */
export function createAnimation(
  keyframe: keyof typeof keyframes,
  duration: keyof typeof durations = 'normal',
  easing: keyof typeof easings = 'easeOut',
  iterations: number | 'infinite' = 1
): string {
  return `${keyframe} ${durations[duration]} ${easings[easing]} ${iterations === 'infinite' ? 'infinite' : iterations}`
}

/**
 * Combine multiple transitions
 */
export function combineTransitions(...transitionStrings: string[]): string {
  return transitionStrings.join(', ')
}

/**
 * Get safe animation (respects prefers-reduced-motion)
 */
export function getSafeAnimation(animation: string): string {
  return `@media (prefers-reduced-motion: no-preference) { animation: ${animation}; }`
}

// ============================================================================
// EXPORTS
// ============================================================================

export const animations = {
  duration: durations,
  easing: easings,
  transition: transitions,
  keyframe: keyframes,
  preset: animationPresets,
  component: componentAnimations,
  microinteraction: microinteractions,
  loading: loadingAnimations,
} as const

export type AnimationToken = typeof animations
