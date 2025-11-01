import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'bg-card text-card-foreground border transition-all duration-300',
  {
    variants: {
      variant: {
        // Default - Standard card
        default: 'border-border',

        // Interactive - Hover lift effect
        interactive: [
          'border-border cursor-pointer',
          'hover:shadow-lg hover:-translate-y-1',
          'hover:border-brand-primary/30',
          'active:translate-y-0',
        ].join(' '),

        // Bento - Modern trendy card with gradient border on hover
        bento: [
          'rounded-3xl bg-gradient-to-br from-card to-surface-raised',
          'border-border',
          'hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2',
          'relative overflow-hidden',
          'transition-all duration-500',
        ].join(' '),

        // Feature - Cards for feature sections
        feature: [
          'bg-gradient-to-b from-white to-gray-50/50',
          'dark:from-surface-raised dark:to-surface-base',
          'border-border',
          'hover:shadow-xl hover:-translate-y-1',
        ].join(' '),

        // Glass - Glassmorphism effect
        glass: [
          'bg-white/70 dark:bg-gray-900/60',
          'backdrop-filter backdrop-blur-xl backdrop-saturate-150',
          'border-white/20 dark:border-white/10',
          'shadow-lg',
        ].join(' '),

        // Outlined - Prominent border
        outlined: [
          'border-2 border-brand-primary/20',
          'hover:border-brand-primary/40',
          'hover:shadow-md',
        ].join(' '),

        // Elevated - Strong shadow
        elevated: 'border-transparent shadow-elevation-4 hover:shadow-elevation-5',
      },

      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },

      radius: {
        default: 'rounded-xl',
        sm: 'rounded-lg',
        lg: 'rounded-2xl',
        xl: 'rounded-3xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      radius: 'default',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, radius, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, radius }), className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-tight tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground leading-relaxed', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mt-4', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2 mt-6', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
