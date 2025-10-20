import { NextRequest, NextResponse } from 'next/server'

/**
 * AI Prompt Optimizer API
 * Analyzes prompts and provides optimization suggestions
 */

interface Suggestion {
  type: 'improvement' | 'warning' | 'success'
  title: string
  description: string
  example?: string
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 })
    }

    // Analyze the prompt (this is a simplified version - in production, use an AI model)
    const analysis = analyzePrompt(prompt)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error optimizing prompt:', error)
    return NextResponse.json(
      { error: 'Failed to optimize prompt' },
      { status: 500 }
    )
  }
}

function analyzePrompt(prompt: string) {
  const suggestions: Suggestion[] = []
  const improvements: string[] = []
  let score = 50 // Base score

  // Check length
  if (prompt.length < 50) {
    suggestions.push({
      type: 'warning',
      title: 'Prompt is too short',
      description: 'Add more context and specific instructions to get better results.',
      example: 'Instead of "Write code", try "Write a Python function that calculates the Fibonacci sequence up to n terms"',
    })
  } else if (prompt.length > 100) {
    score += 10
    suggestions.push({
      type: 'success',
      title: 'Good length',
      description: 'Your prompt has sufficient detail.',
    })
  }

  // Check for specificity markers
  const specificityMarkers = ['specific', 'exactly', 'must', 'should', 'format', 'style', 'tone']
  const hasSpecificity = specificityMarkers.some(marker =>
    prompt.toLowerCase().includes(marker)
  )

  if (hasSpecificity) {
    score += 15
    suggestions.push({
      type: 'success',
      title: 'Clear specifications',
      description: 'Your prompt includes specific requirements, which helps AI understand your needs.',
    })
  } else {
    suggestions.push({
      type: 'improvement',
      title: 'Add specific requirements',
      description: 'Include details about format, style, tone, or constraints to get more targeted results.',
      example: 'Add phrases like "in a professional tone" or "formatted as a bullet list"',
    })
  }

  // Check for context
  const contextMarkers = ['context:', 'background:', 'for', 'because', 'in order to']
  const hasContext = contextMarkers.some(marker =>
    prompt.toLowerCase().includes(marker)
  )

  if (hasContext) {
    score += 15
    suggestions.push({
      type: 'success',
      title: 'Provides context',
      description: 'Your prompt includes helpful context for the AI.',
    })
  } else {
    suggestions.push({
      type: 'improvement',
      title: 'Add context',
      description: 'Explain why you need this and what you\'ll use it for to get better results.',
      example: 'Add "This is for a blog post about web development" or "I need this for a presentation"',
    })
  }

  // Check for examples
  if (prompt.toLowerCase().includes('example') || prompt.includes('e.g.') || prompt.includes('like')) {
    score += 15
    suggestions.push({
      type: 'success',
      title: 'Includes examples',
      description: 'Providing examples helps the AI understand your expectations.',
    })
  } else {
    suggestions.push({
      type: 'improvement',
      title: 'Consider adding examples',
      description: 'Examples can dramatically improve output quality.',
      example: 'Add "For example: [your example]" or "Similar to [reference]"',
    })
  }

  // Check for role/persona
  if (prompt.toLowerCase().includes('act as') || prompt.toLowerCase().includes('you are')) {
    score += 10
    suggestions.push({
      type: 'success',
      title: 'Defines role',
      description: 'Assigning a role helps the AI adopt the right perspective.',
    })
  } else {
    suggestions.push({
      type: 'improvement',
      title: 'Define a role',
      description: 'Start with "Act as a [expert]" or "You are a [profession]" to set context.',
      example: 'Act as a senior software engineer with 10 years of experience',
    })
  }

  // Generate optimized version
  let optimizedPrompt = prompt

  // Add role if missing
  if (!prompt.toLowerCase().includes('act as') && !prompt.toLowerCase().includes('you are')) {
    optimizedPrompt = `Act as an expert in this field.\n\n${optimizedPrompt}`
    improvements.push('Added expert role definition for better context')
  }

  // Add structure if missing
  if (!prompt.includes('\n') && prompt.length > 100) {
    const sentences = optimizedPrompt.split('. ')
    optimizedPrompt = sentences.join('.\n')
    improvements.push('Improved formatting with line breaks for clarity')
  }

  // Add output format suggestion if missing
  if (!prompt.toLowerCase().includes('format') && !prompt.toLowerCase().includes('structure')) {
    optimizedPrompt += '\n\nPlease provide your response in a clear, structured format.'
    improvements.push('Added output format specification')
  }

  // Ensure score is between 0-100
  score = Math.min(100, Math.max(0, score))

  return {
    score,
    suggestions,
    optimizedPrompt: optimizedPrompt.trim(),
    improvements: improvements.length > 0 ? improvements : ['Made minor formatting improvements'],
  }
}
