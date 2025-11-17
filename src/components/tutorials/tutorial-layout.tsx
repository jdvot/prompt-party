'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/layout/container'
import { TutorialProgress } from '@/components/tutorials/tutorial-progress'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TutorialLayoutProps {
  /** Tutorial ID for tracking */
  tutorialId: string
  /** Tutorial level: beginner, intermediate, expert */
  level: 'beginner' | 'intermediate' | 'expert'
  /** Translated title */
  title: string
  /** Translated subtitle */
  subtitle: string
  /** Translated badge text */
  badge: string
  /** Translated duration text */
  duration: string
  /** Learning objectives */
  objectives: string[]
  /** Main content sections */
  children: React.ReactNode
  /** Reward points for completing */
  rewardPoints?: number
  /** Reward badge text */
  rewardBadge?: string
  /** Container size (default: lg) */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** What you learn section title */
  whatYouLearnTitle?: string
}

const levelColors = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  expert: 'bg-red-500',
}

const levelRewardPoints = {
  beginner: 50,
  intermediate: 75,
  expert: 100,
}

/**
 * TutorialLayout Component
 *
 * Provides consistent layout structure for all tutorials:
 * - Responsive two-column grid (content + sidebar)
 * - Back button navigation
 * - Header with badge and metadata
 * - "What you'll learn" section
 * - Sidebar progress tracker
 *
 * @example
 * Usage:
 * <TutorialLayout
 *   tutorialId="intro-prompts"
 *   level="beginner"
 *   title={t('title')}
 *   subtitle={t('subtitle')}
 *   badge={t('badge_beginner')}
 *   duration={t('duration')}
 *   objectives={[t('learn_what_is'), t('learn_anatomy')]}
 *   rewardBadge={t('reward_badge')}
 *   whatYouLearnTitle={tCommon('what_you_learn')}
 * >
 *   Content sections here
 * </TutorialLayout>
 */
export function TutorialLayout({
  tutorialId,
  level,
  title,
  subtitle,
  badge,
  duration,
  objectives,
  children,
  rewardPoints,
  rewardBadge,
  containerSize = 'lg',
  whatYouLearnTitle = 'What You\'ll Learn',
}: TutorialLayoutProps) {
  const badgeColor = levelColors[level]
  const finalRewardPoints = rewardPoints || levelRewardPoints[level]

  return (
    <Container size={containerSize} className="py-8">
      {/* Back Button */}
      <Link href="/tutorials" className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6')}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        Back to tutorials
      </Link>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 w-full">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className={badgeColor}>{badge}</Badge>
              <Badge variant="outline">{duration}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl text-muted-foreground">{subtitle}</p>
          </div>

          {/* What You'll Learn */}
          {objectives.length > 0 && (
            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Lightbulb className="w-5 h-5 text-primary" />
                  {whatYouLearnTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          <div className="space-y-8 w-full">{children}</div>
        </div>

        {/* Sidebar - Progress Tracker */}
        <aside className="hidden lg:block">
          <TutorialProgress
            tutorialId={tutorialId}
            title={title}
            duration={duration}
            level={level}
            rewardPoints={finalRewardPoints}
            rewardBadge={rewardBadge || ''}
            completed={false}
          />
        </aside>
      </div>
    </Container>
  )
}
