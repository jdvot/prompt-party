'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { TrophyIcon, ClockIcon, SparklesIcon, CheckCircle2Icon, TargetIcon, AwardIcon } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { cn } from '@/lib/utils'
import { AnimatedContainer, StaggerContainer, FloatingElement, ScaleOnHover } from '@/components/animations'

interface ChallengesPageClientProps {
  user: any
  weeklyChallenge: any
  monthlyChallenge: any
  communityChallenge: any
  t: any
}

export function ChallengesPageClient({
  user,
  weeklyChallenge,
  monthlyChallenge,
  communityChallenge,
  t
}: ChallengesPageClientProps) {
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
                  {t.hero_badge}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {t.hero_title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                  {t.hero_subtitle}
                </p>
              </div>
            </AnimatedContainer>

            {/* Right: Trophy Illustration */}
            <AnimatedContainer animation="slide-left" delay={0.2}>
              <div className="hidden lg:block relative">
                <FloatingElement duration={4} intensity={15}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                    <Image
                      src="/branding/illustrations/features/challenge-trophy.svg"
                      alt="Challenge Trophy"
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

      {/* Active Challenges */}
      <Section spacing="md">
        <Container size="lg">
          <AnimatedContainer animation="fade" delay={0.1} className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{t.active_challenges_title}</h2>
            <p className="text-muted-foreground">
              {t.active_challenges_subtitle}
            </p>
          </AnimatedContainer>

          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {/* Weekly Challenge */}
            <ScaleOnHover scale={1.02}>
              <Card className="relative overflow-hidden border-2 border-green-500/20 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full" />
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="soft"
                      size="sm"
                      startIcon={<ClockIcon className="w-3 h-3" />}
                      className="bg-green-500/10 text-green-700 dark:text-green-400"
                    >
                      {t.weekly_badge}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">+{weeklyChallenge.reward_points}</div>
                      <div className="text-xs text-muted-foreground">{t.points_label}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{weeklyChallenge.title}</CardTitle>
                  <CardDescription>{weeklyChallenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{t.progress_label}</span>
                        <span className="font-semibold">{weeklyChallenge.current_progress}/{weeklyChallenge.goal_value}</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
                          style={{ width: `${(weeklyChallenge.current_progress / weeklyChallenge.goal_value) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Time remaining */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClockIcon className="w-4 h-4" />
                      <span>{t.ends_in} 5 {t.days_left}</span>
                    </div>

                    {!user ? (
                      <Link href="/auth/signup" className={cn(buttonVariants(), "w-full")}>
                        {t.signup_to_participate}
                      </Link>
                    ) : (
                      <Link href="/tutorials" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                        {t.start_lesson}
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScaleOnHover>

            {/* Monthly Challenge */}
            <ScaleOnHover scale={1.02}>
              <Card className="relative overflow-hidden border-2 border-violet-500/20 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="soft"
                      size="sm"
                      startIcon={<TrophyIcon className="w-3 h-3" />}
                      className="bg-violet-500/10 text-violet-700 dark:text-violet-400"
                    >
                      {t.monthly_badge}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-violet-600">+{monthlyChallenge.reward_points}</div>
                      <div className="text-xs text-muted-foreground">{t.points_label} + {t.badge_label}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{monthlyChallenge.title}</CardTitle>
                  <CardDescription>{monthlyChallenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{t.progress_label}</span>
                        <span className="font-semibold">{monthlyChallenge.current_progress}/{monthlyChallenge.goal_value}</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-300"
                          style={{ width: `${(monthlyChallenge.current_progress / monthlyChallenge.goal_value) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Reward */}
                    <div className="flex items-center gap-2 p-3 bg-violet-500/5 rounded-lg border border-violet-500/20">
                      <AwardIcon className="w-5 h-5 text-violet-600" />
                      <div className="text-sm">
                        <div className="font-semibold text-violet-700 dark:text-violet-400">{t.reward_label}</div>
                        <div className="text-muted-foreground">{monthlyChallenge.reward_badge}</div>
                      </div>
                    </div>

                    {/* Time remaining */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ClockIcon className="w-4 h-4" />
                      <span>{t.ends_in} 25 {t.days_left}</span>
                    </div>

                    {!user ? (
                      <Link href="/auth/signup" className={cn(buttonVariants(), "w-full")}>
                        {t.signup_to_participate}
                      </Link>
                    ) : (
                      <Link href="/tutorials/paths/expert" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                        {t.view_path}
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Community Challenge */}
      <Section spacing="lg" className="bg-muted/30">
        <Container size="lg">
          <AnimatedContainer animation="zoom" delay={0.3}>
            <ScaleOnHover scale={1.01}>
              <Card className="border-2 border-orange-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge
                        variant="soft"
                        size="sm"
                        startIcon={<SparklesIcon className="w-3 h-3" />}
                        className="mb-3 bg-orange-500/10 text-orange-700 dark:text-orange-400"
                      >
                        {t.community_badge}
                      </Badge>
                      <CardTitle className="text-2xl mb-2">{communityChallenge.title}</CardTitle>
                      <CardDescription className="text-base">{communityChallenge.description}</CardDescription>
                    </div>
                    <div className="text-center px-6 py-4 bg-orange-500/10 rounded-xl">
                      <div className="text-3xl font-bold text-orange-600">
                        {communityChallenge.current_progress}
                      </div>
                      <div className="text-sm text-muted-foreground">/ {communityChallenge.goal_value}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="h-6 bg-muted rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-500"
                        style={{ width: `${(communityChallenge.current_progress / communityChallenge.goal_value) * 100}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                        {Math.round((communityChallenge.current_progress / communityChallenge.goal_value) * 100)}%
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>{t.prompts_remaining.replace('{count}', String(communityChallenge.goal_value - communityChallenge.current_progress))}</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {t.days_remaining.replace('{count}', '20')}
                      </span>
                    </div>
                  </div>

                  {/* Reward */}
                  <div className="flex items-center justify-between p-4 bg-orange-500/5 rounded-lg border border-orange-500/20 mb-4">
                    <div className="flex items-center gap-3">
                      <TargetIcon className="w-8 h-8 text-orange-600" />
                      <div>
                        <div className="font-semibold text-orange-700 dark:text-orange-400">{t.if_goal_reached}</div>
                        <div className="text-sm text-muted-foreground">{communityChallenge.reward}</div>
                      </div>
                    </div>
                  </div>

                  {!user ? (
                    <Link href="/auth/signup" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                      {t.contribute_challenge}
                    </Link>
                  ) : (
                    <Link href="/prompts/new" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full")}>
                      {t.share_prompt}
                    </Link>
                  )}
                </CardContent>
              </Card>
            </ScaleOnHover>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* How It Works */}
      <Section spacing="lg">
        <Container size="md">
          <AnimatedContainer animation="fade" delay={0.4} className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t.how_works_title}</h2>
          </AnimatedContainer>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            <ScaleOnHover scale={1.03}>
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{t.step_1_title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.step_1_description}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover scale={1.03}>
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <TargetIcon className="w-6 h-6 text-violet-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{t.step_2_title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.step_2_description}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover scale={1.03}>
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <AwardIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{t.step_3_title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.step_3_description}
                  </p>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </StaggerContainer>
        </Container>
      </Section>
    </>
  )
}
