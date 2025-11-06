import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.expert_path')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ExpertPath() {
  const t = await getTranslations('tutorials.expert_path')
  const tCommon = await getTranslations('tutorials')

  const lessons = [
    {
      number: 1,
      title: t('lesson1_title'),
      description: t('lesson1_description'),
      duration: t('lesson1_duration'),
      link: '/tutorials/claude-agents',
      icon: 'Bot',
    },
    {
      number: 2,
      title: t('lesson2_title'),
      description: t('lesson2_description'),
      duration: t('lesson2_duration'),
      link: '/tutorials/advanced-prompting',
      icon: 'Wrench',
    },
    {
      number: 3,
      title: t('lesson3_title'),
      description: t('lesson3_description'),
      duration: t('lesson3_duration'),
      link: '/tutorials/multi-agent-systems',
      icon: 'GitBranch',
    },
    {
      number: 4,
      title: t('lesson4_title'),
      description: t('lesson4_description'),
      duration: t('lesson4_duration'),
      link: '/tutorials/prompt-optimization',
      icon: 'ShieldCheck',
    },
    {
      number: 5,
      title: t('lesson5_title'),
      description: t('lesson5_description'),
      duration: t('lesson5_duration'),
      link: '/tutorials/code-generation',
      icon: 'Rocket',
    },
    {
      number: 6,
      title: t('lesson6_title'),
      description: t('lesson6_description'),
      duration: t('lesson6_duration'),
      link: '/tutorials/prompt-optimization',
      icon: 'Zap',
    },
    {
      number: 7,
      title: t('lesson7_title'),
      description: t('lesson7_description'),
      duration: t('lesson7_duration'),
      link: '/tutorials/multi-agent-systems',
      icon: 'Network',
    },
    {
      number: 8,
      title: t('lesson8_title'),
      description: t('lesson8_description'),
      duration: t('lesson8_duration'),
      link: '/prompts/wizard',
      icon: 'Trophy',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
            <Icons.Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <Badge className="bg-purple-500 mb-2">{t('badge')}</Badge>
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
            <span>{tCommon('expert_certificate')}</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8 border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Target className="w-5 h-5 text-violet-600" />
            {tCommon('your_progress')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>0 of 8 {tCommon('lessons')} completed</span>
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
            {tCommon('what_you_master')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_tool_use')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_reasoning')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_deployment')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_error_handling')}</span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_optimization')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_multi_agent')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_production')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_debugging')}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card className="mb-8 border-yellow-500/20 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.AlertCircle className="w-5 h-5 text-yellow-600" />
            {tCommon('prerequisites')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-3">
            {t('prereq_text')}
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Icons.Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>{t('prereq_1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>{t('prereq_2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>{t('prereq_3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.Check className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>{t('prereq_4')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Lessons */}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-bold">{tCommon('course_curriculum')}</h2>

        {lessons.map((lesson, index) => {
          const Icon = Icons[lesson.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
          const isFirst = index === 0
          const isLast = index === lessons.length - 1
          const isLocked = false // Could implement progress tracking later

          return (
            <Card
              key={lesson.number}
              className={`group relative overflow-hidden transition-all duration-300 ${
                isFirst
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/10'
                  : isLast
                  ? 'border-yellow-500/50 bg-gradient-to-r from-yellow-500/5 to-orange-500/5'
                  : 'hover:border-primary/50'
              }`}
            >
              {/* Lesson Number Badge */}
              <div className="absolute top-4 right-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  isFirst
                    ? 'bg-purple-500 text-white'
                    : isLast
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {lesson.number}
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start gap-4 pr-12">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isFirst
                      ? 'bg-gradient-to-br from-purple-500 to-violet-500'
                      : isLast
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                      : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${isFirst || isLast ? 'text-white' : 'text-muted-foreground'}`} />
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
                        <Badge className="bg-purple-500">{t('start_here')}</Badge>
                      )}
                      {isLast && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">{t('final_project')}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-3">
                  <Link href={lesson.link} className={cn(buttonVariants({ variant: isFirst || isLast ? undefined : "outline" }), "group/btn")}>
                    {isLocked ? (
                      <>
                        <Icons.Lock className="w-4 h-4 mr-2" />
                        {tCommon('locked')}
                      </>
                    ) : (
                      <>
                        {isFirst ? tCommon('start_lesson') : isLast ? t('start_final_project') : tCommon('go_to_lesson')}
                        <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Link>

                  {!isFirst && !isLast && !isLocked && (
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
      <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Rocket className="w-5 h-5 text-violet-600" />
            {t('continue_journey')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {t('after_mastering')}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tutorials/paths/beginner" className={cn(buttonVariants({ variant: "outline" }))}>
              ← Beginner Path
            </Link>
            <Link href="/tutorials/paths/pro" className={cn(buttonVariants({ variant: "outline" }))}>
              Prompt Engineering Pro →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
