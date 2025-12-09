'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { UserPlusIcon, UserMinusIcon } from 'lucide-react'

interface FollowButtonProps {
  targetUserId: string
  targetUsername: string
  initialIsFollowing?: boolean
}

export function FollowButton({
  targetUserId,
  targetUsername,
  initialIsFollowing = false,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const checkFollowStatus = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId)
      .single()

    setIsFollowing(!!data)
  }, [supabase, targetUserId])

  useEffect(() => {
    checkFollowStatus()
  }, [targetUserId, checkFollowStatus])

  const handleFollow = async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/auth/login'
      return
    }

    try {
      if (isFollowing) {
        // Unfollow
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', targetUserId)

        setIsFollowing(false)
      } else {
        // Follow
        await (supabase.from('follows') as any).insert({
          follower_id: user.id,
          following_id: targetUserId,
        })

        setIsFollowing(true)
      }
    } catch (error) {
      console.error('Follow error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={isFollowing ? 'outline' : 'primary'}
      size="sm"
      onClick={handleFollow}
      disabled={loading}
    >
      {isFollowing ? (
        <>
          <UserMinusIcon className="mr-2 h-4 w-4" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlusIcon className="mr-2 h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  )
}
