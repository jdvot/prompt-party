import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import { BookOpen, Lightbulb, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IntroPromptsQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.intro_prompts')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function IntroPromptsTutorial() {
  const t = await getTranslations('tutorials.intro_prompts')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="intro-prompts"
      level="beginner"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_beginner')}
      duration={t('duration')}
      objectives={[
        t('learn_what_is'),
        t('learn_anatomy'),
        t('learn_mistakes'),
        t('learn_examples'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
      containerSize="xl"
    >
        {/* Section 1: What is a Prompt? */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('what_is_prompt_title')}</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg">
              {t.rich('what_is_prompt_intro', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Card className="border-red-600/20 bg-red-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  {t('vague_prompt')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={t('vague_example')}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  {t('vague_description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-600/20 bg-green-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {t('specific_prompt')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={t('specific_example')}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  {t('specific_description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: The Anatomy of a Good Prompt */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('anatomy_title')}</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('anatomy_subtitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  1️⃣ {t('element_context')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('element_context_desc')}
                </p>
                <CodeBlock
                  language="text"
                  code={t('element_context_example')}
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  2️⃣ {t('element_task')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('element_task_desc')}
                </p>
                <CodeBlock
                  language="text"
                  code={t('element_task_example')}
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  3️⃣ {t('element_constraints')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('element_constraints_desc')}
                </p>
                <CodeBlock
                  language="text"
                  code={t('element_constraints_example')}
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  4️⃣ {t('element_format')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('element_format_desc')}
                </p>
                <CodeBlock
                  language="text"
                  code={t('element_format_example')}
                />
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Lightbulb className="w-4 h-4" />
            <AlertDescription>
              {t.rich('pro_tip', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </AlertDescription>
          </Alert>
        </section>

        {/* Section 3: Common Mistakes */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('mistakes_title')}</h2>

          <div className="space-y-4">
            <Card className="border-red-600/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  {t('mistake1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-red-600 font-medium mb-2">❌ {t('bad_label')}</p>
                  <CodeBlock language="text" code={t('mistake1_bad')} />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium mb-2">✅ {t('good_label')}</p>
                  <CodeBlock
                    language="text"
                    code={t('mistake1_good')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-600/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  {t('mistake2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-red-600 font-medium mb-2">❌ {t('bad_label')}</p>
                  <CodeBlock language="text" code={t('mistake2_bad')} />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium mb-2">✅ {t('good_label')}</p>
                  <CodeBlock
                    language="text"
                    code={t('mistake2_good')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-600/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  {t('mistake3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-red-600 font-medium mb-2">❌ {t('bad_label')}</p>
                  <CodeBlock
                    language="text"
                    code={t('mistake3_bad')}
                  />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium mb-2">✅ {t('good_label')}</p>
                  <CodeBlock
                    language="text"
                    code={t('mistake3_good')}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('mistake3_note')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: Practical Templates */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('templates_title')}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('template_writing_title')}</CardTitle>
                <CardDescription>{t('template_writing_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={t('template_writing_code')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('template_code_title')}</CardTitle>
                <CardDescription>{t('template_code_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={t('template_code_code')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('template_analysis_title')}</CardTitle>
                <CardDescription>{t('template_analysis_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={t('template_analysis_code')}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('template_learning_title')}</CardTitle>
                <CardDescription>{t('template_learning_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={t('template_learning_code')}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 5: Practice Exercise */}
        <section>
          <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                {tCommon('practice_exercise')}
              </CardTitle>
              <CardDescription>{t('exercise_subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">{t('exercise1_title')}</h4>
                <CodeBlock language="text" code={t('exercise1_prompt')} />
                <p className="text-sm text-muted-foreground">
                  💭 {t('exercise1_hint')}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">{t('exercise2_title')}</h4>
                <CodeBlock language="text" code={t('exercise2_prompt')} />
                <p className="text-sm text-muted-foreground">
                  💭 {t('exercise2_hint')}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">{t('exercise3_title')}</h4>
                <CodeBlock
                  language="text"
                  code={t('exercise3_prompt')}
                />
                <p className="text-sm text-muted-foreground">
                  💭 {t('exercise3_hint')}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quiz Section */}
        <section>
          <IntroPromptsQuiz />
        </section>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              {tCommon('next_steps')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tutorials/claude-basics" className={cn(buttonVariants())}>
                {t('next_claude')}
              </Link>
              <Link href="/tutorials/advanced-prompting" className={cn(buttonVariants({ variant: "outline" }))}>
                {t('next_advanced')}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">{tCommon('keep_learning')}</p>
              <ul className="space-y-1">
                <li>• {t.rich('keep_learning_prompts', {
                  link: (chunks) => <Link href="/prompts" className="text-primary hover:underline">{chunks}</Link>
                })}</li>
                <li>• {t.rich('keep_learning_wizard', {
                  link: (chunks) => <Link href="/prompts/wizard" className="text-primary hover:underline">{chunks}</Link>
                })}</li>
                <li>• {t.rich('keep_learning_challenges', {
                  link: (chunks) => <Link href="/challenges" className="text-primary hover:underline">{chunks}</Link>
                })}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
    </TutorialLayout>
  )
}
