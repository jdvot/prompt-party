import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendWeeklyDigest } from '@/lib/email/send-notification'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET(request: NextRequest) {
  // Verify this is a scheduled cron job or has the correct authorization
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.CRON_SECRET

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get users who want weekly digest
    const { data: users } = await supabase
      .from('notification_preferences')
      .select('user_id')
      .eq('email_weekly_digest', true)

    if (!users || users.length === 0) {
      return NextResponse.json({
        message: 'No users opted in for weekly digest',
      })
    }

    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    let sentCount = 0

    // Send digest to each user
    for (const { user_id } of users) {
      try {
        // Get user stats for the week
        const { count: newFollowers } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('followed_id', user_id)
          .gte('created_at', oneWeekAgo.toISOString())

        // Get likes on user's prompts
        const { data: prompts } = await supabase
          .from('prompts')
          .select('id')
          .eq('author', user_id)

        const promptIds = prompts?.map((p) => p.id) || []

        const { count: totalLikes } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .in('prompt_id', promptIds)
          .gte('created_at', oneWeekAgo.toISOString())

        const { count: totalComments } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .in('prompt_id', promptIds)
          .gte('created_at', oneWeekAgo.toISOString())

        // Get top prompt
        const { data: topPrompt } = await supabase
          .from('prompts')
          .select('id, title, likes_count')
          .eq('author', user_id)
          .order('likes_count', { ascending: false })
          .limit(1)
          .single()

        // Send digest
        await sendWeeklyDigest(user_id, {
          newFollowers: newFollowers || 0,
          totalLikes: totalLikes || 0,
          totalComments: totalComments || 0,
          topPrompt: topPrompt || undefined,
        })

        sentCount++
      } catch (error) {
        console.error(`Failed to send digest to user ${user_id}:`, error)
      }
    }

    return NextResponse.json({
      message: `Weekly digest sent to ${sentCount} users`,
    })
  } catch (error) {
    console.error('Weekly digest error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
