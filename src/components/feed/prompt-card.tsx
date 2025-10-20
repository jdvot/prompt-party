import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface PromptCardProps {
  id: string
  title: string
  body: string
  tags: string[]
  author: {
    name: string | null
    avatar_url: string | null
  }
  likes_count: number
  created_at: string
}

export function PromptCard({
  id,
  title,
  body,
  tags,
  author,
  likes_count,
  created_at,
}: PromptCardProps) {
  // Truncate body for preview
  const preview = body.length > 200 ? body.substring(0, 200) + '...' : body

  return (
    <Link
      href={`/prompts/${id}`}
      className="block bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
              {title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>by {author.name || 'Anonymous'}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(created_at), { addSuffix: true })}</span>
            </div>
          </div>
        </div>

        {/* Body Preview */}
        <p className="text-muted-foreground line-clamp-3">{preview}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{likes_count}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
