import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FAQPageClient } from '@/components/pages/faq-page-client'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('faq')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function FAQPage() {
  const t = await getTranslations('faq')

  const faqs = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
    { question: t('q5'), answer: t('a5') },
    { question: t('q6'), answer: t('a6') },
    { question: t('q7'), answer: t('a7') },
    { question: t('q8'), answer: t('a8') },
  ]

  const translations = {
    hero_badge: t('hero_badge'),
    hero_title: t('title'),
    hero_subtitle: t('hero_subtitle'),
    contact_title: t('still_questions'),
    contact_text: t('contact_text'),
    contact_button: t('contact_button')
  }

  return (
    <FAQPageClient
      faqs={faqs}
      t={translations}
    />
  )
}
