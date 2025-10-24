'use client'

import Link from 'next/link'
import { Logo, LogoText } from '@/components/brand/logo'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  return (
    <footer className="border-t bg-muted/30 mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 font-bold text-lg mb-4 group">
              <Logo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
              <LogoText />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed text-balance">
              {t('subtitle')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">{t('community')}</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {tNav('home')}
              </Link>
              <Link href="/trending" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {tNav('trending')}
              </Link>
              <Link href="/top" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {tNav('top')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">{t('resources')}</h3>
            <div className="space-y-3">
              <Link href="/prompts/wizard" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                ✨ Prompt Wizard
              </Link>
              <Link href="/mcp-vs-rag" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                📚 MCP vs RAG
              </Link>
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('pricing')}
              </Link>
              <Link href="/challenges" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('challenges')}
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('about')}
              </Link>
              <Link href="/docs" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('docs')}
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('faq')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">{t('legal')}</h3>
            <div className="space-y-3">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('privacy')}
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1" dangerouslySetInnerHTML={{ __html: t('made_with_love') }} />
          </div>
        </div>
      </div>
    </footer>
  )
}
