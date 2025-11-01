import { createClient } from '@/lib/supabase/server'
import { MarketingLibraryClient } from '@/components/marketing/marketing-library-client'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'
import { SparklesIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Marketing Prompt Library | Prompt Party',
  description: '500+ professional marketing prompts for copywriting, SEO, social media, ads, video, and email marketing',
}

export default async function MarketingLibraryPage() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirect=/marketing/library')
  }

  // Check if user has access to Marketing Suite
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('user_id', user.id)
    .single()

  const hasAccess = ['marketing_suite', 'team', 'business'].includes(profile?.plan || '')

  if (!hasAccess) {
    redirect('/marketing-suite?upgrade=true')
  }

  // Fetch all marketing prompts
  const { data: prompts, error } = await supabase
    .from('marketing_prompts')
    .select('*')
    .order('rating', { ascending: false })
    .order('usage_count', { ascending: false })

  if (error) {
    console.error('Error fetching marketing prompts:', error)
  }

  // Get user's usage history
  const { data: usageHistory } = await supabase
    .from('marketing_prompt_usage')
    .select('prompt_id, used_at, rating')
    .eq('user_id', user.id)
    .order('used_at', { ascending: false })

  // Get categories and counts
  const categories = prompts
    ? Array.from(new Set(prompts.map((p) => p.category))).map((category) => ({
        name: category,
        count: prompts.filter((p) => p.category === category).length,
      }))
    : []

  return (
    <>
      <Section spacing="lg" className="bg-gradient-to-br from-brand-primary/5 via-background to-brand-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="soft" className="mb-4">
              <SparklesIcon className="w-3.5 h-3.5 mr-1.5" />
              Marketing Suite
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Marketing Prompt Library
            </h1>
            <p className="text-xl text-muted-foreground">
              Access 500+ professional marketing prompts tested by thousands of marketers.
              Filter by category, search by keyword, and start creating better content in minutes.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container size="xl">
          <MarketingLibraryClient
            initialPrompts={prompts || []}
            categories={categories}
            usageHistory={usageHistory || []}
            userId={user.id}
          />
        </Container>
      </Section>
    </>
  )
}
