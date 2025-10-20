import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'

export default async function Home() {
  const supabase = await createClient()

  // Fetch initial prompts
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
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover AI Prompts</h1>
          <p className="text-muted-foreground">
            Explore, share, and remix the best prompts from the community
          </p>
        </div>

        <FeedContent initialPrompts={prompts || []} />
      </div>
    </div>
  )
}
