import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/tutorials/code-block'
import { TutorialProgress } from '@/components/tutorials/tutorial-progress'
import { Container } from '@/components/layout/container'
import { Sparkles, Lightbulb, Code, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('tutorials.claudeAgents')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ClaudeAgentsTutorial() {
  const t = await getTranslations('tutorials.claudeAgents')
  return (
    <Container size="lg" className="py-8">
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 w-full">
        <div>
      {/* Back Button */}
      <Link href="/tutorials" className={cn(buttonVariants({ variant: "ghost" }), "mb-6")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('back_to_tutorials')}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-yellow-500">{t('badge_intermediate')}</Badge>
          <Badge variant="outline">{t('badge_duration')}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('description')}
        </p>
      </div>

      {/* What You'll Learn */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            {t('what_you_learn')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_tool_use')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_defining_tools')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_autonomous')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>{t('learn_best_practices')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1: Introduction */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('intro_title')}</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              {t('intro_para1')}
            </p>
            <ul>
              <li>{t('intro_capability1')}</li>
              <li>{t('intro_capability2')}</li>
              <li>{t('intro_capability3')}</li>
              <li>{t('intro_capability4')}</li>
              <li>{t('intro_capability5')}</li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t('intro_para2') }} />
          </div>
        </section>

        {/* Section 2: Tool Use Basics */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('tool_use_title')}</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t('tool_defining_title')}</CardTitle>
              <CardDescription>{t('tool_defining_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="javascript"
                code={`const tools = [
  {
    name: "get_weather",
    description: "Get the current weather in a given location",
    input_schema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA"
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description: "The unit of temperature"
        }
      },
      required: ["location"]
    }
  }
];`}
              />
            </CardContent>
          </Card>

          <Alert className="mb-6">
            <Sparkles className="w-4 h-4" />
            <AlertTitle>{t('alert_key_concept')}</AlertTitle>
            <AlertDescription>
              {t('alert_input_schema_intro')}
              <strong>{t('alert_input_schema_bold')}</strong>
              {t('alert_input_schema_text')}
            </AlertDescription>
          </Alert>
        </section>

        {/* Section 3: Building Your First Agent */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('building_title')}</h2>

          <Tabs defaultValue="setup" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setup">{t('tab_setup')}</TabsTrigger>
              <TabsTrigger value="agent">{t('tab_agent_loop')}</TabsTrigger>
              <TabsTrigger value="tools">{t('tab_tool_execution')}</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('install_dependencies')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    language="bash"
                    code={`npm install @anthropic-ai/sdk`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('initialize_client')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    language="javascript"
                    code={`import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});`}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('agent_loop_title')}</CardTitle>
                  <CardDescription>{t('agent_loop_description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    language="javascript"
                    code={`async function runAgent(userMessage) {
  const messages = [{ role: "user", content: userMessage }];

  while (true) {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      tools: tools,
      messages: messages
    });

    // If Claude is done, return the final response
    if (response.stop_reason === "end_turn") {
      return response.content[0].text;
    }

    // If Claude wants to use a tool
    if (response.stop_reason === "tool_use") {
      // Execute the tool (covered in next tab)
      const toolResults = await executeTools(response.content);

      // Add Claude's response and tool results to conversation
      messages.push(
        { role: "assistant", content: response.content },
        { role: "user", content: toolResults }
      );

      // Loop continues...
    }
  }
}`}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('tool_functions_title')}</CardTitle>
                  <CardDescription>{t('tool_functions_description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    language="javascript"
                    code={`const toolFunctions = {
  get_weather: async ({ location, unit = "celsius" }) => {
    // Call weather API
    const response = await fetch(
      \`https://api.weather.com/v1/current?location=\${location}\`
    );
    const data = await response.json();

    return {
      location,
      temperature: data.temperature,
      unit,
      condition: data.condition
    };
  },

  search_web: async ({ query, num_results = 5 }) => {
    // Call search API
    const results = await searchAPI(query, num_results);
    return results;
  }
};

async function executeTools(content) {
  const toolResults = [];

  for (const block of content) {
    if (block.type === "tool_use") {
      const toolName = block.name;
      const toolInput = block.input;

      // Execute the tool function
      const result = await toolFunctions[toolName](toolInput);

      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: JSON.stringify(result)
      });
    }
  }

  return toolResults;
}`}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Section 4: Advanced Patterns */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('advanced_title')}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('advanced_multi_step')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('advanced_multi_step_description')}
                </p>
                <CodeBlock
                  language="text"
                  code={`You are a research agent. For each query:
1. First, search for relevant information
2. Analyze the search results
3. If needed, search for additional details
4. Synthesize a comprehensive answer`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('advanced_error_handling')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('advanced_error_handling_description')}
                </p>
                <CodeBlock
                  language="javascript"
                  code={`try {
  const result = await toolFn(input);
  return { success: true, data: result };
} catch (error) {
  return {
    success: false,
    error: error.message
  };
}`}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 5: Best Practices */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('best_practices_title')}</h2>

          <div className="space-y-4">
            <Card className="border-green-600/20 bg-green-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {t('best_practices_dos')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>{t('best_practices_do1')}</li>
                  <li>{t('best_practices_do2')}</li>
                  <li>{t('best_practices_do3')}</li>
                  <li>{t('best_practices_do4')}</li>
                  <li>{t('best_practices_do5')}</li>
                  <li>{t('best_practices_do6')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-600/20 bg-red-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-red-600">⚠️</span>
                  {t('best_practices_donts')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>{t('best_practices_dont1')}</li>
                  <li>{t('best_practices_dont2')}</li>
                  <li>{t('best_practices_dont3')}</li>
                  <li>{t('best_practices_dont4')}</li>
                  <li>{t('best_practices_dont5')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Real World Example */}
        <section>
          <h2 className="text-3xl font-bold mb-4">{t('example_title')}</h2>

          <Card>
            <CardHeader>
              <CardTitle>{t('example_card_title')}</CardTitle>
              <CardDescription>{t('example_card_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="javascript"
                code={`const researchTools = [
  {
    name: "search_web",
    description: "Search the web for information on a topic",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        num_results: { type: "number", description: "Number of results (1-10)" }
      },
      required: ["query"]
    }
  },
  {
    name: "read_webpage",
    description: "Read and extract content from a webpage",
    input_schema: {
      type: "object",
      properties: {
        url: { type: "string", description: "URL to read" }
      },
      required: ["url"]
    }
  },
  {
    name: "save_findings",
    description: "Save research findings to a document",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Document title" },
        content: { type: "string", description: "Research findings" }
      },
      required: ["title", "content"]
    }
  }
];

const systemPrompt = \`You are a research assistant. When given a research topic:

1. Search for relevant sources
2. Read the most promising sources
3. Synthesize the information
4. Save your findings to a document

Be thorough but efficient. Cite your sources.\`;

async function research(topic) {
  return await runAgent(\`Research this topic: \${topic}\`);
}`}
              />
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-violet-600/10 to-violet-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {t('next_steps_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tutorials/multi-agent-systems" className={cn(buttonVariants({ variant: "outline" }))}>
                <Code className="w-4 h-4 mr-2" />
                {t('next_multi_agent')}
              </Link>
              <Link href="/prompts?tag=claude-agent" className={cn(buttonVariants({ variant: "outline" }))}>
                <Sparkles className="w-4 h-4 mr-2" />
                {t('next_browse_examples')}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">{t('resources_title')}</p>
              <ul className="space-y-1">
                <li>• <a href="https://docs.anthropic.com/claude/docs/tool-use" target="_blank" rel="noopener" className="text-primary hover:underline">{t('resource_tool_use')}</a></li>
                <li>• <a href="https://github.com/anthropics/anthropic-cookbook" target="_blank" rel="noopener" className="text-primary hover:underline">{t('resource_cookbook')}</a></li>
              </ul>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Sidebar - Progress Tracker */}
      <aside className="hidden lg:block">
        <TutorialProgress
          tutorialId="claude-agents"
          title={t('title')}
          duration={t('duration')}
          level="intermediate"
          rewardPoints={75}
          rewardBadge={t('reward_badge') || 'Agent Master'}
          completed={false}
        />
      </aside>
    </div>
    </Container>
  )
}
