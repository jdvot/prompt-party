import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { NotificationSettings } from '@/components/notifications/notification-settings'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('notification_settings_title'),
    description: t('notification_settings_description'),
  }
}

export default async function NotificationSettingsPage() {
  const t = await getTranslations('settings')
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
        <h1 className="text-3xl font-bold mb-2">{t('notification_settings_title')}</h1>
        <p className="text-muted-foreground">
          {t('notification_settings_subtitle')}
        </p>
      </div>

      <NotificationSettings initialPreferences={preferences as any} />
    </div>
  )
}
