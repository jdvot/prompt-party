import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { DataFundamentalsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.data_fundamentals')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function DataFundamentalsTutorial() {
  const t = await getTranslations('tutorials.data_fundamentals')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="data-fundamentals"
      level="beginner"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_beginner')}
      duration={t('duration')}
      objectives={[
        t('learn_data_types'),
        t('learn_preprocessing'),
        t('learn_splits'),
        t('learn_quality'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
    >
            <section>
              <h2 className="text-3xl font-bold mb-4">{t('why_data_matters')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('data_foundation')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icons.AlertCircle className="w-5 h-5 text-red-600" />
                      {t('garbage_in_title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('garbage_in_desc')}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-green-500/20 bg-green-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                      {t('quality_matters_title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t('quality_matters_desc')}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_data_quality')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('data_types_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('data_types_intro')}</p>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icons.Table2 className="w-5 h-5" />
                      {t('structured_data_title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('structured_data_desc')}</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• {t('structured_ex_1')}</li>
                      <li>• {t('structured_ex_2')}</li>
                      <li>• {t('structured_ex_3')}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icons.FileText className="w-5 h-5" />
                      {t('unstructured_data_title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('unstructured_data_desc')}</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• {t('unstructured_ex_1')}</li>
                      <li>• {t('unstructured_ex_2')}</li>
                      <li>• {t('unstructured_ex_3')}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icons.TrendingUp className="w-5 h-5" />
                      {t('timeseries_data_title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('timeseries_data_desc')}</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• {t('timeseries_ex_1')}</li>
                      <li>• {t('timeseries_ex_2')}</li>
                      <li>• {t('timeseries_ex_3')}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('preprocessing_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('preprocessing_intro')}</p>
              </div>

              <div className="space-y-4 mb-6">
                <Card className="border-amber-500/20 bg-amber-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('cleaning_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('cleaning_desc')}</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✓ {t('cleaning_1')}</li>
                      <li>✓ {t('cleaning_2')}</li>
                      <li>✓ {t('cleaning_3')}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('normalization_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('normalization_desc')}</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✓ {t('normalization_1')}</li>
                      <li>✓ {t('normalization_2')}</li>
                      <li>✓ {t('normalization_3')}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-cyan-500/20 bg-cyan-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('feature_eng_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('feature_eng_desc')}</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✓ {t('feature_eng_1')}</li>
                      <li>✓ {t('feature_eng_2')}</li>
                      <li>✓ {t('feature_eng_3')}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_preprocessing')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('train_test_split_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('train_test_split_intro')}</p>
              </div>

              <Card className="border-blue-500/20 bg-blue-500/5 mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">{t('split_ratios_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold mb-1">{t('split_ratio_1')}</p>
                      <p className="text-sm text-muted-foreground">{t('split_ratio_1_desc')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{t('split_ratio_2')}</p>
                      <p className="text-sm text-muted-foreground">{t('split_ratio_2_desc')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{t('split_ratio_3')}</p>
                      <p className="text-sm text-muted-foreground">{t('split_ratio_3_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('random_sampling_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('random_sampling_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('stratified_sampling_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('stratified_sampling_desc')}</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('data_quality_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('data_quality_intro')}</p>
              </div>

              <div className="space-y-4">
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icons.AlertTriangle className="w-5 h-5 text-red-600" />
                      {t('bias_title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('bias_desc')}</p>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20 bg-orange-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icons.BarChart3 className="w-5 h-5 text-orange-600" />
                      {t('imbalance_title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('imbalance_desc')}</p>
                  </CardContent>
                </Card>

                <Card className="border-yellow-500/20 bg-yellow-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icons.AlertCircle className="w-5 h-5 text-yellow-600" />
                      {t('leakage_title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('leakage_desc')}</p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="mt-6 bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_quality')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('try_yourself')}</h2>
              <Card>
                <CardHeader>
                  <CardTitle>{t('exercise_title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t('exercise_1_title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('exercise_1_desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('exercise_2_title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('exercise_2_desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('exercise_3_title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('exercise_3_desc')}</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('keep_learning')}</h2>
              <p className="text-muted-foreground mb-4">{t('quiz_intro')}</p>
              <DataFundamentalsQuiz />
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('next_steps')}</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{t('next_steps_desc')}</p>
                  <div className="space-y-2">
                    <Link href="/tutorials/ml-basics" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
                      <Icons.ArrowRight className="w-4 h-4 mr-2" />
                      ML Basics
                    </Link>
                    <Link href="/tutorials/nlp-fundamentals" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
                      <Icons.ArrowRight className="w-4 h-4 mr-2" />
                      NLP Fundamentals
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
    
    </TutorialLayout>
  )
}

