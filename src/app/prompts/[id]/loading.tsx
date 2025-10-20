export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>

        {/* Body skeleton */}
        <div className="bg-card border rounded-lg p-8 mb-6 animate-pulse">
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
