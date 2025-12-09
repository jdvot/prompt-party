import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

// Helper to verify API key
async function verifyApiKey(apiKey: string) {
  const supabase = await createClient()
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex')

  // Check rate limit
  const { data: canProceed } = await supabase.rpc('check_api_rate_limit', {
    key_hash_input: keyHash,
  })

  if (!canProceed) {
    return { valid: false, error: 'API key invalid, expired, or rate limit exceeded' }
  }

  // Get API key details
  const { data: apiKeyData, error } = await supabase
    .from('api_keys')
    .select('id, user_id, monthly_limit, requests_count')
    .eq('key_hash', keyHash)
    .eq('is_active', true)
    .single()

  if (error || !apiKeyData) {
    return { valid: false, error: 'Invalid API key' }
  }

  // Increment usage
  await supabase.rpc('increment_api_usage', { key_hash_input: keyHash })

  return { valid: true, apiKeyData }
}

// GET /api/v1/prompts - List prompts
export async function GET(request: NextRequest) {
  const startTime = Date.now()
  const apiKey = request.headers.get('x-api-key')

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key required. Include x-api-key header.' },
      { status: 401 }
    )
  }

  const auth = await verifyApiKey(apiKey)
  if (!auth.valid || !auth.apiKeyData) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const supabase = await createClient()
  const url = new URL(request.url)

  // Query parameters
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100)
  const sort = url.searchParams.get('sort') || 'created_at'
  const order = url.searchParams.get('order') === 'asc' ? 'asc' : 'desc'
  const tag = url.searchParams.get('tag')
  const author = url.searchParams.get('author')

  const offset = (page - 1) * limit

  let query = supabase
    .from('prompts')
    .select('*, profiles(name, avatar_url)', { count: 'exact' })
    .eq('visibility', 'public')

  if (tag) {
    query = query.contains('tags', [tag])
  }

  if (author) {
    query = query.eq('author', author)
  }

  const { data, error, count } = await query
    .order(sort, { ascending: order === 'asc' })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Log request
  const responseTime = Date.now() - startTime
  await supabase.rpc('log_api_request', {
    key_id: auth.apiKeyData.id,
    endpoint_path: '/api/v1/prompts',
    http_method: 'GET',
    status: 200,
    response_time: responseTime,
  })

  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total: count || 0,
      pages: Math.ceil((count || 0) / limit),
    },
    meta: {
      requests_remaining: (auth.apiKeyData.monthly_limit || 10000) - (auth.apiKeyData.requests_count || 0) - 1,
    },
  })
}

// POST /api/v1/prompts - Create prompt
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const apiKey = request.headers.get('x-api-key')

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key required. Include x-api-key header.' },
      { status: 401 }
    )
  }

  const auth = await verifyApiKey(apiKey)
  if (!auth.valid || !auth.apiKeyData) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const supabase = await createClient()
  const body = await request.json()

  const { title, content, tags, visibility = 'public' } = body

  if (!title || !content) {
    return NextResponse.json(
      { error: 'title and content are required' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('prompts')
    .insert({
      title,
      body: content,
      tags: tags || [],
      visibility,
      author: auth.apiKeyData.user_id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Log request
  const responseTime = Date.now() - startTime
  await supabase.rpc('log_api_request', {
    key_id: auth.apiKeyData.id,
    endpoint_path: '/api/v1/prompts',
    http_method: 'POST',
    status: 201,
    response_time: responseTime,
  })

  return NextResponse.json(
    {
      data,
      meta: {
        requests_remaining: (auth.apiKeyData.monthly_limit || 10000) - (auth.apiKeyData.requests_count || 0) - 1,
      },
    },
    { status: 201 }
  )
}
