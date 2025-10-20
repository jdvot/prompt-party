'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { CodeIcon, CheckIcon } from 'lucide-react'

interface EmbedButtonProps {
  promptId: string
}

export function EmbedButton({ promptId }: EmbedButtonProps) {
  const [showModal, setShowModal] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const [width, setWidth] = React.useState('600')
  const [height, setHeight] = React.useState('400')

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const embedUrl = `${baseUrl}/embed/${promptId}?theme=${theme}`

  const embedCode = `<iframe
  src="${embedUrl}"
  width="${width}"
  height="${height}"
  frameborder="0"
  style="border: 1px solid #e2e8f0; border-radius: 8px;"
  title="Prompt Party Embed"
></iframe>`

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowModal(true)}
        aria-label="Embed prompt"
      >
        <CodeIcon className="w-4 h-4 mr-2" />
        Embed
      </Button>

      {showModal && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-card border rounded-lg shadow-2xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Embed Prompt</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Settings */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Theme</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex-1 px-4 py-2 rounded-md border transition-colors ${
                        theme === 'light'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-input hover:bg-muted'
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex-1 px-4 py-2 rounded-md border transition-colors ${
                        theme === 'dark'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-input hover:bg-muted'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Preview</label>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="300"
                    style={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    title="Prompt Party Embed Preview"
                  />
                </div>
              </div>

              {/* Embed Code */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Embed Code
                </label>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
                    <code>{embedCode}</code>
                  </pre>
                  <button
                    onClick={copyCode}
                    className="absolute top-2 right-2 p-2 bg-background border rounded-md hover:bg-muted transition-colors"
                    aria-label="Copy code"
                  >
                    {copied ? (
                      <CheckIcon className="w-4 h-4 text-success" />
                    ) : (
                      <CodeIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Copy and paste this code into your website to embed this prompt.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
