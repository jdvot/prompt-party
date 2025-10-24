import { createClient } from '@/lib/supabase/server'
import { FeedContent } from '@/components/feed/feed-content'
import { TopHeader } from '@/components/pages/top-header'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return {
    title: t('top_title'),
    description: t('top_description'),
  }
}

export default async function TopPage() {
  const supabase = await createClient()

  const { data: prompts } = await supabase
    .from('prompts')
    .select(`
      *,
      comments:comments(count)
    `)
    .eq('is_public', true)
    .order('likes_count', { ascending: false })
    .limit(20)

  if (prompts && prompts.length > 0) {
    const authorIds = [...new Set(prompts.map(p => p.author))]
    const { data: profiles} = await supabase
      .from('profiles')
      .select('user_id, name, avatar_url')
      .in('user_id', authorIds)

    if (profiles) {
      const profileMap = new Map(profiles.map(p => [p.user_id, p]))
      prompts.forEach((p: any) => {
        p.profiles = profileMap.get(p.author)
        p.comments_count = p.comments?.[0]?.count || 0
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <TopHeader />
        <FeedContent initialPrompts={prompts || []} />
      </div>
    </div>
  )
}
