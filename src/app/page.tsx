import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'
import { TrendingTags } from '@/components/feed/trending-tags'
import { HeroSection } from '@/components/home/hero-section'
import { Suspense } from 'react'

export default async function Home() {
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
        // Extract count from nested comments array
        p.comments_count = p.comments?.[0]?.count || 0
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <HeroSection />

      {/* Main Content Grid */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <FeedContent initialPrompts={prompts || []} />
        </div>
      </div>
    </div>
  )
}
