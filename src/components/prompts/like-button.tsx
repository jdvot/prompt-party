'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface LikeButtonProps {
  promptId: string
  initialLikes: number
  initialIsLiked?: boolean
  userId?: string
}

export function LikeButton({ promptId, initialLikes, initialIsLiked = false, userId }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    // Check if user has liked this prompt
    const checkLike = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('prompt_id', promptId)
        .eq('user_id', userId)
        .maybeSingle()

      setIsLiked(!!data && !error)
    }

    checkLike()

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`likes-${promptId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'likes',
          filter: `prompt_id=eq.${promptId}`,
        },
        async (payload) => {
          // Refresh likes count
          const { data: prompt } = await (supabase
            .from('prompts') as any)
            .select('likes_count')
            .eq('id', promptId)
            .single()

          if (prompt) {
            setLikes(prompt.likes_count)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [promptId, userId, supabase])

  const handleLike = async () => {
    if (!userId) {
      router.push('/auth/login')
      return
    }

    setIsLoading(true)

    try {
      if (isLiked) {
        // Unlike
        const response = await fetch(`/api/prompts/${promptId}/like`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setIsLiked(false)
          setLikes((prev) => prev - 1)
        }
      } else {
        // Like
        const response = await fetch(`/api/prompts/${promptId}/like`, {
          method: 'POST',
        })

        if (response.ok) {
          setIsLiked(true)
          setLikes((prev) => prev + 1)
        }
      }

      router.refresh()
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-all disabled:opacity-50 ${
        isLiked
          ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
          : 'hover:bg-accent'
      }`}
    >
      <svg
        className={`w-5 h-5 transition-all ${isLiked ? 'fill-current' : 'fill-none'}`}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="font-medium">{likes}</span>
    </button>
  )
}
