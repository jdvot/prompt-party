import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Restore Prompt Version API
 * POST: Restore a prompt to a specific version
 */

interface RouteContext {
  params: Promise<{ id: string; versionId: string }>
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { id, versionId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Check if user owns the prompt
    const { data: prompt, error: promptError } = await supabase
      .from('prompts')
      .select('author')
      .eq('id', id)
      .single()

    if (promptError) throw promptError
    if (prompt.author !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Use the Supabase function to restore
    const { data, error } = await supabase.rpc('restore_prompt_version', {
      p_prompt_id: id,
      p_version_id: versionId
    })

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Version restored successfully'
    })
  } catch (error) {
    console.error('Error restoring version:', error)
    return NextResponse.json(
      { error: 'Failed to restore version' },
      { status: 500 }
    )
  }
}
