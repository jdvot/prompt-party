import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ApiAccessDashboard } from '@/components/api-access/api-access-dashboard'
import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { LockIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'API Access | Prompt Party',
  description: 'Manage your API keys and access',
}

export default async function ApiAccessPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const hasBusiness = profile?.plan === 'business'

  if (!hasBusiness) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">API Access</h1>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <LockIcon className="w-8 h-8 text-primary" />
              </div>

              <h2 className="text-2xl font-bold mb-2">Business Feature</h2>
              <p className="text-muted-foreground mb-6">
                API Access is available for Business plan users. Build powerful integrations and automate your workflow.
              </p>

              <div className="space-y-3 text-left max-w-sm mx-auto mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Generate and manage API keys</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Access all prompts programmatically</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Webhook support for real-time events</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Higher rate limits (10,000 requests/hour)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Detailed usage analytics and logs</p>
                </div>
              </div>

              <Button asChild>
                <Link href="/pricing">Upgrade to Business</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const { data: apiKeys } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API Access</h1>
          <p className="text-muted-foreground">
            Manage your API keys, view usage statistics, and configure webhooks
          </p>
        </div>

        <ApiAccessDashboard apiKeys={apiKeys || []} userId={user.id} />
      </div>
    </div>
  )
}
