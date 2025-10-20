import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MarkdownPreview } from '@/components/editor/markdown-preview'
import { LikeButton } from '@/components/prompts/like-button'
import { CommentList } from '@/components/comments/comment-list'
import { formatDistanceToNow } from 'date-fns'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()

  const { data: prompt } = await supabase
    .from('prompts')
    .select('title, body')
    .eq('id', id)
    .single()

  if (!prompt) {
    return {
      title: 'Prompt Not Found',
    }
  }

  return {
    title: `${prompt.title} | Prompt Party`,
    description: prompt.body.substring(0, 160),
    openGraph: {
      title: prompt.title,
      description: prompt.body.substring(0, 160),
    },
  }
}

export default async function PromptDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch prompt
  const { data: prompt, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !prompt) {
    notFound()
  }

  // Fetch author profile separately
  const { data: authorProfile } = await supabase
    .from('profiles')
    .select('name, avatar_url, username')
    .eq('user_id', prompt.author)
    .single()

  // Attach profile to prompt
  prompt.profiles = authorProfile

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
  const { data: comments } = await supabase
    .from('comments')
    .select(`
      *,
      profiles:user_id (
        name,
        avatar_url
      )
    `)
    .eq('prompt_id', id)
    .order('created_at', { ascending: false })

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
              Remixed from{' '}
              <Link
                href={`/prompts/${forkInfo.original.id}`}
                className="text-primary hover:underline font-medium"
              >
                {forkInfo.original.title}
              </Link>{' '}
              by {forkInfo.original.profiles?.name || 'Anonymous'}
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{prompt.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                {(prompt.profiles?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <span>{prompt.profiles?.name || 'Anonymous'}</span>
            </div>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}
            </span>
            {!prompt.is_public && (
              <>
                <span>•</span>
                <span className="text-amber-600">Private</span>
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

        {/* Actions */}
        <div className="flex items-center gap-4">
          <LikeButton
            promptId={prompt.id}
            initialLikes={prompt.likes_count}
            initialIsLiked={isLiked}
            userId={user?.id}
          />

          <Link
            href={`/prompts/${prompt.id}/remix`}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
          >
            <svg
              className="w-5 h-5"
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
            <span>Remix {remixCount ? `(${remixCount})` : ''}</span>
          </Link>

          <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span>Save</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">
            Comments {comments && comments.length > 0 && `(${comments.length})`}
          </h2>
          <CommentList
            promptId={prompt.id}
            initialComments={comments || []}
            userId={user?.id}
          />
        </div>
      </div>
    </div>
  )
}
