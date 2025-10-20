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
      <div className="text-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📝</span>
        </div>
        <p className="text-muted-foreground text-lg font-medium mb-2">No prompts yet</p>
        <p className="text-sm text-muted-foreground">
          Be the first to share a prompt with the community!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {prompts.map((prompt, index) => (
        <div
          key={prompt.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <PromptCard
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
        </div>
      ))}

      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
