import { getTranslations, getLocale } from 'next-intl/server'
import { Metadata } from 'next'
import { TechStackContent } from './tech-stack-content'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('techStack')
  const locale = await getLocale()

  return {
    title: t('metadata_title'),
    description: t('metadata_description'),
    alternates: {
      canonical: `/${locale}/tech-stack`,
    },
    openGraph: {
      title: t('metadata_title'),
      description: t('metadata_description'),
      url: `/${locale}/tech-stack`,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('metadata_title'),
        },
      ],
    },
  }
}

export default function TechStackPage() {
  return (
    <main className="min-h-screen">
      <TechStackContent />
    </main>
  )
}
