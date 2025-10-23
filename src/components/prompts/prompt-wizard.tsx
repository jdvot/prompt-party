'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ChevronLeft, Sparkles, Info, CheckCircle2, Zap, Brain, MessageSquare, User, Code } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LLMOption {
  id: string
  name: string
  icon: string
  description: string
  strengths: string[]
  promptStyle: string
}

interface PromptType {
  id: 'system' | 'user' | 'assistant'
  name: string
  icon: any
  description: string
  example: string
  whenToUse: string
}

const LLM_OPTIONS: LLMOption[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT (GPT-4/GPT-3.5)',
    icon: '🤖',
    description: 'OpenAI\'s conversational AI, excellent for general tasks',
    strengths: ['Versatile', 'Code generation', 'Analysis', 'Creative writing'],
    promptStyle: 'Clear instructions with context. Responds well to role-play and structured formats.'
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    icon: '🎭',
    description: 'Anthropic\'s helpful, harmless, and honest assistant',
    strengths: ['Long context', 'Detailed analysis', 'Code review', 'Document processing'],
    promptStyle: 'Detailed explanations work best. Excels with step-by-step reasoning and nuanced tasks.'
  },
  {
    id: 'gemini',
    name: 'Gemini (Google)',
    icon: '💎',
    description: 'Google\'s multimodal AI model',
    strengths: ['Multimodal', 'Search integration', 'Fast responses', 'Code understanding'],
    promptStyle: 'Natural language with clear goals. Works well with contextual information.'
  },
  {
    id: 'llama',
    name: 'Llama 2/3 (Meta)',
    icon: '🦙',
    description: 'Meta\'s open-source language model',
    strengths: ['Open source', 'Customizable', 'Privacy-focused', 'Local deployment'],
    promptStyle: 'Direct and specific. Benefits from explicit formatting instructions.'
  },
]

const PROMPT_TYPES: PromptType[] = [
  {
    id: 'system',
    name: 'System Prompt',
    icon: Brain,
    description: 'Définit le comportement et le rôle global de l\'IA',
    example: 'Tu es un expert en marketing digital avec 10 ans d\'expérience. Tu donnes des conseils pratiques et actionnables.',
    whenToUse: 'Pour établir le contexte, le ton, les contraintes et le rôle de l\'IA. C\'est la "personnalité" de base.'
  },
  {
    id: 'user',
    name: 'User Prompt',
    icon: User,
    description: 'La question ou instruction de l\'utilisateur',
    example: 'Crée-moi une stratégie de contenu pour Instagram pour une marque de café artisanal',
    whenToUse: 'Pour poser votre question spécifique ou demander une tâche précise. C\'est votre input.'
  },
  {
    id: 'assistant',
    name: 'Assistant Prompt',
    icon: MessageSquare,
    description: 'Exemples de réponses attendues (few-shot learning)',
    example: 'Assistant: "Voici une stratégie en 3 axes: 1) Storytelling visuel... 2) Engagement communautaire..."',
    whenToUse: 'Pour donner des exemples du format ou style de réponse souhaité. Améliore la cohérence.'
  },
]

export function PromptWizard() {
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
            Étape {step} sur {totalSteps}
          </h2>
          <span className="text-sm font-medium text-primary">
            {Math.round((step / totalSteps) * 100)}% complété
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
              Quel modèle d'IA allez-vous utiliser ?
            </h1>
            <p className="text-muted-foreground text-lg">
              Chaque IA a ses forces. Choisissez celle qui correspond à votre besoin.
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
                          {llm.description}
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
                    <p className="text-sm font-medium mb-2">Points forts :</p>
                    <div className="flex flex-wrap gap-1.5">
                      {llm.strengths.map((strength, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                      {llm.promptStyle}
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
              Comprendre les types de prompts
            </h1>
            <p className="text-muted-foreground text-lg">
              Les 3 éléments clés pour créer un prompt performant
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
                          <CardTitle className="text-xl">{type.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {idx + 1}/3
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          {type.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Quand l'utiliser ?
                      </p>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                        {type.whenToUse}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Exemple :
                      </p>
                      <pre className="text-sm bg-background border rounded-md p-3 overflow-x-auto">
                        <code className="text-foreground">{type.example}</code>
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
                Astuce Pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Pour les meilleurs résultats, combinez les 3 types :
                <strong className="text-primary"> System</strong> définit le rôle,
                <strong className="text-primary"> User</strong> pose la question,
                <strong className="text-primary"> Assistant</strong> montre un exemple de réponse.
                Cette approche garantit des réponses cohérentes et précises.
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
              Définissez le contexte système
            </h1>
            <p className="text-muted-foreground text-lg">
              Établissez le rôle et le comportement de l'IA
            </p>
          </div>

          {selectedLLMData && (
            <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{selectedLLMData.icon}</span>
                  Optimisé pour {selectedLLMData.name}
                </CardTitle>
                <CardDescription>
                  {selectedLLMData.promptStyle}
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Titre du prompt
              </label>
              <input
                type="text"
                value={promptData.title}
                onChange={(e) => setPromptData({ ...promptData, title: e.target.value })}
                placeholder="Ex: Expert en marketing digital"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Objectif principal
              </label>
              <input
                type="text"
                value={promptData.goal}
                onChange={(e) => setPromptData({ ...promptData, goal: e.target.value })}
                placeholder="Ex: Créer des stratégies marketing actionnables"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                System Prompt (Rôle et personnalité)
              </label>
              <textarea
                value={promptData.systemPrompt}
                onChange={(e) => setPromptData({ ...promptData, systemPrompt: e.target.value })}
                placeholder="Ex: Tu es un expert en marketing digital avec 10 ans d'expérience. Tu donnes des conseils pratiques, basés sur les données, et adaptés aux PME. Ton ton est professionnel mais accessible."
                rows={6}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                💡 Incluez : expertise, ton, style de réponse, contraintes
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Contexte additionnel (optionnel)
              </label>
              <textarea
                value={promptData.context}
                onChange={(e) => setPromptData({ ...promptData, context: e.target.value })}
                placeholder="Ex: L'utilisateur cible des entrepreneurs en e-commerce avec un budget limité"
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
              Créez votre prompt utilisateur
            </h1>
            <p className="text-muted-foreground text-lg">
              La question ou tâche spécifique que vous voulez accomplir
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                User Prompt (Votre demande)
              </label>
              <textarea
                value={promptData.userPrompt}
                onChange={(e) => setPromptData({ ...promptData, userPrompt: e.target.value })}
                placeholder="Ex: Crée une stratégie de contenu Instagram pour une marque de café artisanal. Inclus 3 piliers de contenu et 10 idées de posts."
                rows={6}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                💡 Soyez spécifique : quoi, pourquoi, format attendu
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Format de sortie attendu
              </label>
              <input
                type="text"
                value={promptData.outputFormat}
                onChange={(e) => setPromptData({ ...promptData, outputFormat: e.target.value })}
                placeholder="Ex: Liste à puces, tableau, JSON, paragraphe..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Exemple de réponse attendue (Assistant Prompt - optionnel)
              </label>
              <textarea
                value={promptData.assistantExample}
                onChange={(e) => setPromptData({ ...promptData, assistantExample: e.target.value })}
                placeholder="Ex: Stratégie Instagram pour Café Artisan&#10;&#10;🎯 Pilier 1: Behind the scenes&#10;- Montrer la torréfaction&#10;- Portraits des producteurs&#10;..."
                rows={6}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                💡 Donnez un exemple concret du format/style de réponse souhaité
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-blue-500" />
                Bonnes pratiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Utilisez des verbes d'action clairs (Crée, Analyse, Liste, Génère...)</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Spécifiez la longueur attendue (nombre de mots, points, sections...)</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Donnez un exemple concret si le format est complexe</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Mentionnez les contraintes (ton, audience, limitations...)</span>
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
              Votre prompt optimisé
            </h1>
            <p className="text-muted-foreground text-lg">
              Prêt à être utilisé avec {selectedLLMData?.name}
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                {promptData.title || 'Prompt sans titre'}
              </CardTitle>
              {promptData.goal && (
                <CardDescription className="mt-2">
                  🎯 Objectif : {promptData.goal}
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
                      System
                    </Badge>
                    <span className="text-xs text-muted-foreground">Rôle et comportement</span>
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
                      Contexte
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
                      User
                    </Badge>
                    <span className="text-xs text-muted-foreground">Votre demande</span>
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
                  <span className="text-muted-foreground">Format attendu :</span>
                  <Badge variant="outline">{promptData.outputFormat}</Badge>
                </div>
              )}

              {/* Assistant Example */}
              {promptData.assistantExample && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Assistant Example
                    </Badge>
                    <span className="text-xs text-muted-foreground">Format de réponse</span>
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
                // TODO: Save to database
                alert('Fonctionnalité de sauvegarde à venir!')
              }}
            >
              <CheckCircle2 className="w-5 h-5" />
              Sauvegarder ce prompt
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                const fullPrompt = `SYSTEM:\n${promptData.systemPrompt}\n\n${promptData.context ? `CONTEXT:\n${promptData.context}\n\n` : ''}USER:\n${promptData.userPrompt}${promptData.assistantExample ? `\n\nASSISTANT EXAMPLE:\n${promptData.assistantExample}` : ''}`
                navigator.clipboard.writeText(fullPrompt)
                alert('Prompt copié dans le presse-papier!')
              }}
            >
              <Code className="w-5 h-5" />
              Copier le prompt
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
          Précédent
        </Button>

        {step < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={step === 1 && !selectedLLM}
            className="gap-2"
          >
            Suivant
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              // Redirect to create page with pre-filled data
              window.location.href = '/prompts/new'
            }}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Créer le prompt
          </Button>
        )}
      </div>
    </div>
  )
}
