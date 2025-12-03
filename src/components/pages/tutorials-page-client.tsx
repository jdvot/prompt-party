'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { TutorialCard } from '@/components/tutorials/tutorial-card'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, FloatingElement, ScaleOnHover } from '@/components/animations'
import { useReducedMotion } from 'framer-motion'

interface TutorialsPageClientProps {
  tutorials: any
  learningPaths: any
  t: any
}

// Hook to detect mobile viewport
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [breakpoint])

  return isMobile
}

export function TutorialsPageClient({ tutorials, learningPaths, t }: TutorialsPageClientProps) {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 safe-area-inset-top">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-violet-500/10 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />

        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-14 relative">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center max-w-7xl mx-auto">
            {/* Left: Content */}
            <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"}>
              <div className="text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 touch-target-sm">
                  <Icons.BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600 dark:text-violet-400" />
                  <span className="text-xs sm:text-sm font-medium text-violet-600 dark:text-violet-400">
                    {t.hero_badge}
                  </span>
                </div>

                {/* Mobile Hero Image - Visible only on mobile */}
                <div className="lg:hidden relative w-full max-w-[200px] sm:max-w-[240px] mx-auto aspect-square -my-2">
                  <Image
                    src="/branding/illustrations/features/learning-path.svg"
                    alt="Learning Path Journey"
                    fill
                    className="object-contain drop-shadow-xl"
                    priority
                    sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 0px"
                  />
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-r from-violet-600 via-violet-600 to-violet-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    {t.hero_title}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed">
                  {t.hero_subtitle}
                </p>

                {/* CTA Buttons - Touch optimized */}
                <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 pt-2">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full sm:w-auto group relative overflow-hidden",
                      "bg-gradient-to-r from-indigo-600 to-violet-600",
                      "hover:from-indigo-700 hover:to-violet-700",
                      "text-white border-0 min-w-0 sm:min-w-[180px]",
                      "min-h-[48px] text-sm sm:text-base",
                      "active:scale-[0.98] transition-transform touch-manipulation"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icons.Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      {t.start_learning}
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <Link
                    href="#beginner"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "w-full sm:w-auto min-w-0 sm:min-w-[180px]",
                      "min-h-[48px] text-sm sm:text-base group",
                      "active:scale-[0.98] transition-transform touch-manipulation"
                    )}
                  >
                    <Icons.BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {t.browse_tutorials}
                  </Link>
                </div>

                {/* Stats - Compact on mobile */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 lg:pt-8">
                  <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 text-center lg:text-left">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      {t.stat_tutorials}
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground line-clamp-1">
                      {t.stat_tutorials_label}
                    </div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 text-center lg:text-left">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      {t.stat_examples}
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground line-clamp-1">
                      {t.stat_examples_label}
                    </div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 text-center lg:text-left">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      {t.stat_free}
                    </div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground line-clamp-1">
                      {t.stat_free_label}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>

            {/* Right: Learning Path Illustration - Desktop only */}
            <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-left"} delay={0.2}>
              <div className="hidden lg:block relative">
                <FloatingElement duration={5} intensity={prefersReducedMotion ? 0 : 20}>
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
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer animation="fade" delay={0.1} className="text-center mb-4 sm:mb-6 lg:mb-8 px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4">
              {t.choose_path}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.choose_path_subtitle}
            </p>
          </AnimatedContainer>

          {/* Mobile Horizontal Scroll */}
          <div className="sm:hidden">
            <div className="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory mobile-scroll hide-scrollbar">
              {learningPaths.map((path: any, index: number) => {
                const Icon = Icons[path.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
                return (
                  <Link
                    key={index}
                    href={path.link}
                    className="flex-shrink-0 w-[280px] snap-start touch-manipulation"
                  >
                    <Card className="group relative overflow-hidden h-full hover:shadow-xl active:scale-[0.98] transition-all duration-200 border-2 hover:border-violet-500/50">
                      <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5`} />
                      <CardHeader className="relative p-4 pb-2">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-3`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg line-clamp-1">{path.title}</CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {path.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative p-4 pt-0 space-y-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{path.steps}</span>
                          <span>{path.duration}</span>
                        </div>
                        <div className={cn(
                          "w-full flex items-center justify-center gap-2 py-2.5 rounded-md",
                          "border border-input bg-background text-sm font-medium",
                          "group-hover:bg-accent group-hover:text-accent-foreground"
                        )}>
                          {t.start_path}
                          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
            {/* Scroll hint */}
            <div className="flex justify-center gap-1.5 mt-2">
              {learningPaths.map((_: any, i: number) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:block px-4">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6" staggerDelay={0.1}>
              {learningPaths.map((path: any, index: number) => {
                const Icon = Icons[path.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
                return (
                  <ScaleOnHover key={index} scale={prefersReducedMotion ? 1 : 1.03}>
                    <Card className="group relative overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-violet-500/50">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

                      <CardHeader className="relative p-4 lg:p-6">
                        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <CardTitle className="text-lg lg:text-xl">{path.title}</CardTitle>
                        <CardDescription className="text-sm lg:text-base">
                          {path.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="relative space-y-3 lg:space-y-4 p-4 lg:p-6 pt-0">
                        <div className="flex items-center justify-between text-xs lg:text-sm">
                          <span className="text-muted-foreground">{path.steps}</span>
                          <span className="text-muted-foreground">{path.duration}</span>
                        </div>
                        <Link
                          href={path.link}
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-full group/btn min-h-[44px]",
                            "active:scale-[0.98] transition-transform touch-manipulation"
                          )}
                        >
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
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-6 sm:py-8" id="beginner">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12">
          {/* Beginner */}
          <div>
            <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"} className="flex items-center gap-3 mb-3 sm:mb-4 lg:mb-6 px-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Icons.BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">{t.beginner_title}</h2>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-1">{t.beginner_subtitle}</p>
              </div>
            </AnimatedContainer>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory mobile-scroll hide-scrollbar">
                {tutorials.beginner.map((tutorial: any) => (
                  <div key={tutorial.id} className="flex-shrink-0 snap-start">
                    <TutorialCard tutorial={tutorial} buttonLabel={t.start_tutorial} compact />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden sm:block px-4">
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr" staggerDelay={0.08}>
                {tutorials.beginner.map((tutorial: any) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} buttonLabel={t.start_tutorial} />
                ))}
              </StaggerContainer>
            </div>
          </div>

          {/* Intermediate */}
          <div id="intermediate">
            <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"} className="flex items-center gap-3 mb-3 sm:mb-4 lg:mb-6 px-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Icons.Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">{t.intermediate_title}</h2>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-1">{t.intermediate_subtitle}</p>
              </div>
            </AnimatedContainer>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory mobile-scroll hide-scrollbar">
                {tutorials.intermediate.map((tutorial: any) => (
                  <div key={tutorial.id} className="flex-shrink-0 snap-start">
                    <TutorialCard tutorial={tutorial} buttonLabel={t.start_tutorial} compact />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden sm:block px-4">
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr" staggerDelay={0.08}>
                {tutorials.intermediate.map((tutorial: any) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} buttonLabel={t.start_tutorial} />
                ))}
              </StaggerContainer>
            </div>
          </div>

          {/* Advanced */}
          <div id="advanced">
            <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"} className="flex items-center gap-3 mb-3 sm:mb-4 lg:mb-6 px-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Icons.Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">{t.advanced_title}</h2>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground line-clamp-1">{t.advanced_subtitle}</p>
              </div>
            </AnimatedContainer>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory mobile-scroll hide-scrollbar">
                {tutorials.advanced.map((tutorial: any) => (
                  <div key={tutorial.id} className="flex-shrink-0 snap-start">
                    <TutorialCard tutorial={tutorial} buttonLabel={t.start_tutorial} compact />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden sm:block px-4">
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr" staggerDelay={0.08}>
                {tutorials.advanced.map((tutorial: any) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} buttonLabel={t.start_tutorial} />
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-4 py-6 sm:py-8 safe-area-inset-bottom">
        <AnimatedContainer animation={prefersReducedMotion ? "fade" : "zoom"} delay={0.2}>
          <ScaleOnHover scale={prefersReducedMotion ? 1 : 1.01}>
            <Card className="max-w-5xl mx-auto bg-gradient-to-br from-violet-500/5 via-violet-500/5 to-violet-500/5 border-violet-500/20">
              <CardHeader className="text-center pb-3 sm:pb-4 lg:pb-6 px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2">{t.resources_title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm lg:text-base">
                  {t.resources_subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                      <Icons.BookMarked className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 dark:text-violet-400" />
                      {t.resources_official_docs}
                    </h4>
                    <ul className="space-y-1 sm:space-y-2">
                      <li>
                        <a
                          href="https://docs.anthropic.com/claude/docs"
                          target="_blank"
                          rel="noopener"
                          className={cn(
                            "group flex items-center gap-2 py-2 sm:py-1.5",
                            "text-sm sm:text-base text-muted-foreground",
                            "hover:text-violet-600 dark:hover:text-violet-400 transition-colors",
                            "touch-manipulation min-h-[44px] sm:min-h-0"
                          )}
                        >
                          <Icons.ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="line-clamp-1">{t.resource_claude_docs}</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://platform.openai.com/docs"
                          target="_blank"
                          rel="noopener"
                          className={cn(
                            "group flex items-center gap-2 py-2 sm:py-1.5",
                            "text-sm sm:text-base text-muted-foreground",
                            "hover:text-violet-600 dark:hover:text-violet-400 transition-colors",
                            "touch-manipulation min-h-[44px] sm:min-h-0"
                          )}
                        >
                          <Icons.ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="line-clamp-1">{t.resource_openai_docs}</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.promptingguide.ai/"
                          target="_blank"
                          rel="noopener"
                          className={cn(
                            "group flex items-center gap-2 py-2 sm:py-1.5",
                            "text-sm sm:text-base text-muted-foreground",
                            "hover:text-violet-600 dark:hover:text-violet-400 transition-colors",
                            "touch-manipulation min-h-[44px] sm:min-h-0"
                          )}
                        >
                          <Icons.ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="line-clamp-1">{t.resource_prompting_guide}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                      <Icons.Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 dark:text-violet-400" />
                      {t.resources_community}
                    </h4>
                    <ul className="space-y-1 sm:space-y-2">
                      <li>
                        <Link
                          href="/trending"
                          className={cn(
                            "group flex items-center gap-2 py-2 sm:py-1.5",
                            "text-sm sm:text-base text-muted-foreground",
                            "hover:text-violet-600 dark:hover:text-violet-400 transition-colors",
                            "touch-manipulation min-h-[44px] sm:min-h-0"
                          )}
                        >
                          <Icons.ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="line-clamp-1">{t.resource_community_tutorials}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/challenges"
                          className={cn(
                            "group flex items-center gap-2 py-2 sm:py-1.5",
                            "text-sm sm:text-base text-muted-foreground",
                            "hover:text-violet-600 dark:hover:text-violet-400 transition-colors",
                            "touch-manipulation min-h-[44px] sm:min-h-0"
                          )}
                        >
                          <Icons.ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="line-clamp-1">{t.resource_challenges}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/about"
                          className={cn(
                            "group flex items-center gap-2 py-2 sm:py-1.5",
                            "text-sm sm:text-base text-muted-foreground",
                            "hover:text-violet-600 dark:hover:text-violet-400 transition-colors",
                            "touch-manipulation min-h-[44px] sm:min-h-0"
                          )}
                        >
                          <Icons.ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="line-clamp-1">{t.resource_teams}</span>
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
