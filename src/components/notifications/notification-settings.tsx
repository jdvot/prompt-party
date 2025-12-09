'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { MailIcon, BellIcon, CheckIcon } from 'lucide-react'

type NotificationPreferences = {
  user_id: string
  email_comments: boolean
  email_likes: boolean
  email_remixes: boolean
  email_challenges: boolean
  email_follows: boolean
  email_weekly_digest: boolean
  push_comments: boolean
  push_likes: boolean
  push_remixes: boolean
  push_challenges: boolean
}

interface NotificationSettingsProps {
  initialPreferences: NotificationPreferences | null
}

export function NotificationSettings({ initialPreferences }: NotificationSettingsProps) {
  const t = useTranslations('settings.notificationSettings')
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    initialPreferences || {
      user_id: '',
      email_comments: true,
      email_likes: true,
      email_remixes: true,
      email_challenges: true,
      email_follows: true,
      email_weekly_digest: true,
      push_comments: false,
      push_likes: false,
      push_remixes: true,
      push_challenges: true,
    }
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const supabase = createClient()

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { user_id, ...prefsWithoutUserId } = preferences
    const { error } = await (supabase
      .from('notification_preferences') as any)
      .upsert({
        user_id: user.id,
        ...prefsWithoutUserId,
        updated_at: new Date().toISOString(),
      })

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }

    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MailIcon className="h-5 w-5 text-primary" />
            <CardTitle>{t('email.title')}</CardTitle>
          </div>
          <CardDescription>
            {t('email.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email_comments">{t('email.comments.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('email.comments.description')}
              </p>
            </div>
            <Switch
              id="email_comments"
              checked={preferences.email_comments}
              onCheckedChange={() => handleToggle('email_comments')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email_likes">{t('email.likes.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('email.likes.description')}
              </p>
            </div>
            <Switch
              id="email_likes"
              checked={preferences.email_likes}
              onCheckedChange={() => handleToggle('email_likes')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email_remixes">{t('email.remixes.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('email.remixes.description')}
              </p>
            </div>
            <Switch
              id="email_remixes"
              checked={preferences.email_remixes}
              onCheckedChange={() => handleToggle('email_remixes')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email_challenges">{t('email.challenges.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('email.challenges.description')}
              </p>
            </div>
            <Switch
              id="email_challenges"
              checked={preferences.email_challenges}
              onCheckedChange={() => handleToggle('email_challenges')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email_follows">{t('email.follows.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('email.follows.description')}
              </p>
            </div>
            <Switch
              id="email_follows"
              checked={preferences.email_follows}
              onCheckedChange={() => handleToggle('email_follows')}
            />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="email_weekly_digest">{t('email.weeklyDigest.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('email.weeklyDigest.description')}
              </p>
            </div>
            <Switch
              id="email_weekly_digest"
              checked={preferences.email_weekly_digest}
              onCheckedChange={() => handleToggle('email_weekly_digest')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-primary" />
            <CardTitle>{t('push.title')}</CardTitle>
          </div>
          <CardDescription>
            {t('push.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push_comments">{t('push.comments.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('push.comments.description')}
              </p>
            </div>
            <Switch
              id="push_comments"
              checked={preferences.push_comments}
              onCheckedChange={() => handleToggle('push_comments')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push_likes">{t('push.likes.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('push.likes.description')}
              </p>
            </div>
            <Switch
              id="push_likes"
              checked={preferences.push_likes}
              onCheckedChange={() => handleToggle('push_likes')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push_remixes">{t('push.remixes.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('push.remixes.description')}
              </p>
            </div>
            <Switch
              id="push_remixes"
              checked={preferences.push_remixes}
              onCheckedChange={() => handleToggle('push_remixes')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push_challenges">{t('push.challenges.label')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('push.challenges.description')}
              </p>
            </div>
            <Switch
              id="push_challenges"
              checked={preferences.push_challenges}
              onCheckedChange={() => handleToggle('push_challenges')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving || saved}
          className="min-w-32"
        >
          {saved ? (
            <>
              <CheckIcon className="mr-2 h-4 w-4" />
              {t('saved')}
            </>
          ) : (
            t('saveButton')
          )}
        </Button>
      </div>
    </div>
  )
}
