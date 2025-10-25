import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CodeBlock } from '@/components/tutorials/code-block'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('tutorials.multi_agent_systems')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function MultiAgentSystemsTutorial() {
  const t = await getTranslations('tutorials.multi_agent_systems')
  const tCommon = await getTranslations('tutorials')
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/tutorials">
          <Icons.ArrowLeft className="w-4 h-4 mr-2" />
          {tCommon('back_to_tutorials')}
        </Link>
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-red-500">Advanced</Badge>
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
              <span>{t('learn_architecture')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_communication')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_workflows')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_examples')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('what_are')}</h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
            <p className="text-lg">
              {t('intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.User className="w-5 h-5 text-blue-500" />
                  {t('single_agent')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{t('single_desc')}</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('single_1')}</li>
                  <li>• {t('single_2')}</li>
                  <li>• {t('single_3')}</li>
                  <li>• {t('single_4')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.Users className="w-5 h-5 text-primary" />
                  {t('multi_agent')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Specialized agents collaborate:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Each agent has expertise</li>
                  <li>• Better quality results</li>
                  <li>• Simpler individual prompts</li>
                  <li>• Highly scalable</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Common Multi-Agent Patterns</h2>

          <div className="space-y-6">
            {/* Pattern 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.ArrowRight className="w-5 h-5 text-blue-500" />
                  1. Sequential Pipeline
                </CardTitle>
                <CardDescription>Agents work in a linear sequence, each processing the previous agent's output</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                  <div className="px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded whitespace-nowrap">Agent 1: Research</div>
                  <Icons.ArrowRight className="w-4 h-4 flex-shrink-0" />
                  <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded whitespace-nowrap">Agent 2: Analyze</div>
                  <Icons.ArrowRight className="w-4 h-4 flex-shrink-0" />
                  <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded whitespace-nowrap">Agent 3: Summarize</div>
                </div>

                <CodeBlock
                  language="javascript"
                  code={`// Example: Content creation pipeline
const researcher = await claude.messages.create({
  model: "claude-3-5-sonnet-20241022",
  messages: [{
    role: "user",
    content: "Research recent trends in AI for Q4 2024"
  }]
});

const analyst = await claude.messages.create({
  model: "claude-3-5-sonnet-20241022",
  messages: [{
    role: "user",
    content: \`Analyze these trends and identify top 5:

\${researcher.content[0].text}\`
  }]
});

const writer = await claude.messages.create({
  model: "claude-3-5-sonnet-20241022",
  messages: [{
    role: "user",
    content: \`Write a blog post about these trends:

\${analyst.content[0].text}\`
  }]
});`}
                />
              </CardContent>
            </Card>

            {/* Pattern 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.GitBranch className="w-5 h-5 text-green-500" />
                  2. Parallel Processing
                </CardTitle>
                <CardDescription>Multiple agents work simultaneously, then results are combined</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded">Input Task</div>
                    <Icons.ArrowDown className="w-4 h-4" />
                    <div className="flex gap-4">
                      <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded text-sm">Agent A</div>
                      <div className="px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-sm">Agent B</div>
                      <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded text-sm">Agent C</div>
                    </div>
                    <Icons.ArrowDown className="w-4 h-4" />
                    <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded">Combine Results</div>
                  </div>
                </div>

                <CodeBlock
                  language="javascript"
                  code={`// Example: Multi-perspective analysis
const [technical, business, ux] = await Promise.all([
  // Technical perspective
  claude.messages.create({
    messages: [{
      role: "user",
      content: "As a senior engineer, analyze this feature from a technical perspective..."
    }]
  }),

  // Business perspective
  claude.messages.create({
    messages: [{
      role: "user",
      content: "As a product manager, analyze this feature from a business perspective..."
    }]
  }),

  // UX perspective
  claude.messages.create({
    messages: [{
      role: "user",
      content: "As a UX designer, analyze this feature from a user perspective..."
    }]
  })
]);

// Combine insights
const synthesis = await claude.messages.create({
  messages: [{
    role: "user",
    content: \`Synthesize these perspectives into recommendations:

Technical: \${technical.content[0].text}
Business: \${business.content[0].text}
UX: \${ux.content[0].text}\`
  }]
});`}
                />
              </CardContent>
            </Card>

            {/* Pattern 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.RefreshCw className="w-5 h-5 text-purple-500" />
                  3. Iterative Refinement
                </CardTitle>
                <CardDescription>Agents critique and improve each other's work in cycles</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="javascript"
                  code={`// Example: Code review system
let code = initialCode;
let iterations = 0;
const maxIterations = 3;

while (iterations < maxIterations) {
  // Writer agent generates/improves code
  const writer = await claude.messages.create({
    messages: [{
      role: "user",
      content: \`Improve this code:

\${code}

Focus on: clarity, performance, best practices\`
    }]
  });

  code = extractCode(writer.content[0].text);

  // Reviewer agent checks quality
  const reviewer = await claude.messages.create({
    messages: [{
      role: "user",
      content: \`Review this code and rate 1-10:

\${code}

If <8, suggest specific improvements. If ≥8, approve.\`
    }]
  });

  const rating = extractRating(reviewer.content[0].text);

  if (rating >= 8) break;

  iterations++;
}

console.log("Final code:", code);`}
                />
              </CardContent>
            </Card>

            {/* Pattern 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Network className="w-5 h-5 text-orange-500" />
                  4. Hierarchical Orchestration
                </CardTitle>
                <CardDescription>A coordinator agent manages and delegates to specialized workers</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="javascript"
                  code={`// Example: Research project coordinator
async function runResearchProject(topic) {
  // Coordinator plans the work
  const coordinator = await claude.messages.create({
    messages: [{
      role: "user",
      content: \`Break down this research project into subtasks:

Topic: \${topic}

Return as JSON array of tasks with: {id, description, agent_type}\`
    }]
  });

  const tasks = JSON.parse(coordinator.content[0].text);

  // Delegate to specialized workers
  const results = await Promise.all(
    tasks.map(task => {
      switch(task.agent_type) {
        case "researcher":
          return researchAgent(task);
        case "analyst":
          return analystAgent(task);
        case "writer":
          return writerAgent(task);
      }
    })
  );

  // Coordinator synthesizes
  const final = await claude.messages.create({
    messages: [{
      role: "user",
      content: \`Synthesize these research findings into a report:

\${JSON.stringify(results)}\`
    }]
  });

  return final.content[0].text;
}`}
              />
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Agent Communication</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Designing Agent Interfaces</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Structured Output</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Make agents output in predictable formats:
                </p>
                <CodeBlock
                  language="text"
                  code={`Agent prompt: "Return results as JSON with fields: summary, confidence, next_steps"`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Clear Handoffs</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Explicitly state what the next agent needs:
                </p>
                <CodeBlock
                  language="javascript"
                  code={`const handoff = {
  from: "researcher",
  to: "analyst",
  data: researchFindings,
  instructions: "Focus on identifying patterns and anomalies"
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Shared Context</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Maintain conversation history for continuity:
                </p>
                <CodeBlock
                  language="javascript"
                  code={`const sharedContext = {
  project_goal: "...",
  previous_findings: [...],
  current_phase: "analysis"
};

// Include in each agent's prompt
const prompt = \`
Context: \${JSON.stringify(sharedContext)}

Your task: ...
\`;`}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                  Do This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>✓ Give each agent a clear, specific role</li>
                  <li>✓ Use structured data formats (JSON, YAML)</li>
                  <li>✓ Add error handling and retries</li>
                  <li>✓ Log all agent interactions</li>
                  <li>✓ Set timeouts for each agent</li>
                  <li>✓ Test agents individually first</li>
                  <li>✓ Monitor token usage</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icons.XCircle className="w-5 h-5 text-red-600" />
                  Avoid This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>✗ Overlapping responsibilities</li>
                  <li>✗ Circular dependencies between agents</li>
                  <li>✗ Too many agents (diminishing returns)</li>
                  <li>✗ Unclear data formats</li>
                  <li>✗ No fallback mechanisms</li>
                  <li>✗ Ignoring failures silently</li>
                  <li>✗ Excessive nesting (&gt;3 levels)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Card className="bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.BookOpen className="w-5 h-5 text-primary" />
                Real-World Example: Content Generation System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                A complete multi-agent system for creating high-quality blog posts:
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <strong>Researcher Agent:</strong> Gathers information on the topic
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <strong>Outliner Agent:</strong> Creates a structured outline
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <strong>Writer Agent:</strong> Writes engaging content
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-orange-600">4</span>
                  </div>
                  <div>
                    <strong>Editor Agent:</strong> Reviews and improves the draft
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-pink-600">5</span>
                  </div>
                  <div>
                    <strong>SEO Agent:</strong> Optimizes for search engines
                  </div>
                </div>
              </div>

              <Alert className="mt-4">
                <Icons.Rocket className="w-4 h-4" />
                <AlertDescription>
                  Result: High-quality content in 1-2 minutes that would take a human 2-3 hours!
                </AlertDescription>
              </Alert>
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
              <Button asChild>
                <Link href="/tutorials/code-generation">
                  AI Code Generation →
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/tutorials/claude-agents">
                  Review: Building Claude Agents →
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
