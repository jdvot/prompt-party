'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Sparkles, Lightbulb, TrendingUp, AlertCircle, CheckCircle2, Wand2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Suggestion {
  type: 'improvement' | 'warning' | 'success'
  title: string
  description: string
  example?: string
}

interface OptimizationResult {
  score: number
  suggestions: Suggestion[]
  optimizedPrompt: string
  improvements: string[]
}

interface PromptOptimizerProps {
  promptContent: string
  onApply?: (optimizedContent: string) => void
}

export function PromptOptimizer({ promptContent, onApply }: PromptOptimizerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<OptimizationResult | null>(null)

  const analyzePrompt = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/optimize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptContent }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error optimizing prompt:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    if (result?.optimizedPrompt && onApply) {
      onApply(result.optimizedPrompt)
      setIsOpen(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 btn-smooth-hover" onClick={analyzePrompt}>
          <Wand2 className="w-4 h-4" />
          AI Optimizer
          <Badge variant="secondary" className="ml-1">Pro</Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Prompt Optimizer
          </DialogTitle>
          <DialogDescription>
            Get AI-powered suggestions to improve your prompt's clarity, effectiveness, and engagement
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4" />
            <p className="text-sm text-muted-foreground">Analyzing your prompt...</p>
          </div>
        ) : result ? (
          <div className="space-y-6 mt-4">
            {/* Score Card */}
            <Card className="p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-gray-800 dark:to-gray-900 border-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Prompt Quality Score</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on clarity, specificity, and best practices
                  </p>
                </div>
                <div className="text-center">
                  <div className={`text-5xl font-bold bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent`}>
                    {result.score}
                  </div>
                  <Badge className={`mt-2 bg-gradient-to-r ${getScoreColor(result.score)}`}>
                    {getScoreLabel(result.score)}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreColor(result.score)} transition-all duration-500`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </Card>

            <Tabs defaultValue="suggestions" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="suggestions">
                  Suggestions ({result.suggestions.length})
                </TabsTrigger>
                <TabsTrigger value="optimized">Optimized Version</TabsTrigger>
                <TabsTrigger value="improvements">Key Improvements</TabsTrigger>
              </TabsList>

              {/* Suggestions Tab */}
              <TabsContent value="suggestions" className="space-y-3 mt-4">
                {result.suggestions.map((suggestion, index) => {
                  const Icon =
                    suggestion.type === 'success'
                      ? CheckCircle2
                      : suggestion.type === 'warning'
                      ? AlertCircle
                      : Lightbulb

                  const colorClass =
                    suggestion.type === 'success'
                      ? 'text-green-600 dark:text-green-400'
                      : suggestion.type === 'warning'
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-blue-600 dark:text-blue-400'

                  return (
                    <Card key={index} className="p-4">
                      <div className="flex gap-3">
                        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${colorClass}`} />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {suggestion.description}
                          </p>
                          {suggestion.example && (
                            <div className="mt-2 p-3 bg-muted/50 rounded-md">
                              <p className="text-xs text-muted-foreground mb-1">
                                Example:
                              </p>
                              <code className="text-sm">{suggestion.example}</code>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </TabsContent>

              {/* Optimized Version Tab */}
              <TabsContent value="optimized" className="mt-4">
                <Card className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">AI-Optimized Prompt</h3>
                    <p className="text-sm text-muted-foreground">
                      This version incorporates all suggested improvements
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <pre className="whitespace-pre-wrap text-sm">
                      {result.optimizedPrompt}
                    </pre>
                  </div>
                  {onApply && (
                    <Button onClick={handleApply} className="btn-primary w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Apply Optimized Version
                    </Button>
                  )}
                </Card>
              </TabsContent>

              {/* Improvements Tab */}
              <TabsContent value="improvements" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Key Improvements Made</h3>
                  <ul className="space-y-3">
                    {result.improvements.map((improvement, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Info Banner */}
            <div className="p-4 bg-info/10 border border-info/20 rounded-md">
              <p className="text-sm text-info-foreground">
                <strong>💡 Pro Tip:</strong> These suggestions are AI-generated based on prompt
                engineering best practices. Review them carefully and adapt them to your specific
                use case.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Wand2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              Click Analyze to get AI-powered suggestions
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
