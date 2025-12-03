'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  Clock,
  Hash,
  RefreshCw,
  Copy,
  Check,
  X,
  Plus,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import {
  AI_MODELS,
  PROVIDERS,
  getModelById,
  formatContextWindow,
  type AIModel,
} from './model-selector'

// ============================================================================
// TYPES
// ============================================================================

export interface ModelResponse {
  modelId: string
  response: string
  responseTime: number // in milliseconds
  tokensUsed: {
    input: number
    output: number
    total: number
  }
  error?: string
  isLoading?: boolean
}

export interface ModelComparisonTranslations {
  compare_models: string
  add_model: string
  remove_model: string
  response_time: string
  tokens_used: string
  input_tokens: string
  output_tokens: string
  total_tokens: string
  run_comparison: string
  running: string
  copy_response: string
  copied: string
  error_occurred: string
  retry: string
  no_response: string
  select_models_to_compare: string
  max_models_selected: string
  collapse: string
  expand: string
  milliseconds: string
  seconds: string
  clear_all: string
  waiting_for_prompt: string
}

// ============================================================================
// DEFAULT TRANSLATIONS
// ============================================================================

const DEFAULT_TRANSLATIONS: ModelComparisonTranslations = {
  compare_models: 'Compare Models',
  add_model: 'Add Model',
  remove_model: 'Remove',
  response_time: 'Response Time',
  tokens_used: 'Tokens Used',
  input_tokens: 'Input',
  output_tokens: 'Output',
  total_tokens: 'Total',
  run_comparison: 'Run Comparison',
  running: 'Running...',
  copy_response: 'Copy',
  copied: 'Copied!',
  error_occurred: 'Error occurred',
  retry: 'Retry',
  no_response: 'No response yet',
  select_models_to_compare: 'Select models to compare',
  max_models_selected: 'Maximum {max} models can be selected',
  collapse: 'Collapse',
  expand: 'Expand',
  milliseconds: 'ms',
  seconds: 's',
  clear_all: 'Clear All',
  waiting_for_prompt: 'Waiting for prompt...',
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatResponseTime(ms: number): string {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)}s`
  }
  return `${Math.round(ms)}ms`
}

function formatTokenCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

// ============================================================================
// RESPONSE CARD COMPONENT
// ============================================================================

interface ResponseCardProps {
  model: AIModel
  response?: ModelResponse
  onRemove?: () => void
  onRetry?: () => void
  onCopy?: () => void
  translations: ModelComparisonTranslations
  className?: string
  collapsible?: boolean
}

function ResponseCard({
  model,
  response,
  onRemove,
  onRetry,
  onCopy,
  translations: t,
  className,
  collapsible = false,
}: ResponseCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (response?.response) {
      await navigator.clipboard.writeText(response.response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onCopy?.()
    }
  }

  const isLoading = response?.isLoading
  const hasError = response?.error
  const hasResponse = response?.response && !hasError

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        hasError && 'border-destructive/50',
        hasResponse && 'border-success/30',
        className
      )}
    >
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg shrink-0">{PROVIDERS[model.provider].icon}</span>
            <CardTitle className="text-base font-semibold truncate">
              {model.name}
            </CardTitle>
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
              >
                {model.badge}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {collapsible && hasResponse && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? t.expand : t.collapse}
              >
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </Button>
            )}
            {onRemove && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={onRemove}
                aria-label={t.remove_model}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Metrics Bar */}
        {(hasResponse || isLoading) && !isCollapsed && (
          <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {isLoading ? (
                      <Skeleton className="h-3 w-12" />
                    ) : (
                      <span className="font-medium">
                        {formatResponseTime(response?.responseTime || 0)}
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.response_time}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5" />
                    {isLoading ? (
                      <Skeleton className="h-3 w-16" />
                    ) : (
                      <span className="font-medium">
                        {formatTokenCount(response?.tokensUsed.total || 0)} tokens
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">{t.tokens_used}</p>
                    <div className="text-xs space-y-0.5">
                      <p>{t.input_tokens}: {formatTokenCount(response?.tokensUsed.input || 0)}</p>
                      <p>{t.output_tokens}: {formatTokenCount(response?.tokensUsed.output || 0)}</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Response Content */}
        <div
          className={cn(
            'transition-all duration-300',
            isCollapsed && 'max-h-0 overflow-hidden'
          )}
        >
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : hasError ? (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium">{t.error_occurred}</p>
                <p className="text-sm truncate">{response?.error}</p>
              </div>
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                  className="shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  {t.retry}
                </Button>
              )}
            </div>
          ) : hasResponse ? (
            <div className="relative group">
              <div className="p-4 rounded-lg bg-muted/50 border text-sm whitespace-pre-wrap font-mono max-h-[300px] overflow-auto">
                {response.response}
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1.5" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    {t.copy_response}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 rounded-lg bg-muted/30 border border-dashed text-muted-foreground">
              <Sparkles className="w-5 h-5 mr-2 opacity-50" />
              <span>{t.waiting_for_prompt}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// MODEL COMPARISON COMPONENT
// ============================================================================

interface ModelComparisonProps {
  selectedModels: string[]
  responses: Map<string, ModelResponse>
  onRemoveModel?: (modelId: string) => void
  onRetry?: (modelId: string) => void
  translations?: Partial<ModelComparisonTranslations>
  className?: string
  layout?: 'grid' | 'stack'
  maxColumns?: 2 | 3
}

export function ModelComparison({
  selectedModels,
  responses,
  onRemoveModel,
  onRetry,
  translations: t = {},
  className,
  layout = 'grid',
  maxColumns = 3,
}: ModelComparisonProps) {
  const trans = { ...DEFAULT_TRANSLATIONS, ...t }

  const models = useMemo(() => {
    return selectedModels
      .map((id) => getModelById(id))
      .filter((model): model is AIModel => model !== undefined)
  }, [selectedModels])

  if (models.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-muted/30 border border-dashed text-center">
        <Sparkles className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-semibold text-lg mb-2">{trans.compare_models}</h3>
        <p className="text-muted-foreground max-w-md">
          {trans.select_models_to_compare}
        </p>
      </div>
    )
  }

  const gridCols =
    layout === 'stack'
      ? 'grid-cols-1'
      : models.length === 1
      ? 'grid-cols-1'
      : models.length === 2
      ? 'md:grid-cols-2'
      : maxColumns === 2
      ? 'md:grid-cols-2'
      : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={cn('grid gap-4', gridCols, className)}>
      {models.map((model) => (
        <ResponseCard
          key={model.id}
          model={model}
          response={responses.get(model.id)}
          onRemove={onRemoveModel ? () => onRemoveModel(model.id) : undefined}
          onRetry={onRetry ? () => onRetry(model.id) : undefined}
          translations={trans}
          collapsible={layout === 'stack'}
        />
      ))}
    </div>
  )
}

// ============================================================================
// COMPARISON SUMMARY COMPONENT
// ============================================================================

interface ComparisonSummaryProps {
  responses: Map<string, ModelResponse>
  translations?: Partial<ModelComparisonTranslations>
  className?: string
}

export function ComparisonSummary({
  responses,
  translations: t = {},
  className,
}: ComparisonSummaryProps) {
  const trans = { ...DEFAULT_TRANSLATIONS, ...t }

  const stats = useMemo(() => {
    const validResponses = Array.from(responses.values()).filter(
      (r) => r.response && !r.error && !r.isLoading
    )

    if (validResponses.length === 0) return null

    const fastestResponse = validResponses.reduce((prev, curr) =>
      curr.responseTime < prev.responseTime ? curr : prev
    )

    const cheapestResponse = validResponses.reduce((prev, curr) =>
      curr.tokensUsed.total < prev.tokensUsed.total ? curr : prev
    )

    const longestResponse = validResponses.reduce((prev, curr) =>
      curr.response.length > prev.response.length ? curr : prev
    )

    return {
      fastest: {
        model: getModelById(fastestResponse.modelId),
        time: fastestResponse.responseTime,
      },
      cheapest: {
        model: getModelById(cheapestResponse.modelId),
        tokens: cheapestResponse.tokensUsed.total,
      },
      longest: {
        model: getModelById(longestResponse.modelId),
        length: longestResponse.response.length,
      },
    }
  }, [responses])

  if (!stats) return null

  return (
    <div className={cn('grid gap-3 sm:grid-cols-3', className)}>
      {/* Fastest */}
      <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Fastest</span>
          </div>
          <div className="flex items-center gap-2">
            {stats.fastest.model && (
              <>
                <span className="text-base">{PROVIDERS[stats.fastest.model.provider].icon}</span>
                <span className="font-semibold truncate">{stats.fastest.model.name}</span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {formatResponseTime(stats.fastest.time)}
          </p>
        </CardContent>
      </Card>

      {/* Most Efficient */}
      <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
            <Hash className="w-4 h-4" />
            <span className="text-sm font-medium">Most Efficient</span>
          </div>
          <div className="flex items-center gap-2">
            {stats.cheapest.model && (
              <>
                <span className="text-base">{PROVIDERS[stats.cheapest.model.provider].icon}</span>
                <span className="font-semibold truncate">{stats.cheapest.model.name}</span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {formatTokenCount(stats.cheapest.tokens)} tokens
          </p>
        </CardContent>
      </Card>

      {/* Most Detailed */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Most Detailed</span>
          </div>
          <div className="flex items-center gap-2">
            {stats.longest.model && (
              <>
                <span className="text-base">{PROVIDERS[stats.longest.model.provider].icon}</span>
                <span className="font-semibold truncate">{stats.longest.model.name}</span>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {stats.longest.length.toLocaleString()} characters
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export { ResponseCard, formatResponseTime, formatTokenCount }
export type { ResponseCardProps, ModelComparisonProps, ComparisonSummaryProps }
