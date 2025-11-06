import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PromptCard } from '@/components/feed/prompt-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Grid } from '@/components/layout/grid'
import {
  TrophyIcon,
  FlameIcon,
  BookOpenIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
  AwardIcon,
  UsersIcon,
  ZapIcon,
  ArrowRightIcon,
  CheckCircle2Icon
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('profile')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const t = await getTranslations('profile')

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

  // Fetch user's prompts
  const { data: prompts } = await supabase
    .from('prompts')
    .select('*')
    .eq('author', user.id)
    .order('created_at', { ascending: false })

  // Attach profile to each prompt
  if (prompts) {
    prompts.forEach((p: any) => {
      p.profiles = profile
    })
  }

  // Fetch user progress from database
  let { data: userProgress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // If no progress exists, create it
  if (!userProgress) {
    const { data: newProgress, error } = await supabase
      .from('user_progress')
      .insert({ user_id: user.id })
      .select()
      .single()

    if (!error && newProgress) {
      userProgress = newProgress
    } else {
      // Fallback to default values
      userProgress = {
        points: 0,
        level: 'beginner' as const,
        streak_days: 0,
        lessons_completed: 0,
        prompts_shared: 0,
        people_helped: 0,
        challenges_completed: 0
      }
    }
  }

  // Fetch earned badges
  const { data: earnedBadgesData } = await supabase
    .from('user_badges')
    .select(`
      badge_id,
      earned_at,
      badges (
        id,
        name,
        icon,
        category
      )
    `)
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false })

  const earnedBadges = earnedBadgesData?.map((ub: any) => ({
    id: ub.badges.id,
    name: ub.badges.name,
    icon: ub.badges.icon,
    category: ub.badges.category,
    earned_at: ub.earned_at
  })) || []

  // Fetch active challenges with user progress
  const { data: activeChallengesData } = await supabase
    .from('user_challenge_progress')
    .select(`
      id,
      current_progress,
      completed,
      challenges (
        id,
        title,
        description,
        type,
        end_date,
        reward_points,
        goal_type,
        goal_value
      )
    `)
    .eq('user_id', user.id)
    .eq('completed', false)

  const activeChallenges = activeChallengesData?.map((ucp: any) => {
    const daysRemaining = Math.ceil((new Date(ucp.challenges.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return {
      id: ucp.challenges.id,
      title: ucp.challenges.title,
      description: ucp.challenges.description,
      current_progress: ucp.current_progress,
      goal_value: ucp.challenges.goal_value,
      reward_points: ucp.challenges.reward_points,
      days_remaining: Math.max(0, daysRemaining)
    }
  }) || []

  // Level configuration
  const levels = {
    beginner: { name: t('level_beginner'), color: 'from-green-500 to-emerald-600', pointsMin: 0, pointsMax: 300 },
    intermediate: { name: t('level_intermediate'), color: 'from-indigo-500 to-violet-600', pointsMin: 300, pointsMax: 800 },
    expert: { name: t('level_expert'), color: 'from-orange-500 to-red-600', pointsMin: 800, pointsMax: 2000 },
    master: { name: t('level_master'), color: 'from-blue-500 to-cyan-600', pointsMin: 2000, pointsMax: 5000 },
    legend: { name: t('level_legend'), color: 'from-yellow-500 to-amber-600', pointsMin: 5000, pointsMax: 10000 }
  }

  const currentLevel = levels[userProgress.level as keyof typeof levels]
  const pointsInLevel = userProgress.points - currentLevel.pointsMin
  const levelRange = currentLevel.pointsMax - currentLevel.pointsMin
  const progressPercent = Math.min((pointsInLevel / levelRange) * 100, 100)

  return (
    <>
      {/* Hero Section with Level & Points */}
      <Section variant="gradient" spacing="lg">
        <Container size="lg">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-background text-foreground flex items-center justify-center text-3xl font-bold shadow-xl">
                {(profile?.name || user.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">
                  {profile?.name || 'Apprenant'}
                </h1>
                <div className="flex items-center gap-2">
                  <Badge className={`bg-gradient-to-r ${currentLevel.color} text-white`}>
                    {currentLevel.name}
                  </Badge>
                  {userProgress.streak_days > 0 && (
                    <Badge variant="soft" className="bg-orange-500/10 text-orange-700 dark:text-orange-400">
                      <FlameIcon className="w-3 h-3 mr-1" />
                      {userProgress.streak_days} {t('streak_days_label')}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{userProgress.points}</div>
                <div className="text-xs text-muted-foreground">{t('points_label')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{earnedBadges.length}</div>
                <div className="text-xs text-muted-foreground">{t('badges_label')}</div>
              </div>
            </div>
          </div>

          {/* Progress to next level */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold">{t('progression_to_next', { level: levels[userProgress.level === 'legend' ? 'legend' : userProgress.level === 'master' ? 'legend' : userProgress.level === 'expert' ? 'master' : userProgress.level === 'intermediate' ? 'expert' : 'intermediate'].name })}</span>
              <span className="text-muted-foreground">{pointsInLevel} / {levelRange} {t('points_label').toLowerCase()}</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        </Container>
      </Section>

      {/* Stats Cards */}
      <Section spacing="lg">
        <Container size="lg">
          <Grid cols={4} gap="md">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold mb-1">{userProgress.lessons_completed}</div>
                <div className="text-sm text-muted-foreground">{t('lessons_completed')}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-violet-600" />
                </div>
                <div className="text-3xl font-bold mb-1">{userProgress.prompts_shared}</div>
                <div className="text-sm text-muted-foreground">{t('prompts_shared')}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-3xl font-bold mb-1">{userProgress.people_helped}</div>
                <div className="text-sm text-muted-foreground">{t('people_helped')}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <TrophyIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold mb-1">{userProgress.challenges_completed}</div>
                <div className="text-sm text-muted-foreground">{t('challenges_completed')}</div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Active Challenges */}
      <Section spacing="lg" className="bg-muted/30">
        <Container size="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">{t('weekly_goals')}</h2>
              <p className="text-sm text-muted-foreground">{t('weekly_goals_subtitle')}</p>
            </div>
            <Link href="/challenges" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              {t('all_challenges')}
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {activeChallenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold mb-1">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                    <Badge variant="soft" className="bg-green-500/10 text-green-700 dark:text-green-400">
                      +{challenge.reward_points}
                    </Badge>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t('progress_label')}</span>
                      <span className="font-semibold">{challenge.current_progress}/{challenge.goal_value}</span>
                    </div>
                    <Progress value={(challenge.current_progress / challenge.goal_value) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-2">
                      {challenge.days_remaining} {t('days_remaining')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Badges */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">{t('my_badges')}</h2>
              <p className="text-sm text-muted-foreground">{t('badges_unlocked', { count: earnedBadges.length })}</p>
            </div>
            <Link href="/leaderboard" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              {t('see_leaderboard')}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {earnedBadges.map((badge) => (
              <Card key={badge.id} className="group hover:shadow-lg transition-all">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </div>
                  <div className="text-xs font-semibold">{badge.name}</div>
                </CardContent>
              </Card>
            ))}

            {/* Placeholder for locked badges */}
            <Card className="opacity-40">
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-2">🔒</div>
                <div className="text-xs font-semibold text-muted-foreground">{t('locked_badge')}</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Link href="/challenges" className={cn(buttonVariants({ variant: "ghost" }))}>
              {t('unlock_more_badges')}
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* User's Prompts */}
      <Section spacing="lg" className="bg-muted/30">
        <Container size="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">{t('my_prompts')}</h2>
              <p className="text-sm text-muted-foreground">
                {(prompts?.length || 0) > 1 ? t('prompts_created_plural', { count: prompts?.length || 0 }) : t('prompts_created', { count: prompts?.length || 0 })}
              </p>
            </div>
            <Link href="/prompts/new" className={cn(buttonVariants({ size: "sm" }))}>
              {t('create_prompt')}
            </Link>
          </div>

          {prompts && prompts.length > 0 ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {prompts.map((prompt) => (
                <div key={prompt.id} className="relative">
                  <PromptCard
                    id={prompt.id}
                    title={prompt.title}
                    body={prompt.body}
                    tags={prompt.tags}
                    author={{
                      name: prompt.profiles?.name || null,
                      avatar_url: prompt.profiles?.avatar_url || null,
                    }}
                    likes_count={prompt.likes_count}
                    created_at={prompt.created_at}
                  />
                  {!prompt.is_public && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="soft" className="bg-amber-500/10 text-amber-700 dark:text-amber-400">
                        {t('private')}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">{t('share_first_prompt')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('share_first_prompt_description')}
                </p>
                <Link href="/prompts/new" className={cn(buttonVariants({ size: "lg" }))}>
                  {t('create_first_prompt')}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>
          )}
        </Container>
      </Section>
    </>
  )
}
