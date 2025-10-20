import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'

export const metadata = {
  title: 'Top Prompts | Prompt Party',
  description: 'Discover the most popular AI prompts of all time',
}

export default async function TopPage() {
  const supabase = await createClient()

  // Fetch top prompts (sorted by likes)
  const { data: prompts } = await supabase
    .from('prompts')
    .select(`
      *,
      profiles:author (
        name,
        avatar_url
      )
    `)
    .eq('is_public', true)
    .order('likes_count', { ascending: false })
    .limit(20)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Top Prompts</h1>
          <p className="text-muted-foreground">
            The most loved prompts of all time
          </p>
        </div>

        <FeedContent initialPrompts={prompts || []} />
      </div>
    </div>
  )
}
