import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PromptCard } from '@/components/feed/prompt-card'
import { ProfileStats } from '@/components/profile/profile-stats'
import { ProfileBadges } from '@/components/profile/profile-badges'
import { Suspense } from 'react'
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
    .select('*')
    .eq('author', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  // Attach profile to prompts
  if (prompts) {
    prompts.forEach((p: any) => {
      p.profiles = { name: profile.name, avatar_url: profile.avatar_url }
    })
  }

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

  // Get account age in days
  const accountCreated = new Date(profile.created_at)
  const accountAge = Math.floor(
    (Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Get total likes and views for badges
  const totalLikes = prompts?.reduce((sum, p) => sum + (p.likes_count || 0), 0) || 0
  const totalViews = prompts?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-4xl ring-4 ring-primary/10">
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
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-1">{profile.name || 'Anonymous'}</h1>
              {profile.username && (
                <p className="text-muted-foreground mb-2">@{profile.username}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Member since {accountCreated.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8">
            <Suspense fallback={<div className="h-32 bg-muted animate-pulse rounded-lg" />}>
              <ProfileStats userId={profile.user_id} />
            </Suspense>
          </div>

          {/* Badges */}
          <ProfileBadges
            totalPrompts={prompts?.length || 0}
            totalLikes={totalLikes}
            totalViews={totalViews}
            accountAge={accountAge}
          />
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
