import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { completeLesson } from '@/lib/gamification'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const { tutorialId, rewardPoints } = await request.json()

    if (!tutorialId || rewardPoints === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: tutorialId and rewardPoints' },
        { status: 400 }
      )
    }

    // Complete the lesson and award points
    const result = await completeLesson(user.id, tutorialId, rewardPoints)

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error completing lesson:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to complete lesson' },
      { status: 500 }
    )
  }
}
