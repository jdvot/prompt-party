'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SparklesIcon, UsersIcon, TrendingUpIcon, ZapIcon } from 'lucide-react'

interface WelcomeScreenProps {
  onNext: () => void
  onSkip: () => void
}

export function WelcomeScreen({ onNext, onSkip }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 md:p-12">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              <span>Welcome to Prompt Party!</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Discover the Best AI Prompts
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Join thousands of creators sharing, discovering, and remixing the most effective prompts for ChatGPT, Claude, and more.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <UsersIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Join the Community</h3>
              <p className="text-sm text-muted-foreground">
                10,000+ AI creators sharing prompts
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUpIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Discover & Learn</h3>
              <p className="text-sm text-muted-foreground">
                Find top-rated prompts by category
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <ZapIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Remix & Create</h3>
              <p className="text-sm text-muted-foreground">
                Build on others' work and share yours
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={onNext}
              className="flex-1 sm:flex-none"
            >
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onSkip}
              className="flex-1 sm:flex-none"
            >
              Skip Tour
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground mb-2">Step 1 of 4</p>
            <div className="flex gap-2 justify-center">
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-muted"></div>
              <div className="w-8 h-1 rounded-full bg-muted"></div>
              <div className="w-8 h-1 rounded-full bg-muted"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
