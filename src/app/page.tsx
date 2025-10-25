import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'
import { HeroSection } from '@/components/home/hero-section'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Grid } from '@/components/layout/grid'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { SparklesIcon, TrendingUpIcon, UsersIcon, ZapIcon } from 'lucide-react'
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

      {/* Stats Section */}
      <Section spacing="lg">
        <Container size="lg">
          <Grid cols={3} gap="md" className="animate-fade-in-up">
            <Card variant="bento" className="text-center">
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary mb-4">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{totalPrompts || 0}</div>
                <div className="text-sm text-muted-foreground">AI Prompts</div>
              </div>
            </Card>

            <Card variant="bento" className="text-center">
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-secondary mb-4">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{totalUsers || 0}</div>
                <div className="text-sm text-muted-foreground">Creators</div>
              </div>
            </Card>

            <Card variant="bento" className="text-center">
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-vibrant mb-4">
                  <TrendingUpIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Active Community</div>
              </div>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Features Section */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge variant="soft" className="mb-4">
              <SparklesIcon className="w-3 h-3 mr-1" />
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to master AI prompts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create, share, and discover the best AI prompts. Built for prompt engineers, by prompt engineers.
            </p>
          </div>

          <Grid cols={3} gap="lg" className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card variant="feature" className="group">
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-6">
                  <SparklesIcon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Prompt Wizard</h3>
                <p className="text-muted-foreground mb-6">
                  Step-by-step guide to create optimized prompts for any AI model. Perfect for beginners.
                </p>
                <Link href="/prompts/wizard" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "group-hover:translate-x-1 transition-transform")}>
                  Try Wizard →
                </Link>
              </div>
            </Card>

            <Card variant="feature" className="group">
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue/10 group-hover:bg-blue/20 transition-colors mb-6">
                  <UsersIcon className="w-7 h-7 text-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of prompt engineers. Share, remix, and learn from the best prompts.
                </p>
                <Link href="/trending" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "group-hover:translate-x-1 transition-transform")}>
                  Explore →
                </Link>
              </div>
            </Card>

            <Card variant="feature" className="group">
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-magenta/10 group-hover:bg-magenta/20 transition-colors mb-6">
                  <ZapIcon className="w-7 h-7 text-magenta" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Templates</h3>
                <p className="text-muted-foreground mb-6">
                  Ready-to-use prompt templates for common tasks. Save time and get better results.
                </p>
                <Link href="/templates" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "group-hover:translate-x-1 transition-transform")}>
                  Browse →
                </Link>
              </div>
            </Card>
          </Grid>
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

      {/* CTA Section */}
      <Section spacing="xl" variant="gradient">
        <Container size="md">
          <Card variant="glass" className="text-center">
            <div className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to create amazing prompts?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community of prompt engineers and start creating, sharing, and discovering the best AI prompts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup" className={cn(buttonVariants({ size: "lg", variant: "gradient" }))}>
                  Get Started Free
                </Link>
                <Link href="/tutorials" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                  Learn More
                </Link>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  )
}
