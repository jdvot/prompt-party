import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { FileQuestion, Search, Database, Inbox, AlertCircle } from 'lucide-react'

// ============================================================================
// EMPTY STATE VARIANTS
// ============================================================================

const emptyStatePresetIcons = {
  'no-data': Database,
  'no-results': Search,
  'empty-inbox': Inbox,
  'not-found': FileQuestion,
  error: AlertCircle,
} as const

// ============================================================================
// EMPTY STATE COMPONENT
// ============================================================================

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof emptyStatePresetIcons
  icon?: React.ComponentType<{ className?: string }>
  illustration?: React.ReactNode
  illustrationSrc?: string // Path to SVG illustration
  title?: string
  titleKey?: string // Translation key for title
  description?: string
  descriptionKey?: string // Translation key for description
  action?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  secondaryAction?: {
    label: string
    href: string
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
      titleKey,
      description,
      descriptionKey,
      action,
      secondaryAction,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const t = useTranslations()

    // Get preset icon if variant is provided
    const Icon = IconComponent || (variant ? emptyStatePresetIcons[variant] : undefined)

    // Get title from translation key or direct prop
    let finalTitle = title
    if (titleKey) {
      finalTitle = t(titleKey)
    } else if (variant && !title) {
      // Use default translation key for preset variants
      const titleKeyMap: Record<keyof typeof emptyStatePresetIcons, string> = {
        'no-data': 'components.emptyState.noData',
        'no-results': 'components.emptyState.noResults',
        'empty-inbox': 'components.emptyState.emptyInbox',
        'not-found': 'components.emptyState.notFound',
        error: 'components.emptyState.error',
      }
      finalTitle = t(titleKeyMap[variant])
    }

    // Get description from translation key or direct prop
    let finalDescription = description
    if (descriptionKey) {
      finalDescription = t(descriptionKey)
    } else if (variant && !description) {
      // Use default translation key for preset variants
      const descKeyMap: Record<keyof typeof emptyStatePresetIcons, string> = {
        'no-data': 'components.emptyState.noDataDesc',
        'no-results': 'components.emptyState.noResultsDesc',
        'empty-inbox': 'components.emptyState.emptyInboxDesc',
        'not-found': 'components.emptyState.notFoundDesc',
        error: 'components.emptyState.errorDesc',
      }
      finalDescription = t(descKeyMap[variant])
    }

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
                asChild
                variant={action.variant || 'primary'}
                size={size === 'sm' ? 'sm' : 'md'}
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            )}
            {secondaryAction && (
              <Button
                asChild
                variant="ghost"
                size={size === 'sm' ? 'sm' : 'md'}
              >
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
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
