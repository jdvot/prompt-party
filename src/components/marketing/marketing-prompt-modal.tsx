'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import {
  CopyIcon,
  CheckIcon,
  StarIcon,
  ClockIcon,
  TrendingUpIcon,
  SparklesIcon,
  BookOpenIcon,
  CodeIcon,
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface MarketingPrompt {
  id: string
  category: string
  subcategory: string | null
  title: string
  description: string | null
  prompt_text: string
  example_output: string | null
  tags: string[] | null
  use_case: string | null
  difficulty: string
  estimated_time_saved: number | null
  usage_count: number
  rating: number
}

interface Props {
  prompt: MarketingPrompt
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function MarketingPromptModal({ prompt, isOpen, onClose, userId }: Props) {
  const [copied, setCopied] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [isUsing, setIsUsing] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt_text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: 'Copied to clipboard!',
      description: 'Prompt text has been copied. Paste it into your AI chat.',
    })
  }

  const handleUsePrompt = async () => {
    setIsUsing(true)

    try {
      // Track usage
      const response = await fetch('/api/marketing/track-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt_id: prompt.id,
          user_id: userId,
        }),
      })

      if (!response.ok) throw new Error('Failed to track usage')

      // Copy to clipboard
      await handleCopy()

      toast({
        title: 'Ready to use!',
        description: `Estimated time saved: ~${prompt.estimated_time_saved || 30} minutes`,
      })
    } catch (error) {
      console.error('Error tracking usage:', error)
      toast({
        title: 'Error',
        description: 'Failed to track usage. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsUsing(false)
    }
  }

  const handleRating = async (newRating: number) => {
    setRating(newRating)

    try {
      const response = await fetch('/api/marketing/rate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt_id: prompt.id,
          user_id: userId,
          rating: newRating,
        }),
      })

      if (!response.ok) throw new Error('Failed to rate prompt')

      toast({
        title: 'Thank you!',
        description: 'Your rating helps improve our library.',
      })
    } catch (error) {
      console.error('Error rating prompt:', error)
      toast({
        title: 'Error',
        description: 'Failed to save rating. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3 mb-2">
            <Badge variant="outline" className="mt-1">
              {prompt.category.replace('_', ' ')}
            </Badge>
            <Badge variant="soft" className="mt-1">
              {prompt.difficulty}
            </Badge>
            {prompt.subcategory && (
              <Badge variant="soft" className="mt-1">
                {prompt.subcategory.replace('_', ' ')}
              </Badge>
            )}
          </div>

          <DialogTitle className="text-2xl">{prompt.title}</DialogTitle>
          <DialogDescription className="text-base">
            {prompt.description}
          </DialogDescription>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-4 text-sm">
            <div className="flex items-center gap-1.5">
              <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold">{prompt.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUpIcon className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">{prompt.usage_count.toLocaleString()}</span>
              <span className="text-muted-foreground">uses</span>
            </div>
            {prompt.estimated_time_saved && (
              <div className="flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold">~{prompt.estimated_time_saved} min</span>
                <span className="text-muted-foreground">saved</span>
              </div>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="prompt" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prompt">
              <CodeIcon className="w-4 h-4 mr-2" />
              Prompt
            </TabsTrigger>
            <TabsTrigger value="example">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Example Output
            </TabsTrigger>
            <TabsTrigger value="guide">
              <BookOpenIcon className="w-4 h-4 mr-2" />
              How to Use
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="space-y-4">
            <div className="relative">
              <Textarea
                value={prompt.prompt_text}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-3 right-3"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Related tags:</p>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="soft">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Use Case */}
            {prompt.use_case && (
              <div>
                <p className="text-sm font-medium mb-2">Best for:</p>
                <p className="text-sm text-muted-foreground">{prompt.use_case}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="example" className="space-y-4">
            {prompt.example_output ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm font-medium mb-3">Example output:</p>
                  <div className="whitespace-pre-wrap text-sm">{prompt.example_output}</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <SparklesIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No example output available for this prompt</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="guide" className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3>How to use this prompt:</h3>
              <ol>
                <li>
                  <strong>Copy the prompt</strong> using the button in the "Prompt" tab
                </li>
                <li>
                  <strong>Replace placeholders</strong> (text in [BRACKETS]) with your specific
                  information
                </li>
                <li>
                  <strong>Paste into your AI tool</strong> (ChatGPT, Claude, Gemini, etc.)
                </li>
                <li>
                  <strong>Review and refine</strong> the AI's output to match your brand voice
                </li>
              </ol>

              <h3>Pro tips:</h3>
              <ul>
                <li>
                  <strong>Be specific</strong> when replacing placeholders - the more detail, the
                  better the output
                </li>
                <li>
                  <strong>Iterate</strong> - If the first output isn't perfect, ask the AI to
                  refine specific parts
                </li>
                <li>
                  <strong>Save variations</strong> - Test different approaches and save the best
                  ones
                </li>
                <li>
                  <strong>Use Brand Voice Training</strong> to automatically apply your brand style
                </li>
              </ul>

              {prompt.difficulty === 'advanced' && (
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                    Advanced Prompt
                  </p>
                  <p className="text-sm text-yellow-700/80 dark:text-yellow-400/80">
                    This prompt requires familiarity with prompt engineering concepts. Review the
                    example output to understand the expected result format.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rate this prompt:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className="hover:scale-110 transition-transform"
                >
                  <StarIcon
                    className={`w-5 h-5 ${
                      star <= (rating || prompt.rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleUsePrompt} disabled={isUsing} className="gap-2">
              <SparklesIcon className="w-4 h-4" />
              {isUsing ? 'Tracking...' : 'Use This Prompt'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
