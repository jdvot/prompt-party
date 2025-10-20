'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Sparkles, Target, Tag, Eye, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface WizardStep {
  id: number
  title: string
  description: string
  icon: typeof Sparkles
}

const STEPS: WizardStep[] = [
  {
    id: 1,
    title: 'Choose Category',
    description: 'What type of prompt are you creating?',
    icon: Target,
  },
  {
    id: 2,
    title: 'Write Your Prompt',
    description: 'Create your amazing AI prompt',
    icon: Sparkles,
  },
  {
    id: 3,
    title: 'Add Tags',
    description: 'Help others discover your prompt',
    icon: Tag,
  },
  {
    id: 4,
    title: 'Preview & Publish',
    description: 'Review and share your creation',
    icon: Eye,
  },
]

const CATEGORIES = [
  { id: 'writing', name: 'Writing', emoji: '✍️', color: 'from-purple-500 to-pink-500' },
  { id: 'coding', name: 'Coding', emoji: '💻', color: 'from-blue-500 to-cyan-500' },
  { id: 'creative', name: 'Creative', emoji: '🎨', color: 'from-orange-500 to-rose-500' },
  { id: 'business', name: 'Business', emoji: '💼', color: 'from-green-500 to-emerald-500' },
  { id: 'education', name: 'Education', emoji: '📚', color: 'from-indigo-500 to-violet-500' },
  { id: 'other', name: 'Other', emoji: '⭐', color: 'from-amber-500 to-yellow-500' },
]

const SUGGESTED_TAGS = [
  'chatgpt', 'claude', 'gemini', 'creative-writing', 'copywriting',
  'code-generation', 'debugging', 'data-analysis', 'marketing',
  'content-creation', 'learning', 'productivity', 'brainstorming',
]

export function PromptWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    body: '',
    tags: [] as string[],
    isPublic: true,
  })
  const [loading, setLoading] = useState(false)

  const Icon = STEPS[currentStep - 1].icon

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleTag = (tag: string) => {
    if (formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        router.push(`/prompts/${data.prompt.id}`)
      }
    } catch (error) {
      console.error('Error creating prompt:', error)
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.category
      case 2:
        return formData.title.trim() && formData.body.trim()
      case 3:
        return formData.tags.length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white scale-110 shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all ${
                        currentStep > step.id
                          ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">
                {STEPS[currentStep - 1].title}
              </h2>
              <p className="text-muted-foreground">
                {STEPS[currentStep - 1].description}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <Card className="p-8 shadow-2xl">
            {/* Step 1: Category */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                        formData.category === cat.id
                          ? `bg-gradient-to-br ${cat.color} text-white border-transparent shadow-xl`
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{cat.emoji}</div>
                      <div className="font-semibold">{cat.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Write Prompt */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Give your prompt a catchy title..."
                    className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Prompt <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder="Write your prompt here... Be as detailed as you like!"
                    rows={12}
                    className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary transition-all resize-none"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.body.length} characters
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Tags */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select tags to help others discover your prompt (choose at least one)
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full border-2 transition-all hover:scale-105 ${
                        formData.tags.includes(tag)
                          ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-transparent shadow-lg'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Selected: {formData.tags.length} tag(s)
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-6 bg-muted/50 rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-4xl">
                      {CATEGORIES.find(c => c.id === formData.category)?.emoji}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{formData.title}</h3>
                      <Badge variant="secondary">
                        {CATEGORIES.find(c => c.id === formData.category)?.name}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap mb-4">{formData.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="public"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="public" className="text-sm cursor-pointer">
                    Make this prompt public
                  </label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep < STEPS.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="gap-2 btn-primary"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !canProceed()}
                  className="gap-2 btn-primary"
                >
                  {loading ? 'Publishing...' : 'Publish Prompt'}
                  <Sparkles className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
