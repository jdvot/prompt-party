import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { LLMQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.llm_finetuning')
  return { title: t('page_title'), description: t('page_description') }
}

export default async function LLMTutorial() {
  const t = await getTranslations('tutorials.llm_finetuning')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="llm-finetuning"
      level="expert"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_advanced')}
      duration={t('duration')}
      objectives={[
        t('learn_peft'),
        t('learn_data'),
        t('learn_training'),
        t('learn_deployment'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
      containerSize="xl"
    >
            <section className="w-full">
              <h2 className="text-3xl font-bold mb-4">{t('when_to_finetune')}</h2>
              <p className="text-muted-foreground mb-4">{t('intro')}</p>
              <div className="space-y-2 text-sm text-muted-foreground w-full">
                <p>✓ {t('use_case_1')}</p>
                <p>✓ {t('use_case_2')}</p>
                <p>✓ {t('use_case_3')}</p>
              </div>
            </section>

            <section className="w-full">
              <h2 className="text-3xl font-bold mb-4">{t('methods_title')}</h2>
              <Card className="border-blue-500/20 bg-blue-500/5 mb-4 w-full">
                <CardHeader><CardTitle className="text-lg">{t('lora_title')}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{t('lora_desc')}</p></CardContent>
              </Card>
              <Card className="border-purple-500/20 bg-purple-500/5 w-full">
                <CardHeader><CardTitle className="text-lg">{t('qlora_title')}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">{t('qlora_desc')}</p></CardContent>
              </Card>
            </section>

            <section className="w-full">
              <h2 className="text-3xl font-bold mb-4">{t('data_prep')}</h2>
              <p className="text-muted-foreground mb-4">{t('data_intro')}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('data_point_1')}</li>
                <li>• {t('data_point_2')}</li>
                <li>• {t('data_point_3')}</li>
              </ul>
            </section>

            <section className="w-full">
              <h2 className="text-3xl font-bold mb-4">{tCommon('keep_learning')}</h2>
              <LLMQuiz />
            </section>
    </TutorialLayout>
  )
}
