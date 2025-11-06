'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { CheckCircle2Icon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SuccessCelebrationProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message?: string
  duration?: number // Auto-close after X milliseconds (default: 3000)
  showConfetti?: boolean
}

export function SuccessCelebration({
  isOpen,
  onClose,
  title,
  message,
  duration = 3000,
  showConfetti = true
}: SuccessCelebrationProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Wait for exit animation
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose()
        }, duration)

        return () => clearTimeout(timer)
      }
    }
  }, [isOpen, duration, handleClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={cn(
            "relative bg-background border-2 border-border rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto transition-all duration-500",
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          )}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="text-center space-y-6">
            {/* Success Illustration */}
            <div className="relative w-48 h-48 mx-auto animate-in zoom-in fade-in duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" />
              <Image
                src="/branding/illustrations/features/success-celebration.svg"
                alt="Success"
                width={192}
                height={192}
                className="relative z-10 drop-shadow-2xl"
              />
            </div>

            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/20 animate-in zoom-in duration-300 delay-200">
              <CheckCircle2Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold animate-in slide-in-from-bottom-2 duration-300 delay-300">
              {title}
            </h3>

            {/* Message */}
            {message && (
              <p className="text-lg text-muted-foreground animate-in slide-in-from-bottom-2 duration-300 delay-400">
                {message}
              </p>
            )}

            {/* Success Button */}
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-2 delay-500"
            >
              Continue
            </button>
          </div>

          {/* Confetti Effect (Optional - CSS) */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10%',
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
