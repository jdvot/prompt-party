import { createClient } from '@/lib/supabase/server'
import { getTranslations } from 'next-intl/server'
import { HomePageClient } from '@/components/pages/home-page-client'

export default async function Home() {
  const t = await getTranslations('home')
  const supabase = await createClient()

  // Get stats
  const { count: totalPrompts } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('is_public', true)

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // Prepare translations object
  const translations = {
    hero: {
      badge: t('hero.badge'),
      title_line1: t('hero.title_line1'),
      title_gradient: t('hero.title_gradient'),
      subtitle: t('hero.subtitle'),
      cta_primary: t('hero.cta_primary'),
      cta_secondary: t('hero.cta_secondary'),
      stat_learners: t('hero.stat_learners'),
      stat_prompts: t('hero.stat_prompts'),
      stat_free_value: t('hero.stat_free_value'),
      stat_free_label: t('hero.stat_free_label'),
      image_alt: t('hero.image_alt')
    },
    features: {
      section_title: t('features.section_title'),
      section_subtitle: t('features.section_subtitle'),
      learn_title: t('features.learn_title'),
      learn_description: t('features.learn_description'),
      create_title: t('features.create_title'),
      create_description: t('features.create_description'),
      share_title: t('features.share_title'),
      share_description: t('features.share_description'),
      optimize_title: t('features.optimize_title'),
      optimize_description: t('features.optimize_description')
    },
    steps: {
      section_title: t('steps.section_title'),
      section_subtitle: t('steps.section_subtitle'),
      discover_title: t('steps.discover_title'),
      discover_description: t('steps.discover_description'),
      create_title: t('steps.create_title'),
      create_description: t('steps.create_description'),
      share_title: t('steps.share_title'),
      share_description: t('steps.share_description')
    },
    cta: {
      title: t('cta.title'),
      subtitle: t('cta.subtitle'),
      button_primary: t('cta.button_primary'),
      button_secondary: t('cta.button_secondary'),
      footer_text: t('cta.footer_text')
    }
  }

  const stats = {
    totalUsers: totalUsers || 0,
    totalPrompts: totalPrompts || 0
  }

  return <HomePageClient translations={translations} stats={stats} />
}
