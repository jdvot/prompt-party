'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HeartIcon, MessageCircleIcon, Share2Icon, CopyIcon, BookmarkIcon, SparklesIcon } from 'lucide-react'

interface FeatureTourProps {
  onComplete: () => void
  onBack: () => void
}

export function FeatureTour({ onComplete, onBack }: FeatureTourProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Card className="max-w-3xl w-full">
        <CardContent className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <SparklesIcon className="w-4 h-4" />
              <span>You're all set!</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Quick Feature Tour
            </h2>
            <p className="text-muted-foreground">
              Here's what you can do on Prompt Party
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <HeartIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Like & Comment</h3>
              <p className="text-sm text-muted-foreground">
                Show appreciation for great prompts and join the discussion
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                <kbd className="px-2 py-1 bg-muted rounded">L</kbd> to like
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CopyIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Remix Prompts</h3>
              <p className="text-sm text-muted-foreground">
                Build on others' work and create your own variations
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                Click "Remix" on any prompt
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookmarkIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Save to Collections</h3>
              <p className="text-sm text-muted-foreground">
                Organize your favorite prompts into custom collections
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                <kbd className="px-2 py-1 bg-muted rounded">S</kbd> to save
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Share2Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Share & Collaborate</h3>
              <p className="text-sm text-muted-foreground">
                Share prompts with your team or on social media
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                Click "Share" for options
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Tip */}
          <div className="p-4 rounded-lg bg-muted/50 border border-dashed mb-8">
            <p className="text-sm text-center">
              <span className="font-semibold">Pro tip:</span> Press{' '}
              <kbd className="px-2 py-1 bg-background rounded text-xs">?</kbd> anytime to see all keyboard shortcuts
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>

            <Button
              size="lg"
              onClick={onComplete}
              className="flex-1 sm:flex-initial sm:px-12"
            >
              Start Exploring
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground mb-2">Step 4 of 4</p>
            <div className="flex gap-2 justify-center">
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-primary"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
