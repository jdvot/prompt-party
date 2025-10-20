'use client'

import { useState } from 'react'
import { MarkdownPreview } from './markdown-preview'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <Card className="overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b bg-muted/50">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={cn(
            'px-4 py-2.5 text-sm font-medium transition-all duration-200 relative',
            !showPreview
              ? 'bg-background text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
          )}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={cn(
            'px-4 py-2.5 text-sm font-medium transition-all duration-200 relative',
            showPreview
              ? 'bg-background text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
          )}
        >
          Preview
        </button>

        {/* Quick actions */}
        <div className="ml-auto flex items-center gap-1 px-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n**bold text**')}
            title="Bold (Ctrl+B)"
          >
            <span className="font-bold">B</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n*italic text*')}
            title="Italic (Ctrl+I)"
          >
            <span className="italic">I</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n`code`')}
            title="Inline Code"
          >
            <span className="font-mono">{`</>`}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n```\ncode block\n```')}
            title="Code Block"
          >
            <span className="font-mono">{ }</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n# Heading')}
            title="Heading"
          >
            H
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n- List item')}
            title="Bullet List"
          >
            •
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n1. Numbered item')}
            title="Numbered List"
          >
            1.
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n> Quote')}
            title="Quote"
          >
            "
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n[link text](url)')}
            title="Link"
          >
            🔗
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-0">
        {!showPreview ? (
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || 'Write your prompt here... (Markdown supported)'}
              className="w-full min-h-[300px] p-4 bg-background border-0 focus:outline-none focus:ring-0 resize-none font-mono text-sm leading-relaxed transition-colors duration-200"
            />
          </div>
        ) : (
          <div className="min-h-[300px] p-4 prose prose-sm dark:prose-invert max-w-none">
            {value ? (
              <MarkdownPreview content={value} />
            ) : (
              <p className="text-muted-foreground italic">Nothing to preview yet. Start writing to see the preview.</p>
            )}
          </div>
        )}
      </CardContent>

      {/* Helper text */}
      {!showPreview && (
        <div className="px-4 py-2.5 bg-muted/30 text-xs text-muted-foreground border-t flex items-center justify-between">
          <span>Markdown supported: **bold**, *italic*, `code`, [links](url), etc.</span>
          <span className="text-muted-foreground/60">{value.length} characters</span>
        </div>
      )}
    </Card>
  )
}
