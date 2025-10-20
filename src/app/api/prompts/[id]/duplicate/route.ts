import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get original prompt
    const { data: originalPrompt, error: fetchError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !originalPrompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      )
    }

    // Create duplicate with new title
    const { data: newPrompt, error: createError } = await supabase
      .from('prompts')
      .insert({
        title: `${originalPrompt.title} (Copy)`,
        body: originalPrompt.body,
        tags: originalPrompt.tags,
        author: user.id,
        is_public: false, // Start as private
      })
      .select()
      .single()

    if (createError || !newPrompt) {
      return NextResponse.json(
        { error: 'Failed to create duplicate' },
        { status: 500 }
      )
    }

    return NextResponse.json({ promptId: newPrompt.id })
  } catch (error) {
    console.error('Error in duplicate route:', error)
    return NextResponse.json(
      { error: 'Failed to duplicate prompt' },
      { status: 500 }
    )
  }
}
