'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Share2,
  CheckCheck,
  Trash2,
  Filter,
} from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

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

interface NotificationsPageProps {
  initialNotifications: Notification[]
  userId: string
}

export function NotificationsPage({ initialNotifications, userId }: NotificationsPageProps) {
  const { toast } = useToast()
  const supabase = createClient()
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev])
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [userId, supabase])

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.is_read)
      : notifications

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
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false)

    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
    toast({ title: 'All notifications marked as read' })
  }

  const deleteNotification = async (id: string) => {
    await supabase.from('notifications').delete().eq('id', id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    toast({ title: 'Notification deleted' })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />
      case 'remix':
        return <Share2 className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5" />
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

  const unreadCount = notifications.filter((n) => !n.is_read).length

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your prompt activity
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </h3>
            <p className="text-muted-foreground">
              {filter === 'unread'
                ? "You're all caught up!"
                : "When you get notifications, they'll appear here"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-3"
        >
          {filteredNotifications.map((notification) => (
            <motion.div key={notification.id} variants={staggerItem}>
              <Card
                className={`transition-all hover:shadow-md ${
                  !notification.is_read ? 'border-primary/50 bg-primary/5' : ''
                }`}
              >
                <CardContent className="p-4">
                  <Link
                    href={getNotificationLink(notification)}
                    onClick={() => {
                      if (!notification.is_read) {
                        markAsRead(notification.id)
                      }
                    }}
                    className="block"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium mb-1">
                          {getNotificationDescription(notification)}
                        </p>
                        {notification.content && (
                          <p className="text-sm text-muted-foreground mb-2">
                            "{notification.content}"
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.is_read && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
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
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
