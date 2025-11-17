import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialProgress } from '@/components/tutorials/tutorial-progress'
import { Container } from '@/components/layout/container'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { SpecDrivenDevelopmentQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.spec_driven_development')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function SpecDrivenDevelopmentTutorial() {
  const t = await getTranslations('tutorials.spec_driven_development')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="xl" className="py-8">
      {/* Back Button */}
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 w-full">
        <div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-yellow-500">{t('badge_level')}</Badge>
          <Badge variant="outline">{t('duration')}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {/* What You'll Learn */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.Lightbulb className="w-5 h-5 text-primary" />
            {tCommon('what_you_learn')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_4')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1: What is Spec Driven Development */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_1_title')}</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              {t('section_1_intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckSquare className="w-5 h-5 text-blue-500" />
                  {t('section_1_principle_1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_principle_1_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Target className="w-5 h-5 text-green-500" />
                  {t('section_1_principle_2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_principle_2_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.MessageSquare className="w-5 h-5 text-purple-500" />
                  {t('section_1_principle_3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_principle_3_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-orange-500" />
                  {t('section_1_principle_4_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_principle_4_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: The Spec Driven Workflow */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_2_title')}</h2>
          <p className="text-lg text-muted-foreground mb-6">{t('section_2_intro')}</p>

          <div className="space-y-4">
            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.FileText className="w-5 h-5 text-violet-600" />
                  {t('section_2_step_1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{t('section_2_step_1_desc')}</p>
                <CodeBlock
                  language="markdown"
                  code={`# Feature Specification Template

## Description
[Feature overview]

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Success Criteria
- Clear metric or behavior that defines completion`}
                />
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Eye className="w-5 h-5 text-blue-600" />
                  {t('section_2_step_2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('section_2_step_2_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Code className="w-5 h-5 text-green-600" />
                  {t('section_2_step_3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('section_2_step_3_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-amber-600" />
                  {t('section_2_step_4_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('section_2_step_4_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Writing Effective Specifications */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_3_title')}</h2>

          <Alert className="mb-6">
            <Icons.Lightbulb className="w-4 h-4" />
            <AlertDescription>
              <strong>{t('pro_tip')}</strong> {t('section_3_tip')}
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('section_3_clarity_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{t('section_3_clarity_desc')}</p>
                <CodeBlock
                  language="markdown"
                  code={`# User Authentication Feature

## Good Clarity
Users should be able to sign up using email + password, with password validation
requiring at least 8 characters including 1 uppercase letter.

## Avoid Vague Language
"Users need to be able to login" - Too vague, no detail on method or validation`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('section_3_examples_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{t('section_3_examples_desc')}</p>
                <CodeBlock
                  language="markdown"
                  code={`## Examples
- Example: User signs up with "test@example.com" and password "SecurePass123"
- Expected: Account created, confirmation email sent
- Counter-example: Password "weak" rejected due to insufficient length`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: GitHub Integration */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_4_title')}</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('section_4_issues_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{t('section_4_issues_desc')}</p>
                <CodeBlock
                  language="markdown"
                  code={`# [Feature Name] Specification

## Description
[Feature overview]

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Database Changes
[Schema modifications needed]

## API Endpoints
[New or modified endpoints]

## Success Criteria
[Clear metrics of completion]`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('section_4_pr_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{t('section_4_pr_desc')}</p>
                <CodeBlock
                  language="markdown"
                  code={`## PR Template

Fixes #123 (link to spec issue)

### Changes
- Implemented feature as specified
- Added tests covering all requirements
- Updated documentation

### Testing
- Tested against all success criteria
- Manual testing: [steps taken]
- Automated tests: [passing]`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 5: Best Practices */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_5_title')}</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  {t('section_5_do_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>{t('section_5_do_1')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>{t('section_5_do_2')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>{t('section_5_do_3')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.XCircle className="w-5 h-5 text-red-600" />
                  {t('section_5_dont_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span>✗</span>
                    <span>{t('section_5_dont_1')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✗</span>
                    <span>{t('section_5_dont_2')}</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✗</span>
                    <span>{t('section_5_dont_3')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Common Pitfalls */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_6_title')}</h2>

          <div className="space-y-4">
            <Alert>
              <Icons.AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <strong>{t('section_6_pitfall_1_title')}</strong> {t('section_6_pitfall_1_desc')}
              </AlertDescription>
            </Alert>

            <Alert>
              <Icons.AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <strong>{t('section_6_pitfall_2_title')}</strong> {t('section_6_pitfall_2_desc')}
              </AlertDescription>
            </Alert>

            <Alert>
              <Icons.AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <strong>{t('section_6_pitfall_3_title')}</strong> {t('section_6_pitfall_3_desc')}
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Section 7: Real-world Example */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_7_title')}</h2>

          <Card>
            <CardHeader>
              <CardTitle>{t('section_7_example_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t('section_7_example_intro')}</p>
              <CodeBlock
                language="markdown"
                code={`# User Favorites Collection Feature

## Description
Allow users to mark prompts as favorites and organize them in custom collections.

## Requirements
- [ ] Users can mark/unmark any public prompt as favorite
- [ ] Users have a personal "Favorites" collection (automatic)
- [ ] Users can create custom collections
- [ ] Collections can be public (share with anyone) or private (owner only)
- [ ] Real-time sync across devices

## Database
- collections table: id, user_id, name, is_public, created_at
- collection_items table: id, collection_id, prompt_id, added_at

## API Endpoints
- POST /api/favorites/:promptId - Add to favorites
- DELETE /api/favorites/:promptId - Remove from favorites
- GET /api/collections - List user's collections
- POST /api/collections - Create new collection

## Success Criteria
- Users report collection feature is intuitive and discoverable
- < 2s load time for collections with 100+ items
- 100% test coverage for collection mutations
- Zero data loss in migration from old favorites system`}
              />
            </CardContent>
          </Card>
        </section>

        {/* Section 8: Team Alignment */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_8_title')}</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('section_8_review_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('section_8_review_desc')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('section_8_communication_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('section_8_communication_desc')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('section_8_updates_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('section_8_updates_desc')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quiz Section */}
        <section>
          <SpecDrivenDevelopmentQuiz />
        </section>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5 text-primary" />
              {tCommon('next_steps')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tutorials/claude-code-basics" className={cn(buttonVariants())}>
                {t('next_claude_code')}
              </Link>
              <Link href="/tutorials/ragas-evaluation" className={cn(buttonVariants({ variant: "outline" }))}>
                {t('next_ragas')}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">{tCommon('keep_learning')}</p>
              <ul className="space-y-1">
                <li>• <a href="https://github.com" target="_blank" rel="noopener" className="text-primary hover:underline">{t('github_guide')}</a></li>
                <li>• <a href="https://docs.github.com/en/issues" target="_blank" rel="noopener" className="text-primary hover:underline">{t('github_issues_docs')}</a></li>
                <li>• <Link href="/prompts" className="text-primary hover:underline">{t('browse_prompts')}</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
        </div>

        {/* Sidebar - Progress Tracker */}
        <aside className="hidden lg:block">
          <TutorialProgress
            tutorialId="spec-driven-development"
            title={t('title')}
            duration={t('duration')}
            level="expert"
            rewardPoints={150}
            rewardBadge={t('reward_badge')}
            completed={false}
          />
        </aside>
      </div>
    </Container>
  )
}
