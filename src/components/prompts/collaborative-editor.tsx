'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'
import { Users, Eye, Edit } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface User {
  id: string
  name: string
  avatar_url?: string
  color: string
}

interface Presence {
  user: User
  cursor_position?: number
  last_seen: string
}

interface CollaborativeEditorProps {
  promptId: string
  initialTitle: string
  initialBody: string
  currentUserId: string
  currentUserName: string
  onTitleChange: (title: string) => void
  onBodyChange: (body: string) => void
}

const COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#06b6d4', // cyan
  '#f97316', // orange
]

export function CollaborativeEditor({
  promptId,
  initialTitle,
  initialBody,
  currentUserId,
  currentUserName,
  onTitleChange,
  onBodyChange,
}: CollaborativeEditorProps) {
  const t = useTranslations()
  const { toast } = useToast()
  const supabase = createClient()
  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const [activeUsers, setActiveUsers] = useState<Presence[]>([])
  const [isOnline, setIsOnline] = useState(true)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const presenceChannel = useRef<any>(null)
  const updateTimeout = useRef<NodeJS.Timeout | undefined>(undefined)
  const onTitleChangeRef = useRef(onTitleChange)
  const onBodyChangeRef = useRef(onBodyChange)

  // Keep refs up to date
  useEffect(() => {
    onTitleChangeRef.current = onTitleChange
    onBodyChangeRef.current = onBodyChange
  }, [onTitleChange, onBodyChange])

  const userColor = COLORS[Math.floor(Math.random() * COLORS.length)]

  useEffect(() => {
    const channel = supabase.channel(`prompt:${promptId}`)

    // Track presence
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        const users: Presence[] = []

        Object.keys(state).forEach((key) => {
          const presences = state[key] as any[]
          presences.forEach((presence) => {
            if (presence.user_id !== currentUserId) {
              users.push({
                user: {
                  id: presence.user_id,
                  name: presence.user_name,
                  avatar_url: presence.avatar_url,
                  color: presence.color,
                },
                cursor_position: presence.cursor_position,
                last_seen: new Date().toISOString(),
              })
            }
          })
        })

        setActiveUsers(users)
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        const user = newPresences[0]
        if (user.user_id !== currentUserId) {
          toast({
            title: t('components.collaborativeEditor.userJoined', { userName: user.user_name }),
            description: t('components.collaborativeEditor.userJoinedDesc'),
          })
        }
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        const user = leftPresences[0]
        if (user.user_id !== currentUserId) {
          toast({
            title: t('components.collaborativeEditor.userLeft', { userName: user.user_name }),
            description: t('components.collaborativeEditor.userLeftDesc'),
          })
        }
      })

    // Subscribe to real-time content changes
    // Using any cast for broadcast - Supabase Realtime types issue
    const channelAny = channel as any
    channelAny
      .on(
        'broadcast',
        { event: 'title_update' },
        (payload: { title: string; user_id: string }) => {
          if (payload.user_id !== currentUserId) {
            setTitle(payload.title)
            onTitleChangeRef.current(payload.title)
          }
        }
      )
      .on(
        'broadcast',
        { event: 'body_update' },
        (payload: { body: string; user_id: string }) => {
          if (payload.user_id !== currentUserId) {
            setBody(payload.body)
            onBodyChangeRef.current(payload.body)
          }
        }
      )
      .on(
        'broadcast',
        { event: 'cursor_update' },
        (payload: { user_id: string; position: number }) => {
          setActiveUsers((users) =>
            users.map((u) =>
              u.user.id === payload.user_id
                ? { ...u, cursor_position: payload.position }
                : u
            )
          )
        }
      )

    // Track our presence
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          user_id: currentUserId,
          user_name: currentUserName,
          color: userColor,
          online_at: new Date().toISOString(),
        })
        setIsOnline(true)
      }
    })

    presenceChannel.current = channel

    // Cleanup
    return () => {
      channel.unsubscribe()
    }
  }, [promptId, currentUserId, currentUserName, userColor, supabase, toast])

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      setTitle(newTitle)
      onTitleChange(newTitle)

      // Debounce broadcast
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current)
      }

      updateTimeout.current = setTimeout(() => {
        presenceChannel.current?.send({
          type: 'broadcast',
          event: 'title_update',
          payload: { title: newTitle, user_id: currentUserId },
        })
      }, 300)
    },
    [currentUserId, onTitleChange]
  )

  const handleBodyChange = useCallback(
    (newBody: string) => {
      setBody(newBody)
      onBodyChange(newBody)

      // Debounce broadcast
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current)
      }

      updateTimeout.current = setTimeout(() => {
        presenceChannel.current?.send({
          type: 'broadcast',
          event: 'body_update',
          payload: { body: newBody, user_id: currentUserId },
        })
      }, 300)
    },
    [currentUserId, onBodyChange]
  )

  const handleCursorMove = useCallback(() => {
    if (bodyRef.current) {
      const position = bodyRef.current.selectionStart
      presenceChannel.current?.send({
        type: 'broadcast',
        event: 'cursor_update',
        payload: { user_id: currentUserId, position },
      })
    }
  }, [currentUserId])

  return (
    <div className="space-y-4">
      {/* Active Users */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-2">
            <Users className="w-3 h-3" />
            {activeUsers.length + 1} {activeUsers.length === 0 ? 'user' : 'users'} editing
          </Badge>
          {isOnline ? (
            <Badge variant="outline" className="gap-2 border-green-600 text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Live
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-2 border-muted text-muted-foreground">
              <span className="w-2 h-2 bg-muted rounded-full" />
              Offline
            </Badge>
          )}
        </div>

        {/* Active Users Avatars */}
        {activeUsers.length > 0 && (
          <div className="flex -space-x-2">
            <AnimatePresence>
              {activeUsers.slice(0, 5).map((presence) => (
                <motion.div
                  key={presence.user.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative"
                >
                  <Avatar
                    className="w-8 h-8 border-2 border-background"
                    style={{ borderColor: presence.user.color }}
                  >
                    <AvatarImage src={presence.user.avatar_url} />
                    <AvatarFallback style={{ backgroundColor: presence.user.color }}>
                      {presence.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {presence.cursor_position !== undefined && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background">
                      <Edit className="w-2 h-2 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {activeUsers.length > 5 && (
              <Avatar className="w-8 h-8 border-2 border-background">
                <AvatarFallback className="text-xs">+{activeUsers.length - 5}</AvatarFallback>
              </Avatar>
            )}
          </div>
        )}
      </div>

      {/* Title Input */}
      <div className="relative">
        <Input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Prompt title..."
          className="text-lg font-semibold"
        />
        {activeUsers.some((u) => u.cursor_position !== undefined) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Eye className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Body Textarea */}
      <div className="relative">
        <Textarea
          ref={bodyRef}
          value={body}
          onChange={(e) => handleBodyChange(e.target.value)}
          onSelect={handleCursorMove}
          onKeyUp={handleCursorMove}
          onClick={handleCursorMove}
          placeholder="Write your prompt here..."
          rows={15}
          className="font-mono"
        />
        {/* Cursor Indicators */}
        <div className="absolute top-2 right-2 flex gap-1">
          {activeUsers
            .filter((u) => u.cursor_position !== undefined)
            .slice(0, 3)
            .map((presence) => (
              <motion.div
                key={presence.user.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-white"
                style={{ backgroundColor: presence.user.color }}
              >
                <Edit className="w-3 h-3" />
                {presence.user.name.split(' ')[0]}
              </motion.div>
            ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          {activeUsers.length > 0 ? (
            <span>
              Collaborating with{' '}
              <strong>
                {activeUsers
                  .slice(0, 2)
                  .map((u) => u.user.name.split(' ')[0])
                  .join(', ')}
              </strong>
              {activeUsers.length > 2 && ` and ${activeUsers.length - 2} others`}
            </span>
          ) : (
            <span>You are the only one editing</span>
          )}
        </div>
        <span>Changes are saved automatically</span>
      </div>
    </div>
  )
}
