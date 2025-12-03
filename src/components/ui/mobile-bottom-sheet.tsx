'use client'

import * as React from 'react'
import { useState, useRef, useCallback, useEffect } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Drag threshold for dismissing the sheet (in pixels)
const DISMISS_THRESHOLD = 100

interface MobileBottomSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  /** Title displayed in the sheet header */
  title?: string
  /** Description displayed below the title */
  description?: string
  /** Whether to show the close button */
  showCloseButton?: boolean
  /** Whether to show the drag handle */
  showDragHandle?: boolean
  /** Maximum height of the sheet (default: 85vh) */
  maxHeight?: string
  /** Snap points for the sheet height (e.g., ['50vh', '85vh']) */
  snapPoints?: string[]
  /** Footer content */
  footer?: React.ReactNode
  /** Class name for the content container */
  className?: string
  /** Whether the sheet content is scrollable */
  scrollable?: boolean
}

export function MobileBottomSheet({
  open,
  onOpenChange,
  children,
  title,
  description,
  showCloseButton = true,
  showDragHandle = true,
  maxHeight = '85vh',
  snapPoints,
  footer,
  className,
  scrollable = true,
}: MobileBottomSheetProps) {
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [currentSnapIndex, setCurrentSnapIndex] = useState(snapPoints ? snapPoints.length - 1 : 0)
  const dragStartY = useRef(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Reset drag state when sheet closes
  useEffect(() => {
    if (!open) {
      setDragOffset(0)
      setIsDragging(false)
      if (snapPoints) {
        setCurrentSnapIndex(snapPoints.length - 1)
      }
    }
  }, [open, snapPoints])

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Handle touch start on drag handle
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY
    setIsDragging(true)
  }, [])

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return

    const currentY = e.touches[0].clientY
    const diff = currentY - dragStartY.current

    // Only allow dragging down (positive values)
    if (diff > 0) {
      setDragOffset(diff)
    }
  }, [isDragging])

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)

    if (dragOffset > DISMISS_THRESHOLD) {
      // Dismiss the sheet
      onOpenChange?.(false)
    } else if (snapPoints && snapPoints.length > 1) {
      // Snap to nearest point
      const threshold = 50
      if (dragOffset > threshold && currentSnapIndex > 0) {
        setCurrentSnapIndex(currentSnapIndex - 1)
      }
    }

    setDragOffset(0)
  }, [dragOffset, onOpenChange, snapPoints, currentSnapIndex])

  // Calculate current height based on snap points
  const currentHeight = snapPoints ? snapPoints[currentSnapIndex] : maxHeight

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'transition-opacity duration-300'
          )}
        />

        {/* Content */}
        <DialogPrimitive.Content
          ref={contentRef}
          className={cn(
            'fixed inset-x-0 bottom-0 z-50',
            'bg-background rounded-t-3xl',
            'border-t border-border/50',
            'shadow-2xl',
            'safe-area-inset-bottom',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            'data-[state=closed]:duration-300 data-[state=open]:duration-500',
            'focus:outline-none',
            className
          )}
          style={{
            maxHeight: currentHeight,
            transform: isDragging ? `translateY(${dragOffset}px)` : undefined,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {/* Drag Handle */}
          {showDragHandle && (
            <div
              className="flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
            </div>
          )}

          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 pb-4 border-b border-border/30">
              <div className="flex-1">
                {title && (
                  <DialogPrimitive.Title className="text-lg font-semibold text-foreground">
                    {title}
                  </DialogPrimitive.Title>
                )}
                {description && (
                  <DialogPrimitive.Description className="text-sm text-muted-foreground mt-1">
                    {description}
                  </DialogPrimitive.Description>
                )}
              </div>

              {showCloseButton && (
                <DialogPrimitive.Close
                  className={cn(
                    'touch-target rounded-full p-2 -mr-2',
                    'hover:bg-muted/50 active:bg-muted',
                    'transition-colors duration-150',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </div>
          )}

          {/* Body */}
          <div
            className={cn(
              'px-6 py-4',
              scrollable && 'overflow-y-auto mobile-scroll',
              footer ? 'pb-0' : 'pb-6'
            )}
            style={{
              maxHeight: footer ? `calc(${currentHeight} - 140px)` : `calc(${currentHeight} - 80px)`,
            }}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-border/30 safe-area-inset-bottom">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

// Trigger component for easy integration
interface MobileBottomSheetTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

export function MobileBottomSheetTrigger({
  children,
  asChild,
  className,
}: MobileBottomSheetTriggerProps) {
  return (
    <DialogPrimitive.Trigger asChild={asChild} className={className}>
      {children}
    </DialogPrimitive.Trigger>
  )
}

// Provider component for state management
interface MobileBottomSheetProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function MobileBottomSheetProvider({
  children,
  defaultOpen = false,
}: MobileBottomSheetProviderProps) {
  return (
    <DialogPrimitive.Root defaultOpen={defaultOpen}>
      {children}
    </DialogPrimitive.Root>
  )
}

export {
  DialogPrimitive as MobileBottomSheetPrimitive,
}
