'use client'

import { useState } from 'react'
import { MarkdownPreview } from './markdown-preview'

interface RemixEditorProps {
  defaultValue: string
}

export function RemixEditor({ defaultValue }: RemixEditorProps) {
  const [value, setValue] = useState(defaultValue)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b bg-muted/50">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              !showPreview
                ? 'bg-background text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              showPreview
                ? 'bg-background text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!showPreview ? (
            <textarea
              name="body"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write your prompt here... (Markdown supported)"
              className="w-full min-h-[300px] p-4 bg-background border-0 focus:outline-none focus:ring-0 resize-none font-mono text-sm"
            />
          ) : (
            <div className="min-h-[300px] p-4">
              <MarkdownPreview content={value} />
            </div>
          )}
        </div>

        {/* Helper text */}
        {!showPreview && (
          <div className="px-4 py-2 bg-muted/30 text-xs text-muted-foreground border-t">
            Markdown supported: **bold**, *italic*, `code`, [links](url), etc.
          </div>
        )}
      </div>
    </>
  )
}
