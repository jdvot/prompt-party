import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { NLPFundamentalsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.nlp_fundamentals')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function NLPFundamentalsTutorial() {
  const t = await getTranslations('tutorials.nlp_fundamentals')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="nlp-fundamentals"
      level="intermediate"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_intermediate')}
      duration={t('duration')}
      objectives={[
        t('learn_tokenization'),
        t('learn_representations'),
        t('learn_tasks'),
        t('learn_llm_connection'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
    containerSize="xl"
    >
            <section>
              <h2 className="text-3xl font-bold mb-4">{t('what_is_nlp')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('nlp_intro')}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('nlp_history_1')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('nlp_history_1_desc')}</p>
                  </CardContent>
                </Card>
                <Card className="border-green-500/20 bg-green-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('nlp_history_2')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('nlp_history_2_desc')}</p>
                  </CardContent>
                </Card>
                <Card className="border-purple-500/20 bg-purple-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('nlp_history_3')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('nlp_history_3_desc')}</p>
                  </CardContent>
                </Card>
              </div>

              <Alert className="mt-6 bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_nlp_complexity')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('tokenization_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('tokenization_intro')}</p>
              </div>

              <div className="space-y-4 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('word_tokenization_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('word_tokenization_desc')}</p>
                    <div className="bg-slate-900 text-slate-50 p-4 rounded text-sm font-mono">
                      Input: "Hello, world!"<br />
                      Output: ["Hello", ",", "world", "!"]
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('subword_tokenization_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('subword_tokenization_desc')}</p>
                    <p className="text-sm text-muted-foreground mb-2"><strong>{t('example_label')}:</strong> "unbelievable"</p>
                    <div className="bg-slate-900 text-slate-50 p-4 rounded text-sm font-mono">
                      ["un", "belief", "##able"] (BPE)<br />
                      or ["un", "bel", "iev", "able"] (different algorithm)
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_tokenization')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('text_representation_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('text_representation_intro')}</p>
              </div>

              <div className="space-y-4">
                <Card className="border-amber-500/20 bg-amber-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('bow_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('bow_desc')}</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✓ {t('bow_pro_1')}</li>
                      <li>✗ {t('bow_con_1')}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('tfidf_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('tfidf_desc')}</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✓ {t('tfidf_pro_1')}</li>
                      <li>✓ {t('tfidf_pro_2')}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-cyan-500/20 bg-cyan-500/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{t('embeddings_intro_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{t('embeddings_intro_desc')}</p>
                    <p className="text-sm text-muted-foreground italic">{t('embeddings_preview')}</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('nlp_tasks_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('nlp_tasks_intro')}</p>
              </div>

              <div className="space-y-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('classification_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('classification_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('ner_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('ner_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('sentiment_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('sentiment_desc')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('machine_translation_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('machine_translation_desc')}</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('language_models_title')}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{t('language_models_intro')}</p>
              </div>

              <Card className="border-blue-500/20 bg-blue-500/5 mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">{t('how_lms_work_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{t('how_lms_work_desc')}</p>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded text-sm font-mono">
                    Input: "The weather is"<br />
                    Output distribution: [sunny: 0.4, rainy: 0.3, cold: 0.2, ...]<br />
                    Model predicts: "sunny" (highest probability)
                  </div>
                </CardContent>
              </Card>

              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_language_models')}
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
              <NLPFundamentalsQuiz />
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('next_steps')}</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{t('next_steps_desc')}</p>
                  <div className="space-y-2">
                    <Link href="/tutorials/transformers-attention" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
                      <Icons.ArrowRight className="w-4 h-4 mr-2" />
                      Transformers and Attention
                    </Link>
                    <Link href="/tutorials/embeddings-vector-search" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
                      <Icons.ArrowRight className="w-4 h-4 mr-2" />
                      Embeddings and Vector Search
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
    
    </TutorialLayout>
  )
}

