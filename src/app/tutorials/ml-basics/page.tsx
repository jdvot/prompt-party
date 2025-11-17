import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialProgress } from '@/components/tutorials/tutorial-progress'
import { Container } from '@/components/layout/container'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { MLBasicsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.ml_basics')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function MLBasicsTutorial() {
  const t = await getTranslations('tutorials.ml_basics')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="xl" className="py-8">
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 w-full">
        <div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-yellow-500">{t('badge_intermediate')}</Badge>
          <Badge variant="outline">{t('duration')}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Lightbulb className="w-5 h-5 text-primary" />
            {tCommon('what_you_learn')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_concepts')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_data')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_training')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_evaluation')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('what_is_ml')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('ml_intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Brain className="w-5 h-5 text-blue-600" />
                  {t('supervised_learning')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('supervised_desc')}
                </p>
                <ul className="text-sm space-y-1">
                  <li>• {t('supervised_ex1')}</li>
                  <li>• {t('supervised_ex2')}</li>
                  <li>• {t('supervised_ex3')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-green-600" />
                  {t('unsupervised_learning')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('unsupervised_desc')}
                </p>
                <ul className="text-sm space-y-1">
                  <li>• {t('unsupervised_ex1')}</li>
                  <li>• {t('unsupervised_ex2')}</li>
                  <li>• {t('unsupervised_ex3')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('data_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('data_intro')}
            </p>
          </div>

          <Alert className="mb-4">
            <Icons.AlertCircle className="w-4 h-4" />
            <AlertDescription>
              <strong>{t('data_quality_title')}:</strong> {t('data_quality_desc')}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>{t('data_preparation')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('data_cleaning')}</h4>
                <p className="text-sm text-muted-foreground">{t('data_cleaning_desc')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('data_normalization')}</h4>
                <p className="text-sm text-muted-foreground">{t('data_normalization_desc')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('data_splitting')}</h4>
                <p className="text-sm text-muted-foreground">{t('data_splitting_desc')}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('training_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('training_intro')}
            </p>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('training_process')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">{t('train_step_1')}</h4>
                  <p className="text-sm text-muted-foreground">{t('train_step_1_desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">{t('train_step_2')}</h4>
                  <p className="text-sm text-muted-foreground">{t('train_step_2_desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">{t('train_step_3')}</h4>
                  <p className="text-sm text-muted-foreground">{t('train_step_3_desc')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Icons.AlertTriangle className="w-5 h-5 text-orange-600" />
                {t('overfitting_title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {t('overfitting_desc')}
              </p>
              <p className="text-sm font-semibold">{t('overfitting_solution')}:</p>
              <ul className="text-sm space-y-1 mt-2 ml-4">
                <li>• {t('overfitting_sol1')}</li>
                <li>• {t('overfitting_sol2')}</li>
                <li>• {t('overfitting_sol3')}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('evaluation_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('evaluation_intro')}
            </p>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('metrics_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">{t('accuracy')}</h4>
                <p className="text-sm text-muted-foreground">{t('accuracy_desc')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('precision')}</h4>
                <p className="text-sm text-muted-foreground">{t('precision_desc')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('recall')}</h4>
                <p className="text-sm text-muted-foreground">{t('recall_desc')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('f1_score')}</h4>
                <p className="text-sm text-muted-foreground">{t('f1_score_desc')}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.BookOpen className="w-5 h-5 text-primary" />
                {t('practice_challenge')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t('practice_intro')}</p>

              <div className="bg-background/50 p-4 rounded-lg border">
                <p className="font-semibold mb-2">{t('practice_task_label')}</p>
                <p className="text-muted-foreground">
                  {t('practice_task')}
                </p>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                {t('practice_hint')}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Quiz Section */}
        <section>
          <MLBasicsQuiz />
        </section>

        <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5 text-primary" />
              {tCommon('next_steps')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tutorials/dl-fundamentals" className={cn(buttonVariants())}>
                Deep Learning →
              </Link>
              <Link href="/tutorials/advanced-prompting" className={cn(buttonVariants({ variant: "outline" }))}>
                Advanced Prompting →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
        </div>

        {/* Sidebar - Progress Tracker */}
        <aside className="hidden lg:block">
          <TutorialProgress
            tutorialId="ml-basics"
            title={t('title')}
            duration={t('duration')}
            level="intermediate"
            rewardPoints={75}
            rewardBadge="ML Learner"
            completed={false}
          />
        </aside>
      </div>
    </Container>
  )
}
