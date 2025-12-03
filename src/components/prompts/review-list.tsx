'use client'

import { useState, useMemo, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RatingStars, RatingDistribution } from '@/components/prompts/rating-stars'
import type { ReviewTag } from '@/components/prompts/review-form'
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  Clock,
  TrendingUp,
  Filter,
  Check,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Flag,
  Trash2,
  Edit,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// ============================================================================
// TYPES
// ============================================================================

export interface Review {
  id: string
  promptId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  content: string
  tags: ReviewTag[]
  helpfulCount: number
  notHelpfulCount: number
  createdAt: string
  updatedAt?: string
  userHasVoted?: 'helpful' | 'not_helpful' | null
  isOwner?: boolean
}

type SortOption = 'most_recent' | 'most_helpful' | 'highest_rated' | 'lowest_rated'
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1'

interface ReviewListProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  ratingDistribution: Record<number, number>
  onVote: (reviewId: string, vote: 'helpful' | 'not_helpful') => Promise<void>
  onReport?: (reviewId: string) => void
  onEdit?: (reviewId: string) => void
  onDelete?: (reviewId: string) => void
  currentUserId?: string
  className?: string
  showDistribution?: boolean
}

// ============================================================================
// TAG CONFIGURATION
// ============================================================================

const tagConfig: Record<ReviewTag, { icon: React.ElementType; colorClass: string }> = {
  useful: {
    icon: Check,
    colorClass: 'bg-success/10 text-success',
  },
  creative: {
    icon: Sparkles,
    colorClass: 'bg-purple-500/10 text-purple-500',
  },
  well_documented: {
    icon: FileText,
    colorClass: 'bg-blue-500/10 text-blue-500',
  },
}

// ============================================================================
// REVIEW ITEM COMPONENT
// ============================================================================

interface ReviewItemProps {
  review: Review
  onVote: (reviewId: string, vote: 'helpful' | 'not_helpful') => Promise<void>
  onReport?: (reviewId: string) => void
  onEdit?: (reviewId: string) => void
  onDelete?: (reviewId: string) => void
}

function ReviewItem({
  review,
  onVote,
  onReport,
  onEdit,
  onDelete,
}: ReviewItemProps) {
  const t = useTranslations('reviews')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  // Format date
  const formattedDate = useMemo(() => {
    const date = new Date(review.createdAt)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return t('today')
    if (diffInDays === 1) return t('yesterday')
    if (diffInDays < 7) return t('days_ago', { count: diffInDays })
    if (diffInDays < 30) return t('weeks_ago', { count: Math.floor(diffInDays / 7) })
    if (diffInDays < 365) return t('months_ago', { count: Math.floor(diffInDays / 30) })
    return date.toLocaleDateString()
  }, [review.createdAt, t])

  // Handle vote
  const handleVote = async (vote: 'helpful' | 'not_helpful') => {
    if (isVoting) return
    setIsVoting(true)
    try {
      await onVote(review.id, vote)
    } finally {
      setIsVoting(false)
    }
  }

  // User initials for avatar fallback
  const userInitials = review.userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Check if content should be truncated
  const shouldTruncate = review.content.length > 300
  const displayContent = shouldTruncate && !isExpanded
    ? review.content.slice(0, 300) + '...'
    : review.content

  return (
    <article className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors">
      {/* Avatar */}
      <Avatar className="h-10 w-10 shrink-0">
        {review.userAvatar && (
          <AvatarImage src={review.userAvatar} alt={review.userName} />
        )}
        <AvatarFallback className="bg-muted text-muted-foreground text-sm">
          {userInitials}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-medium text-foreground">{review.userName}</span>
            <div className="flex items-center gap-2">
              <RatingStars rating={review.rating} size="sm" />
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            </div>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('more_options')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {review.isOwner && onEdit && (
                <DropdownMenuItem onClick={() => onEdit(review.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {t('edit')}
                </DropdownMenuItem>
              )}
              {review.isOwner && onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(review.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('delete')}
                </DropdownMenuItem>
              )}
              {!review.isOwner && onReport && (
                <DropdownMenuItem onClick={() => onReport(review.id)}>
                  <Flag className="h-4 w-4 mr-2" />
                  {t('report')}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tags */}
        {review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {review.tags.map((tag) => {
              const config = tagConfig[tag]
              const Icon = config.icon
              return (
                <span
                  key={tag}
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                    config.colorClass
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {t(`tag_${tag}`)}
                </span>
              )
            })}
          </div>
        )}

        {/* Review Content */}
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {displayContent}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 mt-2 text-sm text-brand-primary hover:underline"
          >
            {isExpanded ? (
              <>
                {t('show_less')}
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                {t('show_more')}
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}

        {/* Helpful Votes */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">{t('was_this_helpful')}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote('helpful')}
              disabled={isVoting}
              className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors',
                'hover:bg-success/10 focus:outline-none focus:ring-2 focus:ring-success/50',
                review.userHasVoted === 'helpful'
                  ? 'bg-success/10 text-success'
                  : 'text-muted-foreground',
                isVoting && 'opacity-50 cursor-not-allowed'
              )}
              aria-pressed={review.userHasVoted === 'helpful'}
              aria-label={t('helpful')}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{review.helpfulCount}</span>
            </button>
            <button
              onClick={() => handleVote('not_helpful')}
              disabled={isVoting}
              className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors',
                'hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-destructive/50',
                review.userHasVoted === 'not_helpful'
                  ? 'bg-destructive/10 text-destructive'
                  : 'text-muted-foreground',
                isVoting && 'opacity-50 cursor-not-allowed'
              )}
              aria-pressed={review.userHasVoted === 'not_helpful'}
              aria-label={t('not_helpful')}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>{review.notHelpfulCount}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

// ============================================================================
// REVIEW LIST COMPONENT
// ============================================================================

export function ReviewList({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution,
  onVote,
  onReport,
  onEdit,
  onDelete,
  currentUserId,
  className,
  showDistribution = true,
}: ReviewListProps) {
  const t = useTranslations('reviews')
  const [sortBy, setSortBy] = useState<SortOption>('most_helpful')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')

  // Sort and filter reviews
  const processedReviews = useMemo(() => {
    let filtered = [...reviews]

    // Apply filter
    if (filterBy !== 'all') {
      const ratingFilter = parseInt(filterBy)
      filtered = filtered.filter((r) => r.rating === ratingFilter)
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'most_recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'most_helpful':
          return b.helpfulCount - a.helpfulCount
        case 'highest_rated':
          return b.rating - a.rating
        case 'lowest_rated':
          return a.rating - b.rating
        default:
          return 0
      }
    })

    return filtered
  }, [reviews, sortBy, filterBy])

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Summary Section */}
      {showDistribution && totalReviews > 0 && (
        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-border bg-card">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center gap-2 md:pr-6 md:border-r md:border-border">
            <span className="text-5xl font-bold text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <RatingStars rating={averageRating} size="lg" />
            <span className="text-sm text-muted-foreground">
              {t('based_on_reviews', { count: totalReviews })}
            </span>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1">
            <RatingDistribution
              distribution={ratingDistribution}
              totalRatings={totalReviews}
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">
          {t('reviews_title', { count: totalReviews })}
        </h3>

        <div className="flex items-center gap-3">
          {/* Filter */}
          <Select value={filterBy} onValueChange={(v) => setFilterBy(v as FilterOption)}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t('filter_by_rating')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all_ratings')}</SelectItem>
              {[5, 4, 3, 2, 1].map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  <div className="flex items-center gap-2">
                    <span>{rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t('sort_by')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most_helpful">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t('most_helpful')}
                </div>
              </SelectItem>
              <SelectItem value="most_recent">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t('most_recent')}
                </div>
              </SelectItem>
              <SelectItem value="highest_rated">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  {t('highest_rated')}
                </div>
              </SelectItem>
              <SelectItem value="lowest_rated">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 rotate-180" />
                  {t('lowest_rated')}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      {processedReviews.length > 0 ? (
        <div className="flex flex-col gap-4">
          {processedReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={{
                ...review,
                isOwner: review.userId === currentUserId,
              }}
              onVote={onVote}
              onReport={onReport}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Star className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">
            {filterBy !== 'all' ? t('no_reviews_filter') : t('no_reviews')}
          </p>
          {filterBy !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterBy('all')}
              className="mt-2"
            >
              {t('clear_filter')}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// REVIEW SUMMARY COMPONENT - Compact version for cards
// ============================================================================

interface ReviewSummaryProps {
  averageRating: number
  totalReviews: number
  size?: 'sm' | 'md'
  className?: string
}

export function ReviewSummary({
  averageRating,
  totalReviews,
  size = 'sm',
  className,
}: ReviewSummaryProps) {
  const t = useTranslations('reviews')

  if (totalReviews === 0) {
    return (
      <span className={cn('text-xs text-muted-foreground', className)}>
        {t('no_reviews_yet')}
      </span>
    )
  }

  return (
    <RatingStars
      rating={averageRating}
      size={size}
      showAverage
      ratingCount={totalReviews}
      className={className}
    />
  )
}
