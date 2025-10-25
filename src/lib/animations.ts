import { Variants, Transition } from 'framer-motion'

// ============================================================================
// TRANSITION PRESETS
// ============================================================================

export const transitions = {
  // Smooth, gentle transitions
  smooth: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,

  // Bouncy, playful transitions
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
  } as Transition,

  // Quick, snappy transitions
  snappy: {
    type: 'spring',
    stiffness: 500,
    damping: 35,
  } as Transition,

  // Slow, elegant transitions
  elegant: {
    type: 'spring',
    stiffness: 200,
    damping: 40,
  } as Transition,

  // Simple easing transitions
  ease: {
    duration: 0.3,
    ease: [0.43, 0.13, 0.23, 0.96],
  } as Transition,

  // Fast easing
  easeQuick: {
    duration: 0.15,
    ease: [0.43, 0.13, 0.23, 0.96],
  } as Transition,
}

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
}

export const fadeOut: Variants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: transitions.smooth,
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
}

// ============================================================================
// SCALE ANIMATIONS
// ============================================================================

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: transitions.bouncy,
  },
}

export const scaleOut: Variants = {
  visible: { scale: 1, opacity: 1 },
  hidden: {
    scale: 0.8,
    opacity: 0,
    transition: transitions.smooth,
  },
}

export const scaleFadeIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: transitions.smooth,
  },
}

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

export const slideInUp: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.smooth,
  },
}

export const slideInDown: Variants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.smooth,
  },
}

export const slideInLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.smooth,
  },
}

export const slideInRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.smooth,
  },
}

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
}

export const staggerFastContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
}

export const staggerSlowContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: transitions.easeQuick,
  },
}

export const pageSlideTransition: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: transitions.easeQuick,
  },
}

export const pageScaleTransition: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: transitions.easeQuick,
  },
}

// ============================================================================
// HOVER & TAP ANIMATIONS
// ============================================================================

export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: transitions.easeQuick,
  },
  tap: {
    scale: 0.95,
    transition: transitions.easeQuick,
  },
}

export const hoverLift = {
  rest: { y: 0, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' },
  hover: {
    y: -4,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: transitions.smooth,
  },
}

export const hoverGlow = {
  rest: { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
  hover: {
    boxShadow: '0 0 20px 0 rgba(59, 130, 246, 0.3)',
    transition: transitions.smooth,
  },
}

export const tapScale = {
  scale: 0.95,
  transition: transitions.easeQuick,
}

// ============================================================================
// LOADING ANIMATIONS
// ============================================================================

export const pulse: Variants = {
  hidden: { opacity: 0.5, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1.05,
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 1,
    },
  },
}

export const rotate: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    },
  },
}

export const bounce: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 0, -10],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
}

// ============================================================================
// NOTIFICATION ANIMATIONS
// ============================================================================

export const notificationSlideIn: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.bouncy,
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: transitions.easeQuick,
  },
}

export const notificationScaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0, y: -20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: transitions.bouncy,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: -20,
    transition: transitions.easeQuick,
  },
}

// ============================================================================
// MODAL/DIALOG ANIMATIONS
// ============================================================================

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const modalContent: Variants = {
  hidden: { scale: 0.95, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    y: 20,
    transition: transitions.easeQuick,
  },
}

export const sheetSlideIn: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: transitions.smooth,
  },
  exit: {
    x: '100%',
    transition: transitions.easeQuick,
  },
}

// ============================================================================
// COLLAPSE/EXPAND ANIMATIONS
// ============================================================================

export const collapse: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: transitions.smooth,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    overflow: 'visible',
    transition: transitions.smooth,
  },
}

export const expandWidth: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: transitions.smooth,
  },
  visible: {
    width: 'auto',
    opacity: 1,
    overflow: 'visible',
    transition: transitions.smooth,
  },
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a custom stagger animation with specific timing
 */
export function createStagger(
  staggerDelay: number = 0.1,
  childDelay: number = 0.05
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  }
}

/**
 * Create a custom fade animation with specific distance and direction
 */
export function createFade(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 20
): Variants {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x'
  const value = direction === 'up' || direction === 'left' ? distance : -distance

  return {
    hidden: { opacity: 0, [axis]: value } as any,
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: transitions.smooth,
    } as any,
  } as Variants
}

/**
 * Create a custom scale animation with specific range
 */
export function createScale(
  from: number = 0.8,
  to: number = 1,
  transition: Transition = transitions.bouncy
): Variants {
  return {
    hidden: { scale: from, opacity: 0 },
    visible: {
      scale: to,
      opacity: 1,
      transition,
    },
  }
}

// ============================================================================
// ANIMATION HELPERS
// ============================================================================

/**
 * Get animation variants based on name
 */
export function getAnimationVariant(name: string): Variants {
  const variants: Record<string, Variants> = {
    fadeIn,
    fadeOut,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    scaleOut,
    scaleFadeIn,
    slideInUp,
    slideInDown,
    slideInLeft,
    slideInRight,
    staggerContainer,
    staggerItem,
    pageTransition,
    pulse,
    rotate,
    bounce,
  }

  return variants[name] || fadeIn
}

/**
 * Combine multiple variants
 */
export function combineVariants(...variants: Variants[]): Variants {
  return variants.reduce((acc, variant) => {
    Object.keys(variant).forEach((key) => {
      acc[key] = { ...acc[key], ...variant[key] }
    })
    return acc
  }, {} as Variants)
}
