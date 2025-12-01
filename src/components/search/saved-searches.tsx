'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import {
  Star,
  Trash2,
  Search,
  Plus,
  Clock,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SavedSearch {
  id: string
  name: string
  query: string
  filters: {
    tags?: string[]
    models?: string[]
    sortBy?: string
  }
  createdAt: string
}

export function SavedSearches() {
  const t = useTranslations()
  const { toast } = useToast()
  const router = useRouter()
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('savedSearches')
    if (saved) {
      setSavedSearches(JSON.parse(saved))
    }
  }, [])

  const saveCurrentSearch = () => {
    if (!searchName.trim()) {
      toast({
        variant: 'destructive',
        title: t('components.savedSearches.nameRequired'),
        description: t('components.savedSearches.nameRequiredDesc'),
      })
      return
    }

    // Get current URL params
    const params = new URLSearchParams(window.location.search)
    const query = params.get('q') || ''
    const tags = params.getAll('tag')
    const models = params.getAll('model')
    const sortBy = params.get('sort') || 'relevance'

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: searchName,
      query,
      filters: { tags, models, sortBy },
      createdAt: new Date().toISOString(),
    }

    const updated = [newSearch, ...savedSearches]
    setSavedSearches(updated)
    localStorage.setItem('savedSearches', JSON.stringify(updated))
    setSearchName('')

    toast({
      title: t('components.savedSearches.searchSaved'),
      description: t('components.savedSearches.searchSavedDesc', { name: searchName }),
    })
  }

  const deleteSearch = (id: string) => {
    const updated = savedSearches.filter((s) => s.id !== id)
    setSavedSearches(updated)
    localStorage.setItem('savedSearches', JSON.stringify(updated))
    toast({ title: t('components.savedSearches.searchDeleted') })
  }

  const runSearch = (search: SavedSearch) => {
    const params = new URLSearchParams()
    if (search.query) params.set('q', search.query)
    if (search.filters.sortBy) params.set('sort', search.filters.sortBy)
    search.filters.tags?.forEach((tag) => params.append('tag', tag))
    search.filters.models?.forEach((model) => params.append('model', model))

    router.push(`/search?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          {t('components.savedSearches.title')}
        </CardTitle>
        <CardDescription>{t('components.savedSearches.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Save Current Search */}
        <div className="flex gap-2">
          <Input
            placeholder={t('components.savedSearches.namePlaceholder')}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveCurrentSearch()}
          />
          <Button onClick={saveCurrentSearch}>
            <Plus className="w-4 h-4 mr-2" />
            {t('components.savedSearches.saveButton')}
          </Button>
        </div>

        {/* Saved Searches List */}
        {savedSearches.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">{t('components.savedSearches.noSearches')}</p>
            <p className="text-xs">{t('components.savedSearches.noSearchesDesc')}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {savedSearches.map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{search.name}</h4>
                    {search.query && (
                      <Badge variant="secondary" className="text-xs">
                        {search.query}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {search.filters.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {search.filters.models?.map((model) => (
                      <Badge key={model} variant="outline" className="text-xs">
                        {model}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(search.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 ml-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => runSearch(search)}
                  >
                    <Search className="w-3 h-3 mr-1" />
                    {t('components.savedSearches.runButton')}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteSearch(search.id)}
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
