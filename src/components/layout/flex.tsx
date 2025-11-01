import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

// ============================================================================
// FLEX VARIANTS
// ============================================================================

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      rowReverse: 'flex-row-reverse',
      columnReverse: 'flex-col-reverse',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      wrapReverse: 'flex-wrap-reverse',
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
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
  },
  defaultVariants: {
    direction: 'row',
    wrap: 'nowrap',
    align: 'stretch',
    justify: 'start',
    gap: 'md',
  },
})

// ============================================================================
// FLEX COMPONENT
// ============================================================================

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  as?: React.ElementType
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction,
      wrap,
      align,
      justify,
      gap,
      as: Component = 'div',
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={cn(
        flexVariants({ direction, wrap, align, justify, gap }),
        className
      )}
      {...props}
    />
  )
)

Flex.displayName = 'Flex'

// ============================================================================
// EXPORTS
// ============================================================================

export { Flex, flexVariants }
