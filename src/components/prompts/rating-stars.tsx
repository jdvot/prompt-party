'use client'

import { useState, useCallback } from 'react'
import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

// ============================================================================
// TYPES
// ============================================================================

type RatingSize = 'sm' | 'md' | 'lg'

interface RatingStarsProps {
  /** Current rating value (0-5, supports half values like 4.5) */
  rating: number
  /** Maximum rating value */
  maxRating?: number
  /** Size of the stars */
  size?: RatingSize
  /** Whether the stars are interactive (clickable) */
  interactive?: boolean
  /** Callback when rating changes (only called in interactive mode) */
  onRatingChange?: (rating: number) => void
  /** Whether to show the average rating text */
  showAverage?: boolean
  /** Number of ratings (for display purposes) */
  ratingCount?: number
  /** Custom class name */
  className?: string
  /** Whether the component is disabled */
  disabled?: boolean
  /** Accessible label for the rating */
  ariaLabel?: string
}

// ============================================================================
// SIZE CONFIGURATIONS
// ============================================================================

const sizeConfig: Record<RatingSize, { star: string; text: string; gap: string }> = {
  sm: { star: 'w-4 h-4', text: 'text-xs', gap: 'gap-0.5' },
  md: { star: 'w-5 h-5', text: 'text-sm', gap: 'gap-1' },
  lg: { star: 'w-6 h-6', text: 'text-base', gap: 'gap-1.5' },
}

// ============================================================================
// RATING STARS COMPONENT
// ============================================================================

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  showAverage = false,
  ratingCount,
  className,
  disabled = false,
  ariaLabel,
}: RatingStarsProps) {
  const t = useTranslations('reviews')
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const config = sizeConfig[size]
  const displayRating = isHovering && hoverRating !== null ? hoverRating : rating

  // Handle mouse enter on a star
  const handleMouseEnter = useCallback((index: number) => {
    if (interactive && !disabled) {
      setIsHovering(true)
      setHoverRating(index + 1)
    }
  }, [interactive, disabled])

  // Handle mouse leave from the star container
  const handleMouseLeave = useCallback(() => {
    if (interactive && !disabled) {
      setIsHovering(false)
      setHoverRating(null)
    }
  }, [interactive, disabled])

  // Handle click on a star
  const handleClick = useCallback((index: number) => {
    if (interactive && !disabled && onRatingChange) {
      onRatingChange(index + 1)
    }
  }, [interactive, disabled, onRatingChange])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (!interactive || disabled) return

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onRatingChange?.(index + 1)
    } else if (e.key === 'ArrowRight' && index < maxRating - 1) {
      e.preventDefault()
      const nextStar = e.currentTarget.nextElementSibling as HTMLElement
      nextStar?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      const prevStar = e.currentTarget.previousElementSibling as HTMLElement
      prevStar?.focus()
    }
  }, [interactive, disabled, onRatingChange, maxRating])

  // Render a single star
  const renderStar = (index: number) => {
    const filled = displayRating >= index + 1
    const halfFilled = displayRating > index && displayRating < index + 1

    const starClasses = cn(
      config.star,
      'transition-all duration-200 ease-out',
      filled || halfFilled ? 'text-yellow-400' : 'text-muted-foreground/30',
      interactive && !disabled && [
        'cursor-pointer',
        'hover:scale-125 hover:text-yellow-400',
        'focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:rounded-sm',
      ],
      disabled && 'cursor-not-allowed opacity-50'
    )

    const fillClasses = cn(
      'fill-current',
      filled ? 'fill-yellow-400' : 'fill-transparent'
    )

    const StarComponent = halfFilled ? StarHalf : Star

    if (interactive) {
      return (
        <button
          key={index}
          type="button"
          className={cn(starClasses, 'p-0 bg-transparent border-none')}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          aria-label={t('rate_star', { count: index + 1 })}
          aria-pressed={filled}
        >
          <StarComponent className={cn(config.star, fillClasses)} />
        </button>
      )
    }

    return (
      <span key={index} className={starClasses} aria-hidden="true">
        <StarComponent className={cn(config.star, fillClasses)} />
      </span>
    )
  }

  // Format rating count for display
  const formatRatingCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <div
      className={cn('inline-flex items-center', config.gap, className)}
      onMouseLeave={handleMouseLeave}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={ariaLabel || t('rating_label', { rating: rating.toFixed(1), max: maxRating })}
    >
      {/* Stars */}
      <div className={cn('flex items-center', config.gap)}>
        {Array.from({ length: maxRating }).map((_, i) => renderStar(i))}
      </div>

      {/* Average rating and count */}
      {showAverage && (
        <div className={cn('flex items-center gap-1 text-muted-foreground', config.text)}>
          <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
          {ratingCount !== undefined && (
            <span>({formatRatingCount(ratingCount)})</span>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// RATING DISPLAY COMPONENT - Read-only version optimized for lists
// ============================================================================

interface RatingDisplayProps {
  rating: number
  ratingCount?: number
  size?: RatingSize
  className?: string
}

export function RatingDisplay({
  rating,
  ratingCount,
  size = 'sm',
  className,
}: RatingDisplayProps) {
  return (
    <RatingStars
      rating={rating}
      size={size}
      showAverage={true}
      ratingCount={ratingCount}
      className={className}
    />
  )
}

// ============================================================================
// RATING INPUT COMPONENT - Interactive version for forms
// ============================================================================

interface RatingInputProps {
  value: number
  onChange: (rating: number) => void
  size?: RatingSize
  disabled?: boolean
  required?: boolean
  error?: string
  className?: string
}

export function RatingInput({
  value,
  onChange,
  size = 'md',
  disabled = false,
  required = false,
  error,
  className,
}: RatingInputProps) {
  const t = useTranslations('reviews')

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <RatingStars
        rating={value}
        size={size}
        interactive={true}
        onRatingChange={onChange}
        disabled={disabled}
        ariaLabel={required ? t('rating_required') : t('select_rating')}
      />
      {error && (
        <span className="text-xs text-destructive" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

// ============================================================================
// RATING DISTRIBUTION COMPONENT - Shows rating breakdown
// ============================================================================

interface RatingDistributionProps {
  distribution: Record<number, number>
  totalRatings: number
  size?: RatingSize
  className?: string
}

export function RatingDistribution({
  distribution,
  totalRatings,
  size = 'sm',
  className,
}: RatingDistributionProps) {
  const t = useTranslations('reviews')
  const config = sizeConfig[size]

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {[5, 4, 3, 2, 1].map((star) => {
        const count = distribution[star] || 0
        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0

        return (
          <div key={star} className="flex items-center gap-2">
            <span className={cn('w-3 text-muted-foreground', config.text)}>
              {star}
            </span>
            <Star className={cn('w-3 h-3 text-yellow-400 fill-yellow-400')} />
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className={cn('w-8 text-right text-muted-foreground', config.text)}>
              {count}
            </span>
          </div>
        )
      })}
      <p className={cn('text-muted-foreground mt-1', config.text)}>
        {t('total_ratings', { count: totalRatings })}
      </p>
    </div>
  )
}
