import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckIcon, SparklesIcon, ZapIcon, RocketIcon, BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Grid } from '@/components/layout/grid'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('pricing_title'),
    description: t('pricing_description'),
  }
}

export default async function PricingPage() {
  const t = await getTranslations('pricing_full')

  const plans = [
    {
      name: t('free_name'),
      price: t('free_price'),
      period: t('free_period'),
      description: t('free_desc'),
      icon: SparklesIcon,
      features: [
        t('free_f1'),
        t('free_f2'),
        t('free_f3'),
        t('free_f4'),
        t('free_f5'),
        t('free_f6'),
      ],
      cta: t('get_started'),
      href: '/auth/signup',
      popular: false,
    },
    {
      name: t('pro_name'),
      price: t('pro_price'),
      period: t('pro_period'),
      description: t('pro_desc'),
      icon: ZapIcon,
      features: [
        t('pro_f1'),
        t('pro_f2'),
        t('pro_f3'),
        t('pro_f4'),
        t('pro_f5'),
        t('pro_f6'),
        t('pro_f7'),
        t('pro_f8'),
        t('pro_f9'),
      ],
      cta: t('start_pro'),
      href: '/auth/signup?plan=pro',
      popular: true,
    },
    {
      name: t('team_name'),
      price: t('team_price'),
      period: t('team_period'),
      description: t('team_desc'),
      icon: RocketIcon,
      features: [
        t('team_f1'),
        t('team_f2'),
        t('team_f3'),
        t('team_f4'),
        t('team_f5'),
        t('team_f6'),
        t('team_f7'),
        t('team_f8'),
      ],
      cta: t('start_team'),
      href: '/auth/signup?plan=team',
      popular: false,
    },
    {
      name: t('business_name'),
      price: t('business_price'),
      period: t('business_period'),
      description: t('business_desc'),
      icon: BuildingIcon,
      features: [
        t('business_f1'),
        t('business_f2'),
        t('business_f3'),
        t('business_f4'),
        t('business_f5'),
        t('business_f6'),
        t('business_f7'),
        t('business_f8'),
      ],
      cta: t('contact_sales'),
      href: '/contact',
      popular: false,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center animate-fade-in-up">
            <Badge variant="soft" className="mb-4">
              <SparklesIcon className="w-3 h-3 mr-1" />
              Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Pricing Cards */}
      <Section spacing="xl">
        <Container size="xl">
          <Grid cols={4} gap="lg" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {plans.map((plan, index) => {
              const Icon = plan.icon
              return (
                <Card
                  key={plan.name}
                  variant={plan.popular ? 'interactive' : 'default'}
                  className={`relative h-full flex flex-col ${
                    plan.popular ? 'border-primary/50 shadow-lg scale-105' : ''
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-primary text-white px-4 py-1 shadow-md">
                        {t('most_popular')}
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-3">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== t('free_price') && (
                        <span className="text-muted-foreground ml-2">
                          / {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <Button
                      asChild
                      variant={plan.popular ? 'gradient' : 'outline'}
                      size="lg"
                      className="w-full mb-6"
                    >
                      <Link href={plan.href}>
                        {plan.cta}
                      </Link>
                    </Button>

                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature) => (
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
              )
            })}
          </Grid>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="md">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">
              {t('faq_title')}
            </h2>
          </div>

          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card variant="interactive">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq_1_q')}</h3>
                <p className="text-muted-foreground">
                  {t('faq_1_a')}
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq_2_q')}</h3>
                <p className="text-muted-foreground">
                  {t('faq_2_a')}
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq_3_q')}</h3>
                <p className="text-muted-foreground">
                  {t('faq_3_a')}
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq_4_q')}</h3>
                <p className="text-muted-foreground">
                  {t('faq_4_a')}
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{t('faq_5_q')}</h3>
                <p className="text-muted-foreground">
                  {t('faq_5_a')}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" variant="gradient">
        <Container size="md">
          <Card variant="glass" className="text-center">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-3">{t('cta_title')}</h3>
              <p className="text-lg text-muted-foreground mb-6">
                {t('cta_subtitle')}
              </p>
              <Button asChild size="lg" variant="gradient">
                <Link href="/auth/signup">
                  {t('start_free')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  )
}
