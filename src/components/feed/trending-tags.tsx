import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { TrendingUpIcon } from 'lucide-react'

export async function TrendingTags() {
  const supabase = await createClient()

  // Get all prompts with their tags
  const { data: prompts } = await supabase
    .from('prompts')
    .select('tags, created_at')
    .eq('is_public', true)
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Last 7 days
    .limit(1000)

  // Count tag occurrences
  const tagCounts: Record<string, number> = {}
  prompts?.forEach((prompt) => {
    prompt.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  // Sort and get top 10
  const trendingTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }))

  if (trendingTags.length === 0) {
    return null
  }

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUpIcon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Trending Tags</h2>
      </div>

      <div className="space-y-2">
        {trendingTags.map(({ tag, count }, index) => (
          <Link
            key={tag}
            href={`/search?tag=${encodeURIComponent(tag)}`}
            className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors group"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground w-6">
                #{index + 1}
              </span>
              <Badge variant="secondary" className="group-hover:bg-secondary/80">
                #{tag}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {count} {count === 1 ? 'prompt' : 'prompts'}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <Link
          href="/explore/tags"
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
        >
          View all tags
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
