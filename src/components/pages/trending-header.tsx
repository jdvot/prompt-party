'use client'

import { useTranslations } from 'next-intl'

export function TrendingHeader() {
  const t = useTranslations('home')

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">🔥 {t('trending_title')}</h1>
      <p className="text-muted-foreground">
        {t('trending_subtitle')}
      </p>
    </div>
  )
}
