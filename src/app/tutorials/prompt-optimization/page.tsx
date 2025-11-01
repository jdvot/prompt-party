import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { Container } from '@/components/layout/container'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

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
    <Container size="lg" className="py-8">
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <Icons.ArrowLeft className="w-4 h-4 mr-2" />
        {tCommon('back_to_tutorials')}
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-yellow-500">Intermediate</Badge>
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
              <span>{t('learn_reduce')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_faster')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_reliability')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_caching')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('why_optimization')}</h2>

          <div className="grid md:grid-cols-3 gap-4">
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
                  Reliability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clearer, optimized prompts produce more consistent results.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">1. Token Optimization</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Understanding Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Tokens are pieces of words. On average: 1 token ≈ 4 characters or ¾ of a word.
              </p>

              <Alert>
                <Icons.Info className="w-4 h-4" />
                <AlertDescription>
                  Both your prompt AND the response count toward token usage and cost!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.XCircle className="w-5 h-5 text-red-600" />
                  Token Waste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Please, if you would be so kind, could you perhaps take a moment to analyze this code and provide me with some detailed feedback about what might be wrong with it and how I could potentially improve it? I would really appreciate your help with this.`}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  ~45 tokens of fluff before getting to the point
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  Token Efficient
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="text"
                  code={`Analyze this code and suggest improvements:`}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  ~7 tokens. Same meaning, 85% fewer tokens!
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Token Saving Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icons.Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Remove redundant words:</strong>
                    <div className="text-sm text-muted-foreground mt-1">
                      "Please help me" → "Help:" or just start with the request
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Use abbreviations where clear:</strong>
                    <div className="text-sm text-muted-foreground mt-1">
                      "JavaScript" → "JS", "maximum" → "max"
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Specify output length:</strong>
                    <div className="text-sm text-muted-foreground mt-1">
                      "Summarize in 3 sentences" prevents unnecessarily long responses
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Icons.Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Extract only what you need:</strong>
                    <div className="text-sm text-muted-foreground mt-1">
                      Instead of "Analyze this document", ask "Extract the 5 main action items from this document"
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">2. Prompt Caching</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>What is Prompt Caching?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Claude can cache parts of your prompt that don't change, reducing costs by ~90% for cached content and speeding up responses.
              </p>

              <Alert className="mb-4">
                <Icons.Lightbulb className="w-4 h-4" />
                <AlertDescription>
                  <strong>Best for:</strong> Large context (docs, codebases) that you query multiple times
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
              <CardTitle>Caching Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Put static content (docs, guidelines) at the start</li>
                <li>✓ Variable content (queries, data) at the end</li>
                <li>✓ Use caching for documents you reference repeatedly</li>
                <li>✓ Cache expires after 5 minutes of inactivity</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">3. Response Optimization</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Control Output Length</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Be Specific About Length</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Vague:</p>
                    <CodeBlock language="text" code="Summarize this article." />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Specific:</p>
                    <CodeBlock language="text" code="Summarize in exactly 3 bullet points, 15 words each." />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Use Format Constraints</h4>
                <CodeBlock
                  language="text"
                  code={`Instead of: "List the main points"

Use: "Create a markdown table with 2 columns: Point, Impact. Max 5 rows."`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Request Concise Explanations</h4>
                <CodeBlock
                  language="text"
                  code={`Add to prompts:
"Be concise. One sentence per point."
"Use bullet points, not paragraphs."
"Explain like I'm 5."`}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">4. Batch Processing</h2>

          <Card>
            <CardHeader>
              <CardTitle>Process Multiple Items at Once</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold mb-2 text-red-600">❌ Inefficient (5 separate requests):</p>
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
                  <p className="text-sm font-semibold mb-2 text-green-600">✅ Efficient (1 request):</p>
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
                  Batching can reduce costs by 80%+ and dramatically speed up processing!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">5. Error Prevention</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Make Prompts More Reliable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Clear Output Format</h4>
                <CodeBlock
                  language="text"
                  code={`Bad: "Give me the data"

Good: "Return as JSON with fields: name, age, role"`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Handle Edge Cases</h4>
                <CodeBlock
                  language="text"
                  code={`Analyze the sentiment of this review.

If the review is empty or unclear, respond with: "INSUFFICIENT_DATA"
Otherwise, respond with: POSITIVE, NEGATIVE, or NEUTRAL`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Add Validation Instructions</h4>
                <CodeBlock
                  language="text"
                  code={`Extract email addresses from this text.

Validate that each email:
- Contains @ symbol
- Has a domain name
- Follows standard format

Return only valid emails, one per line.`}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Optimization Checklist</h2>

          <Card>
            <CardHeader>
              <CardTitle>Before Sending Your Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">Remove unnecessary pleasantries and filler words</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">Specify exact output format and length</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">Put static content first (for caching)</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">Batch similar requests together</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">Include error handling instructions</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">Use clear, unambiguous language</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">Test with edge cases</span>
                </label>
              </div>
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
              <Link href="/tutorials/multi-agent-systems" className={cn(buttonVariants())}>
                Multi-Agent Systems →
              </Link>
              <Link href="/tutorials/code-generation" className={cn(buttonVariants({ variant: "outline" }))}>
                AI Code Generation →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
