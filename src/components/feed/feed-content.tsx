'use client'

import { useState } from 'react'
import { FeedFilters } from './feed-filters'
import { PromptList } from './prompt-list'

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

interface FeedContentProps {
  initialPrompts: Prompt[]
}

export function FeedContent({ initialPrompts }: FeedContentProps) {
  const [activeFilter, setActiveFilter] = useState<'new' | 'top' | 'trending'>('new')
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [loading, setLoading] = useState(false)

  const handleFilterChange = async (filter: 'new' | 'top' | 'trending') => {
    if (filter === activeFilter) return

    setActiveFilter(filter)
    setLoading(true)

    try {
      const response = await fetch(`/api/prompts?sort=${filter}&page=1`)
      const data = await response.json()
      setPrompts(data.prompts || [])
    } catch (error) {
      console.error('Error fetching prompts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <FeedFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <PromptList initialPrompts={prompts} sort={activeFilter} />
      )}
    </div>
  )
}
