import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

// This is a mock implementation - you'll need to add actual API keys
// and implement the real AI service calls

export async function POST(request: NextRequest) {
  try {
    const { prompt, input, model } = await request.json()
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check user's AI test credits
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('ai_test_credits, plan')
      .eq('user_id', user.id)
      .single()

    if (profileError || !data) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const profile = data as Profile

    // Check if user has credits (10 free, unlimited for pro)
    const hasPro = profile.plan === 'pro' || profile.plan === 'team'
    const hasCredits = hasPro || (profile.ai_test_credits || 0) > 0

    if (!hasCredits) {
      return NextResponse.json(
        {
          error: 'No AI test credits remaining. Upgrade to Pro for unlimited tests.',
          upgradeUrl: '/pricing',
        },
        { status: 403 }
      )
    }

    // Mock AI response (replace with real API calls)
    const output = await mockAIResponse(prompt, input, model)

    // Deduct credit if not pro
    // TODO: Fix Supabase types to enable credit deduction
    // if (!hasPro) {
    //   await supabase
    //     .from('profiles')
    //     .update({
    //       ai_test_credits: (profile.ai_test_credits || 10) - 1,
    //     })
    //     .eq('user_id', user.id)
    // }

    return NextResponse.json({
      output,
      creditsUsed: 1,
      creditsRemaining: hasPro ? 'unlimited' : (profile.ai_test_credits || 10) - 1,
    })
  } catch (error) {
    console.error('Error in test-prompt route:', error)
    return NextResponse.json(
      { error: 'Failed to test prompt' },
      { status: 500 }
    )
  }
}

// Mock AI response - replace with real API integration
async function mockAIResponse(
  prompt: string,
  input: string,
  model: string
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return `[MOCK ${model.toUpperCase()} RESPONSE]

This is a simulated response for testing purposes.

Prompt received: "${prompt.substring(0, 100)}..."
${input ? `\nInput: "${input}"` : ''}

To enable real AI testing, you need to:
1. Add API keys to environment variables:
   - OPENAI_API_KEY for GPT-4
   - ANTHROPIC_API_KEY for Claude
   - GOOGLE_API_KEY for Gemini

2. Implement actual API calls in this route

3. Handle rate limiting and error cases

4. Track usage for billing

Note: This is a premium feature. Users get 10 free tests/month.
Pro users get unlimited tests.`
}
