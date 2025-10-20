import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AnalyticsDashboard } from '@/components/analytics/analytics-dashboard'
import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { LockIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Analytics | Prompt Party',
  description: 'View detailed analytics for your prompts and activity',
}

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user profile and check plan
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const hasPro = profile?.plan === 'pro' || profile?.plan === 'team' || profile?.plan === 'business'

  // If not Pro, show upgrade message
  if (!hasPro) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <LockIcon className="w-8 h-8 text-primary" />
              </div>

              <h2 className="text-2xl font-bold mb-2">Pro Feature</h2>
              <p className="text-muted-foreground mb-6">
                Analytics Dashboard is available for Pro, Team, and Business plans.
                Unlock detailed insights about your prompts, engagement, and growth.
              </p>

              <div className="space-y-3 text-left max-w-sm mx-auto mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">View trends over time</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Track engagement metrics (likes, views, remixes)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Analyze top-performing prompts</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Export data to CSV</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Advanced filtering and comparison</p>
                </div>
              </div>

              <Button asChild>
                <Link href="/pricing">
                  Upgrade to Pro
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Fetch analytics data for Pro users
  const { data: prompts } = await supabase
    .from('prompts')
    .select('*')
    .eq('author', user.id)
    .order('created_at', { ascending: false })

  const { data: likes } = await supabase
    .from('likes')
    .select('*, prompts!inner(author)')
    .eq('prompts.author', user.id)
    .order('created_at', { ascending: false })

  const { data: comments } = await supabase
    .from('comments')
    .select('*, prompts!inner(author)')
    .eq('prompts.author', user.id)
    .order('created_at', { ascending: false })

  const { data: forks } = await supabase
    .from('forks')
    .select('*, prompts!forks_original_id_fkey(author)')
    .eq('prompts.author', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your performance and engagement across all your prompts
          </p>
        </div>

        <AnalyticsDashboard
          prompts={prompts || []}
          likes={likes || []}
          comments={comments || []}
          forks={forks || []}
        />
      </div>
    </div>
  )
}
