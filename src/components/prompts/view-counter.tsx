'use client'

import { useEffect, useState } from 'react'
import { EyeIcon } from 'lucide-react'

interface ViewCounterProps {
  promptId: string
  initialViews?: number
}

export function ViewCounter({ promptId, initialViews = 0 }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews)
  const [hasIncremented, setHasIncremented] = useState(false)

  useEffect(() => {
    // Only increment once per session
    const viewedKey = `viewed_${promptId}`
    const hasViewed = sessionStorage.getItem(viewedKey)

    if (!hasViewed && !hasIncremented) {
      // Increment view count
      fetch(`/api/prompts/${promptId}/view`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.views) {
            setViews(data.views)
          }
          sessionStorage.setItem(viewedKey, 'true')
          setHasIncremented(true)
        })
        .catch((err) => console.error('Failed to increment view:', err))
    }
  }, [promptId, hasIncremented])

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <EyeIcon className="w-4 h-4" />
      <span>{views.toLocaleString()} {views === 1 ? 'view' : 'views'}</span>
    </div>
  )
}
