import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt_id, user_id } = await request.json()

    if (!prompt_id || !user_id) {
      return NextResponse.json(
        { error: 'Missing prompt_id or user_id' },
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

    // Get prompt details for time saved estimation
    const { data: prompt } = await supabase
      .from('marketing_prompts')
      .select('estimated_time_saved')
      .eq('id', prompt_id)
      .single()

    // Insert usage record
    const { error: usageError } = await supabase
      .from('marketing_prompt_usage')
      .insert({
        user_id,
        prompt_id,
        used_at: new Date().toISOString(),
      })

    if (usageError) {
      console.error('Error tracking usage:', usageError)
      return NextResponse.json({ error: usageError.message }, { status: 500 })
    }

    // Track in marketing suite analytics
    const timeSaved = prompt?.estimated_time_saved || 30
    const { error: analyticsError } = await supabase.rpc(
      'track_marketing_suite_usage',
      {
        p_user_id: user_id,
        p_prompts_used: 1,
        p_ai_tests_run: 0,
        p_multi_llm_comparisons: 0,
        p_brand_voice_optimizations: 0,
        p_time_saved_minutes: timeSaved,
      }
    )

    if (analyticsError) {
      console.error('Error tracking analytics:', analyticsError)
      // Non-critical, continue
    }

    return NextResponse.json({
      success: true,
      time_saved: timeSaved,
    })
  } catch (error: any) {
    console.error('Track usage error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
