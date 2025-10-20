import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'
import { TrendingTags } from '@/components/feed/trending-tags'
import { Suspense } from 'react'

export default async function Home() {
  const supabase = await createClient()

  // Fetch initial prompts
  const { data: prompts } = await supabase
    .from('prompts')
    .select('*')
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
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-10 md:mb-12 text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <span className="text-2xl">🪩</span>
          <span>Welcome to Prompt Party</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Discover AI Prompts
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Explore, share, and remix the best prompts from the community. Join thousands of creators crafting the future of AI.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Feed Content */}
        <div className="min-w-0">
          <FeedContent initialPrompts={prompts || []} />
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 hidden lg:block">
          <Suspense fallback={<div className="bg-card border rounded-lg p-6 h-96 animate-pulse" />}>
            <TrendingTags />
          </Suspense>
        </aside>
      </div>
    </div>
  )
}
