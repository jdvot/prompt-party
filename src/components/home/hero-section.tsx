'use client'

import { useTranslations } from 'next-intl'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const t = useTranslations('home')

  return (
    <div className="relative mb-16 md:mb-24 text-center space-y-8 max-w-5xl mx-auto animate-fade-in-up">
      {/* Background mesh gradient */}
      <div
        className="absolute inset-0 -z-10 opacity-30 blur-3xl"
        style={{
          backgroundImage: `radial-gradient(at 50% 0%, hsl(256 67% 59% / 0.4) 0px, transparent 50%),
                           radial-gradient(at 80% 30%, hsl(280 87% 65% / 0.3) 0px, transparent 50%),
                           radial-gradient(at 20% 30%, hsl(221 83% 53% / 0.3) 0px, transparent 50%)`,
        }}
      />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-brand-primary/20 text-sm font-semibold mb-2 animate-scale-in hover:scale-105 transition-transform duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
        </span>
        <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent font-bold">
          AI Prompt Community
        </span>
      </div>

      {/* Main heading with gradient */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
        <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          {t('title')}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance font-medium">
        {t('subtitle')}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/prompts/new"
          className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "min-w-[200px]")}
        >
          Get Started
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        <Link
          href="/tutorials"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-[200px]")}
        >
          Explore Tutorials
        </Link>
      </div>

      {/* Stats or social proof */}
      <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <span className="font-semibold">10k+ Members</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-semibold">50k+ Prompts</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="font-semibold">4.9/5 Rating</span>
        </div>
      </div>
    </div>
  )
}
