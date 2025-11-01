import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrophyIcon, BookOpenIcon, UsersIcon, SparklesIcon, FlameIcon, AwardIcon, MedalIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('leaderboard')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const t = await getTranslations('leaderboard')

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get start of current week and month
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // Fetch Top Learners (weekly - based on lessons completed this week)
  const { data: topLearnersData } = await supabase
    .from('user_progress')
    .select(`
      user_id,
      points,
      level,
      lessons_completed,
      streak_days,
      profiles!inner(name, avatar_url)
    `)
    .gte('updated_at', startOfWeek.toISOString())
    .order('lessons_completed', { ascending: false })
    .limit(10)

  const topLearners = topLearnersData?.map((item: any) => ({
    id: item.user_id,
    name: item.profiles?.name || 'Anonymous',
    avatar_url: item.profiles?.avatar_url,
    lessons_completed: item.lessons_completed,
    points: item.points,
    level: item.level,
    streak: item.streak_days
  })) || []

  // Fetch Top Contributors (monthly - based on prompts shared this month)
  const { data: topContributorsData } = await supabase
    .from('user_progress')
    .select(`
      user_id,
      points,
      prompts_shared,
      people_helped,
      profiles!inner(name, avatar_url)
    `)
    .gte('updated_at', startOfMonth.toISOString())
    .order('prompts_shared', { ascending: false })
    .limit(10)

  const topContributors = topContributorsData?.map((item: any) => ({
    id: item.user_id,
    name: item.profiles?.name || 'Anonymous',
    avatar_url: item.profiles?.avatar_url,
    prompts_shared: item.prompts_shared,
    people_helped: item.people_helped,
    points: item.points
  })) || []

  // Fetch Hall of Fame (all-time - based on total points)
  const { data: hallOfFameData } = await supabase
    .from('user_progress')
    .select(`
      user_id,
      points,
      level,
      profiles!inner(name, avatar_url)
    `)
    .order('points', { ascending: false })
    .limit(10)

  // For each hall of fame user, get their badge count
  const hallOfFame = await Promise.all(
    (hallOfFameData || []).map(async (item: any) => {
      const { count: badgeCount } = await supabase
        .from('user_badges')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', item.user_id)

      // Get top 2 badges as achievements
      const { data: topBadges } = await supabase
        .from('user_badges')
        .select(`
          badges(name)
        `)
        .eq('user_id', item.user_id)
        .limit(2)

      const achievements = topBadges?.map((b: any) => b.badges.name).join(' • ') || ''

      return {
        id: item.user_id,
        name: item.profiles?.name || 'Anonymous',
        avatar_url: item.profiles?.avatar_url,
        points: item.points,
        level: item.level,
        badges: badgeCount || 0,
        achievements
      }
    })
  )

  const levelColors: Record<string, string> = {
    beginner: 'text-green-600 bg-green-500/10',
    intermediate: 'text-violet-600 bg-violet-500/10',
    expert: 'text-orange-600 bg-orange-500/10',
    master: 'text-red-600 bg-red-500/10',
    legend: 'text-yellow-600 bg-yellow-500/10'
  }

  const levelLabels: Record<string, string> = {
    beginner: '🌱 Débutant',
    intermediate: '🌿 Intermédiaire',
    expert: '🍀 Expert',
    master: '🌳 Maître',
    legend: '⭐ Légende'
  }

  return (
    <>
      {/* Hero */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center">
            <Badge variant="soft" className="mb-4">
              <TrophyIcon className="w-3 h-3 mr-1" />
              Leaderboard
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Classement Communauté
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Célébrons ensemble ceux qui apprennent, partagent et aident les autres
            </p>
          </div>
        </Container>
      </Section>

      {/* Leaderboards */}
      <Section spacing="xl">
        <Container size="lg">
          <Tabs defaultValue="learners" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="learners" className="gap-2">
                <BookOpenIcon className="w-4 h-4" />
                Top Apprenants
              </TabsTrigger>
              <TabsTrigger value="contributors" className="gap-2">
                <UsersIcon className="w-4 h-4" />
                Top Contributeurs
              </TabsTrigger>
              <TabsTrigger value="hall-of-fame" className="gap-2">
                <AwardIcon className="w-4 h-4" />
                Hall of Fame
              </TabsTrigger>
            </TabsList>

            {/* Top Learners */}
            <TabsContent value="learners">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{t('learners_title')}</h3>
                  <p className="text-muted-foreground">
                    Classement basé sur les leçons complétées et l'activité
                  </p>
                </div>

                {topLearners.map((learner, index) => (
                  <Card key={learner.id} className={`${index < 3 ? 'border-2 border-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          {index === 0 && <div className="text-4xl">🥇</div>}
                          {index === 1 && <div className="text-4xl">🥈</div>}
                          {index === 2 && <div className="text-4xl">🥉</div>}
                          {index >= 3 && <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>}
                        </div>

                        {/* Avatar */}
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={learner.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                            {learner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold truncate">{learner.name}</h4>
                            <Badge variant="soft" className={levelColors[learner.level]}>
                              {levelLabels[learner.level]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{learner.lessons_completed} leçons</span>
                            <span className="flex items-center gap-1">
                              <FlameIcon className="w-3 h-3 text-orange-500" />
                              {learner.streak} jours
                            </span>
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{learner.points}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {user && (
                  <Card className="border-2 border-primary">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <SparklesIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">{t('your_position')}</h4>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('top_percent', { percent: '15' }) }} />
                        <p className="text-xs text-muted-foreground mt-2">
                          Continue comme ça, tu progresses super bien 🚀
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Top Contributors */}
            <TabsContent value="contributors">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">🤝 Top 10 Contributeurs (Ce Mois)</h3>
                  <p className="text-muted-foreground">
                    Classement basé sur les prompts partagés et l'aide apportée
                  </p>
                </div>

                {topContributors.map((contributor, index) => (
                  <Card key={contributor.id} className={`${index < 3 ? 'border-2 border-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          {index === 0 && <div className="text-4xl">🥇</div>}
                          {index === 1 && <div className="text-4xl">🥈</div>}
                          {index === 2 && <div className="text-4xl">🥉</div>}
                          {index >= 3 && <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>}
                        </div>

                        {/* Avatar */}
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contributor.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                            {contributor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1 truncate">{contributor.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>💡 {contributor.prompts_shared} prompts</span>
                            <span>🤝 {contributor.people_helped} aides</span>
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">{contributor.points}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {user && (
                  <Card className="border-2 border-orange-500/20 bg-orange-500/5">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <UsersIcon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                        <h4 className="font-semibold mb-1">{t('your_impact')}</h4>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-bold text-orange-600">5 personnes</span> aidées ce mois
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Continue, tu fais la différence dans la communauté ! ⭐
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Hall of Fame */}
            <TabsContent value="hall-of-fame">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">⭐ Légendes de la Plateforme</h3>
                  <p className="text-muted-foreground">
                    Les membres les plus actifs et influents de tous les temps
                  </p>
                </div>

                {hallOfFame.map((legend, index) => (
                  <Card key={legend.id} className="border-2 border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-transparent">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
                          {index === 0 && <MedalIcon className="w-8 h-8 text-white" />}
                          {index === 1 && <TrophyIcon className="w-7 h-7 text-white" />}
                          {index === 2 && <AwardIcon className="w-6 h-6 text-white" />}
                          {index >= 3 && <div className="text-2xl font-bold text-white">#{index + 1}</div>}
                        </div>

                        {/* Avatar */}
                        <Avatar className="w-16 h-16 border-4 border-yellow-500/30">
                          <AvatarImage src={legend.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-xl">
                            {legend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg truncate">{legend.name}</h4>
                            <Badge variant="soft" className={levelColors[legend.level]}>
                              {levelLabels[legend.level]}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            🏆 {legend.badges} badges débloqués
                          </div>
                          <div className="text-xs text-muted-foreground italic">
                            {legend.achievements}
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                            {legend.points}
                          </div>
                          <div className="text-xs text-muted-foreground">points totaux</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </>
  )
}
