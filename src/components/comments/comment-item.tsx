'use client'

import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

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
    <div className="group border-b pb-4 last:border-b-0 transition-colors duration-200 hover:bg-muted/30 -mx-4 px-4 py-3 rounded-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm flex-shrink-0 ring-2 ring-primary/20 transition-all duration-200 group-hover:ring-primary/40">
            {(author?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm mb-1.5">
              <span className="font-semibold text-foreground">{author?.name || 'Anonymous'}</span>
              <span className="text-muted-foreground/60">•</span>
              <time className="text-muted-foreground text-xs">
                {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
              </time>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground/90">
              {content}
            </p>
          </div>
        </div>
        {isAuthor && (
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2Icon className="w-4 h-4" />
            <span className="sr-only">Delete comment</span>
          </Button>
        )}
      </div>
    </div>
  )
}
