import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'

export const metadata = {
  title: 'Trending Prompts | Prompt Party',
  description: 'Discover the hottest AI prompts this week',
}

export default async function TrendingPage() {
  const supabase = await createClient()

  // Fetch trending prompts (most likes in last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: prompts } = await supabase
    .from('prompts')
    .select('*')
    .eq('is_public', true)
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('likes_count', { ascending: false })
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🔥 Trending This Week</h1>
          <p className="text-muted-foreground">
            The hottest prompts from the last 7 days
          </p>
        </div>

        <FeedContent initialPrompts={prompts || []} />
      </div>
    </div>
  )
}
