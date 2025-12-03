'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  ChevronRight,
  ChevronLeft,
  User,
  FileText,
  Target,
  ListChecks,
  Eye,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface BuilderTranslations {
  page_title: string
  page_description: string
  step_role: string
  step_context: string
  step_task: string
  step_constraints: string
  step_preview: string
  role_label: string
  role_placeholder: string
  role_description: string
  context_label: string
  context_placeholder: string
  context_description: string
  task_label: string
  task_placeholder: string
  task_description: string
  constraints_label: string
  constraints_placeholder: string
  constraints_description: string
  preview_title: string
  preview_description: string
  copy_button: string
  copied: string
  next_step: string
  prev_step: string
  reset: string
  step_of: string
  empty_prompt: string
}

interface PromptBuilderWizardProps {
  translations: BuilderTranslations
}

interface PromptData {
  role: string
  context: string
  task: string
  constraints: string
}

const TOTAL_STEPS = 5

const STEP_ICONS = [User, FileText, Target, ListChecks, Eye]

export function PromptBuilderWizard({ translations: t }: PromptBuilderWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [promptData, setPromptData] = useState<PromptData>({
    role: '',
    context: '',
    task: '',
    constraints: '',
  })

  const stepLabels = [
    t.step_role,
    t.step_context,
    t.step_task,
    t.step_constraints,
    t.step_preview,
  ]

  const handleNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep])

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const handleReset = useCallback(() => {
    setPromptData({
      role: '',
      context: '',
      task: '',
      constraints: '',
    })
    setCurrentStep(1)
    setCopied(false)
  }, [])

  const generatePrompt = useCallback(() => {
    const sections: string[] = []

    if (promptData.role.trim()) {
      sections.push(`## Role\n${promptData.role.trim()}`)
    }
    if (promptData.context.trim()) {
      sections.push(`## Context\n${promptData.context.trim()}`)
    }
    if (promptData.task.trim()) {
      sections.push(`## Task\n${promptData.task.trim()}`)
    }
    if (promptData.constraints.trim()) {
      sections.push(`## Constraints\n${promptData.constraints.trim()}`)
    }

    return sections.join('\n\n')
  }, [promptData])

  const handleCopy = useCallback(async () => {
    const prompt = generatePrompt()
    if (prompt) {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [generatePrompt])

  const updateField = useCallback((field: keyof PromptData, value: string) => {
    setPromptData(prev => ({ ...prev, [field]: value }))
  }, [])

  const progressValue = (currentStep / TOTAL_STEPS) * 100

  const stepOfText = t.step_of
    .replace('{current}', String(currentStep))
    .replace('{total}', String(TOTAL_STEPS))

  // Step content configuration
  const stepConfig = [
    {
      icon: User,
      label: t.role_label,
      description: t.role_description,
      placeholder: t.role_placeholder,
      field: 'role' as keyof PromptData,
      example: 'Example: "You are an expert software architect with 15 years of experience in distributed systems..."',
      color: 'brand-primary',
    },
    {
      icon: FileText,
      label: t.context_label,
      description: t.context_description,
      placeholder: t.context_placeholder,
      field: 'context' as keyof PromptData,
      example: 'Example: "We are building a real-time chat application that needs to scale to 1 million concurrent users..."',
      color: 'brand-secondary',
    },
    {
      icon: Target,
      label: t.task_label,
      description: t.task_description,
      placeholder: t.task_placeholder,
      field: 'task' as keyof PromptData,
      example: 'Example: "Design a message queue architecture that handles message persistence, delivery guarantees, and horizontal scaling..."',
      color: 'success',
    },
    {
      icon: ListChecks,
      label: t.constraints_label,
      description: t.constraints_description,
      placeholder: t.constraints_placeholder,
      field: 'constraints' as keyof PromptData,
      example: 'Example: "Use bullet points, keep response under 1000 words, include code examples in TypeScript..."',
      color: 'warning',
    },
  ]

  const currentConfig = currentStep <= 4 ? stepConfig[currentStep - 1] : null

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {stepLabels.map((label, index) => {
                const stepNumber = index + 1
                const Icon = STEP_ICONS[index]
                const isActive = stepNumber === currentStep
                const isCompleted = stepNumber < currentStep

                return (
                  <button
                    key={stepNumber}
                    type="button"
                    onClick={() => setCurrentStep(stepNumber)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      isActive && 'bg-brand-primary/10',
                      !isActive && !isCompleted && 'opacity-50 hover:opacity-75',
                      isCompleted && 'opacity-100 hover:bg-muted'
                    )}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`${label} - ${stepOfText}`}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200',
                        isActive && 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30',
                        isCompleted && 'bg-success text-white',
                        !isActive && !isCompleted && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs font-medium hidden sm:block',
                        isActive && 'text-brand-primary',
                        isCompleted && 'text-success',
                        !isActive && !isCompleted && 'text-muted-foreground'
                      )}
                    >
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{stepOfText}</span>
                <span className="font-medium text-brand-primary">{Math.round(progressValue)}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="min-h-[400px]">
        <CardContent className="pt-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Steps 1-4: Input Steps */}
            {currentConfig && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={cn('p-3 rounded-xl', `bg-${currentConfig.color}/10`)}>
                    <currentConfig.icon className={cn('w-6 h-6', `text-${currentConfig.color}`)} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{currentConfig.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{currentConfig.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${currentConfig.field}-input`} className="sr-only">
                    {currentConfig.label}
                  </Label>
                  <Textarea
                    id={`${currentConfig.field}-input`}
                    value={promptData[currentConfig.field]}
                    onChange={(e) => updateField(currentConfig.field, e.target.value)}
                    placeholder={currentConfig.placeholder}
                    className="min-h-[200px] resize-none text-base"
                    aria-describedby={`${currentConfig.field}-description`}
                  />
                  <p id={`${currentConfig.field}-description`} className="text-sm text-muted-foreground">
                    {currentConfig.example}
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Preview */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-brand-primary/10">
                    <Eye className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{t.preview_title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.preview_description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {generatePrompt() ? (
                    <div className="relative">
                      <pre className="p-4 bg-muted/50 rounded-xl border text-sm whitespace-pre-wrap font-mono overflow-auto max-h-[400px]">
                        {generatePrompt()}
                      </pre>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-3 right-3"
                        onClick={handleCopy}
                      >
                        <span className="inline-flex items-center">
                          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          {copied ? t.copied : t.copy_button}
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <div className="p-8 bg-muted/30 rounded-xl border border-dashed text-center">
                      <Eye className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">{t.empty_prompt}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          <span className="inline-flex items-center">
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t.prev_step}
          </span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
        >
          <span className="inline-flex items-center">
            <RotateCcw className="w-4 h-4 mr-2" />
            {t.reset}
          </span>
        </Button>

        {currentStep < TOTAL_STEPS ? (
          <Button
            variant="primary"
            onClick={handleNext}
          >
            <span className="inline-flex items-center">
              {t.next_step}
              <ChevronRight className="w-4 h-4 ml-2" />
            </span>
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleCopy}
          >
            <span className="inline-flex items-center">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? t.copied : t.copy_button}
            </span>
          </Button>
        )}
      </div>
    </div>
  )
}
