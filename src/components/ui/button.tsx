import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap leading-none',
  {
    variants: {
      variant: {
        // Primary - Premium gradient with lift effect (POR-58)
        primary: [
          'btn-primary-premium',
          'text-white',
        ].join(' '),

        // Secondary - Electric blue
        secondary: [
          'bg-gradient-to-r from-brand-secondary to-brand-secondary-light',
          'text-white shadow-lg shadow-brand-secondary/30',
          'hover:shadow-xl hover:shadow-brand-secondary/40 hover:-translate-y-0.5',
          'active:translate-y-0',
          'transition-all duration-200 ease-out-expo',
        ].join(' '),

        // Outline - Modern border with hover fill
        outline: [
          'border-2 border-border bg-transparent',
          'hover:bg-muted hover:border-brand-primary/30',
          'active:bg-muted/80',
          'transition-all duration-200',
        ].join(' '),

        // Ghost - Subtle hover (POR-58)
        ghost: [
          'bg-transparent',
          'border-[1.5px] border-border',
          'hover:bg-muted hover:border-brand-primary/50',
          'active:bg-muted/80',
          'transition-all duration-200',
        ].join(' '),

        // Destructive - Error state
        destructive: [
          'bg-destructive text-destructive-foreground',
          'shadow-lg shadow-destructive/30',
          'hover:bg-destructive/90 hover:shadow-xl hover:shadow-destructive/40 hover:-translate-y-0.5',
          'active:translate-y-0',
          'transition-all duration-200',
        ].join(' '),

        // Success - Confirmation actions
        success: [
          'bg-success text-white',
          'shadow-lg shadow-success/30',
          'hover:bg-success/90 hover:shadow-xl hover:shadow-success/40 hover:-translate-y-0.5',
          'active:translate-y-0',
          'transition-all duration-200',
        ].join(' '),

        // Link - Text-only
        link: 'text-brand-primary underline-offset-4 hover:underline transition-colors duration-200',

        // Gradient - Premium animated gradient (POR-58)
        gradient: [
          'btn-gradient-premium',
          'text-white',
        ].join(' '),

        // Glow - Pulsing glow effect (POR-58)
        glow: [
          'btn-primary-premium btn-glow',
          'text-white',
        ].join(' '),

        // Soft - Subtle colored background
        soft: [
          'bg-brand-primary/10 text-brand-primary',
          'hover:bg-brand-primary/20',
          'active:bg-brand-primary/30',
          'transition-all duration-200',
        ].join(' '),

        // Pill - Full rounded variant (POR-58)
        pill: [
          'btn-primary-premium btn-pill',
          'text-white',
        ].join(' '),

        // Ghost Premium - Subtle border with accent hover (POR-58)
        ghostPremium: [
          'btn-ghost-premium',
        ].join(' '),

        // Icon Only - Square button for icons (POR-58)
        iconOnly: [
          'btn-icon-only bg-transparent',
          'border-[1.5px] border-border',
          'hover:bg-muted hover:border-brand-primary/50',
          'active:bg-muted/80',
          'transition-all duration-200',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        md: 'h-11 px-6 text-base rounded-xl',
        lg: 'h-13 px-8 text-lg rounded-xl',
        xl: 'h-14 px-10 text-xl rounded-2xl btn-xl',
        icon: 'h-10 w-10 rounded-lg',
        iconSm: 'h-9 w-9 rounded-lg',
        iconMd: 'h-11 w-11 rounded-xl',
        iconLg: 'h-13 w-13 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading

    // When asChild is true, Slot expects a single React element child
    // We cannot add loading spinner as additional children
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          aria-busy={loading}
          aria-disabled={isDisabled}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className="inline-flex leading-none" aria-hidden="true">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="presentation"
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
          </span>
        )}
        {children}
        {loading && <span className="sr-only">Loading...</span>}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
