import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Prompt Versioning API
 * GET: Retrieve version history for a prompt
 * POST: Create a new version of a prompt
 */

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const supabase = await createClient()

  try {
    const { data: versions, error } = await supabase
      .from('prompt_versions')
      .select(`
        *,
        author:profiles!changed_by(id, name, avatar_url)
      `)
      .eq('prompt_id', id)
      .order('version_number', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      versions: versions || [],
      count: versions?.length || 0
    })
  } catch (error) {
    console.error('Error fetching versions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, body: promptBody, change_note } = body

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

    // Get current version number
    const { data: latestVersion } = await supabase
      .from('prompt_versions')
      .select('version_number')
      .eq('prompt_id', id)
      .order('version_number', { ascending: false })
      .limit(1)
      .single()

    const newVersionNumber = (latestVersion?.version_number || 0) + 1

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .single()

    // Create new version
    const { data: version, error: versionError } = await supabase
      .from('prompt_versions')
      .insert({
        prompt_id: id,
        version_number: newVersionNumber,
        title,
        body: promptBody,
        change_summary: change_note || `Version ${newVersionNumber}`,
        changed_by: user.id,
        changed_by_name: profile?.name || 'Unknown'
      })
      .select(`
        *,
        author:profiles!changed_by(id, name, avatar_url)
      `)
      .single()

    if (versionError) throw versionError

    // Update the main prompt
    const { error: updateError } = await supabase
      .from('prompts')
      .update({
        title,
        body: promptBody,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (updateError) throw updateError

    return NextResponse.json({
      version,
      message: 'Version created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating version:', error)
    return NextResponse.json(
      { error: 'Failed to create version' },
      { status: 500 }
    )
  }
}
