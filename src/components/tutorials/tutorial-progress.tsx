'use client'

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

const levelConfig = {
  beginner: {
    label: 'Débutant',
    color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
  },
  intermediate: {
    label: 'Intermédiaire',
    color: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20'
  },
  expert: {
    label: 'Avancé',
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
  const levelInfo = levelConfig[level]

  return (
    <Card className={cn("sticky top-20 border-2", className)}>
      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="soft" className={levelInfo.color}>
              {levelInfo.label}
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
              <span className="font-semibold">Leçon complétée</span>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <Trophy className="w-4 h-4" />
                <span>+{rewardPoints} points gagnés</span>
              </div>
              {rewardBadge && (
                <div className="flex items-center gap-2 text-sm text-violet-700 dark:text-violet-400 mt-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Badge "{rewardBadge}" débloqué</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progression</span>
                <span className="font-semibold">0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            {/* Rewards */}
            <div className="space-y-2 text-sm">
              <div className="font-semibold text-muted-foreground">Récompenses :</div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span>+{rewardPoints} points</span>
              </div>
              {rewardBadge && (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <span>Badge "{rewardBadge}"</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="pt-3 border-t text-xs text-muted-foreground">
          <p>💡 Complète le quiz à la fin pour valider cette leçon</p>
        </div>
      </CardContent>
    </Card>
  )
}
