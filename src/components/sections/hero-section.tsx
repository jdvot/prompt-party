'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  translations: {
    badge?: string
    title_line1: string
    title_gradient: string
    subtitle: string
    cta_primary: string
    cta_secondary: string
    scroll_indicator?: string
    stat_learners?: string
    stat_prompts?: string
    stat_free_value?: string
    stat_free_label?: string
  }
  stats?: {
    totalUsers: number
    totalPrompts: number
  }
  className?: string
}

/**
 * HeroSection - Immersive full-screen hero with animated gradient mesh background
 *
 * Features:
 * - Animated gradient orbs with pulse effect
 * - Parallax scroll effect
 * - Reduced motion support
 * - Responsive design
 * - Scroll indicator
 */
export function HeroSection({ translations: t, stats, className }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }

  const scrollIndicatorVariants = {
    animate: {
      y: [0, 12, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  }

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative min-h-screen w-full overflow-hidden flex items-center justify-center',
        className
      )}
      aria-label="Hero section"
    >
      {/* Background Layer - Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-background to-violet-50/30 dark:from-background dark:via-background dark:to-violet-950/20" />

      {/* Animated Gradient Orbs */}
      {!prefersReducedMotion && isMounted && (
        <>
          {/* Primary orb - top left */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-amber-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [-20, 20, -20],
              y: [-10, 10, -10]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Secondary orb - bottom right */}
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/20 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.6, 0.4],
              x: [20, -20, 20],
              y: [10, -10, 10]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />

          {/* Tertiary orb - center */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}
          />
        </>
      )}

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:60px_60px]"
        aria-hidden="true"
      />

      {/* Gradient Overlay for better text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/80"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full"
        style={!prefersReducedMotion && isMounted ? { y, opacity } : undefined}
      >
        <Container size="lg">
          <motion.div
            className="text-center max-w-4xl mx-auto px-4"
            variants={containerVariants}
            initial={isMounted ? 'hidden' : false}
            animate="visible"
          >
            {/* Badge */}
            {t.badge && (
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                  <Sparkles className="w-4 h-4" />
                  {t.badge}
                </span>
              </motion.div>
            )}

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
            >
              {t.title_line1}{' '}
              <span className="relative">
                <motion.span
                  className="bg-gradient-to-r from-orange-500 via-violet-600 to-indigo-600 bg-clip-text text-transparent bg-[size:200%_200%]"
                  animate={
                    !prefersReducedMotion
                      ? {
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }
                      : undefined
                  }
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  {t.title_gradient}
                </motion.span>
                {/* Underline accent */}
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-violet-600 to-indigo-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              {t.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={!prefersReducedMotion ? { scale: 1.05, y: -2 } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
              >
                <Button
                  size="lg"
                  className="px-8 h-14 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                  asChild
                >
                  <Link href="/tutorials/paths/beginner" className="inline-flex items-center">
                    {t.cta_primary}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 h-14 text-lg border-2"
                  asChild
                >
                  <Link href="/trending">{t.cta_secondary}</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats (optional) */}
            {stats && (
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50"
              >
                <div className="text-center">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent"
                    whileHover={!prefersReducedMotion ? { scale: 1.1 } : undefined}
                  >
                    {stats.totalUsers.toLocaleString()}+
                  </motion.div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t.stat_learners || 'Learners'}
                  </div>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent"
                    whileHover={!prefersReducedMotion ? { scale: 1.1 } : undefined}
                  >
                    {stats.totalPrompts.toLocaleString()}+
                  </motion.div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t.stat_prompts || 'Prompts'}
                  </div>
                </div>
                <div className="text-center hidden sm:block">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-600 bg-clip-text text-transparent"
                    whileHover={!prefersReducedMotion ? { scale: 1.1 } : undefined}
                  >
                    {t.stat_free_value || '100%'}
                  </motion.div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t.stat_free_label || 'Free'}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        variants={scrollIndicatorVariants}
        animate={!prefersReducedMotion && isMounted ? 'animate' : undefined}
      >
        <Link
          href="#features"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          aria-label="Scroll down to features"
        >
          <span className="text-xs uppercase tracking-widest group-hover:text-primary transition-colors">
            {t.scroll_indicator || 'Scroll'}
          </span>
          <ChevronDown className="w-6 h-6 group-hover:text-primary transition-colors" />
        </Link>
      </motion.div>
    </section>
  )
}

/**
 * HeroSectionSimple - Lightweight version without stats
 *
 * Use this for pages where you want the immersive hero without database stats
 */
export function HeroSectionSimple({
  title,
  titleGradient,
  subtitle,
  primaryCta,
  primaryCtaHref = '/tutorials/paths/beginner',
  secondaryCta,
  secondaryCtaHref = '/trending',
  badge,
  className
}: {
  title: string
  titleGradient: string
  subtitle: string
  primaryCta: string
  primaryCtaHref?: string
  secondaryCta: string
  secondaryCtaHref?: string
  badge?: string
  className?: string
}) {
  return (
    <HeroSection
      translations={{
        badge,
        title_line1: title,
        title_gradient: titleGradient,
        subtitle,
        cta_primary: primaryCta,
        cta_secondary: secondaryCta
      }}
      className={className}
    />
  )
}
