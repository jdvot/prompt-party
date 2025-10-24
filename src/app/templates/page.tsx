import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('templates_title'),
    description: t('templates_description'),
  }
}

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Prompt Templates</h1>
      <p className="text-muted-foreground">Professional prompt templates will appear here.</p>
    </div>
  )
}
