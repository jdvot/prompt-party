'use client'

import { useEffect, useState } from 'react'
import { PromptCard } from './prompt-card'
import { PromptCardSkeleton } from './prompt-card-skeleton'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('prompts')
  const tHome = useTranslations('home')

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
        <p className="text-muted-foreground text-lg font-medium mb-2">{t('empty_state')}</p>
        <p className="text-sm text-muted-foreground">
          {tHome('empty_feed')}
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

      {loading && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <PromptCardSkeleton key={`skeleton-${i}`} />
          ))}
        </>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center pt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            {t('load_more')}
          </button>
        </div>
      )}
    </div>
  )
}
