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
import { LLMQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.llm_finetuning')
  return { title: t('page_title'), description: t('page_description') }
}

export default async function LLMTutorial() {
  const t = await getTranslations('tutorials.llm_finetuning')
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
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_peft')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_data')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_training')}</span></li>
                <li className="flex gap-2"><Icons.CheckCircle className="w-5 h-5 mt-0.5" /><span>{t('learn_deployment')}</span></li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">{t('when_to_finetune')}</h2>
              <p className="text-muted-foreground mb-4">{t('intro')}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ {t('use_case_1')}</p>
                <p>✓ {t('use_case_2')}</p>
                <p>✓ {t('use_case_3')}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('methods_title')}</h2>
              <Card className="border-blue-500/20 bg-blue-500/5 mb-4">
                <CardHeader><CardTitle className="text-lg">{t('lora_title')}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{t('lora_desc')}</p></CardContent>
              </Card>
              <Card className="border-purple-500/20 bg-purple-500/5">
                <CardHeader><CardTitle className="text-lg">{t('qlora_title')}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{t('qlora_desc')}</p></CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{t('data_prep')}</h2>
              <p className="text-muted-foreground mb-4">{t('data_intro')}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('data_point_1')}</li>
                <li>• {t('data_point_2')}</li>
                <li>• {t('data_point_3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">{tCommon('keep_learning')}</h2>
              <LLMQuiz />
            </section>
          </div>
        </div>

        <aside className="hidden lg:block">
          <TutorialProgress tutorialId="llm-finetuning" title={t('title')} duration={t('duration')} level="expert" rewardPoints={100} rewardBadge="Fine-Tuning Master" completed={false} />
        </aside>
      </div>
    </Container>
  )
}
