import { PromptWizard } from '@/components/wizard/prompt-wizard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Prompt - Wizard | Prompt Party',
  description: 'Create an amazing AI prompt with our step-by-step wizard',
}

export default function PromptWizardPage() {
  return <PromptWizard />
}
