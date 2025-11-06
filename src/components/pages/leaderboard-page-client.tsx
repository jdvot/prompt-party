'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrophyIcon, BookOpenIcon, UsersIcon, SparklesIcon, FlameIcon, AwardIcon, MedalIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { AnimatedContainer, StaggerContainer, FloatingElement } from '@/components/animations'

interface LeaderboardPageClientProps {
  user: any
  topLearners: any[]
  topContributors: any[]
  hallOfFame: any[]
  levelColors: Record<string, string>
  levelLabels: Record<string, string>
  t: any
}

export function LeaderboardPageClient({
  user,
  topLearners,
  topContributors,
  hallOfFame,
  levelColors,
  levelLabels,
  t
}: LeaderboardPageClientProps) {
  return (
    <>
      {/* Hero */}
      <Section variant="gradient" spacing="md">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <AnimatedContainer animation="slide-up">
              <div className="text-center lg:text-left">
                <Badge
                  variant="soft"
                  size="md"
                  startIcon={<TrophyIcon className="w-3.5 h-3.5" />}
                  className="mb-4"
                >
                  Leaderboard
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Classement Communauté
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                  Célébrons ensemble ceux qui apprennent, partagent et aident les autres
                </p>
              </div>
            </AnimatedContainer>

            {/* Right: Podium Illustration */}
            <AnimatedContainer animation="slide-left" delay={0.2}>
              <div className="hidden lg:block relative">
                <FloatingElement duration={4} intensity={15}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse" />
                    <Image
                      src="/branding/illustrations/features/leaderboard-podium.svg"
                      alt="Leaderboard Podium"
                      width={400}
                      height={400}
                      className="relative z-10 drop-shadow-2xl"
                      priority
                    />
                  </div>
                </FloatingElement>
              </div>
            </AnimatedContainer>
          </div>
        </Container>
      </Section>

      {/* Leaderboards */}
      <Section spacing="md">
        <Container size="lg">
          <Tabs defaultValue="learners" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="learners" className="gap-2">
                <BookOpenIcon className="w-4 h-4" />
                Top Apprenants
              </TabsTrigger>
              <TabsTrigger value="contributors" className="gap-2">
                <UsersIcon className="w-4 h-4" />
                Top Contributeurs
              </TabsTrigger>
              <TabsTrigger value="hall-of-fame" className="gap-2">
                <AwardIcon className="w-4 h-4" />
                Hall of Fame
              </TabsTrigger>
            </TabsList>

            {/* Top Learners */}
            <TabsContent value="learners">
              <AnimatedContainer animation="fade" delay={0.1} className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{t.learners_title}</h3>
                <p className="text-muted-foreground">
                  Classement basé sur les leçons complétées et l'activité
                </p>
              </AnimatedContainer>

              <StaggerContainer className="space-y-4" staggerDelay={0.08}>
                {topLearners.map((learner: any, index: number) => (
                  <Card key={learner.id} className={`${index < 3 ? 'border-2 border-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          {index === 0 && <div className="text-4xl">🥇</div>}
                          {index === 1 && <div className="text-4xl">🥈</div>}
                          {index === 2 && <div className="text-4xl">🥉</div>}
                          {index >= 3 && <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>}
                        </div>

                        {/* Avatar */}
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={learner.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                            {learner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold truncate">{learner.name}</h4>
                            <Badge variant="soft" className={levelColors[learner.level]}>
                              {levelLabels[learner.level]}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{learner.lessons_completed} leçons</span>
                            <span className="flex items-center gap-1">
                              <FlameIcon className="w-3 h-3 text-orange-500" />
                              {learner.streak} jours
                            </span>
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{learner.points}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {user && (
                  <Card className="border-2 border-primary">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <SparklesIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">{t.your_position}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t.top_percent_prefix} <strong className="text-foreground">{t.top_percent_value}</strong> {t.top_percent_suffix}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Continue comme ça, tu progresses super bien 🚀
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </StaggerContainer>
            </TabsContent>

            {/* Top Contributors */}
            <TabsContent value="contributors">
              <AnimatedContainer animation="fade" delay={0.1} className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">🤝 Top 10 Contributeurs (Ce Mois)</h3>
                <p className="text-muted-foreground">
                  Classement basé sur les prompts partagés et l'aide apportée
                </p>
              </AnimatedContainer>

              <StaggerContainer className="space-y-4" staggerDelay={0.08}>
                {topContributors.map((contributor: any, index: number) => (
                  <Card key={contributor.id} className={`${index < 3 ? 'border-2 border-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          {index === 0 && <div className="text-4xl">🥇</div>}
                          {index === 1 && <div className="text-4xl">🥈</div>}
                          {index === 2 && <div className="text-4xl">🥉</div>}
                          {index >= 3 && <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>}
                        </div>

                        {/* Avatar */}
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contributor.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                            {contributor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1 truncate">{contributor.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>💡 {contributor.prompts_shared} prompts</span>
                            <span>🤝 {contributor.people_helped} aides</span>
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">{contributor.points}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {user && (
                  <Card className="border-2 border-orange-500/20 bg-orange-500/5">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <UsersIcon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                        <h4 className="font-semibold mb-1">{t.your_impact}</h4>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-bold text-orange-600">5 personnes</span> aidées ce mois
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Continue, tu fais la différence dans la communauté ! ⭐
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </StaggerContainer>
            </TabsContent>

            {/* Hall of Fame */}
            <TabsContent value="hall-of-fame">
              <AnimatedContainer animation="fade" delay={0.1} className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">⭐ Légendes de la Plateforme</h3>
                <p className="text-muted-foreground">
                  Les membres les plus actifs et influents de tous les temps
                </p>
              </AnimatedContainer>

              <StaggerContainer className="space-y-4" staggerDelay={0.08}>
                {hallOfFame.map((legend: any, index: number) => (
                  <Card key={legend.id} className="border-2 border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-transparent">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
                          {index === 0 && <MedalIcon className="w-8 h-8 text-white" />}
                          {index === 1 && <TrophyIcon className="w-7 h-7 text-white" />}
                          {index === 2 && <AwardIcon className="w-6 h-6 text-white" />}
                          {index >= 3 && <div className="text-2xl font-bold text-white">#{index + 1}</div>}
                        </div>

                        {/* Avatar */}
                        <Avatar className="w-16 h-16 border-4 border-yellow-500/30">
                          <AvatarImage src={legend.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-xl">
                            {legend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg truncate">{legend.name}</h4>
                            <Badge variant="soft" className={levelColors[legend.level]}>
                              {levelLabels[legend.level]}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            🏆 {legend.badges} badges débloqués
                          </div>
                          <div className="text-xs text-muted-foreground italic">
                            {legend.achievements}
                          </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                            {legend.points}
                          </div>
                          <div className="text-xs text-muted-foreground">points totaux</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </StaggerContainer>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </>
  )
}
