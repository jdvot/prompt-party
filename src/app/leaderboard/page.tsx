import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { TrophyIcon, TrendingUpIcon, HeartIcon, EyeIcon, GitForkIcon } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leaderboard | Prompt Party',
  description: 'Top prompt creators and most popular prompts',
}

export default async function LeaderboardPage() {
  const supabase = await createClient()

  // Top creators by total likes
  const { data: topCreators } = await supabase
    .from('profiles')
    .select('*')
    .order('followers_count', { ascending: false })
    .limit(10)

  // Get prompt counts for top creators
  const creatorIds = topCreators?.map((c: any) => c.id) || []
  const { data: promptCounts } = await supabase
    .rpc('get_user_prompt_counts', { user_ids: creatorIds })
    .then(async ({ data, error }) => {
      if (error) {
        // Fallback: manually count
        const counts = await Promise.all(
          creatorIds.map(async (id) => {
            const { count } = await supabase
              .from('prompts')
              .select('*', { count: 'exact', head: true })
              .eq('author', id)
            return { user_id: id, count }
          })
        )
        return { data: counts }
      }
      return { data }
    })

  // Top prompts by engagement score (likes * 2 + views)
  const { data: topPrompts } = await supabase
    .from('prompts')
    .select('*, profiles(*)')
    .eq('visibility', 'public')
    .order('likes_count', { ascending: false })
    .limit(10)

  // Trending prompts (last 7 days, sorted by likes)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: trendingPrompts } = await supabase
    .from('prompts')
    .select('*, profiles(*)')
    .eq('visibility', 'public')
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('likes_count', { ascending: false })
    .limit(10)

  // Most remixed prompts
  const { data: mostRemixed } = await supabase
    .from('prompts')
    .select('*, profiles(*)')
    .eq('visibility', 'public')
    .order('remixes_count', { ascending: false })
    .limit(10)

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${rank}`
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <TrophyIcon className="w-4 h-4" />
            <span>Leaderboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Top Creators & Prompts
          </h1>
          <p className="text-xl text-muted-foreground">
            Celebrating the best prompt engineers in the community
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Creators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-primary" />
                Top Creators
              </CardTitle>
              <CardDescription>
                Most followed prompt creators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators?.map((creator: any, index: number) => {
                  const promptCount = promptCounts?.find((pc: any) => pc.user_id === creator.id)?.count || 0
                  return (
                    <Link
                      key={creator.id}
                      href={`/profile/${creator.name}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 text-center font-bold text-lg">
                        {getRankEmoji(index + 1)}
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={creator.avatar_url} alt={creator.name} />
                        <AvatarFallback>
                          {creator.name?.substring(0, 2).toUpperCase() || '??'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{creator.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {creator.followers_count || 0} followers • {promptCount} prompts
                        </p>
                      </div>
                      {creator.plan !== 'free' && (
                        <Badge variant="default" className="flex-shrink-0">
                          {creator.plan}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="h-5 w-5 text-primary" />
                Most Liked Prompts
              </CardTitle>
              <CardDescription>
                All-time most popular prompts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPrompts?.map((prompt: any, index: number) => (
                  <Link
                    key={prompt.id}
                    href={`/prompts/${prompt.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 text-center font-bold">
                      {getRankEmoji(index + 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{prompt.title}</p>
                      <p className="text-xs text-muted-foreground">
                        by {prompt.profiles?.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <HeartIcon className="h-3 w-3" />
                          {prompt.likes_count || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <EyeIcon className="h-3 w-3" />
                          {prompt.views_count || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trending This Week */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 text-primary" />
                Trending This Week
              </CardTitle>
              <CardDescription>
                Hottest prompts from the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingPrompts && trendingPrompts.length > 0 ? (
                  trendingPrompts.map((prompt: any, index: number) => (
                    <Link
                      key={prompt.id}
                      href={`/prompts/${prompt.id}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 text-center font-bold">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-1">{prompt.title}</p>
                        <p className="text-xs text-muted-foreground">
                          by {prompt.profiles?.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>❤️ {prompt.likes_count || 0}</span>
                          <span>👁️ {prompt.views_count || 0}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No trending prompts this week
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Most Remixed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitForkIcon className="h-5 w-5 text-primary" />
                Most Remixed
              </CardTitle>
              <CardDescription>
                Prompts that inspired the most remixes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mostRemixed && mostRemixed.length > 0 ? (
                  mostRemixed.map((prompt: any, index: number) => (
                    <Link
                      key={prompt.id}
                      href={`/prompts/${prompt.id}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 text-center font-bold">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-1">{prompt.title}</p>
                        <p className="text-xs text-muted-foreground">
                          by {prompt.profiles?.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <GitForkIcon className="h-3 w-3" />
                            {prompt.remixes_count || 0} remixes
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No remixed prompts yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
