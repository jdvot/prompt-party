'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlayIcon, StopCircleIcon, SparklesIcon } from 'lucide-react'

interface PromptPlaygroundProps {
  promptContent: string
  userId?: string
}

export function PromptPlayground({ promptContent, userId }: PromptPlaygroundProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [model, setModel] = React.useState<'gpt-4' | 'claude-3' | 'gemini-pro'>('gpt-4')
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [creditsUsed, setCreditsUsed] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)

  const models = [
    { id: 'gpt-4' as const, name: 'GPT-4', badge: 'OpenAI' },
    { id: 'claude-3' as const, name: 'Claude 3', badge: 'Anthropic' },
    { id: 'gemini-pro' as const, name: 'Gemini Pro', badge: 'Google' },
  ]

  const testPrompt = async () => {
    if (!userId) {
      setError('Please sign in to test prompts')
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
        className="w-full md:w-auto"
        variant="outline"
      >
        <SparklesIcon className="w-4 h-4 mr-2" />
        Test with AI
        <Badge variant="secondary" className="ml-2 text-xs">
          Premium
        </Badge>
      </Button>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Prompt Tester</h3>
          <Badge variant="secondary" className="text-xs">Premium</Badge>
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
        <label className="text-sm font-medium mb-2 block">AI Model</label>
        <div className="flex gap-2">
          {models.map((m) => (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              className={`flex-1 px-4 py-2 rounded-md border transition-colors ${
                model === m.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-input hover:bg-muted'
              }`}
            >
              <div className="font-medium text-sm">{m.name}</div>
              <div className="text-xs opacity-70">{m.badge}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-2 block">Test Input (Optional)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add any variables or context for your prompt..."
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
              Testing...
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4 mr-2" />
              Test Prompt
            </>
          )}
        </Button>
        {!userId && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Sign in to test prompts
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
            <label className="text-sm font-medium">AI Response</label>
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
          <strong>💡 Pro Tip:</strong> Testing helps you optimize prompts before sharing.
          Free: 10 tests/month. Pro: Unlimited.{' '}
          <a href="/pricing" className="underline font-medium">Upgrade</a>
        </p>
      </div>
    </div>
  )
}
