/**
 * Client-side gamification functions
 * These call API routes instead of directly accessing the database
 */

export async function completeLessonClient(tutorialId: string, rewardPoints: number) {
  try {
    const response = await fetch('/api/gamification/complete-lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tutorialId, rewardPoints }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to complete lesson')
    }

    return await response.json()
  } catch (error) {
    console.error('Error completing lesson:', error)
    throw error
  }
}

export async function sharePromptClient(promptId: string, promptPoints: number = 30) {
  try {
    const response = await fetch('/api/gamification/share-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promptId, promptPoints }),
    })

    if (!response.ok) {
      throw new Error('Failed to share prompt')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sharing prompt:', error)
    throw error
  }
}
