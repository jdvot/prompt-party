import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

// ============================================================================
// STACK VARIANTS
// ============================================================================

const stackVariants = cva('flex', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    spacing: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    spacing: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
})

// ============================================================================
// STACK COMPONENT
// ============================================================================

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  divider?: React.ReactNode
  as?: React.ElementType
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction,
      spacing,
      align,
      justify,
      wrap,
      divider,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    const childArray = React.Children.toArray(children).filter(Boolean)

    return (
      <Component
        ref={ref}
        className={cn(
          stackVariants({ direction, spacing, align, justify, wrap }),
          className
        )}
        {...props}
      >
        {divider
          ? childArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childArray.length - 1 && (
                  <div
                    className={cn(
                      'flex-shrink-0',
                      direction === 'vertical' ? 'w-full' : 'h-full'
                    )}
                  >
                    {divider}
                  </div>
                )}
              </React.Fragment>
            ))
          : children}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'

// ============================================================================
// VSTACK - Vertical Stack (convenience component)
// ============================================================================

export interface VStackProps extends Omit<StackProps, 'direction'> {}

const VStack = React.forwardRef<HTMLDivElement, VStackProps>((props, ref) => (
  <Stack ref={ref} direction="vertical" {...props} />
))

VStack.displayName = 'VStack'

// ============================================================================
// HSTACK - Horizontal Stack (convenience component)
// ============================================================================

export interface HStackProps extends Omit<StackProps, 'direction'> {}

const HStack = React.forwardRef<HTMLDivElement, HStackProps>((props, ref) => (
  <Stack ref={ref} direction="horizontal" {...props} />
))

HStack.displayName = 'HStack'

// ============================================================================
// EXPORTS
// ============================================================================

export { Stack, VStack, HStack, stackVariants }
