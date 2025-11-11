'use client'

import { useState } from 'react'
import { MarkdownPreview } from './markdown-preview'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const t = useTranslations('editor')

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
          {t('write')}
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
          {t('preview')}
        </button>

        {/* Quick actions */}
        <div className="ml-auto flex items-center gap-1 px-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n**' + t('bold_text') + '**')}
            title={t('bold_tooltip')}
          >
            <span className="font-bold">B</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n*' + t('italic_text') + '*')}
            title={t('italic_tooltip')}
          >
            <span className="italic">I</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n`' + t('code_text') + '`')}
            title={t('inline_code_tooltip')}
          >
            <span className="font-mono">{`</>`}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n```\n' + t('code_block_text') + '\n```')}
            title={t('code_block_tooltip')}
          >
            <span className="font-mono">{ }</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n# ' + t('heading_text'))}
            title={t('heading_tooltip')}
          >
            H
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n- ' + t('list_item_text'))}
            title={t('bullet_list_tooltip')}
          >
            •
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n1. ' + t('numbered_item_text'))}
            title={t('numbered_list_tooltip')}
          >
            1.
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n> ' + t('quote_text'))}
            title={t('quote_tooltip')}
          >
            "
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onChange(value + '\n[' + t('link_text') + '](url)')}
            title={t('link_tooltip')}
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
              placeholder={placeholder || t('default_placeholder')}
              className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] p-3 sm:p-4 bg-background border-0 focus:outline-none focus:ring-0 resize-none font-mono text-sm leading-relaxed transition-colors duration-200"
            />
          </div>
        ) : (
          <div className="min-h-[200px] sm:min-h-[250px] md:min-h-[300px] p-3 sm:p-4 prose prose-sm dark:prose-invert max-w-none">
            {value ? (
              <MarkdownPreview content={value} />
            ) : (
              <p className="text-muted-foreground italic">{t('preview_empty')}</p>
            )}
          </div>
        )}
      </CardContent>

      {/* Helper text */}
      {!showPreview && (
        <div className="px-4 py-2.5 bg-muted/30 text-xs text-muted-foreground border-t flex items-center justify-between">
          <span>{t('markdown_help')}</span>
          <span className="text-muted-foreground/60">{t('characters_count', { count: value.length })}</span>
        </div>
      )}
    </Card>
  )
}
