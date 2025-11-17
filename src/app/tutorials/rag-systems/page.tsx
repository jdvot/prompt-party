import { Container } from '@/components/layout/container'
import { TutorialProgress } from '@/components/tutorials/tutorial-progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { RAGQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.rag_systems')
  return { title: t('page_title'), description: t('page_description') }
}

export default async function RAGTutorial() {
  const t = await getTranslations('tutorials.rag_systems')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="xl" className="py-8 overflow-hidden">
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />{tCommon('back_to_tutorials')}
      </Link>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <div className="mb-8">
            <Badge className="bg-red-500 mb-4">{t('badge_advanced')}</Badge>
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
          </div>

          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader><CardTitle className="flex gap-2"><Icons.Lightbulb className="w-5 h-5" />{tCommon('what_you_learn')}</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_architecture')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_chunking')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_retrieval')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_optimization')}</span></li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-8">
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
          </div>
        </div>

        <aside className="hidden lg:block">
          <TutorialProgress tutorialId="rag-systems" title={t('title')} duration={t('duration')} level="expert" rewardPoints={100} rewardBadge="RAG Expert" completed={false} />
        </aside>
      </div>
    </Container>
  )
}
