import { cn } from '@/lib/utils'

interface IconContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient'
  gradientFrom?: string
  gradientTo?: string
}

/**
 * Standardized icon container component
 *
 * Design System Specs:
 * - sm: 48px (w-12 h-12) - for compact layouts
 * - md: 56px (w-14 h-14) - standard size (default)
 * - lg: 64px (w-16 h-16) - for hero sections
 *
 * Border radius: 16px (rounded-xl) for all sizes
 */
export function IconContainer({
  children,
  className,
  size = 'md',
  variant = 'default',
  gradientFrom,
  gradientTo,
}: IconContainerProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  }

  const baseClasses = 'rounded-xl flex items-center justify-center'

  const variantClasses = variant === 'gradient' && gradientFrom && gradientTo
    ? `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
    : 'bg-muted'

  return (
    <div
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses,
        className
      )}
    >
      {children}
    </div>
  )
}
