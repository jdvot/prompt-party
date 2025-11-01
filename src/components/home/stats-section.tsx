'use client'

import { Card } from '@/components/ui/card'
import { SparklesIcon, TrendingUpIcon, UsersIcon, HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatsProps {
  totalPrompts: number
  totalUsers: number
}

/**
 * Animated counter hook for smooth number transitions
 * UX: Creates visual interest and emphasizes growth
 */
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t)
      setCount(Math.floor(end * easeOutQuad(progress)))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  return count
}

export function StatsSection({ totalPrompts, totalUsers }: StatsProps) {
  const animatedPrompts = useCounter(totalPrompts || 0)
  const animatedUsers = useCounter(totalUsers || 0)
  const animatedLikes = useCounter(Math.floor((totalPrompts || 0) * 12.5)) // Estimate

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
      {/* UX: Each stat card has hover effect to encourage interaction */}
      <Card variant="bento" className="group text-center relative overflow-hidden">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-8 relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary-dark mb-4 group-hover:scale-110 transition-transform duration-300">
            <SparklesIcon className="w-7 h-7 text-white" />
          </div>

          {/* Animated counter - UX: Numbers animate on mount to show activity */}
          <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-brand-primary to-brand-primary-dark bg-clip-text text-transparent">
            {animatedPrompts.toLocaleString()}+
          </div>

          <div className="text-sm font-medium text-muted-foreground mb-1">AI Prompts</div>
          <div className="text-xs text-muted-foreground/80">Ready to use & remix</div>
        </div>
      </Card>

      <Card variant="bento" className="group text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-brand-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-8 relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-secondary-dark mb-4 group-hover:scale-110 transition-transform duration-300">
            <UsersIcon className="w-7 h-7 text-white" />
          </div>

          <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark bg-clip-text text-transparent">
            {animatedUsers.toLocaleString()}+
          </div>

          <div className="text-sm font-medium text-muted-foreground mb-1">Active Creators</div>
          <div className="text-xs text-muted-foreground/80">Growing every day</div>
        </div>
      </Card>

      <Card variant="bento" className="group text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-brand-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-8 relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent to-pink-600 mb-4 group-hover:scale-110 transition-transform duration-300">
            <HeartIcon className="w-7 h-7 text-white fill-white" />
          </div>

          <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-brand-accent to-pink-600 bg-clip-text text-transparent">
            {animatedLikes.toLocaleString()}+
          </div>

          <div className="text-sm font-medium text-muted-foreground mb-1">Community Likes</div>
          <div className="text-xs text-muted-foreground/80">And counting!</div>
        </div>
      </Card>
    </div>
  )
}
