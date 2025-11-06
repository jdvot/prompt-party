'use client'

import { FeedContent } from '@/components/feed/feed-content'
import { useTranslations } from 'next-intl'
import { FlameIcon, TrendingUpIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import { AnimatedContainer } from '@/components/animations/animated-container'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { ParallaxContainer } from '@/components/animations/parallax-container'
import { FloatingElement } from '@/components/animations/floating-element'
import { motion } from 'framer-motion'

interface TrendingPageClientProps {
  initialPrompts: any[]
}

export function TrendingPageClient({ initialPrompts }: TrendingPageClientProps) {
  const t = useTranslations('home')

  return (
    <>
      {/* Hero Section - Enhanced with Fire Animation */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-16 items-center py-16">
            {/* Left: Content */}
            <div className="text-center lg:text-left space-y-8">
              <AnimatedContainer animation="slide-up" delay={0.1}>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Badge
                    variant="soft"
                    size="md"
                    startIcon={<FlameIcon className="w-3.5 h-3.5" />}
                  >
                    {t('trending_badge') || 'Trending This Week'}
                  </Badge>
                </motion.div>
              </AnimatedContainer>

              <AnimatedContainer animation="slide-up" delay={0.2}>
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                    {t('trending_title_line1') || 'Discover'}{' '}
                    <motion.span
                      className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent inline-block"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      style={{
                        backgroundSize: '200% 200%'
                      }}
                    >
                      {t('trending_title') || 'Trending Prompts'}
                    </motion.span>
                  </h1>

                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    {t('trending_subtitle') || 'Explore the most popular AI prompts from the community this week'}
                  </p>
                </div>
              </AnimatedContainer>

              {/* Animated Stats */}
              <AnimatedContainer animation="slide-up" delay={0.3}>
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                  <StaggerContainer staggerDelay={0.15}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                      >
                        {initialPrompts.length}+
                      </motion.div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {t('stat_hot_prompts') || 'Hot Prompts'}
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                      >
                        {initialPrompts[0]?.likes_count || '0'}+
                      </motion.div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {t('stat_top_likes') || 'Top Likes'}
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                      >
                        7d
                      </motion.div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {t('stat_time_period') || 'Time Period'}
                      </div>
                    </motion.div>
                  </StaggerContainer>
                </div>
              </AnimatedContainer>
            </div>

            {/* Right: Animated Illustration with Fire Glow Effect */}
            <div className="hidden lg:block relative">
              <ParallaxContainer speed={40}>
                <AnimatedContainer animation="zoom" delay={0.4}>
                  <FloatingElement duration={3.5} intensity={12}>
                    <motion.div
                      className="relative aspect-square"
                      animate={{
                        filter: [
                          'drop-shadow(0 0 20px rgba(249, 115, 22, 0.3))',
                          'drop-shadow(0 0 40px rgba(239, 68, 68, 0.4))',
                          'drop-shadow(0 0 20px rgba(249, 115, 22, 0.3))'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <Image
                        src="/branding/illustrations/trending-fire.svg"
                        alt={t('trending_image_alt') || 'Trending prompts visualization'}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </FloatingElement>
                </AnimatedContainer>
              </ParallaxContainer>
            </div>
          </div>
        </Container>
      </Section>

      {/* Prompts Feed Section - Enhanced */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section Header with Animation */}
            <AnimatedContainer animation="slide-up">
              <motion.div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <TrendingUpIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold">
                      {t('top_prompts') || 'Top Prompts'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('top_prompts_desc') || 'Most popular prompts this week'}
                    </p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge variant="soft" size="md">
                    {t('last_7_days') || 'Last 7 days'}
                  </Badge>
                </motion.div>
              </motion.div>
            </AnimatedContainer>

            {/* Feed Content with Fade In */}
            <AnimatedContainer animation="fade" delay={0.5}>
              <FeedContent initialPrompts={initialPrompts} />
            </AnimatedContainer>
          </div>
        </Container>
      </Section>
    </>
  )
}
