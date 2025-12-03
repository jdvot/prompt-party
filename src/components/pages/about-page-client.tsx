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

interface FeatureCard {
  key: string
  title: string
  description: string
  iconName: string
  color: string
}

interface StatItem {
  value: string
  label: string
}

interface AboutPageClientProps {
  values: ValueCard[]
  features: FeatureCard[]
  stats: StatItem[]
  t: {
    hero_badge: string
    hero_title: string
    hero_subtitle: string
    mission_title: string
    mission_text: string
    values_title: string
    values_subtitle: string
    features_title: string
    features_subtitle: string
    cta_title: string
    cta_subtitle: string
    cta_button_primary: string
    cta_button_secondary: string
  }
}

export function AboutPageClient({ values, features, stats, t }: AboutPageClientProps) {
  return (
    <>
      {/* Hero Section */}
      <Section background="accent" spacing="md">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedContainer animation="slide-up">
              <div className="text-center lg:text-left">
                <Badge
                  variant="soft"
                  size="md"
                  startIcon={<Icons.Sparkles className="w-3.5 h-3.5" />}
                  className="mb-4"
                >
                  {t.hero_badge}
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-violet-600 bg-clip-text text-transparent">
                  {t.hero_title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl lg:max-w-none mb-8">
                  {t.hero_subtitle}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
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
            <Card className="border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="text-center relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/25">
                  <Icons.Target className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl md:text-4xl">{t.mission_title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
                  {t.mission_text}
                </p>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* Features Section */}
      <Section spacing="md" background="muted">
        <Container size="lg">
          <AnimatedContainer animation="fade" delay={0.1} className="text-center mb-12">
            <Badge variant="soft" size="md" className="mb-4">
              <Icons.Zap className="w-3.5 h-3.5 mr-1" />
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.features_title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.features_subtitle}
            </p>
          </AnimatedContainer>

          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {features.map((feature) => {
              const Icon = Icons[feature.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>
              return (
                <ScaleOnHover key={feature.key} scale={1.02}>
                  <Card className="group relative overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

                    <CardContent className="relative p-6">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              )
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Values Section */}
      <Section spacing="md">
        <Container size="lg">
          <AnimatedContainer animation="fade" delay={0.1} className="text-center mb-12">
            <Badge variant="soft" size="md" className="mb-4">
              <Icons.Heart className="w-3.5 h-3.5 mr-1" />
              Our Values
            </Badge>
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

                    <CardHeader className="relative text-center pb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative pt-0">
                      <CardDescription className="text-base text-center leading-relaxed">
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
      <Section spacing="md" background="gradient">
        <Container size="md">
          <AnimatedContainer animation="zoom" delay={0.4}>
            <ScaleOnHover scale={1.01}>
              <Card className="border-2 border-primary/20 bg-background/95 backdrop-blur overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-violet-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

                <CardContent className="relative p-8 md:p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25">
                    <Icons.Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{t.cta_title}</h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                    {t.cta_subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/auth/signup"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "min-w-[180px] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                      )}
                    >
                      <Icons.ArrowRight className="w-4 h-4 mr-2" />
                      {t.cta_button_primary}
                    </Link>
                    <Link
                      href="/tutorials"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "min-w-[180px]"
                      )}
                    >
                      <Icons.BookOpen className="w-4 h-4 mr-2" />
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
