import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { PromptCard } from '@/components/feed/prompt-card'
import { AddToCollectionButton } from '@/components/collections/add-to-collection-button'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()

  const { data: collection } = await supabase
    .from('collections')
    .select('name, description')
    .eq('id', id)
    .single()

  if (!collection) {
    const t = await getTranslations('metadata')
    return {
      title: t('collection_not_found'),
    }
  }

  return {
    title: `${collection.name} | Prompt Party`,
    description: collection.description || `View ${collection.name} collection`,
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { id } = await params
  const t = await getTranslations('collections')
  const commonT = await getTranslations('common')
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch collection
  const { data: collection, error } = await supabase
    .from('collections')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !collection) {
    notFound()
  }

  // Fetch profile separately
  const { data: ownerProfile } = await supabase
    .from('profiles')
    .select('name')
    .eq('user_id', collection.user_id)
    .single()

  // Attach profile to collection
  const collectionWithProfile = {
    ...collection,
    profiles: ownerProfile
  }

  // Check access
  if (!collectionWithProfile.is_public && collectionWithProfile.user_id !== user?.id) {
    notFound()
  }

  const isOwner = user?.id === collectionWithProfile.user_id

  // Fetch collection items
  const { data: items } = await supabase
    .from('collection_items')
    .select('id, prompt_id, added_at')
    .eq('collection_id', id)
    .order('added_at', { ascending: false })

  // Fetch prompts for items
  if (items && items.length > 0) {
    const promptIds = items.map(item => item.prompt_id)
    const { data: prompts } = await supabase
      .from('prompts')
      .select('*')
      .in('id', promptIds)

    if (prompts) {
      // Fetch profiles for prompts
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

      // Attach prompts to items
      const promptMap = new Map(prompts.map(p => [p.id, p]))
      items.forEach((item: any) => {
        item.prompts = promptMap.get(item.prompt_id)
      })
    }
  }

  async function removeItem(itemId: string) {
    'use server'

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== collectionWithProfile.user_id) {
      return
    }

    await supabase.from('collection_items').delete().eq('id', itemId)

    redirect(`/collections/${id}`)
  }

  return (
    <div className="min-h-screen bg-background safe-area-inset-top">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 sm:mb-6 lg:mb-8">
            {/* Header - Stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 truncate">{collectionWithProfile.name}</h1>
                <p className="text-sm sm:text-base text-muted-foreground flex flex-wrap items-center gap-1">
                  <span>by {collectionWithProfile.profiles?.name || commonT('anonymous')}</span>
                  {!collectionWithProfile.is_public && (
                    <span className="text-amber-600">• {commonT('private')}</span>
                  )}
                </p>
              </div>
              {isOwner && (
                <div className="flex gap-2 flex-shrink-0">
                  <AddToCollectionButton collectionId={id} />
                </div>
              )}
            </div>
            {collectionWithProfile.description && (
              <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-4">{collectionWithProfile.description}</p>
            )}
          </div>

          {!items || items.length === 0 ? (
            <div className="text-center py-8 sm:py-12 lg:py-16 border rounded-lg bg-muted/20">
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                {isOwner ? t('no_prompts_owner') : t('no_prompts_visitor')}
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {items.map((item: any) => {
                if (!item.prompts) return null
                return (
                  <div key={item.id} className="relative">
                    <PromptCard {...item.prompts} />
                    {isOwner && (
                      <form action={() => removeItem(item.id)} className="absolute top-2 right-2 sm:top-4 sm:right-4">
                        <button
                          type="submit"
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-md hover:bg-accent active:scale-[0.97] transition-all touch-manipulation min-h-[36px] sm:min-h-[32px]"
                        >
                          {commonT('remove')}
                        </button>
                      </form>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
