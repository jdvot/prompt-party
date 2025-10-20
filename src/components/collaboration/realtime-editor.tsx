'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Users, Circle } from 'lucide-react'
import type { RealtimeChannel } from '@supabase/supabase-js'

interface CollaboratorPresence {
  user_id: string
  username: string
  avatar_url?: string
  cursor_position?: number
  last_active: string
}

interface RealtimeEditorProps {
  promptId: string
  userId?: string
  userName?: string
  onContentChange?: (content: string) => void
  children: React.ReactNode
}

export function RealtimeEditor({
  promptId,
  userId,
  userName,
  onContentChange,
  children,
}: RealtimeEditorProps) {
  const [collaborators, setCollaborators] = useState<CollaboratorPresence[]>([])
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!promptId || !userId) return

    // Create presence channel
    const presenceChannel = supabase.channel(`prompt:${promptId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    })

    // Track presence
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState()
        const users = Object.values(state).flat() as unknown as CollaboratorPresence[]
        setCollaborators(users.filter(u => u.user_id !== userId))
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences)
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            user_id: userId,
            username: userName || 'Anonymous',
            last_active: new Date().toISOString(),
          })
        }
      })

    setChannel(presenceChannel)

    // Cleanup on unmount
    return () => {
      presenceChannel.unsubscribe()
    }
  }, [promptId, userId, userName])

  // Broadcast cursor position
  const broadcastCursor = useCallback(
    (position: number) => {
      if (channel && userId) {
        channel.track({
          user_id: userId,
          username: userName || 'Anonymous',
          cursor_position: position,
          last_active: new Date().toISOString(),
        })
      }
    },
    [channel, userId, userName]
  )

  return (
    <div className="relative">
      {/* Collaborator Presence Indicator */}
      {collaborators.length > 0 && (
        <div className="absolute top-0 right-0 z-10">
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-3 py-1.5 shadow-lg"
          >
            <Users className="w-4 h-4" />
            <span className="font-medium">{collaborators.length}</span>
            <div className="flex items-center -space-x-2">
              {collaborators.slice(0, 3).map((collab) => (
                <div
                  key={collab.user_id}
                  className="relative"
                  title={collab.username}
                >
                  {collab.avatar_url ? (
                    <img
                      src={collab.avatar_url}
                      alt={collab.username}
                      className="w-6 h-6 rounded-full border-2 border-background"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-2 border-background flex items-center justify-center text-xs text-white font-bold">
                      {collab.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <Circle className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 fill-green-500 text-green-500" />
                </div>
              ))}
              {collaborators.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-bold">
                  +{collaborators.length - 3}
                </div>
              )}
            </div>
          </Badge>
        </div>
      )}

      {/* Editor Content */}
      <div className="relative">{children}</div>

      {/* Active Collaborators List */}
      {collaborators.length > 0 && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg border">
          <p className="text-sm font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Currently viewing ({collaborators.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {collaborators.map((collab) => (
              <Badge key={collab.user_id} variant="outline" className="gap-1.5">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                {collab.username}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
