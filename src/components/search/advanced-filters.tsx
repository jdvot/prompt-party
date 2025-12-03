'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
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
import { MobileBottomSheet } from '@/components/ui/mobile-bottom-sheet'
import { FilterIcon, XIcon, CalendarIcon, SlidersHorizontal } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import type { DateRange } from 'react-day-picker'

// Hook to detect mobile viewport
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [breakpoint])

  return isMobile
}

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

const SORT_OPTIONS_KEYS = [
  { value: 'relevance', key: 'components.advancedFilters.relevant' },
  { value: 'likes', key: 'components.advancedFilters.liked' },
  { value: 'recent', key: 'components.advancedFilters.recent' },
  { value: 'remixes', key: 'components.advancedFilters.remixed' },
  { value: 'comments', key: 'components.advancedFilters.discussed' },
]

export function AdvancedFilters({ onFiltersChange }: AdvancedFiltersProps) {
  const t = useTranslations()
  const isMobile = useIsMobile()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  const SORT_OPTIONS = SORT_OPTIONS_KEYS.map(opt => ({
    value: opt.value,
    label: t(opt.key)
  }))

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

  // Filter content shared between mobile sheet and desktop popover
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Tags Section */}
      <div>
        <h4 className="font-medium mb-3 text-sm">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer touch-target-sm',
                'transition-all duration-150 active:scale-95'
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* AI Models Section */}
      <div>
        <h4 className="font-medium mb-3 text-sm">AI Models</h4>
        <div className="flex flex-wrap gap-2">
          {AI_MODELS.map((model) => (
            <Badge
              key={model}
              variant={selectedModels.includes(model) ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer touch-target-sm',
                'transition-all duration-150 active:scale-95'
              )}
              onClick={() => toggleModel(model)}
            >
              {model}
            </Badge>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <h4 className="font-medium mb-3 text-sm">Date Range</h4>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal touch-target',
                !dateRange && 'text-muted-foreground'
              )}
            >
              <span className="inline-flex items-center">
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
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={isMobile ? 1 : 2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Verified Only Toggle */}
      <div className="flex items-center justify-between py-2">
        <label className="text-sm font-medium">Verified Prompts Only</label>
        <Button
          size="sm"
          variant={verifiedOnly ? 'primary' : 'outline'}
          onClick={toggleVerified}
          className="touch-target-sm"
        >
          {verifiedOnly ? 'On' : 'Off'}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-32 sm:w-40 touch-target">
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

        {/* Mobile: Bottom Sheet Trigger */}
        {isMobile ? (
          <Button
            variant="outline"
            className="gap-2 touch-target"
            onClick={() => setMobileSheetOpen(true)}
          >
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </span>
          </Button>
        ) : (
          /* Desktop: Popover */
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <span className="inline-flex items-center gap-2">
                  <FilterIcon className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-4" align="start">
              <FilterContent />
              {/* Actions */}
              <div className="flex gap-2 pt-4 mt-4 border-t">
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
            </PopoverContent>
          </Popover>
        )}

        {/* Active Filters Display - Hidden on mobile, shown inline on desktop */}
        {activeFilterCount > 0 && !isMobile && (
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

      {/* Mobile: Active filters in horizontal scroll */}
      {activeFilterCount > 0 && isMobile && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 flex-shrink-0 touch-target-sm">
              {tag}
              <XIcon
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleTag(tag)}
              />
            </Badge>
          ))}
          {selectedModels.map((model) => (
            <Badge key={model} variant="secondary" className="gap-1 flex-shrink-0 touch-target-sm">
              {model}
              <XIcon
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleModel(model)}
              />
            </Badge>
          ))}
          {dateRange?.from && (
            <Badge variant="secondary" className="gap-1 flex-shrink-0 touch-target-sm">
              {format(dateRange.from, 'MMM d')}
              {dateRange.to && ` - ${format(dateRange.to, 'MMM d')}`}
              <XIcon
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleDateRangeChange(undefined)}
              />
            </Badge>
          )}
          {verifiedOnly && (
            <Badge variant="secondary" className="gap-1 flex-shrink-0 touch-target-sm">
              Verified
              <XIcon
                className="w-3 h-3 cursor-pointer"
                onClick={toggleVerified}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      <MobileBottomSheet
        open={mobileSheetOpen}
        onOpenChange={setMobileSheetOpen}
        title="Filters"
        description="Refine your search results"
        maxHeight="80vh"
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 touch-target"
              onClick={() => {
                clearAllFilters()
                setMobileSheetOpen(false)
              }}
            >
              Clear All
            </Button>
            <Button
              className="flex-1 touch-target"
              onClick={() => setMobileSheetOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        }
      >
        <FilterContent />
      </MobileBottomSheet>
    </div>
  )
}
