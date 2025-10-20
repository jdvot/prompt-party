'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CopyIcon, CheckIcon } from 'lucide-react'

interface DuplicateButtonProps {
  promptId: string
  userId?: string
}

export function DuplicateButton({ promptId, userId }: DuplicateButtonProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleDuplicate = async () => {
    if (!userId) {
      router.push('/auth/login?redirect=/prompts/' + promptId)
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/prompts/${promptId}/duplicate`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to duplicate prompt')
      }

      const { promptId: newPromptId } = await response.json()

      setSuccess(true)
      setTimeout(() => {
        router.push(`/prompts/${newPromptId}`)
      }, 500)
    } catch (error) {
      console.error('Error duplicating prompt:', error)
      alert('Failed to duplicate prompt. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDuplicate}
      disabled={loading || success}
    >
      {success ? (
        <>
          <CheckIcon className="w-4 h-4 mr-2 text-success" />
          Duplicated!
        </>
      ) : (
        <>
          <CopyIcon className="w-4 h-4 mr-2" />
          {loading ? 'Duplicating...' : 'Duplicate'}
        </>
      )}
    </Button>
  )
}
