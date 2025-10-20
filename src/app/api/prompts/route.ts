import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('sort') || 'new'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit

  const supabase = await createClient()

  try {
    let query = supabase
      .from('prompts')
      .select(`
        *,
        profiles:author (
          name,
          avatar_url
        )
      `)
      .eq('is_public', true)
      .range(offset, offset + limit - 1)

    // Apply sorting
    switch (sort) {
      case 'top':
        query = query.order('likes_count', { ascending: false })
        break
      case 'trending':
        // Simple trending: most likes in last 7 days
        // For production, you'd want a more sophisticated algorithm
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        query = query
          .gte('created_at', sevenDaysAgo.toISOString())
          .order('likes_count', { ascending: false })
        break
      case 'new':
      default:
        query = query.order('created_at', { ascending: false })
        break
    }

    const { data: prompts, error } = await query

    if (error) {
      console.error('Error fetching prompts:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ prompts, page, limit })
  } catch (error: any) {
    console.error('Error in prompts API:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, body: promptBody, tags, is_public } = body

    // Validation
    if (!title || !promptBody) {
      return NextResponse.json(
        { error: 'Title and body are required' },
        { status: 400 }
      )
    }

    // Create prompt
    const { data: prompt, error } = await supabase
      .from('prompts')
      .insert({
        title,
        body: promptBody,
        tags: tags || [],
        author: user.id,
        is_public: is_public !== undefined ? is_public : true,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating prompt:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ prompt }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST prompts API:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
