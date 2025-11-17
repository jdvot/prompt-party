import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { RAGQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.rag_systems')
  return { title: t('page_title'), description: t('page_description') }
}

export default async function RAGTutorial() {
  const t = await getTranslations('tutorials.rag_systems')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="rag-systems"
      level="expert"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_advanced')}
      duration={t('duration')}
      objectives={[
        t('learn_architecture'),
        t('learn_chunking'),
        t('learn_retrieval'),
        t('learn_optimization'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
      containerSize="xl"
    >
            <section>
              <h2 className="text-3xl font-bold mb-4">{t('what_is_rag')}</h2>
              <p className="text-muted-foreground mb-4">{t('rag_intro')}</p>
              <Card className="border-blue-500/20 bg-blue-500/5">
                <CardContent className="pt-6"><p className="text-sm text-muted-foreground">{t('rag_pipeline')}</p></CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('vs_finetuning')}</h2>
              <div className="space-y-3">
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('rag_benefit_1')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('rag_benefit_1_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('rag_benefit_2')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('rag_benefit_2_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('rag_benefit_3')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('rag_benefit_3_desc')}</p></CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('chunking_title')}</h2>
              <p className="text-muted-foreground mb-4">{t('chunking_intro')}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• {t('chunk_point_1')}</p>
                <p>• {t('chunk_point_2')}</p>
                <p>• {t('chunk_point_3')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('retrieval_title')}</h2>
              <div className="space-y-3">
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('dense_retrieval')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('dense_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('sparse_retrieval')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('sparse_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('hybrid_retrieval')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('hybrid_desc')}</p></CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('keep_learning')}</h2>
              <RAGQuiz />
            </section>
    </TutorialLayout>
  )
}
