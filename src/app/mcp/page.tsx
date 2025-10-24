import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Code, Database, Sparkles, Globe, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('mcp_integration')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default function MCPPage() {
  const t = useTranslations('mcp_integration')

  const examples = [
    {
      title: t('example_list'),
      description: t('example_list_desc'),
      endpoint: '/api/mcp/prompts?action=list&limit=10',
      method: 'GET',
    },
    {
      title: t('example_search'),
      description: t('example_search_desc'),
      endpoint: '/api/mcp/prompts?action=search&query=coding&limit=5',
      method: 'GET',
    },
    {
      title: t('example_get'),
      description: t('example_get_desc'),
      endpoint: '/api/mcp/prompts?action=get&id=YOUR_PROMPT_ID',
      method: 'GET',
    },
    {
      title: t('example_filter'),
      description: t('example_filter_desc'),
      endpoint: '/api/mcp/prompts?action=list&category=coding',
      method: 'GET',
    },
  ]

  const features = [
    {
      icon: Database,
      title: t('feature_structured'),
      description: t('feature_structured_desc'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: t('feature_fast'),
      description: t('feature_fast_desc'),
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Lock,
      title: t('feature_secure'),
      description: t('feature_secure_desc'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: t('feature_public'),
      description: t('feature_public_desc'),
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
              {t('title')}
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <Badge variant="secondary" className="mt-4">
            {t('badge')}
          </Badge>
        </div>

        {/* What is MCP */}
        <Card className="p-8 mb-8 bento-card">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            {t('what_is_mcp')}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t('what_is_mcp_text')}
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
          <h2 className="text-2xl font-bold mb-6">{t('api_endpoints')}</h2>

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
          <h2 className="text-2xl font-bold mb-4">{t('response_format')}</h2>
          <p className="text-muted-foreground mb-4">
            {t('response_format_text')}
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
          <h2 className="text-2xl font-bold mb-4">{t('getting_started')}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">{t('step1_title')}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {t('step1_text')}
              </p>
              <code className="block bg-muted/50 px-4 py-2 rounded-lg text-sm">
                curl https://prompt-party.netlify.app/api/mcp/prompts?action=list&limit=5
              </code>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t('step2_title')}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {t('step2_text')}
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
              <h3 className="font-semibold mb-2">{t('step3_title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('step3_text')}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Link href="/prompts">
              <Button className="btn-primary">
                {t('browse_prompts')}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
