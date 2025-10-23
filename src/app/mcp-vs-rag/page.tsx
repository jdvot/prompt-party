import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Code, Database, Zap, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('mcp')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function MCPvsRAGPage() {
  const t = await getTranslations('mcp')

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-on-hover text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="gradient-text font-semibold">{t('hero_badge')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          {t('hero_title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('hero_description')}
        </p>
      </div>

      {/* Quick Comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* RAG Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Database className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">{t('rag_title')}</CardTitle>
            </div>
            <CardDescription className="text-base">
              {t('rag_subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              <strong>{t('rag_description')}</strong>
            </p>

            <div>
              <p className="text-sm font-semibold mb-2">{t('rag_for_what')}</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>{t('rag_use_1')}</li>
                <li>{t('rag_use_2')}</li>
                <li>{t('rag_use_3')}</li>
                <li>{t('rag_use_4')}</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {t('strengths')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs">{t('rag_strength_1')}</Badge>
                <Badge variant="secondary" className="text-xs">{t('rag_strength_2')}</Badge>
                <Badge variant="secondary" className="text-xs">{t('rag_strength_3')}</Badge>
                <Badge variant="secondary" className="text-xs">{t('rag_strength_4')}</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                {t('limitations')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs">{t('rag_limit_1')}</Badge>
                <Badge variant="outline" className="text-xs">{t('rag_limit_2')}</Badge>
                <Badge variant="outline" className="text-xs">{t('rag_limit_3')}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MCP Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-600" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle className="text-2xl">{t('mcp_title')}</CardTitle>
            </div>
            <CardDescription className="text-base">
              {t('mcp_subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              <strong>{t('mcp_description')}</strong>
            </p>

            <div>
              <p className="text-sm font-semibold mb-2">{t('mcp_for_what')}</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>{t('mcp_use_1')}</li>
                <li>{t('mcp_use_2')}</li>
                <li>{t('mcp_use_3')}</li>
                <li>{t('mcp_use_4')}</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {t('strengths')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs">{t('mcp_strength_1')}</Badge>
                <Badge variant="secondary" className="text-xs">{t('mcp_strength_2')}</Badge>
                <Badge variant="secondary" className="text-xs">{t('mcp_strength_3')}</Badge>
                <Badge variant="secondary" className="text-xs">{t('mcp_strength_4')}</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                {t('limitations')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs">{t('mcp_limit_1')}</Badge>
                <Badge variant="outline" className="text-xs">{t('mcp_limit_2')}</Badge>
                <Badge variant="outline" className="text-xs">{t('mcp_limit_3')}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analogie */}
      <Card className="mb-12 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('analogy_title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
              {t('analogy_rag_title')}
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>{t('analogy_rag_1')}</li>
              <li>{t('analogy_rag_2')}</li>
              <li>{t('analogy_rag_3')}</li>
              <li>{t('analogy_rag_4')}</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2 text-purple-600 dark:text-purple-400">
              {t('analogy_mcp_title')}
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>{t('analogy_mcp_1')}</li>
              <li>{t('analogy_mcp_2')}</li>
              <li>{t('analogy_mcp_3')}</li>
              <li>{t('analogy_mcp_4')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>{t('comparison_title')}</CardTitle>
          <CardDescription>{t('comparison_subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t('comparison_criteria')}</th>
                  <th className="text-left py-3 px-4">
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-500" />
                      {t('rag_title')}
                    </span>
                  </th>
                  <th className="text-left py-3 px-4">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      {t('mcp_title')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: t('comparison_nature'), rag: t('comparison_nature_rag'), mcp: t('comparison_nature_mcp') },
                  { label: t('comparison_action'), rag: t('comparison_action_rag'), mcp: t('comparison_action_mcp') },
                  { label: t('comparison_latency'), rag: t('comparison_latency_rag'), mcp: t('comparison_latency_mcp') },
                  { label: t('comparison_complexity'), rag: t('comparison_complexity_rag'), mcp: t('comparison_complexity_mcp') },
                  { label: t('comparison_scalability'), rag: t('comparison_scalability_rag'), mcp: t('comparison_scalability_mcp') },
                  { label: t('comparison_security'), rag: t('comparison_security_rag'), mcp: t('comparison_security_mcp') },
                  { label: t('comparison_realtime'), rag: t('comparison_realtime_rag'), mcp: t('comparison_realtime_mcp') },
                  { label: t('comparison_sources'), rag: t('comparison_sources_rag'), mcp: t('comparison_sources_mcp') },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-3 px-4 font-medium">{row.label}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.rag}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.mcp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('examples_rag_title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">{t('examples_rag_1_title')}</p>
              <p className="text-muted-foreground">{t('examples_rag_1_desc')}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t('examples_rag_2_title')}</p>
              <p className="text-muted-foreground">{t('examples_rag_2_desc')}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t('examples_rag_3_title')}</p>
              <p className="text-muted-foreground">{t('examples_rag_3_desc')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('examples_mcp_title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">{t('examples_mcp_1_title')}</p>
              <p className="text-muted-foreground">{t('examples_mcp_1_desc')}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t('examples_mcp_2_title')}</p>
              <p className="text-muted-foreground">{t('examples_mcp_2_desc')}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t('examples_mcp_3_title')}</p>
              <p className="text-muted-foreground">{t('examples_mcp_3_desc')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hybrid Approach */}
      <Card className="mb-12 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('hybrid_title')}
          </CardTitle>
          <CardDescription>
            {t('hybrid_subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-background rounded-lg p-4 border">
            <p className="font-semibold mb-2">{t('hybrid_hr_title')}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-blue-600 dark:text-blue-400">{t('hybrid_hr_rag')}</strong>
              </p>
              <p>
                <strong className="text-purple-600 dark:text-purple-400">{t('hybrid_hr_mcp')}</strong>
              </p>
              <p className="pt-2 border-t">
                <strong>{t('hybrid_hr_question')}</strong>
              </p>
              <p>
                <strong>{t('hybrid_hr_answer')}</strong>
              </p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 border">
            <p className="font-semibold mb-2">{t('hybrid_finance_title')}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-blue-600 dark:text-blue-400">{t('hybrid_finance_rag')}</strong>
              </p>
              <p>
                <strong className="text-purple-600 dark:text-purple-400">{t('hybrid_finance_mcp')}</strong>
              </p>
              <p className="pt-2 border-t">
                <strong>{t('hybrid_finance_question')}</strong>
              </p>
              <p>
                <strong>{t('hybrid_finance_answer')}</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decision Tree */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>{t('decision_title')}</CardTitle>
          <CardDescription>{t('decision_subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold mb-3">
                {t('decision_question')}
              </p>
              <div className="ml-4 space-y-3">
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400">{t('decision_yes_mcp')}</p>
                  <p className="ml-4 text-sm text-muted-foreground">
                    {t('decision_yes_docs')}
                  </p>
                  <div className="ml-8 space-y-1 text-sm">
                    <p className="text-green-600 dark:text-green-400">{t('decision_yes_both')}</p>
                    <p className="text-muted-foreground">{t('decision_no_mcp')}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-blue-600 dark:text-blue-400">{t('decision_no_actions')}</p>
                  <div className="ml-8 space-y-1 text-sm">
                    <p className="text-blue-600 dark:text-blue-400">{t('decision_yes_rag')}</p>
                    <p className="text-muted-foreground">{t('decision_no_llm')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Link href="/prompts/wizard">
          <Button size="lg" className="gap-2">
            <Code className="w-5 h-5" />
            {t('cta_button')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          {t('cta_description')}
        </p>
      </div>
    </div>
  )
}
