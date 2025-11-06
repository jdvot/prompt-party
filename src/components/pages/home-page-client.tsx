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
import { motion } from 'framer-motion'

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
      {/* Hero Section - Enhanced with Parallax */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-16 items-center py-16">
            {/* Left: Content */}
            <div className="text-center lg:text-left space-y-8">
              <AnimatedContainer animation="slide-up" delay={0.1}>
                <Badge
                  variant="soft"
                  size="md"
                  startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                >
                  {t.hero.badge}
                </Badge>
              </AnimatedContainer>

              <AnimatedContainer animation="slide-up" delay={0.2}>
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                    {t.hero.title_line1}{' '}
                    <motion.span
                      className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent"
                      animate={{
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

                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    {t.hero.subtitle}
                  </p>
                </div>
              </AnimatedContainer>

              <AnimatedContainer animation="slide-up" delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/tutorials/paths/beginner"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "text-lg px-8 h-14 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                      )}
                    >
                      {t.hero.cta_primary}
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/tutorials"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "text-lg px-8 h-14"
                      )}
                    >
                      {t.hero.cta_secondary}
                    </Link>
                  </motion.div>
                </div>
              </AnimatedContainer>

              {/* Simple Stats with Stagger Animation */}
              <AnimatedContainer animation="slide-up" delay={0.4}>
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                  <StaggerContainer staggerDelay={0.15}>
                    <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                      <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        {stats.totalUsers || 0}+
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {t.hero.stat_learners}
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                      <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                        {stats.totalPrompts || 0}+
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {t.hero.stat_prompts}
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                        {t.hero.stat_free_value}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {t.hero.stat_free_label}
                      </div>
                    </motion.div>
                  </StaggerContainer>
                </div>
              </AnimatedContainer>
            </div>

            {/* Right: Illustration with Parallax and Float */}
            <div className="hidden lg:block relative">
              <ParallaxContainer speed={30}>
                <FloatingElement duration={4} intensity={15}>
                  <AnimatedContainer animation="zoom" delay={0.5}>
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

      {/* What You Can Do - 4 Features Grid */}
      <Section spacing="xl">
        <Container size="lg">
          <AnimatedContainer animation="slide-up">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                {t.features.section_title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.features.section_subtitle}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.title}
                  href={feature.link}
                  className="group block"
                >
                  <motion.div
                    className="h-full p-8 rounded-2xl border-2 border-border/50 bg-card relative overflow-hidden"
                    whileHover={{
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

                    <div className="relative">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* How It Works - 3 Steps */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <AnimatedContainer animation="slide-up">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                {t.steps.section_title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.steps.section_subtitle}
              </p>
            </div>
          </AnimatedContainer>

          <StaggerContainer className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto" staggerDelay={0.15}>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className="relative text-center"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Connecting line for desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-30"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                    />
                  )}

                  {/* Step Number Badge */}
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </motion.div>

                  <motion.div
                    className="pt-10 p-8 rounded-2xl bg-card border-2 border-border/50 h-full relative overflow-hidden"
                    whileHover={{
                      borderColor: 'hsl(var(--primary) / 0.5)',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950 flex items-center justify-center mx-auto mb-6"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Final CTA - Enhanced with Animations */}
      <Section spacing="xl">
        <Container size="md">
          <AnimatedContainer animation="zoom" delay={0.2}>
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-12 md:p-16 text-center text-white shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"
                animate={{
                  backgroundPosition: ['0px 0px', '20px 20px']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />

              <div className="relative z-10 space-y-8">
                <FloatingElement duration={3} intensity={8}>
                  <RocketIcon className="w-20 h-20 mx-auto opacity-90" />
                </FloatingElement>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold">
                    {t.cta.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                    {t.cta.subtitle}
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/tutorials/paths/beginner"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "bg-white text-indigo-600 hover:bg-white/90 text-lg px-10 h-14 shadow-xl"
                      )}
                    >
                      {t.cta.button_primary}
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/pricing"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "border-white text-white hover:bg-white/10 text-lg px-10 h-14"
                      )}
                    >
                      {t.cta.button_secondary}
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-sm text-white/70 pt-4"
                  initial={{ opacity: 0 }}
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
