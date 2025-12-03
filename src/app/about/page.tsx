import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { AboutPageClient } from '@/components/pages/about-page-client'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')

  return {
    title: t('about_title'),
    description: t('about_description'),
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')

  const values = [
    {
      key: 'open_source',
      title: t('value_open_source_title'),
      description: t('value_open_source_description'),
      iconName: 'Code2',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'community',
      title: t('value_community_title'),
      description: t('value_community_description'),
      iconName: 'Users',
      color: 'from-violet-500 to-purple-500'
    },
    {
      key: 'free',
      title: t('value_free_title'),
      description: t('value_free_description'),
      iconName: 'Heart',
      color: 'from-rose-500 to-pink-500'
    }
  ]

  const translations = {
    hero_badge: t('hero_badge'),
    hero_title: t('hero_title'),
    hero_subtitle: t('hero_subtitle'),
    mission_title: t('mission_title'),
    mission_text: t('mission_text'),
    values_title: t('values_title'),
    values_subtitle: t('values_subtitle'),
    cta_title: t('cta_title'),
    cta_subtitle: t('cta_subtitle'),
    cta_button_primary: t('cta_button_primary'),
    cta_button_secondary: t('cta_button_secondary')
  }

  return (
    <AboutPageClient
      values={values}
      t={translations}
    />
  )
}
