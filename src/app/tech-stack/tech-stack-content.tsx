'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedContainer } from '@/components/animations/animated-container'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { Code, Brain, FileText, Sparkles, Zap, GitBranch, BarChart3 } from 'lucide-react'

export function TechStackContent() {
  const t = useTranslations('techStack')

  const tools = [
    {
      id: 'claude-code',
      titleKey: 'claude_code_title',
      descKey: 'claude_code_description',
      introKey: 'claude_code_intro',
      points: ['claude_code_point_1', 'claude_code_point_2', 'claude_code_point_3', 'claude_code_point_4'],
      badgeKey: 'claude_code_badge',
      icon: Code,
      gradient: 'from-indigo-500 to-purple-500',
      lightGradient: 'from-indigo-500/10 to-purple-500/10',
    },
    {
      id: 'ragas',
      titleKey: 'ragas_title',
      descKey: 'ragas_description',
      introKey: 'ragas_intro',
      points: ['ragas_point_1', 'ragas_point_2', 'ragas_point_3', 'ragas_point_4'],
      badgeKey: 'ragas_badge',
      icon: Brain,
      gradient: 'from-emerald-500 to-teal-500',
      lightGradient: 'from-emerald-500/10 to-teal-500/10',
    },
    {
      id: 'spec-driven',
      titleKey: 'spec_driven_title',
      descKey: 'spec_driven_description',
      introKey: 'spec_driven_intro',
      points: ['spec_driven_point_1', 'spec_driven_point_2', 'spec_driven_point_3', 'spec_driven_point_4'],
      badgeKey: 'spec_driven_badge',
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      lightGradient: 'from-blue-500/10 to-cyan-500/10',
    },
  ]

  const workflow = [
    { step: 'workflow_step_1', desc: 'workflow_step_1_desc', icon: FileText },
    { step: 'workflow_step_2', desc: 'workflow_step_2_desc', icon: Code },
    { step: 'workflow_step_3', desc: 'workflow_step_3_desc', icon: BarChart3 },
    { step: 'workflow_step_4', desc: 'workflow_step_4_desc', icon: Sparkles },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20" />
          </div>

          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200">
                <Sparkles className="w-4 h-4" />
                {t('hero_badge')}
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t('hero_title')}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('hero_subtitle')}
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <AnimatedContainer key={tool.id} animation="slide-up">
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-slate-950">
                      {/* Top accent bar */}
                      <div className={`h-1 bg-gradient-to-r ${tool.gradient}`} />

                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.lightGradient}`}>
                            <Icon className={`w-6 h-6 text-${tool.id === 'claude-code' ? 'indigo' : tool.id === 'ragas' ? 'emerald' : 'blue'}-600`} />
                          </div>
                          <Badge variant="soft" className="bg-gradient-to-r from-slate-100 to-slate-50">
                            {t(tool.badgeKey)}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl">{t(tool.titleKey)}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground/70">
                          {t(tool.descKey)}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(tool.introKey)}
                        </p>

                        <ul className="space-y-2">
                          {tool.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                              <Zap className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
                              <span>{t(point)}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimatedContainer>
                )
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('how_it_works_title')}
              </h2>
            </div>
          </AnimatedContainer>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((item, idx) => {
              const Icon = item.icon
              return (
                <AnimatedContainer key={idx} animation="slide-up" delay={idx * 0.1}>
                  <div className="relative">
                    {/* Connection line */}
                    {idx < workflow.length - 1 && (
                      <div className="hidden lg:block absolute top-20 -right-3 w-6 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                    )}

                    <div className="p-6 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 mx-auto">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-center mb-2 text-foreground">
                        {t(item.step)}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center">
                        {t(item.desc)}
                      </p>
                    </div>
                  </div>
                </AnimatedContainer>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedContainer animation="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('cta_title')}
            </h2>
            <p className="text-lg text-indigo-100 mb-8 leading-relaxed">
              {t('cta_description')}
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary" className="px-8">
                {t('cta_button')}
              </Button>
            </Link>
          </AnimatedContainer>
        </div>
      </section>
    </div>
  )
}
