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
import { ClaudeCodeBasicsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.claude_code_basics')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ClaudeCodeBasicsTutorial() {
  const t = await getTranslations('tutorials.claude_code_basics')
  const tCommon = await getTranslations('tutorials')

  return (
    <Container size="lg" className="py-8">
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 w-full">
        <div>
      {/* Back Button */}
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge>{t('badge_level')}</Badge>
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
        {/* Section 1: What is Claude Code */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_1_title')}</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none overflow-hidden">
            <p className="text-lg mb-4">
              {t('section_1_intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Code className="w-5 h-5 text-blue-500" />
                  {t('section_1_feature_1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_feature_1_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.GitBranch className="w-5 h-5 text-green-500" />
                  {t('section_1_feature_2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_feature_2_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Bug className="w-5 h-5 text-orange-500" />
                  {t('section_1_feature_3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_feature_3_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.FileText className="w-5 h-5 text-purple-500" />
                  {t('section_1_feature_4_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_feature_4_desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          <Alert className="mt-6">
            <Icons.Info className="w-4 h-4" />
            <AlertDescription>
              <strong>{t('vs_copilot_title')}</strong> {t('vs_copilot_desc')}
            </AlertDescription>
          </Alert>
        </section>

        {/* Section 2: Installation & Setup */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_2_title')}</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_2_cloud_title')}</h3>
              <p className="text-muted-foreground mb-3">{t('section_2_cloud_desc')}</p>
              <CodeBlock
                language="text"
                code="1. Visit https://claude.ai/code
2. Sign in with your Anthropic account
3. Link your GitHub repository (optional)
4. Start coding!"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_2_cli_title')}</h3>
              <p className="text-muted-foreground mb-3">{t('section_2_cli_desc')}</p>
              <CodeBlock
                language="bash"
                code={`# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Authenticate
claude-code auth login

# Start a coding session
claude-code chat`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_2_github_title')}</h3>
              <p className="text-muted-foreground mb-3">{t('section_2_github_desc')}</p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>{t('section_2_github_step_1')}</li>
                <li>{t('section_2_github_step_2')}</li>
                <li>{t('section_2_github_step_3')}</li>
              </ol>
            </div>

            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.FileCode className="w-5 h-5 text-violet-600" />
                  {t('section_2_claude_md_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{t('section_2_claude_md_desc')}</p>
                <CodeBlock
                  language="markdown"
                  code={`# CLAUDE.md

## Project Overview
Brief description of your project

## Tech Stack
- Framework: Next.js 15
- Language: TypeScript
- UI: Tailwind CSS + Shadcn UI

## Coding Standards
- Use functional components
- Follow ESLint rules
- Write tests for all features

## File Structure
src/
  app/         # Next.js App Router
  components/  # React components
  lib/         # Utilities`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Practical Usage */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_3_title')}</h2>

          <Alert className="mb-6">
            <Icons.Lightbulb className="w-4 h-4" />
            <AlertDescription>
              <strong>{t('pro_tip')}</strong> {t('section_3_tip')}
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_3_generating_title')}</h3>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{t('you_prompt')}</p>
                    <CodeBlock
                      language="text"
                      code="Create a reusable Button component in React with TypeScript that supports primary, secondary, and outline variants. Include hover states and loading spinner."
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{t('claude_generates')}</p>
                    <CodeBlock
                      language="typescript"
                      code={`import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-all',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'border-2 border-blue-600 text-blue-600 hover:bg-blue-50': variant === 'outline',
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_3_refactoring_title')}</h3>
              <p className="text-muted-foreground mb-3">{t('section_3_refactoring_desc')}</p>
              <CodeBlock
                language="text"
                code="Refactor this component to use React hooks instead of class components, extract repeated logic into custom hooks, and improve performance with useMemo."
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_3_debugging_title')}</h3>
              <p className="text-muted-foreground mb-3">{t('section_3_debugging_desc')}</p>
              <CodeBlock
                language="text"
                code="I'm getting a 'Cannot read property of undefined' error in this component. Here's the code: [paste code]. Can you identify the issue and suggest a fix?"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Real Examples */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_4_title')}</h2>

          <div className="space-y-4">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Layers className="w-5 h-5 text-blue-600" />
                  {t('section_4_example_1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('section_4_example_1_desc')}</p>
                <div className="overflow-x-auto">
                  <CodeBlock
                    language="text"
                    code="Generate a complete Next.js 15 dashboard layout component with:
- Responsive sidebar navigation
- Header with user profile dropdown
- Main content area with proper spacing
- Dark mode support
- TypeScript types
Follow Shadcn UI patterns"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t('section_4_example_result')}</p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.RefreshCw className="w-5 h-5 text-green-600" />
                  {t('section_4_example_2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('section_4_example_2_desc')}</p>
                <div className="overflow-x-auto">
                  <CodeBlock
                    language="text"
                    code="Refactor this Redux code to use Zustand:
- Simplify state management
- Remove unnecessary boilerplate
- Add TypeScript types
- Maintain the same functionality"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t('section_4_example_result')}</p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Server className="w-5 h-5 text-purple-600" />
                  {t('section_4_example_3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('section_4_example_3_desc')}</p>
                <div className="overflow-x-auto">
                  <CodeBlock
                    language="text"
                    code="Design a RESTful API for a blog platform with:
- CRUD operations for posts
- Authentication with JWT
- Rate limiting
- Proper error handling
- OpenAPI/Swagger documentation"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{t('section_4_example_result')}</p>
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
                  {t('do_this')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>{t('do_1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>{t('do_2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>{t('do_3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>{t('do_4')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span>{t('do_5')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.XCircle className="w-5 h-5 text-red-600" />
                  {t('avoid_this')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">✗</span>
                    <span>{t('avoid_1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">✗</span>
                    <span>{t('avoid_2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">✗</span>
                    <span>{t('avoid_3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">✗</span>
                    <span>{t('avoid_4')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 flex-shrink-0">✗</span>
                    <span>{t('avoid_5')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Icons.Workflow className="w-5 h-5 text-amber-600" />
                {t('section_5_integration_title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{t('section_5_integration_1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{t('section_5_integration_2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{t('section_5_integration_3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{t('section_5_integration_4')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Section 6: Common Pitfalls */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_6_title')}</h2>

          <div className="space-y-4">
            <Alert className="border-amber-500/20 bg-amber-500/5">
              <Icons.AlertTriangle className="w-4 h-4 text-amber-600" />
              <AlertDescription>
                <strong>{t('section_6_pitfall_1_title')}</strong> {t('section_6_pitfall_1_desc')}
              </AlertDescription>
            </Alert>

            <Alert className="border-amber-500/20 bg-amber-500/5">
              <Icons.AlertTriangle className="w-4 h-4 text-amber-600" />
              <AlertDescription>
                <strong>{t('section_6_pitfall_2_title')}</strong> {t('section_6_pitfall_2_desc')}
              </AlertDescription>
            </Alert>

            <Alert className="border-amber-500/20 bg-amber-500/5">
              <Icons.AlertTriangle className="w-4 h-4 text-amber-600" />
              <AlertDescription>
                <strong>{t('section_6_pitfall_3_title')}</strong> {t('section_6_pitfall_3_desc')}
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Quiz Section */}
        <section>
          <ClaudeCodeBasicsQuiz />
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
              <Link href="/tutorials/ragas-evaluation" className={cn(buttonVariants())}>
                {t('next_ragas')}
              </Link>
              <Link href="/tutorials/spec-driven-development" className={cn(buttonVariants({ variant: "outline" }))}>
                {t('next_spec_driven')}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">{tCommon('keep_learning')}</p>
              <ul className="space-y-1">
                <li>• <a href="https://claude.ai/code" target="_blank" rel="noopener" className="text-primary hover:underline">{t('try_claude_code')}</a></li>
                <li>• <a href="https://docs.anthropic.com/claude/docs" target="_blank" rel="noopener" className="text-primary hover:underline">{t('read_docs')}</a></li>
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
          tutorialId="claude-code-basics"
          title={t('title')}
          duration={t('duration')}
          level="beginner"
          rewardPoints={50}
          rewardBadge={t('reward_badge') || 'Claude Code Master'}
          completed={false}
        />
      </aside>
    </div>
    </Container>
  )
}
