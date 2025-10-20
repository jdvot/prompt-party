import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { UsersIcon, PlusIcon, SettingsIcon } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teams | Prompt Party',
  description: 'Manage your team workspaces',
}

export default async function TeamsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user's teams
  const { data: teamMemberships } = await supabase
    .from('team_members')
    .select('*, teams(*)')
    .eq('user_id', user.id)
    .order('joined_at', { ascending: false })

  const teams = teamMemberships?.map((tm: any) => ({
    ...tm.teams,
    userRole: tm.role,
  })) || []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Teams</h1>
            <p className="text-muted-foreground">
              Collaborate with your team on prompts and collections
            </p>
          </div>
          <Button asChild>
            <Link href="/teams/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Team
            </Link>
          </Button>
        </div>

        {teams.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
              <p className="text-muted-foreground mb-4">
                Create a team to collaborate with others
              </p>
              <Button asChild>
                <Link href="/teams/new">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create Your First Team
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team: any) => (
              <Link key={team.id} href={`/teams/${team.slug}`}>
                <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <UsersIcon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                        {team.userRole}
                      </span>
                    </div>
                    <CardTitle>{team.name}</CardTitle>
                    {team.description && (
                      <CardDescription className="line-clamp-2">
                        {team.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{team.plan} plan</span>
                      {(team.userRole === 'owner' || team.userRole === 'admin') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0"
                          onClick={(e) => {
                            e.preventDefault()
                            window.location.href = `/teams/${team.slug}/settings`
                          }}
                        >
                          <SettingsIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
