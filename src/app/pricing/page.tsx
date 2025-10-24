import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckIcon, SparklesIcon, ZapIcon, RocketIcon, BuildingIcon } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      {t('most_popular')}
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  <div className="mb-2">
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

                <CardContent>
                  <Link
                    href={plan.href}
                    className={`block w-full text-center px-4 py-2 rounded-md font-medium transition-colors mb-6 ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('faq_title')}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">{t('faq_1_q')}</h3>
              <p className="text-muted-foreground">
                {t('faq_1_a')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t('faq_2_q')}</h3>
              <p className="text-muted-foreground">
                {t('faq_2_a')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t('faq_3_q')}</h3>
              <p className="text-muted-foreground">
                {t('faq_3_a')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t('faq_4_q')}</h3>
              <p className="text-muted-foreground">
                {t('faq_4_a')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t('faq_5_q')}</h3>
              <p className="text-muted-foreground">
                {t('faq_5_a')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-2">{t('cta_title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('cta_subtitle')}
              </p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                {t('start_free')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
