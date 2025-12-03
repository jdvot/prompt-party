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
    <div className="min-h-screen bg-background safe-area-inset-top">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8 pb-24 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            {forkInfo?.original && (
              <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                {t('remixed_from')}{' '}
                <Link
                  href={`/prompts/${forkInfo.original.id}`}
                  className="text-primary hover:underline font-medium touch-manipulation"
                >
                  {forkInfo.original.title}
                </Link>{' '}
                {t('original_by')} {forkInfo.original.profiles?.name || tCommon('anonymous')}
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{prompt.title}</h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <Link
                href={prompt.profiles?.username ? `/profile/${prompt.profiles.username}` : '#'}
                className="flex items-center gap-2 touch-manipulation hover:text-foreground transition-colors"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm sm:text-base">
                  {(prompt.profiles?.name || 'A').charAt(0).toUpperCase()}
                </div>
                <span className="line-clamp-1">{prompt.profiles?.name || tCommon('anonymous')}</span>
              </Link>
              <span className="hidden sm:inline">•</span>
              <span className="text-[10px] sm:text-sm">
                {formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}
              </span>
              <span className="hidden sm:inline">•</span>
              <ViewCounter promptId={prompt.id} initialViews={prompt.views_count || 0} />
              {!prompt.is_public && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-amber-600 text-[10px] sm:text-sm">{tCommon('private')}</span>
                </>
              )}
            </div>
          </div>

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {prompt.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/search?tag=${encodeURIComponent(tag)}`}
                  className={cn(
                    "px-2 sm:px-3 py-1 sm:py-1.5 rounded-md",
                    "bg-secondary text-secondary-foreground",
                    "text-xs sm:text-sm font-medium",
                    "hover:bg-secondary/80 active:scale-[0.97]",
                    "transition-all touch-manipulation"
                  )}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Body */}
          <div className="bg-card border rounded-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none overflow-x-auto">
              <MarkdownPreview content={prompt.body} />
            </div>
          </div>

          {/* How to Use Section */}
          <HowToUseSection promptContent={prompt.body} />

          {/* Desktop Actions - Hidden on mobile */}
          <div className="hidden sm:block space-y-4 mb-4 sm:mb-6">
            {/* Primary actions row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <LikeButton
                promptId={prompt.id}
                initialLikes={prompt.likes_count}
                initialIsLiked={isLiked}
                userId={user?.id}
              />

              <Link
                href={`/prompts/${prompt.id}/remix`}
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "min-h-[44px]",
                  "active:scale-[0.98] transition-transform touch-manipulation"
                )}
              >
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
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors list-none flex items-center gap-2 touch-manipulation min-h-[44px] py-2">
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

          {/* Mobile Secondary Actions - Expandable */}
          <div className="sm:hidden mb-4">
            <details className="group">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors list-none flex items-center gap-2 touch-manipulation min-h-[44px] py-2">
                <MoreHorizontalIcon className="w-4 h-4" />
                <span>{t('more_actions')}</span>
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-3 grid grid-cols-2 gap-2">
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

          {/* Comments Section - Expandable on mobile */}
          <div className="mt-6 sm:mt-8 lg:mt-12 border-t pt-4 sm:pt-6 lg:pt-8">
            {/* Mobile: Expandable comments */}
            <details className="sm:hidden group" open={commentsWithProfiles.length > 0}>
              <summary className="cursor-pointer list-none touch-manipulation min-h-[48px] flex items-center justify-between py-2">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  {tComments('title')}
                  {commentsWithProfiles && commentsWithProfiles.length > 0 && (
                    <span className="text-sm font-normal text-muted-foreground">
                      ({commentsWithProfiles.length})
                    </span>
                  )}
                </h2>
                <svg className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4">
                <CommentList
                  promptId={prompt.id}
                  initialComments={commentsWithProfiles || []}
                  userId={user?.id}
                />
              </div>
            </details>

            {/* Desktop: Always visible comments */}
            <div className="hidden sm:block">
              <h2 className="text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
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
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around gap-1 px-2 py-2">
          <LikeButton
            promptId={prompt.id}
            initialLikes={prompt.likes_count}
            initialIsLiked={isLiked}
            userId={user?.id}
          />

          <Link
            href={`/prompts/${prompt.id}/remix`}
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "flex-1 max-w-[120px] min-h-[44px] text-xs",
              "active:scale-[0.97] transition-transform touch-manipulation"
            )}
          >
            <svg
              className="w-4 h-4 mr-1"
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
            {tCommon('remix')}
          </Link>

          <SaveToCollectionButton promptId={prompt.id} userId={user?.id} />

          <ShareButton
            promptId={prompt.id}
            title={prompt.title}
            description={prompt.body.substring(0, 160)}
          />
        </div>
      </div>
    </div>
  )
}
