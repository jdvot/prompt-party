'use client'

import { useState, useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Zap, Sparkles, Gift, Info } from 'lucide-react'

// ============================================================================
// MODEL DATA TYPES
// ============================================================================

export type ModelProvider = 'openai' | 'anthropic' | 'google' | 'opensource'

export type ModelBadge = 'fast' | 'powerful' | 'free' | 'balanced'

export interface AIModel {
  id: string
  name: string
  provider: ModelProvider
  contextWindow: number
  pricingTier: 'free' | 'standard' | 'premium'
  badge?: ModelBadge
  description: string
  inputPricePerMillion?: number
  outputPricePerMillion?: number
}

// ============================================================================
// MODEL CATALOG
// ============================================================================

export const AI_MODELS: AIModel[] = [
  // OpenAI Models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    contextWindow: 128000,
    pricingTier: 'premium',
    badge: 'powerful',
    description: 'Most capable multimodal model with vision and audio',
    inputPricePerMillion: 5,
    outputPricePerMillion: 15,
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    contextWindow: 8192,
    pricingTier: 'premium',
    badge: 'powerful',
    description: 'High-quality reasoning and analysis',
    inputPricePerMillion: 30,
    outputPricePerMillion: 60,
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    contextWindow: 16385,
    pricingTier: 'standard',
    badge: 'fast',
    description: 'Fast and cost-effective for simple tasks',
    inputPricePerMillion: 0.5,
    outputPricePerMillion: 1.5,
  },
  // Anthropic Models
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    contextWindow: 200000,
    pricingTier: 'premium',
    badge: 'powerful',
    description: 'Best balance of intelligence and speed',
    inputPricePerMillion: 3,
    outputPricePerMillion: 15,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    contextWindow: 200000,
    pricingTier: 'premium',
    badge: 'powerful',
    description: 'Most capable for complex analysis',
    inputPricePerMillion: 15,
    outputPricePerMillion: 75,
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    contextWindow: 200000,
    pricingTier: 'standard',
    badge: 'fast',
    description: 'Fastest responses for simple tasks',
    inputPricePerMillion: 0.25,
    outputPricePerMillion: 1.25,
  },
  // Google Models
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    contextWindow: 1000000,
    pricingTier: 'standard',
    badge: 'balanced',
    description: 'Versatile model with massive context',
    inputPricePerMillion: 1.25,
    outputPricePerMillion: 5,
  },
  {
    id: 'gemini-flash',
    name: 'Gemini Flash',
    provider: 'google',
    contextWindow: 1000000,
    pricingTier: 'standard',
    badge: 'fast',
    description: 'Ultra-fast with large context window',
    inputPricePerMillion: 0.075,
    outputPricePerMillion: 0.3,
  },
  // Open Source Models
  {
    id: 'llama-3',
    name: 'Llama 3 (70B)',
    provider: 'opensource',
    contextWindow: 8192,
    pricingTier: 'free',
    badge: 'free',
    description: 'Meta\'s powerful open-source model',
    inputPricePerMillion: 0,
    outputPricePerMillion: 0,
  },
  {
    id: 'mistral',
    name: 'Mistral Large',
    provider: 'opensource',
    contextWindow: 32768,
    pricingTier: 'free',
    badge: 'free',
    description: 'French excellence in open-source AI',
    inputPricePerMillion: 0,
    outputPricePerMillion: 0,
  },
]

// ============================================================================
// PROVIDER METADATA
// ============================================================================

export const PROVIDERS: Record<ModelProvider, { name: string; color: string; icon: string }> = {
  openai: { name: 'OpenAI', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', icon: '🟢' },
  anthropic: { name: 'Anthropic', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', icon: '🟠' },
  google: { name: 'Google', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', icon: '🔵' },
  opensource: { name: 'Open Source', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400', icon: '🟣' },
}

// ============================================================================
// BADGE CONFIGURATION
// ============================================================================

const BADGE_CONFIG: Record<ModelBadge, { icon: React.ReactNode; variant: 'default' | 'success' | 'warning' | 'info'; label: string }> = {
  fast: { icon: <Zap className="w-3 h-3" />, variant: 'warning', label: 'Fast' },
  powerful: { icon: <Sparkles className="w-3 h-3" />, variant: 'info', label: 'Powerful' },
  free: { icon: <Gift className="w-3 h-3" />, variant: 'success', label: 'Free' },
  balanced: { icon: <Info className="w-3 h-3" />, variant: 'default', label: 'Balanced' },
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function formatContextWindow(tokens: number): string {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(0)}M tokens`
  }
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(0)}K tokens`
  }
  return `${tokens} tokens`
}

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find((model) => model.id === id)
}

export function getModelsByProvider(provider: ModelProvider): AIModel[] {
  return AI_MODELS.filter((model) => model.provider === provider)
}

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

export interface ModelSelectorTranslations {
  select_model: string
  context_window: string
  pricing_tier: string
  pricing_free: string
  pricing_standard: string
  pricing_premium: string
  badge_fast: string
  badge_powerful: string
  badge_free: string
  badge_balanced: string
  per_million_tokens: string
  input: string
  output: string
}

interface ModelSelectorProps {
  value: string
  onChange: (value: string) => void
  translations?: Partial<ModelSelectorTranslations>
  className?: string
  disabled?: boolean
  showBadge?: boolean
}

// ============================================================================
// DEFAULT TRANSLATIONS
// ============================================================================

const DEFAULT_TRANSLATIONS: ModelSelectorTranslations = {
  select_model: 'Select model',
  context_window: 'Context window',
  pricing_tier: 'Pricing',
  pricing_free: 'Free',
  pricing_standard: 'Standard',
  pricing_premium: 'Premium',
  badge_fast: 'Fast',
  badge_powerful: 'Powerful',
  badge_free: 'Free',
  badge_balanced: 'Balanced',
  per_million_tokens: '/M tokens',
  input: 'Input',
  output: 'Output',
}

// ============================================================================
// MODEL SELECTOR COMPONENT
// ============================================================================

export function ModelSelector({
  value,
  onChange,
  translations: t = {},
  className,
  disabled = false,
  showBadge = true,
}: ModelSelectorProps) {
  const trans = { ...DEFAULT_TRANSLATIONS, ...t }

  const selectedModel = useMemo(() => getModelById(value), [value])

  const modelsByProvider = useMemo(() => {
    return Object.keys(PROVIDERS).reduce((acc, provider) => {
      acc[provider as ModelProvider] = getModelsByProvider(provider as ModelProvider)
      return acc
    }, {} as Record<ModelProvider, AIModel[]>)
  }, [])

  const getPricingLabel = (tier: AIModel['pricingTier']) => {
    switch (tier) {
      case 'free':
        return trans.pricing_free
      case 'standard':
        return trans.pricing_standard
      case 'premium':
        return trans.pricing_premium
    }
  }

  const getBadgeLabel = (badge: ModelBadge) => {
    switch (badge) {
      case 'fast':
        return trans.badge_fast
      case 'powerful':
        return trans.badge_powerful
      case 'free':
        return trans.badge_free
      case 'balanced':
        return trans.badge_balanced
    }
  }

  return (
    <TooltipProvider>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={cn('w-[280px]', className)}>
          <SelectValue placeholder={trans.select_model}>
            {selectedModel && (
              <div className="flex items-center gap-2">
                <span className="text-base">{PROVIDERS[selectedModel.provider].icon}</span>
                <span className="font-medium">{selectedModel.name}</span>
                {showBadge && selectedModel.badge && (
                  <Badge
                    variant={
                      selectedModel.badge === 'fast'
                        ? 'softWarning'
                        : selectedModel.badge === 'powerful'
                        ? 'softInfo'
                        : selectedModel.badge === 'free'
                        ? 'softSuccess'
                        : 'soft'
                    }
                    size="sm"
                    shape="pill"
                    startIcon={BADGE_CONFIG[selectedModel.badge].icon}
                  >
                    {getBadgeLabel(selectedModel.badge)}
                  </Badge>
                )}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[400px]">
          {(Object.keys(PROVIDERS) as ModelProvider[]).map((provider, providerIndex) => (
            <div key={provider}>
              {providerIndex > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel className={cn('flex items-center gap-2 text-sm font-semibold', PROVIDERS[provider].color)}>
                  <span>{PROVIDERS[provider].icon}</span>
                  <span>{PROVIDERS[provider].name}</span>
                </SelectLabel>
                {modelsByProvider[provider].map((model) => (
                  <Tooltip key={model.id}>
                    <TooltipTrigger asChild>
                      <SelectItem value={model.id} className="cursor-pointer">
                        <div className="flex items-center gap-2 w-full">
                          <span className="font-medium">{model.name}</span>
                          {model.badge && (
                            <Badge
                              variant={
                                model.badge === 'fast'
                                  ? 'softWarning'
                                  : model.badge === 'powerful'
                                  ? 'softInfo'
                                  : model.badge === 'free'
                                  ? 'softSuccess'
                                  : 'soft'
                              }
                              size="sm"
                              shape="pill"
                              startIcon={BADGE_CONFIG[model.badge].icon}
                            >
                              {getBadgeLabel(model.badge)}
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[300px] p-3">
                      <div className="space-y-2">
                        <p className="font-semibold">{model.name}</p>
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">{trans.context_window}:</span>
                            <span className="ml-1 font-medium">{formatContextWindow(model.contextWindow)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{trans.pricing_tier}:</span>
                            <span className="ml-1 font-medium">{getPricingLabel(model.pricingTier)}</span>
                          </div>
                          {model.inputPricePerMillion !== undefined && model.inputPricePerMillion > 0 && (
                            <>
                              <div>
                                <span className="text-muted-foreground">{trans.input}:</span>
                                <span className="ml-1 font-medium">${model.inputPricePerMillion}{trans.per_million_tokens}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">{trans.output}:</span>
                                <span className="ml-1 font-medium">${model.outputPricePerMillion}{trans.per_million_tokens}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
    </TooltipProvider>
  )
}

// ============================================================================
// MODEL CARD COMPONENT (for display purposes)
// ============================================================================

interface ModelCardProps {
  model: AIModel
  selected?: boolean
  onSelect?: (modelId: string) => void
  translations?: Partial<ModelSelectorTranslations>
  className?: string
}

export function ModelCard({
  model,
  selected = false,
  onSelect,
  translations: t = {},
  className,
}: ModelCardProps) {
  const trans = { ...DEFAULT_TRANSLATIONS, ...t }

  const getPricingLabel = (tier: AIModel['pricingTier']) => {
    switch (tier) {
      case 'free':
        return trans.pricing_free
      case 'standard':
        return trans.pricing_standard
      case 'premium':
        return trans.pricing_premium
    }
  }

  const getBadgeLabel = (badge: ModelBadge) => {
    switch (badge) {
      case 'fast':
        return trans.badge_fast
      case 'powerful':
        return trans.badge_powerful
      case 'free':
        return trans.badge_free
      case 'balanced':
        return trans.badge_balanced
    }
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(model.id)}
      className={cn(
        'w-full p-4 rounded-xl border-2 transition-all duration-200 text-left',
        'hover:shadow-md hover:-translate-y-0.5',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        selected
          ? 'border-brand-primary bg-brand-primary/5 shadow-lg shadow-brand-primary/10'
          : 'border-border bg-card hover:border-brand-primary/30',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{PROVIDERS[model.provider].icon}</span>
            <h4 className="font-semibold truncate">{model.name}</h4>
            {model.badge && (
              <Badge
                variant={
                  model.badge === 'fast'
                    ? 'softWarning'
                    : model.badge === 'powerful'
                    ? 'softInfo'
                    : model.badge === 'free'
                    ? 'softSuccess'
                    : 'soft'
                }
                size="sm"
                shape="pill"
                startIcon={BADGE_CONFIG[model.badge].icon}
              >
                {getBadgeLabel(model.badge)}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{model.description}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatContextWindow(model.contextWindow)}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{getPricingLabel(model.pricingTier)}</span>
          </div>
        </div>
        {selected && (
          <div className="shrink-0 w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </button>
  )
}

// ============================================================================
// MULTI-SELECT MODEL SELECTOR (for comparison)
// ============================================================================

interface MultiModelSelectorProps {
  selectedModels: string[]
  onChange: (models: string[]) => void
  maxSelection?: number
  translations?: Partial<ModelSelectorTranslations>
  className?: string
}

export function MultiModelSelector({
  selectedModels,
  onChange,
  maxSelection = 3,
  translations: t = {},
  className,
}: MultiModelSelectorProps) {
  const handleToggle = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      onChange(selectedModels.filter((id) => id !== modelId))
    } else if (selectedModels.length < maxSelection) {
      onChange([...selectedModels, modelId])
    }
  }

  return (
    <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {AI_MODELS.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          selected={selectedModels.includes(model.id)}
          onSelect={handleToggle}
          translations={t}
        />
      ))}
    </div>
  )
}
