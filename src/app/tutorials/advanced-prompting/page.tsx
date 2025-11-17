import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { AdvancedPromptingQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.advanced_prompting')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function AdvancedPromptingTutorial() {
  const t = await getTranslations('tutorials.advanced_prompting')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="advanced-prompting"
      level="intermediate"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_intermediate')}
      duration={t('duration')}
      objectives={[
        t('learn_cot'),
        t('learn_few_shot'),
        t('learn_role'),
        t('learn_meta'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
    containerSize="xl"
    >
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('cot_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('cot_intro')}
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{t('cot_pattern')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`Solve this problem step by step:

Problem: [YOUR PROBLEM]

Let's approach this systematically:
1. First, identify...
2. Then, analyze...
3. Finally, conclude...

Show your reasoning for each step.`}
              />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.XCircle className="w-5 h-5 text-red-600" />
                  {t('without_cot')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code="What's 15% of $87.50?"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  {t('without_cot_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  {t('with_cot')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Calculate 15% of $87.50. Show your work step by step:
1. Convert percentage to decimal
2. Multiply by the amount
3. Round to 2 decimal places
4. Show final answer`}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  {t('with_cot_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('few_shot_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('few_shot_intro')}
            </p>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('few_shot_pattern')}</CardTitle>
              <CardDescription>{t('few_shot_pattern_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`Convert the following sentences to [TARGET STYLE].

Example 1:
Input: "The product is very good."
Output: "This product rocks! 🔥"

Example 2:
Input: "I recommend this service."
Output: "Totally loving this service! Highly recommend! ⭐"

Example 3:
Input: "It works well for my needs."
Output: "Perfect fit for what I need! 💯"

Now convert this:
Input: "The customer support was helpful."
Output:`}
              />
            </CardContent>
          </Card>

          <Alert>
            <Icons.Lightbulb className="w-4 h-4" />
            <AlertDescription>
              <strong>{tCommon('pro_tip')}:</strong> {t('few_shot_tip')}
            </AlertDescription>
          </Alert>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('role_prompting_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('role_prompting_intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('role_pattern')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`You are a [ROLE] with [EXPERIENCE/EXPERTISE].

Your goal is to [OBJECTIVE].

Context: [SITUATION]

Please [TASK] keeping in mind:
- [CONSTRAINT 1]
- [CONSTRAINT 2]

Respond as this role would.`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('example_roles')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>{t('role_example_1')}</li>
                  <li>{t('role_example_2')}</li>
                  <li>{t('role_example_3')}</li>
                  <li>{t('role_example_4')}</li>
                  <li>{t('role_example_5')}</li>
                  <li>{t('role_example_6')}</li>
                  <li>{t('role_example_7')}</li>
                  <li>{t('role_example_8')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{t('real_example')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="text"
                code={`You are a senior UX researcher with 10 years of experience in e-commerce.

Review this checkout flow and provide insights on improving conversion rates:

[CHECKOUT FLOW DESCRIPTION]

Consider:
- Friction points
- Trust signals
- Mobile usability
- Accessibility

Provide 5 specific, actionable recommendations.`}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('meta_prompting_title')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('meta_prompting_intro')}
            </p>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('meta_prompting_techniques')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('prompt_improvement')}</h4>
                <CodeBlock
                  language="text"
                  code={`I want to create a prompt for [PURPOSE].

Here's my initial attempt:
"[YOUR CURRENT PROMPT]"

Please suggest improvements to make it:
- More specific
- Better structured
- More likely to get the results I want

Provide the improved version.`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('prompt_generation')}</h4>
                <CodeBlock
                  language="text"
                  code={`Help me create an effective prompt for this task:

Task: [DESCRIBE WHAT YOU WANT TO ACHIEVE]
Context: [RELEVANT BACKGROUND]
Constraints: [ANY LIMITATIONS]
Desired Output: [WHAT YOU WANT TO GET]

Generate an optimized prompt I can use.`}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('iterative_refinement_title')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('refinement_loop')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('refinement_step_1')}</h4>
                    <p className="text-sm text-muted-foreground">{t('refinement_step_1_desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('refinement_step_2')}</h4>
                    <p className="text-sm text-muted-foreground">{t('refinement_step_2_desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('refinement_step_3')}</h4>
                    <p className="text-sm text-muted-foreground">{t('refinement_step_3_desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t('refinement_step_4')}</h4>
                    <p className="text-sm text-muted-foreground">{t('refinement_step_4_desc')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <CodeBlock
            language="text"
            code={`[Initial response from AI]

This is helpful! Can you refine it by:
1. Adding more specific examples
2. Making the tone more [FORMAL/CASUAL]
3. Including [MISSING ASPECT]
4. Removing [UNWANTED PART]`}
          />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('constraint_prompting_title')}</h2>

          <Card>
            <CardHeader>
              <CardTitle>{t('using_constraints')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t('constraints_intro')}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('length_constraints')}</h4>
                  <CodeBlock
                    language="text"
                    code="Explain quantum computing in exactly 3 sentences, each under 20 words."
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('format_constraints')}</h4>
                  <CodeBlock
                    language="text"
                    code="Summarize this article as: 1 headline, 3 bullet points, 1 call-to-action. Use emoji for each bullet."
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('style_constraints')}</h4>
                  <CodeBlock
                    language="text"
                    code="Write this technical documentation using only words a 10-year-old would understand. No jargon."
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('perspective_constraints')}</h4>
                  <CodeBlock
                    language="text"
                    code="Analyze this product from 3 different perspectives: a developer, a marketer, and an end user."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.BookOpen className="w-5 h-5 text-primary" />
                {t('practice_challenge')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{t('practice_intro')}</p>

              <div className="bg-background/50 p-4 rounded-lg border">
                <p className="font-semibold mb-2">{t('practice_task_label')}</p>
                <p className="text-muted-foreground">
                  {t('practice_task')}
                </p>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                {t('practice_hint')}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Quiz Section */}
        <section>
          <AdvancedPromptingQuiz />
        </section>

        <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5 text-primary" />
              {tCommon('next_steps')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tutorials/claude-agents" className={cn(buttonVariants())}>
                Building Claude Agents →
              </Link>
              <Link href="/tutorials/prompt-optimization" className={cn(buttonVariants({ variant: "outline" }))}>
                Prompt Optimization →
              </Link>
            </div>
          </CardContent>
        </Card>

    </TutorialLayout>
  )
}

