import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PromptCard } from '@/components/feed/prompt-card'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('username', username)
    .single()

  if (!profile) {
    return {
      title: 'Profile Not Found',
    }
  }

  return {
    title: `${profile.name || username} | Prompt Party`,
    description: `View ${profile.name || username}'s prompts and collections`,
  }
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params
  const supabase = await createClient()

  // Fetch profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !profile) {
    notFound()
  }

  // Fetch user's public prompts
  const { data: prompts } = await supabase
    .from('prompts')
    .select(`
      *,
      profiles:author (
        name,
        avatar_url
      )
    `)
    .eq('author', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  // Fetch user's public collections
  const { data: collections } = await supabase
    .from('collections')
    .select(`
      *,
      collection_items (count)
    `)
    .eq('user_id', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  // Get stats
  const promptCount = prompts?.length || 0
  const { count: likesReceived } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .in(
      'prompt_id',
      prompts?.map((p) => p.id) || []
    )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="mb-12 text-center">
          <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-4xl mx-auto mb-4">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name || 'User avatar'}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              (profile.name || 'A').charAt(0).toUpperCase()
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{profile.name || 'Anonymous'}</h1>
          {profile.username && (
            <p className="text-muted-foreground mb-4">@{profile.username}</p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{promptCount}</div>
              <div className="text-sm text-muted-foreground">Prompts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{likesReceived || 0}</div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{collections?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Collections</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8">
          <div className="flex gap-8">
            <button className="px-4 py-3 font-medium border-b-2 border-primary">
              Prompts
            </button>
          </div>
        </div>

        {/* Prompts */}
        <div className="space-y-6">
          {!prompts || prompts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No public prompts yet.</p>
            </div>
          ) : (
            prompts.map((prompt: any) => <PromptCard key={prompt.id} {...prompt} />)
          )}
        </div>
      </div>
    </div>
  )
}
