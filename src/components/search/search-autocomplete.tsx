'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SearchIcon, ClockIcon, TagIcon, FileTextIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type SearchResult = {
  type: 'prompt' | 'tag' | 'recent'
  id: string
  title: string
  subtitle?: string
  icon: typeof FileTextIcon
}

export function SearchAutocomplete() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Load recent searches from localStorage
  useEffect(() => {
    const recent = localStorage.getItem('recentSearches')
    if (recent) {
      setRecentSearches(JSON.parse(recent))
    }
  }, [])

  // Search for prompts and tags
  useEffect(() => {
    if (query.trim().length === 0) {
      // Show recent searches when empty
      setResults(
        recentSearches.slice(0, 5).map((search) => ({
          type: 'recent' as const,
          id: search,
          title: search,
          icon: ClockIcon,
        }))
      )
      return
    }

    const searchTimeout = setTimeout(async () => {
      const searchResults: SearchResult[] = []

      // Search prompts
      const { data: prompts } = await supabase
        .from('prompts')
        .select('id, title, body')
        .or(`title.ilike.%${query}%,body.ilike.%${query}%`)
        .eq('visibility', 'public')
        .limit(5)

      if (prompts) {
        prompts.forEach((prompt) => {
          searchResults.push({
            type: 'prompt',
            id: prompt.id,
            title: prompt.title,
            subtitle: prompt.body.substring(0, 60) + '...',
            icon: FileTextIcon,
          })
        })
      }

      // Search tags (extract unique tags from all prompts)
      const { data: taggedPrompts } = await supabase
        .from('prompts')
        .select('tags')
        .not('tags', 'is', null)
        .eq('visibility', 'public')

      if (taggedPrompts) {
        const allTags = new Set<string>()
        taggedPrompts.forEach((p: any) => {
          if (p.tags) {
            p.tags.forEach((tag: string) => {
              if (tag.toLowerCase().includes(query.toLowerCase())) {
                allTags.add(tag)
              }
            })
          }
        })

        Array.from(allTags)
          .slice(0, 3)
          .forEach((tag) => {
            searchResults.push({
              type: 'tag',
              id: tag,
              title: tag,
              subtitle: `Search by tag`,
              icon: TagIcon,
            })
          })
      }

      setResults(searchResults)
      setSelectedIndex(0)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query, supabase, recentSearches])

  const saveRecentSearch = (search: string) => {
    const updated = [search, ...recentSearches.filter((s) => s !== search)].slice(0, 10)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
    setResults([])
  }

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'prompt') {
      saveRecentSearch(result.title)
      router.push(`/prompts/${result.id}`)
    } else if (result.type === 'tag') {
      saveRecentSearch(result.title)
      router.push(`/?tag=${encodeURIComponent(result.title)}`)
    } else if (result.type === 'recent') {
      setQuery(result.title)
      inputRef.current?.focus()
    }
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && e.key !== 'Escape') {
      setIsOpen(true)
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search prompts, tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border border-input rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {query.trim().length === 0 && recentSearches.length > 0 && (
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="text-xs text-muted-foreground font-medium">Recent Searches</span>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
          )}

          {results.map((result, index) => {
            const Icon = result.icon
            return (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleSelect(result)}
                className={`w-full flex items-start gap-3 px-3 py-2 text-left transition-colors ${
                  index === selectedIndex
                    ? 'bg-primary/10'
                    : 'hover:bg-muted/50'
                }`}
              >
                <Icon
                  className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                    index === selectedIndex ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{result.title}</div>
                  {result.subtitle && (
                    <div className="text-xs text-muted-foreground truncate">
                      {result.subtitle}
                    </div>
                  )}
                </div>
              </button>
            )
          })}

          {query && results.length === 0 && (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  )
}
