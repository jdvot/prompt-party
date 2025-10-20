import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MarkdownPreview } from '@/components/editor/markdown-preview'
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

  // Fetch prompt with author info
  const { data: prompt, error } = await supabase
    .from('prompts')
    .select(`
      *,
      profiles:author (
        name,
        avatar_url
      )
    `)
    .eq('id', id)
    .single()

  if (error || !prompt) {
    notFound()
  }

  // Check if prompt is public or user is the author
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!prompt.is_public && prompt.author !== user?.id) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{prompt.likes_count}</span>
          </button>

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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Remix</span>
          </button>

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

        {/* Comments Section Placeholder */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>Comments coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
