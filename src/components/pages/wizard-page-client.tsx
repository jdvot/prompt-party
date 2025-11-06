'use client'

import { PromptWizard } from '@/components/prompts/prompt-wizard'
import { SparklesIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { AnimatedContainer } from '@/components/animations/animated-container'
import { ParallaxContainer } from '@/components/animations/parallax-container'
import { FloatingElement } from '@/components/animations/floating-element'
import { motion } from 'framer-motion'

interface WizardPageClientProps {
  translations: {
    ai_assistant: string
    title: string
    description: string
  }
}

export function WizardPageClient({ translations: t }: WizardPageClientProps) {
  return (
    <>
      {/* Hero Section - Enhanced with Smooth Animations */}
      <Section variant="gradient" spacing="md">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <AnimatedContainer animation="slide-up" delay={0.1}>
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Badge
                    variant="soft"
                    size="md"
                    className="mb-4"
                    startIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                  >
                    {t.ai_assistant}
                  </Badge>
                </motion.div>
              </AnimatedContainer>

              <AnimatedContainer animation="slide-up" delay={0.2}>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <motion.span
                    className="inline-block"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    style={{
                      background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)), hsl(var(--primary)))',
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {t.title}
                  </motion.span>
                </h1>
              </AnimatedContainer>

              <AnimatedContainer animation="slide-up" delay={0.3}>
                <p className="text-xl text-muted-foreground max-w-2xl lg:mx-0 mx-auto">
                  {t.description}
                </p>
              </AnimatedContainer>
            </div>

            {/* Illustration - Enhanced with Float */}
            <AnimatedContainer animation="slide-left" delay={0.2}>
              <div className="hidden lg:block relative">
                <FloatingElement duration={4} intensity={15}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <Image
                      src="/branding/illustrations/hero-student-learning.svg"
                      alt="AI Prompt Wizard"
                      width={400}
                      height={400}
                      className="relative z-10 drop-shadow-2xl"
                      priority
                    />
                  </div>
                </FloatingElement>
              </div>
            </AnimatedContainer>
          </div>
        </Container>
      </Section>

      {/* Wizard Section - Enhanced Entry Animation */}
      <Section spacing="md">
        <Container size="lg">
          <AnimatedContainer animation="slide-up" delay={0.5}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <PromptWizard />
            </motion.div>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  )
}
