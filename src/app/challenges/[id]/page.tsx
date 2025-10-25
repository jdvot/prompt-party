import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { SubmitPromptButton } from '@/components/challenges/submit-prompt-button'
import { SubmissionCard } from '@/components/challenges/submission-card'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { TrophyIcon, ClockIcon, SparklesIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'

interface ChallengeDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ChallengeDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: challenge } = await supabase
    .from('challenges')
    .select('title, description')
    .eq('id', id)
    .single()

  if (!challenge) {
    return {
      title: 'Challenge Not Found | Prompt Party',
    }
  }

  return {
    title: `${challenge.title} | Challenges | Prompt Party`,
    description: challenge.description,
  }
}

export default async function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const { id } = await params
  const t = await getTranslations('challenges')
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get challenge details
  const { data: challenge, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !challenge) {
    notFound()
  }

  // Calculate time remaining
  const now = new Date()
  const endsAt = new Date(challenge.ends_at)
  const daysLeft = Math.ceil((endsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const isEnded = endsAt < now

  // Get submissions with vote counts
  const { data: submissions } = await supabase
    .from('challenge_submissions')
    .select(`
      *,
      prompts (
        id,
        title,
        body,
        tags,
        likes_count,
        created_at,
        profiles (
          id,
          name,
          avatar_url
        )
      )
    `)
    .eq('challenge_id', id)
    .order('votes_count', { ascending: false })

  // Check if user has already submitted
  const { data: userSubmission } = user
    ? await supabase
        .from('challenge_submissions')
        .select('id, prompt_id')
        .eq('challenge_id', id)
        .eq('user_id', user.id)
        .single()
    : { data: null }

  const difficultyColors: Record<string, string> = {
    easy: 'bg-green-500/10 text-green-500 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    hard: 'bg-red-500/10 text-red-500 border-red-500/20',
  }

  const categoryEmojis: Record<string, string> = {
    creativity: '🎨',
    code: '💻',
    marketing: '📈',
    writing: '✍️',
    general: '🌟',
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Challenge Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/challenges"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t('back_to_challenges')}
            </Link>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-6xl">{categoryEmojis[challenge.category]}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className={difficultyColors[challenge.difficulty]}>
                  {t(`difficulty_${challenge.difficulty}`)}
                </Badge>
                {isEnded && (
                  <Badge variant="destructive">{t('ended')}</Badge>
                )}
                {!isEnded && daysLeft <= 3 && (
                  <Badge variant="default">{t('ending_soon')}</Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-3">{challenge.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {challenge.description}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ClockIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {isEnded ? t('ended') : `${daysLeft}`}
              </div>
              <div className="text-sm text-muted-foreground">
                {isEnded ? '' : t('days_left')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrophyIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-primary">
                +{challenge.reward_credits}
              </div>
              <div className="text-sm text-muted-foreground">{t('credits')}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <SparklesIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {submissions?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">{t('submissions')}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {new Set(submissions?.map((s: any) => s.user_id)).size || 0}
              </div>
              <div className="text-sm text-muted-foreground">{t('participants')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Section */}
        {!isEnded && (
          <div className="mb-8">
            {user ? (
              userSubmission ? (
                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <p className="text-center">
                      {t('already_submitted')}{' '}
                      <Link
                        href={`/prompts/${userSubmission.prompt_id}`}
                        className="text-primary hover:underline"
                      >
                        {t('view_submission')}
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <SubmitPromptButton challengeId={challenge.id} />
              )
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <p className="mb-4">{t('login_to_submit')}</p>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    {t('login')}
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Submissions List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {t('leaderboard')} ({submissions?.length || 0})
          </h2>

          {submissions && submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((submission: any, index: number) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  rank={index + 1}
                  userId={user?.id}
                  isEnded={isEnded}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">{t('no_submissions')}</h3>
              <p className="text-muted-foreground">{t('be_first')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
