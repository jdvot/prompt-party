import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')

  return {
    title: t('about_title'),
    description: t('about_description'),
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>

        <div className="space-y-6 text-lg">
          <p>
            {t('intro')}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">{t('mission_title')}</h2>
          <p>
            {t('mission_text')}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">{t('features_title')}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t('feature_1')}</li>
            <li>{t('feature_2')}</li>
            <li>{t('feature_3')}</li>
            <li>{t('feature_4')}</li>
            <li>{t('feature_5')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
