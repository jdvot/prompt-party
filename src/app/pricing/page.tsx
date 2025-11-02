import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { CheckIcon, HeartIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('pricing.metadata')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function PricingPage() {
  const t = await getTranslations('pricing')

  const freePlan = {
    name: t('free.name'),
    price: t('free.price'),
    period: t('free.period'),
    description: t('free.description'),
    cta: t('free.cta'),
    features: [
      t('free.feature_1'),
      t('free.feature_2'),
      t('free.feature_3'),
      t('free.feature_4'),
      t('free.feature_5'),
      t('free.feature_6'),
      t('free.feature_7'),
      t('free.feature_8')
    ]
  }

  const supportPlan = {
    name: t('support.name'),
    price: t('support.price'),
    period: t('support.period'),
    description: t('support.description'),
    badge: t('support.badge'),
    cta: t('support.cta'),
    features: [
      t('support.feature_1'),
      t('support.feature_2'),
      t('support.feature_3'),
      t('support.feature_4'),
      t('support.feature_5'),
      t('support.feature_6'),
      t('support.feature_7'),
      t('support.feature_8')
    ]
  }

  return (
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center animate-fade-in-up">
            <Badge variant="soft" className="mb-4">
              <HeartIcon className="w-3 h-3 mr-1" />
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('hero.title')} <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">{t('hero.title_highlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Pricing Cards */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-2">
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
                  {freePlan.features.map((feature) => (
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

            {/* Support Plan */}
            <Card className="relative border-2 border-primary shadow-xl scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1 shadow-md">
                  {supportPlan.badge}
                </Badge>
              </div>

              <CardHeader className="pt-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 mb-4">
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
                  {supportPlan.features.map((feature) => (
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
          </div>
        </Container>
      </Section>

      {/* Why Support Section */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('why_support.title')}
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('why_support.reason_1_title')}</h3>
                <p className="text-muted-foreground">
                  {t('why_support.reason_1_description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('why_support.reason_2_title')}</h3>
                <p className="text-muted-foreground">
                  {t('why_support.reason_2_description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('why_support.reason_3_title')}</h3>
                <p className="text-muted-foreground">
                  {t('why_support.reason_3_description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('why_support.reason_4_title')}</h3>
                <p className="text-muted-foreground">
                  {t('why_support.reason_4_description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="xl">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq.question_1')}</h3>
                <p className="text-muted-foreground">
                  {t('faq.answer_1')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq.question_2')}</h3>
                <p className="text-muted-foreground">
                  {t('faq.answer_2')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq.question_3')}</h3>
                <p className="text-muted-foreground">
                  {t('faq.answer_3')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq.question_4')}</h3>
                <p className="text-muted-foreground">
                  {t('faq.answer_4')}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" variant="gradient">
        <Container size="md">
          <Card className="border-2 border-primary/20 bg-background/95 backdrop-blur">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-3">{t('cta.title')}</h3>
              <p className="text-lg text-muted-foreground mb-6">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup" className={cn(buttonVariants({ size: "lg" }))}>
                  {t('cta.button_start')}
                </Link>
                <Link href="/tutorials" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  {t('cta.button_explore')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  )
}
