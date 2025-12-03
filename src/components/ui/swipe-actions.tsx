'use client'

import * as React from 'react'
import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

// Configuration constants
const SWIPE_THRESHOLD = 80 // Minimum swipe distance to trigger action
const MAX_SWIPE = 120 // Maximum swipe distance
const VELOCITY_THRESHOLD = 0.3 // Velocity threshold for quick swipes

interface SwipeAction {
  /** Unique identifier for the action */
  id: string
  /** Icon to display */
  icon: React.ReactNode
  /** Label for accessibility */
  label: string
  /** Background color class (Tailwind) */
  bgColor?: string
  /** Text/icon color class (Tailwind) */
  textColor?: string
  /** Callback when action is triggered */
  onAction: () => void
}

interface SwipeActionsProps {
  /** Content to display */
  children: React.ReactNode
  /** Actions to show on the left side (swipe right to reveal) */
  leftActions?: SwipeAction[]
  /** Actions to show on the right side (swipe left to reveal) */
  rightActions?: SwipeAction[]
  /** Whether swipe is disabled */
  disabled?: boolean
  /** Class name for the container */
  className?: string
  /** Callback when swipe starts */
  onSwipeStart?: () => void
  /** Callback when swipe ends */
  onSwipeEnd?: () => void
}

type SwipeDirection = 'left' | 'right' | null

export function SwipeActions({
  children,
  leftActions = [],
  rightActions = [],
  disabled = false,
  className,
  onSwipeStart,
  onSwipeEnd,
}: SwipeActionsProps) {
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isOpen, setIsOpen] = useState<SwipeDirection>(null)
  const [isSwiping, setIsSwiping] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchCurrentX = useRef(0)
  const lastTouchTime = useRef(0)
  const lastTouchX = useRef(0)
  const velocity = useRef(0)
  const isScrolling = useRef<boolean | null>(null)

  // Calculate which action to show based on offset
  const activeDirection: SwipeDirection = swipeOffset > 0 ? 'right' : swipeOffset < 0 ? 'left' : null

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return

    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchCurrentX.current = e.touches[0].clientX
    lastTouchTime.current = Date.now()
    lastTouchX.current = e.touches[0].clientX
    isScrolling.current = null
    velocity.current = 0
  }, [disabled])

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled) return

    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const diffX = currentX - touchStartX.current
    const diffY = currentY - touchStartY.current

    // Determine if this is a horizontal or vertical scroll
    if (isScrolling.current === null) {
      isScrolling.current = Math.abs(diffY) > Math.abs(diffX)
    }

    // If scrolling vertically, don't handle swipe
    if (isScrolling.current) {
      return
    }

    // Calculate velocity
    const now = Date.now()
    const dt = now - lastTouchTime.current
    if (dt > 0) {
      velocity.current = (currentX - lastTouchX.current) / dt
    }
    lastTouchTime.current = now
    lastTouchX.current = currentX

    // Determine swipe bounds based on available actions
    const canSwipeRight = leftActions.length > 0
    const canSwipeLeft = rightActions.length > 0

    let newOffset = diffX

    // If already open, add the current open offset
    if (isOpen === 'left') {
      newOffset = diffX - SWIPE_THRESHOLD
    } else if (isOpen === 'right') {
      newOffset = diffX + SWIPE_THRESHOLD
    }

    // Apply constraints
    if (!canSwipeRight && newOffset > 0) {
      newOffset = 0
    }
    if (!canSwipeLeft && newOffset < 0) {
      newOffset = 0
    }

    // Apply max limit with resistance
    if (newOffset > MAX_SWIPE) {
      newOffset = MAX_SWIPE + (newOffset - MAX_SWIPE) * 0.3
    }
    if (newOffset < -MAX_SWIPE) {
      newOffset = -MAX_SWIPE + (newOffset + MAX_SWIPE) * 0.3
    }

    if (!isSwiping && Math.abs(newOffset) > 5) {
      setIsSwiping(true)
      onSwipeStart?.()
    }

    setSwipeOffset(newOffset)
    touchCurrentX.current = currentX

    // Prevent scrolling while swiping
    if (Math.abs(newOffset) > 5) {
      e.preventDefault()
    }
  }, [disabled, isOpen, leftActions.length, rightActions.length, isSwiping, onSwipeStart])

  // Close the swipe actions
  const close = useCallback(() => {
    setSwipeOffset(0)
    setIsOpen(null)
  }, [])

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (disabled) return

    setIsSwiping(false)
    onSwipeEnd?.()

    const absOffset = Math.abs(swipeOffset)
    const isQuickSwipe = Math.abs(velocity.current) > VELOCITY_THRESHOLD

    // Determine final state based on offset and velocity
    if (isQuickSwipe || absOffset > SWIPE_THRESHOLD) {
      if (swipeOffset > 0 && leftActions.length > 0) {
        // Open left actions (swiped right)
        setSwipeOffset(SWIPE_THRESHOLD)
        setIsOpen('right')
      } else if (swipeOffset < 0 && rightActions.length > 0) {
        // Open right actions (swiped left)
        setSwipeOffset(-SWIPE_THRESHOLD)
        setIsOpen('left')
      } else {
        close()
      }
    } else {
      // Snap back to current state
      if (isOpen === 'left') {
        setSwipeOffset(-SWIPE_THRESHOLD)
      } else if (isOpen === 'right') {
        setSwipeOffset(SWIPE_THRESHOLD)
      } else {
        close()
      }
    }
  }, [disabled, swipeOffset, leftActions.length, rightActions.length, isOpen, onSwipeEnd, close])

  // Handle action click
  const handleActionClick = useCallback((action: SwipeAction) => {
    action.onAction()
    close()
  }, [close])

  // Close on click outside
  const handleContentClick = useCallback(() => {
    if (isOpen) {
      close()
    }
  }, [isOpen, close])

  // Render action button
  const renderAction = (action: SwipeAction, side: 'left' | 'right') => (
    <button
      key={action.id}
      onClick={() => handleActionClick(action)}
      className={cn(
        'flex flex-col items-center justify-center',
        'min-w-[80px] h-full px-4',
        'transition-transform duration-150',
        action.bgColor || (side === 'right' ? 'bg-destructive' : 'bg-primary'),
        action.textColor || 'text-white',
        'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50'
      )}
      aria-label={action.label}
    >
      <span className="text-xl">{action.icon}</span>
      <span className="text-xs mt-1 font-medium">{action.label}</span>
    </button>
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        'touch-pan-y',
        className
      )}
    >
      {/* Left actions (revealed by swiping right) */}
      {leftActions.length > 0 && (
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 flex',
            'transition-opacity duration-200',
            activeDirection === 'right' && swipeOffset > 10 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            transform: `translateX(${Math.min(0, swipeOffset - SWIPE_THRESHOLD)}px)`,
          }}
        >
          {leftActions.map((action) => renderAction(action, 'left'))}
        </div>
      )}

      {/* Right actions (revealed by swiping left) */}
      {rightActions.length > 0 && (
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 flex',
            'transition-opacity duration-200',
            activeDirection === 'left' && swipeOffset < -10 ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            transform: `translateX(${Math.max(0, swipeOffset + SWIPE_THRESHOLD)}px)`,
          }}
        >
          {rightActions.map((action) => renderAction(action, 'right'))}
        </div>
      )}

      {/* Main content */}
      <div
        className={cn(
          'relative bg-background',
          'transition-transform',
          isSwiping ? 'duration-0' : 'duration-200 ease-out'
        )}
        style={{
          transform: `translateX(${swipeOffset}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  )
}

// Hook for managing swipe actions state
export function useSwipeActions() {
  const [openItemId, setOpenItemId] = useState<string | null>(null)

  const handleSwipeStart = useCallback((itemId: string) => {
    setOpenItemId(itemId)
  }, [])

  const handleSwipeEnd = useCallback(() => {
    // Keep track but don't close automatically
  }, [])

  const closeAll = useCallback(() => {
    setOpenItemId(null)
  }, [])

  return {
    openItemId,
    handleSwipeStart,
    handleSwipeEnd,
    closeAll,
  }
}

// Preset action creators for common use cases
export const createDeleteAction = (onDelete: () => void): SwipeAction => ({
  id: 'delete',
  icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  label: 'Delete',
  bgColor: 'bg-destructive',
  textColor: 'text-destructive-foreground',
  onAction: onDelete,
})

export const createEditAction = (onEdit: () => void): SwipeAction => ({
  id: 'edit',
  icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  label: 'Edit',
  bgColor: 'bg-blue-500',
  textColor: 'text-white',
  onAction: onEdit,
})

export const createSaveAction = (onSave: () => void): SwipeAction => ({
  id: 'save',
  icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  ),
  label: 'Save',
  bgColor: 'bg-primary',
  textColor: 'text-primary-foreground',
  onAction: onSave,
})

export const createShareAction = (onShare: () => void): SwipeAction => ({
  id: 'share',
  icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  ),
  label: 'Share',
  bgColor: 'bg-green-500',
  textColor: 'text-white',
  onAction: onShare,
})

export const createArchiveAction = (onArchive: () => void): SwipeAction => ({
  id: 'archive',
  icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  ),
  label: 'Archive',
  bgColor: 'bg-amber-500',
  textColor: 'text-white',
  onAction: onArchive,
})
