import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('faq')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default function FAQPage() {
  const t = useTranslations('faq')

  const faqs = [
    { q: 'q1', a: 'a1' },
    { q: 'q2', a: 'a2' },
    { q: 'q3', a: 'a3' },
    { q: 'q4', a: 'a4' },
    { q: 'q5', a: 'a5' },
    { q: 'q6', a: 'a6' },
    { q: 'q7', a: 'a7' },
    { q: 'q8', a: 'a8' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-2">{t(faq.q as any)}</h2>
              <p className="text-muted-foreground">{t(faq.a as any)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{t('still_questions')}</h2>
          <p className="text-muted-foreground">
            {t('contact_text')}
          </p>
        </div>
      </div>
    </div>
  )
}
