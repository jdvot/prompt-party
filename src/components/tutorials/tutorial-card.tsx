'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { IconContainer } from '@/components/ui/icon-container'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface TutorialCardProps {
  tutorial: {
    id: string
    title: string
    description: string
    duration: string
    level: string
    iconName: string
    topics: string[]
    link: string
    color?: string
  }
  buttonLabel?: string
  /** Compact mode for mobile horizontal scroll */
  compact?: boolean
}

export function TutorialCard({ tutorial, buttonLabel = "Start Tutorial", compact = false }: TutorialCardProps) {
  const Icon = Icons[tutorial.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
  const [isMounted, setIsMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Prevent hydration mismatch by only enabling animations after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const levelColors = {
    Beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
  }

  const gradientColor = tutorial.color || 'from-violet-500 to-purple-500'

  // Compact card for mobile horizontal scroll
  if (compact) {
    return (
      <Link
        href={tutorial.link}
        className="block touch-manipulation"
      >
        <Card className={cn(
          "h-full group relative overflow-hidden border-2",
          "hover:border-violet-500/50 active:scale-[0.98]",
          "transition-all duration-200 w-[260px] sm:w-[280px]"
        )}>
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-5`} />

          <CardHeader className="relative p-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                `bg-gradient-to-br ${gradientColor}`
              )}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <Badge
                variant="outline"
                size="sm"
                className={cn(levelColors[tutorial.level as keyof typeof levelColors], "text-[10px]")}
              >
                {tutorial.level}
              </Badge>
            </div>
            <CardTitle className="text-base line-clamp-2">{tutorial.title}</CardTitle>
          </CardHeader>

          <CardContent className="relative p-4 pt-0 space-y-2">
            <p className="text-xs text-muted-foreground line-clamp-2">{tutorial.description}</p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icons.Clock className="w-3 h-3" />
              <span>{tutorial.duration}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <motion.div
      initial={isMounted && !prefersReducedMotion ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      className="touch-manipulation"
    >
      <Card className={cn(
        "h-full group relative overflow-hidden border-2",
        "hover:border-violet-500/50 hover:shadow-2xl",
        "active:scale-[0.98] transition-all duration-300"
      )}>
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

        <CardHeader className="relative p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <IconContainer
              size="md"
              variant="gradient"
              gradientFrom={gradientColor.split(' ')[0]}
              gradientTo={gradientColor.split(' ')[1]}
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12",
                "group-hover:scale-110 transition-transform duration-300"
              )}
            >
              <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </IconContainer>
            <Badge
              variant="outline"
              className={cn(
                levelColors[tutorial.level as keyof typeof levelColors],
                "text-[10px] sm:text-xs touch-target-sm"
              )}
            >
              {tutorial.level}
            </Badge>
          </div>
          <CardTitle className="text-base sm:text-lg lg:text-xl mb-1 sm:mb-2 line-clamp-2">
            {tutorial.title}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm lg:text-base line-clamp-2 sm:line-clamp-3">
            {tutorial.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
          {/* Topics - Hidden on small mobile, show on larger screens */}
          <div className="hidden sm:flex flex-wrap gap-1.5 sm:gap-2">
            {tutorial.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-[10px] sm:text-xs">
                {topic}
              </Badge>
            ))}
          </div>

          {/* Duration Badge */}
          <Badge
            variant="outline"
            startIcon={<Icons.Clock className="w-3 h-3 sm:w-4 sm:h-4" />}
            className="text-[10px] sm:text-xs"
          >
            {tutorial.duration}
          </Badge>

          {/* Action Button - Touch optimized */}
          <Link
            href={tutorial.link}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full group/btn min-h-[44px] text-sm sm:text-base",
              "active:scale-[0.98] transition-transform touch-manipulation"
            )}
          >
            {buttonLabel}
            <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
