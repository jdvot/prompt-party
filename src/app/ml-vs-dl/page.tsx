'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Brain, Zap, Database, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, FloatingElement, ScaleOnHover, ParallaxContainer } from '@/components/animations'

export default function MLvsDLPage() {
  const t = useTranslations('ml')

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Hero */}
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-6">
        <AnimatedContainer animation="slide-up">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-on-hover text-sm font-medium mb-4 leading-none">
              <Brain className="w-4 h-4 text-primary leading-none" />
              <span className="gradient-text font-semibold leading-none">{t('hero_badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t('hero_title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl lg:mx-0 mx-auto">
              {t('hero_description')}
            </p>
          </div>
        </AnimatedContainer>

        {/* Illustration with Floating Animation */}
        <AnimatedContainer animation="slide-left" delay={0.2}>
          <div className="hidden lg:block">
            <FloatingElement duration={4} intensity={15}>
              <ParallaxContainer speed={30}>
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                  <Image
                    src="/branding/illustrations/concepts-brain.svg"
                    alt="ML vs DL Concepts"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </ParallaxContainer>
            </FloatingElement>
          </div>
        </AnimatedContainer>
      </div>

      {/* Quick Comparison */}
      <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-6" staggerDelay={0.15}>
        {/* Machine Learning Card */}
        <ScaleOnHover scale={1.02}>
          <Card className="relative overflow-hidden h-full hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Database className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">{t('ml_title')}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {t('ml_subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                <strong>{t('ml_description')}</strong>
              </p>

              <div>
                <p className="text-sm font-semibold mb-2">{t('ml_for_what')}</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('ml_use_1')}</li>
                  <li>{t('ml_use_2')}</li>
                  <li>{t('ml_use_3')}</li>
                  <li>{t('ml_use_4')}</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {t('strengths')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-xs">{t('ml_strength_1')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('ml_strength_2')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('ml_strength_3')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('ml_strength_4')}</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  {t('limitations')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">{t('ml_limit_1')}</Badge>
                  <Badge variant="outline" className="text-xs">{t('ml_limit_2')}</Badge>
                  <Badge variant="outline" className="text-xs">{t('ml_limit_3')}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>

        {/* Deep Learning Card */}
        <ScaleOnHover scale={1.02}>
          <Card className="relative overflow-hidden h-full hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-emerald-600" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <CardTitle className="text-2xl">{t('dl_title')}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {t('dl_subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                <strong>{t('dl_description')}</strong>
              </p>

              <div>
                <p className="text-sm font-semibold mb-2">{t('dl_for_what')}</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('dl_use_1')}</li>
                  <li>{t('dl_use_2')}</li>
                  <li>{t('dl_use_3')}</li>
                  <li>{t('dl_use_4')}</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {t('strengths')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-xs">{t('dl_strength_1')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('dl_strength_2')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('dl_strength_3')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('dl_strength_4')}</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  {t('limitations')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">{t('dl_limit_1')}</Badge>
                  <Badge variant="outline" className="text-xs">{t('dl_limit_2')}</Badge>
                  <Badge variant="outline" className="text-xs">{t('dl_limit_3')}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>
      </StaggerContainer>

      {/* Analogy */}
      <AnimatedContainer animation="fade" delay={0.3} className="mb-6">
        <ScaleOnHover scale={1.01}>
          <Card className="bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('analogy_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  {t('analogy_ml_title')}
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('analogy_ml_1')}</li>
                  <li>{t('analogy_ml_2')}</li>
                  <li>{t('analogy_ml_3')}</li>
                  <li>{t('analogy_ml_4')}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                  {t('analogy_dl_title')}
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('analogy_dl_1')}</li>
                  <li>{t('analogy_dl_2')}</li>
                  <li>{t('analogy_dl_3')}</li>
                  <li>{t('analogy_dl_4')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>
      </AnimatedContainer>

      {/* Comparison Table */}
      <AnimatedContainer animation="slide-up" delay={0.4} className="mb-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{t('comparison_title')}</CardTitle>
            <CardDescription>{t('comparison_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">{t('comparison_criteria')}</th>
                    <th className="text-left py-3 px-4">
                      <span className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-blue-500" />
                        {t('ml_title')}
                      </span>
                    </th>
                    <th className="text-left py-3 px-4">
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-500" />
                        {t('dl_title')}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t('comparison_definition'), ml: t('comparison_definition_ml'), dl: t('comparison_definition_dl') },
                    { label: t('comparison_features'), ml: t('comparison_features_ml'), dl: t('comparison_features_dl') },
                    { label: t('comparison_data'), ml: t('comparison_data_ml'), dl: t('comparison_data_dl') },
                    { label: t('comparison_computation'), ml: t('comparison_computation_ml'), dl: t('comparison_computation_dl') },
                    { label: t('comparison_interpretability'), ml: t('comparison_interpretability_ml'), dl: t('comparison_interpretability_dl') },
                    { label: t('comparison_training'), ml: t('comparison_training_ml'), dl: t('comparison_training_dl') },
                    { label: t('comparison_applications'), ml: t('comparison_applications_ml'), dl: t('comparison_applications_dl') },
                    { label: t('comparison_cost'), ml: t('comparison_cost_ml'), dl: t('comparison_cost_dl') },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.label}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.ml}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.dl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* Use Cases */}
      <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-6" staggerDelay={0.15}>
        <ScaleOnHover scale={1.02}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{t('examples_ml_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">{t('examples_ml_1_title')}</p>
                <p className="text-muted-foreground">{t('examples_ml_1_desc')}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">{t('examples_ml_2_title')}</p>
                <p className="text-muted-foreground">{t('examples_ml_2_desc')}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">{t('examples_ml_3_title')}</p>
                <p className="text-muted-foreground">{t('examples_ml_3_desc')}</p>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>

        <ScaleOnHover scale={1.02}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{t('examples_dl_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">{t('examples_dl_1_title')}</p>
                <p className="text-muted-foreground">{t('examples_dl_1_desc')}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">{t('examples_dl_2_title')}</p>
                <p className="text-muted-foreground">{t('examples_dl_2_desc')}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">{t('examples_dl_3_title')}</p>
                <p className="text-muted-foreground">{t('examples_dl_3_desc')}</p>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>
      </StaggerContainer>

      {/* Hybrid Approach */}
      <AnimatedContainer animation="zoom" delay={0.5} className="mb-6">
        <ScaleOnHover scale={1.01}>
          <Card className="bg-gradient-to-br from-cyan-500/5 to-transparent border-cyan-500/20 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('hybrid_title')}
              </CardTitle>
              <CardDescription>
                {t('hybrid_subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background rounded-lg p-4 border hover:border-cyan-500/30 transition-colors">
                <p className="font-semibold mb-2">{t('hybrid_nlp_title')}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-blue-600 dark:text-blue-400">{t('hybrid_nlp_ml')}</strong>
                  </p>
                  <p>
                    <strong className="text-emerald-600 dark:text-emerald-400">{t('hybrid_nlp_dl')}</strong>
                  </p>
                  <p className="pt-2 border-t">
                    <strong>{t('hybrid_nlp_solution')}</strong>
                  </p>
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 border hover:border-cyan-500/30 transition-colors">
                <p className="font-semibold mb-2">{t('hybrid_cv_title')}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-blue-600 dark:text-blue-400">{t('hybrid_cv_ml')}</strong>
                  </p>
                  <p>
                    <strong className="text-emerald-600 dark:text-emerald-400">{t('hybrid_cv_dl')}</strong>
                  </p>
                  <p className="pt-2 border-t">
                    <strong>{t('hybrid_cv_solution')}</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>
      </AnimatedContainer>

      {/* Decision Tree */}
      <AnimatedContainer animation="slide-up" delay={0.6} className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('decision_title')}</CardTitle>
            <CardDescription>{t('decision_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors">
                <p className="font-semibold mb-3">
                  {t('decision_question')}
                </p>
                <div className="ml-4 space-y-3">
                  <div>
                    <p className="font-medium text-green-600 dark:text-green-400">{t('decision_yes_dl')}</p>
                    <p className="ml-4 text-sm text-muted-foreground">
                      {t('decision_yes_desc')}
                    </p>
                    <div className="ml-8 space-y-1 text-sm">
                      <p className="text-emerald-600 dark:text-emerald-400">{t('decision_yes_complex')}</p>
                      <p className="text-muted-foreground">{t('decision_yes_data')}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">{t('decision_no_ml')}</p>
                    <div className="ml-8 space-y-1 text-sm">
                      <p className="text-blue-600 dark:text-blue-400">{t('decision_no_simple')}</p>
                      <p className="text-muted-foreground">{t('decision_no_fast')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* CTA */}
      <AnimatedContainer animation="fade" delay={0.7}>
        <div className="text-center">
          <Link href="/tutorials" className={cn(buttonVariants({ size: "lg" }), "group")}>
            {t('cta_button')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            {t('cta_description')}
          </p>
        </div>
      </AnimatedContainer>
    </div>
  )
}
