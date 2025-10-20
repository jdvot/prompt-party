'use client'

import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

interface CommentItemProps {
  id: string
  content: string
  created_at: string
  user_id: string
  author?: {
    name: string | null
    avatar_url?: string | null
  }
  currentUserId?: string
  onDelete: (id: string) => void
}

export function CommentItem({
  id,
  content,
  created_at,
  user_id,
  author,
  currentUserId,
  onDelete,
}: CommentItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const isAuthor = currentUserId === user_id

  const handleDelete = async () => {
    if (!confirm('Delete this comment?')) return

    setIsDeleting(true)
    try {
      await onDelete(id)
    } catch (error) {
      console.error('Error deleting comment:', error)
      setIsDeleting(false)
    }
  }

  return (
    <div className="border-b pb-4 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm flex-shrink-0">
            {(author?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm mb-1">
              <span className="font-medium">{author?.name || 'Anonymous'}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
          </div>
        </div>
        {isAuthor && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-muted-foreground hover:text-destructive text-sm px-2 py-1 rounded hover:bg-accent transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  )
}
