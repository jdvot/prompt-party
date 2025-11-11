'use client'

import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Trophy, Sparkles, Clock } from 'lucide-react'
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
}

const levelColorConfig = {
  beginner: {
    color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
  },
  intermediate: {
    color: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20'
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
  className
}: TutorialProgressProps) {
  const t = useTranslations('tutorials')
  const levelInfo = levelColorConfig[level]
  const levelLabels: Record<string, string> = {
    beginner: t('level_beginner'),
    intermediate: t('level_intermediate'),
    expert: t('level_expert')
  }

  return (
    <Card className={cn("sticky top-20 border-2", className)}>
      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="soft" className={levelInfo.color}>
              {levelLabels[level]}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
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
              {rewardBadge && (
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
              {rewardBadge && (
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
