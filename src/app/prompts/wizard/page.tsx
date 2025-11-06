import { getTranslations } from 'next-intl/server'
import { WizardPageClient } from '@/components/pages/wizard-page-client'

export async function generateMetadata() {
  const t = await getTranslations('wizard')
  return {
    title: `${t('title')} | Prompt Party`,
    description: t('description'),
  }
}

export default async function PromptWizardPage() {
  const t = await getTranslations('wizard')

  const translations = {
    ai_assistant: t('ai_assistant'),
    title: t('title'),
    description: t('description')
  }

  return <WizardPageClient translations={translations} />
}
