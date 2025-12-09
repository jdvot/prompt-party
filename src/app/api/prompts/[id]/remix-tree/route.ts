import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface RouteContext {
  params: Promise<{ id: string }>
}

interface RemixNode {
  id: string
  title: string
  author: {
    name?: string
    avatar_url?: string
  }
  likes_count: number
  views_count: number
  created_at: string
  children?: RemixNode[]
}

async function buildRemixTree(
  promptId: string,
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<RemixNode | null> {
  // Get the prompt details
  const { data: prompt, error: promptError } = await supabase
    .from('prompts')
    .select(`
      id,
      title,
      likes_count,
      views_count,
      created_at,
      author:profiles!author(name, avatar_url)
    `)
    .eq('id', promptId)
    .single()

  if (promptError || !prompt) {
    return null
  }

  // Get all remixes of this prompt
  const { data: forks } = await supabase
    .from('forks')
    .select('forked_prompt_id')
    .eq('original_prompt_id', promptId)

  const node: RemixNode = {
    id: prompt.id,
    title: prompt.title,
    author: Array.isArray(prompt.author) ? prompt.author[0] : prompt.author,
    likes_count: prompt.likes_count || 0,
    views_count: prompt.views_count || 0,
    created_at: prompt.created_at || new Date().toISOString(),
    children: [],
  }

  // Recursively build children
  if (forks && forks.length > 0) {
    const childPromises = forks.map((fork) =>
      buildRemixTree(fork.forked_prompt_id, supabase)
    )
    const children = await Promise.all(childPromises)
    node.children = children.filter((child): child is RemixNode => child !== null)
  }

  return node
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const supabase = await createClient()

  try {
    const tree = await buildRemixTree(id, supabase)

    if (!tree) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 })
    }

    return NextResponse.json({ tree })
  } catch (error) {
    console.error('Error building remix tree:', error)
    return NextResponse.json(
      { error: 'Failed to build remix tree' },
      { status: 500 }
    )
  }
}
