import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TeamMembersList } from '@/components/teams/team-members-list'
import { TeamInviteButton } from '@/components/teams/team-invite-button'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Users, FolderIcon, Activity, Settings } from 'lucide-react'
import Link from 'next/link'

interface TeamPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const supabase = await createClient()
  const { data: team } = await supabase
    .from('teams')
    .select('name, description')
    .eq('slug', params.slug)
    .single()

  if (!team) {
    return {
      title: 'Team Not Found | Prompt Party',
    }
  }

  return {
    title: `${team.name} | Teams | Prompt Party`,
    description: team.description || `${team.name} team workspace`,
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const t = await getTranslations('teams')
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get team details
  const { data: team, error } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !team) {
    notFound()
  }

  // Check if user is a member
  const { data: membership } = await supabase
    .from('team_members')
    .select('role')
    .eq('team_id', team.id)
    .eq('user_id', user.id)
    .single()

  if (!membership) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">{t('access_denied')}</h1>
          <p className="text-muted-foreground mb-6">{t('not_member')}</p>
          <Button asChild>
            <Link href="/teams">{t('back_to_teams')}</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Get team members
  const { data: members } = await supabase
    .from('team_members')
    .select(`
      *,
      profiles:user_id (
        id,
        name,
        avatar_url
      )
    `)
    .eq('team_id', team.id)
    .order('joined_at', { ascending: false })

  // Get team collections
  const { data: collections } = await supabase
    .from('team_collections')
    .select('*')
    .eq('team_id', team.id)
    .order('created_at', { ascending: false })

  // Get recent activity
  const { data: activity } = await supabase
    .from('team_activity')
    .select(`
      *,
      profiles:user_id (
        name,
        avatar_url
      )
    `)
    .eq('team_id', team.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const isOwner = team.owner_id === user.id
  const isAdmin = membership.role === 'owner' || membership.role === 'admin'

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Team Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={team.avatar_url} />
              <AvatarFallback>
                {team.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{team.name}</h1>
                <Badge>{team.plan}</Badge>
              </div>
              {team.description && (
                <p className="text-muted-foreground">{team.description}</p>
              )}
            </div>
            {isOwner && (
              <Button asChild variant="outline">
                <Link href={`/teams/${team.slug}/settings`}>
                  <Settings className="w-4 h-4 mr-2" />
                  {t('settings')}
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{members?.length || 0}</div>
              <div className="text-sm text-muted-foreground">{t('members')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {collections?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">{t('collections')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{team.max_members}</div>
              <div className="text-sm text-muted-foreground">{t('max_members')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList>
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" />
              {t('members')}
            </TabsTrigger>
            <TabsTrigger value="collections" className="gap-2">
              <FolderIcon className="w-4 h-4" />
              {t('collections')}
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="w-4 h-4" />
              {t('activity')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('team_members')}</CardTitle>
                  {isAdmin && <TeamInviteButton teamId={team.id} />}
                </div>
              </CardHeader>
              <CardContent>
                <TeamMembersList
                  members={members || []}
                  currentUserId={user.id}
                  canManage={isAdmin}
                  teamId={team.id}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collections">
            <div className="text-center py-12">
              <FolderIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">{t('collections_coming_soon')}</p>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>{t('recent_activity')}</CardTitle>
              </CardHeader>
              <CardContent>
                {activity && activity.length > 0 ? (
                  <div className="space-y-4">
                    {activity.map((item: any) => (
                      <div key={item.id} className="flex items-start gap-3 text-sm">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.profiles?.avatar_url} />
                          <AvatarFallback>
                            {item.profiles?.name?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium">{item.profiles?.name}</span>{' '}
                          {item.action}
                          <div className="text-xs text-muted-foreground">
                            {new Date(item.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {t('no_activity')}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
