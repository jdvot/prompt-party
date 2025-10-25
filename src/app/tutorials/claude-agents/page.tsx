import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/tutorials/code-block'
import { Sparkles, Lightbulb, Code, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Building Claude Agents | Tutorials | Prompt Party',
  description: 'Learn how to create intelligent Claude AI agents that can perform complex tasks autonomously with tool use and function calling.',
}

export default function ClaudeAgentsTutorial() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/tutorials">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tutorials
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge>Intermediate</Badge>
          <Badge variant="outline">30 min</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">Building Claude Agents</h1>
        <p className="text-xl text-muted-foreground">
          Create intelligent agents with Claude that can perform complex tasks autonomously using tool use and function calling.
        </p>
      </div>

      {/* What You'll Learn */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            What You'll Learn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>Understanding Claude's tool use capabilities</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>Defining and implementing tools for Claude</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>Creating autonomous agents with decision-making</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              <span>Best practices for agent design and safety</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1: Introduction */}
        <section>
          <h2 className="text-3xl font-bold mb-4">What are Claude Agents?</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Claude agents are autonomous AI assistants that can use tools and make decisions to accomplish complex tasks. Unlike simple chat interactions, agents can:
            </p>
            <ul>
              <li>Call external APIs and services</li>
              <li>Access databases and search engines</li>
              <li>Perform calculations and data analysis</li>
              <li>Chain multiple operations together</li>
              <li>Make decisions based on intermediate results</li>
            </ul>
            <p>
              The key to building effective agents is <strong>tool use</strong> (also called function calling). This allows Claude to interact with the outside world beyond just generating text.
            </p>
          </div>
        </section>

        {/* Section 2: Tool Use Basics */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Tool Use Basics</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Defining a Tool</CardTitle>
              <CardDescription>Tools are functions Claude can call to perform actions</CardDescription>
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
            <AlertTitle>Key Concept</AlertTitle>
            <AlertDescription>
              The <code>input_schema</code> tells Claude exactly what parameters the tool accepts. Be specific in your descriptions!
            </AlertDescription>
          </Alert>
        </section>

        {/* Section 3: Building Your First Agent */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Building Your First Agent</h2>

          <Tabs defaultValue="setup" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setup">1. Setup</TabsTrigger>
              <TabsTrigger value="agent">2. Agent Loop</TabsTrigger>
              <TabsTrigger value="tools">3. Tool Execution</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Install Dependencies</CardTitle>
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
                  <CardTitle>Initialize Claude Client</CardTitle>
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
                  <CardTitle>Agent Loop Pattern</CardTitle>
                  <CardDescription>The agent runs in a loop until task completion</CardDescription>
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
                  <CardTitle>Implementing Tool Functions</CardTitle>
                  <CardDescription>Map tool names to actual implementations</CardDescription>
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
          <h2 className="text-3xl font-bold mb-4">Advanced Agent Patterns</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Multi-Step Reasoning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Guide the agent to break down complex tasks into steps:
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
                <CardTitle className="text-lg">Error Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tools should return errors that Claude can understand:
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
          <h2 className="text-3xl font-bold mb-4">Best Practices</h2>

          <div className="space-y-4">
            <Card className="border-green-600/20 bg-green-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Do's
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✅ Provide clear, detailed tool descriptions</li>
                  <li>✅ Include examples in tool descriptions</li>
                  <li>✅ Validate tool inputs before execution</li>
                  <li>✅ Return structured, parseable tool outputs</li>
                  <li>✅ Set max iteration limits to prevent infinite loops</li>
                  <li>✅ Log agent decisions for debugging</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-600/20 bg-red-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-red-600">⚠️</span>
                  Don'ts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>❌ Don't give tools access to dangerous operations without safeguards</li>
                  <li>❌ Don't rely on the agent to validate its own permissions</li>
                  <li>❌ Don't return unstructured or ambiguous tool results</li>
                  <li>❌ Don't create tools that modify critical data without confirmation</li>
                  <li>❌ Don't skip error handling in tool implementations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Real World Example */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Real-World Example: Research Assistant</h2>

          <Card>
            <CardHeader>
              <CardTitle>Complete Research Agent</CardTitle>
              <CardDescription>An agent that can search, analyze, and synthesize information</CardDescription>
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
        <Card className="bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border-violet-600/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild variant="outline">
                <Link href="/tutorials/multi-agent-systems">
                  <Code className="w-4 h-4 mr-2" />
                  Multi-Agent Systems →
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/prompts?tag=claude-agent">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Browse Agent Examples →
                </Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Recommended Resources:</p>
              <ul className="space-y-1">
                <li>• <a href="https://docs.anthropic.com/claude/docs/tool-use" target="_blank" rel="noopener" className="text-primary hover:underline">Official Claude Tool Use Guide</a></li>
                <li>• <a href="https://github.com/anthropics/anthropic-cookbook" target="_blank" rel="noopener" className="text-primary hover:underline">Anthropic Cookbook (GitHub)</a></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
