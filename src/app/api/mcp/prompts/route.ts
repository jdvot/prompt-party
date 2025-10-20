import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * MCP (Model Context Protocol) endpoint for prompts
 * Provides structured access to prompts for AI assistants and tools
 */

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const searchParams = request.nextUrl.searchParams

  const action = searchParams.get('action') || 'list'
  const id = searchParams.get('id')
  const query = searchParams.get('query')
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '50')

  try {
    switch (action) {
      case 'get':
        if (!id) {
          return NextResponse.json({ error: 'ID required for get action' }, { status: 400 })
        }

        const { data: prompt, error: getError } = await supabase
          .from('prompts')
          .select(`
            *,
            author:profiles!author(id, name, avatar_url)
          `)
          .eq('id', id)
          .eq('is_public', true)
          .single()

        if (getError) throw getError

        return NextResponse.json({
          type: 'prompt',
          data: prompt,
          mcp_version: '1.0'
        })

      case 'search':
        if (!query) {
          return NextResponse.json({ error: 'Query required for search action' }, { status: 400 })
        }

        const { data: searchResults, error: searchError } = await supabase
          .from('prompts')
          .select(`
            id,
            title,
            body,
            category,
            tags,
            likes_count,
            created_at,
            author:profiles!author(id, name, avatar_url)
          `)
          .or(`title.ilike.%${query}%,body.ilike.%${query}%,tags.cs.{${query}}`)
          .eq('is_public', true)
          .order('likes_count', { ascending: false })
          .limit(limit)

        if (searchError) throw searchError

        return NextResponse.json({
          type: 'search_results',
          query,
          count: searchResults?.length || 0,
          data: searchResults,
          mcp_version: '1.0'
        })

      case 'list':
      default:
        let queryBuilder = supabase
          .from('prompts')
          .select(`
            id,
            title,
            body,
            category,
            tags,
            likes_count,
            created_at,
            author:profiles!author(id, name, avatar_url)
          `)
          .eq('is_public', true)

        if (category) {
          queryBuilder = queryBuilder.eq('category', category)
        }

        const { data: prompts, error: listError } = await queryBuilder
          .order('created_at', { ascending: false })
          .limit(limit)

        if (listError) throw listError

        return NextResponse.json({
          type: 'prompt_list',
          count: prompts?.length || 0,
          data: prompts,
          mcp_version: '1.0',
          capabilities: {
            actions: ['list', 'get', 'search'],
            filters: ['category', 'limit'],
            max_limit: 100
          }
        })
    }
  } catch (error) {
    console.error('MCP API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, body: promptBody, category, tags, is_public = true } = body

    if (!title || !promptBody) {
      return NextResponse.json({ error: 'Title and body required' }, { status: 400 })
    }

    const { data: prompt, error } = await supabase
      .from('prompts')
      .insert({
        title,
        body: promptBody,
        category: category || 'other',
        tags: tags || [],
        is_public,
        author: user.id,
        likes_count: 0,
        views_count: 0
      })
      .select(`
        *,
        author:profiles!author(id, name, avatar_url)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({
      type: 'prompt_created',
      data: prompt,
      mcp_version: '1.0'
    }, { status: 201 })
  } catch (error) {
    console.error('MCP Create Error:', error)
    return NextResponse.json(
      { error: 'Failed to create prompt', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
