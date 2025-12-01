import { createClient } from '@/lib/supabase/server'
import { getTranslations } from 'next-intl/server'
import { ChallengesPageClient } from '@/components/pages/challenges-page-client'

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
    title: t('weekly_challenge_title'),
    description: t('weekly_challenge_description'),
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
    title: t('monthly_challenge_title'),
    description: t('monthly_challenge_description'),
    type: 'monthly',
    category: 'learning',
    reward_points: 200,
    reward_badge: t('monthly_challenge_reward'),
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
    title: t('community_challenge_title'),
    description: t('community_challenge_description'),
    type: 'community',
    category: 'community',
    reward: t('community_challenge_reward'),
    goal_type: 'prompts',
    goal_value: 500,
    current_progress: totalPromptsShared || 0,
    end_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  }

  // Get translations as an object to pass to client component
  const translations = {
    hero_badge: t('hero_badge'),
    hero_title: t('hero_title'),
    hero_subtitle: t('hero_subtitle'),
    active_challenges_title: t('active_challenges_title'),
    active_challenges_subtitle: t('active_challenges_subtitle'),
    weekly_badge: t('weekly_badge'),
    monthly_badge: t('monthly_badge'),
    community_badge: t('community_badge'),
    points_label: t('points_label'),
    badge_label: t('badge_label'),
    progress_label: t('progress_label'),
    reward_label: t('reward_label'),
    if_goal_reached: t('if_goal_reached'),
    how_works_title: t('how_works_title'),
    ends_in: t('ends_in'),
    days_left: t('days_left'),
    signup_to_participate: t('signup_to_participate'),
    start_lesson: t('start_lesson'),
    view_path: t('view_path'),
    prompts_remaining: t('prompts_remaining'),
    days_remaining: t('days_remaining'),
    contribute_challenge: t('contribute_challenge'),
    share_prompt: t('share_prompt'),
    step_1_title: t('step_1_title'),
    step_1_description: t('step_1_description'),
    step_2_title: t('step_2_title'),
    step_2_description: t('step_2_description'),
    step_3_title: t('step_3_title'),
    step_3_description: t('step_3_description')
  }

  return (
    <ChallengesPageClient
      user={user}
      weeklyChallenge={weeklyChallenge}
      monthlyChallenge={monthlyChallenge}
      communityChallenge={communityChallenge}
      t={translations}
    />
  )
}
