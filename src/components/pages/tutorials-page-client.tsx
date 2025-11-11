'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { TutorialCard } from '@/components/tutorials/tutorial-card'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, FloatingElement, ScaleOnHover } from '@/components/animations'

interface TutorialsPageClientProps {
  tutorials: any
  learningPaths: any
  t: any
}

export function TutorialsPageClient({ tutorials, learningPaths, t }: TutorialsPageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-violet-500/10 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />

        <div className="container mx-auto px-4 py-12 md:py-14 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            {/* Left: Content */}
            <AnimatedContainer animation="slide-up">
              <div className="text-center lg:text-left space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
                  <Icons.BookMarked className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                    {t.hero_badge}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-violet-600 via-violet-600 to-violet-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    {t.hero_title}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl lg:max-w-none leading-relaxed">
                  {t.hero_subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4 pt-4">
                  <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 min-w-[200px]">
                    <span className="relative z-10 flex items-center gap-2">
                      <Icons.Play className="w-5 h-5" />
                      {t.start_learning}
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <Link href="#beginner" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "min-w-[200px] group")}>
                    <Icons.BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {t.browse_tutorials}
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      {t.stat_tutorials}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.stat_tutorials_label}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      {t.stat_examples}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.stat_examples_label}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      {t.stat_free}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.stat_free_label}</div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>

            {/* Right: Learning Path Illustration */}
            <AnimatedContainer animation="slide-left" delay={0.2}>
              <div className="hidden lg:block relative">
                <FloatingElement duration={5} intensity={20}>
                  <div className="relative aspect-square max-w-lg mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <Image
                      src="/branding/illustrations/features/learning-path.svg"
                      alt="Learning Path Journey"
                      width={500}
                      height={500}
                      className="relative z-10 drop-shadow-2xl"
                      priority
                    />
                  </div>
                </FloatingElement>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0.1} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.choose_path}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.choose_path_subtitle}
            </p>
          </AnimatedContainer>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {learningPaths.map((path: any, index: number) => {
              const Icon = Icons[path.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
              return (
                <ScaleOnHover key={index} scale={1.03}>
                  <Card className="group relative overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-violet-500/50">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

                    <CardHeader className="relative">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <CardDescription className="text-base">
                        {path.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{path.steps}</span>
                        <span className="text-muted-foreground">{path.duration}</span>
                      </div>
                      <Link href={path.link} className={cn(buttonVariants({ variant: "outline" }), "w-full group/btn")}>
                        {t.start_path}
                        <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="container mx-auto px-4 py-8" id="beginner">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Beginner */}
          <div>
            <AnimatedContainer animation="slide-up" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Icons.BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{t.beginner_title}</h2>
                <p className="text-muted-foreground">{t.beginner_subtitle}</p>
              </div>
            </AnimatedContainer>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr" staggerDelay={0.08}>
              {tutorials.beginner.map((tutorial: any) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} buttonLabel={t.start_tutorial} />
              ))}
            </StaggerContainer>
          </div>

          {/* Intermediate */}
          <div>
            <AnimatedContainer animation="slide-up" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Icons.Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{t.intermediate_title}</h2>
                <p className="text-muted-foreground">{t.intermediate_subtitle}</p>
              </div>
            </AnimatedContainer>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr" staggerDelay={0.08}>
              {tutorials.intermediate.map((tutorial: any) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} buttonLabel={t.start_tutorial} />
              ))}
            </StaggerContainer>
          </div>

          {/* Advanced */}
          <div>
            <AnimatedContainer animation="slide-up" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-cyan-500 flex items-center justify-center">
                <Icons.Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{t.advanced_title}</h2>
                <p className="text-muted-foreground">{t.advanced_subtitle}</p>
              </div>
            </AnimatedContainer>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr" staggerDelay={0.08}>
              {tutorials.advanced.map((tutorial: any) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} buttonLabel={t.start_tutorial} />
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-4 py-8">
        <AnimatedContainer animation="zoom" delay={0.2}>
          <ScaleOnHover scale={1.01}>
            <Card className="max-w-5xl mx-auto bg-gradient-to-br from-violet-500/5 via-violet-500/5 to-violet-500/5 border-violet-500/20">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl mb-2">{t.resources_title}</CardTitle>
                <CardDescription className="text-base">
                  {t.resources_subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Icons.BookMarked className="w-5 h-5 text-violet-600" />
                      {t.resources_official_docs}
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noopener" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          {t.resource_claude_docs}
                        </a>
                      </li>
                      <li>
                        <a href="https://platform.openai.com/docs" target="_blank" rel="noopener" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          {t.resource_openai_docs}
                        </a>
                      </li>
                      <li>
                        <a href="https://www.promptingguide.ai/" target="_blank" rel="noopener" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          {t.resource_prompting_guide}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Icons.Sparkles className="w-5 h-5 text-violet-600" />
                      {t.resources_community}
                    </h4>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/prompts?tag=tutorial" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          {t.resource_community_tutorials}
                        </Link>
                      </li>
                      <li>
                        <Link href="/challenges" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          {t.resource_challenges}
                        </Link>
                      </li>
                      <li>
                        <Link href="/teams" className="group flex items-center gap-2 text-muted-foreground hover:text-violet-600 transition-colors">
                          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          {t.resource_teams}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScaleOnHover>
        </AnimatedContainer>
      </section>
    </div>
  )
}
