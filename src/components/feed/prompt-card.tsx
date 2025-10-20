import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HeartIcon } from 'lucide-react'

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
    <Link href={`/prompts/${id}`} className="block group">
      <Card className="h-full bento-card overflow-hidden relative">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                    {(author.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate">{author.name || 'Anonymous'}</span>
                </div>
                <span className="text-muted-foreground/60">•</span>
                <time className="text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                </time>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Body Preview */}
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {preview}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs hover:bg-secondary/80 transition-colors duration-200"
                >
                  #{tag}
                </Badge>
              ))}
              {tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 4} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors duration-200">
              <HeartIcon className="w-4 h-4" />
              <span className="font-medium">{likes_count}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
