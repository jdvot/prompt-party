'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('tutorials')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group w-full">
      {filename && (
        <div className="bg-muted px-4 py-2 text-sm font-mono border-b text-muted-foreground rounded-t-lg">
          {filename}
        </div>
      )}
      <div className="relative w-full">
        <pre className={`w-full p-4 overflow-x-auto bg-muted/50 border ${filename ? '' : 'rounded-t-lg'} rounded-b-lg`}>
          <code className={`language-${language} text-sm block whitespace-pre-wrap break-words`}>{code}</code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              {t('code_copied')}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              {t('code_copy')}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
