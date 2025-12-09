import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NotificationsPage } from '@/components/notifications/notifications-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notifications | Prompt Party',
  description: 'View all your notifications',
}

export default async function NotificationsPageRoute() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <NotificationsPage initialNotifications={notifications as any || []} userId={user.id} />
}
