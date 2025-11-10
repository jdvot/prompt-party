'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AnimatedContainer } from '@/components/animations/animated-container'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { MetricCard } from '@/components/tech-stack/metric-card'
import { TechStackCard } from '@/components/tech-stack/tech-stack-card'
import { CodeBlock } from '@/components/tech-stack/code-block'
import { ComparisonTable } from '@/components/tech-stack/comparison-table'
import { ArchitectureDiagram } from '@/components/tech-stack/architecture-diagram'
import { WorkflowDiagram } from '@/components/tech-stack/workflow-diagram'
import {
  Code, Brain, FileText, Sparkles, Zap, GitBranch, BarChart3,
  Gauge, Database, Lock, Rocket, Users, BookOpen, Github, ExternalLink,
  Zap as Performance, Shield, Layers, CheckSquare
} from 'lucide-react'

export function TechStackContent() {
  const t = useTranslations('techStack')

  // Tools configuration
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
      tabs: [
        {
          value: 'overview',
          label: 'claude_code_tab_overview',
          content: 'claude_code_tab_overview_content',
        },
        {
          value: 'setup',
          label: 'claude_code_tab_setup',
          content: 'claude_code_tab_setup_content',
        },
        {
          value: 'usage',
          label: 'claude_code_tab_usage',
          content: 'claude_code_tab_usage_content',
        },
        {
          value: 'examples',
          label: 'claude_code_tab_examples',
          content: 'claude_code_tab_examples_content',
        },
        {
          value: 'best-practices',
          label: 'claude_code_tab_best_practices',
          content: 'claude_code_tab_best_practices_content',
        },
      ],
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
      tabs: [
        {
          value: 'overview',
          label: 'ragas_tab_overview',
          content: 'ragas_tab_overview_content',
        },
        {
          value: 'setup',
          label: 'ragas_tab_setup',
          content: 'ragas_tab_setup_content',
        },
        {
          value: 'usage',
          label: 'ragas_tab_usage',
          content: 'ragas_tab_usage_content',
        },
        {
          value: 'examples',
          label: 'ragas_tab_examples',
          content: 'ragas_tab_examples_content',
        },
        {
          value: 'metrics',
          label: 'ragas_tab_metrics',
          content: 'ragas_tab_metrics_content',
        },
      ],
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
      tabs: [
        {
          value: 'overview',
          label: 'spec_driven_tab_overview',
          content: 'spec_driven_tab_overview_content',
        },
        {
          value: 'workflow',
          label: 'spec_driven_tab_workflow',
          content: 'spec_driven_tab_workflow_content',
        },
        {
          value: 'github',
          label: 'spec_driven_tab_github',
          content: 'spec_driven_tab_github_content',
        },
        {
          value: 'template',
          label: 'spec_driven_tab_template',
          content: 'spec_driven_tab_template_content',
        },
        {
          value: 'best-practices',
          label: 'spec_driven_tab_best_practices',
          content: 'spec_driven_tab_best_practices_content',
        },
      ],
    },
  ]

  // Metrics data
  const metrics = [
    {
      icon: Performance,
      value: 90,
      suffix: '%',
      label: t('metric_ambiguity_label'),
      description: t('metric_ambiguity_desc'),
      gradient: 'from-indigo-500 to-purple-500',
      lightGradient: 'from-indigo-500/10 to-purple-500/10',
    },
    {
      icon: BarChart3,
      value: 85,
      suffix: '%',
      label: t('metric_quality_label'),
      description: t('metric_quality_desc'),
      gradient: 'from-emerald-500 to-teal-500',
      lightGradient: 'from-emerald-500/10 to-teal-500/10',
    },
    {
      icon: Zap,
      value: 3,
      suffix: 'x',
      label: t('metric_speed_label'),
      description: t('metric_speed_desc'),
      gradient: 'from-blue-500 to-cyan-500',
      lightGradient: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      icon: Shield,
      value: 99.9,
      suffix: '%',
      label: t('metric_uptime_label'),
      description: t('metric_uptime_desc'),
      gradient: 'from-rose-500 to-pink-500',
      lightGradient: 'from-rose-500/10 to-pink-500/10',
    },
    {
      icon: Code,
      value: 10000,
      suffix: '+',
      label: t('metric_code_label'),
      description: t('metric_code_desc'),
      gradient: 'from-yellow-500 to-orange-500',
      lightGradient: 'from-yellow-500/10 to-orange-500/10',
    },
    {
      icon: Gauge,
      value: 50,
      suffix: '%',
      label: t('metric_review_label'),
      description: t('metric_review_desc'),
      gradient: 'from-violet-500 to-purple-500',
      lightGradient: 'from-violet-500/10 to-purple-500/10',
    },
  ]

  // Tech stack data
  const techStack = [
    {
      title: 'Next.js',
      version: '15.5',
      description: t('tech_nextjs_desc'),
      features: [
        t('tech_nextjs_feature_1'),
        t('tech_nextjs_feature_2'),
        t('tech_nextjs_feature_3'),
      ],
      icon: Code,
      gradient: 'from-black to-gray-700',
      lightGradient: 'from-gray-200 to-gray-100',
    },
    {
      title: 'Supabase',
      version: 'Latest',
      description: t('tech_supabase_desc'),
      features: [
        t('tech_supabase_feature_1'),
        t('tech_supabase_feature_2'),
        t('tech_supabase_feature_3'),
      ],
      icon: Database,
      gradient: 'from-emerald-500 to-teal-500',
      lightGradient: 'from-emerald-500/10 to-teal-500/10',
    },
    {
      title: 'TypeScript',
      version: '5.6',
      description: t('tech_typescript_desc'),
      features: [
        t('tech_typescript_feature_1'),
        t('tech_typescript_feature_2'),
        t('tech_typescript_feature_3'),
      ],
      icon: Code,
      gradient: 'from-blue-600 to-blue-400',
      lightGradient: 'from-blue-500/10 to-blue-400/10',
    },
    {
      title: 'Vercel',
      version: 'Enterprise',
      description: t('tech_vercel_desc'),
      features: [
        t('tech_vercel_feature_1'),
        t('tech_vercel_feature_2'),
        t('tech_vercel_feature_3'),
      ],
      icon: Rocket,
      gradient: 'from-gray-900 to-gray-700',
      lightGradient: 'from-gray-200 to-gray-100',
    },
    {
      title: 'Tailwind CSS',
      version: '3.4',
      description: t('tech_tailwind_desc'),
      features: [
        t('tech_tailwind_feature_1'),
        t('tech_tailwind_feature_2'),
        t('tech_tailwind_feature_3'),
      ],
      icon: Layers,
      gradient: 'from-cyan-500 to-blue-500',
      lightGradient: 'from-cyan-500/10 to-blue-500/10',
    },
    {
      title: 'Shadcn UI',
      version: '0.8',
      description: t('tech_shadcn_desc'),
      features: [
        t('tech_shadcn_feature_1'),
        t('tech_shadcn_feature_2'),
        t('tech_shadcn_feature_3'),
      ],
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
      lightGradient: 'from-purple-500/10 to-pink-500/10',
    },
  ]

  // Workflow steps
  const workflowSteps = [
    {
      number: 1,
      title: t('workflow_step_1'),
      description: t('workflow_step_1_desc'),
      icon: FileText,
      metric: 'Zero Ambiguity',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      number: 2,
      title: t('workflow_step_2'),
      description: t('workflow_step_2_desc'),
      icon: Code,
      metric: '3x Faster',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      number: 3,
      title: t('workflow_step_3'),
      description: t('workflow_step_3_desc'),
      icon: BarChart3,
      metric: '85%+ Quality',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      number: 4,
      title: t('workflow_step_4'),
      description: t('workflow_step_4_desc'),
      icon: Sparkles,
      metric: 'Production Ready',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ]

  // Comparison data
  const comparisonRows = [
    {
      criterion: t('comparison_development_speed'),
      before: false,
      after: true,
      improvement: t('comparison_improvement_3x'),
    },
    {
      criterion: t('comparison_code_quality'),
      before: 'Basic',
      after: 'Enterprise',
      improvement: t('comparison_improvement_85'),
    },
    {
      criterion: t('comparison_documentation'),
      before: false,
      after: true,
      improvement: t('comparison_improvement_auto'),
    },
    {
      criterion: t('comparison_bug_rate'),
      before: 'High',
      after: 'Low',
      improvement: t('comparison_improvement_50'),
    },
    {
      criterion: t('comparison_onboarding'),
      before: t('comparison_weeks'),
      after: t('comparison_days'),
      improvement: t('comparison_improvement_fast'),
    },
    {
      criterion: t('comparison_team_alignment'),
      before: 'Manual',
      after: 'Automatic',
      improvement: t('comparison_improvement_90'),
    },
    {
      criterion: t('comparison_scalability'),
      before: false,
      after: true,
      improvement: t('comparison_improvement_proven'),
    },
    {
      criterion: t('comparison_cost_efficiency'),
      before: 'High',
      after: 'Optimized',
      improvement: t('comparison_improvement_40'),
    },
    {
      criterion: t('comparison_test_coverage'),
      before: '40%',
      after: '95%',
      improvement: t('comparison_improvement_coverage'),
    },
    {
      criterion: t('comparison_cicd_time'),
      before: '25 min',
      after: '5 min',
      improvement: t('comparison_improvement_5x'),
    },
    {
      criterion: t('comparison_review_time'),
      before: '4 hours',
      after: '30 min',
      improvement: t('comparison_improvement_time'),
    },
    {
      criterion: t('comparison_knowledge_transfer'),
      before: t('comparison_manual'),
      after: t('comparison_automated'),
      improvement: t('comparison_improvement_systematic'),
    },
  ]

  // FAQ data
  const faqItems = [
    {
      question: t('faq_integration_q'),
      answer: t('faq_integration_a'),
    },
    {
      question: t('faq_cost_q'),
      answer: t('faq_cost_a'),
    },
    {
      question: t('faq_onboarding_q'),
      answer: t('faq_onboarding_a'),
    },
    {
      question: t('faq_scalability_q'),
      answer: t('faq_scalability_a'),
    },
    {
      question: t('faq_security_q'),
      answer: t('faq_security_a'),
    },
    {
      question: t('faq_customization_q'),
      answer: t('faq_customization_a'),
    },
    {
      question: t('faq_migration_q'),
      answer: t('faq_migration_a'),
    },
    {
      question: t('faq_support_q'),
      answer: t('faq_support_a'),
    },
  ]

  // Resources data
  const resources = [
    {
      title: t('resource_claude_title'),
      description: t('resource_claude_desc'),
      icon: Code,
      href: 'https://claude.ai/code',
      external: true,
    },
    {
      title: t('resource_ragas_title'),
      description: t('resource_ragas_desc'),
      icon: Github,
      href: 'https://github.com/explodinggradients/ragas',
      external: true,
    },
    {
      title: t('resource_spec_title'),
      description: t('resource_spec_desc'),
      icon: BookOpen,
      href: 'https://github.com',
      external: true,
    },
    {
      title: t('resource_guide_title'),
      description: t('resource_guide_desc'),
      icon: Layers,
      href: '/docs',
      external: false,
    },
  ]

  const tutorialLinks = [
    {
      title: t('resource_claude_code_tutorial_title'),
      description: t('resource_claude_code_tutorial_desc'),
      icon: Code,
      href: '/tutorials/claude-code-basics',
      external: false,
    },
    {
      title: t('resource_ragas_tutorial_title'),
      description: t('resource_ragas_tutorial_desc'),
      icon: BarChart3,
      href: '/tutorials/ragas-evaluation',
      external: false,
    },
    {
      title: t('resource_spec_tutorial_title'),
      description: t('resource_spec_tutorial_desc'),
      icon: CheckSquare,
      href: '/tutorials/spec-driven-development',
      external: false,
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20" />
          </div>

          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              {/* Enhanced Hero Badge with Animation */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200 rounded-full hover:shadow-lg transition-all duration-300">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  {t('hero_badge')}
                </div>
                {/* Sub-badge with key metric */}
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-sm text-green-700">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-semibold">{t('hero_badge_metric_1')}</span>
                  <span className="text-green-600 text-xs">·</span>
                  <span className="text-green-600 text-xs">{t('hero_badge_metric_2')}</span>
                </div>
              </div>

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

      {/* Metrics Dashboard Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('metrics_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('metrics_subtitle')}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((metric, idx) => (
                <AnimatedContainer key={idx} animation="slide-up" delay={idx * 0.1}>
                  <MetricCard
                    icon={metric.icon}
                    value={metric.value}
                    suffix={metric.suffix}
                    label={metric.label}
                    description={metric.description}
                    gradient={metric.gradient}
                    lightGradient={metric.lightGradient}
                  />
                </AnimatedContainer>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Tech Stack Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('tech_stack_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('tech_stack_subtitle')}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, idx) => (
                <AnimatedContainer key={idx} animation="slide-up" delay={idx * 0.1}>
                  <TechStackCard
                    title={tech.title}
                    description={tech.description}
                    version={tech.version}
                    features={tech.features}
                    icon={tech.icon}
                    gradient={tech.gradient}
                    lightGradient={tech.lightGradient}
                  />
                </AnimatedContainer>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Tools with Tabs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('tools_detailed_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('tools_detailed_subtitle')}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer>
            <div className="space-y-8">
              {tools.map((tool, idx) => {
                const Icon = tool.icon
                return (
                  <AnimatedContainer key={tool.id} animation="slide-up" delay={idx * 0.2}>
                    <Card className="overflow-hidden border-0 bg-white dark:bg-slate-950">
                      <div className={`h-1 bg-gradient-to-r ${tool.gradient}`} />

                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.lightGradient}`}>
                            <Icon className="w-6 h-6" />
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

                      <CardContent className="space-y-6">
                        {/* Tabs for detailed content */}
                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
                            {tool.tabs.map((tab) => (
                              <TabsTrigger key={tab.value} value={tab.value} className="text-xs md:text-sm">
                                {t(tab.label)}
                              </TabsTrigger>
                            ))}
                          </TabsList>

                          {tool.tabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value} className="mt-4">
                              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground">
                                <p className="text-muted-foreground leading-relaxed">
                                  {t(tab.content)}
                                </p>
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>

                        {/* Key points summary */}
                        <ul className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                          {tool.points.map((point, pidx) => (
                            <li key={pidx} className="flex items-start gap-2 text-sm text-foreground/80">
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

      {/* Architecture Diagram Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('architecture_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('architecture_subtitle')}
              </p>
            </div>
          </AnimatedContainer>

          <ArchitectureDiagram />
        </div>
      </section>

      {/* Workflow Diagram Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('how_it_works_title')}
              </h2>
            </div>
          </AnimatedContainer>

          <WorkflowDiagram steps={workflowSteps} />
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('comparison_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('comparison_subtitle')}
              </p>
            </div>
          </AnimatedContainer>

          <ComparisonTable
            rows={comparisonRows}
            beforeLabel={t('comparison_before')}
            afterLabel={t('comparison_after')}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('faq_title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('faq_subtitle')}
              </p>
            </div>
          </AnimatedContainer>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <AccordionTrigger className="hover:no-underline hover:text-indigo-600 dark:hover:text-indigo-400">
                  <span className="text-left font-semibold text-foreground">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('resources_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('resources_subtitle')}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, idx) => {
                const ResourceIcon = resource.icon
                return (
                  <AnimatedContainer key={idx} animation="slide-up" delay={idx * 0.1}>
                    <Link href={resource.href} target={resource.external ? '_blank' : undefined}>
                      <Card className="h-full overflow-hidden border-0 bg-white dark:bg-slate-950 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6 space-y-4">
                          <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 w-fit">
                            <ResourceIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="font-semibold text-foreground">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                          {resource.external && (
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedContainer>
                )
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Interactive Tutorials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t('tutorials_section_title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('tutorials_section_subtitle')}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorialLinks.map((tutorial, idx) => {
                const TutorialIcon = tutorial.icon
                return (
                  <AnimatedContainer key={idx} animation="slide-up" delay={idx * 0.1}>
                    <Link href={tutorial.href}>
                      <Card className="h-full overflow-hidden border-0 bg-white dark:bg-slate-950 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6 space-y-4">
                          <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 w-fit">
                            <TutorialIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="font-semibold text-foreground">{tutorial.title}</h3>
                          <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                              {t('start_tutorial')} →
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedContainer>
                )
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedContainer animation="slide-up">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t('cta_title')}
              </h2>
              <p className="text-lg text-indigo-100 leading-relaxed">
                {t('cta_description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/">
                  <Button size="lg" variant="secondary" className="px-8">
                    {t('cta_button')}
                  </Button>
                </Link>
                <Link href="https://github.com/anthropics/claude-code" target="_blank">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 border-white text-white hover:bg-white/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    {t('cta_github_button')}
                  </Button>
                </Link>
              </div>

              <div className="pt-8 border-t border-indigo-400/50 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-white">{t('cta_stat_1_value')}</p>
                    <p className="text-indigo-100 text-sm mt-1">{t('cta_stat_1_label')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{t('cta_stat_2_value')}</p>
                    <p className="text-indigo-100 text-sm mt-1">{t('cta_stat_2_label')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{t('cta_stat_3_value')}</p>
                    <p className="text-indigo-100 text-sm mt-1">{t('cta_stat_3_label')}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>
    </div>
  )
}
