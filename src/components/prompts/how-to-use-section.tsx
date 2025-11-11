'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { CopyIcon, CheckIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface HowToUseSectionProps {
  promptContent: string
}

export function HowToUseSection({ promptContent }: HowToUseSectionProps) {
  const t = useTranslations()
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
        <CardTitle className="text-lg">{t('components.howToUse.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">{t('components.howToUse.step1')}</strong> using the button below
          </li>
          <li>
            <strong className="text-foreground">{t('components.howToUse.step2')}</strong> (ChatGPT, Claude, Gemini, etc.)
          </li>
          <li>
            <strong className="text-foreground">{t('components.howToUse.step3')}</strong> and customize any variables or placeholders
          </li>
          <li>
            <strong className="text-foreground">{t('components.howToUse.step4')}</strong> and iterate as needed
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
              {t('components.howToUse.copiedFeedback')}
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4 mr-2" />
              {t('components.howToUse.copyButton')}
            </>
          )}
        </Button>

        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold mb-2">{t('components.howToUse.compatibleModels')}</h4>
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
