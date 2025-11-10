'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
  copyable?: boolean
}

export function CodeBlock({ code, language, title, copyable = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Simple syntax highlighting for common patterns
  const highlightCode = (code: string, lang: string) => {
    let highlighted = code

    if (lang === 'typescript' || lang === 'tsx') {
      // Keywords
      highlighted = highlighted.replace(
        /\b(import|from|export|const|async|await|function|return|interface|type|extends|implements)\b/g,
        '<span class="text-blue-600 dark:text-blue-400">$1</span>'
      )
      // Strings
      highlighted = highlighted.replace(
        /(['"`])(?:(?=(\\?))\2.)*?\1/g,
        '<span class="text-green-600 dark:text-green-400">$&</span>'
      )
      // Comments
      highlighted = highlighted.replace(
        /\/\/.*$/gm,
        '<span class="text-gray-500 dark:text-gray-400">$&</span>'
      )
      // Numbers
      highlighted = highlighted.replace(
        /\b(\d+)\b/g,
        '<span class="text-amber-600 dark:text-amber-400">$1</span>'
      )
    }

    if (lang === 'bash' || lang === 'shell') {
      // Commands
      highlighted = highlighted.replace(
        /^(pnpm|npm|yarn|curl|git|docker|node|python)/gm,
        '<span class="text-blue-600 dark:text-blue-400">$1</span>'
      )
      // Strings
      highlighted = highlighted.replace(
        /(['"`])(?:(?=(\\?))\2.)*?\1/g,
        '<span class="text-green-600 dark:text-green-400">$&</span>'
      )
      // Comments
      highlighted = highlighted.replace(
        /#.*$/gm,
        '<span class="text-gray-500 dark:text-gray-400">$&</span>'
      )
    }

    if (lang === 'json') {
      // Keys
      highlighted = highlighted.replace(
        /"([^"]+)"\s*:/g,
        '"<span class="text-red-600 dark:text-red-400">$1</span>":'
      )
      // Strings
      highlighted = highlighted.replace(
        /:\s*"([^"]*)"/g,
        ': "<span class="text-green-600 dark:text-green-400">$1</span>"'
      )
      // Numbers
      highlighted = highlighted.replace(
        /:\s*(\d+)/g,
        ': <span class="text-amber-600 dark:text-amber-400">$1</span>'
      )
    }

    if (lang === 'markdown') {
      // Headers
      highlighted = highlighted.replace(
        /^(#+)\s/gm,
        '<span class="text-blue-600 dark:text-blue-400">$1</span> '
      )
      // Code blocks
      highlighted = highlighted.replace(
        /`([^`]+)`/g,
        '<span class="text-green-600 dark:text-green-400">`$1`</span>'
      )
      // Bold
      highlighted = highlighted.replace(
        /\*\*([^\*]+)\*\*/g,
        '<span class="font-bold text-foreground">**$1**</span>'
      )
    }

    return highlighted
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900">
      {title && (
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
          <p className="text-sm font-medium text-foreground">{title}</p>
        </div>
      )}

      <div className="relative">
        {copyable && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-700"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </Button>
        )}

        <pre className="p-4 overflow-x-auto">
          <code
            className={`text-sm font-mono text-foreground language-${language}`}
            dangerouslySetInnerHTML={{
              __html: highlightCode(code, language),
            }}
          />
        </pre>
      </div>
    </div>
  )
}
