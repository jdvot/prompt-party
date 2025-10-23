'use client'

import { useTranslations } from 'next-intl'

export function TopHeader() {
  const t = useTranslations('home')

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">🏆 {t('top_title')}</h1>
      <p className="text-muted-foreground">
        {t('top_subtitle')}
      </p>
    </div>
  )
}
