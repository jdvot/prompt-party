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

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: SparklesIcon,
      features: [
        '20 prompts',
        '10 AI tests per month',
        'Public collections',
        'Community features',
        'Like & comment',
        'Basic analytics',
      ],
      cta: 'Get Started',
      href: '/auth/signup',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For serious prompt engineers',
      icon: ZapIcon,
      features: [
        'Unlimited prompts',
        'Unlimited AI tests',
        'Advanced analytics',
        'Priority support',
        'No ads',
        'AI Prompt Generator',
        'Export data (CSV)',
        'Private collections',
        'Custom branding',
      ],
      cta: 'Start Pro Trial',
      href: '/auth/signup?plan=pro',
      popular: true,
    },
    {
      name: 'Team',
      price: '$29',
      period: 'per month',
      description: 'Collaborate with your team',
      icon: RocketIcon,
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Team workspaces',
        'Shared collections',
        '500 AI tests/month shared',
        'Team analytics',
        'Role management',
        'Activity feed',
      ],
      cta: 'Start Team Trial',
      href: '/auth/signup?plan=team',
      popular: false,
    },
    {
      name: 'Business',
      price: '$99',
      period: 'per month',
      description: 'For organizations at scale',
      icon: BuildingIcon,
      features: [
        'Everything in Team',
        'API access (10k requests)',
        'White label options',
        'Custom integrations',
        'SSO/SAML',
        'Dedicated support',
        'SLA 99.9%',
        'Custom contracts',
      ],
      cta: 'Contact Sales',
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
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready. All plans include access to our community.
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
                      Most Popular
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
                    {plan.price !== '$0' && (
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
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What are AI tests?</h3>
              <p className="text-muted-foreground">
                AI tests let you run your prompts against GPT-4, Claude, or Gemini to see results before sharing. Free users get 10 per month, Pro users get unlimited.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-muted-foreground">
                Yes! Upgrade instantly, downgrade at the end of your billing cycle. No long-term commitments.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee on all paid plans. No questions asked.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How does team billing work?</h3>
              <p className="text-muted-foreground">
                Team plans are billed monthly at $29 for up to 10 members. Need more seats? Contact us for custom pricing.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Is there an annual discount?</h3>
              <p className="text-muted-foreground">
                Yes! Pay annually and get 2 months free (16% discount). Switch to annual billing in your account settings.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
              <p className="text-muted-foreground mb-4">
                Join thousands of prompt engineers building the future of AI
              </p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Start Free Today
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
