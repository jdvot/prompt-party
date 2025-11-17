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
import { TransformersAttentionQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.transformers_attention')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function TransformersAttentionTutorial() {
  const t = await getTranslations('tutorials.transformers_attention')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="xl" className="py-8 overflow-hidden">
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 w-full overflow-hidden">
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-amber-500">{t('badge_intermediate')}</Badge>
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
                  <span>{t('learn_attention')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>{t('learn_architecture')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>{t('learn_variants')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>{t('learn_prompting_implications')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">{t('rnn_limitations_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('rnn_limitations_intro')}</p>
              </div>

              <div className="space-y-4">
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('sequential_processing_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('sequential_processing_desc')}</p>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/20 bg-orange-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('long_range_dependency_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('long_range_dependency_desc')}</p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="mt-6 bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_rnn_limitation')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('attention_mechanism_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('attention_mechanism_intro')}</p>
              </div>

              <Card className="border-blue-500/20 bg-blue-500/5 mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">{t('qkv_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{t('qkv_desc')}</p>
                  <div className="space-y-2 text-sm">
                    <div><strong>Q (Query):</strong> {t('query_desc')}</div>
                    <div><strong>K (Key):</strong> {t('key_desc')}</div>
                    <div><strong>V (Value):</strong> {t('value_desc')}</div>
                  </div>
                </CardContent>
              </Card>

              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_attention')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('transformer_architecture_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('transformer_architecture_intro')}</p>
              </div>

              <div className="space-y-4 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('encoder_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('encoder_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('decoder_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('decoder_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('multihead_attention_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('multihead_attention_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('positional_encoding_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('positional_encoding_desc')}</p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_positional_encoding')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('model_variants_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('model_variants_intro')}</p>
              </div>

              <div className="space-y-4">
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('bert_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('bert_desc')}</p>
                    <p className="text-sm text-muted-foreground"><strong>Uses:</strong> {t('bert_uses')}</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('gpt_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('gpt_desc')}</p>
                    <p className="text-sm text-muted-foreground"><strong>Uses:</strong> {t('gpt_uses')}</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('t5_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('t5_desc')}</p>
                    <p className="text-sm text-muted-foreground"><strong>Uses:</strong> {t('t5_uses')}</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('prompting_implications_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('prompting_implications_intro')}</p>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('context_window_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('context_window_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('token_positioning_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('token_positioning_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('prompt_placement_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('prompt_placement_desc')}</p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="mt-6 bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_prompting_implications')}
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
              <TransformersAttentionQuiz />
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('next_steps')}</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{t('next_steps_desc')}</p>
                  <div className="space-y-2">
                    <Link href="/tutorials/embeddings-vector-search" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
                      <Icons.ArrowRight className="w-4 h-4 mr-2" />
                      Embeddings and Vector Search
                    </Link>
                    <Link href="/tutorials/llm-finetuning" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
                      <Icons.ArrowRight className="w-4 h-4 mr-2" />
                      Fine-Tuning LLMs
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <TutorialProgress
            tutorialId="transformers-attention"
            title={t('title')}
            duration={t('duration')}
            level="intermediate"
            rewardPoints={75}
            rewardBadge="Transformer Expert"
            completed={false}
          />
        </aside>
      </div>
    </Container>
  )
}
