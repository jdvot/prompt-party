import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { FileQuestion, Search, Database, Inbox, AlertCircle } from 'lucide-react'

// ============================================================================
// EMPTY STATE VARIANTS
// ============================================================================

const emptyStatePresets = {
  'no-data': {
    icon: Database,
    title: 'No data available',
    description: 'There is currently no data to display.',
  },
  'no-results': {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
  },
  'empty-inbox': {
    icon: Inbox,
    title: 'Your inbox is empty',
    description: 'When you receive new messages, they will appear here.',
  },
  'not-found': {
    icon: FileQuestion,
    title: 'Page not found',
    description: 'The page you are looking for does not exist.',
  },
  error: {
    icon: AlertCircle,
    title: 'Something went wrong',
    description: 'An error occurred while loading this content.',
  },
} as const

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof emptyStatePresets
  icon?: React.ComponentType<{ className?: string }>
  illustration?: React.ReactNode
  illustrationSrc?: string // Path to SVG illustration
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  size?: 'sm' | 'md' | 'lg'
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant,
      icon: IconComponent,
      illustration,
      illustrationSrc,
      title,
      description,
      action,
      secondaryAction,
      size = 'md',
      ...props
    },
    ref
  ) => {
    // Get preset if variant is provided
    const preset = variant ? emptyStatePresets[variant] : null
    const Icon = IconComponent || preset?.icon
    const finalTitle = title || preset?.title
    const finalDescription = description || preset?.description

    // Size classes
    const sizeClasses = {
      sm: {
        container: 'py-8',
        icon: 'h-12 w-12',
        illustration: 'max-w-[200px]',
        title: 'text-base',
        description: 'text-sm',
      },
      md: {
        container: 'py-12',
        icon: 'h-16 w-16',
        illustration: 'max-w-[300px]',
        title: 'text-lg',
        description: 'text-base',
      },
      lg: {
        container: 'py-16',
        icon: 'h-20 w-20',
        illustration: 'max-w-[400px]',
        title: 'text-xl',
        description: 'text-lg',
      },
    }

    const sizes = sizeClasses[size]

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          sizes.container,
          className
        )}
        {...props}
      >
        {/* Icon or Illustration */}
        {illustrationSrc ? (
          <div className={cn('mb-8', sizes.illustration, 'w-full relative')}>
            <Image
              src={illustrationSrc}
              alt={finalTitle || 'Empty state'}
              width={400}
              height={300}
              className="w-full h-auto"
            />
          </div>
        ) : illustration ? (
          <div className="mb-6">{illustration}</div>
        ) : Icon ? (
          <div
            className={cn(
              'rounded-full bg-muted p-4 mb-6 text-muted-foreground',
              sizes.icon
            )}
          >
            <Icon className="w-full h-full" />
          </div>
        ) : null}

        {/* Title */}
        {finalTitle && (
          <h3
            className={cn(
              'font-semibold text-foreground mb-2',
              sizes.title
            )}
          >
            {finalTitle}
          </h3>
        )}

        {/* Description */}
        {finalDescription && (
          <p
            className={cn(
              'text-muted-foreground max-w-md mb-6',
              sizes.description
            )}
          >
            {finalDescription}
          </p>
        )}

        {/* Actions */}
        {(action || secondaryAction) && (
          <div className="flex items-center gap-3">
            {action && (
              <Button
                onClick={action.onClick}
                variant={action.variant || 'primary'}
                size={size === 'sm' ? 'sm' : 'md'}
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant="ghost"
                size={size === 'sm' ? 'sm' : 'md'}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'

// ============================================================================
// EXPORTS
// ============================================================================

export { EmptyState }
