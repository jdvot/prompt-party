'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div className="relative group">
      {title && (
        <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border border-b-0">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className={`bg-muted/50 p-4 ${title ? '' : 'rounded-lg'} ${!title ? 'rounded-t-lg' : ''} rounded-b-lg border overflow-x-auto`}>
          <code className="text-sm font-mono">
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none pr-4 text-muted-foreground/50">
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1">{code}</div>
              </div>
            ) : (
              code
            )}
          </code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
