'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  SearchIcon,
  FilterIcon,
  StarIcon,
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  CopyIcon,
  ExternalLinkIcon,
} from 'lucide-react'
import { MarketingPromptModal } from './marketing-prompt-modal'

interface MarketingPrompt {
  id: string
  category: string
  subcategory: string | null
  title: string
  description: string | null
  prompt_text: string
  example_output: string | null
  tags: string[] | null
  use_case: string | null
  difficulty: string
  estimated_time_saved: number | null
  is_premium: boolean
  usage_count: number
  rating: number
  created_at: string
}

interface Category {
  name: string
  count: number
}

interface UsageHistory {
  prompt_id: string
  used_at: string
  rating: number | null
}

interface Props {
  initialPrompts: MarketingPrompt[]
  categories: Category[]
  usageHistory: UsageHistory[]
  userId: string
}

const CATEGORY_LABELS: Record<string, string> = {
  copywriting: 'Copywriting',
  seo: 'SEO',
  social_media: 'Social Media',
  advertising: 'Advertising',
  video: 'Video Content',
  email: 'Email Marketing',
}

const CATEGORY_ICONS: Record<string, string> = {
  copywriting: '✍️',
  seo: '🔍',
  social_media: '📱',
  advertising: '📢',
  video: '🎥',
  email: '✉️',
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-500/10 text-green-700 dark:text-green-400',
  intermediate: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  advanced: 'bg-red-500/10 text-red-700 dark:text-red-400',
}

export function MarketingLibraryClient({
  initialPrompts,
  categories,
  usageHistory,
  userId,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'recent' | 'time_saved'>('popular')
  const [selectedPrompt, setSelectedPrompt] = useState<MarketingPrompt | null>(null)

  // Filter and sort prompts
  const filteredPrompts = useMemo(() => {
    let filtered = initialPrompts

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          p.use_case?.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter((p) => p.difficulty === selectedDifficulty)
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.usage_count - a.usage_count
        case 'rating':
          return b.rating - a.rating
        case 'recent':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'time_saved':
          return (b.estimated_time_saved || 0) - (a.estimated_time_saved || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [initialPrompts, searchQuery, selectedCategory, selectedDifficulty, sortBy])

  // Check if prompt was recently used
  const isRecentlyUsed = (promptId: string) => {
    return usageHistory.some((h) => h.prompt_id === promptId)
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search prompts, tags, or use cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Categories ({initialPrompts.length})
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {CATEGORY_ICONS[cat.name]} {CATEGORY_LABELS[cat.name]} ({cat.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Tabs */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <TabsList>
                <TabsTrigger value="popular" className="gap-1.5">
                  <TrendingUpIcon className="w-3.5 h-3.5" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="rating" className="gap-1.5">
                  <StarIcon className="w-3.5 h-3.5" />
                  Top Rated
                </TabsTrigger>
                <TabsTrigger value="time_saved" className="gap-1.5">
                  <ClockIcon className="w-3.5 h-3.5" />
                  Time Saved
                </TabsTrigger>
                <TabsTrigger value="recent" className="gap-1.5">
                  <SparklesIcon className="w-3.5 h-3.5" />
                  Newest
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {CATEGORY_LABELS[selectedCategory]}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedDifficulty !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedDifficulty}
                  <button
                    onClick={() => setSelectedDifficulty('all')}
                    className="ml-1 hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedDifficulty('all')
                }}
              >
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPrompts.length} of {initialPrompts.length} prompts
        </p>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <Card
            key={prompt.id}
            className="group relative hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPrompt(prompt)}
          >
            {isRecentlyUsed(prompt.id) && (
              <div className="absolute -top-2 -right-2 z-10">
                <Badge className="bg-green-600 text-white shadow-md">
                  <CheckCircleIcon className="w-3 h-3 mr-1" />
                  Used
                </Badge>
              </div>
            )}

            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {CATEGORY_ICONS[prompt.category]} {CATEGORY_LABELS[prompt.category]}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <StarIcon className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  {prompt.rating.toFixed(1)}
                </div>
              </div>

              <CardTitle className="text-lg line-clamp-2 group-hover:text-brand-primary transition-colors">
                {prompt.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {prompt.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {/* Tags */}
                {prompt.tags && prompt.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {prompt.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="soft" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {prompt.tags.length > 3 && (
                      <Badge variant="soft" className="text-xs">
                        +{prompt.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUpIcon className="w-3.5 h-3.5" />
                    {prompt.usage_count.toLocaleString()} uses
                  </div>
                  {prompt.estimated_time_saved && (
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5" />
                      ~{prompt.estimated_time_saved}min saved
                    </div>
                  )}
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="soft"
                    className={`text-xs ${DIFFICULTY_COLORS[prompt.difficulty]}`}
                  >
                    {prompt.difficulty}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    View Prompt
                    <ExternalLinkIcon className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredPrompts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FilterIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedDifficulty('all')
              }}
            >
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <MarketingPromptModal
          prompt={selectedPrompt}
          isOpen={!!selectedPrompt}
          onClose={() => setSelectedPrompt(null)}
          userId={userId}
        />
      )}
    </div>
  )
}
