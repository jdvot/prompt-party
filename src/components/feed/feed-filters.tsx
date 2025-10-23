'use client'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface FeedFiltersProps {
  activeFilter: 'new' | 'top' | 'trending'
  onFilterChange: (filter: 'new' | 'top' | 'trending') => void
}

export function FeedFilters({ activeFilter, onFilterChange }: FeedFiltersProps) {
  const t = useTranslations('common')

  const filters = [
    { id: 'new' as const, label: t('new'), icon: '✨' },
    { id: 'top' as const, label: t('top'), icon: '🔥' },
    { id: 'trending' as const, label: t('trending'), icon: '📈' },
  ]

  return (
    <div className="flex gap-2 border-b bg-background/50 backdrop-blur-sm rounded-t-lg overflow-hidden">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 relative',
            activeFilter === filter.id
              ? 'text-primary bg-primary/5'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          <span className="text-base">{filter.icon}</span>
          <span>{filter.label}</span>
          {activeFilter === filter.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-left duration-200" />
          )}
        </button>
      ))}
    </div>
  )
}
