import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.pro_path')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ProPath() {
  const t = await getTranslations('tutorials.pro_path')
  const tCommon = await getTranslations('tutorials')

  const lessons = [
    {
      number: 1,
      title: t('lesson1_title'),
      description: t('lesson1_description'),
      duration: t('lesson1_duration'),
      link: '/tutorials/advanced-prompting',
      icon: 'Layers',
    },
    {
      number: 2,
      title: t('lesson2_title'),
      description: t('lesson2_description'),
      duration: t('lesson2_duration'),
      link: '/tutorials/prompt-optimization',
      icon: 'TestTube',
    },
    {
      number: 3,
      title: t('lesson3_title'),
      description: t('lesson3_description'),
      duration: t('lesson3_duration'),
      link: '/tutorials/prompt-optimization',
      icon: 'TrendingUp',
    },
    {
      number: 4,
      title: t('lesson4_title'),
      description: t('lesson4_description'),
      duration: t('lesson4_duration'),
      link: '/tutorials/code-generation',
      icon: 'Database',
    },
    {
      number: 5,
      title: t('lesson5_title'),
      description: t('lesson5_description'),
      duration: t('lesson5_duration'),
      link: '/tutorials/advanced-prompting',
      icon: 'Shuffle',
    },
    {
      number: 6,
      title: t('lesson6_title'),
      description: t('lesson6_description'),
      duration: t('lesson6_duration'),
      link: '/prompts/wizard',
      icon: 'Library',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/tutorials">
          <Icons.ArrowLeft className="w-4 h-4 mr-2" />
          {tCommon('back_to_tutorials')}
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Icons.Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <Badge className="bg-blue-500 mb-2">{t('badge')}</Badge>
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
            <span>{tCommon('professional_certificate')}</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8 border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Target className="w-5 h-5 text-blue-600" />
            {tCommon('your_progress')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>0 of 6 {tCommon('lessons')} completed</span>
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
                <Icons.CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_patterns')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_testing')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_cost')}</span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_production')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_compatibility')}</span>
              </li>
              <li className="flex items-start gap-2">
                <Icons.CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{t('learn_libraries')}</span>
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

      {/* What Makes This Pro */}
      <Card className="mb-8 border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Star className="w-5 h-5 text-blue-600" />
            {t('professional_skills')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {t('professional_text')}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icons.Code className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{t('skill_testing')}</h4>
                  <p className="text-xs text-muted-foreground">{t('skill_testing_desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icons.LineChart className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{t('skill_metrics')}</h4>
                  <p className="text-xs text-muted-foreground">{t('skill_metrics_desc')}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icons.Scale className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{t('skill_scale')}</h4>
                  <p className="text-xs text-muted-foreground">{t('skill_scale_desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icons.Package className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{t('skill_reusable')}</h4>
                  <p className="text-xs text-muted-foreground">{t('skill_reusable_desc')}</p>
                </div>
              </div>
            </div>
          </div>
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
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : isLast
                  ? 'border-cyan-500/50 bg-gradient-to-r from-blue-500/5 to-cyan-500/5'
                  : 'hover:border-primary/50'
              }`}
            >
              {/* Lesson Number Badge */}
              <div className="absolute top-4 right-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  isFirst
                    ? 'bg-blue-500 text-white'
                    : isLast
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {lesson.number}
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start gap-4 pr-12">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isFirst
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      : isLast
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
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
                        <Badge className="bg-blue-500">{t('start_here')}</Badge>
                      )}
                      {isLast && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500">{t('capstone_project')}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-3">
                  <Button asChild className="group/btn" variant={isFirst || isLast ? undefined : "outline"}>
                    <Link href={lesson.link}>
                      {isLocked ? (
                        <>
                          <Icons.Lock className="w-4 h-4 mr-2" />
                          {tCommon('locked')}
                        </>
                      ) : (
                        <>
                          {isFirst ? tCommon('start_lesson') : isLast ? t('start_capstone') : tCommon('go_to_lesson')}
                          <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Link>
                  </Button>

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

      {/* Career Outcomes */}
      <Card className="mb-8 border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Briefcase className="w-5 h-5 text-green-600" />
            {t('career_outcomes')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {t('career_text')}
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <Icons.Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{t('career_1')}</span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{t('career_2')}</span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{t('career_3')}</span>
            </div>
            <div className="flex items-start gap-2">
              <Icons.Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{t('career_4')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-blue-600/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Rocket className="w-5 h-5 text-blue-600" />
            {t('explore_paths')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {t('explore_text')}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Button asChild variant="outline">
              <Link href="/tutorials/paths/beginner">
                ← Beginner Path
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tutorials/paths/expert">
                ← Claude Expert Path
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
