'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function InteractiveTutorial() {
  const t = useTranslations('tutorials.interactiveTutorial')

  const examplePrompts = useMemo(() => [
    {
      title: t('examples.basic.title'),
      prompt: t('examples.basic.prompt'),
      category: t('examples.basic.category'),
      explanation: t('examples.basic.explanation')
    },
    {
      title: t('examples.roleBased.title'),
      prompt: t('examples.roleBased.prompt'),
      category: t('examples.roleBased.category'),
      explanation: t('examples.roleBased.explanation')
    },
    {
      title: t('examples.chainOfThought.title'),
      prompt: t('examples.chainOfThought.prompt'),
      category: t('examples.chainOfThought.category'),
      explanation: t('examples.chainOfThought.explanation')
    },
    {
      title: t('examples.fewShot.title'),
      prompt: t('examples.fewShot.prompt'),
      category: t('examples.fewShot.category'),
      explanation: t('examples.fewShot.explanation')
    }
  ], [t])

  const [selectedPrompt, setSelectedPrompt] = useState(0)
  const [customPrompt, setCustomPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-gradient-to-br from-violet-600/5 to-violet-600/5 border-violet-600/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
        </div>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="examples" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="examples">{t('tabExamples')}</TabsTrigger>
            <TabsTrigger value="custom">{t('tabCustom')}</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="space-y-6">
            {/* Example Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {examplePrompts.map((example, index) => (
                <Button
                  key={index}
                  variant={selectedPrompt === index ? undefined : 'outline'}
                  onClick={() => setSelectedPrompt(index)}
                  className="h-auto py-3 flex-col items-start text-left"
                >
                  <span className="font-semibold text-sm">{example.title}</span>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {example.category}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Selected Prompt Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPrompt}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="bg-muted/50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      {examplePrompts[selectedPrompt].title}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(examplePrompts[selectedPrompt].prompt)}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          {t('copiedButton')}
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          {t('copyButton')}
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm font-mono bg-background p-3 rounded border">
                    {examplePrompts[selectedPrompt].prompt}
                  </pre>
                </div>

                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-sm">{t('whyThisWorks')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {examplePrompts[selectedPrompt].explanation}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('writePromptLabel')}</label>
              <Textarea
                placeholder={t('writePromptPlaceholder')}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={8}
                className="font-mono"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCustomPrompt('')}
                disabled={!customPrompt}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('clearButton')}
              </Button>
              <Button
                onClick={() => handleCopy(customPrompt)}
                disabled={!customPrompt}
              >
                <Copy className="w-4 h-4 mr-2" />
                {t('copyToClipboard')}
              </Button>
            </div>

            <Card className="border-violet-600/20 bg-violet-600/5">
              <CardHeader>
                <CardTitle className="text-sm">{t('tipsTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>{t('tip1')}</li>
                  <li>{t('tip2')}</li>
                  <li>{t('tip3')}</li>
                  <li>{t('tip4')}</li>
                  <li>{t('tip5')}</li>
                  <li>{t('tip6')}</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
