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

  // Stats to display in the hero section
  const stats = [
    {
      value: t('stat_prompts'),
      label: t('stat_prompts_label')
    },
    {
      value: t('stat_tutorials'),
      label: t('stat_tutorials_label')
    },
    {
      value: t('stat_learners'),
      label: t('stat_learners_label')
    },
    {
      value: t('stat_free'),
      label: t('stat_free_label')
    }
  ]

  // Values cards configuration
  const values = [
    {
      key: 'open_source',
      title: t('value_open_source_title'),
      description: t('value_open_source_description'),
      iconName: 'Github',
      color: 'from-gray-600 to-gray-800'
    },
    {
      key: 'community',
      title: t('value_community_title'),
      description: t('value_community_description'),
      iconName: 'Users',
      color: 'from-violet-500 to-purple-600'
    },
    {
      key: 'free',
      title: t('value_free_title'),
      description: t('value_free_description'),
      iconName: 'Gift',
      color: 'from-rose-500 to-pink-600'
    }
  ]

  // Features cards configuration
  const features = [
    {
      key: 'discover',
      title: t('feature_discover_title'),
      description: t('feature_discover_description'),
      iconName: 'Search',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'learn',
      title: t('feature_learn_title'),
      description: t('feature_learn_description'),
      iconName: 'GraduationCap',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      key: 'create',
      title: t('feature_create_title'),
      description: t('feature_create_description'),
      iconName: 'PenTool',
      color: 'from-orange-500 to-amber-500'
    },
    {
      key: 'compete',
      title: t('feature_compete_title'),
      description: t('feature_compete_description'),
      iconName: 'Trophy',
      color: 'from-yellow-500 to-orange-500'
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
    features_title: t('features_title'),
    features_subtitle: t('features_subtitle'),
    cta_title: t('cta_title'),
    cta_subtitle: t('cta_subtitle'),
    cta_button_primary: t('cta_button_primary'),
    cta_button_secondary: t('cta_button_secondary')
  }

  return (
    <AboutPageClient
      values={values}
      features={features}
      stats={stats}
      t={translations}
    />
  )
}
