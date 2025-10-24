import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('templates_title'),
    description: t('templates_description'),
  }
}

export default async function TemplatesPage() {
  const t = await getTranslations('pages')
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('templates_heading')}</h1>
      <p className="text-muted-foreground">{t('templates_empty')}</p>
    </div>
  )
}
