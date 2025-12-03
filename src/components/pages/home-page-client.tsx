'use client'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  BookOpenIcon,
  PencilLineIcon,
  UsersIcon,
  SparklesIcon,
  ArrowRightIcon,
  SearchIcon,
  RocketIcon
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { AnimatedContainer } from '@/components/animations/animated-container'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { ParallaxContainer } from '@/components/animations/parallax-container'
import { FloatingElement } from '@/components/animations/floating-element'
import { ScaleOnHover } from '@/components/animations/scale-on-hover'
import { motion, useReducedMotion } from 'framer-motion'

interface HomePageClientProps {
  translations: {
    hero: {
      badge: string
      title_line1: string
      title_gradient: string
      subtitle: string
      cta_primary: string
      cta_secondary: string
      stat_learners: string
      stat_prompts: string
      stat_free_value: string
      stat_free_label: string
      image_alt: string
    }
    features: {
      section_title: string
      section_subtitle: string
      learn_title: string
      learn_description: string
      create_title: string
      create_description: string
      share_title: string
      share_description: string
      optimize_title: string
      optimize_description: string
    }
    steps: {
      section_title: string
      section_subtitle: string
      discover_title: string
      discover_description: string
      create_title: string
      create_description: string
      share_title: string
      share_description: string
    }
    cta: {
      title: string
      subtitle: string
      button_primary: string
      button_secondary: string
      footer_text: string
    }
  }
  stats: {
    totalUsers: number
    totalPrompts: number
  }
}

export function HomePageClient({ translations: t, stats }: HomePageClientProps) {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion()

  const features = [
    {
      icon: BookOpenIcon,
      title: t.features.learn_title,
      description: t.features.learn_description,
      color: 'from-green-500 to-emerald-600',
      link: '/tutorials'
    },
    {
      icon: PencilLineIcon,
      title: t.features.create_title,
      description: t.features.create_description,
      color: 'from-indigo-500 to-violet-600',
      link: '/prompts/wizard'
    },
    {
      icon: UsersIcon,
      title: t.features.share_title,
      description: t.features.share_description,
      color: 'from-cyan-500 to-blue-600',
      link: '/trending'
    },
    {
      icon: SparklesIcon,
      title: t.features.optimize_title,
      description: t.features.optimize_description,
      color: 'from-violet-500 to-purple-600',
      link: '/prompts/wizard'
    }
  ]

  const steps = [
    {
      number: '1',
      icon: SearchIcon,
      title: t.steps.discover_title,
      description: t.steps.discover_description
    },
    {
      number: '2',
      icon: PencilLineIcon,
      title: t.steps.create_title,
      description: t.steps.create_description
    },
    {
      number: '3',
      icon: UsersIcon,
      title: t.steps.share_title,
      description: t.steps.share_description
    }
  ]

  return (
    <>
      {/* Hero Section - Enhanced with Parallax and Mobile Optimizations */}
      <Section background="gradient" spacing="xl" className="safe-area-inset-top">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center py-4 sm:py-8 md:py-12 lg:py-16">
            {/* Left: Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-0">
              <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"} delay={0.1}>
                <Badge
                  variant="soft"
                  size="md"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                  className="touch-target-sm"
                >
                  {t.hero.badge}
                </Badge>
              </AnimatedContainer>

              {/* Mobile Hero Image - Visible only on mobile/tablet */}
              <div className="lg:hidden relative w-full max-w-xs mx-auto aspect-square -my-2 sm:my-0">
                <AnimatedContainer animation={prefersReducedMotion ? "fade" : "zoom"} delay={0.2}>
                  <Image
                    src="/branding/illustrations/hero-student-learning.svg"
                    alt={t.hero.image_alt}
                    fill
                    className="object-contain drop-shadow-xl"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 0px"
                  />
                </AnimatedContainer>
              </div>

              <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"} delay={0.2}>
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-tight">
                    {t.hero.title_line1}{' '}
                    <motion.span
                      className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent inline-block"
                      animate={prefersReducedMotion ? {} : {
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      style={{
                        backgroundSize: '200% 200%'
                      }}
                    >
                      {t.hero.title_gradient}
                    </motion.span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {t.hero.subtitle}
                  </p>
                </div>
              </AnimatedContainer>

              <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"} delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="/tutorials/paths/beginner"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8",
                        "min-h-[48px] sm:min-h-[52px] lg:min-h-[56px]", // Touch-friendly height
                        "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
                        "active:scale-[0.98] transition-transform touch-manipulation"
                      )}
                    >
                      {t.hero.cta_primary}
                      <ArrowRightIcon className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="/tutorials"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8",
                        "min-h-[48px] sm:min-h-[52px] lg:min-h-[56px]", // Touch-friendly height
                        "active:scale-[0.98] transition-transform touch-manipulation"
                      )}
                    >
                      {t.hero.cta_secondary}
                    </Link>
                  </motion.div>
                </div>
              </AnimatedContainer>

              {/* Simple Stats with Stagger Animation - Optimized for mobile */}
              <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"} delay={0.4}>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pt-4 sm:pt-6 lg:pt-8 border-t border-border/50">
                  <StaggerContainer staggerDelay={prefersReducedMotion ? 0 : 0.15}>
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                      className="text-center lg:text-left"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        {stats.totalUsers || 0}+
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">
                        {t.hero.stat_learners}
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                      className="text-center lg:text-left"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                        {stats.totalPrompts || 0}+
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">
                        {t.hero.stat_prompts}
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                      className="text-center lg:text-left"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                        {t.hero.stat_free_value}
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">
                        {t.hero.stat_free_label}
                      </div>
                    </motion.div>
                  </StaggerContainer>
                </div>
              </AnimatedContainer>
            </div>

            {/* Right: Illustration with Parallax and Float - Desktop only */}
            <div className="hidden lg:block relative">
              <ParallaxContainer speed={prefersReducedMotion ? 0 : 30}>
                <FloatingElement duration={4} intensity={prefersReducedMotion ? 0 : 15}>
                  <AnimatedContainer animation={prefersReducedMotion ? "fade" : "zoom"} delay={0.5}>
                    <div className="relative aspect-square">
                      <Image
                        src="/branding/illustrations/hero-student-learning.svg"
                        alt={t.hero.image_alt}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </AnimatedContainer>
                </FloatingElement>
              </ParallaxContainer>
            </div>
          </div>
        </Container>
      </Section>

      {/* What You Can Do - 4 Features Grid - Mobile Optimized */}
      <Section spacing="xl">
        <Container size="lg">
          <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"}>
            <div className="text-center mb-6 sm:mb-10 lg:mb-16 space-y-2 sm:space-y-4 px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                {t.features.section_title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.features.section_subtitle}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-0"
            staggerDelay={prefersReducedMotion ? 0 : 0.1}
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.title}
                  href={feature.link}
                  className="group block touch-manipulation"
                >
                  <motion.div
                    className={cn(
                      "h-full p-4 sm:p-5 lg:p-6 xl:p-8 rounded-xl sm:rounded-2xl",
                      "border-2 border-border/50 bg-card relative overflow-hidden",
                      "active:scale-[0.98] transition-transform"
                    )}
                    whileHover={prefersReducedMotion ? {} : {
                      borderColor: 'hsl(var(--primary) / 0.5)',
                      y: -4,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Animated gradient background on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`
                      }}
                    />

                    <div className="relative flex sm:block items-start gap-4 sm:gap-0">
                      <motion.div
                        className={cn(
                          "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex-shrink-0",
                          `bg-gradient-to-br ${feature.color}`,
                          "flex items-center justify-center sm:mb-4 lg:mb-6 shadow-lg"
                        )}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 lg:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* How It Works - 3 Steps - Mobile Optimized */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <AnimatedContainer animation={prefersReducedMotion ? "fade" : "slide-up"}>
            <div className="text-center mb-6 sm:mb-10 lg:mb-16 space-y-2 sm:space-y-4 px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                {t.steps.section_title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.steps.section_subtitle}
              </p>
            </div>
          </AnimatedContainer>

          {/* Mobile: Horizontal scroll view, Desktop: Grid */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4">
            <div className="flex gap-4 min-w-max">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.number}
                    className="relative text-center w-[280px] flex-shrink-0"
                  >
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    <div className="pt-8 p-4 rounded-xl bg-card border-2 border-border/50 h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Scroll hint */}
            <div className="flex justify-center gap-2 mt-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-muted-foreground/30"
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <StaggerContainer
            className="hidden md:grid grid-cols-3 gap-6 lg:gap-10 xl:gap-12 max-w-5xl mx-auto"
            staggerDelay={prefersReducedMotion ? 0 : 0.15}
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className="relative text-center"
                  whileHover={prefersReducedMotion ? {} : { y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Connecting line for desktop */}
                  {index < steps.length - 1 && !prefersReducedMotion && (
                    <motion.div
                      className="absolute top-6 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-30"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                    />
                  )}

                  {/* Step Number Badge */}
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 z-10"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </motion.div>

                  <motion.div
                    className="pt-10 p-6 lg:p-8 rounded-2xl bg-card border-2 border-border/50 h-full relative overflow-hidden"
                    whileHover={prefersReducedMotion ? {} : {
                      borderColor: 'hsl(var(--primary) / 0.5)',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                    }}
                  >
                    <motion.div
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950 flex items-center justify-center mx-auto mb-4 lg:mb-6"
                      whileHover={prefersReducedMotion ? {} : { rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">{step.title}</h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Final CTA - Enhanced with Animations and Mobile Optimizations */}
      <Section spacing="xl" className="safe-area-inset-bottom">
        <Container size="md" className="px-3 sm:px-4">
          <AnimatedContainer animation={prefersReducedMotion ? "fade" : "zoom"} delay={0.2}>
            <motion.div
              className={cn(
                "relative overflow-hidden rounded-2xl sm:rounded-3xl",
                "bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500",
                "p-5 sm:p-8 md:p-10 lg:p-16 text-center text-white shadow-2xl"
              )}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"
                animate={prefersReducedMotion ? {} : {
                  backgroundPosition: ['0px 0px', '20px 20px']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />

              <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8">
                <FloatingElement duration={3} intensity={prefersReducedMotion ? 0 : 8}>
                  <RocketIcon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto opacity-90" />
                </FloatingElement>

                <motion.div
                  className="space-y-2 sm:space-y-3 lg:space-y-4"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                    {t.cta.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-2xl mx-auto">
                    {t.cta.subtitle}
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="/tutorials/paths/beginner"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "w-full sm:w-auto bg-white text-indigo-600 hover:bg-white/90",
                        "text-sm sm:text-base lg:text-lg px-5 sm:px-8 lg:px-10",
                        "min-h-[48px] sm:min-h-[52px] lg:min-h-[56px]", // Touch-friendly height
                        "shadow-xl active:scale-[0.98] transition-transform touch-manipulation"
                      )}
                    >
                      {t.cta.button_primary}
                      <ArrowRightIcon className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="/pricing"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full sm:w-auto border-white text-white hover:bg-white/10",
                        "text-sm sm:text-base lg:text-lg px-5 sm:px-8 lg:px-10",
                        "min-h-[48px] sm:min-h-[52px] lg:min-h-[56px]", // Touch-friendly height
                        "active:scale-[0.98] transition-transform touch-manipulation"
                      )}
                    >
                      {t.cta.button_secondary}
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-[10px] sm:text-xs lg:text-sm text-white/70 pt-1 sm:pt-2"
                  initial={prefersReducedMotion ? {} : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {t.cta.footer_text}
                </motion.p>
              </div>
            </motion.div>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  )
}
