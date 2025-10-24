import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('following_title'),
    description: t('following_description'),
  }
}

export default async function FollowingPage() {
  const t = await getTranslations('pages')
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('following_heading')}</h1>
      <p className="text-muted-foreground">{t('following_empty')}</p>
    </div>
  )
}
