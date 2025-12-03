'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CheckCircle, Trophy, Sparkles, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TutorialProgressProps {
  tutorialId: string
  title: string
  duration: string
  level: 'beginner' | 'intermediate' | 'expert'
  rewardPoints: number
  rewardBadge?: string
  completed?: boolean
  className?: string
  /** Compact mode for mobile - shows collapsible summary */
  compact?: boolean
}

const levelColorConfig = {
  beginner: {
    color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
  },
  intermediate: {
    color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20'
  },
  expert: {
    color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20'
  }
}

export function TutorialProgress({
  tutorialId,
  title,
  duration,
  level,
  rewardPoints,
  rewardBadge,
  completed = false,
  className,
  compact = false
}: TutorialProgressProps) {
  const t = useTranslations('tutorials')
  const levelInfo = levelColorConfig[level]
  const levelLabels: Record<string, string> = {
    beginner: t('level_beginner'),
    intermediate: t('level_intermediate'),
    expert: t('level_expert')
  }

  // State for mobile collapsible view
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), [])

  // Compact mobile version - collapsible progress bar
  if (compact) {
    return (
      <Card className={cn(
        "border-2 overflow-hidden",
        "transition-all duration-300",
        className
      )}>
        {/* Compact Header - Always visible */}
        <button
          onClick={toggleExpanded}
          className={cn(
            "w-full flex items-center justify-between p-4 touch-target",
            "hover:bg-muted/30 active:bg-muted/50 transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Progress indicator */}
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
              completed
                ? "bg-green-500/10 text-green-600"
                : "bg-primary/10 text-primary"
            )}>
              {completed ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-bold">0%</span>
              )}
            </div>

            <div className="min-w-0 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="soft" className={cn(levelInfo.color, "text-xs")}>
                  {levelLabels[level]}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs"
                  startIcon={<Clock className="w-3 h-3" />}
                >
                  {duration}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {completed ? t('lesson_completed') : t('progress')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span>+{rewardPoints}</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Expandable Content */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-out",
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="p-4 pt-0 space-y-4 border-t border-border/50">
              {/* Progress Bar */}
              {!completed && (
                <div className="pt-4">
                  <Progress value={0} className="h-2" />
                </div>
              )}

              {/* Completion Status */}
              {completed && (
                <div className="pt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                    <Trophy className="w-4 h-4" />
                    <span>+{rewardPoints} {t('points_earned')}</span>
                  </div>
                  {rewardBadge && !rewardBadge.includes('.') && (
                    <div className="flex items-center gap-2 text-sm text-violet-700 dark:text-violet-400 mt-1">
                      <Sparkles className="w-4 h-4" />
                      <span>{t('badge_unlocked', { badge: rewardBadge })}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Rewards Preview */}
              {!completed && (
                <div className="space-y-2 text-sm">
                  <div className="font-semibold text-muted-foreground">{t('rewards')}</div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span>+{rewardPoints} {t('points')}</span>
                    </div>
                    {rewardBadge && !rewardBadge.includes('.') && (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-violet-600" />
                        <span>{t('badge_label', { badge: rewardBadge })}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="pt-3 border-t text-xs text-muted-foreground">
                <p>💡 {t('complete_quiz_tip')}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Full desktop version
  return (
    <Card className={cn("sticky top-20 border-2", className)}>
      <CardContent className="p-4 sm:p-6 space-y-4">
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="soft" className={levelInfo.color}>
              {levelLabels[level]}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs"
              startIcon={<Clock className="w-3 h-3" />}
            >
              {duration}
            </Badge>
          </div>
          <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
        </div>

        {/* Completion Status */}
        {completed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">{t('lesson_completed')}</span>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <Trophy className="w-4 h-4" />
                <span>+{rewardPoints} {t('points_earned')}</span>
              </div>
              {rewardBadge && !rewardBadge.includes('.') && (
                <div className="flex items-center gap-2 text-sm text-violet-700 dark:text-violet-400 mt-1">
                  <Sparkles className="w-4 h-4" />
                  <span>{t('badge_unlocked', { badge: rewardBadge })}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">{t('progress')}</span>
                <span className="font-semibold">0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            {/* Rewards */}
            <div className="space-y-2 text-sm">
              <div className="font-semibold text-muted-foreground">{t('rewards')}</div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span>+{rewardPoints} {t('points')}</span>
              </div>
              {rewardBadge && !rewardBadge.includes('.') && (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <span>{t('badge_label', { badge: rewardBadge })}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="pt-3 border-t text-xs text-muted-foreground">
          <p>💡 {t('complete_quiz_tip')}</p>
        </div>
      </CardContent>
    </Card>
  )
}
