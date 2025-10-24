import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrophyIcon, ClockIcon, SparklesIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('challenges')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ChallengesPage() {
  const t = await getTranslations('challenges')
  const supabase = await createClient()

  // Get active challenges
  const { data: challenges } = await supabase
    .from('challenges')
    .select('*')
    .eq('is_active', true)
    .gte('ends_at', new Date().toISOString())
    .order('created_at', { ascending: false })

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <TrophyIcon className="w-4 h-4" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* How it Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-primary" />
              {t('how_it_works')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {t('step1_number')}
                </div>
                <h3 className="font-semibold mb-1">{t('step1_title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('step1_description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {t('step2_number')}
                </div>
                <h3 className="font-semibold mb-1">{t('step2_title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('step2_description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {t('step3_number')}
                </div>
                <h3 className="font-semibold mb-1">{t('step3_title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('step3_description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t('active_challenges')}</h2>
          {!challenges || challenges.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <TrophyIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>{t('no_challenges')}</p>
              <p className="text-sm mt-2">{t('check_back')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge: any) => {
                const daysLeft = Math.ceil(
                  (new Date(challenge.ends_at).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                )

                const difficultyColors = {
                  easy: 'bg-green-500/10 text-green-500 border-green-500/20',
                  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
                  hard: 'bg-red-500/10 text-red-500 border-red-500/20',
                }

                const categoryEmojis = {
                  creativity: '🎨',
                  code: '💻',
                  marketing: '📈',
                  writing: '✍️',
                  general: '🌟',
                }

                const difficultyKey = `difficulty_${challenge.difficulty}` as 'difficulty_easy' | 'difficulty_medium' | 'difficulty_hard'

                return (
                  <Link
                    key={challenge.id}
                    href={`/challenges/${challenge.id}`}
                    className="block"
                  >
                    <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge
                              className={`mb-2 ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}`}
                            >
                              {t(difficultyKey)}
                            </Badge>
                          </div>
                          <span className="text-2xl">
                            {categoryEmojis[challenge.category as keyof typeof categoryEmojis]}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{challenge.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {challenge.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <ClockIcon className="w-4 h-4" />
                            <span>{t('days_left', { count: daysLeft })}</span>
                          </div>
                          <div className="flex items-center gap-1 text-primary font-medium">
                            <TrophyIcon className="w-4 h-4" />
                            <span>{t('reward_credits', { count: challenge.reward_credits })}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Past Winners (Coming Soon) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('past_winners')}</h2>
          <Card>
            <CardContent className="text-center py-12">
              <TrophyIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">
                {t('past_winners_text')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        {!user && (
          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-2">{t('cta_title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('cta_subtitle')}
                </p>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  {t('cta_button')}
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
