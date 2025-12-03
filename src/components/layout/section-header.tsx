import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Badge } from '@/components/ui/badge'

const sectionHeaderVariants = cva('flex flex-col', {
  variants: {
    align: {
      left: 'items-start text-left',
      center: 'items-center text-center',
      right: 'items-end text-right',
    },
    spacing: {
      sm: 'mb-8 md:mb-12',
      md: 'mb-12 md:mb-16',
      lg: 'mb-16 md:mb-20',
    },
  },
  defaultVariants: {
    align: 'center',
    spacing: 'md',
  },
})

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionHeaderVariants> {
  /** Optional badge text displayed above the title */
  badge?: string
  /** The main heading text */
  title: string
  /** Optional description text below the title */
  description?: string
  /** Whether to use gradient text for the title */
  gradientTitle?: boolean
  /** Maximum width for the header content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const maxWidthMap = {
  sm: 'max-w-xl',
  md: 'max-w-2xl',
  lg: 'max-w-3xl',
  xl: 'max-w-4xl',
  full: 'max-w-none',
}

/**
 * SectionHeader component for consistent section titles and descriptions
 *
 * @example
 * // Centered header with badge
 * <SectionHeader
 *   badge="Features"
 *   title="Everything you need to master AI prompts"
 *   description="Discover tools and resources designed to help you create, share, and optimize your prompts."
 *   align="center"
 * />
 *
 * @example
 * // Left-aligned header with gradient title
 * <SectionHeader
 *   title="Our Mission"
 *   description="Building the best prompt sharing community."
 *   align="left"
 *   gradientTitle
 * />
 */
const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      align,
      spacing,
      badge,
      title,
      description,
      gradientTitle = false,
      maxWidth = 'lg',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(sectionHeaderVariants({ align, spacing }), className)}
        {...props}
      >
        <div className={cn('w-full', maxWidthMap[maxWidth])}>
          {badge && (
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1 text-sm font-medium"
            >
              {badge}
            </Badge>
          )}
          <h2
            className={cn(
              'text-h2 font-semibold tracking-tight text-foreground',
              gradientTitle && 'text-gradient-primary animate-gradient'
            )}
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground text-balance leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'

export { SectionHeader, sectionHeaderVariants }
