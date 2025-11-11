'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface CommentFormProps {
  promptId: string
  onCommentAdded: () => void
}

export function CommentForm({ promptId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('comments')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/prompts/${promptId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || t('error_posting'))
      }

      setContent('')
      onCommentAdded()
    } catch (error) {
      console.error('Error posting comment:', error)
      alert(error instanceof Error ? error.message : t('error_posting'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('add_comment')}
        className="w-full min-h-[80px] sm:min-h-[100px] px-4 py-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('posting') : t('post_comment')}
        </button>
      </div>
    </form>
  )
}
