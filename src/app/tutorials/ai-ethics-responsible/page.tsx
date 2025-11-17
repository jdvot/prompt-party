import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { EthicsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.ai_ethics_responsible')
  return { title: t('page_title'), description: t('page_description') }
}

export default async function EthicsTutorial() {
  const t = await getTranslations('tutorials.ai_ethics_responsible')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="ai-ethics-responsible"
      level="expert"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_advanced')}
      duration={t('duration')}
      objectives={[
        t('learn_bias'),
        t('learn_fairness'),
        t('learn_privacy'),
        t('learn_governance'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
      containerSize="xl"
    >
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
    </TutorialLayout>
  )
}
