import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { TutorialProgress } from '@/components/tutorials/tutorial-progress'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.beginner_path')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function BeginnerPath() {
  const t = await getTranslations('tutorials.beginner_path')
  const tCommon = await getTranslations('tutorials')

  const lessons = [
    {
      number: 1,
      title: t('lesson1_title'),
      description: t('lesson1_description'),
      duration: t('lesson1_duration'),
      link: '/tutorials/intro-prompts',
      icon: 'BookOpen',
    },
    {
      number: 2,
      title: t('lesson2_title'),
      description: t('lesson2_description'),
      duration: t('lesson2_duration'),
      link: '/tutorials/claude-basics',
      icon: 'MessageSquare',
    },
    {
      number: 3,
      title: t('lesson3_title'),
      description: t('lesson3_description'),
      duration: t('lesson3_duration'),
      link: '/tutorials/prompt-templates',
      icon: 'Layers',
    },
    {
      number: 4,
      title: t('lesson4_title'),
      description: t('lesson4_description'),
      duration: t('lesson4_duration'),
      link: '/prompts/wizard',
      icon: 'Wand2',
    },
    {
      number: 5,
      title: t('lesson5_title'),
      description: t('lesson5_description'),
      duration: t('lesson5_duration'),
      link: '/trending',
      icon: 'Users',
    },
  ]
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div>
      {/* Back Button */}
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Icons.GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <Badge className="bg-green-500 mb-2">{t('badge')}</Badge>
            <h1 className="text-4xl font-bold">{t('title')}</h1>
          </div>
        </div>
        <p className="text-xl text-muted-foreground mb-4">
          {t('subtitle')}
        </p>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icons.BookOpen className="w-4 h-4" />
            <span>{t('lessons_count')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Clock className="w-4 h-4" />
            <span>{t('duration')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Award className="w-4 h-4" />
            <span>{tCommon('certificate_completion')}</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8 border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Target className="w-5 h-5 text-green-600" />
            {tCommon('your_progress')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>0 of 5 {tCommon('lessons')} completed</span>
              <span className="font-semibold">0%</span>
            </div>
            <Progress value={0} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {t('progress_message')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* What You'll Learn */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Lightbulb className="w-5 h-5 text-primary" />
            {tCommon('what_you_learn')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_fundamentals')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_communicate')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_templates')}</span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_claude')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_practice')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_community')}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Lessons */}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-bold">{tCommon('course_curriculum')}</h2>

        {lessons.map((lesson, index) => {
          const Icon = Icons[lesson.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
          const isFirst = index === 0
          const isLocked = false // Could implement progress tracking later

          return (
            <Card
              key={lesson.number}
              className={`group relative overflow-hidden transition-all duration-300 ${
                isFirst
                  ? 'border-green-500/50 shadow-lg shadow-green-500/10'
                  : 'hover:border-primary/50'
              }`}
            >
              {/* Lesson Number Badge */}
              <div className="absolute top-4 right-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  isFirst
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {lesson.number}
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start gap-4 pr-12">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isFirst
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                      : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${isFirst ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{lesson.title}</CardTitle>
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Icons.Clock className="w-4 h-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      {isFirst && (
                        <Badge className="bg-green-500">{t('start_here')}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-3">
                  <Link href={lesson.link} className={cn(buttonVariants({ variant: isFirst ? undefined : "outline" }), "group/btn")}>
                    {isLocked ? (
                      <>
                        <Icons.Lock className="w-4 h-4 mr-2" />
                        {tCommon('locked')}
                      </>
                    ) : (
                      <>
                        {isFirst ? tCommon('start_lesson') : tCommon('go_to_lesson')}
                        <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Link>

                  {!isFirst && !isLocked && (
                    <span className="text-sm text-muted-foreground">
                      {tCommon('complete_previous')}
                    </span>
                  )}
                </div>
              </CardContent>

              {/* Connection Line */}
              {index < lessons.length - 1 && (
                <div className="absolute bottom-0 left-[52px] w-0.5 h-4 bg-gradient-to-b from-border to-transparent translate-y-full" />
              )}
            </Card>
          )
        })}
      </div>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border-green-600/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Rocket className="w-5 h-5 text-green-600" />
            {t('ready_to_continue')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {t('after_completing')}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tutorials/paths/expert" className={cn(buttonVariants({ variant: "outline" }))}>
              {t('claude_expert_path')}
            </Link>
            <Link href="/tutorials/paths/pro" className={cn(buttonVariants({ variant: "outline" }))}>
              {t('prompt_engineering_pro')}
            </Link>
          </div>
        </CardContent>
      </Card>
        </div>

        {/* Sidebar - Progress Tracker */}
        <aside className="hidden lg:block">
          <TutorialProgress
            tutorialId="beginner-path"
            title={t('title')}
            duration={t('duration')}
            level="beginner"
            rewardPoints={100}
            rewardBadge={t('reward_badge') || 'Beginner Path Master'}
            completed={false}
          />
        </aside>
      </div>
    </div>
  )
}
