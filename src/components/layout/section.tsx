import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: 'py-0',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16 lg:py-20',
      lg: 'py-16 md:py-24 lg:py-32',
      xl: 'py-24 md:py-32 lg:py-40',
    },
    variant: {
      default: 'bg-background',
      muted: 'bg-muted/30',
      gradient: 'bg-gradient-to-b from-primary/5 via-background to-background',
      dark: 'bg-muted',
    },
  },
  defaultVariants: {
    spacing: 'md',
    variant: 'default',
  },
})

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

/**
 * Section component for consistent vertical spacing and backgrounds
 *
 * @example
 * <Section spacing="lg" variant="gradient">
 *   <Container>
 *     <h2>Section Title</h2>
 *   </Container>
 * </Section>
 */
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, variant, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing, variant }), className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export { Section, sectionVariants }
