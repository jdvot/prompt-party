import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export async function generateMetadata() {
  const t = await getTranslations('tutorials.prompt_optimization')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function PromptOptimizationTutorial() {
  const t = await getTranslations('tutorials.prompt_optimization')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="prompt-optimization"
      level="intermediate"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_intermediate')}
      duration={t('duration')}
      objectives={[
        t('learn_reduce'),
        t('learn_faster'),
        t('learn_reliability'),
        t('learn_caching'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
    containerSize="xl"
    >
        <section className="w-full">
          <h2 className="text-3xl font-bold mb-4">{t('why_optimization')}</h2>

          <div className="grid md:grid-cols-3 gap-4 w-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.DollarSign className="w-5 h-5 text-green-500" />
                  {t('cost_savings')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('cost_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Zap className="w-5 h-5 text-yellow-500" />
                  {t('speed')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('speed_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Target className="w-5 h-5 text-blue-500" />
                  {t('reliability')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('reliability_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="w-full">
          <h2 className="text-3xl font-bold mb-4">{t('token_optimization')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('understanding_tokens')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t('tokens_intro')}
              </p>

              <Alert>
                <Icons.Info className="w-4 h-4" />
                <AlertDescription>
                  {t('tokens_alert')}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 w-full">
            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.XCircle className="w-5 h-5 text-red-600" />
                  {t('token_waste')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Please, if you would be so kind, could you perhaps take a moment to analyze this code and provide me with some detailed feedback about what might be wrong with it and how I could potentially improve it? I would really appreciate your help with this.`}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  {t('token_waste_example')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  {t('token_efficient')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Analyze this code and suggest improvements:`}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  {t('token_efficient_example')}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{t('token_saving_strategies')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icons.Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{t('strategy_redundant')}</strong>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t('strategy_redundant_example')}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{t('strategy_abbreviations')}</strong>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t('strategy_abbreviations_example')}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{t('strategy_output_length')}</strong>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t('strategy_output_length_example')}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{t('strategy_extract')}</strong>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t('strategy_extract_example')}
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="w-full">
          <h2 className="text-3xl font-bold mb-4">{t('prompt_caching')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('what_is_caching')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t('caching_intro')}
              </p>

              <Alert className="mb-4">
                <Icons.Lightbulb className="w-4 h-4" />
                <AlertDescription>
                  {t('caching_best_for')}
                </AlertDescription>
              </Alert>

              <CodeBlock
                language="javascript"
                code={`// Structure prompts to maximize caching
const systemContext = \`
You are a code reviewer for a React/TypeScript project.

Project guidelines:
- Use functional components
- Use TypeScript strict mode
- Follow ESLint rules
...
[LARGE STATIC CONTEXT]
\`;

// This stays the same and gets cached

const userQuery = "Review this component: [CODE]";
// Only this changes between requests`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('caching_best_practices')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>{t('caching_practice_1')}</li>
                <li>{t('caching_practice_2')}</li>
                <li>{t('caching_practice_3')}</li>
                <li>{t('caching_practice_4')}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="w-full">
          <h2 className="text-3xl font-bold mb-4">{t('response_optimization')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('control_output_length')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('be_specific_length')}</h4>
                <div className="grid md:grid-cols-2 gap-3 w-full">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('vague_example')}</p>
                    <CodeBlock language="text" code="Summarize this article." />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t('specific_example')}</p>
                    <CodeBlock language="text" code="Summarize in exactly 3 bullet points, 15 words each." />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('use_format_constraints')}</h4>
                <CodeBlock
                  language="text"
                  code={t('format_constraints_example')}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('request_concise')}</h4>
                <CodeBlock
                  language="text"
                  code={t('concise_tips')}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="w-full">
          <h2 className="text-3xl font-bold mb-4">{t('batch_processing')}</h2>

          <Card>
            <CardHeader>
              <CardTitle>{t('process_multiple')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4 w-full">
                <div>
                  <p className="text-sm font-semibold mb-2 text-red-600">{t('inefficient_label')}</p>
                  <CodeBlock
                    language="text"
                    code={`Translate "Hello" to French
Translate "Goodbye" to French
Translate "Please" to French
Translate "Thank you" to French
Translate "Sorry" to French`}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2 text-green-600">{t('efficient_label')}</p>
                  <CodeBlock
                    language="text"
                    code={`Translate to French:
1. Hello
2. Goodbye
3. Please
4. Thank you
5. Sorry

Return as: number. translation`}
                  />
                </div>
              </div>

              <Alert>
                <Icons.Zap className="w-4 h-4" />
                <AlertDescription>
                  {t('batching_alert')}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        <section className="w-full">
          <h2 className="text-3xl font-bold mb-4">{t('error_prevention')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('make_prompts_reliable')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('clear_output_format')}</h4>
                <CodeBlock
                  language="text"
                  code={`Bad: 'Analyze this data'

Good: 'Return as JSON: {analysis: string, confidence: 0-100, next_steps: string[]}'`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('handle_edge_cases')}</h4>
                <CodeBlock
                  language="text"
                  code={t('edge_case_example')}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('add_validation')}</h4>
                <CodeBlock
                  language="text"
                  code={t('validation_example')}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="w-full">
          <h2 className="text-3xl font-bold mb-4">{t('optimization_checklist')}</h2>

          <Card>
            <CardHeader>
              <CardTitle>{t('checklist_before_sending')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">{t('checklist_1')}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">{t('checklist_2')}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">{t('checklist_3')}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">{t('checklist_4')}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">{t('checklist_5')}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">{t('checklist_6')}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">{t('checklist_7')}</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5 text-primary" />
              {tCommon('next_steps')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 w-full">
              <Link href="/tutorials/multi-agent-systems" className={cn(buttonVariants())}>
                Multi-Agent Systems →
              </Link>
              <Link href="/tutorials/code-generation" className={cn(buttonVariants({ variant: "outline" }))}>
                AI Code Generation →
              </Link>
            </div>
          </CardContent>
        </Card>
  
    </TutorialLayout>
  )
}

