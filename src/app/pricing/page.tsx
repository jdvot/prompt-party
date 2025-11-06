import { getTranslations } from 'next-intl/server'
import { PricingPageClient } from '@/components/pages/pricing-page-client'

export async function generateMetadata() {
  const t = await getTranslations('pricing.metadata')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function PricingPage() {
  const t = await getTranslations('pricing')

  const freePlan = {
    name: t('free.name'),
    price: t('free.price'),
    period: t('free.period'),
    description: t('free.description'),
    cta: t('free.cta'),
    features: [
      t('free.feature_1'),
      t('free.feature_2'),
      t('free.feature_3'),
      t('free.feature_4'),
      t('free.feature_5'),
      t('free.feature_6'),
      t('free.feature_7'),
      t('free.feature_8')
    ]
  }

  const supportPlan = {
    name: t('support.name'),
    price: t('support.price'),
    period: t('support.period'),
    description: t('support.description'),
    badge: t('support.badge'),
    cta: t('support.cta'),
    features: [
      t('support.feature_1'),
      t('support.feature_2'),
      t('support.feature_3'),
      t('support.feature_4'),
      t('support.feature_5'),
      t('support.feature_6'),
      t('support.feature_7'),
      t('support.feature_8')
    ]
  }

  // Get translations as an object to pass to client component
  const translations = {
    hero_badge: t('hero.badge'),
    hero_title: t('hero.title'),
    hero_title_highlight: t('hero.title_highlight'),
    hero_subtitle: t('hero.subtitle'),
    why_support_title: t('why_support.title'),
    why_support_reason_1_title: t('why_support.reason_1_title'),
    why_support_reason_1_description: t('why_support.reason_1_description'),
    why_support_reason_2_title: t('why_support.reason_2_title'),
    why_support_reason_2_description: t('why_support.reason_2_description'),
    why_support_reason_3_title: t('why_support.reason_3_title'),
    why_support_reason_3_description: t('why_support.reason_3_description'),
    why_support_reason_4_title: t('why_support.reason_4_title'),
    why_support_reason_4_description: t('why_support.reason_4_description'),
    faq_title: t('faq.title'),
    faq_question_1: t('faq.question_1'),
    faq_answer_1: t('faq.answer_1'),
    faq_question_2: t('faq.question_2'),
    faq_answer_2: t('faq.answer_2'),
    faq_question_3: t('faq.question_3'),
    faq_answer_3: t('faq.answer_3'),
    faq_question_4: t('faq.question_4'),
    faq_answer_4: t('faq.answer_4'),
    cta_title: t('cta.title'),
    cta_subtitle: t('cta.subtitle'),
    cta_button_start: t('cta.button_start'),
    cta_button_explore: t('cta.button_explore')
  }

  return (
    <PricingPageClient
      freePlan={freePlan}
      supportPlan={supportPlan}
      t={translations}
    />
  )
}
