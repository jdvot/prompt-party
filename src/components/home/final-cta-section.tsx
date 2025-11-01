'use client'

import { useTranslations } from 'next-intl'
import { useUser } from '@/lib/supabase/hooks'
import { Card } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { RocketIcon, TrendingUpIcon, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function FinalCTASection() {
  const t = useTranslations('home.finalCta')
  const { user } = useUser()

  return (
    <Card variant="glass" className="text-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl" />

      <div className="p-12 md:p-16 relative">
        {/* Urgency badge - UX: Creates FOMO and encourages action */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-sm font-semibold mb-6">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>{t('badge')}</span>
        </div>

        {/* Main CTA headline - UX: Benefit-focused, action-oriented */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          {t('title_line1')}
          <br />
          <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent">
            {t('title_line2')}
          </span>
        </h2>

        {/* Supporting copy - UX: Addresses objections and reinforces value */}
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>

        {/* Value props checklist - UX: Quick scan of key benefits */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-medium">{t('benefit_free')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-medium">{t('benefit_no_setup')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-medium">{t('benefit_cancel')}</span>
          </div>
        </div>

        {/* CTA buttons - UX: Clear primary action with low-friction secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={user ? "/prompts/new" : "/auth/signup"}
            className={cn(
              buttonVariants({ size: "lg", variant: "gradient" }),
              "min-w-[220px] group shadow-xl shadow-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/40 transition-all text-base"
            )}
          >
            <RocketIcon className="w-5 h-5 mr-2" />
            {user ? t('cta_create') : t('cta_get_started')}
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/trending"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "min-w-[220px] group hover:bg-muted/50 text-base"
            )}
          >
            <TrendingUpIcon className="w-5 h-5 mr-2" />
            {t('cta_browse')}
          </Link>
        </div>

        {/* Trust signal - UX: Final reassurance before conversion */}
        <p className="text-xs text-muted-foreground mt-8">
          {t('trust_text')}
        </p>
      </div>
    </Card>
  )
}
