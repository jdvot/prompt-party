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
import { ClaudeBasicsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.claude_basics')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ClaudeBasicsTutorial() {
  const t = await getTranslations('tutorials.claude_basics')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="xl" className="py-8 overflow-hidden">
      {/* Back Button */}
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 w-full overflow-hidden">
        <div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge>{t('badge_beginner')}</Badge>
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
              <span>{t('learn_unique')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_conversations')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_context')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_practices')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('what_is_claude')}</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg">
              <strong>Claude</strong> {t('claude_intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.FileText className="w-5 h-5 text-blue-500" />
                  {t('writing_content')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('writing_1')}</li>
                  <li>{t('writing_2')}</li>
                  <li>{t('writing_3')}</li>
                  <li>{t('writing_4')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Code className="w-5 h-5 text-green-500" />
                  {t('programming')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('programming_1')}</li>
                  <li>{t('programming_2')}</li>
                  <li>{t('programming_3')}</li>
                  <li>{t('programming_4')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Brain className="w-5 h-5 text-purple-500" />
                  {t('analysis_research')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('analysis_1')}</li>
                  <li>{t('analysis_2')}</li>
                  <li>{t('analysis_3')}</li>
                  <li>{t('analysis_4')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.MessageSquare className="w-5 h-5 text-orange-500" />
                  {t('conversation')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>{t('conversation_1')}</li>
                  <li>{t('conversation_2')}</li>
                  <li>{t('conversation_3')}</li>
                  <li>{t('conversation_4')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('key_features')}</h2>

          <div className="space-y-4">
            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.FileStack className="w-5 h-5 text-violet-600" />
                  {t('large_context')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  {t('large_context_desc')}
                </p>
                <ul className="text-sm space-y-1">
                  <li>{t('context_1')}</li>
                  <li>{t('context_2')}</li>
                  <li>{t('context_3')}</li>
                  <li>{t('context_4')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Shield className="w-5 h-5 text-green-600" />
                  {t('safety')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('safety_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Zap className="w-5 h-5 text-blue-600" />
                  {t('reasoning')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('reasoning_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('how_to_talk')}</h2>

          <Alert className="mb-6">
            <Icons.Lightbulb className="w-4 h-4" />
            <AlertDescription>
              <strong>{t('pro_tip')}</strong> {t('tip_text')}
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">✅ {t('good_example')}</h3>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{t('you')}</p>
                    <CodeBlock
                      language="text"
                      code="I'm building a React app and need to implement authentication. I'm using Next.js 14 with the App Router. Can you explain the best approach?"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{t('claude_will')}</p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• {t('will_1')}</li>
                      <li>• {t('will_2')}</li>
                      <li>• {t('will_3')}</li>
                      <li>• {t('will_4')}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">❌ {t('bad_example')}</h3>
              <Card>
                <CardContent className="pt-6">
                  <CodeBlock
                    language="text"
                    code="How do I do auth?"
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    {t('too_vague')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('context_memory')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('how_remembers')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('within_conversation')}</h4>
                <p className="text-muted-foreground">
                  {t('within_desc')}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('between_conversations')}</h4>
                <p className="text-muted-foreground">
                  {t('between_desc')}
                </p>
              </div>

              <Alert>
                <Icons.Info className="w-4 h-4" />
                <AlertDescription>
                  <strong>{t('tip')}</strong> {t('context_tip')}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('best_practices')}</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  {t('do_this')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t('do_1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t('do_2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t('do_3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t('do_4')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t('do_5')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.XCircle className="w-5 h-5 text-red-600" />
                  {t('avoid_this')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>{t('avoid_1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>{t('avoid_2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>{t('avoid_3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>{t('avoid_4')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>{t('avoid_5')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Practice Exercise */}
        <section>
          <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.BookOpen className="w-5 h-5 text-primary" />
                {tCommon('try_yourself')}
              </CardTitle>
              <CardDescription>{t('practice_starters')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('for_coding')}</h4>
                <CodeBlock
                  language="text"
                  code="I'm working on a [type of app] using [technology stack]. I need to [specific task]. Here's what I've tried so far: [context]. Can you help me [specific question]?"
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('for_writing')}</h4>
                <CodeBlock
                  language="text"
                  code="I need to write a [type of content] for [audience]. The tone should be [formal/casual/etc]. Key points to cover: [list]. Can you help me draft this?"
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('for_analysis')}</h4>
                <CodeBlock
                  language="text"
                  code="I have [type of data/situation]. I want to understand [specific aspect]. Here's the context: [details]. What insights can you provide?"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quiz Section */}
        <section>
          <ClaudeBasicsQuiz />
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
              <Link href="/tutorials/prompt-templates" className={cn(buttonVariants())}>
                {t('next_prompt_templates')}
              </Link>
              <Link href="/tutorials/advanced-prompting" className={cn(buttonVariants({ variant: "outline" }))}>
                {t('next_advanced')}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">{tCommon('keep_learning')}</p>
              <ul className="space-y-1">
                <li>• <a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noopener" className="text-primary hover:underline">{t('read_docs')}</a></li>
                <li>• <Link href="/prompts/wizard" className="text-primary hover:underline">{t('try_wizard')}</Link></li>
                <li>• <Link href="/prompts" className="text-primary hover:underline">{t('browse_community')}</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
        </div>

        {/* Sidebar - Progress Tracker */}
        <aside className="hidden lg:block">
          <TutorialProgress
            tutorialId="claude-basics"
            title="Les bases de Claude"
            duration="20 min"
            level="beginner"
            rewardPoints={50}
            rewardBadge="Premier Pas"
            completed={false}
          />
        </aside>
      </div>
    </Container>
  )
}
