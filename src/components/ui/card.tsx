import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'bg-card text-card-foreground border transition-all',
  {
    variants: {
      variant: {
        // Default - Standard card
        default: 'border-border duration-300',

        // Interactive - Hover lift effect
        interactive: [
          'border-border cursor-pointer',
          'hover:shadow-lg hover:-translate-y-1',
          'hover:border-brand-primary/30',
          'active:translate-y-0',
          'duration-300',
        ].join(' '),

        // Premium - Enhanced hover with lift and glow (POR-59)
        premium: [
          'card-premium',
          'border-border',
        ].join(' '),

        // Glass - Enhanced glassmorphism effect (POR-59)
        glass: [
          'card-glass',
        ].join(' '),

        // Gradient Border - Shows gradient border on hover (POR-59)
        gradientBorder: [
          'card-gradient-border',
          'border-border',
        ].join(' '),

        // Bento - Modern trendy card with gradient border on hover
        bento: [
          'rounded-3xl bg-gradient-to-br from-card to-surface-raised',
          'border-border',
          'hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2',
          'relative overflow-hidden',
          'duration-500',
        ].join(' '),

        // Feature - Cards for feature sections
        feature: [
          'bg-gradient-to-b from-white to-gray-50/50',
          'dark:from-surface-raised dark:to-surface-base',
          'border-border',
          'hover:shadow-xl hover:-translate-y-1',
          'duration-300',
        ].join(' '),

        // Outlined - Prominent border
        outlined: [
          'border-2 border-brand-primary/20',
          'hover:border-brand-primary/40',
          'hover:shadow-md',
          'duration-300',
        ].join(' '),

        // Elevated - Strong shadow
        elevated: 'border-transparent shadow-elevation-4 hover:shadow-elevation-5 duration-300',

        // Compact - Smaller cards for tight layouts
        compact: [
          'border-border',
          'hover:shadow-md hover:border-brand-primary/20',
          'duration-300',
        ].join(' '),

        // Prompt - Specific for prompt cards (POR-59)
        prompt: [
          'card-prompt',
          'border-border overflow-hidden',
        ].join(' '),

        // Premium Full - Complete premium styling with CSS class (POR-59)
        premiumFull: 'card-premium-full',

        // Glass Full - Complete glassmorphism with CSS class (POR-59)
        glassFull: 'card-glass-full',

        // Gradient Border Mask - CSS mask-based gradient border (POR-59)
        gradientBorderMask: 'card-gradient-border-mask',

        // Interactive Click - With click feedback (POR-59)
        interactiveClick: 'card-interactive-click border-border',

        // Spotlight - Mouse-following spotlight effect (POR-59)
        spotlight: [
          'card-spotlight',
          'border-border',
        ].join(' '),
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

export type CardVariant = VariantProps<typeof cardVariants>['variant']
export type CardPadding = VariantProps<typeof cardVariants>['padding']
export type CardRadius = VariantProps<typeof cardVariants>['radius']

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
