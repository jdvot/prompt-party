import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

// ============================================================================
// BADGE VARIANTS
// ============================================================================

const badgeVariants = cva(
  'inline-flex items-center font-medium transition-all duration-200 whitespace-nowrap leading-none',
  {
    variants: {
      variant: {
        // Solid variants
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',

        // Soft variants (subtle backgrounds)
        soft: 'bg-primary/10 text-primary border border-primary/20',
        softSecondary: 'bg-secondary/10 text-secondary border border-secondary/20',
        softDestructive: 'bg-destructive/10 text-destructive border border-destructive/20',
        softSuccess: 'bg-success/10 text-success border border-success/20',
        softWarning: 'bg-warning/10 text-warning border border-warning/20',
        softInfo: 'bg-info/10 text-info border border-info/20',

        // Outline variants
        outline: 'border-2 border-input bg-background text-foreground',
        outlinePrimary: 'border-2 border-primary bg-background text-primary',
        outlineSecondary: 'border-2 border-secondary bg-background text-secondary',
        outlineDestructive: 'border-2 border-destructive bg-background text-destructive',

        // Gradient variants
        gradient: 'bg-gradient-to-r from-brand-primary to-brand-accent text-white',
        gradientSecondary: 'bg-gradient-to-r from-brand-secondary to-brand-secondary-light text-white',

        // Glow variant (with subtle shadow)
        glow: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-lg shadow-brand-primary/20',
      },

      size: {
        sm: 'h-5 px-2 text-xs gap-1.5',
        md: 'h-6 px-2.5 text-xs gap-1.5',
        lg: 'h-7 px-3 text-sm gap-2',
      },

      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
        square: 'rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'default',
    },
  }
)

// ============================================================================
// BADGE COMPONENT
// ============================================================================

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  dot?: boolean
  dotColor?: string
  removable?: boolean
  onRemove?: () => void
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      startIcon,
      endIcon,
      dot = false,
      dotColor,
      removable = false,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onRemove?.()
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape }), className)}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full shrink-0',
              dotColor ? `bg-[${dotColor}]` : 'bg-current'
            )}
            style={dotColor ? { backgroundColor: dotColor } : undefined}
          />
        )}

        {/* Start icon */}
        {startIcon && (
          <span className="inline-flex items-center justify-center shrink-0 leading-none" aria-hidden="true">
            {startIcon}
          </span>
        )}

        {/* Content */}
        {children && <span className="truncate leading-none">{children}</span>}

        {/* End icon */}
        {endIcon && !removable && (
          <span className="inline-flex items-center justify-center shrink-0 leading-none" aria-hidden="true">
            {endIcon}
          </span>
        )}

        {/* Remove button */}
        {removable && (
          <button
            type="button"
            onClick={handleRemove}
            className={cn(
              'inline-flex shrink-0 opacity-60 hover:opacity-100 transition-opacity',
              'focus:outline-none focus:opacity-100'
            )}
            aria-label="Remove"
            tabIndex={-1}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// ============================================================================
// BADGE GROUP - For displaying multiple badges
// ============================================================================

export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  spacing?: 'sm' | 'md' | 'lg'
  wrap?: boolean
}

const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ className, children, spacing = 'md', wrap = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center',
        wrap && 'flex-wrap',
        spacing === 'sm' && 'gap-1',
        spacing === 'md' && 'gap-2',
        spacing === 'lg' && 'gap-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

BadgeGroup.displayName = 'BadgeGroup'

// ============================================================================
// STATUS BADGE - Pre-styled status indicators
// ============================================================================

export interface StatusBadgeProps
  extends Omit<BadgeProps, 'variant' | 'dot'> {
  status: 'active' | 'inactive' | 'pending' | 'success' | 'error' | 'warning'
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const statusConfig = {
      active: {
        variant: 'softSuccess' as const,
        dotColor: 'hsl(142, 71%, 45%)',
        label: 'Active',
      },
      inactive: {
        variant: 'soft' as const,
        dotColor: 'hsl(220, 13%, 41%)',
        label: 'Inactive',
      },
      pending: {
        variant: 'softWarning' as const,
        dotColor: 'hsl(38, 92%, 50%)',
        label: 'Pending',
      },
      success: {
        variant: 'softSuccess' as const,
        dotColor: 'hsl(142, 71%, 45%)',
        label: 'Success',
      },
      error: {
        variant: 'softDestructive' as const,
        dotColor: 'hsl(0, 84%, 60%)',
        label: 'Error',
      },
      warning: {
        variant: 'softWarning' as const,
        dotColor: 'hsl(38, 92%, 50%)',
        label: 'Warning',
      },
    }

    const config = statusConfig[status]

    return (
      <Badge
        ref={ref}
        variant={config.variant}
        dot
        dotColor={config.dotColor}
        {...props}
      >
        {props.children || config.label}
      </Badge>
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

// ============================================================================
// COUNT BADGE - For notification counts
// ============================================================================

export interface CountBadgeProps
  extends Omit<BadgeProps, 'variant' | 'shape'> {
  count: number
  max?: number
  showZero?: boolean
}

const CountBadge = React.forwardRef<HTMLSpanElement, CountBadgeProps>(
  ({ count, max = 99, showZero = false, ...props }, ref) => {
    if (count === 0 && !showZero) {
      return null
    }

    const displayCount = count > max ? `${max}+` : count.toString()

    return (
      <Badge
        ref={ref}
        variant="destructive"
        shape="pill"
        size="sm"
        {...props}
      >
        {displayCount}
      </Badge>
    )
  }
)

CountBadge.displayName = 'CountBadge'

// ============================================================================
// EXPORTS
// ============================================================================

export { Badge, BadgeGroup, StatusBadge, CountBadge, badgeVariants }
