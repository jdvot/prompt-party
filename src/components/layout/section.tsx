import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: 'py-0',
      sm: 'py-16 md:py-20',
      md: 'py-20 md:py-28',
      lg: 'py-28 md:py-36',
      xl: 'py-36 md:py-48',
    },
    background: {
      default: 'bg-background',
      muted: 'bg-muted/30',
      gradient: 'bg-gradient-to-b from-background to-muted/20',
      dark: 'bg-gray-950 dark:bg-gray-900',
      accent:
        'bg-gradient-to-b from-primary/5 via-background to-background dark:from-primary/10 dark:via-background dark:to-background',
      cream: 'bg-[hsl(var(--color-cream))] dark:bg-background',
    },
  },
  defaultVariants: {
    spacing: 'md',
    background: 'default',
  },
})

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** @deprecated Use 'background' instead. Kept for backwards compatibility. */
  variant?: 'default' | 'muted' | 'gradient' | 'dark' | 'accent' | 'cream' | null
  /** Whether to wrap children in a container with max-width and padding */
  container?: boolean
}

/**
 * Section component for consistent vertical spacing and backgrounds
 *
 * @example
 * // Basic usage with container
 * <Section spacing="lg" background="gradient" container>
 *   <h2>Section Title</h2>
 *   <p>Section content</p>
 * </Section>
 *
 * @example
 * // Full-width section without container
 * <Section spacing="md" background="cream">
 *   <div className="container mx-auto px-4 md:px-6">
 *     <h2>Custom Container</h2>
 *   </div>
 * </Section>
 */
const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { className, spacing, background, variant, container = false, children, ...props },
    ref
  ) => {
    // Support both 'background' and 'variant' props for backwards compatibility
    const bg = background ?? variant ?? 'default'
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing, background: bg }), className)}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-4 md:px-6">{children}</div>
        ) : (
          children
        )}
      </section>
    )
  }
)

Section.displayName = 'Section'

export { Section, sectionVariants }
