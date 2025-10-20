'use client'

import { useEffect } from 'react'

interface PromptShortcutsProps {
  onLike?: () => void
  onSave?: () => void
  onDuplicate?: () => void
  onRemix?: () => void
  onShare?: () => void
}

export function PromptShortcuts({
  onLike,
  onSave,
  onDuplicate,
  onRemix,
  onShare,
}: PromptShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      // L - Like
      if (e.key === 'l' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        onLike?.()
        return
      }

      // S - Save
      if (e.key === 's' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        onSave?.()
        return
      }

      // D - Duplicate
      if (e.key === 'd' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        onDuplicate?.()
        return
      }

      // R - Remix
      if (e.key === 'r' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        onRemix?.()
        return
      }

      // Shift+S - Share
      if (e.key === 'S' && e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        onShare?.()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onLike, onSave, onDuplicate, onRemix, onShare])

  return null
}
