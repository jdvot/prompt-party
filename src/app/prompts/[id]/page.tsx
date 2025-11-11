import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MarkdownPreview } from '@/components/editor/markdown-preview'
import { LikeButton } from '@/components/prompts/like-button'
import { SaveToCollectionButton } from '@/components/prompts/save-to-collection-button'
import { ShareButton } from '@/components/prompts/share-button'
import { DuplicateButton } from '@/components/prompts/duplicate-button'
import { ViewCounter } from '@/components/prompts/view-counter'
import { EmbedButton } from '@/components/prompts/embed-button'
import { ExportPrompt } from '@/components/prompts/export-prompt'
import { VersionHistory } from '@/components/prompts/version-history'
import { RemixTree } from '@/components/prompts/remix-tree'
import { PromptOptimizer } from '@/components/ai-optimizer/prompt-optimizer'
import { PromptPlayground } from '@/components/ai-tester/prompt-playground'
import { CommentList } from '@/components/comments/comment-list'
import { HowToUseSection } from '@/components/prompts/how-to-use-section'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const t = await getTranslations('metadata')
  const supabase = await createClient()

  const { data: prompt } = await supabase
    .from('prompts')
    .select('title, body')
    .eq('id', id)
    .single()

  if (!prompt) {
    return {
      title: t('prompt_not_found'),
    }
  }

  return {
    title: `${prompt.title} | Prompt Party`,
    description: prompt.body.substring(0, 160),
    openGraph: {
      title: prompt.title,
      description: prompt.body.substring(0, 160),
      type: 'article',
      url: `https://prompt-party.netlify.app/prompts/${id}`,
      siteName: 'Prompt Party',
      images: [
        {
          url: 'https://prompt-party.netlify.app/og-image.png',
          width: 1200,
          height: 630,
          alt: prompt.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.title,
      description: prompt.body.substring(0, 160),
      images: ['https://prompt-party.netlify.app/og-image.png'],
      creator: '@promptparty',
    },
  }
}

export default async function PromptDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const t = await getTranslations('prompts')
  const tCommon = await getTranslations('common')
  const tComments = await getTranslations('comments')

  // Fetch prompt
  const { data: promptData, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !promptData) {
    notFound()
  }

  // Fetch author profile separately
  const { data: authorProfile } = await supabase
    .from('profiles')
    .select('name, avatar_url, username')
    .eq('user_id', promptData.author)
    .single()

  // Create prompt object with profile
  const prompt = {
    ...promptData,
    profiles: authorProfile
  }

  // Check if prompt is public or user is the author
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!prompt.is_public && prompt.author !== user?.id) {
    notFound()
  }

  // Check if user has liked this prompt
  let isLiked = false
  if (user) {
    const { data: like } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', user.id)
      .eq('prompt_id', id)
      .single()

    isLiked = !!like
  }

  // Fetch comments
  const { data: commentsData } = await supabase
    .from('comments')
    .select('*')
    .eq('prompt_id', id)
    .order('created_at', { ascending: false })

  // Fetch profiles for comments separately
  const comments = commentsData || []
  const profilePromises = comments.map(async (comment) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, avatar_url')
      .eq('user_id', comment.user_id)
      .single()

    return {
      ...comment,
      profiles: profile
    }
  })

  const commentsWithProfiles = await Promise.all(profilePromises)

  // Check if this prompt is a remix
  const { data: forkInfo } = await supabase
    .from('forks')
    .select(`
      *,
      original:original_prompt_id (
        id,
        title,
        profiles:author (
          name
        )
      )
    `)
    .eq('forked_prompt_id', id)
    .single()

  // Get remix count
  const { count: remixCount } = await supabase
    .from('forks')
    .select('*', { count: 'exact', head: true })
    .eq('original_prompt_id', id)


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {forkInfo?.original && (
            <div className="mb-4 text-sm text-muted-foreground">
              {t('remixed_from')}{' '}
              <Link
                href={`/prompts/${forkInfo.original.id}`}
                className="text-primary hover:underline font-medium"
              >
                {forkInfo.original.title}
              </Link>{' '}
              {t('original_by')} {forkInfo.original.profiles?.name || tCommon('anonymous')}
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{prompt.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                {(prompt.profiles?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <span>{prompt.profiles?.name || tCommon('anonymous')}</span>
            </div>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}
            </span>
            <span>•</span>
            <ViewCounter promptId={prompt.id} initialViews={prompt.views_count || 0} />
            {!prompt.is_public && (
              <>
                <span>•</span>
                <span className="text-amber-600">{tCommon('private')}</span>
              </>
            )}
          </div>
        </div>

        {/* Tags */}
        {prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {prompt.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="bg-card border rounded-lg p-8 mb-6">
          <MarkdownPreview content={prompt.body} />
        </div>

        {/* How to Use Section */}
        <HowToUseSection promptContent={prompt.body} />

        {/* Actions - Reorganized with better hierarchy */}
        <div className="space-y-4 mb-6">
          {/* Primary actions row */}
          <div className="flex flex-wrap items-center gap-3">
            <LikeButton
              promptId={prompt.id}
              initialLikes={prompt.likes_count}
              initialIsLiked={isLiked}
              userId={user?.id}
            />

            <Link href={`/prompts/${prompt.id}/remix`} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {tCommon('remix')} {remixCount ? `(${remixCount})` : ''}
            </Link>

            <SaveToCollectionButton promptId={prompt.id} userId={user?.id} />

            <ShareButton
              promptId={prompt.id}
              title={prompt.title}
              description={prompt.body.substring(0, 160)}
            />
          </div>

          {/* Secondary actions - collapsible row */}
          <details className="group">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors list-none flex items-center gap-2">
              <MoreHorizontalIcon className="w-4 h-4" />
              <span>{t('more_actions')}</span>
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-3 flex flex-wrap items-center gap-2 pl-6">
              <DuplicateButton promptId={prompt.id} userId={user?.id} />
              <EmbedButton promptId={prompt.id} />
              <ExportPrompt prompt={prompt} />
              <VersionHistory promptId={prompt.id} />
              <RemixTree promptId={prompt.id} promptTitle={prompt.title} />
              <PromptOptimizer promptContent={prompt.body} />
            </div>
          </details>
        </div>

        {/* AI Prompt Tester */}
        <PromptPlayground promptContent={prompt.body} userId={user?.id} />

        {/* Comments Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">
            {tComments('title')} {commentsWithProfiles && commentsWithProfiles.length > 0 && `(${commentsWithProfiles.length})`}
          </h2>
          <CommentList
            promptId={prompt.id}
            initialComments={commentsWithProfiles || []}
            userId={user?.id}
          />
        </div>
      </div>
    </div>
  )
}
