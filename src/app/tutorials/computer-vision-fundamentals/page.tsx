import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { CVQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.computer_vision_fundamentals')
  return { title: t('page_title'), description: t('page_description') }
}

export default async function CVTutorial() {
  const t = await getTranslations('tutorials.computer_vision_fundamentals')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="computer-vision-fundamentals"
      level="intermediate"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_intermediate')}
      duration={t('duration')}
      objectives={[
        t('learn_images'),
        t('learn_cnns'),
        t('learn_tasks'),
        t('learn_transfer'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
      containerSize="xl"
    >
            <section>
              <h2 className="text-3xl font-bold mb-4">{t('images_as_data')}</h2>
              <p className="text-muted-foreground mb-4">{t('images_intro')}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• {t('pixel_info')}</p>
                <p>• {t('channels_info')}</p>
                <p>• {t('resolution_info')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('cnn_title')}</h2>
              <p className="text-muted-foreground mb-4">{t('cnn_intro')}</p>
              <Card className="border-purple-500/20 bg-purple-500/5">
                <CardContent className="pt-6 space-y-2 text-sm">
                  <p><strong>{t('conv_layers')}:</strong> {t('conv_desc')}</p>
                  <p><strong>{t('pooling')}:</strong> {t('pooling_desc')}</p>
                  <p><strong>{t('fc_layers')}:</strong> {t('fc_desc')}</p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('cv_tasks')}</h2>
              <div className="space-y-3">
                <Card><CardHeader><CardTitle className="text-lg">{t('classification_label')}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{t('classification_cv')}</p></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-lg">{t('detection_label')}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{t('detection_desc')}</p></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-lg">{t('segmentation_label')}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{t('segmentation_desc')}</p></CardContent></Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('transfer_learning')}</h2>
              <p className="text-muted-foreground mb-4">{t('transfer_intro')}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ {t('tl_benefit_1')}</p>
                <p>✓ {t('tl_benefit_2')}</p>
                <p>✓ {t('tl_benefit_3')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('keep_learning')}</h2>
              <CVQuiz />
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('next_steps')}</h2>
              <Link href="/tutorials" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
                <Icons.ArrowRight className="w-4 h-4 mr-2" />
                Back to Tutorials
              </Link>
            </section>
    </TutorialLayout>
  )
}
