'use client'

import { useTranslations } from 'next-intl'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/lib/supabase/hooks'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRightIcon, CheckCircle2Icon, SparklesIcon, TrendingUpIcon, UsersIcon, ZapIcon } from 'lucide-react'

export function HeroSection() {
  const t = useTranslations('home')
  const { user } = useUser()

  return (
    <div className="relative mb-16 md:mb-24 text-center space-y-8 max-w-6xl mx-auto animate-fade-in-up">
      {/* Background mesh gradient - Enhanced for more depth */}
      <div
        className="absolute inset-0 -z-10 opacity-40 blur-3xl"
        style={{
          backgroundImage: `radial-gradient(at 50% 0%, hsl(256 67% 59% / 0.5) 0px, transparent 50%),
                           radial-gradient(at 80% 30%, hsl(280 87% 65% / 0.4) 0px, transparent 50%),
                           radial-gradient(at 20% 30%, hsl(221 83% 53% / 0.4) 0px, transparent 50%)`,
        }}
      />

      {/* Announcement Badge - UX: Creates urgency and highlights new feature */}
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-brand-primary/20 text-sm font-semibold mb-2 animate-scale-in hover:scale-105 transition-transform duration-300 cursor-pointer group">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
        </span>
        <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent font-bold">
          {t('hero.badge_text')}
        </span>
        <span className="inline-flex shrink-0">
          <ArrowRightIcon className="w-3.5 h-3.5 text-brand-primary group-hover:translate-x-1 transition-transform" />
        </span>
      </div>

      {/* Main heading with gradient - UX: Clear value proposition */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
        <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          {t('title')}
        </span>
      </h1>

      {/* Subtitle - UX: Benefit-focused copy that addresses user pain points */}
      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance font-medium">
        {t('hero.subtitle_long')}
      </p>

      {/* Key Benefits List - UX: Quick scan of top 3 value props */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-2 pb-4">
        <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
          <CheckCircle2Icon className="w-5 h-5 text-brand-primary" />
          <span className="font-medium">{t('hero.benefit_free')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
          <CheckCircle2Icon className="w-5 h-5 text-brand-primary" />
          <span className="font-medium">{t('hero.benefit_no_card')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
          <CheckCircle2Icon className="w-5 h-5 text-brand-primary" />
          <span className="font-medium">{t('hero.benefit_templates')}</span>
        </div>
      </div>

      {/* CTA Buttons - UX: Clear primary action with supporting secondary CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href={user ? "/prompts/new" : "/auth/signup"}
          className={cn(
            buttonVariants({ variant: "gradient", size: "lg" }),
            "min-w-[200px] group shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/40 transition-all"
          )}
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {user ? t('hero.cta_create_new') : t('hero.cta_start_free')}
          <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/trending"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "min-w-[200px] group hover:bg-muted/50"
          )}
        >
          <TrendingUpIcon className="w-5 h-5 mr-2" />
          {t('hero.cta_explore')}
        </Link>
      </div>

      {/* Social Proof - UX: Trust signals and community metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-brand-primary/5 to-transparent border border-brand-primary/10 hover:border-brand-primary/20 transition-colors">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary/10">
            <UsersIcon className="w-6 h-6 text-brand-primary" />
          </div>
          <div className="text-2xl md:text-3xl font-bold">{t('hero.stat_users')}</div>
          <div className="text-xs md:text-sm text-muted-foreground font-medium">{t('hero.stat_users_label')}</div>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-brand-secondary/5 to-transparent border border-brand-secondary/10 hover:border-brand-secondary/20 transition-colors">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-secondary/10">
            <SparklesIcon className="w-6 h-6 text-brand-secondary" />
          </div>
          <div className="text-2xl md:text-3xl font-bold">{t('hero.stat_prompts')}</div>
          <div className="text-xs md:text-sm text-muted-foreground font-medium">{t('hero.stat_prompts_label')}</div>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-brand-accent/5 to-transparent border border-brand-accent/10 hover:border-brand-accent/20 transition-colors">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-accent/10">
            <TrendingUpIcon className="w-6 h-6 text-brand-accent" />
          </div>
          <div className="text-2xl md:text-3xl font-bold">{t('hero.stat_views')}</div>
          <div className="text-xs md:text-sm text-muted-foreground font-medium">{t('hero.stat_views_label')}</div>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-transparent border border-yellow-500/10 hover:border-yellow-500/20 transition-colors">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500/10">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="text-2xl md:text-3xl font-bold">{t('hero.stat_rating')}</div>
          <div className="text-xs md:text-sm text-muted-foreground font-medium">{t('hero.stat_rating_label')}</div>
        </div>
      </div>

      {/* Trust Badge - UX: Additional credibility signals */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-500" />
          <span>{t('hero.trust_companies')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-500" />
          <span>{t('hero.trust_opensource')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-500" />
          <span>{t('hero.trust_updates')}</span>
        </div>
      </div>
    </div>
  )
}
