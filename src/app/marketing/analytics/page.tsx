import { createClient } from '@/lib/supabase/server'
import { MarketingAnalyticsDashboard } from '@/components/marketing/marketing-analytics-dashboard'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'
import { BarChart3Icon } from 'lucide-react'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Marketing Analytics | Prompt Party',
  description: 'Track your marketing productivity, ROI, and time saved with AI-powered analytics',
}

export default async function MarketingAnalyticsPage() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirect=/marketing/analytics')
  }

  // Check if user has access to Marketing Suite
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, name')
    .eq('user_id', user.id)
    .single()

  const hasAccess = ['marketing_suite', 'team', 'business'].includes(profile?.plan || '')

  if (!hasAccess) {
    redirect('/marketing-suite?upgrade=true')
  }

  // Fetch analytics dashboard data
  const { data: dashboardData } = await supabase
    .from('marketing_suite_dashboard')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Fetch daily analytics for charts (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: dailyAnalytics } = await supabase
    .from('marketing_suite_analytics')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
    .order('date', { ascending: true })

  // Fetch top used prompts
  const { data: topPrompts } = await supabase
    .from('marketing_prompt_usage')
    .select(
      `
      prompt_id,
      marketing_prompts (
        id,
        title,
        category,
        estimated_time_saved
      )
    `
    )
    .eq('user_id', user.id)
    .order('used_at', { ascending: false })
    .limit(100) // Get last 100 to analyze

  // Process top prompts (group by prompt_id and count)
  const promptUsageCounts: Record<string, any> = {}
  topPrompts?.forEach((usage: any) => {
    const promptId = usage.prompt_id
    if (!promptUsageCounts[promptId]) {
      promptUsageCounts[promptId] = {
        prompt: usage.marketing_prompts,
        count: 0,
      }
    }
    promptUsageCounts[promptId].count++
  })

  const topPromptsProcessed = Object.values(promptUsageCounts)
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 10)
    .map((item: any) => ({
      ...item.prompt,
      usage_count: item.count,
    }))

  return (
    <>
      <Section spacing="lg" className="bg-gradient-to-br from-brand-primary/5 via-background to-brand-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="soft" className="mb-4">
              <BarChart3Icon className="w-3.5 h-3.5 mr-1.5" />
              Marketing Suite Analytics
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Marketing Performance
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your productivity gains, ROI, and see how much time you're saving with AI-powered
              marketing prompts.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container size="xl">
          <MarketingAnalyticsDashboard
            dashboardData={dashboardData}
            dailyAnalytics={dailyAnalytics || []}
            topPrompts={topPromptsProcessed}
            userName={profile?.name || 'User'}
            userId={user.id}
          />
        </Container>
      </Section>
    </>
  )
}
