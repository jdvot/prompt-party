'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    checkFollowStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetUserId])

  const checkFollowStatus = async () => {
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
  }

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
        await supabase.from('follows').insert({
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
