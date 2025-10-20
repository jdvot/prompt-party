import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NotificationSettings } from '@/components/notifications/notification-settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notification Settings | Prompt Party',
  description: 'Manage your notification preferences',
}

export default async function NotificationSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get or create notification preferences
  let { data: preferences } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Create default preferences if they don't exist
  if (!preferences) {
    const { data: newPreferences } = await supabase
      .from('notification_preferences')
      .insert({
        user_id: user.id,
      })
      .select()
      .single()

    preferences = newPreferences
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notification Settings</h1>
        <p className="text-muted-foreground">
          Choose how and when you want to be notified
        </p>
      </div>

      <NotificationSettings initialPreferences={preferences} />
    </div>
  )
}
