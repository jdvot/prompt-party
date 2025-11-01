'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/hooks/use-toast'
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Share2,
  Check,
  CheckCheck,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'remix'
  user_id: string
  prompt_id?: string
  comment_id?: string
  actor_id: string
  actor_name: string
  actor_avatar?: string
  content?: string
  is_read: boolean
  created_at: string
}

export function NotificationCenter() {
  const { toast } = useToast()
  const supabase = createClient()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const unreadCount = notifications.filter((n) => !n.is_read).length

  const loadNotifications = useCallback(async () => {
    setIsLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setIsLoading(false)
      return
    }

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (data) {
      setNotifications(data as Notification[])
    }
    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    loadNotifications()

    // Subscribe to real-time notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotification = payload.new as Notification
          setNotifications((prev) => [newNotification, ...prev])

          // Show toast for new notification
          toast({
            title: getNotificationTitle(newNotification),
            description: newNotification.content || getNotificationDescription(newNotification),
          })
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [loadNotifications, supabase, toast])

  const markAsRead = async (id: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    )
  }

  const markAllAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false)

    setNotifications((prev) =>
      prev.map((n) => ({ ...n, is_read: true }))
    )

    toast({ title: 'All notifications marked as read' })
  }

  const deleteNotification = async (id: string) => {
    await supabase
      .from('notifications')
      .delete()
      .eq('id', id)

    setNotifications((prev) => prev.filter((n) => n.id !== id))
    toast({ title: 'Notification deleted' })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-500" />
      case 'remix':
        return <Share2 className="w-4 h-4 text-purple-500" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationTitle = (notification: Notification) => {
    switch (notification.type) {
      case 'like':
        return 'New like'
      case 'comment':
        return 'New comment'
      case 'follow':
        return 'New follower'
      case 'remix':
        return 'Prompt remixed'
      default:
        return 'Notification'
    }
  }

  const getNotificationDescription = (notification: Notification) => {
    switch (notification.type) {
      case 'like':
        return `${notification.actor_name} liked your prompt`
      case 'comment':
        return `${notification.actor_name} commented on your prompt`
      case 'follow':
        return `${notification.actor_name} started following you`
      case 'remix':
        return `${notification.actor_name} remixed your prompt`
      default:
        return ''
    }
  }

  const getNotificationLink = (notification: Notification) => {
    switch (notification.type) {
      case 'like':
      case 'comment':
      case 'remix':
        return `/prompts/${notification.prompt_id}`
      case 'follow':
        return `/profile/${notification.actor_id}`
      default:
        return '/notifications'
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                <CheckCheck className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="text-xs">
                View all
              </Button>
            </Link>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <AnimatePresence>
              {notifications.slice(0, 10).map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={getNotificationLink(notification)}
                    onClick={() => {
                      if (!notification.is_read) {
                        markAsRead(notification.id)
                      }
                      setIsOpen(false)
                    }}
                  >
                    <div
                      className={`p-4 hover:bg-muted/50 transition-colors border-b ${
                        !notification.is_read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium mb-1">
                            {getNotificationDescription(notification)}
                          </p>
                          {notification.content && (
                            <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                              "{notification.content}"
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        <div className="flex items-start gap-1">
                          {!notification.is_read && (
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <Trash2 className="w-3 h-3 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
