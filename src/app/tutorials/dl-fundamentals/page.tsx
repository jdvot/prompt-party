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
import { DLFundamentalsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.dl_fundamentals')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function DLFundamentalsTutorial() {
  const t = await getTranslations('tutorials.dl_fundamentals')
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
          <Badge className="bg-red-500">{t('badge_advanced')}</Badge>
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
              <span>{t('learn_nn')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_backprop')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_architectures')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_training')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('what_is_dl')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('dl_intro')}
            </p>
          </div>

          <Card className="border-violet-500/20 bg-violet-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Icons.Zap className="w-5 h-5 text-violet-600" />
                {t('why_deep_learning')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-violet-600 mt-0.5" />
                  <span>{t('why_1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-violet-600 mt-0.5" />
                  <span>{t('why_2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-violet-600 mt-0.5" />
                  <span>{t('why_3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('neural_networks_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('neural_networks_intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{t('input_layer')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t('input_layer_desc')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{t('hidden_layers')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t('hidden_layers_desc')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{t('output_layer')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t('output_layer_desc')}</p>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Icons.Info className="w-4 h-4" />
            <AlertDescription>
              <strong>{t('activation_title')}:</strong> {t('activation_desc')}
            </AlertDescription>
          </Alert>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('backpropagation_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('backpropagation_intro')}
            </p>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('backprop_process')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">{t('backprop_step_1')}</h4>
                  <p className="text-sm text-muted-foreground">{t('backprop_step_1_desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">{t('backprop_step_2')}</h4>
                  <p className="text-sm text-muted-foreground">{t('backprop_step_2_desc')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">{t('backprop_step_3')}</h4>
                  <p className="text-sm text-muted-foreground">{t('backprop_step_3_desc')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('architectures_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('architectures_intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Network className="w-5 h-5 text-blue-600" />
                  {t('cnn_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('cnn_desc')}
                </p>
                <p className="text-xs text-muted-foreground font-semibold">{t('cnn_uses')}:</p>
                <ul className="text-sm space-y-1 mt-2 ml-4">
                  <li>• {t('cnn_use_1')}</li>
                  <li>• {t('cnn_use_2')}</li>
                  <li>• {t('cnn_use_3')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Repeat className="w-5 h-5 text-green-600" />
                  {t('rnn_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('rnn_desc')}
                </p>
                <p className="text-xs text-muted-foreground font-semibold">{t('rnn_uses')}:</p>
                <ul className="text-sm space-y-1 mt-2 ml-4">
                  <li>• {t('rnn_use_1')}</li>
                  <li>• {t('rnn_use_2')}</li>
                  <li>• {t('rnn_use_3')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Zap className="w-5 h-5 text-purple-600" />
                  {t('transformer_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('transformer_desc')}
                </p>
                <p className="text-xs text-muted-foreground font-semibold">{t('transformer_uses')}:</p>
                <ul className="text-sm space-y-1 mt-2 ml-4">
                  <li>• {t('transformer_use_1')}</li>
                  <li>• {t('transformer_use_2')}</li>
                  <li>• {t('transformer_use_3')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Lightbulb className="w-5 h-5 text-orange-600" />
                  {t('gans_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('gans_desc')}
                </p>
                <p className="text-xs text-muted-foreground font-semibold">{t('gans_uses')}:</p>
                <ul className="text-sm space-y-1 mt-2 ml-4">
                  <li>• {t('gans_use_1')}</li>
                  <li>• {t('gans_use_2')}</li>
                  <li>• {t('gans_use_3')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('training_challenges_title')}</h2>

          <Card className="border-orange-500/20 bg-orange-500/5 mb-4">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Icons.AlertTriangle className="w-5 h-5 text-orange-600" />
                {t('vanishing_gradient')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('vanishing_gradient_desc')}</p>
            </CardContent>
          </Card>

          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Icons.AlertTriangle className="w-5 h-5 text-red-600" />
                {t('exploding_gradient')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('exploding_gradient_desc')}</p>
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
          <DLFundamentalsQuiz />
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
              <Link href="/tutorials/ml-basics" className={cn(buttonVariants({ variant: "outline" }))}>
                ML Basics ←
              </Link>
              <Link href="/tutorials/claude-agents" className={cn(buttonVariants())}>
                Claude Agents →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
        </div>

        {/* Sidebar - Progress Tracker */}
        <aside className="hidden lg:block">
          <TutorialProgress
            tutorialId="dl-fundamentals"
            title={t('title')}
            duration={t('duration')}
            level="expert"
            rewardPoints={100}
            rewardBadge="Deep Learning Expert"
            completed={false}
          />
        </aside>
      </div>
    </Container>
  )
}
