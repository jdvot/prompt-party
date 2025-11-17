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
import { CVQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.computer_vision_fundamentals')
  return { title: t('page_title'), description: t('page_description') }
}

export default async function CVTutorial() {
  const t = await getTranslations('tutorials.computer_vision_fundamentals')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="xl" className="py-8">
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-yellow-500">{t('badge_intermediate')}</Badge>
              <Badge variant="outline">{t('duration')}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
          </div>

          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Icons.Lightbulb className="w-5 h-5 text-primary" />{tCommon('what_you_learn')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span>{t('learn_images')}</span></li>
                <li className="flex items-start gap-2"><Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span>{t('learn_cnns')}</span></li>
                <li className="flex items-start gap-2"><Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span>{t('learn_tasks')}</span></li>
                <li className="flex items-start gap-2"><Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span>{t('learn_transfer')}</span></li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-8">
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
          </div>
        </div>

        <aside className="hidden lg:block">
          <TutorialProgress tutorialId="computer-vision" title={t('title')} duration={t('duration')} level="intermediate" rewardPoints={75} rewardBadge="Vision Expert" completed={false} />
        </aside>
      </div>
    </Container>
  )
}
