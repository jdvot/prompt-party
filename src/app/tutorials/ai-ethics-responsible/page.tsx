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
import { EthicsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.ai_ethics_responsible')
  return { title: t('page_title'), description: t('page_description') }
}

export default async function EthicsTutorial() {
  const t = await getTranslations('tutorials.ai_ethics_responsible')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="xl" className="py-8">
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
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_bias')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_fairness')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_privacy')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_governance')}</span></li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">{t('why_ethics')}</h2>
              <p className="text-muted-foreground mb-4">{t('ethics_intro')}</p>
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="pt-6"><p className="text-sm text-muted-foreground">{t('real_example')}</p></CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('bias_fairness')}</h2>
              <div className="space-y-3">
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('historical_bias')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('historical_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('data_bias')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('data_bias_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('fairness_metrics')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('fairness_desc')}</p></CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('privacy_security')}</h2>
              <div className="space-y-3">
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('data_privacy')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('privacy_desc')}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">{t('differential_privacy')}</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">{t('differential_desc')}</p></CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('transparency_accountability')}</h2>
              <p className="text-muted-foreground mb-4">{t('transparency_intro')}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• {t('transparency_point_1')}</p>
                <p>• {t('transparency_point_2')}</p>
                <p>• {t('transparency_point_3')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('keep_learning')}</h2>
              <EthicsQuiz />
            </section>
          </div>
        </div>

        <aside className="hidden lg:block">
          <TutorialProgress tutorialId="ai-ethics" title={t('title')} duration={t('duration')} level="advanced" rewardPoints={100} rewardBadge="Ethics Champion" completed={false} />
        </aside>
      </div>
    </Container>
  )
}
