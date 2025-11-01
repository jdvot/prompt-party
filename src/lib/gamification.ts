import { createClient } from '@/lib/supabase/server'

/**
 * Award points to a user and update their progress
 */
export async function awardPoints(userId: string, points: number, reason: string) {
  const supabase = await createClient()

  // Fetch current progress
  const { data: currentProgress } = await supabase
    .from('user_progress')
    .select('points')
    .eq('user_id', userId)
    .single()

  const newPoints = (currentProgress?.points || 0) + points

  // Update user progress (level will auto-update via DB trigger)
  const { error } = await supabase
    .from('user_progress')
    .update({
      points: newPoints,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error awarding points:', error)
    return { success: false, error }
  }

  return { success: true, pointsAwarded: points, totalPoints: newPoints }
}

/**
 * Complete a lesson and award points
 */
export async function completeLesson(userId: string, lessonId: string, lessonPoints: number = 50) {
  const supabase = await createClient()

  // Increment lessons_completed
  const { data: progress } = await supabase
    .from('user_progress')
    .select('lessons_completed')
    .eq('user_id', userId)
    .single()

  const newLessonsCount = (progress?.lessons_completed || 0) + 1

  await supabase
    .from('user_progress')
    .update({
      lessons_completed: newLessonsCount,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  // Award points
  await awardPoints(userId, lessonPoints, `Completed lesson: ${lessonId}`)

  // Check for badge unlocks
  const badges = await checkAndAwardBadges(userId)

  // Update challenge progress
  await updateChallengeProgress(userId, 'lessons', 1)

  return {
    success: true,
    lessonsCompleted: newLessonsCount,
    pointsAwarded: lessonPoints,
    badgesUnlocked: badges
  }
}

/**
 * Share a prompt and award points
 */
export async function sharePrompt(userId: string, promptId: string, promptPoints: number = 30) {
  const supabase = await createClient()

  // Increment prompts_shared
  const { data: progress } = await supabase
    .from('user_progress')
    .select('prompts_shared')
    .eq('user_id', userId)
    .single()

  const newPromptsCount = (progress?.prompts_shared || 0) + 1

  await supabase
    .from('user_progress')
    .update({
      prompts_shared: newPromptsCount,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  // Award points
  await awardPoints(userId, promptPoints, `Shared prompt: ${promptId}`)

  // Check for badge unlocks
  const badges = await checkAndAwardBadges(userId)

  // Update challenge progress
  await updateChallengeProgress(userId, 'prompts', 1)

  return {
    success: true,
    promptsShared: newPromptsCount,
    pointsAwarded: promptPoints,
    badgesUnlocked: badges
  }
}

/**
 * Help someone and award points
 */
export async function helpPerson(userId: string, helpPoints: number = 20) {
  const supabase = await createClient()

  // Increment people_helped
  const { data: progress } = await supabase
    .from('user_progress')
    .select('people_helped')
    .eq('user_id', userId)
    .single()

  const newHelpedCount = (progress?.people_helped || 0) + 1

  await supabase
    .from('user_progress')
    .update({
      people_helped: newHelpedCount,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  // Award points
  await awardPoints(userId, helpPoints, `Helped someone`)

  // Check for badge unlocks
  const badges = await checkAndAwardBadges(userId)

  return {
    success: true,
    peopleHelped: newHelpedCount,
    pointsAwarded: helpPoints,
    badgesUnlocked: badges
  }
}

/**
 * Check conditions and award badges to a user
 */
export async function checkAndAwardBadges(userId: string) {
  const supabase = await createClient()

  // Fetch user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!progress) return []

  // Fetch all badges
  const { data: allBadges } = await supabase
    .from('badges')
    .select('*')

  if (!allBadges) return []

  // Fetch already earned badges
  const { data: earnedBadges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)

  const earnedBadgeIds = new Set(earnedBadges?.map(b => b.badge_id) || [])
  const newlyAwardedBadges: any[] = []

  // Check conditions for each badge
  for (const badge of allBadges) {
    if (earnedBadgeIds.has(badge.id)) continue

    let shouldAward = false

    switch (badge.condition_type) {
      case 'lessons_completed':
        shouldAward = progress.lessons_completed >= (badge.condition_value || 0)
        break
      case 'prompts_shared':
        shouldAward = progress.prompts_shared >= (badge.condition_value || 0)
        break
      case 'people_helped':
        shouldAward = progress.people_helped >= (badge.condition_value || 0)
        break
      default:
        // Special badges (no auto-unlock)
        shouldAward = false
    }

    if (shouldAward) {
      const { error } = await supabase
        .from('user_badges')
        .insert({
          user_id: userId,
          badge_id: badge.id,
          earned_at: new Date().toISOString()
        })

      if (!error) {
        newlyAwardedBadges.push(badge)
      }
    }
  }

  return newlyAwardedBadges
}

/**
 * Award a special badge manually (for early adopters, supporters, etc.)
 */
export async function awardSpecialBadge(userId: string, badgeId: string) {
  const supabase = await createClient()

  // Check if already earned
  const { data: existing } = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .single()

  if (existing) {
    return { success: false, error: 'Badge already earned' }
  }

  // Award the badge
  const { error } = await supabase
    .from('user_badges')
    .insert({
      user_id: userId,
      badge_id: badgeId,
      earned_at: new Date().toISOString()
    })

  if (error) {
    return { success: false, error }
  }

  return { success: true }
}

/**
 * Update user's challenge progress
 */
export async function updateChallengeProgress(userId: string, goalType: string, increment: number = 1) {
  const supabase = await createClient()

  // Get active challenges matching this goal type
  const { data: challenges } = await supabase
    .from('challenges')
    .select('id, goal_type, goal_value')
    .eq('is_active', true)
    .eq('goal_type', goalType)
    .gte('end_date', new Date().toISOString())

  if (!challenges || challenges.length === 0) return

  for (const challenge of challenges) {
    // Get or create user's progress for this challenge
    const { data: existingProgress } = await supabase
      .from('user_challenge_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('challenge_id', challenge.id)
      .single()

    if (existingProgress) {
      // Update existing progress
      const newProgress = existingProgress.current_progress + increment
      const isCompleted = newProgress >= challenge.goal_value

      await supabase
        .from('user_challenge_progress')
        .update({
          current_progress: newProgress,
          completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProgress.id)

      // If just completed, award challenge points
      if (isCompleted && !existingProgress.completed) {
        const { data: challengeData } = await supabase
          .from('challenges')
          .select('reward_points, reward_badge_id')
          .eq('id', challenge.id)
          .single()

        if (challengeData?.reward_points) {
          await awardPoints(userId, challengeData.reward_points, `Completed challenge: ${challenge.id}`)
        }

        if (challengeData?.reward_badge_id) {
          await awardSpecialBadge(userId, challengeData.reward_badge_id)
        }

        // Increment challenges_completed
        const { data: progress } = await supabase
          .from('user_progress')
          .select('challenges_completed')
          .eq('user_id', userId)
          .single()

        await supabase
          .from('user_progress')
          .update({
            challenges_completed: (progress?.challenges_completed || 0) + 1
          })
          .eq('user_id', userId)
      }
    } else {
      // Create new progress entry
      await supabase
        .from('user_challenge_progress')
        .insert({
          user_id: userId,
          challenge_id: challenge.id,
          current_progress: increment,
          completed: increment >= challenge.goal_value,
          completed_at: increment >= challenge.goal_value ? new Date().toISOString() : null
        })
    }
  }
}

/**
 * Update user's streak
 */
export async function updateStreak(userId: string) {
  const supabase = await createClient()

  const { data: progress } = await supabase
    .from('user_progress')
    .select('streak_days, last_activity_date')
    .eq('user_id', userId)
    .single()

  if (!progress) return

  const today = new Date().toISOString().split('T')[0]
  const lastActivity = progress.last_activity_date

  let newStreak = progress.streak_days || 0

  if (!lastActivity) {
    // First activity
    newStreak = 1
  } else {
    const lastDate = new Date(lastActivity)
    const todayDate = new Date(today)
    const diffTime = todayDate.getTime() - lastDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      // Consecutive day
      newStreak += 1
    } else if (diffDays > 1) {
      // Streak broken
      newStreak = 1
    }
    // If diffDays === 0, same day, don't change streak
  }

  await supabase
    .from('user_progress')
    .update({
      streak_days: newStreak,
      last_activity_date: today,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  // Check for streak badges
  const streakBadges = [
    { days: 3, badgeId: 'streak_3' },
    { days: 7, badgeId: 'streak_7' },
    { days: 30, badgeId: 'streak_30' }
  ]

  for (const { days, badgeId } of streakBadges) {
    if (newStreak >= days) {
      await awardSpecialBadge(userId, badgeId)
    }
  }

  return { streak: newStreak }
}

/**
 * Initialize user progress when they sign up
 */
export async function initializeUserProgress(userId: string) {
  const supabase = await createClient()

  // Check if already exists
  const { data: existing } = await supabase
    .from('user_progress')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (existing) return

  // Create initial progress
  await supabase
    .from('user_progress')
    .insert({
      user_id: userId,
      points: 0,
      level: 'beginner',
      streak_days: 0,
      lessons_completed: 0,
      prompts_shared: 0,
      people_helped: 0,
      challenges_completed: 0,
      last_activity_date: new Date().toISOString().split('T')[0]
    })
}

/**
 * Get user's current progress
 */
export async function getUserProgress(userId: string) {
  const supabase = await createClient()

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  return progress
}

/**
 * Get user's earned badges
 */
export async function getUserBadges(userId: string) {
  const supabase = await createClient()

  const { data: badges } = await supabase
    .from('user_badges')
    .select(`
      badge_id,
      earned_at,
      badges (
        id,
        name,
        description,
        icon,
        category
      )
    `)
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })

  return badges || []
}

/**
 * Get user's active challenges
 */
export async function getUserActiveChallenges(userId: string) {
  const supabase = await createClient()

  const { data: challenges } = await supabase
    .from('user_challenge_progress')
    .select(`
      id,
      current_progress,
      completed,
      completed_at,
      challenges (
        id,
        title,
        description,
        type,
        category,
        end_date,
        reward_points,
        reward_badge_id,
        goal_type,
        goal_value
      )
    `)
    .eq('user_id', userId)
    .eq('completed', false)

  return challenges || []
}
