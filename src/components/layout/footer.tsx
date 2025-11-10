'use client'

import Link from 'next/link'
import { Logo, LogoText } from '@/components/brand/logo'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  return (
    <footer className="border-t bg-muted/30 mt-auto backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 font-bold text-lg mb-4 group">
              <Logo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
              <LogoText />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed text-balance">
              {t('about_section_subtitle')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">{t('guides_section_title')}</h3>
            <div className="space-y-3">
              <Link href="/tutorials/paths/beginner" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('beginner_path')}
              </Link>
              <Link href="/tutorials" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('all_tutorials')}
              </Link>
              <Link href="/mcp-vs-rag" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('mcp_vs_rag')}
              </Link>
              <Link href="/tech-stack" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {tNav('tech_stack')}
              </Link>
              <Link href="/prompts/wizard" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('playground')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">{t('community_section_title')}</h3>
            <div className="space-y-3">
              <Link href="/trending" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('prompts_library')}
              </Link>
              <Link href="/challenges" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('challenges')}
              </Link>
              <Link href="/leaderboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('leaderboard')}
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('about')}
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('faq')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">{t('legal_section_title')}</h3>
            <div className="space-y-3">
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {t('support_project')}
              </Link>
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
