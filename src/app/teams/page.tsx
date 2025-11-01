import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Users, Plus, Settings, LockIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('teams')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function TeamsPage() {
  const t = await getTranslations('teams')
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user's plan
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const hasTeamPlan = profile?.plan === 'team' || profile?.plan === 'business'

  // Get user's teams
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select(`
      *,
      teams (
        id,
        name,
        slug,
        description,
        avatar_url,
        plan,
        owner_id,
        created_at
      )
    `)
    .eq('user_id', user.id)

  const teams = teamMembers?.map((tm: any) => tm.teams) || []

  // Get member counts for each team
  const teamIds = teams.map((t: any) => t.id)
  let memberCounts = null
  try {
    const result = await supabase.rpc('get_team_member_counts', {
      team_ids: teamIds,
    })
    memberCounts = result.data
  } catch (error) {
    // If RPC function doesn't exist yet, just use null
    memberCounts = null
  }

  if (!hasTeamPlan) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <LockIcon className="w-8 h-8 text-primary" />
              </div>

              <h2 className="text-2xl font-bold mb-2">{t('upgrade_required')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('upgrade_description')}
              </p>

              <div className="space-y-3 text-left max-w-sm mx-auto mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">{t('feature_1')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">{t('feature_2')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-sm">{t('feature_3')}</p>
                </div>
              </div>

              <Link href="/pricing" className={cn(buttonVariants())}>
                {t('upgrade_to_team')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
          <Link href="/teams/new" className={cn(buttonVariants())}>
            <Plus className="w-4 h-4 mr-2" />
            {t('create_team')}
          </Link>
        </div>

        {/* Teams Grid */}
        {teams.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team: any) => {
              const memberCount =
                memberCounts?.find((mc: any) => mc.team_id === team.id)?.count || 0

              return (
                <Card key={team.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={team.avatar_url} />
                        <AvatarFallback>
                          {team.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="line-clamp-1">{team.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {team.description || t('no_description')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>
                          {memberCount} {t('members')}
                        </span>
                      </div>
                      <Badge variant="secondary">{team.plan}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/teams/${team.slug}`} className={cn(buttonVariants({ size: "sm" }), "flex-1")}>
                        {t('view')}
                      </Link>
                      {team.owner_id === user.id && (
                        <Link href={`/teams/${team.slug}/settings`} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                          <Settings className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">{t('no_teams')}</h2>
            <p className="text-muted-foreground mb-6">{t('no_teams_description')}</p>
            <Link href="/teams/new" className={cn(buttonVariants())}>
              <Plus className="w-4 h-4 mr-2" />
              {t('create_first_team')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
