'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

interface ShortcutsContextValue {
  showHelp: () => void
}

const ShortcutsContext = React.createContext<ShortcutsContextValue | undefined>(
  undefined
)

export function ShortcutsProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      // Modifier keys
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey

      // ? - Show shortcuts help (Shift + / on most keyboards)
      if ((e.key === '?' || (e.key === '/' && e.shiftKey)) && !modifier) {
        e.preventDefault()
        setShowModal(true)
        return
      }

      // Escape - Close modal
      if (e.key === 'Escape' && showModal) {
        e.preventDefault()
        setShowModal(false)
        return
      }

      // N - New prompt (with modifier)
      if (e.key === 'n' && modifier) {
        e.preventDefault()
        router.push('/prompts/new')
        return
      }

      // H - Home
      if (e.key === 'h' && !modifier) {
        e.preventDefault()
        router.push('/')
        return
      }

      // T - Trending
      if (e.key === 't' && !modifier) {
        e.preventDefault()
        router.push('/trending')
        return
      }

      // C - Collections
      if (e.key === 'c' && !modifier) {
        e.preventDefault()
        router.push('/collections')
        return
      }

      // / - Focus search (future)
      if (e.key === '/') {
        e.preventDefault()
        // Will implement search later
        console.log('Search shortcut - coming soon!')
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router, showModal])

  const showHelp = React.useCallback(() => {
    setShowModal(true)
  }, [])

  const value = React.useMemo(() => ({ showHelp }), [showHelp])

  return (
    <ShortcutsContext.Provider value={value}>
      {children}

      {/* Shortcuts Help Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-card border rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
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

              <div className="space-y-6">
                {/* Navigation */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                    Navigation
                  </h3>
                  <div className="space-y-2">
                    <ShortcutRow keys={['H']} description="Go to Home" />
                    <ShortcutRow keys={['T']} description="Go to Trending" />
                    <ShortcutRow keys={['C']} description="Go to Collections" />
                    <ShortcutRow
                      keys={['⌘', 'N']}
                      macKeys={['⌘', 'N']}
                      winKeys={['Ctrl', 'N']}
                      description="Create new prompt"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                    Actions (on prompt pages)
                  </h3>
                  <div className="space-y-2">
                    <ShortcutRow keys={['L']} description="Like/Unlike prompt" />
                    <ShortcutRow keys={['S']} description="Save to collection" />
                    <ShortcutRow keys={['D']} description="Duplicate prompt" />
                    <ShortcutRow keys={['R']} description="Remix prompt" />
                    <ShortcutRow keys={['Shift', 'S']} description="Share prompt" />
                  </div>
                </div>

                {/* General */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                    General
                  </h3>
                  <div className="space-y-2">
                    <ShortcutRow keys={['/']} description="Focus search" />
                    <ShortcutRow keys={['?']} description="Show this help" />
                    <ShortcutRow keys={['Esc']} description="Close modals" />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  Press <kbd className="px-2 py-1 bg-muted rounded text-xs">?</kbd> anytime to view shortcuts
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </ShortcutsContext.Provider>
  )
}

function ShortcutRow({
  keys,
  macKeys,
  winKeys,
  description,
}: {
  keys: string[]
  macKeys?: string[]
  winKeys?: string[]
  description: string
}) {
  const isMac =
    typeof navigator !== 'undefined' &&
    navigator.platform.toUpperCase().indexOf('MAC') >= 0

  const displayKeys = isMac && macKeys ? macKeys : winKeys || keys

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors">
      <span className="text-sm">{description}</span>
      <div className="flex items-center gap-1">
        {displayKeys.map((key, i) => (
          <React.Fragment key={i}>
            <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono font-medium">
              {key}
            </kbd>
            {i < displayKeys.length - 1 && (
              <span className="text-muted-foreground text-xs">+</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function useShortcuts() {
  const context = React.useContext(ShortcutsContext)
  if (!context) {
    throw new Error('useShortcuts must be used within ShortcutsProvider')
  }
  return context
}
