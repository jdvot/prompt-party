import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'
import { HeroSection } from '@/components/home/hero-section'
import { StatsSection } from '@/components/home/stats-section'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { FinalCTASection } from '@/components/home/final-cta-section'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Grid } from '@/components/layout/grid'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { SparklesIcon, TrendingUpIcon, UsersIcon, ZapIcon, RocketIcon, CodeIcon, BookOpenIcon, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

export default async function Home() {
  const t = await getTranslations('home')
  const supabase = await createClient()

  // Fetch initial prompts with comment counts
  const { data: prompts } = await supabase
    .from('prompts')
    .select(`
      *,
      comments:comments(count)
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(20)

  // Fetch profiles
  if (prompts && prompts.length > 0) {
    const authorIds = [...new Set(prompts.map(p => p.author))]
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, name, avatar_url')
      .in('user_id', authorIds)

    if (profiles) {
      const profileMap = new Map(profiles.map(p => [p.user_id, p]))
      prompts.forEach((p: any) => {
        p.profiles = profileMap.get(p.author)
        p.comments_count = p.comments?.[0]?.count || 0
      })
    }
  }

  // Get stats
  const { count: totalPrompts } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('is_public', true)

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  return (
    <>
      {/* Hero Section */}
      <Section variant="gradient" spacing="xl">
        <Container>
          <HeroSection />
        </Container>
      </Section>

      {/* Stats Section - UX: Animated counters show platform activity */}
      <Section spacing="lg">
        <Container size="lg">
          <StatsSection totalPrompts={totalPrompts || 0} totalUsers={totalUsers || 0} />
        </Container>
      </Section>

      {/* How It Works Section - UX: Educates users on the value proposition */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <HowItWorksSection />
        </Container>
      </Section>

      {/* Features Section - UX: Enhanced with better visual hierarchy and benefits */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge variant="soft" className="mb-4 text-sm font-semibold" startIcon={<RocketIcon className="w-3.5 h-3.5" />}>
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to master AI prompts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools designed for prompt engineers, content creators, and AI enthusiasts
            </p>
          </div>

          {/* Primary features - Larger cards for main value props */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Feature 1 - Prompt Wizard */}
            <Card variant="bento" className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-8 lg:p-10 relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary-dark group-hover:scale-110 transition-transform duration-300">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Prompt Wizard</h3>
                    <p className="text-muted-foreground">
                      AI-powered assistant that helps you craft perfect prompts step-by-step
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    </div>
                    <span>Smart suggestions based on your use case</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    </div>
                    <span>Template library with 1000+ examples</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    </div>
                    <span>Real-time preview and testing</span>
                  </li>
                </ul>

                <Link
                  href="/prompts/wizard"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "group/link hover:gap-2 transition-all"
                  )}
                >
                  Try Wizard
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>

            {/* Feature 2 - Community */}
            <Card variant="bento" className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-8 lg:p-10 relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-secondary-dark group-hover:scale-110 transition-transform duration-300">
                    <UsersIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Vibrant Community</h3>
                    <p className="text-muted-foreground">
                      Learn from 10,000+ prompt engineers and share your expertise
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand-secondary" />
                    </div>
                    <span>Vote and comment on prompts</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand-secondary" />
                    </div>
                    <span>Follow your favorite creators</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand-secondary" />
                    </div>
                    <span>Trending prompts and collections</span>
                  </li>
                </ul>

                <Link
                  href="/trending"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "group/link hover:gap-2 transition-all"
                  )}
                >
                  Explore Community
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          </div>

          {/* Secondary features - Smaller cards in 3-column grid */}
          <Grid cols={3} gap="lg" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card variant="feature" className="group">
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-accent/10 group-hover:bg-brand-accent/20 transition-colors mb-4">
                  <ZapIcon className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Remix</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fork any prompt and customize it for your needs. Track versions and improvements.
                </p>
                <Badge variant="soft" className="text-xs">Version control built-in</Badge>
              </div>
            </Card>

            <Card variant="feature" className="group">
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-500/10 group-hover:bg-green-500/20 transition-colors mb-4">
                  <CodeIcon className="w-6 h-6 text-green-600 dark:text-green-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Collections</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Organize prompts into collections. Public or private. Share with your team.
                </p>
                <Badge variant="soft" className="text-xs">Unlimited collections</Badge>
              </div>
            </Card>

            <Card variant="feature" className="group">
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors mb-4">
                  <BookOpenIcon className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn & Grow</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tutorials, guides, and best practices from prompt engineering experts.
                </p>
                <Badge variant="soft" className="text-xs">Free resources</Badge>
              </div>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Testimonials Section - UX: Social proof builds trust */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <TestimonialsSection />
        </Container>
      </Section>

      {/* Latest Prompts Section */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Latest Prompts</h2>
              <p className="text-muted-foreground">Discover the newest AI prompts from the community</p>
            </div>
            <Link href="/trending" className={cn(buttonVariants({ variant: "outline" }))}>
              View All
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <FeedContent initialPrompts={prompts || []} />
          </div>
        </Container>
      </Section>

      {/* Final CTA Section - UX: Compelling conversion-optimized call to action */}
      <Section spacing="xl" variant="gradient">
        <Container size="md">
          <FinalCTASection />
        </Container>
      </Section>
    </>
  )
}
