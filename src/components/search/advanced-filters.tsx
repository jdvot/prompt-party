'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { FilterIcon, XIcon, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import type { DateRange } from 'react-day-picker'

interface AdvancedFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void
}

export interface SearchFilters {
  tags: string[]
  models: string[]
  sortBy: string
  dateRange?: DateRange
  verifiedOnly: boolean
}

const POPULAR_TAGS = [
  'content-writing',
  'coding',
  'marketing',
  'business',
  'creative',
  'education',
  'productivity',
  'data-analysis',
  'design',
  'research',
  'seo',
  'social-media',
]

const AI_MODELS = [
  'ChatGPT-4',
  'ChatGPT-3.5',
  'Claude 3',
  'Claude 2',
  'Gemini Pro',
  'GPT-4 Turbo',
  'Llama 2',
]

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'likes', label: 'Most Liked' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'remixes', label: 'Most Remixed' },
  { value: 'comments', label: 'Most Discussed' },
]

export function AdvancedFilters({ onFiltersChange }: AdvancedFiltersProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]

    setSelectedTags(newTags)
    applyFilters(newTags, selectedModels, sortBy, dateRange, verifiedOnly)
  }

  const toggleModel = (model: string) => {
    const newModels = selectedModels.includes(model)
      ? selectedModels.filter((m) => m !== model)
      : [...selectedModels, model]

    setSelectedModels(newModels)
    applyFilters(selectedTags, newModels, sortBy, dateRange, verifiedOnly)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    applyFilters(selectedTags, selectedModels, value, dateRange, verifiedOnly)
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
    applyFilters(selectedTags, selectedModels, sortBy, range, verifiedOnly)
  }

  const toggleVerified = () => {
    const newVerified = !verifiedOnly
    setVerifiedOnly(newVerified)
    applyFilters(selectedTags, selectedModels, sortBy, dateRange, newVerified)
  }

  const applyFilters = (
    tags: string[],
    models: string[],
    sort: string,
    range: DateRange | undefined,
    verified: boolean
  ) => {
    onFiltersChange({
      tags,
      models,
      sortBy: sort,
      dateRange: range,
      verifiedOnly: verified,
    })
  }

  const clearAllFilters = () => {
    setSelectedTags([])
    setSelectedModels([])
    setSortBy('relevance')
    setDateRange(undefined)
    setVerifiedOnly(false)
    applyFilters([], [], 'relevance', undefined, false)
  }

  const activeFilterCount =
    selectedTags.length +
    selectedModels.length +
    (sortBy !== 'relevance' ? 1 : 0) +
    (dateRange ? 1 : 0) +
    (verifiedOnly ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Advanced Filters Button */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FilterIcon className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4" align="start">
            <div className="space-y-4">
              {/* Tags Section */}
              <div>
                <h4 className="font-medium mb-2 text-sm">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* AI Models Section */}
              <div>
                <h4 className="font-medium mb-2 text-sm">AI Models</h4>
                <div className="flex flex-wrap gap-2">
                  {AI_MODELS.map((model) => (
                    <Badge
                      key={model}
                      variant={selectedModels.includes(model) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleModel(model)}
                    >
                      {model}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <h4 className="font-medium mb-2 text-sm">Date Range</h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !dateRange && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'LLL dd, y')} -{' '}
                            {format(dateRange.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(dateRange.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={handleDateRangeChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Verified Only Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Verified Prompts Only</label>
                <Button
                  size="sm"
                  variant={verifiedOnly ? 'primary' : 'outline'}
                  onClick={toggleVerified}
                >
                  {verifiedOnly ? 'On' : 'Off'}
                </Button>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <XIcon
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => toggleTag(tag)}
                />
              </Badge>
            ))}
            {selectedModels.map((model) => (
              <Badge key={model} variant="secondary" className="gap-1">
                {model}
                <XIcon
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => toggleModel(model)}
                />
              </Badge>
            ))}
            {dateRange?.from && (
              <Badge variant="secondary" className="gap-1">
                {format(dateRange.from, 'MMM d')}
                {dateRange.to && ` - ${format(dateRange.to, 'MMM d')}`}
                <XIcon
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleDateRangeChange(undefined)}
                />
              </Badge>
            )}
            {verifiedOnly && (
              <Badge variant="secondary" className="gap-1">
                Verified
                <XIcon
                  className="w-3 h-3 cursor-pointer"
                  onClick={toggleVerified}
                />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
