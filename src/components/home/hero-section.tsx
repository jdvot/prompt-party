'use client'

import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('home')

  return (
    <div className="mb-10 md:mb-12 text-center space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-on-hover text-sm font-medium mb-4">
        <span className="text-2xl">✨</span>
        <span className="gradient-text font-semibold">{t('title')}</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text text-center">
        {t('title')}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
        {t('subtitle')}
      </p>
    </div>
  )
}
