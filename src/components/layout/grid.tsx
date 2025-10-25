import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const gridVariants = cva('grid w-full', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
      auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      'auto-fit': 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
      'auto-fill': 'grid-cols-[repeat(auto-fill,minmax(280px,1fr))]',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    },
  },
  defaultVariants: {
    cols: 3,
    gap: 'md',
  },
})

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

/**
 * Grid component for responsive layouts
 *
 * @example
 * // 3-column responsive grid
 * <Grid cols={3} gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * @example
 * // Auto-fit grid with minimum card width
 * <Grid cols="auto-fit" gap="md">
 *   <Card>Dynamic Item 1</Card>
 *   <Card>Dynamic Item 2</Card>
 * </Grid>
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap }), className)}
        {...props}
      />
    )
  }
)

Grid.displayName = 'Grid'

export { Grid, gridVariants }
