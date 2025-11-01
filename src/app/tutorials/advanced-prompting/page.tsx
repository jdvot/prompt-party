import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-yellow-500">{t('badge_intermediate')}</Badge>
          <Badge variant="outline">{t('duration')}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

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
              <span>{t('learn_cot')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_few_shot')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_role')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_meta')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-8">
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
                  Without CoT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code="What's 15% of $87.50?"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  Direct answer without explanation. Harder to verify or learn from.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  With CoT
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
                  Clear reasoning process. Easy to verify and understand.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">2. Few-Shot Learning</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              Provide examples of the desired input-output pattern to guide the AI's responses.
            </p>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Few-Shot Pattern</CardTitle>
              <CardDescription>Show 2-3 examples before your actual request</CardDescription>
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
              <strong>{tCommon('pro_tip')}:</strong> 2-5 examples usually work best. Too few and the pattern isn't clear. Too many and you waste tokens!
            </AlertDescription>
          </Alert>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">3. Role-Based Prompting</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              Assign a specific role or persona to the AI to get responses aligned with that perspective and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Role Pattern</CardTitle>
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
                <CardTitle className="text-lg">Example Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Senior software architect</li>
                  <li>• Marketing strategist</li>
                  <li>• Technical writer</li>
                  <li>• UX researcher</li>
                  <li>• Financial analyst</li>
                  <li>• Customer support expert</li>
                  <li>• Product manager</li>
                  <li>• Data scientist</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Real Example</CardTitle>
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
          <h2 className="text-3xl font-bold mb-4">4. Meta-Prompting</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              Ask the AI to help you create or improve prompts. The AI becomes your prompting assistant!
            </p>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Meta-Prompting Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Prompt Improvement</h4>
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
                <h4 className="font-semibold mb-2">Prompt Generation</h4>
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
          <h2 className="text-3xl font-bold mb-4">5. Iterative Refinement</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>The Refinement Loop</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Start with basic prompt</h4>
                    <p className="text-sm text-muted-foreground">Get initial response</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Identify what's missing or wrong</h4>
                    <p className="text-sm text-muted-foreground">Analyze the output</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Add specific refinements</h4>
                    <p className="text-sm text-muted-foreground">"This is good, but could you also..."</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Iterate until satisfied</h4>
                    <p className="text-sm text-muted-foreground">Refine 2-3 times for best results</p>
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
          <h2 className="text-3xl font-bold mb-4">6. Constraint-Based Prompting</h2>

          <Card>
            <CardHeader>
              <CardTitle>Using Constraints Creatively</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Constraints can paradoxically improve creativity and output quality:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Length Constraints</h4>
                  <CodeBlock
                    language="text"
                    code="Explain quantum computing in exactly 3 sentences, each under 20 words."
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Format Constraints</h4>
                  <CodeBlock
                    language="text"
                    code="Summarize this article as: 1 headline, 3 bullet points, 1 call-to-action. Use emoji for each bullet."
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Style Constraints</h4>
                  <CodeBlock
                    language="text"
                    code="Write this technical documentation using only words a 10-year-old would understand. No jargon."
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Perspective Constraints</h4>
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
          <Card className="bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.BookOpen className="w-5 h-5 text-primary" />
                Practice Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Combine at least 3 techniques from this tutorial to create a prompt for:</p>

              <div className="bg-background/50 p-4 rounded-lg border">
                <p className="font-semibold mb-2">Task:</p>
                <p className="text-muted-foreground">
                  Create a product description for a new smartphone that appeals to both tech enthusiasts and casual users.
                </p>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Hint: Try combining role-based prompting + few-shot examples + constraints!
              </p>
            </CardContent>
          </Card>
        </section>

        <Card className="bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border-violet-600/20">
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
      </div>
    </div>
  )
}
