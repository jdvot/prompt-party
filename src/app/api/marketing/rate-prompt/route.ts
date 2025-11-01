import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt_id, user_id, rating } = await request.json()

    if (!prompt_id || !user_id || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== user_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already used this prompt
    const { data: existingUsage } = await supabase
      .from('marketing_prompt_usage')
      .select('id')
      .eq('user_id', user_id)
      .eq('prompt_id', prompt_id)
      .order('used_at', { ascending: false })
      .limit(1)
      .single()

    if (existingUsage) {
      // Update existing usage with rating
      const { error: updateError } = await supabase
        .from('marketing_prompt_usage')
        .update({ rating })
        .eq('id', existingUsage.id)

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 })
      }
    } else {
      // Create new usage record with rating
      const { error: insertError } = await supabase
        .from('marketing_prompt_usage')
        .insert({
          user_id,
          prompt_id,
          rating,
          used_at: new Date().toISOString(),
        })

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    // Trigger will auto-update the prompt's average rating

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Rate prompt error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
