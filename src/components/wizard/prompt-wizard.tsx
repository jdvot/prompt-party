'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Sparkles, Target, Tag, Eye, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface WizardStep {
  id: number
  titleKey: string
  descriptionKey: string
  icon: typeof Sparkles
}

const STEP_ICONS: WizardStep[] = [
  { id: 1, titleKey: 'step1_title', descriptionKey: 'step1_description', icon: Target },
  { id: 2, titleKey: 'step2_title', descriptionKey: 'step2_description', icon: Sparkles },
  { id: 3, titleKey: 'step3_title', descriptionKey: 'step3_description', icon: Tag },
  { id: 4, titleKey: 'step4_title', descriptionKey: 'step4_description', icon: Eye },
]

type CategoryId = 'writing' | 'coding' | 'creative' | 'business' | 'education' | 'other'
const CATEGORY_IDS: CategoryId[] = ['writing', 'coding', 'creative', 'business', 'education', 'other']
const CATEGORY_EMOJIS: Record<CategoryId, string> = {
  writing: '✍️',
  coding: '💻',
  creative: '🎨',
  business: '💼',
  education: '📚',
  other: '⭐'
}
const CATEGORY_COLORS: Record<CategoryId, string> = {
  writing: 'from-purple-500 to-cyan-500',
  coding: 'from-blue-500 to-cyan-500',
  creative: 'from-violet-500 to-purple-500',
  business: 'from-green-500 to-emerald-500',
  education: 'from-indigo-500 to-violet-500',
  other: 'from-amber-500 to-yellow-500'
}

const SUGGESTED_TAGS = [
  'chatgpt', 'claude', 'gemini', 'creative-writing', 'copywriting',
  'code-generation', 'debugging', 'data-analysis', 'marketing',
  'content-creation', 'learning', 'productivity', 'brainstorming',
]

export function PromptWizard() {
  const router = useRouter()
  const t = useTranslations('simpleWizard')
  const tCategories = useTranslations('simpleWizard.categories')
  const tForm = useTranslations('simpleWizard.form')
  const tButtons = useTranslations('simpleWizard.buttons')

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<{
    category: CategoryId | ''
    title: string
    body: string
    tags: string[]
    isPublic: boolean
  }>({
    category: '',
    title: '',
    body: '',
    tags: [],
    isPublic: true,
  })
  const [loading, setLoading] = useState(false)

  const Icon = STEP_ICONS[currentStep - 1].icon

  const handleNext = () => {
    if (currentStep < STEP_ICONS.length) {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {STEP_ICONS.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white scale-110 shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  {index < STEP_ICONS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-all ${
                        currentStep > step.id
                          ? 'bg-gradient-to-r from-indigo-500 to-violet-600'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">
                {t(STEP_ICONS[currentStep - 1].titleKey)}
              </h2>
              <p className="text-muted-foreground">
                {t(STEP_ICONS[currentStep - 1].descriptionKey)}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <Card className="p-8 shadow-2xl">
            {/* Step 1: Category */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {CATEGORY_IDS.map((catId) => (
                    <button
                      key={catId}
                      onClick={() => setFormData({ ...formData, category: catId })}
                      className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                        formData.category === catId
                          ? `bg-gradient-to-br ${CATEGORY_COLORS[catId]} text-white border-transparent shadow-xl`
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{CATEGORY_EMOJIS[catId]}</div>
                      <div className="font-semibold">{tCategories(catId)}</div>
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
                    {tForm('title_label')} <span className="text-destructive">{tForm('title_required')}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder={tForm('title_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {tForm('prompt_label')} <span className="text-destructive">{tForm('prompt_required')}</span>
                  </label>
                  <textarea
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    placeholder={tForm('prompt_placeholder')}
                    rows={12}
                    className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary transition-all resize-none"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {tForm('characters_count', { count: formData.body.length })}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Tags */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tForm('tags_helper')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full border-2 transition-all hover:scale-105 ${
                        formData.tags.includes(tag)
                          ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-lg'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {tForm('tags_selected', { count: formData.tags.length })}
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-6 bg-muted/50 rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-4xl">
                      {formData.category && CATEGORY_EMOJIS[formData.category as CategoryId]}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{formData.title}</h3>
                      <Badge variant="secondary">
                        {tCategories(formData.category)}
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
                    {tForm('make_public')}
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
                {tButtons('back')}
              </Button>

              {currentStep < STEP_ICONS.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="gap-2 btn-primary"
                >
                  {tButtons('next')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !canProceed()}
                  className="gap-2 btn-primary"
                >
                  {loading ? tButtons('publishing') : tButtons('publish')}
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
