import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('collections')
  return {
    title: `${t('action_add_to_collection')} | Prompt Party`,
  }
}

export default async function AddToCollectionPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { q } = await searchParams
  const supabase = await createClient()
  const t = await getTranslations('collections')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Verify ownership
  const { data: collection } = await supabase
    .from('collections')
    .select('*')
    .eq('id', id)
    .single()

  if (!collection || collection.user_id !== user.id) {
    notFound()
  }

  // Get existing items in collection
  const { data: existingItems } = await supabase
    .from('collection_items')
    .select('prompt_id')
    .eq('collection_id', id)

  const existingPromptIds = existingItems?.map((item) => item.prompt_id) || []

  // Search prompts
  let query = supabase
    .from('prompts')
    .select('id, title, body, tags, likes_count, created_at, author')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(20)

  if (q) {
    query = query.or(`title.ilike.%${q}%,body.ilike.%${q}%`)
  }

  const { data: prompts } = await query

  // Fetch profiles for prompts
  if (prompts && prompts.length > 0) {
    const authorIds = [...new Set(prompts.map((p: any) => p.author))]
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, name')
      .in('user_id', authorIds)

    if (profiles) {
      const profileMap = new Map(profiles.map(p => [p.user_id, p]))
      prompts.forEach((p: any) => {
        p.profiles = profileMap.get(p.author)
      })
    }
  }

  async function addToCollection(formData: FormData) {
    'use server'

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/auth/login')
    }

    const promptId = formData.get('promptId') as string

    await supabase.from('collection_items').insert({
      collection_id: id,
      prompt_id: promptId,
    })

    redirect(`/collections/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('action_add_to')} {collection.name}</h1>
          <form method="GET" className="mt-4">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder={t('form_search_prompts')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>
        </div>

        <div className="space-y-4">
          {prompts?.map((prompt: any) => {
            const isAdded = existingPromptIds.includes(prompt.id)
            return (
              <div
                key={prompt.id}
                className="border rounded-lg p-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{prompt.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {prompt.body.substring(0, 200)}
                    {prompt.body.length > 200 ? '...' : ''}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{prompt.profiles?.name || 'Anonymous'}</span>
                    <span>•</span>
                    <span>{prompt.likes_count} likes</span>
                  </div>
                </div>
                {isAdded ? (
                  <button
                    disabled
                    className="px-4 py-2 border rounded-md bg-muted text-muted-foreground cursor-not-allowed"
                  >
                    {t('action_added')}
                  </button>
                ) : (
                  <form action={addToCollection}>
                    <input type="hidden" name="promptId" value={prompt.id} />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      {t('action_add')}
                    </button>
                  </form>
                )}
              </div>
            )
          })}
        </div>

        {(!prompts || prompts.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            <p>{t('no_prompts_found')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
