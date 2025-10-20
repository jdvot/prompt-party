'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CommentItem } from './comment-item'
import { CommentForm } from './comment-form'
import { useRouter } from 'next/navigation'

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles?: {
    name: string | null
    avatar_url?: string | null
  }
}

interface CommentListProps {
  promptId: string
  initialComments: Comment[]
  userId?: string
}

export function CommentList({ promptId, initialComments, userId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Subscribe to realtime changes
    const channel = supabase
      .channel(`comments-${promptId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `prompt_id=eq.${promptId}`,
        },
        async (payload) => {
          // Fetch the new comment with author info
          const { data: newComment } = await supabase
            .from('comments')
            .select(`
              *,
              profiles:user_id (
                name,
                avatar_url
              )
            `)
            .eq('id', payload.new.id)
            .single()

          if (newComment) {
            setComments((prev) => [newComment, ...prev])
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'comments',
          filter: `prompt_id=eq.${promptId}`,
        },
        (payload) => {
          setComments((prev) => prev.filter((c) => c.id !== payload.old.id))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [promptId, supabase])

  const handleCommentAdded = () => {
    router.refresh()
  }

  const handleDelete = async (commentId: string) => {
    const response = await fetch(`/api/prompts/${promptId}/comments`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId }),
    })

    if (!response.ok) {
      throw new Error('Failed to delete comment')
    }

    setComments((prev) => prev.filter((c) => c.id !== commentId))
  }

  return (
    <div className="space-y-6">
      {userId ? (
        <CommentForm promptId={promptId} onCommentAdded={handleCommentAdded} />
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          <p>
            <button
              onClick={() => router.push('/auth/login')}
              className="text-primary hover:underline"
            >
              Sign in
            </button>{' '}
            to comment
          </p>
        </div>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              id={comment.id}
              content={comment.content}
              created_at={comment.created_at}
              user_id={comment.user_id}
              author={comment.profiles}
              currentUserId={userId}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
