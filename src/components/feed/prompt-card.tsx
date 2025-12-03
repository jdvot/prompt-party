'use client'

import { memo, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HeartIcon, MessageCircleIcon, BookmarkIcon, ShareIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface PromptCardProps {
  id: string
  title: string
  body: string
  tags: string[]
  author: {
    name: string | null
    avatar_url: string | null
  }
  likes_count: number
  comments_count?: number
  created_at: string
  /** Enable compact mode for mobile list views */
  compact?: boolean
  /** Enable swipe actions on mobile */
  enableSwipe?: boolean
  /** Callback when bookmark action is triggered */
  onBookmark?: (id: string) => void
  /** Callback when share action is triggered */
  onShare?: (id: string) => void
}

// Swipe threshold for triggering actions (in pixels)
const SWIPE_THRESHOLD = 80

export const PromptCard = memo(function PromptCard({
  id,
  title,
  body,
  tags,
  author,
  likes_count,
  comments_count = 0,
  created_at,
  compact = false,
  enableSwipe = false,
  onBookmark,
  onShare,
}: PromptCardProps) {
  const t = useTranslations('common')
  const router = useRouter()
  const preview = compact
    ? (body.length > 100 ? body.substring(0, 100) + '...' : body)
    : (body.length > 200 ? body.substring(0, 200) + '...' : body)

  // Swipe gesture state
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const touchStartX = useRef(0)
  const touchCurrentX = useRef(0)

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enableSwipe) return
    touchStartX.current = e.touches[0].clientX
    touchCurrentX.current = e.touches[0].clientX
    setIsSwiping(true)
  }, [enableSwipe])

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enableSwipe || !isSwiping) return
    touchCurrentX.current = e.touches[0].clientX
    const diff = touchCurrentX.current - touchStartX.current
    // Only allow left swipe (negative values)
    if (diff < 0) {
      setSwipeOffset(Math.max(diff, -120))
    }
  }, [enableSwipe, isSwiping])

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (!enableSwipe) return
    setIsSwiping(false)

    if (swipeOffset < -SWIPE_THRESHOLD) {
      // Trigger bookmark action
      onBookmark?.(id)
    }

    // Reset swipe
    setSwipeOffset(0)
  }, [enableSwipe, swipeOffset, id, onBookmark])

  // Compact mobile layout
  if (compact) {
    return (
      <div className="relative overflow-hidden">
        {/* Swipe action background */}
        {enableSwipe && (
          <div
            className={cn(
              "absolute inset-y-0 right-0 flex items-center justify-end",
              "bg-primary text-primary-foreground px-6",
              "transition-opacity duration-200",
              Math.abs(swipeOffset) > 20 ? "opacity-100" : "opacity-0"
            )}
            style={{ width: Math.abs(swipeOffset) + 60 }}
          >
            <BookmarkIcon className="w-6 h-6" />
          </div>
        )}

        <Link
          href={`/prompts/${id}`}
          className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={cn(
              "bg-card border border-border/50 rounded-xl p-4",
              "mobile-card transition-transform duration-200",
              "active:scale-[0.99]"
            )}
            style={{
              transform: enableSwipe ? `translateX(${swipeOffset}px)` : undefined,
              transition: isSwiping ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
            }}
          >
            {/* Compact Header */}
            <div className="flex items-start gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push(`/profile/${author.name || 'anonymous'}`)
                }}
                className="flex-shrink-0 touch-target-sm"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={author.avatar_url || undefined} alt={author.name || t('anonymous')} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {(author.name || 'A').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors duration-200">
                  {title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="truncate max-w-[100px]">{author.name || t('anonymous')}</span>
                  <span>•</span>
                  <time className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </div>

            {/* Compact Preview */}
            <p className="text-sm text-muted-foreground line-clamp-2 mt-3 leading-relaxed">
              {preview}
            </p>

            {/* Compact Footer */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
              {/* Tags - horizontal scroll on mobile */}
              <div className="flex-1 overflow-hidden">
                <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                  {tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs flex-shrink-0 px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground ml-3 flex-shrink-0">
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-3.5 h-3.5" />
                  <span>{likes_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircleIcon className="w-3.5 h-3.5" />
                  <span>{comments_count}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // Full card layout (default)
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Swipe action background */}
      {enableSwipe && (
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex items-center gap-4 justify-end",
            "bg-gradient-to-l from-primary via-primary to-transparent text-primary-foreground px-6",
            "transition-opacity duration-200",
            Math.abs(swipeOffset) > 20 ? "opacity-100" : "opacity-0"
          )}
          style={{ width: Math.abs(swipeOffset) + 80 }}
        >
          <ShareIcon className="w-5 h-5" />
          <BookmarkIcon className="w-5 h-5" />
        </div>
      )}

      <Link
        href={`/prompts/${id}`}
        className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Card
          className={cn(
            "h-full bento-card overflow-hidden relative",
            "transition-transform duration-200",
            "active:scale-[0.99] md:active:scale-100"
          )}
          style={{
            transform: enableSwipe ? `translateX(${swipeOffset}px)` : undefined,
            transition: isSwiping ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
          }}
        >
          <CardHeader className="space-y-3 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      router.push(`/profile/${author.name || 'anonymous'}`)
                    }}
                    className={cn(
                      "flex items-center gap-2 hover:text-primary transition-colors",
                      "touch-target -m-2 p-2 rounded-md hover:bg-muted/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                    )}
                  >
                    <Avatar className="w-6 h-6 sm:w-7 sm:h-7">
                      <AvatarImage src={author.avatar_url || undefined} alt={author.name || t('anonymous')} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {(author.name || 'A').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate max-w-[120px] sm:max-w-none">{author.name || t('anonymous')}</span>
                  </button>
                  <span className="text-muted-foreground/60 hidden sm:inline">•</span>
                  <time className="text-muted-foreground whitespace-nowrap text-xs sm:text-sm hidden sm:inline">
                    {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
            {/* Body Preview */}
            <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {preview}
            </p>

            {/* Tags - Horizontal scroll on mobile, wrap on desktop */}
            {tags.length > 0 && (
              <div className="relative">
                {/* Mobile: Horizontal scroll */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:hidden">
                  {tags.slice(0, 5).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs hover:bg-secondary/80 transition-colors duration-200 flex-shrink-0"
                    >
                      #{tag}
                    </Badge>
                  ))}
                  {tags.length > 5 && (
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      +{tags.length - 5}
                    </Badge>
                  )}
                </div>

                {/* Desktop: Wrap */}
                <div className="hidden sm:flex flex-wrap gap-2">
                  {tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs hover:bg-secondary/80 transition-colors duration-200"
                    >
                      #{tag}
                    </Badge>
                  ))}
                  {tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{tags.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-3 sm:pt-4 p-4 sm:p-6 pb-4 sm:pb-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4 sm:gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 touch-target-sm hover:text-red-500 transition-colors duration-200">
                  <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">{likes_count}</span>
                </div>
                <div className="flex items-center gap-1.5 touch-target-sm hover:text-primary transition-colors duration-200">
                  <MessageCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium">{comments_count}</span>
                </div>
              </div>

              {/* Mobile: Show time here */}
              <time className="text-xs text-muted-foreground sm:hidden">
                {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
              </time>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
})
