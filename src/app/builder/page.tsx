import { getTranslations } from 'next-intl/server'
import { PromptBuilderWizard } from '@/components/builder/prompt-wizard'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'

export async function generateMetadata() {
  const t = await getTranslations('builder')
  return {
    title: `${t('page_title')} | Prompt Party`,
    description: t('page_description'),
  }
}

export default async function BuilderPage() {
  const t = await getTranslations('builder')

  const translations = {
    page_title: t('page_title'),
    page_description: t('page_description'),
    step_role: t('step_role'),
    step_context: t('step_context'),
    step_task: t('step_task'),
    step_constraints: t('step_constraints'),
    step_preview: t('step_preview'),
    role_label: t('role_label'),
    role_placeholder: t('role_placeholder'),
    role_description: t('role_description'),
    context_label: t('context_label'),
    context_placeholder: t('context_placeholder'),
    context_description: t('context_description'),
    task_label: t('task_label'),
    task_placeholder: t('task_placeholder'),
    task_description: t('task_description'),
    constraints_label: t('constraints_label'),
    constraints_placeholder: t('constraints_placeholder'),
    constraints_description: t('constraints_description'),
    preview_title: t('preview_title'),
    preview_description: t('preview_description'),
    copy_button: t('copy_button'),
    copied: t('copied'),
    next_step: t('next_step'),
    prev_step: t('prev_step'),
    reset: t('reset'),
    step_of: t.raw('step_of'),
    empty_prompt: t('empty_prompt'),
  }

  return (
    <Section spacing="md" background="gradient">
      <Container size="md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {translations.page_title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {translations.page_description}
          </p>
        </div>
        <PromptBuilderWizard translations={translations} />
      </Container>
    </Section>
  )
}
