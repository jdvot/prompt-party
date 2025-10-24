'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TeamInviteButtonProps {
  teamId: string
}

export function TeamInviteButton({ teamId }: TeamInviteButtonProps) {
  const t = useTranslations('teams')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'admin' | 'editor' | 'viewer'>('viewer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleInvite = async () => {
    if (!email.trim()) {
      setError(t('email_required'))
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t('email_invalid'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Check if user exists by email
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

      if (existingUser) {
        // Check if already a member
        const { data: existingMember } = await supabase
          .from('team_members')
          .select('id')
          .eq('team_id', teamId)
          .eq('user_id', existingUser.id)
          .single()

        if (existingMember) {
          setError(t('already_member'))
          setLoading(false)
          return
        }
      }

      // Create team invitation
      const { error: inviteError } = await supabase
        .from('team_invitations')
        .insert({
          team_id: teamId,
          email,
          role,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        })

      if (inviteError) throw inviteError

      // Reset form
      setEmail('')
      setRole('viewer')
      setOpen(false)
      router.refresh()
    } catch (err) {
      console.error('Invite error:', err)
      setError(t('invite_error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          {t('invite_member')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('invite_team_member')}</DialogTitle>
          <DialogDescription>{t('invite_description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('email_address')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">{t('role')}</Label>
            <Select value={role} onValueChange={(v) => setRole(v as any)}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div>
                    <div className="font-medium">{t('role_admin')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('role_admin_desc')}
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="editor">
                  <div>
                    <div className="font-medium">{t('role_editor')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('role_editor_desc')}
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="viewer">
                  <div>
                    <div className="font-medium">{t('role_viewer')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('role_viewer_desc')}
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            {t('cancel')}
          </Button>
          <Button onClick={handleInvite} disabled={loading}>
            {loading ? t('sending') : t('send_invite')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
