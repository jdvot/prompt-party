import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Code, Database, Sparkles, Globe, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MCP Integration | Prompt Party',
  description: 'Model Context Protocol (MCP) API for AI-powered prompt discovery and management',
}

export default function MCPPage() {
  const examples = [
    {
      title: 'List All Prompts',
      description: 'Get a list of public prompts',
      endpoint: '/api/mcp/prompts?action=list&limit=10',
      method: 'GET',
    },
    {
      title: 'Search Prompts',
      description: 'Search prompts by keyword',
      endpoint: '/api/mcp/prompts?action=search&query=coding&limit=5',
      method: 'GET',
    },
    {
      title: 'Get Specific Prompt',
      description: 'Retrieve a single prompt by ID',
      endpoint: '/api/mcp/prompts?action=get&id=YOUR_PROMPT_ID',
      method: 'GET',
    },
    {
      title: 'Filter by Category',
      description: 'Get prompts from a specific category',
      endpoint: '/api/mcp/prompts?action=list&category=coding',
      method: 'GET',
    },
  ]

  const features = [
    {
      icon: Database,
      title: 'Structured Data',
      description: 'JSON responses optimized for AI consumption',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Fast Access',
      description: 'Low-latency API for real-time integrations',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Lock,
      title: 'Secure',
      description: 'Row-level security with Supabase',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: 'Public Access',
      description: 'Access public prompts without authentication',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              MCP Integration
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Model Context Protocol API for AI-powered prompt discovery and management
          </p>
          <Badge variant="secondary" className="mt-4">
            MCP v1.0
          </Badge>
        </div>

        {/* What is MCP */}
        <Card className="p-8 mb-8 bento-card">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            What is MCP?
          </h2>
          <p className="text-muted-foreground mb-4">
            The <strong>Model Context Protocol (MCP)</strong> is an open standard that enables AI models and
            assistants to securely access external data sources and tools. Prompt Party&apos;s MCP endpoint provides
            structured access to our prompt library, allowing AI assistants to discover, search, and retrieve
            prompts programmatically.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="p-4 rounded-xl bg-gradient-to-br from-background to-muted/50 border"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </Card>

        {/* API Endpoints */}
        <Card className="p-8 mb-8 bento-card">
          <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>

          <div className="space-y-6">
            {examples.map((example) => (
              <div key={example.title} className="border-l-4 border-primary pl-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{example.title}</h3>
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </div>
                  <Badge variant="outline">{example.method}</Badge>
                </div>
                <code className="block bg-muted/50 px-4 py-2 rounded-lg text-sm overflow-x-auto mt-2">
                  {example.endpoint}
                </code>
              </div>
            ))}
          </div>
        </Card>

        {/* Response Format */}
        <Card className="p-8 mb-8 bento-card">
          <h2 className="text-2xl font-bold mb-4">Response Format</h2>
          <p className="text-muted-foreground mb-4">
            All responses follow a consistent JSON structure:
          </p>
          <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "type": "prompt_list",
  "count": 10,
  "data": [
    {
      "id": "uuid",
      "title": "Prompt title",
      "body": "Prompt content...",
      "category": "coding",
      "tags": ["javascript", "ai"],
      "likes_count": 42,
      "created_at": "2025-10-21T00:00:00Z",
      "author": {
        "id": "uuid",
        "name": "John Doe",
        "avatar_url": "https://..."
      }
    }
  ],
  "mcp_version": "1.0"
}`}
          </pre>
        </Card>

        {/* Getting Started */}
        <Card className="p-8 bento-card">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Try the API</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Test the endpoint in your browser or with curl:
              </p>
              <code className="block bg-muted/50 px-4 py-2 rounded-lg text-sm">
                curl https://prompt-party.netlify.app/api/mcp/prompts?action=list&limit=5
              </code>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Integrate with Claude Desktop</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Add to your Claude Desktop MCP config:
              </p>
              <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "prompt-party": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "env": {
        "PROMPT_PARTY_API": "https://prompt-party.netlify.app/api/mcp/prompts"
      }
    }
  }
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Use in Your App</h3>
              <p className="text-sm text-muted-foreground">
                Integrate the MCP endpoint into your AI applications, chatbots, or automation tools.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Link href="/prompts">
              <Button className="btn-primary">
                Browse Prompts
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
