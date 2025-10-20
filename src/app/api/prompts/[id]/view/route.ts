import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Increment view count
    const { data, error } = await supabase.rpc('increment_prompt_views', {
      prompt_id: id,
    })

    if (error) {
      console.error('Error incrementing views:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get updated view count
    const { data: prompt } = await supabase
      .from('prompts')
      .select('views_count')
      .eq('id', id)
      .single()

    return NextResponse.json({ views: prompt?.views_count || 0 })
  } catch (error) {
    console.error('Error in view route:', error)
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    )
  }
}
