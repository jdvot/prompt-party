'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { RatingInput } from '@/components/prompts/rating-stars'
import { Check, Sparkles, FileText, Lightbulb } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

export type ReviewTag = 'useful' | 'creative' | 'well_documented'

export interface ReviewFormData {
  rating: number
  content: string
  tags: ReviewTag[]
}

interface ReviewFormProps {
  /** The prompt ID this review is for */
  promptId: string
  /** Callback when the review is submitted */
  onSubmit: (data: ReviewFormData) => Promise<void>
  /** Callback when the form is cancelled */
  onCancel?: () => void
  /** Initial data for editing an existing review */
  initialData?: Partial<ReviewFormData>
  /** Whether the form is in edit mode */
  isEditing?: boolean
  /** Custom class name */
  className?: string
  /** Minimum character count for review content */
  minCharacters?: number
}

// ============================================================================
// TAG CONFIGURATION
// ============================================================================

const tagConfig: Record<ReviewTag, { icon: React.ElementType; colorClass: string }> = {
  useful: {
    icon: Check,
    colorClass: 'bg-success/10 text-success border-success/20 hover:bg-success/20',
  },
  creative: {
    icon: Sparkles,
    colorClass: 'bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20',
  },
  well_documented: {
    icon: FileText,
    colorClass: 'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20',
  },
}

// ============================================================================
// REVIEW FORM COMPONENT
// ============================================================================

export function ReviewForm({
  promptId,
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  className,
  minCharacters = 50,
}: ReviewFormProps) {
  const t = useTranslations('reviews')
  const [rating, setRating] = useState(initialData?.rating || 0)
  const [content, setContent] = useState(initialData?.content || '')
  const [selectedTags, setSelectedTags] = useState<ReviewTag[]>(initialData?.tags || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ rating?: string; content?: string }>({})

  // Toggle tag selection
  const toggleTag = useCallback((tag: ReviewTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }, [])

  // Validate form
  const validate = useCallback((): boolean => {
    const newErrors: { rating?: string; content?: string } = {}

    if (rating === 0) {
      newErrors.rating = t('rating_required')
    }

    if (content.trim().length < minCharacters) {
      newErrors.content = t('min_chars', { count: minCharacters })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [rating, content, minCharacters, t])

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validate()) return

      setIsSubmitting(true)

      try {
        await onSubmit({
          rating,
          content: content.trim(),
          tags: selectedTags,
        })
      } catch (error) {
        console.error('Error submitting review:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [rating, content, selectedTags, validate, onSubmit]
  )

  // Character count display
  const characterCount = content.length
  const isUnderMinimum = characterCount < minCharacters
  const remainingChars = minCharacters - characterCount

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-6 p-6 rounded-xl border border-border bg-card',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-brand-primary" />
        <h3 className="text-lg font-semibold">
          {isEditing ? t('edit_review') : t('write_review')}
        </h3>
      </div>

      {/* Rating Section */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          {t('your_rating')}
          <span className="text-destructive ml-1">*</span>
        </label>
        <RatingInput
          value={rating}
          onChange={setRating}
          size="lg"
          required
          error={errors.rating}
        />
      </div>

      {/* Review Content */}
      <div className="flex flex-col gap-2">
        <label htmlFor="review-content" className="text-sm font-medium text-foreground">
          {t('your_review')}
          <span className="text-destructive ml-1">*</span>
        </label>
        <Textarea
          id="review-content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            if (errors.content && e.target.value.trim().length >= minCharacters) {
              setErrors((prev) => ({ ...prev, content: undefined }))
            }
          }}
          placeholder={t('review_placeholder')}
          className={cn(
            'min-h-[120px] resize-none',
            errors.content && 'border-destructive focus-visible:ring-destructive'
          )}
          disabled={isSubmitting}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'content-error' : 'char-count'}
        />
        <div className="flex items-center justify-between">
          {errors.content ? (
            <span id="content-error" className="text-xs text-destructive" role="alert">
              {errors.content}
            </span>
          ) : (
            <span
              id="char-count"
              className={cn(
                'text-xs',
                isUnderMinimum ? 'text-warning' : 'text-muted-foreground'
              )}
            >
              {isUnderMinimum
                ? t('chars_remaining', { count: remainingChars })
                : t('chars_count', { count: characterCount })}
            </span>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-foreground">
          {t('tags_optional')}
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(tagConfig) as ReviewTag[]).map((tag) => {
            const config = tagConfig[tag]
            const Icon = config.icon
            const isSelected = selectedTags.includes(tag)

            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                disabled={isSubmitting}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium',
                  'transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  isSelected
                    ? config.colorClass
                    : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted',
                  isSubmitting && 'opacity-50 cursor-not-allowed'
                )}
                aria-pressed={isSelected}
              >
                <Icon className={cn('w-4 h-4', isSelected && 'animate-pulse')} />
                <span>{t(`tag_${tag}`)}</span>
              </button>
            )
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          {t('tags_help')}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {t('cancel')}
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting
            ? t('submitting')
            : isEditing
            ? t('update_review')
            : t('submit_review')}
        </Button>
      </div>
    </form>
  )
}

// ============================================================================
// COMPACT REVIEW FORM - Inline version for quick reviews
// ============================================================================

interface CompactReviewFormProps {
  promptId: string
  onSubmit: (data: ReviewFormData) => Promise<void>
  className?: string
}

export function CompactReviewForm({
  promptId,
  onSubmit,
  className,
}: CompactReviewFormProps) {
  const t = useTranslations('reviews')
  const [isExpanded, setIsExpanded] = useState(false)
  const [rating, setRating] = useState(0)

  if (!isExpanded) {
    return (
      <div
        className={cn(
          'flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors cursor-pointer',
          className
        )}
        onClick={() => setIsExpanded(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsExpanded(true)
          }
        }}
        aria-label={t('write_review')}
      >
        <span className="text-sm text-muted-foreground">{t('write_review_cta')}</span>
        <RatingInput
          value={rating}
          onChange={(r) => {
            setRating(r)
            setIsExpanded(true)
          }}
          size="sm"
        />
      </div>
    )
  }

  return (
    <ReviewForm
      promptId={promptId}
      onSubmit={onSubmit}
      onCancel={() => setIsExpanded(false)}
      initialData={{ rating }}
      className={className}
    />
  )
}
