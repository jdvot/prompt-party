import * as React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'

// ============================================================================
// LOADING SKELETON PRESETS
// ============================================================================

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'card'
    | 'list'
    | 'table'
    | 'profile'
    | 'post'
    | 'grid'
    | 'text'
  count?: number
}

const LoadingSkeleton = React.forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  ({ className, variant = 'card', count = 1, ...props }, ref) => {
    const renderSkeleton = () => {
      switch (variant) {
        case 'card':
          return (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          )

        case 'list':
          return (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )

        case 'table':
          return (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 pb-3 border-b">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-4 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          )

        case 'profile':
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          )

        case 'post':
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-64 w-full rounded-xl" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          )

        case 'grid':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          )

        case 'text':
          return (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )

        default:
          return <Skeleton className="h-32 w-full" />
      }
    }

    return (
      <div ref={ref} className={cn('animate-in fade-in', className)} {...props}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={cn(count > 1 && index > 0 && 'mt-6')}>
            {renderSkeleton()}
          </div>
        ))}
      </div>
    )
  }
)

LoadingSkeleton.displayName = 'LoadingSkeleton'

// ============================================================================
// INLINE LOADING SPINNER
// ============================================================================

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'secondary'
  label?: string
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = 'md', variant = 'default', label, ...props }, ref) => {
    const sizeClasses = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    }

    const variantClasses = {
      default: 'text-muted-foreground',
      primary: 'text-brand-primary',
      secondary: 'text-brand-secondary',
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        <svg
          className={cn(
            'animate-spin',
            sizeClasses[size],
            variantClasses[variant]
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'

// ============================================================================
// FULL PAGE LOADING
// ============================================================================

export interface LoadingPageProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

const LoadingPage = React.forwardRef<HTMLDivElement, LoadingPageProps>(
  ({ className, message = 'Loading...', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-screen items-center justify-center',
        className
      )}
      {...props}
    >
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" variant="primary" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  )
)

LoadingPage.displayName = 'LoadingPage'

// ============================================================================
// EXPORTS
// ============================================================================

export { LoadingSkeleton, LoadingSpinner, LoadingPage }
