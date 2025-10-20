'use client'

import { useEffect, useState } from 'react'
import { PromptCard } from './prompt-card'

interface Prompt {
  id: string
  title: string
  body: string
  tags: string[]
  author: string
  likes_count: number
  created_at: string
  profiles: {
    name: string | null
    avatar_url: string | null
  }
}

interface PromptListProps {
  initialPrompts: Prompt[]
  sort: 'new' | 'top' | 'trending'
}

export function PromptList({ initialPrompts, sort }: PromptListProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Reset when sort changes
  useEffect(() => {
    setPrompts(initialPrompts)
    setPage(1)
    setHasMore(true)
  }, [sort, initialPrompts])

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const response = await fetch(`/api/prompts?sort=${sort}&page=${page + 1}`)
      const data = await response.json()

      if (data.prompts && data.prompts.length > 0) {
        setPrompts((prev) => [...prev, ...data.prompts])
        setPage((prev) => prev + 1)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading more prompts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No prompts yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Be the first to share a prompt!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          id={prompt.id}
          title={prompt.title}
          body={prompt.body}
          tags={prompt.tags}
          author={{
            name: prompt.profiles?.name || null,
            avatar_url: prompt.profiles?.avatar_url || null,
          }}
          likes_count={prompt.likes_count}
          created_at={prompt.created_at}
        />
      ))}

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}
