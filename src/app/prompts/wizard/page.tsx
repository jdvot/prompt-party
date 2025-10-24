import { PromptWizard } from '@/components/prompts/prompt-wizard'
import { Sparkles } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('wizard')
  return {
    title: `${t('title')} | Prompt Party`,
    description: t('description'),
  }
}

export default async function PromptWizardPage() {
  const t = await getTranslations('wizard')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-on-hover text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="gradient-text font-semibold">{t('ai_assistant')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      <PromptWizard />
    </div>
  )
}
