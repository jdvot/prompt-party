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

export async function generateMetadata(): Promise<Metadata> {
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
    <TutorialLayout
      tutorialId="multi-agent-systems"
      level="expert"
      title={t('title')}
      subtitle={t('subtitle')}
      badge={t('badge_expert')}
      duration={t('duration')}
      objectives={[
        t('learn_architecture'),
        t('learn_communication'),
        t('learn_coordination'),
        t('learn_applications'),
      ]}
      rewardBadge={t('reward_badge')}
      whatYouLearnTitle={tCommon('what_you_learn')}
    containerSize="xl"
    >
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
                <p className="text-sm text-muted-foreground mb-3">{t('multi_desc')}</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t('multi_1')}</li>
                  <li>• {t('multi_2')}</li>
                  <li>• {t('multi_3')}</li>
                  <li>• {t('multi_4')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">{t('common_patterns')}</h2>

          <div className="space-y-6">
            {/* Pattern 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.ArrowRight className="w-5 h-5 text-blue-500" />
                  {t('pattern_1_title')}
                </CardTitle>
                <CardDescription>{t('pattern_1_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                  <div className="px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded whitespace-nowrap">{t('pattern_1_agent_1')}</div>
                  <Icons.ArrowRight className="w-4 h-4 flex-shrink-0" />
                  <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded whitespace-nowrap">{t('pattern_1_agent_2')}</div>
                  <Icons.ArrowRight className="w-4 h-4 flex-shrink-0" />
                  <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded whitespace-nowrap">{t('pattern_1_agent_3')}</div>
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
                  {t('pattern_2_title')}
                </CardTitle>
                <CardDescription>{t('pattern_2_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded">{t('pattern_2_input')}</div>
                    <Icons.ArrowDown className="w-4 h-4" />
                    <div className="flex gap-4">
                      <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded text-sm">{t('pattern_2_agent_a')}</div>
                      <div className="px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-sm">{t('pattern_2_agent_b')}</div>
                      <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded text-sm">{t('pattern_2_agent_c')}</div>
                    </div>
                    <Icons.ArrowDown className="w-4 h-4" />
                    <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded">{t('pattern_2_combine')}</div>
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
                  {t('pattern_3_title')}
                </CardTitle>
                <CardDescription>{t('pattern_3_desc')}</CardDescription>
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
                  {t('pattern_4_title')}
                </CardTitle>
                <CardDescription>{t('pattern_4_desc')}</CardDescription>
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
          <h2 className="text-3xl font-bold mb-4">{t('agent_communication')}</h2>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{t('designing_interfaces')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t('interface_1_title')}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('interface_1_desc')}
                </p>
                <CodeBlock
                  language="text"
                  code={t('interface_1_example')}
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t('interface_2_title')}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('interface_2_desc')}
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
                <h4 className="font-semibold mb-2">{t('interface_3_title')}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('interface_3_desc')}
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
                  <li>{t('do_1')}</li>
                  <li>{t('do_2')}</li>
                  <li>{t('do_3')}</li>
                  <li>{t('do_4')}</li>
                  <li>{t('do_5')}</li>
                  <li>{t('do_6')}</li>
                  <li>{t('do_7')}</li>
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
                  <li>{t('avoid_1')}</li>
                  <li>{t('avoid_2')}</li>
                  <li>{t('avoid_3')}</li>
                  <li>{t('avoid_4')}</li>
                  <li>{t('avoid_5')}</li>
                  <li>{t('avoid_6')}</li>
                  <li>{t('avoid_7')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.BookOpen className="w-5 h-5 text-primary" />
                {t('real_world_example')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t('real_world_intro')}
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <strong>{t('agent_1')}</strong> {t('agent_1_desc')}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <strong>{t('agent_2')}</strong> {t('agent_2_desc')}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-violet-600">3</span>
                  </div>
                  <div>
                    <strong>{t('agent_3')}</strong> {t('agent_3_desc')}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-orange-600">4</span>
                  </div>
                  <div>
                    <strong>{t('agent_4')}</strong> {t('agent_4_desc')}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-cyan-600">5</span>
                  </div>
                  <div>
                    <strong>{t('agent_5')}</strong> {t('agent_5_desc')}
                  </div>
                </div>
              </div>

              <Alert className="mt-4">
                <Icons.Rocket className="w-4 h-4" />
                <AlertDescription>
                  {t('result_message')}
                </AlertDescription>
              </Alert>
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
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tutorials/code-generation" className={cn(buttonVariants())}>
                AI Code Generation →
              </Link>
              <Link href="/tutorials/claude-agents" className={cn(buttonVariants({ variant: "outline" }))}>
                Review: Building Claude Agents →
              </Link>
            </div>
          </CardContent>
        </Card>
    </TutorialLayout>
  )
}
