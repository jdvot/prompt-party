import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialLayout } from '@/components/tutorials/tutorial-layout'
import * as Icons from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { RagasEvaluationQuiz } from './quiz-section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.ragas_evaluation')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function RagasEvaluationTutorial() {
  const t = await getTranslations('tutorials.ragas_evaluation')
  const tCommon = await getTranslations('tutorials')

  return (
    <TutorialLayout
      tutorialId="ragas-evaluation"
      level="intermediate"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_intermediate')}
      duration={t('duration')}
      objectives={[
        t('learn_what_is'),
        t('learn_metrics'),
        t('learn_setup'),
        t('learn_evaluation'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
    containerSize="xl"
    >

        {/* Section 1: Why Evaluate Prompts */}
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
                  <Icons.Target className="w-5 h-5 text-blue-500" />
                  {t('section_1_benefit_1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_benefit_1_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.TrendingUp className="w-5 h-5 text-green-500" />
                  {t('section_1_benefit_2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_benefit_2_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.BarChart className="w-5 h-5 text-purple-500" />
                  {t('section_1_benefit_3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_benefit_3_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Shield className="w-5 h-5 text-orange-500" />
                  {t('section_1_benefit_4_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('section_1_benefit_4_desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          <Alert className="mt-6">
            <Icons.Info className="w-4 h-4" />
            <AlertDescription>
              <strong>{t('section_1_stat_title')}</strong> {t('section_1_stat_desc')}
            </AlertDescription>
          </Alert>
        </section>

        {/* Section 2: Ragas Metrics Deep Dive */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_2_title')}</h2>

          <div className="space-y-4">
            <Card className="border-violet-500/20 bg-violet-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-violet-600" />
                  {t('section_2_metric_1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{t('section_2_metric_1_desc')}</p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-mono">{t('section_2_metric_1_formula')}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">{t('example')}</p>
                  <CodeBlock
                    language="text"
                    code={t('section_2_metric_1_example')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Target className="w-5 h-5 text-blue-600" />
                  {t('section_2_metric_2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{t('section_2_metric_2_desc')}</p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-mono">{t('section_2_metric_2_formula')}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">{t('example')}</p>
                  <CodeBlock
                    language="text"
                    code={t('section_2_metric_2_example')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Crosshair className="w-5 h-5 text-green-600" />
                  {t('section_2_metric_3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{t('section_2_metric_3_desc')}</p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-mono">{t('section_2_metric_3_formula')}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Database className="w-5 h-5 text-amber-600" />
                  {t('section_2_metric_4_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{t('section_2_metric_4_desc')}</p>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-mono">{t('section_2_metric_4_formula')}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pink-500/20 bg-pink-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-pink-600" />
                  {t('section_2_metric_5_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{t('section_2_metric_5_desc')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Installation & Configuration */}
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
              <h3 className="text-xl font-semibold mb-3">{t('section_3_install_title')}</h3>
              <CodeBlock
                language="bash"
                code={`# Using npm
npm install ragas

# Using pnpm
pnpm add ragas

# Using yarn
yarn add ragas`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_3_config_title')}</h3>
              <p className="text-muted-foreground mb-3">{t('section_3_config_desc')}</p>
              <CodeBlock
                language="typescript"
                code={`import { Ragas } from 'ragas'

// Initialize with OpenAI
const ragas = new Ragas({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4'
})

// Or with Anthropic (Claude)
const ragas = new Ragas({
  provider: 'anthropic',
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-3-5-sonnet-20250929'
})

// Or with local models
const ragas = new Ragas({
  provider: 'ollama',
  baseURL: 'http://localhost:11434',
  model: 'llama2'
})`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_3_env_title')}</h3>
              <CodeBlock
                language="bash"
                code={`# .env.local
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Optional: Custom thresholds
RAGAS_FAITHFULNESS_THRESHOLD=0.8
RAGAS_RELEVANCY_THRESHOLD=0.85
RAGAS_PRECISION_THRESHOLD=0.75`}
              />
            </div>
          </div>
        </section>

        {/* Section 4: CLI Usage */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_4_title')}</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_4_evaluate_title')}</h3>
              <p className="text-muted-foreground mb-3">{t('section_4_evaluate_desc')}</p>
              <CodeBlock
                language="bash"
                code={`# Evaluate a single prompt
ragas evaluate \\
  --prompt "Summarize this article in 3 sentences" \\
  --context "article.txt" \\
  --response "response.txt" \\
  --ground-truth "expected.txt"

# Output:
# Faithfulness: 0.92
# Relevancy: 0.88
# Context Precision: 0.85
# Overall Score: 0.88`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_4_batch_title')}</h3>
              <p className="text-muted-foreground mb-3">{t('section_4_batch_desc')}</p>
              <CodeBlock
                language="bash"
                code={`# Create prompts.json
cat > prompts.json << EOF
[
  {
    "prompt": "Summarize this article",
    "context": "Long article text...",
    "response": "AI generated summary",
    "ground_truth": "Expected summary"
  },
  {
    "prompt": "Classify sentiment",
    "context": "Customer review text...",
    "response": "Positive",
    "ground_truth": "Positive"
  }
]
EOF

# Batch evaluate
ragas evaluate-batch \\
  --input prompts.json \\
  --output metrics.json \\
  --model gpt-4

# View results
cat metrics.json`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('section_4_report_title')}</h3>
              <CodeBlock
                language="bash"
                code={`# Generate detailed report
ragas report \\
  --input metrics.json \\
  --output report.html \\
  --format html

# Or as Markdown
ragas report \\
  --input metrics.json \\
  --output report.md \\
  --format markdown

# Or as JSON for dashboards
ragas report \\
  --input metrics.json \\
  --output report.json \\
  --format json`}
              />
            </div>
          </div>
        </section>

        {/* Section 5: Code Integration */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_5_title')}</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('section_5_basic_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="typescript"
                  code={`import { Ragas, Metrics } from 'ragas'

async function evaluatePrompt() {
  const ragas = new Ragas({
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY
  })

  const result = await ragas.evaluate({
    prompt: "Explain quantum computing in simple terms",
    context: "Quantum computing documentation...",
    response: "Quantum computing uses quantum bits...",
    metrics: [
      Metrics.FAITHFULNESS,
      Metrics.RELEVANCY,
      Metrics.SEMANTIC_SIMILARITY
    ]
  })

  console.log('Scores:', result.scores)
  console.log('Overall:', result.overall)
  console.log('Passed:', result.passed)

  return result
}`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('section_5_api_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="typescript"
                  code={`// app/api/evaluate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Ragas } from 'ragas'

export async function POST(req: NextRequest) {
  try {
    const { prompt, response, context } = await req.json()

    const ragas = new Ragas({
      provider: 'anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY
    })

    const evaluation = await ragas.evaluate({
      prompt,
      response,
      context,
      metrics: ['faithfulness', 'relevancy']
    })

    return NextResponse.json({
      success: true,
      scores: evaluation.scores,
      passed: evaluation.overall > 0.8
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Evaluation failed' },
      { status: 500 }
    )
  }
}`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('section_5_cicd_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="yaml"
                  code={`# .github/workflows/prompt-quality.yml
name: Prompt Quality Check

on:
  pull_request:
    paths:
      - 'prompts/**'

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install Ragas
        run: npm install -g ragas

      - name: Evaluate Prompts
        env:
          OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
        run: |
          ragas evaluate-batch \\
            --input prompts/test-suite.json \\
            --output results.json \\
            --threshold 0.8

      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: evaluation-results
          path: results.json`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Real-world Examples */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_6_title')}</h2>

          <div className="space-y-4">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.FileText className="w-5 h-5 text-blue-600" />
                  {t('section_6_example_1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('section_6_example_1_desc')}</p>
                <CodeBlock
                  language="typescript"
                  code={`const result = await ragas.evaluate({
  prompt: "Summarize the key findings from the research paper",
  context: researchPaperText,
  response: aiGeneratedSummary,
  metrics: ['faithfulness', 'relevancy', 'context_precision']
})

// Expected: Faithfulness > 0.9 (accurate facts)
// Expected: Relevancy > 0.85 (focused summary)
// Expected: Context Precision > 0.8 (important details)`}
                />
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Tags className="w-5 h-5 text-green-600" />
                  {t('section_6_example_2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('section_6_example_2_desc')}</p>
                <CodeBlock
                  language="typescript"
                  code={`const result = await ragas.evaluate({
  prompt: "Classify this customer review as Positive, Negative, or Neutral",
  context: customerReview,
  response: classificationResult,
  ground_truth: humanLabel,
  metrics: ['semantic_similarity', 'relevancy']
})

// Expected: Semantic Similarity > 0.95 (exact match)
// Expected: Relevancy > 0.9 (correct classification)`}
                />
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-purple-600" />
                  {t('section_6_example_3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('section_6_example_3_desc')}</p>
                <CodeBlock
                  language="typescript"
                  code={`const result = await ragas.evaluate({
  prompt: "Write a creative story about a space explorer",
  response: generatedStory,
  metrics: ['relevancy', 'faithfulness']
})

// Expected: Relevancy > 0.85 (matches theme)
// Expected: Faithfulness > 0.7 (coherent narrative)`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 7: Advanced Techniques */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('section_7_title')}</h2>

          <div className="space-y-4">
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg">{t('section_7_custom_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="typescript"
                  code={`import { Ragas, CustomMetric } from 'ragas'

// Define custom metric
const brandToneMetric = new CustomMetric({
  name: 'brand_tone_consistency',
  description: 'Measures consistency with brand voice',
  evaluator: async (prompt, response, context) => {
    // Custom evaluation logic
    const brandKeywords = ['innovative', 'reliable', 'customer-first']
    const matchCount = brandKeywords.filter(kw =>
      response.toLowerCase().includes(kw)
    ).length

    return matchCount / brandKeywords.length
  },
  threshold: 0.7
})

// Use custom metric
const result = await ragas.evaluate({
  prompt,
  response,
  metrics: [
    'faithfulness',
    'relevancy',
    brandToneMetric
  ]
})`}
                />
              </CardContent>
            </Card>

            <Card className="border-indigo-500/20 bg-indigo-500/5">
              <CardHeader>
                <CardTitle className="text-lg">{t('section_7_threshold_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="typescript"
                  code={`const ragas = new Ragas({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  thresholds: {
    faithfulness: 0.9,      // Critical: Must be very accurate
    relevancy: 0.85,         // Important: Should be on-topic
    context_precision: 0.75, // Moderate: Some flexibility
    context_recall: 0.7      // Lower: Nice to have
  }
})

const result = await ragas.evaluate({...})

if (!result.passed) {
  console.log('Failed metrics:', result.failures)
  // Take action: retry, flag for review, etc.
}`}
                />
              </CardContent>
            </Card>

            <Card className="border-rose-500/20 bg-rose-500/5">
              <CardHeader>
                <CardTitle className="text-lg">{t('section_7_monitoring_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="typescript"
                  code={`import { Ragas } from 'ragas'
import { sendToDatadog, sendToNewRelic } from './monitoring'

const ragas = new Ragas({
  provider: 'anthropic',
  apiKey: process.env.ANTHROPIC_API_KEY,
  onEvaluate: async (result) => {
    // Log to monitoring service
    await sendToDatadog({
      metric: 'prompt.evaluation',
      value: result.overall,
      tags: ['service:prompts', 'env:production']
    })

    // Alert on low scores
    if (result.overall < 0.7) {
      await sendToNewRelic({
        eventType: 'PromptQualityAlert',
        score: result.overall,
        prompt: result.prompt
      })
    }
  }
})`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quiz Section */}
        <section>
          <RagasEvaluationQuiz />
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
              <Link href="/tutorials/spec-driven-development" className={cn(buttonVariants({ variant: "outline" }))}>
                {t('next_spec_driven')}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">{tCommon('keep_learning')}</p>
              <ul className="space-y-1">
                <li>• <a href="https://docs.ragas.io" target="_blank" rel="noopener" className="text-primary hover:underline">{t('read_ragas_docs')}</a></li>
                <li>• <a href="https://github.com/explodinggradients/ragas" target="_blank" rel="noopener" className="text-primary hover:underline">{t('github_repo')}</a></li>
                <li>• <Link href="/prompts" className="text-primary hover:underline">{t('browse_community')}</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>

    </TutorialLayout>
  )
}
