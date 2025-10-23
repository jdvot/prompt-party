import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsForm } from '@/components/profile/settings-form'
import { AvatarUpload } from '@/components/profile/avatar-upload'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Settings | Prompt Party',
  description: 'Manage your account settings',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const t = await getTranslations('settings')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground">{t('manage_account')}</p>
        </div>

        <div className="space-y-8">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('profile_picture')}</h2>
            <AvatarUpload userId={user.id} currentAvatarUrl={profile?.avatar_url} />
          </div>

          <SettingsForm user={user} profile={profile} />
        </div>
      </div>
    </div>
  )
}
