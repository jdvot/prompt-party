'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlayIcon, StopCircleIcon, SparklesIcon } from 'lucide-react'

interface PromptPlaygroundProps {
  promptContent: string
  userId?: string
}

export function PromptPlayground({ promptContent, userId }: PromptPlaygroundProps) {
  const t = useTranslations()
  const [isOpen, setIsOpen] = React.useState(false)
  const [model, setModel] = React.useState<'gpt-4' | 'claude-3' | 'gemini-1.5-pro'>('gpt-4')
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [creditsUsed, setCreditsUsed] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)

  const models = [
    { id: 'gpt-4' as const, name: 'GPT-4', badge: 'OpenAI', color: 'from-emerald-500 to-teal-600' },
    { id: 'claude-3' as const, name: 'Claude 3', badge: 'Anthropic', color: 'from-orange-500 to-amber-600' },
    { id: 'gemini-1.5-pro' as const, name: 'Gemini 1.5 Pro', badge: 'Google', color: 'from-blue-500 to-violet-600' },
  ]

  const testPrompt = async () => {
    if (!userId) {
      setError(t('components.promptPlayground.signInRequired'))
      return
    }

    setLoading(true)
    setError(null)
    setOutput('')

    try {
      const response = await fetch('/api/ai/test-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptContent,
          input,
          model,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to test prompt')
      }

      setOutput(data.output)
      setCreditsUsed(data.creditsUsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto flex items-center mt-2"
        variant="outline"
      >
        <SparklesIcon className="w-4 h-4 mr-2" />
        {t('aiTester.buttonLabel')}
        <Badge variant="secondary" className="ml-2 text-xs inline-flex items-center">
          {t('aiTester.premiumBadge')}
        </Badge>
      </Button>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">{t('aiTester.title')}</h3>
          <Badge variant="secondary" className="text-xs">{t('aiTester.premiumBadge')}</Badge>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Model Selection */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">{t('aiTester.modelLabel')}</label>
        <div className="grid grid-cols-3 gap-2">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              className={`px-3 py-3 rounded-lg border transition-all ${
                model === m.id
                  ? `bg-gradient-to-br ${m.color} text-white border-transparent shadow-lg scale-105`
                  : 'bg-background border-input hover:bg-muted hover:border-primary/30'
              }`}
            >
              <div className="font-medium text-sm">{m.name}</div>
              <div className={`text-xs mt-1 ${model === m.id ? 'opacity-90' : 'opacity-60'}`}>
                {m.badge}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">{t('components.promptPlayground.inputLabel')}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('components.promptPlayground.inputPlaceholder')}
          className="w-full px-3 py-2 bg-background border border-input rounded-md min-h-[100px] resize-y"
        />
      </div>

      {/* Test Button */}
      <div className="mb-4">
        <Button
          onClick={testPrompt}
          disabled={loading || !userId}
          className="w-full"
        >
          {loading ? (
            <>
              <StopCircleIcon className="w-4 h-4 mr-2 animate-spin" />
              {t('components.promptPlayground.testing')}
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4 mr-2" />
              {t('components.promptPlayground.testButton')}
            </>
          )}
        </Button>
        {!userId && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {t('components.promptPlayground.signInToTest')}
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">{t('components.promptPlayground.aiResponse')}</label>
            {creditsUsed > 0 && (
              <span className="text-xs text-muted-foreground">
                -{creditsUsed} credit{creditsUsed !== 1 && 's'}
              </span>
            )}
          </div>
          <div className="bg-muted/30 border rounded-md p-4 min-h-[200px] whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-3 bg-info/10 border border-info/20 rounded-md">
        <p className="text-xs text-info-foreground">
          <strong>{t('components.promptPlayground.proTipTitle')}</strong> {t('components.promptPlayground.proTipText')}{' '}
          <a href="/pricing" className="underline font-medium">{t('components.promptPlayground.upgradeLink')}</a>
        </p>
      </div>
    </div>
  )
}
