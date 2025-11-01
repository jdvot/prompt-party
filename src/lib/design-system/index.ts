/**
 * Prompt Party Design System
 *
 * A comprehensive, production-ready design system built with:
 * - Semantic design tokens
 * - Accessibility-first components
 * - Dark mode support
 * - Responsive design patterns
 * - Premium visual aesthetics
 *
 * @module design-system
 */

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export * from './colors'
export * from './typography'
export * from './spacing'
export * from './shadows'
export * from './animations'
export * from './radius'

import { colors } from './colors'
import { typography } from './typography'
import { spacingSystem } from './spacing'
import { shadows } from './shadows'
import { animations } from './animations'
import { radius } from './radius'

// ============================================================================
// UNIFIED DESIGN TOKENS EXPORT
// ============================================================================

export const designTokens = {
  colors,
  typography,
  spacing: spacingSystem,
  shadows,
  animations,
  radius,
} as const

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
  max: 9999,
} as const

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
  '3xl': '1600px',
  '4xl': '1920px',
} as const

// ============================================================================
// MEDIA QUERIES
// ============================================================================

export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
  '3xl': `(min-width: ${breakpoints['3xl']})`,
  '4xl': `(min-width: ${breakpoints['4xl']})`,

  // Max width queries
  maxXs: `(max-width: ${breakpoints.xs})`,
  maxSm: `(max-width: ${breakpoints.sm})`,
  maxMd: `(max-width: ${breakpoints.md})`,
  maxLg: `(max-width: ${breakpoints.lg})`,
  maxXl: `(max-width: ${breakpoints.xl})`,
  max2xl: `(max-width: ${breakpoints['2xl']})`,

  // Special queries
  mobile: `(max-width: ${breakpoints.md})`,
  tablet: `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
  desktop: `(min-width: ${breakpoints.lg})`,
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  highContrast: '(prefers-contrast: high)',
} as const

// ============================================================================
// DESIGN SYSTEM CONFIGURATION
// ============================================================================

export const designSystemConfig = {
  name: 'Prompt Party Design System',
  version: '1.0.0',
  description: 'A premium design system for AI prompt social network',
  tokens: designTokens,
  zIndex,
  breakpoints,
  mediaQueries,
} as const

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type DesignTokens = typeof designTokens
export type ZIndex = typeof zIndex
export type Breakpoints = typeof breakpoints
export type MediaQueries = typeof mediaQueries
export type DesignSystemConfig = typeof designSystemConfig
