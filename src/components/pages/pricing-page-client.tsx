'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CheckIcon, HeartIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, FloatingElement, ScaleOnHover } from '@/components/animations'

interface PricingPageClientProps {
  freePlan: any
  supportPlan: any
  t: any
}

export function PricingPageClient({ freePlan, supportPlan, t }: PricingPageClientProps) {
  return (
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="md">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <AnimatedContainer animation="slide-up">
              <div className="text-center lg:text-left">
                <Badge variant="soft" className="mb-4">
                  <HeartIcon className="w-3 h-3 mr-1" />
                  {t.hero_badge}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {t.hero_title} <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{t.hero_title_highlight}</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                  {t.hero_subtitle}
                </p>
              </div>
            </AnimatedContainer>

            {/* Right: Heart Illustration */}
            <AnimatedContainer animation="slide-left" delay={0.2}>
              <div className="hidden lg:block relative">
                <FloatingElement duration={4} intensity={15}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                    <Image
                      src="/branding/illustrations/features/pricing-support.svg"
                      alt="Support the Community"
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

      {/* Pricing Cards */}
      <Section spacing="md">
        <Container size="lg">
          <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto" staggerDelay={0.15}>
            {/* Free Plan */}
            <ScaleOnHover scale={1.02}>
              <Card className="relative border-2 h-full">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 mb-4">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{freePlan.name}</CardTitle>
                  <div className="mb-3">
                    <span className="text-5xl font-bold">{freePlan.price}</span>
                    <span className="text-muted-foreground ml-2">
                      / {freePlan.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {freePlan.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <Link
                    href="/auth/signup"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full mb-6")}
                  >
                    {freePlan.cta}
                  </Link>

                  <ul className="space-y-3">
                    {freePlan.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                          <CheckIcon className="w-3 h-3 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScaleOnHover>

            {/* Support Plan */}
            <ScaleOnHover scale={1.03}>
              <Card className="relative border-2 border-primary shadow-xl h-full md:scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-1 shadow-md">
                    {supportPlan.badge}
                  </Badge>
                </div>

                <CardHeader className="pt-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 mb-4">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{supportPlan.name}</CardTitle>
                  <div className="mb-3">
                    <span className="text-5xl font-bold">{supportPlan.price}</span>
                    <span className="text-muted-foreground ml-2">
                      / {supportPlan.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {supportPlan.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <Link
                    href="/auth/signup?plan=support"
                    className={cn(buttonVariants({ size: "lg" }), "w-full mb-6")}
                  >
                    {supportPlan.cta}
                  </Link>

                  <ul className="space-y-3">
                    {supportPlan.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                          <CheckIcon className="w-3 h-3 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Why Support Section */}
      <Section spacing="md" className="bg-muted/30">
        <Container size="md">
          <AnimatedContainer animation="fade" delay={0.2} className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4">
              {t.why_support_title}
            </h2>
          </AnimatedContainer>

          <StaggerContainer className="space-y-6" staggerDelay={0.1}>
            <ScaleOnHover scale={1.01}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{t.why_support_reason_1_title}</h3>
                  <p className="text-muted-foreground">
                    {t.why_support_reason_1_description}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover scale={1.01}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{t.why_support_reason_2_title}</h3>
                  <p className="text-muted-foreground">
                    {t.why_support_reason_2_description}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover scale={1.01}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{t.why_support_reason_3_title}</h3>
                  <p className="text-muted-foreground">
                    {t.why_support_reason_3_description}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover scale={1.01}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{t.why_support_reason_4_title}</h3>
                  <p className="text-muted-foreground">
                    {t.why_support_reason_4_description}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </StaggerContainer>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="md">
        <Container size="md">
          <AnimatedContainer animation="fade" delay={0.3} className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4">
              {t.faq_title}
            </h2>
          </AnimatedContainer>

          <StaggerContainer className="space-y-4" staggerDelay={0.08}>
            <ScaleOnHover scale={1.01}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{t.faq_question_1}</h3>
                  <p className="text-muted-foreground">
                    {t.faq_answer_1}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover scale={1.01}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{t.faq_question_2}</h3>
                  <p className="text-muted-foreground">
                    {t.faq_answer_2}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover scale={1.01}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{t.faq_question_3}</h3>
                  <p className="text-muted-foreground">
                    {t.faq_answer_3}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover scale={1.01}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{t.faq_question_4}</h3>
                  <p className="text-muted-foreground">
                    {t.faq_answer_4}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </StaggerContainer>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="md" variant="gradient">
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
                      {t.cta_button_start}
                    </Link>
                    <Link href="/tutorials" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                      {t.cta_button_explore}
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
