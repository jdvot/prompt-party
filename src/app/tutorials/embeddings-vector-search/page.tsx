import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TutorialProgress } from '@/components/tutorials/tutorial-progress'
import { Container } from '@/components/layout/container'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { EmbeddingsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.embeddings_vector_search')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function EmbeddingsVectorSearchTutorial() {
  const t = await getTranslations('tutorials.embeddings_vector_search')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="xl" className="py-8 overflow-hidden">
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 w-full overflow-hidden">
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-amber-500">{t('badge_intermediate')}</Badge>
              <Badge variant="outline">{t('duration')}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
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
                  <span>{t('learn_embeddings')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>{t('learn_similarity')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>{t('learn_vector_db')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>{t('learn_applications')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">{t('what_are_embeddings')}</h2>
              <p className="text-lg text-muted-foreground mb-6">{t('embeddings_intro')}</p>
              <Card className="border-blue-500/20 bg-blue-500/5">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{t('semantic_meaning')}</p>
                </CardContent>
              </Card>
              <Alert className="mt-6 bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_embeddings')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('similarity_metrics_title')}</h2>
              <div className="space-y-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('cosine_similarity_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('cosine_similarity_desc')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('euclidean_distance_title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t('euclidean_distance_desc')}</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('vector_databases_title')}</h2>
              <p className="text-lg text-muted-foreground mb-6">{t('vector_db_intro')}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ {t('vdb_benefit_1')}</p>
                <p>✓ {t('vdb_benefit_2')}</p>
                <p>✓ {t('vdb_benefit_3')}</p>
              </div>
              <Alert className="mt-6 bg-blue-500/10 border-blue-500/20">
                <Icons.Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>{tCommon('pro_tip')}</strong> {t('tip_vector_db')}
                </AlertDescription>
              </Alert>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('applications_title')}</h2>
              <div className="space-y-3">
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('semantic_search_title')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('semantic_search_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('recommendations_title')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('recommendations_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('clustering_title')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('clustering_desc')}</p></CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('keep_learning')}</h2>
              <EmbeddingsQuiz />
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('next_steps')}</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{t('next_steps_desc')}</p>
                  <Link href="/tutorials/rag-systems" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
                    <Icons.ArrowRight className="w-4 h-4 mr-2" />
                    RAG Systems
                  </Link>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        <aside className="hidden lg:block">
          <TutorialProgress
            tutorialId="embeddings-vector-search"
            title={t('title')}
            duration={t('duration')}
            level="intermediate"
            rewardPoints={75}
            rewardBadge="Embeddings Expert"
            completed={false}
          />
        </aside>
      </div>
    </Container>
  )
}
