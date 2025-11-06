'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { BookOpen, Code, Database, Zap, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, FloatingElement, ScaleOnHover, ParallaxContainer } from '@/components/animations'

export default function MCPvsRAGPage() {
  const t = useTranslations('mcp')

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Hero */}
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-6">
        <AnimatedContainer animation="slide-up">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-on-hover text-sm font-medium mb-4 leading-none">
              <BookOpen className="w-4 h-4 text-primary leading-none" />
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
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                  <Image
                    src="/branding/illustrations/concepts-brain.svg"
                    alt="AI Concepts"
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
        {/* RAG Card */}
        <ScaleOnHover scale={1.02}>
          <Card className="relative overflow-hidden h-full hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Database className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">{t('rag_title')}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {t('rag_subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                <strong>{t('rag_description')}</strong>
              </p>

              <div>
                <p className="text-sm font-semibold mb-2">{t('rag_for_what')}</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('rag_use_1')}</li>
                  <li>{t('rag_use_2')}</li>
                  <li>{t('rag_use_3')}</li>
                  <li>{t('rag_use_4')}</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {t('strengths')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-xs">{t('rag_strength_1')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('rag_strength_2')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('rag_strength_3')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('rag_strength_4')}</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  {t('limitations')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">{t('rag_limit_1')}</Badge>
                  <Badge variant="outline" className="text-xs">{t('rag_limit_2')}</Badge>
                  <Badge variant="outline" className="text-xs">{t('rag_limit_3')}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>

        {/* MCP Card */}
        <ScaleOnHover scale={1.02}>
          <Card className="relative overflow-hidden h-full hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-violet-600" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Zap className="w-6 h-6 text-violet-500" />
                </div>
                <CardTitle className="text-2xl">{t('mcp_title')}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {t('mcp_subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                <strong>{t('mcp_description')}</strong>
              </p>

              <div>
                <p className="text-sm font-semibold mb-2">{t('mcp_for_what')}</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('mcp_use_1')}</li>
                  <li>{t('mcp_use_2')}</li>
                  <li>{t('mcp_use_3')}</li>
                  <li>{t('mcp_use_4')}</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {t('strengths')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-xs">{t('mcp_strength_1')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('mcp_strength_2')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('mcp_strength_3')}</Badge>
                  <Badge variant="secondary" className="text-xs">{t('mcp_strength_4')}</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  {t('limitations')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">{t('mcp_limit_1')}</Badge>
                  <Badge variant="outline" className="text-xs">{t('mcp_limit_2')}</Badge>
                  <Badge variant="outline" className="text-xs">{t('mcp_limit_3')}</Badge>
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
                  {t('analogy_rag_title')}
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('analogy_rag_1')}</li>
                  <li>{t('analogy_rag_2')}</li>
                  <li>{t('analogy_rag_3')}</li>
                  <li>{t('analogy_rag_4')}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2 text-violet-600 dark:text-violet-400">
                  {t('analogy_mcp_title')}
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('analogy_mcp_1')}</li>
                  <li>{t('analogy_mcp_2')}</li>
                  <li>{t('analogy_mcp_3')}</li>
                  <li>{t('analogy_mcp_4')}</li>
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
                        {t('rag_title')}
                      </span>
                    </th>
                    <th className="text-left py-3 px-4">
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-500" />
                        {t('mcp_title')}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t('comparison_nature'), rag: t('comparison_nature_rag'), mcp: t('comparison_nature_mcp') },
                    { label: t('comparison_action'), rag: t('comparison_action_rag'), mcp: t('comparison_action_mcp') },
                    { label: t('comparison_latency'), rag: t('comparison_latency_rag'), mcp: t('comparison_latency_mcp') },
                    { label: t('comparison_complexity'), rag: t('comparison_complexity_rag'), mcp: t('comparison_complexity_mcp') },
                    { label: t('comparison_scalability'), rag: t('comparison_scalability_rag'), mcp: t('comparison_scalability_mcp') },
                    { label: t('comparison_security'), rag: t('comparison_security_rag'), mcp: t('comparison_security_mcp') },
                    { label: t('comparison_realtime'), rag: t('comparison_realtime_rag'), mcp: t('comparison_realtime_mcp') },
                    { label: t('comparison_sources'), rag: t('comparison_sources_rag'), mcp: t('comparison_sources_mcp') },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.label}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.rag}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.mcp}</td>
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
              <CardTitle className="text-lg">{t('examples_rag_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">{t('examples_rag_1_title')}</p>
                <p className="text-muted-foreground">{t('examples_rag_1_desc')}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">{t('examples_rag_2_title')}</p>
                <p className="text-muted-foreground">{t('examples_rag_2_desc')}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">{t('examples_rag_3_title')}</p>
                <p className="text-muted-foreground">{t('examples_rag_3_desc')}</p>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>

        <ScaleOnHover scale={1.02}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{t('examples_mcp_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">{t('examples_mcp_1_title')}</p>
                <p className="text-muted-foreground">{t('examples_mcp_1_desc')}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">{t('examples_mcp_2_title')}</p>
                <p className="text-muted-foreground">{t('examples_mcp_2_desc')}</p>
              </div>
              <div>
                <p className="font-semibold mb-1">{t('examples_mcp_3_title')}</p>
                <p className="text-muted-foreground">{t('examples_mcp_3_desc')}</p>
              </div>
            </CardContent>
          </Card>
        </ScaleOnHover>
      </StaggerContainer>

      {/* Hybrid Approach */}
      <AnimatedContainer animation="zoom" delay={0.5} className="mb-6">
        <ScaleOnHover scale={1.01}>
          <Card className="bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {t('hybrid_title')}
              </CardTitle>
              <CardDescription>
                {t('hybrid_subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background rounded-lg p-4 border hover:border-green-500/30 transition-colors">
                <p className="font-semibold mb-2">{t('hybrid_hr_title')}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-blue-600 dark:text-blue-400">{t('hybrid_hr_rag')}</strong>
                  </p>
                  <p>
                    <strong className="text-violet-600 dark:text-violet-400">{t('hybrid_hr_mcp')}</strong>
                  </p>
                  <p className="pt-2 border-t">
                    <strong>{t('hybrid_hr_question')}</strong>
                  </p>
                  <p>
                    <strong>{t('hybrid_hr_answer')}</strong>
                  </p>
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 border hover:border-green-500/30 transition-colors">
                <p className="font-semibold mb-2">{t('hybrid_finance_title')}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-blue-600 dark:text-blue-400">{t('hybrid_finance_rag')}</strong>
                  </p>
                  <p>
                    <strong className="text-violet-600 dark:text-violet-400">{t('hybrid_finance_mcp')}</strong>
                  </p>
                  <p className="pt-2 border-t">
                    <strong>{t('hybrid_finance_question')}</strong>
                  </p>
                  <p>
                    <strong>{t('hybrid_finance_answer')}</strong>
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
                    <p className="font-medium text-green-600 dark:text-green-400">{t('decision_yes_mcp')}</p>
                    <p className="ml-4 text-sm text-muted-foreground">
                      {t('decision_yes_docs')}
                    </p>
                    <div className="ml-8 space-y-1 text-sm">
                      <p className="text-green-600 dark:text-green-400">{t('decision_yes_both')}</p>
                      <p className="text-muted-foreground">{t('decision_no_mcp')}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400">{t('decision_no_actions')}</p>
                    <div className="ml-8 space-y-1 text-sm">
                      <p className="text-blue-600 dark:text-blue-400">{t('decision_yes_rag')}</p>
                      <p className="text-muted-foreground">{t('decision_no_llm')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* CTA - Fixed Button Styling */}
      <AnimatedContainer animation="fade" delay={0.7}>
        <div className="text-center">
          <Link href="/prompts/wizard" className={cn(buttonVariants({ size: "lg" }), "group")}>
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
