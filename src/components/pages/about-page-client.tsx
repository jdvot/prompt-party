'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, FloatingElement, ScaleOnHover } from '@/components/animations'

interface ValueCard {
  key: string
  title: string
  description: string
  iconName: string
  color: string
}

interface AboutPageClientProps {
  values: ValueCard[]
  t: {
    hero_badge: string
    hero_title: string
    hero_subtitle: string
    mission_title: string
    mission_text: string
    values_title: string
    values_subtitle: string
    cta_title: string
    cta_subtitle: string
    cta_button_primary: string
    cta_button_secondary: string
  }
}

export function AboutPageClient({ values, t }: AboutPageClientProps) {
  return (
    <>
      {/* Hero Section */}
      <Section background="accent" spacing="md">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <AnimatedContainer animation="slide-up">
              <div className="text-center lg:text-left">
                <Badge variant="soft" className="mb-4 inline-flex items-center">
                  <Icons.Info className="w-3 h-3 mr-1" />
                  {t.hero_badge}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {t.hero_title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                  {t.hero_subtitle}
                </p>
              </div>
            </AnimatedContainer>

            {/* Right: Illustration */}
            <AnimatedContainer animation="slide-left" delay={0.2}>
              <div className="hidden lg:block relative">
                <FloatingElement duration={4} intensity={15}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-indigo-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                    <Image
                      src="/branding/illustrations/features/success-celebration.svg"
                      alt="About Prompt Party"
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

      {/* Mission Section */}
      <Section spacing="md">
        <Container size="md">
          <AnimatedContainer animation="fade" delay={0.2}>
            <Card className="border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto mb-4">
                  <Icons.Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl">{t.mission_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
                  {t.mission_text}
                </p>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* Values Section */}
      <Section spacing="md" background="muted">
        <Container size="lg">
          <AnimatedContainer animation="fade" delay={0.1} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.values_title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.values_subtitle}
            </p>
          </AnimatedContainer>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {values.map((value) => {
              const Icon = Icons[value.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
              return (
                <ScaleOnHover key={value.key} scale={1.03}>
                  <Card className="group relative overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

                    <CardHeader className="relative text-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <CardDescription className="text-base text-center">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              )
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="md" background="accent">
        <Container size="md">
          <AnimatedContainer animation="zoom" delay={0.4}>
            <ScaleOnHover scale={1.01}>
              <Card className="border-2 border-primary/20 bg-background/95 backdrop-blur">
                <CardContent className="p-12 text-center">
                  <h3 className="text-3xl font-bold mb-3">{t.cta_title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t.cta_subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/auth/signup" className={cn(buttonVariants({ size: "lg" }))}>
                      {t.cta_button_primary}
                    </Link>
                    <Link href="/tutorials" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                      {t.cta_button_secondary}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  )
}
