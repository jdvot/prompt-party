'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { createClient } from '@/lib/supabase/client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { UserMinus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TeamMember {
  id: string
  user_id: string
  team_id: string
  role: 'owner' | 'admin' | 'editor' | 'viewer'
  joined_at: string
  profiles: {
    id: string
    name: string
    avatar_url: string | null
  }
}

interface TeamMembersListProps {
  members: TeamMember[]
  currentUserId: string
  canManage: boolean
  teamId: string
}

export function TeamMembersList({
  members,
  currentUserId,
  canManage,
  teamId,
}: TeamMembersListProps) {
  const t = useTranslations('teams')
  const router = useRouter()
  const [updatingMember, setUpdatingMember] = useState<string | null>(null)
  const supabase = createClient()

  const handleRoleChange = async (memberId: string, newRole: string) => {
    setUpdatingMember(memberId)
    try {
      const { error } = await supabase
        .from('team_members')
        .update({ role: newRole })
        .eq('id', memberId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Failed to update role:', error)
    } finally {
      setUpdatingMember(null)
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Failed to remove member:', error)
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'default'
      case 'admin':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-4">
      {members.map((member) => {
        const isCurrentUser = member.user_id === currentUserId
        const isOwner = member.role === 'owner'

        return (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.profiles.avatar_url || undefined} />
                <AvatarFallback>
                  {member.profiles.name?.substring(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">
                    {member.profiles.name}
                    {isCurrentUser && (
                      <span className="text-sm text-muted-foreground ml-2">
                        ({t('you')})
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('joined')} {new Date(member.joined_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {canManage && !isOwner && !isCurrentUser ? (
                <Select
                  value={member.role}
                  onValueChange={(value) => handleRoleChange(member.id, value)}
                  disabled={updatingMember === member.id}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">{t('role_admin')}</SelectItem>
                    <SelectItem value="editor">{t('role_editor')}</SelectItem>
                    <SelectItem value="viewer">{t('role_viewer')}</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={getRoleBadgeVariant(member.role)}>
                  {t(`role_${member.role}`)}
                </Badge>
              )}

              {canManage && !isOwner && !isCurrentUser && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <UserMinus className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('remove_member')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('remove_member_confirm', { name: member.profiles.name })}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRemoveMember(member.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {t('remove')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
