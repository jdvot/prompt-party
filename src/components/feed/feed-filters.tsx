'use client'

interface FeedFiltersProps {
  activeFilter: 'new' | 'top' | 'trending'
  onFilterChange: (filter: 'new' | 'top' | 'trending') => void
}

export function FeedFilters({ activeFilter, onFilterChange }: FeedFiltersProps) {
  const filters = [
    { id: 'new' as const, label: 'New' },
    { id: 'top' as const, label: 'Top' },
    { id: 'trending' as const, label: 'Trending' },
  ]

  return (
    <div className="flex gap-2 border-b">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeFilter === filter.id
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {filter.label}
          {activeFilter === filter.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  )
}
