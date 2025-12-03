import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PromptCard } from '@/components/feed/prompt-card'
import { ProfileStats } from '@/components/profile/profile-stats'
import { ProfileBadges } from '@/components/profile/profile-badges'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

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
    const t = await getTranslations('metadata')
    return {
      title: t('profile_not_found'),
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
  const t = await getTranslations('profile')
  const tCommon = await getTranslations('common')

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
    <div className="min-h-screen bg-background safe-area-inset-top">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl sm:text-3xl lg:text-4xl ring-4 ring-primary/10 flex-shrink-0">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.name || 'User avatar'}
                    width={112}
                    height={112}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  (profile.name || 'A').charAt(0).toUpperCase()
                )}
              </div>
              {/* Info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 truncate">
                  {profile.name || tCommon('anonymous')}
                </h1>
                {profile.username && (
                  <p className="text-sm sm:text-base text-muted-foreground mb-1 sm:mb-2 truncate">
                    @{profile.username}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t('joined', { date: accountCreated.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) })}
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <Suspense fallback={<div className="h-24 sm:h-32 bg-muted animate-pulse rounded-lg" />}>
                <ProfileStats userId={profile.user_id} />
              </Suspense>
            </div>

            {/* Badges - Horizontal scroll on mobile */}
            <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 hide-scrollbar">
              <ProfileBadges
                totalPrompts={prompts?.length || 0}
                totalLikes={totalLikes}
                totalViews={totalViews}
                accountAge={accountAge}
              />
            </div>
          </div>

          {/* Tabs - Touch friendly */}
          <div className="border-b mb-4 sm:mb-6 lg:mb-8 -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex gap-4 sm:gap-8 overflow-x-auto hide-scrollbar">
              <button className="px-3 sm:px-4 py-2.5 sm:py-3 font-medium border-b-2 border-primary text-sm sm:text-base whitespace-nowrap touch-manipulation min-h-[44px]">
                {t('prompts_tab')}
              </button>
            </div>
          </div>

          {/* Prompts */}
          <div className="space-y-4 sm:space-y-6">
            {!prompts || prompts.length === 0 ? (
              <div className="text-center py-8 sm:py-12 lg:py-16 max-w-2xl mx-auto px-4">
                <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto mb-4 sm:mb-6 lg:mb-8 animate-in fade-in zoom-in duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-cyan-500/10 rounded-full blur-2xl" />
                  <Image
                    src="/branding/illustrations/empty-states/empty-prompts.svg"
                    alt="No prompts yet"
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 224px, 256px"
                    className="relative z-10 drop-shadow-lg object-contain"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">{t('no_public_prompts')}</h3>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  {t('no_public_prompts_description')}
                </p>
              </div>
            ) : (
              prompts.map((prompt: any) => <PromptCard key={prompt.id} {...prompt} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
