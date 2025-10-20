import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ApiKeyManager } from '@/components/api/api-key-manager'
import { Card, CardContent } from '@/components/ui/card'
import { LockIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Access | Prompt Party',
  description: 'Manage your API keys and access',
}

export default async function ApiSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user has Business plan
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
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
                API access is available for Business plan subscribers.
                Integrate Prompt Party into your applications with our REST API.
              </p>

              <div className="space-y-3 text-left max-w-sm mx-auto mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">10,000 API requests per month</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">RESTful API with full CRUD operations</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Multiple API keys for different apps</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Detailed request logging and analytics</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">Rate limiting and usage monitoring</p>
                </div>
              </div>

              <Button asChild>
                <Link href="/pricing">
                  Upgrade to Business
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Get existing API keys
  const { data: apiKeys } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API Access</h1>
          <p className="text-muted-foreground">
            Manage your API keys and monitor usage
          </p>
        </div>

        <ApiKeyManager initialKeys={apiKeys || []} />
      </div>
    </div>
  )
}
