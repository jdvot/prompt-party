import { sendNotificationEmail } from './client'
import { createClient } from '@/lib/supabase/server'

export async function sendCommentNotification(
  promptAuthorId: string,
  commenterName: string,
  promptTitle: string,
  promptId: string
) {
  const supabase = await createClient()

  // Get author's email and preferences
  const { data: author } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', promptAuthorId)
    .single()

  if (!author) return

  const { data: user } = await supabase.auth.admin.getUserById(promptAuthorId)
  if (!user?.user?.email) return

  const { data: prefs } = await supabase
    .from('notification_preferences')
    .select('email_comments')
    .eq('user_id', promptAuthorId)
    .single()

  // Check if user wants email notifications for comments
  if (prefs && !prefs.email_comments) return

  await sendNotificationEmail(user.user.email, 'comment', {
    title: 'New comment on your prompt',
    message: `${commenterName} commented on "${promptTitle}"`,
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prompt-party.com'}/prompts/${promptId}`,
    actionText: 'View Comment',
  })
}

export async function sendLikeNotification(
  promptAuthorId: string,
  likerName: string,
  promptTitle: string,
  promptId: string
) {
  const supabase = await createClient()

  const { data: author } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', promptAuthorId)
    .single()

  if (!author) return

  const { data: user } = await supabase.auth.admin.getUserById(promptAuthorId)
  if (!user?.user?.email) return

  const { data: prefs } = await supabase
    .from('notification_preferences')
    .select('email_likes')
    .eq('user_id', promptAuthorId)
    .single()

  if (prefs && !prefs.email_likes) return

  await sendNotificationEmail(user.user.email, 'like', {
    title: 'Someone liked your prompt',
    message: `${likerName} liked "${promptTitle}"`,
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prompt-party.com'}/prompts/${promptId}`,
    actionText: 'View Prompt',
  })
}

export async function sendRemixNotification(
  originalAuthorId: string,
  remixerName: string,
  originalTitle: string,
  remixId: string
) {
  const supabase = await createClient()

  const { data: author } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', originalAuthorId)
    .single()

  if (!author) return

  const { data: user } = await supabase.auth.admin.getUserById(originalAuthorId)
  if (!user?.user?.email) return

  const { data: prefs } = await supabase
    .from('notification_preferences')
    .select('email_remixes')
    .eq('user_id', originalAuthorId)
    .single()

  if (prefs && !prefs.email_remixes) return

  await sendNotificationEmail(user.user.email, 'remix', {
    title: 'Your prompt was remixed',
    message: `${remixerName} created a remix of "${originalTitle}"`,
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prompt-party.com'}/prompts/${remixId}`,
    actionText: 'View Remix',
  })
}

export async function sendFollowNotification(
  followedUserId: string,
  followerName: string,
  followerUsername: string
) {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.admin.getUserById(followedUserId)
  if (!user?.user?.email) return

  const { data: prefs } = await supabase
    .from('notification_preferences')
    .select('email_follows')
    .eq('user_id', followedUserId)
    .single()

  if (prefs && !prefs.email_follows) return

  await sendNotificationEmail(user.user.email, 'follow', {
    title: 'New follower',
    message: `${followerName} started following you`,
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prompt-party.com'}/profile/${followerUsername}`,
    actionText: 'View Profile',
  })
}

export async function sendWeeklyDigest(userId: string, stats: {
  newFollowers: number
  totalLikes: number
  totalComments: number
  topPrompt?: {
    id: string
    title: string
    likes_count: number
  }
}) {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.admin.getUserById(userId)
  if (!user?.user?.email) return

  const { data: prefs } = await supabase
    .from('notification_preferences')
    .select('email_weekly_digest')
    .eq('user_id', userId)
    .single()

  if (prefs && !prefs.email_weekly_digest) return

  const message = `
    <h3>Your week on Prompt Party</h3>
    <ul>
      <li><strong>${stats.newFollowers}</strong> new followers</li>
      <li><strong>${stats.totalLikes}</strong> likes on your prompts</li>
      <li><strong>${stats.totalComments}</strong> new comments</li>
    </ul>
    ${
      stats.topPrompt
        ? `<p>Your top prompt this week: "<strong>${stats.topPrompt.title}</strong>" with ${stats.topPrompt.likes_count} likes!</p>`
        : ''
    }
  `

  await sendNotificationEmail(user.user.email, 'weekly_digest', {
    title: 'Your weekly Prompt Party summary',
    message,
    actionUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prompt-party.com'}/profile/me`,
    actionText: 'View Your Profile',
  })
}
