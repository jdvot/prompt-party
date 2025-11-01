import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { TrophyIcon, ClockIcon, SparklesIcon, CheckCircle2Icon, TargetIcon, AwardIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('challenges')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ChallengesPage() {
  const supabase = await createClient()
  const t = await getTranslations('challenges')

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch real active challenges from database
  const { data: activeChallenges } = await supabase
    .from('challenges')
    .select('*')
    .eq('is_active', true)
    .gte('end_date', new Date().toISOString())
    .order('type')

  // If user is logged in, fetch their progress
  let userChallengeProgress: any[] = []
  if (user) {
    const { data } = await supabase
      .from('user_challenge_progress')
      .select(`
        challenge_id,
        current_progress,
        completed,
        completed_at
      `)
      .eq('user_id', user.id)

    userChallengeProgress = data || []
  }

  // Merge challenges with user progress
  const challenges = activeChallenges?.map(challenge => {
    const progress = userChallengeProgress.find(p => p.challenge_id === challenge.id)
    return {
      ...challenge,
      current_progress: progress?.current_progress || 0,
      user_completed: progress?.completed || false
    }
  }) || []

  // Separate challenges by type
  const weeklyChallenge = challenges.find(c => c.type === 'weekly') || {
    id: '1',
    title: 'Challenge Hebdo - Apprentissage',
    description: 'Complète 2 leçons cette semaine et gagne des points',
    type: 'weekly',
    category: 'learning',
    reward_points: 50,
    goal_type: 'lessons',
    goal_value: 2,
    current_progress: 0,
    end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  }

  const monthlyChallenge = challenges.find(c => c.type === 'monthly') || {
    id: '2',
    title: 'Challenge Mensuel - Expert',
    description: 'Complète 5 leçons ce mois et débloque le badge Expert',
    type: 'monthly',
    category: 'learning',
    reward_points: 200,
    reward_badge: 'Expert du Mois',
    goal_type: 'lessons',
    goal_value: 5,
    current_progress: 0,
    end_date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
  }

  // For community challenge, calculate total progress from all users
  const { count: totalPromptsShared } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('is_public', true)
    .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

  const communityChallenge = {
    id: '3',
    title: 'Challenge Communauté',
    description: 'Ensemble, partageons 500 prompts ce mois !',
    type: 'community',
    category: 'community',
    reward: 'Unlock Parcours Avancé pour tous',
    goal_type: 'prompts',
    goal_value: 500,
    current_progress: totalPromptsShared || 0,
    end_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  }

  return (
    <>
      {/* Hero */}
      <Section variant="gradient" spacing="xl">
        <Container size="lg">
          <div className="text-center">
            <Badge variant="soft" className="mb-4">
              <TrophyIcon className="w-3 h-3 mr-1" />
              {t('hero_badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('hero_title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('hero_subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Active Challenges */}
      <Section spacing="xl">
        <Container size="lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{t('active_challenges_title')}</h2>
            <p className="text-muted-foreground">
              {t('active_challenges_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Weekly Challenge */}
            <Card className="relative overflow-hidden border-2 border-green-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="soft" className="bg-green-500/10 text-green-700 dark:text-green-400">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {t('weekly_badge')}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">+{weeklyChallenge.reward_points}</div>
                    <div className="text-xs text-muted-foreground">{t('points_label')}</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{weeklyChallenge.title}</CardTitle>
                <CardDescription>{weeklyChallenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t('progress_label')}</span>
                      <span className="font-semibold">{weeklyChallenge.current_progress}/{weeklyChallenge.goal_value}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
                        style={{ width: `${(weeklyChallenge.current_progress / weeklyChallenge.goal_value) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Time remaining */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ClockIcon className="w-4 h-4" />
                    <span>Se termine dans 5 jours</span>
                  </div>

                  {!user ? (
                    <Link href="/auth/signup" className={cn(buttonVariants(), "w-full")}>
                      S'inscrire pour participer
                    </Link>
                  ) : (
                    <Link href="/tutorials" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                      Commencer une leçon
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Challenge */}
            <Card className="relative overflow-hidden border-2 border-violet-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="soft" className="bg-violet-500/10 text-violet-700 dark:text-violet-400">
                    <TrophyIcon className="w-3 h-3 mr-1" />
                    {t('monthly_badge')}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-violet-600">+{monthlyChallenge.reward_points}</div>
                    <div className="text-xs text-muted-foreground">points + badge</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{monthlyChallenge.title}</CardTitle>
                <CardDescription>{monthlyChallenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t('progress_label')}</span>
                      <span className="font-semibold">{monthlyChallenge.current_progress}/{monthlyChallenge.goal_value}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-300"
                        style={{ width: `${(monthlyChallenge.current_progress / monthlyChallenge.goal_value) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Reward */}
                  <div className="flex items-center gap-2 p-3 bg-violet-500/5 rounded-lg border border-violet-500/20">
                    <AwardIcon className="w-5 h-5 text-violet-600" />
                    <div className="text-sm">
                      <div className="font-semibold text-violet-700 dark:text-violet-400">{t('reward_label')}</div>
                      <div className="text-muted-foreground">{monthlyChallenge.reward_badge}</div>
                    </div>
                  </div>

                  {/* Time remaining */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ClockIcon className="w-4 h-4" />
                    <span>Se termine dans 25 jours</span>
                  </div>

                  {!user ? (
                    <Link href="/auth/signup" className={cn(buttonVariants(), "w-full")}>
                      S'inscrire pour participer
                    </Link>
                  ) : (
                    <Link href="/tutorials/paths/expert" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                      Voir le parcours
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Community Challenge */}
      <Section spacing="xl" className="bg-muted/30">
        <Container size="lg">
          <Card className="border-2 border-orange-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="soft" className="mb-3 bg-orange-500/10 text-orange-700 dark:text-orange-400">
                    <SparklesIcon className="w-3 h-3 mr-1" />
                    {t('community_badge')}
                  </Badge>
                  <CardTitle className="text-2xl mb-2">{communityChallenge.title}</CardTitle>
                  <CardDescription className="text-base">{communityChallenge.description}</CardDescription>
                </div>
                <div className="text-center px-6 py-4 bg-orange-500/10 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600">
                    {communityChallenge.current_progress}
                  </div>
                  <div className="text-sm text-muted-foreground">/ {communityChallenge.goal_value}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-6 bg-muted rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-500"
                    style={{ width: `${(communityChallenge.current_progress / communityChallenge.goal_value) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                    {Math.round((communityChallenge.current_progress / communityChallenge.goal_value) * 100)}%
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Plus que {communityChallenge.goal_value - communityChallenge.current_progress} prompts !</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    20 jours restants
                  </span>
                </div>
              </div>

              {/* Reward */}
              <div className="flex items-center justify-between p-4 bg-orange-500/5 rounded-lg border border-orange-500/20 mb-4">
                <div className="flex items-center gap-3">
                  <TargetIcon className="w-8 h-8 text-orange-600" />
                  <div>
                    <div className="font-semibold text-orange-700 dark:text-orange-400">{t('if_goal_reached')}</div>
                    <div className="text-sm text-muted-foreground">{communityChallenge.reward}</div>
                  </div>
                </div>
              </div>

              {!user ? (
                <Link href="/auth/signup" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                  Contribuer au challenge
                </Link>
              ) : (
                <Link href="/prompts/new" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full")}>
                  Partager un prompt
                </Link>
              )}
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* How It Works */}
      <Section spacing="xl">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('how_works_title')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2Icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Choisis un challenge</h3>
                <p className="text-sm text-muted-foreground">
                  Hebdomadaire, mensuel ou communautaire - trouve celui qui te motive
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <TargetIcon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Progresse à ton rythme</h3>
                <p className="text-sm text-muted-foreground">
                  Chaque action compte - leçons, prompts partagés, aide communautaire
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <AwardIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Gagne des récompenses</h3>
                <p className="text-sm text-muted-foreground">
                  Points, badges et déblocages de contenu exclusif
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
