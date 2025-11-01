'use client'

import { memo } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HeartIcon, MessageCircleIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
  comments_count?: number
  created_at: string
}

export const PromptCard = memo(function PromptCard({
  id,
  title,
  body,
  tags,
  author,
  likes_count,
  comments_count = 0,
  created_at,
}: PromptCardProps) {
  const t = useTranslations('common')
  const preview = body.length > 200 ? body.substring(0, 200) + '...' : body

  return (
    <Link
      href={`/prompts/${id}`}
      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
    >
      <Card className="h-full bento-card overflow-hidden relative">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link
                  href={`/profile/${author.name || 'anonymous'}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 hover:text-primary transition-colors min-h-[44px] -m-2 p-2 rounded-md hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={author.avatar_url || undefined} alt={author.name || t('anonymous')} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {(author.name || 'A').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{author.name || t('anonymous')}</span>
                </Link>
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
            <div className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200">
              <MessageCircleIcon className="w-4 h-4" />
              <span className="font-medium">{comments_count}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
})
