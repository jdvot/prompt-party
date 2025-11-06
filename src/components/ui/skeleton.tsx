import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

// ============================================================================
// SKELETON VARIANTS
// ============================================================================

const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted overflow-hidden relative',
  {
    variants: {
      variant: {
        default: '',
        shimmer: 'skeleton-shimmer',
        wave: 'animate-[shimmer_2s_ease-in-out_infinite]',
      },
      shape: {
        default: 'rounded-md',
        circle: 'rounded-full',
        rect: 'rounded-sm',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'shimmer',
      shape: 'default',
    },
  }
)

// ============================================================================
// SKELETON COMPONENT
// ============================================================================

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, shape, width, height, style, ...props }, ref) => {
    const inlineStyles = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, shape }), className)}
        style={inlineStyles}
        role="status"
        aria-label="Loading..."
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// ============================================================================
// PRE-BUILT SKELETON PATTERNS
// ============================================================================

export interface SkeletonTextProps {
  lines?: number
  className?: string
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, className }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{
            width: i === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  )
)

SkeletonText.displayName = 'SkeletonText'

export interface SkeletonCardProps {
  className?: string
  showImage?: boolean
  showAvatar?: boolean
}

export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, showImage = true, showAvatar = false }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)}>
      {showImage && <Skeleton className="h-48 w-full" />}
      {showAvatar && (
        <div className="flex items-center gap-3">
          <Skeleton shape="circle" className="h-10 w-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <SkeletonText lines={3} />
      </div>
    </div>
  )
)

SkeletonCard.displayName = 'SkeletonCard'

export interface SkeletonAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 'md', className }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    }

    return (
      <Skeleton
        ref={ref}
        shape="circle"
        className={cn(sizeClasses[size], className)}
      />
    )
  }
)

SkeletonAvatar.displayName = 'SkeletonAvatar'

export interface SkeletonButtonProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const SkeletonButton = React.forwardRef<HTMLDivElement, SkeletonButtonProps>(
  ({ size = 'md', className }, ref) => {
    const sizeClasses = {
      sm: 'h-9 w-20',
      md: 'h-10 w-24',
      lg: 'h-11 w-28',
    }

    return (
      <Skeleton
        ref={ref}
        className={cn(sizeClasses[size], 'rounded-lg', className)}
      />
    )
  }
)

SkeletonButton.displayName = 'SkeletonButton'

export interface SkeletonTableProps {
  rows?: number
  columns?: number
  className?: string
}

export const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonTableProps>(
  ({ rows = 5, columns = 4, className }, ref) => (
    <div ref={ref} className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-8 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
)

SkeletonTable.displayName = 'SkeletonTable'

export interface SkeletonListProps {
  items?: number
  showAvatar?: boolean
  className?: string
}

export const SkeletonList = React.forwardRef<HTMLDivElement, SkeletonListProps>(
  ({ items = 5, showAvatar = true, className }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          {showAvatar && <Skeleton shape="circle" className="h-10 w-10" />}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
)

SkeletonList.displayName = 'SkeletonList'

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Skeleton,
  skeletonVariants,
}
