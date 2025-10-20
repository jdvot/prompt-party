'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4">⚠️</h1>
        <h2 className="text-3xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-8">
          An error occurred while processing your request. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 border rounded-md hover:bg-accent transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
