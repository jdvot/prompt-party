import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  CheckIcon,
  SparklesIcon,
  ZapIcon,
  TrendingUpIcon,
  BarChart3Icon,
  UsersIcon,
  BrainIcon,
  RocketIcon,
  ClockIcon,
  DollarSignIcon,
  StarIcon,
  ArrowRightIcon
} from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Grid } from '@/components/layout/grid'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Marketing Suite - AI-Powered Marketing Prompts | Prompt Party',
  description: 'Save 10+ hours per week with 500+ proven marketing prompts. Multi-LLM testing, brand voice training, and analytics dashboard for content creators.',
}

export default function MarketingSuitePage() {
  const features = [
    {
      icon: SparklesIcon,
      title: '500+ Marketing Prompts',
      description: 'Pre-tested prompts for copywriting, SEO, social media, ads, and email marketing',
      color: 'from-brand-primary to-brand-primary-dark',
    },
    {
      icon: ZapIcon,
      title: 'Unlimited AI Testing',
      description: 'Test prompts on GPT-4, Claude 3.5, and Gemini simultaneously. Compare results instantly.',
      color: 'from-brand-secondary to-brand-secondary-dark',
    },
    {
      icon: BrainIcon,
      title: 'Brand Voice Training',
      description: 'Train AI on your brand style. Get consistent, on-brand content every time.',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: BarChart3Icon,
      title: 'Marketing Analytics',
      description: 'Track prompt performance, A/B test results, and ROI. Export PDF reports for clients.',
      color: 'from-orange-500 to-orange-700',
    },
    {
      icon: UsersIcon,
      title: 'Mini-Team (3 Seats)',
      description: 'Collaborate with clients or colleagues. Share collections and prompts seamlessly.',
      color: 'from-green-500 to-green-700',
    },
    {
      icon: RocketIcon,
      title: 'Priority Support',
      description: '<2h response time + 12 masterclasses/year on advanced AI marketing strategies.',
      color: 'from-blue-500 to-blue-700',
    },
  ]

  const useCases = [
    {
      category: 'Copywriting',
      examples: ['Landing pages', 'Email sequences', 'Sales pages', 'Product descriptions'],
    },
    {
      category: 'SEO',
      examples: ['Meta descriptions', 'Blog articles', 'Keyword research', 'Content briefs'],
    },
    {
      category: 'Social Media',
      examples: ['LinkedIn posts', 'Twitter threads', 'Instagram captions', 'TikTok scripts'],
    },
    {
      category: 'Advertising',
      examples: ['Facebook ads', 'Google ads', 'LinkedIn ads', 'Cold emails'],
    },
    {
      category: 'Video Content',
      examples: ['YouTube scripts', 'Reels scripts', 'Webinar outlines', 'Podcast intros'],
    },
    {
      category: 'Email Marketing',
      examples: ['Welcome emails', 'Newsletter content', 'Promo campaigns', 'Re-engagement'],
    },
  ]

  const comparisonRows = [
    { feature: 'Marketing Prompt Library', free: '10 prompts', pro: '100 prompts', suite: '500+ prompts', team: '500+ prompts' },
    { feature: 'AI Testing', free: '10/month', pro: 'Unlimited', suite: 'Unlimited Multi-LLM', team: 'Unlimited Multi-LLM' },
    { feature: 'Brand Voice Training', free: false, pro: false, suite: true, team: true },
    { feature: 'Marketing Analytics', free: false, pro: 'Basic', suite: 'Advanced + Export', team: 'Advanced + Export' },
    { feature: 'Team Collaboration', free: false, pro: false, suite: '3 seats', team: '10 seats' },
    { feature: 'Priority Support', free: false, pro: false, suite: true, team: true },
    { feature: 'Masterclasses', free: false, pro: false, suite: '12/year', team: '12/year' },
    { feature: 'Price', free: '€0', pro: '€9.99/mo', suite: '€49/mo', team: '€99/mo' },
  ]

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Content Marketing Manager',
      company: 'TechFlow SaaS',
      avatar: '👩‍💼',
      quote: 'Marketing Suite saved me 12 hours per week. The ROI paid for itself in the first week. The brand voice feature is a game-changer.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Freelance Copywriter',
      company: 'Self-employed',
      avatar: '👨‍💻',
      quote: 'I can now serve 3x more clients without hiring. The prompt library covers every use case I need. Worth every penny.',
      rating: 5,
    },
    {
      name: 'Elena Rodriguez',
      role: 'Social Media Strategist',
      company: 'GrowthLab Agency',
      avatar: '👩‍🎨',
      quote: 'Our team productivity doubled. We use the mini-team feature to collaborate with clients in real-time. Absolutely brilliant.',
      rating: 5,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="xl" className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute h-full w-full bg-gradient-to-t from-background via-transparent to-transparent" />

        <Container size="lg" className="relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <Badge variant="soft" className="mb-6 text-sm font-semibold">
              <TrendingUpIcon className="w-3.5 h-3.5 mr-1.5" />
              Designed for Marketing Professionals
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
              Save 10+ Hours Per Week on Content Creation
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The complete AI marketing suite with <strong>500+ proven prompts</strong>, multi-LLM testing,
              brand voice training, and advanced analytics. Purpose-built for marketers and content creators.
            </p>

            {/* ROI Calculator */}
            <div className="inline-flex flex-col gap-3 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 mb-8">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-brand-primary" />
                  <span><strong>10h</strong> saved/week</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4 text-green-600" />
                  <span><strong>€500+</strong> value/month</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                  <RocketIcon className="w-4 h-4 text-orange-600" />
                  <span><strong>3x</strong> productivity</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Based on average €50/hour freelance rate</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/auth/signup?plan=marketing_suite"
                className={cn(buttonVariants({ size: "xl", variant: "gradient" }), "text-lg shadow-lg hover:shadow-xl transition-shadow")}
              >
                Start 14-Day Free Trial
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="#comparison"
                className={cn(buttonVariants({ size: "xl", variant: "outline" }), "text-lg")}
              >
                Compare Plans
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              No credit card required • Cancel anytime • 14-day money-back guarantee
            </p>
          </div>
        </Container>
      </Section>

      {/* Social Proof Stats */}
      <Section spacing="md" className="bg-muted/30">
        <Container>
          <Grid cols={4} gap="lg" className="text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold text-brand-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Marketing Prompts</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-brand-secondary mb-2">10h</div>
              <div className="text-sm text-muted-foreground">Saved Per Week</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-green-600 mb-2">3x</div>
              <div className="text-sm text-muted-foreground">Faster Creation</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-orange-600 mb-2">1,000+</div>
              <div className="text-sm text-muted-foreground">Happy Marketers</div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Features Section */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge variant="soft" className="mb-4 text-sm font-semibold">
              <SparklesIcon className="w-3.5 h-3.5 mr-1.5" />
              Everything You Need
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Marketing Tools in One Suite
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop juggling multiple tools. Get everything you need to create world-class marketing content.
            </p>
          </div>

          <Grid cols={3} gap="lg">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  variant="interactive"
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className={cn(
                      "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br mb-4",
                      "group-hover:scale-110 transition-transform duration-300",
                      feature.color
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: feature.description }} />
                  </CardContent>
                </Card>
              )
            })}
          </Grid>
        </Container>
      </Section>

      {/* Use Cases Section */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prompts for Every Marketing Use Case
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From copywriting to video scripts, we've got you covered with battle-tested prompts.
            </p>
          </div>

          <Grid cols={3} gap="md">
            {useCases.map((useCase, index) => (
              <Card
                key={useCase.category}
                variant="bento"
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-brand-primary">
                    {useCase.category}
                  </h3>
                  <ul className="space-y-2">
                    {useCase.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2 text-sm">
                        <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              + Dozens more categories and 500+ ready-to-use prompts
            </p>
            <Link
              href="/auth/signup?plan=marketing_suite"
              className={cn(buttonVariants({ variant: "gradient" }))}
            >
              Browse Full Library
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by 1,000+ Marketing Professionals
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <p className="text-muted-foreground">4.9/5 from 500+ reviews</p>
          </div>

          <Grid cols={3} gap="lg">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                variant="interactive"
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Comparison Table */}
      <Section spacing="xl" id="comparison" className="bg-muted/30">
        <Container size="lg">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Compare Plans
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4">
                    <div className="font-semibold">Free</div>
                  </th>
                  <th className="text-center p-4">
                    <div className="font-semibold">Pro</div>
                  </th>
                  <th className="text-center p-4 bg-brand-primary/5 rounded-t-lg">
                    <Badge variant="soft" className="mb-2">Recommended</Badge>
                    <div className="font-semibold">Marketing Suite</div>
                  </th>
                  <th className="text-center p-4">
                    <div className="font-semibold">Team</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.feature} className={cn(
                    "border-b",
                    index === comparisonRows.length - 1 && "border-b-2 border-primary/20"
                  )}>
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="text-center p-4">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <CheckIcon className="w-5 h-5 text-green-600 mx-auto" /> : '—'
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="text-center p-4">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <CheckIcon className="w-5 h-5 text-green-600 mx-auto" /> : '—'
                      ) : (
                        row.pro
                      )}
                    </td>
                    <td className="text-center p-4 bg-brand-primary/5">
                      <strong>
                        {typeof row.suite === 'boolean' ? (
                          row.suite ? <CheckIcon className="w-5 h-5 text-green-600 mx-auto" /> : '—'
                        ) : (
                          row.suite
                        )}
                      </strong>
                    </td>
                    <td className="text-center p-4">
                      {typeof row.team === 'boolean' ? (
                        row.team ? <CheckIcon className="w-5 h-5 text-green-600 mx-auto" /> : '—'
                      ) : (
                        row.team
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/auth/signup?plan=marketing_suite"
              className={cn(buttonVariants({ size: "lg", variant: "gradient" }))}
            >
              Start Free Trial
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="xl">
        <Container size="md">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does the 14-day free trial work?',
                a: 'Start using Marketing Suite immediately with full access to all features. No credit card required. If you love it (you will), upgrade after 14 days. Otherwise, downgrade to Free with no questions asked.',
              },
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Yes! Upgrade to unlock more features or downgrade if your needs change. Changes take effect immediately, and billing is prorated.',
              },
              {
                q: 'What AI models are included?',
                a: 'Marketing Suite includes unlimited testing on GPT-4, GPT-3.5, Claude 3.5 Sonnet, Claude 3.5 Haiku, Gemini 1.5 Pro, and Gemini 1.5 Flash. Compare results side-by-side.',
              },
              {
                q: 'How does the Mini-Team feature work?',
                a: 'Invite up to 2 additional team members or clients. Share collections, collaborate on prompts, and manage permissions. Perfect for agencies working with clients.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes! 14-day money-back guarantee, no questions asked. If Marketing Suite doesn\'t save you 10+ hours in the first 2 weeks, we\'ll refund 100%.',
              },
              {
                q: 'Can I use this commercially?',
                a: 'Absolutely! All prompts and AI outputs can be used for commercial purposes. Create content for your business or clients without restrictions.',
              },
            ].map((faq, index) => (
              <Card
                key={faq.q}
                variant="interactive"
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="xl" variant="gradient">
        <Container size="md">
          <Card variant="glass" className="text-center">
            <CardContent className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to 3x Your Marketing Productivity?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 1,000+ marketers who save 10+ hours per week with Marketing Suite.
                Start your 14-day free trial today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/auth/signup?plan=marketing_suite"
                  className={cn(buttonVariants({ size: "xl", variant: "gradient" }), "text-lg")}
                >
                  Start Free Trial
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(buttonVariants({ size: "xl", variant: "outline" }), "text-lg")}
                >
                  View All Plans
                </Link>
              </div>

              <p className="text-sm text-muted-foreground">
                ✓ No credit card required  •  ✓ 14-day free trial  •  ✓ Cancel anytime
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  )
}
