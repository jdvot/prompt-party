'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InterestSelectionProps {
  onNext: (interests: string[]) => void
  onBack: () => void
}

const INTEREST_CATEGORIES = [
  { id: 'content-writing', label: 'Content Writing', icon: '✍️' },
  { id: 'coding', label: 'Coding & Dev', icon: '💻' },
  { id: 'marketing', label: 'Marketing', icon: '📈' },
  { id: 'creative', label: 'Creative Writing', icon: '🎨' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'productivity', label: 'Productivity', icon: '⚡' },
  { id: 'data-analysis', label: 'Data Analysis', icon: '📊' },
  { id: 'design', label: 'Design', icon: '🎯' },
  { id: 'research', label: 'Research', icon: '🔬' },
  { id: 'seo', label: 'SEO', icon: '🔍' },
  { id: 'social-media', label: 'Social Media', icon: '📱' },
]

export function InterestSelection({ onNext, onBack }: InterestSelectionProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    )
  }

  const handleNext = () => {
    if (selectedInterests.length > 0) {
      onNext(selectedInterests)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Card className="max-w-3xl w-full">
        <CardContent className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              What interests you?
            </h2>
            <p className="text-muted-foreground">
              Select topics you'd like to explore. We'll personalize your feed.
            </p>
            {selectedInterests.length > 0 && (
              <p className="text-sm text-primary mt-2">
                {selectedInterests.length} selected
              </p>
            )}
          </div>

          {/* Interest Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {INTEREST_CATEGORIES.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id)

              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={cn(
                    'relative p-4 rounded-lg border-2 transition-all duration-200',
                    'hover:scale-105 hover:shadow-md',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/50'
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}

                  <div className="text-3xl mb-2">{interest.icon}</div>
                  <div className="text-sm font-medium text-center">
                    {interest.label}
                  </div>
                </button>
              )
            })}
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
              onClick={handleNext}
              disabled={selectedInterests.length === 0}
              className="flex-1"
            >
              Continue
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground mb-2">Step 2 of 4</p>
            <div className="flex gap-2 justify-center">
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-primary"></div>
              <div className="w-8 h-1 rounded-full bg-muted"></div>
              <div className="w-8 h-1 rounded-full bg-muted"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
