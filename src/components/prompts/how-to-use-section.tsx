'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CopyIcon, CheckIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface HowToUseSectionProps {
  promptContent: string
}

export function HowToUseSection({ promptContent }: HowToUseSectionProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promptContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">How to Use This Prompt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Copy the prompt</strong> using the button below
          </li>
          <li>
            <strong className="text-foreground">Open your AI assistant</strong> (ChatGPT, Claude, Gemini, etc.)
          </li>
          <li>
            <strong className="text-foreground">Paste the prompt</strong> and customize any variables or placeholders
          </li>
          <li>
            <strong className="text-foreground">Review the output</strong> and iterate as needed
          </li>
        </ol>

        <Button
          onClick={copyToClipboard}
          className="w-full"
          variant={copied ? "outline" : "primary"}
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 mr-2" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4 mr-2" />
              Copy Prompt
            </>
          )}
        </Button>

        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold mb-2">Compatible AI Models</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
              ChatGPT-4
            </span>
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
              Claude 3
            </span>
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
              Gemini Pro
            </span>
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
              GPT-3.5
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
