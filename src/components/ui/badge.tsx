import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info' | 'outline' | 'soft'
  shape?: 'default' | 'pill'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', shape = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center text-xs font-medium transition-colors duration-base',
          // Shapes
          {
            'rounded-md px-2 py-1': shape === 'default',
            'rounded-full px-3 py-1': shape === 'pill',
          },
          // Variants
          {
            'bg-primary text-primary-foreground': variant === 'default',
            'bg-secondary text-secondary-foreground': variant === 'secondary',
            'bg-destructive text-destructive-foreground': variant === 'destructive',
            'bg-success text-success-foreground': variant === 'success',
            'bg-warning text-warning-foreground': variant === 'warning',
            'bg-info text-info-foreground': variant === 'info',
            'border border-input bg-background': variant === 'outline',
            'bg-primary/10 text-primary': variant === 'soft',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
