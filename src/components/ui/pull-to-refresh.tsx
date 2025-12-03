'use client'

import * as React from 'react'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Loader2, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Pull threshold to trigger refresh (in pixels)
const PULL_THRESHOLD = 80
// Maximum pull distance
const MAX_PULL = 120
// Resistance factor (makes pulling feel more natural)
const RESISTANCE = 2.5

interface PullToRefreshProps {
  /** Callback function triggered on refresh */
  onRefresh: () => Promise<void>
  /** Content to display */
  children: React.ReactNode
  /** Whether refresh is currently disabled */
  disabled?: boolean
  /** Custom refresh indicator */
  refreshIndicator?: React.ReactNode
  /** Custom pulling indicator */
  pullingIndicator?: React.ReactNode
  /** Class name for the container */
  className?: string
  /** Threshold to trigger refresh (default: 80px) */
  threshold?: number
}

type RefreshState = 'idle' | 'pulling' | 'ready' | 'refreshing'

export function PullToRefresh({
  onRefresh,
  children,
  disabled = false,
  refreshIndicator,
  pullingIndicator,
  className,
  threshold = PULL_THRESHOLD,
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [refreshState, setRefreshState] = useState<RefreshState>('idle')
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const touchCurrentY = useRef(0)
  const scrollTop = useRef(0)

  // Check if we're at the top of the scroll container
  const isAtTop = useCallback(() => {
    if (!containerRef.current) return false
    return containerRef.current.scrollTop <= 0
  }, [])

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || refreshState === 'refreshing') return

    // Store initial touch position
    touchStartY.current = e.touches[0].clientY
    touchCurrentY.current = e.touches[0].clientY
    scrollTop.current = containerRef.current?.scrollTop || 0
  }, [disabled, refreshState])

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || refreshState === 'refreshing') return

    touchCurrentY.current = e.touches[0].clientY
    const diff = touchCurrentY.current - touchStartY.current

    // Only allow pull when at top and pulling down
    if (isAtTop() && diff > 0) {
      // Apply resistance for natural feel
      const adjustedDiff = Math.min(diff / RESISTANCE, MAX_PULL)
      setPullDistance(adjustedDiff)

      // Update state based on pull distance
      if (adjustedDiff >= threshold) {
        setRefreshState('ready')
      } else if (adjustedDiff > 0) {
        setRefreshState('pulling')
      }

      // Prevent default scroll when pulling
      e.preventDefault()
    }
  }, [disabled, refreshState, isAtTop, threshold])

  // Handle touch end
  const handleTouchEnd = useCallback(async () => {
    if (disabled) return

    if (refreshState === 'ready') {
      // Trigger refresh
      setRefreshState('refreshing')
      setPullDistance(60) // Keep indicator visible

      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        setRefreshState('idle')
        setPullDistance(0)
      }
    } else {
      // Reset
      setRefreshState('idle')
      setPullDistance(0)
    }
  }, [disabled, refreshState, onRefresh])

  // Calculate progress (0-1)
  const progress = Math.min(pullDistance / threshold, 1)

  // Rotation for arrow
  const rotation = progress * 180

  // Default pulling indicator
  const defaultPullingIndicator = (
    <div
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-full',
        'bg-background border border-border shadow-md',
        'transition-transform duration-150'
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <ArrowDown
        className={cn(
          'w-5 h-5 transition-colors',
          refreshState === 'ready' ? 'text-primary' : 'text-muted-foreground'
        )}
      />
    </div>
  )

  // Default refresh indicator
  const defaultRefreshIndicator = (
    <div
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-full',
        'bg-primary text-primary-foreground shadow-md'
      )}
    >
      <Loader2 className="w-5 h-5 animate-spin" />
    </div>
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-y-auto overscroll-none',
        'mobile-scroll',
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className={cn(
          'absolute left-0 right-0 flex items-center justify-center',
          'pointer-events-none z-10',
          'transition-opacity duration-200',
          pullDistance > 0 || refreshState === 'refreshing' ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          height: `${pullDistance}px`,
          top: 0,
        }}
      >
        <div
          className={cn(
            'transition-transform duration-200',
            refreshState === 'refreshing' && 'animate-bounce'
          )}
          style={{
            transform: `translateY(${Math.max(0, pullDistance - 40)}px)`,
          }}
        >
          {refreshState === 'refreshing'
            ? (refreshIndicator || defaultRefreshIndicator)
            : (pullingIndicator || defaultPullingIndicator)
          }
        </div>
      </div>

      {/* Content with transform */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: pullDistance > 0 || refreshState === 'refreshing'
            ? `translateY(${pullDistance}px)`
            : undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Hook for using pull-to-refresh functionality
export function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }, [onRefresh])

  return { isRefreshing, refresh }
}
