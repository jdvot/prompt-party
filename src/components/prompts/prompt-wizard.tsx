'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ChevronLeft, Sparkles, Info, CheckCircle2, Zap, Brain, MessageSquare, User, Code } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface LLMOption {
  id: string
  name: string
  icon: string
  descKey: string
  strengthKeys: string[]
  styleKey: string
}

interface PromptType {
  id: 'system' | 'user' | 'assistant'
  nameKey: string
  icon: any
  descKey: string
  exampleKey: string
  whenKey: string
}

export function PromptWizard() {
  const t = useTranslations('wizard')
  const [step, setStep] = useState(1)
  const [selectedLLM, setSelectedLLM] = useState<string | null>(null)
  const [promptData, setPromptData] = useState({
    title: '',
    goal: '',
    systemPrompt: '',
    userPrompt: '',
    assistantExample: '',
    context: '',
    outputFormat: '',
    constraints: [] as string[],
  })

  const totalSteps = 5

  const LLM_OPTIONS: LLMOption[] = [
    {
      id: 'chatgpt',
      name: 'ChatGPT (GPT-4/GPT-3.5)',
      icon: '🤖',
      descKey: 'chatgpt_desc',
      strengthKeys: ['chatgpt_strength_1', 'chatgpt_strength_2', 'chatgpt_strength_3', 'chatgpt_strength_4'],
      styleKey: 'chatgpt_style'
    },
    {
      id: 'claude',
      name: 'Claude (Anthropic)',
      icon: '🎭',
      descKey: 'claude_desc',
      strengthKeys: ['claude_strength_1', 'claude_strength_2', 'claude_strength_3', 'claude_strength_4'],
      styleKey: 'claude_style'
    },
    {
      id: 'gemini',
      name: 'Gemini (Google)',
      icon: '💎',
      descKey: 'gemini_desc',
      strengthKeys: ['gemini_strength_1', 'gemini_strength_2', 'gemini_strength_3', 'gemini_strength_4'],
      styleKey: 'gemini_style'
    },
    {
      id: 'llama',
      name: 'Llama 2/3 (Meta)',
      icon: '🦙',
      descKey: 'llama_desc',
      strengthKeys: ['llama_strength_1', 'llama_strength_2', 'llama_strength_3', 'llama_strength_4'],
      styleKey: 'llama_style'
    },
  ]

  const PROMPT_TYPES: PromptType[] = [
    {
      id: 'system',
      nameKey: 'prompt_type_system',
      icon: Brain,
      descKey: 'system_desc',
      exampleKey: 'system_example',
      whenKey: 'system_when'
    },
    {
      id: 'user',
      nameKey: 'prompt_type_user',
      icon: User,
      descKey: 'user_desc',
      exampleKey: 'user_example',
      whenKey: 'user_when'
    },
    {
      id: 'assistant',
      nameKey: 'prompt_type_assistant',
      icon: MessageSquare,
      descKey: 'assistant_desc',
      exampleKey: 'assistant_example',
      whenKey: 'assistant_when'
    },
  ]

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const selectedLLMData = LLM_OPTIONS.find(llm => llm.id === selectedLLM)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium text-muted-foreground">
            {t('progress_step')} {step} {t('progress_of')} {totalSteps}
          </h2>
          <span className="text-sm font-medium text-primary">
            {Math.round((step / totalSteps) * 100)}% {t('progress_completed')}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Choose LLM */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">
              {t('step1_heading')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('step1_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LLM_OPTIONS.map((llm) => (
              <Card
                key={llm.id}
                className={cn(
                  'cursor-pointer transition-all duration-200 hover:shadow-lg',
                  selectedLLM === llm.id
                    ? 'ring-2 ring-primary shadow-lg scale-105'
                    : 'hover:scale-102'
                )}
                onClick={() => setSelectedLLM(llm.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{llm.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{llm.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {t(llm.descKey)}
                        </CardDescription>
                      </div>
                    </div>
                    {selectedLLM === llm.id && (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">{t('strengths_label')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {llm.strengthKeys.map((strengthKey, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {t(strengthKey)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                      {t(llm.styleKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Understand Prompt Types */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">
              {t('step2_heading')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('step2_subtitle')}
            </p>
          </div>

          <div className="grid gap-6">
            {PROMPT_TYPES.map((type, idx) => {
              const Icon = type.icon
              return (
                <Card key={type.id} className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/40" />
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{t(type.nameKey)}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {idx + 1}/3
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          {t(type.descKey)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {t('when_to_use')}
                      </p>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                        {t(type.whenKey)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        {t('example_label')}
                      </p>
                      <pre className="text-sm bg-background border rounded-md p-3 overflow-x-auto">
                        <code className="text-foreground">{t(type.exampleKey)}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                {t('pro_tip_title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {t('pro_tip_text')}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Build System Prompt */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">
              {t('step3_heading')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('step3_subtitle')}
            </p>
          </div>

          {selectedLLMData && (
            <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{selectedLLMData.icon}</span>
                  {t('optimized_for')} {selectedLLMData.name}
                </CardTitle>
                <CardDescription>
                  {t(selectedLLMData.styleKey)}
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('prompt_title_label')}
              </label>
              <input
                type="text"
                value={promptData.title}
                onChange={(e) => setPromptData({ ...promptData, title: e.target.value })}
                placeholder={t('prompt_title_placeholder')}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('main_goal_label')}
              </label>
              <input
                type="text"
                value={promptData.goal}
                onChange={(e) => setPromptData({ ...promptData, goal: e.target.value })}
                placeholder={t('main_goal_placeholder')}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                {t('system_prompt_label')}
              </label>
              <textarea
                value={promptData.systemPrompt}
                onChange={(e) => setPromptData({ ...promptData, systemPrompt: e.target.value })}
                placeholder={t('system_prompt_placeholder')}
                rows={6}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('system_prompt_hint')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('additional_context_label')}
              </label>
              <textarea
                value={promptData.context}
                onChange={(e) => setPromptData({ ...promptData, context: e.target.value })}
                placeholder={t('additional_context_placeholder')}
                rows={3}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Build User Prompt */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">
              {t('step4_heading')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('step4_subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('user_prompt_label')}
              </label>
              <textarea
                value={promptData.userPrompt}
                onChange={(e) => setPromptData({ ...promptData, userPrompt: e.target.value })}
                placeholder={t('user_prompt_placeholder')}
                rows={6}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('user_prompt_hint')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('output_format_label')}
              </label>
              <input
                type="text"
                value={promptData.outputFormat}
                onChange={(e) => setPromptData({ ...promptData, outputFormat: e.target.value })}
                placeholder={t('output_format_placeholder')}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {t('assistant_example_label')}
              </label>
              <textarea
                value={promptData.assistantExample}
                onChange={(e) => setPromptData({ ...promptData, assistantExample: e.target.value })}
                placeholder={t('assistant_example_placeholder')}
                rows={6}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('assistant_example_hint')}
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-blue-500" />
                {t('best_practices_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t('best_practice_1')}</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t('best_practice_2')}</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t('best_practice_3')}</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t('best_practice_4')}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 5: Review & Optimize */}
      {step === 5 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">
              {t('step5_heading')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('step5_subtitle')} {selectedLLMData?.name}
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                {promptData.title || t('untitled_prompt')}
              </CardTitle>
              {promptData.goal && (
                <CardDescription className="mt-2">
                  {t('goal_prefix')} {promptData.goal}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* System Prompt */}
              {promptData.systemPrompt && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="gap-1">
                      <Brain className="w-3 h-3" />
                      {t('badge_system')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{t('role_behavior')}</span>
                  </div>
                  <div className="bg-muted/50 rounded-md p-4 border-l-4 border-primary">
                    <pre className="text-sm whitespace-pre-wrap font-sans">
                      {promptData.systemPrompt}
                    </pre>
                  </div>
                </div>
              )}

              {/* Context */}
              {promptData.context && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="gap-1">
                      <Info className="w-3 h-3" />
                      {t('badge_context')}
                    </Badge>
                  </div>
                  <div className="bg-background rounded-md p-4 border">
                    <pre className="text-sm whitespace-pre-wrap font-sans text-muted-foreground">
                      {promptData.context}
                    </pre>
                  </div>
                </div>
              )}

              {/* User Prompt */}
              {promptData.userPrompt && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="gap-1">
                      <User className="w-3 h-3" />
                      {t('badge_user')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{t('your_request')}</span>
                  </div>
                  <div className="bg-muted/50 rounded-md p-4 border-l-4 border-blue-500">
                    <pre className="text-sm whitespace-pre-wrap font-sans">
                      {promptData.userPrompt}
                    </pre>
                  </div>
                </div>
              )}

              {/* Output Format */}
              {promptData.outputFormat && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{t('expected_format_label')}</span>
                  <Badge variant="outline">{promptData.outputFormat}</Badge>
                </div>
              )}

              {/* Assistant Example */}
              {promptData.assistantExample && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {t('badge_assistant')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{t('response_format')}</span>
                  </div>
                  <div className="bg-muted/50 rounded-md p-4 border-l-4 border-green-500">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {promptData.assistantExample}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={() => {
                alert(t('save_coming_soon'))
              }}
            >
              <CheckCircle2 className="w-5 h-5" />
              {t('save_prompt_btn')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                const fullPrompt = `SYSTEM:\n${promptData.systemPrompt}\n\n${promptData.context ? `CONTEXT:\n${promptData.context}\n\n` : ''}USER:\n${promptData.userPrompt}${promptData.assistantExample ? `\n\nASSISTANT EXAMPLE:\n${promptData.assistantExample}` : ''}`
                navigator.clipboard.writeText(fullPrompt)
                alert(t('copied_clipboard'))
              }}
            >
              <Code className="w-5 h-5" />
              {t('copy_prompt_btn')}
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('btn_previous')}
        </Button>

        {step < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={step === 1 && !selectedLLM}
            className="gap-2"
          >
            {t('btn_next')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              window.location.href = '/prompts/new'
            }}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {t('btn_create')}
          </Button>
        )}
      </div>
    </div>
  )
}
