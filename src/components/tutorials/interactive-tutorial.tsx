'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const examplePrompts = [
  {
    title: 'Basic Instruction',
    prompt: 'Write a professional email to schedule a meeting with a client.',
    category: 'Simple',
    explanation: 'Direct, clear instruction with a specific task.'
  },
  {
    title: 'Role-Based Prompting',
    prompt: 'You are an expert software architect. Design a scalable microservices architecture for an e-commerce platform. Consider: load balancing, database sharding, caching strategy, and API gateway.',
    category: 'Intermediate',
    explanation: 'Assigns a role to the AI and provides specific requirements.'
  },
  {
    title: 'Chain-of-Thought',
    prompt: 'A train travels at 60 km/h and needs to cover 180 km. How long will it take?\n\nThink step by step:\n1. Identify the formula\n2. Plug in the values\n3. Calculate the result\n4. Verify your answer',
    category: 'Advanced',
    explanation: 'Guides the AI to break down the problem into steps.'
  },
  {
    title: 'Few-Shot Learning',
    prompt: 'Convert these sentences to questions:\n\nSentence: The cat is sleeping.\nQuestion: Is the cat sleeping?\n\nSentence: They went to the park.\nQuestion: Did they go to the park?\n\nSentence: She enjoys reading books.\nQuestion:',
    category: 'Advanced',
    explanation: 'Provides examples to teach the AI the pattern.'
  }
]

export function InteractiveTutorial() {
  const [selectedPrompt, setSelectedPrompt] = useState(examplePrompts[0])
  const [customPrompt, setCustomPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 border-violet-600/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl">Interactive Prompt Builder</CardTitle>
        </div>
        <CardDescription>
          Try different prompting techniques and see how they work
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="examples" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="examples">Example Prompts</TabsTrigger>
            <TabsTrigger value="custom">Write Your Own</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="space-y-6">
            {/* Example Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {examplePrompts.map((example, index) => (
                <Button
                  key={index}
                  variant={selectedPrompt.title === example.title ? undefined : 'outline'}
                  onClick={() => setSelectedPrompt(example)}
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
                key={selectedPrompt.title}
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
                      {selectedPrompt.title}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(selectedPrompt.prompt)}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm font-mono bg-background p-3 rounded border">
                    {selectedPrompt.prompt}
                  </pre>
                </div>

                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-sm">💡 Why This Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {selectedPrompt.explanation}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Write your prompt:</label>
              <Textarea
                placeholder="Try writing your own prompt here..."
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
                Clear
              </Button>
              <Button
                onClick={() => handleCopy(customPrompt)}
                disabled={!customPrompt}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
            </div>

            <Card className="border-violet-600/20 bg-violet-600/5">
              <CardHeader>
                <CardTitle className="text-sm">✏️ Tips for Better Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Be specific and clear about what you want</li>
                  <li>Provide context and constraints</li>
                  <li>Use examples when appropriate (few-shot learning)</li>
                  <li>Ask the AI to think step-by-step for complex tasks</li>
                  <li>Define the role or expertise level you need</li>
                  <li>Specify the format of the output you want</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
