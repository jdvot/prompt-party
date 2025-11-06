import { createClient } from '@/lib/supabase/server'
import { getTranslations } from 'next-intl/server'
import { LeaderboardPageClient } from '@/components/pages/leaderboard-page-client'

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

  // Get translations as an object to pass to client component
  const translations = {
    learners_title: t('learners_title'),
    your_position: t('your_position'),
    top_percent_prefix: t('top_percent_prefix'),
    top_percent_value: t('top_percent_value', { percent: '15' }),
    top_percent_suffix: t('top_percent_suffix'),
    your_impact: t('your_impact')
  }

  return (
    <LeaderboardPageClient
      user={user}
      topLearners={topLearners}
      topContributors={topContributors}
      hallOfFame={hallOfFame}
      levelColors={levelColors}
      levelLabels={levelLabels}
      t={translations}
    />
  )
}
