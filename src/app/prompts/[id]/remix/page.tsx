import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { RemixEditor } from '@/components/editor/remix-editor'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Remix Prompt | Prompt Party',
}

export default async function RemixPromptPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const t = await getTranslations('prompts')
  const tCommon = await getTranslations('common')

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch original prompt
  const { data: originalPrompt, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !originalPrompt) {
    notFound()
  }

  // Fetch author profile
  const { data: authorProfile } = await supabase
    .from('profiles')
    .select('name')
    .eq('user_id', originalPrompt.author)
    .single()

  const originalPromptWithProfile = { ...originalPrompt, profiles: authorProfile } as any

  // Check if original prompt is public or user is author
  if (!originalPromptWithProfile.is_public && originalPromptWithProfile.author !== user.id) {
    notFound()
  }

  async function handleSubmit(formData: FormData) {
    'use server'

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/auth/login')
    }

    const title = formData.get('title') as string
    const body = formData.get('body') as string
    const tags = (formData.get('tags') as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const is_public = formData.get('is_public') === 'true'

    if (!title || !body) {
      return
    }

    // Create remix prompt
    const { data: newPrompt, error } = await supabase
      .from('prompts')
      .insert({
        title,
        body,
        tags,
        is_public,
        author: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating remix:', error)
      return
    }

    // Create fork relationship
    await supabase.from('forks').insert({
      original_prompt_id: id,
      forked_prompt_id: newPrompt.id,
      user_id: user.id,
    })

    redirect(`/prompts/${newPrompt.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('remix_title')}</h1>
          <p className="text-muted-foreground">
            {t('remix_description')} &ldquo;{originalPromptWithProfile.title}&rdquo; {t('original_by')}{' '}
            {originalPromptWithProfile.profiles?.name || tCommon('anonymous')}
          </p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              {t('title_label')} <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={`${originalPromptWithProfile.title} (${tCommon('remix')})`}
              required
              className="w-full px-4 py-2 border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              {t('tags_label')}
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              defaultValue={originalPromptWithProfile.tags.join(', ')}
              placeholder={t('tags_placeholder')}
              className="w-full px-4 py-2 border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium mb-2">
              {t('body_label')} <span className="text-destructive">*</span>
            </label>
            <RemixEditor defaultValue={originalPromptWithProfile.body} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_public"
              name="is_public"
              value="true"
              defaultChecked={true}
              className="w-4 h-4"
            />
            <label htmlFor="is_public" className="text-sm">
              {t('make_public')}
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {t('publish_remix')}
            </button>
            <Link
              href={`/prompts/${id}`}
              className="px-6 py-2 border rounded-md hover:bg-accent transition-colors inline-flex items-center"
            >
              {tCommon('cancel')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
