import { PromptWizard } from '@/components/prompts/prompt-wizard'
import { SparklesIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'

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
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="lg">
        <Container size="lg">
          <div className="text-center animate-fade-in-up">
            <Badge variant="soft" className="mb-4">
              <SparklesIcon className="w-3 h-3 mr-1" />
              {t('ai_assistant')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Wizard Section */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <PromptWizard />
          </div>
        </Container>
      </Section>
    </>
  )
}
