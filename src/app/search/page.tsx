import { createClient } from '@/lib/supabase/server'
import { PromptCard } from '@/components/feed/prompt-card'
import { SearchAutocomplete } from '@/components/search/search-autocomplete'
import { AdvancedFilters, SearchFilters } from '@/components/search/advanced-filters'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SearchIcon } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('search')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    tag?: string
    model?: string
    sort?: string
    page?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const t = await getTranslations('search')
  const supabase = await createClient()

  const query = params.q || ''
  const tag = params.tag
  const model = params.model
  const sortBy = params.sort || 'relevance'
  const page = parseInt(params.page || '1')
  const perPage = 20
  const offset = (page - 1) * perPage

  // Build search query
  let promptsQuery = supabase
    .from('prompts')
    .select('*, profiles(*)', { count: 'exact' })
    .eq('is_public', true)

  // Text search
  if (query) {
    promptsQuery = promptsQuery.or(`title.ilike.%${query}%,body.ilike.%${query}%`)
  }

  // Tag filter
  if (tag) {
    promptsQuery = promptsQuery.contains('tags', [tag])
  }

  // Model filter (if stored in prompts table or tags)
  if (model) {
    promptsQuery = promptsQuery.contains('tags', [model])
  }

  // Sorting
  switch (sortBy) {
    case 'likes':
      promptsQuery = promptsQuery.order('likes_count', { ascending: false })
      break
    case 'recent':
      promptsQuery = promptsQuery.order('created_at', { ascending: false })
      break
    case 'remixes':
      promptsQuery = promptsQuery.order('remixes_count', { ascending: false })
      break
    case 'comments':
      promptsQuery = promptsQuery.order('comments_count', { ascending: false })
      break
    default: // relevance
      promptsQuery = promptsQuery.order('likes_count', { ascending: false })
  }

  // Pagination
  promptsQuery = promptsQuery.range(offset, offset + perPage - 1)

  const { data: prompts, count, error } = await promptsQuery

  const totalPages = count ? Math.ceil(count / perPage) : 1

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchAutocomplete />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            {query || tag ? (
              <span>
                {count} {t('results_for')}{' '}
                <strong className="text-foreground">
                  {query || tag}
                </strong>
              </span>
            ) : (
              <span>
                {count} {t('results_all')}
              </span>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {error ? (
          <div className="text-center py-16">
            <p className="text-destructive">{t('error')}</p>
          </div>
        ) : prompts && prompts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {prompts.map((prompt: any) => (
                <PromptCard key={prompt.id} {...prompt} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {page > 1 && (
                  <a
                    href={`/search?${new URLSearchParams({
                      ...(query && { q: query }),
                      ...(tag && { tag }),
                      ...(model && { model }),
                      ...(sortBy !== 'relevance' && { sort: sortBy }),
                      page: String(page - 1),
                    })}`}
                    className="px-4 py-2 rounded-md border hover:bg-muted transition-colors"
                  >
                    {t('previous')}
                  </a>
                )}

                <span className="text-sm text-muted-foreground">
                  {t('page_of', { current: page, total: totalPages })}
                </span>

                {page < totalPages && (
                  <a
                    href={`/search?${new URLSearchParams({
                      ...(query && { q: query }),
                      ...(tag && { tag }),
                      ...(model && { model }),
                      ...(sortBy !== 'relevance' && { sort: sortBy }),
                      page: String(page + 1),
                    })}`}
                    className="px-4 py-2 rounded-md border hover:bg-muted transition-colors"
                  >
                    {t('next')}
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">{t('no_results')}</h2>
            <p className="text-muted-foreground">
              {t('no_results_description')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
