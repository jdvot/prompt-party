'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  MessageSquareIcon,
  HeartIcon,
  GitForkIcon,
  TrophyIcon,
  UserPlusIcon,
  BellIcon,
  CheckCheckIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

type Notification = {
  id: string
  type: 'comment' | 'like' | 'remix' | 'challenge' | 'follow' | 'system'
  title: string
  message: string
  link: string | null
  read: boolean
  created_at: string
}

const notificationIcons = {
  comment: MessageSquareIcon,
  like: HeartIcon,
  remix: GitForkIcon,
  challenge: TrophyIcon,
  follow: UserPlusIcon,
  system: BellIcon,
}

interface NotificationListProps {
  onClose?: () => void
}

export function NotificationList({ onClose }: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const t = useTranslations('notifications')
  const tCommon = useTranslations('common')

  const fetchNotifications = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)

    setNotifications((data as Notification[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchNotifications()

    // Subscribe to new notifications
    const channel = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
        },
        () => {
          fetchNotifications()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, fetchNotifications])

  const markAsRead = async (notificationId: string) => {
    await supabase.rpc('mark_notification_read', {
      notification_id: notificationId,
    })
    fetchNotifications()
  }

  const markAllAsRead = async () => {
    await supabase.rpc('mark_all_notifications_read')
    fetchNotifications()
  }

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id)
    }
    if (onClose) {
      onClose()
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        {tCommon('loading')}
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center">
        <BellIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
        <p className="mt-2 text-sm text-muted-foreground">{t('empty_state')}</p>
      </div>
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
        <h3 className="font-semibold">{t('title')}</h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="h-auto py-1 px-2 text-xs"
          >
            <CheckCheckIcon className="mr-1 h-3 w-3" />
            {t('mark_all_read')}
          </Button>
        )}
      </div>

      <div className="divide-y">
        {notifications.map((notification) => {
          const Icon = notificationIcons[notification.type]
          const content = (
            <div
              className={`flex gap-3 px-4 py-3 transition-colors ${
                notification.read
                  ? 'bg-background hover:bg-muted/50'
                  : 'bg-primary/5 hover:bg-primary/10'
              }`}
            >
              <div
                className={`flex-shrink-0 mt-1 ${
                  notification.read ? 'text-muted-foreground' : 'text-primary'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm ${
                    notification.read
                      ? 'text-muted-foreground'
                      : 'font-medium text-foreground'
                  }`}
                >
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(notification.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}
            </div>
          )

          if (notification.link) {
            return (
              <Link
                key={notification.id}
                href={notification.link}
                onClick={() => handleNotificationClick(notification)}
              >
                {content}
              </Link>
            )
          }

          return (
            <div key={notification.id} onClick={() => markAsRead(notification.id)}>
              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
