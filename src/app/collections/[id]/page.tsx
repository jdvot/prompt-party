import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
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
    return {
      title: 'Collection Not Found',
    }
  }

  return {
    title: `${collection.name} | Prompt Party`,
    description: collection.description || `View ${collection.name} collection`,
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch collection
  const { data: collection, error } = await supabase
    .from('collections')
    .select(`
      *,
      profiles:user_id (
        name
      )
    `)
    .eq('id', id)
    .single()

  if (error || !collection) {
    notFound()
  }

  // Check access
  if (!collection.is_public && collection.user_id !== user?.id) {
    notFound()
  }

  const isOwner = user?.id === collection.user_id

  // Fetch collection items with prompts
  const { data: items } = await supabase
    .from('collection_items')
    .select(`
      id,
      prompts:prompt_id (
        id,
        title,
        body,
        tags,
        likes_count,
        created_at,
        profiles:author (
          name,
          avatar_url
        )
      )
    `)
    .eq('collection_id', id)
    .order('added_at', { ascending: false })

  async function removeItem(itemId: string) {
    'use server'

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== collection.user_id) {
      return
    }

    await supabase.from('collection_items').delete().eq('id', itemId)

    redirect(`/collections/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
              <p className="text-muted-foreground">
                by {collection.profiles?.name || 'Anonymous'}
                {!collection.is_public && (
                  <span className="ml-2 text-amber-600">• Private</span>
                )}
              </p>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <AddToCollectionButton collectionId={id} />
              </div>
            )}
          </div>
          {collection.description && (
            <p className="text-muted-foreground mt-4">{collection.description}</p>
          )}
        </div>

        {!items || items.length === 0 ? (
          <div className="text-center py-16 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">
              {isOwner ? 'No prompts in this collection yet.' : 'This collection is empty.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item: any) => {
              if (!item.prompts) return null
              return (
                <div key={item.id} className="relative">
                  <PromptCard {...item.prompts} />
                  {isOwner && (
                    <form action={() => removeItem(item.id)} className="absolute top-4 right-4">
                      <button
                        type="submit"
                        className="px-3 py-1 text-sm border rounded-md hover:bg-accent transition-colors"
                      >
                        Remove
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
  )
}
