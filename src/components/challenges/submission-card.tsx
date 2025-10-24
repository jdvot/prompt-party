'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ThumbsUpIcon, ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

interface SubmissionCardProps {
  submission: {
    id: string
    votes_count: number
    created_at: string
    prompts: {
      id: string
      title: string
      body: string
      tags: string[]
      likes_count: number
      profiles: {
        id: string
        name: string
        avatar_url: string | null
      }
    }
  }
  rank: number
  userId?: string
  isEnded: boolean
}

export function SubmissionCard({ submission, rank, userId, isEnded }: SubmissionCardProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(submission.votes_count)
  const [isVoting, setIsVoting] = useState(false)
  const router = useRouter()
  const t = useTranslations('challenges')
  const supabase = createClient()

  // Check if user has voted
  useEffect(() => {
    if (!userId) return

    const checkVote = async () => {
      const { data } = await supabase
        .from('challenge_votes')
        .select('id')
        .eq('submission_id', submission.id)
        .eq('user_id', userId)
        .single()

      setHasVoted(!!data)
    }

    checkVote()
  }, [userId, submission.id, supabase])

  const handleVote = async () => {
    if (!userId || isEnded || isVoting) return

    setIsVoting(true)

    try {
      if (hasVoted) {
        // Remove vote
        const { error } = await supabase
          .from('challenge_votes')
          .delete()
          .eq('submission_id', submission.id)
          .eq('user_id', userId)

        if (!error) {
          await supabase.rpc('decrement_submission_votes', {
            submission_uuid: submission.id,
          })
          setVoteCount((prev) => prev - 1)
          setHasVoted(false)
        }
      } else {
        // Add vote
        const { error } = await supabase
          .from('challenge_votes')
          .insert({
            submission_id: submission.id,
            user_id: userId,
          })

        if (!error) {
          await supabase.rpc('increment_submission_votes', {
            submission_uuid: submission.id,
          })
          setVoteCount((prev) => prev + 1)
          setHasVoted(true)
        }
      }

      router.refresh()
    } catch (error) {
      console.error('Vote error:', error)
    } finally {
      setIsVoting(false)
    }
  }

  const getRankEmoji = (r: number) => {
    switch (r) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${r}`
    }
  }

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Rank */}
          <div className="flex-shrink-0 w-12 text-center">
            <div className="text-2xl font-bold">{getRankEmoji(rank)}</div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={submission.prompts.profiles.avatar_url || undefined} />
                  <AvatarFallback>
                    {submission.prompts.profiles.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    href={`/profile/${submission.prompts.profiles.name}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {submission.prompts.profiles.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {new Date(submission.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Link href={`/prompts/${submission.prompts.id}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ExternalLinkIcon className="w-4 h-4" />
                  {t('view_prompt')}
                </Button>
              </Link>
            </div>

            <Link
              href={`/prompts/${submission.prompts.id}`}
              className="block mb-3 hover:text-primary transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{submission.prompts.title}</h3>
              <p className="text-muted-foreground line-clamp-2">
                {submission.prompts.body.substring(0, 200)}...
              </p>
            </Link>

            {/* Tags */}
            {submission.prompts.tags && submission.prompts.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {submission.prompts.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant={hasVoted ? undefined : 'outline'}
                size="sm"
                onClick={handleVote}
                disabled={!userId || isEnded || isVoting}
                className="gap-2"
              >
                <ThumbsUpIcon className={`w-4 h-4 ${hasVoted ? 'fill-current' : ''}`} />
                {voteCount} {t('votes')}
              </Button>

              <div className="text-sm text-muted-foreground">
                {submission.prompts.likes_count} {t('likes')}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
