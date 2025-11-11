'use client'

import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRightIcon, SparklesIcon, SearchIcon, HeartIcon, Share2Icon } from 'lucide-react'

/**
 * How It Works Section
 * UX: Progressive disclosure - Shows users the path to success in clear steps
 * Pattern: Numbered step cards with icons and connecting arrows
 */

export function HowItWorksSection() {
  const t = useTranslations('home.howItWorks')

  const steps = [
    {
      number: '01',
      title: t('step1_title'),
      description: t('step1_description'),
      icon: SearchIcon,
      color: 'brand-primary',
      features: [t('step1_feature1'), t('step1_feature2'), t('step1_feature3')]
    },
    {
      number: '02',
      title: t('step2_title'),
      description: t('step2_description'),
      icon: SparklesIcon,
      color: 'brand-secondary',
      features: [t('step2_feature1'), t('step2_feature2'), t('step2_feature3')]
    },
    {
      number: '03',
      title: t('step3_title'),
      description: t('step3_description'),
      icon: HeartIcon,
      color: 'brand-accent',
      features: [t('step3_feature1'), t('step3_feature2'), t('step3_feature3')]
    },
    {
      number: '04',
      title: t('step4_title'),
      description: t('step4_description'),
      icon: Share2Icon,
      color: 'green-600',
      features: [t('step4_feature1'), t('step4_feature2'), t('step4_feature3')]
    }
  ]
  return (
    <div className="space-y-12">
      {/* Section header - UX: Sets expectation for learning journey */}
      <div className="text-center space-y-4">
        <Badge variant="soft" className="text-sm font-semibold">
          <SparklesIcon className="w-3.5 h-3.5 mr-1.5" />
          {t('badge')}
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold">
          {t('title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Steps Grid - UX: Visual progression with numbered steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-4 relative">
        {/* Connecting line for desktop - UX: Shows flow between steps */}
        <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-green-600 opacity-20" />

        {steps.map((step, index) => (
          <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <Card
              variant="feature"
              className="h-full group hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="p-6 space-y-4 relative">
                {/* Step number badge - UX: Clear progression indicator */}
                <div className="flex items-start justify-between">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-${step.color}/10 group-hover:bg-${step.color}/20 transition-colors`}
                  >
                    <step.icon className={`w-6 h-6 text-${step.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs font-mono font-bold">
                    {step.number}
                  </Badge>
                </div>

                {/* Step title */}
                <h3 className="text-xl font-bold">{step.title}</h3>

                {/* Step description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Feature bullets - UX: Concrete capabilities per step */}
                <ul className="space-y-2 pt-2">
                  {step.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Arrow indicator - UX: Suggests progression to next step */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center pt-4">
                    <ArrowRightIcon className="w-5 h-5 text-muted-foreground/50 rotate-90 lg:rotate-0" />
                  </div>
                )}
              </div>

              {/* Hover effect gradient border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/10 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
            </Card>

            {/* Desktop arrow between cards */}
            {index < steps.length - 1 && (
              <div className="hidden lg:flex absolute -right-2 top-16 z-10 items-center justify-center w-4 h-4 rounded-full bg-background border-2 border-brand-primary/20">
                <ArrowRightIcon className="w-3 h-3 text-brand-primary" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA below steps - UX: Natural next action after learning how it works */}
      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          {t('cta_text')}
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 hover:border-brand-primary/40 transition-colors cursor-pointer group">
          <SparklesIcon className="w-5 h-5 text-brand-primary" />
          <span className="font-semibold">{t('cta_button')}</span>
          <ArrowRightIcon className="w-4 h-4 text-brand-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}
