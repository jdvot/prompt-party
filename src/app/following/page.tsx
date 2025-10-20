import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FollowButton } from '@/components/profile/follow-button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Following | Prompt Party',
  description: 'People you follow and their latest prompts',
}

export default async function FollowingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get users the current user is following
  const { data: following } = await supabase
    .from('follows')
    .select(`
      *,
      following:auth.users!follows_following_id_fkey(
        id,
        email
      )
    `)
    .eq('follower_id', user.id)
    .order('created_at', { ascending: false })

  // Get profiles for followed users
  const followingIds = following?.map((f: any) => f.following_id) || []
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .in('id', followingIds)

  // Get recent prompts from followed users
  const { data: recentPrompts } = await supabase
    .from('prompts')
    .select('*, profiles(*)')
    .in('author', followingIds)
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Following</h1>
          <p className="text-muted-foreground">
            Stay updated with prompts from people you follow
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Following list sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>People You Follow ({profiles?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profiles && profiles.length > 0 ? (
                  profiles.map((profile: any) => (
                    <Link
                      key={profile.id}
                      href={`/profile/${profile.name}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.avatar_url} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name?.substring(0, 2).toUpperCase() || '??'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{profile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {profile.followers_count || 0} followers
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    You're not following anyone yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent prompts feed */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">Recent Prompts</h2>
            {recentPrompts && recentPrompts.length > 0 ? (
              recentPrompts.map((prompt: any) => (
                <Link key={prompt.id} href={`/prompts/${prompt.id}`}>
                  <Card className="hover:border-primary/50 transition-all hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={prompt.profiles?.avatar_url}
                              alt={prompt.profiles?.name}
                            />
                            <AvatarFallback>
                              {prompt.profiles?.name?.substring(0, 2).toUpperCase() || '??'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {prompt.profiles?.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(prompt.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle>{prompt.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {prompt.body}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span>❤️ {prompt.likes_count || 0}</span>
                        <span>👁️ {prompt.views_count || 0}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">
                    No recent prompts from people you follow
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
