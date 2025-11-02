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
              Apprends à parler à l'IA comme un pro. Cours interactifs, exemples concrets, 100% gratuit.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">📚 Apprendre</h3>
            <div className="space-y-3">
              <Link href="/tutorials/paths/beginner" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Parcours Débutant
              </Link>
              <Link href="/tutorials" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Tous les tutoriels
              </Link>
              <Link href="/mcp-vs-rag" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                MCP vs RAG
              </Link>
              <Link href="/prompts/wizard" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Playground
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">🤝 Communauté</h3>
            <div className="space-y-3">
              <Link href="/trending" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Bibliothèque Prompts
              </Link>
              <Link href="/challenges" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Challenges
              </Link>
              <Link href="/leaderboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Leaderboard
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                À propos
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground gradient-text">⚖️ Légal</h3>
            <div className="space-y-3">
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Soutenir le projet
              </Link>
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Confidentialité
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Conditions
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
