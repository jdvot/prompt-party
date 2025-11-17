import { Container } from '@/components/layout/container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { ExternalLink, BookOpen, Code, Zap } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('resources')

  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

export default async function ResourcesPage() {
  const t = await getTranslations('resources')
  const tCommon = await getTranslations('common')

  const resources = [
    {
      category: 'ai-development',
      categoryLabel: t('category_ai_development'),
      icon: Code,
      color: 'blue',
      items: [
        {
          title: 'Claude Code Documentation',
          description: t('claude_code_desc'),
          url: 'https://code.claude.com/docs/en/mcp',
          badge: 'Official',
        },
        {
          title: 'GitHub Spec Kit',
          description: t('spec_kit_desc'),
          url: 'https://github.com/github/spec-kit',
          badge: 'GitHub',
        },
      ],
    },
    {
      category: 'learning',
      categoryLabel: t('category_learning'),
      icon: BookOpen,
      color: 'green',
      items: [
        {
          title: 'Claude Prompt Library',
          description: t('prompt_library_desc'),
          url: 'https://claudepromptlibrary.com',
          badge: 'Community',
        },
        {
          title: 'Anthropic Documentation',
          description: t('anthropic_docs_desc'),
          url: 'https://docs.anthropic.com',
          badge: 'Official',
        },
      ],
    },
    {
      category: 'tools',
      categoryLabel: t('category_tools'),
      icon: Zap,
      color: 'yellow',
      items: [
        {
          title: 'Prompt Engineering Guide',
          description: t('prompt_engineering_desc'),
          url: 'https://www.promptingguide.ai',
          badge: 'Guide',
        },
        {
          title: 'LangChain Documentation',
          description: t('langchain_desc'),
          url: 'https://docs.langchain.com',
          badge: 'Framework',
        },
      ],
    },
  ]

  const colorMap = {
    blue: 'border-blue-500/20 bg-blue-500/5',
    green: 'border-green-500/20 bg-green-500/5',
    yellow: 'border-yellow-500/20 bg-yellow-500/5',
  }

  return (
    <Container size="lg" className="py-16">
      <Link href="/tutorials" className={cn(buttonVariants({ variant: 'ghost' }), 'mb-6')}>
        <ExternalLink className="w-4 h-4 mr-2" />
        {t('back_to_tutorials')}
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="space-y-12">
        {resources.map((category) => {
          const IconComponent = category.icon
          return (
            <section key={category.category} className="w-full">
              <div className="flex items-center gap-3 mb-6">
                <IconComponent className="w-6 h-6" />
                <h2 className="text-2xl font-bold">{category.categoryLabel}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 w-full">
                {category.items.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card
                      className={cn(
                        'h-full hover:shadow-lg transition-shadow cursor-pointer',
                        colorMap[category.color as keyof typeof colorMap]
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {item.title}
                            </CardTitle>
                          </div>
                          <Badge variant="outline">{item.badge}</Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                          {t('visit_resource')}
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Card className="mt-12 bg-gradient-to-r from-violet-500/10 to-violet-600/10 border-violet-500/20">
        <CardHeader>
          <CardTitle>{t('contribute_title')}</CardTitle>
          <CardDescription>{t('contribute_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">{t('contribute_text')}</p>
          <Link
            href="https://github.com/jdvot/prompt-party"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants())}
          >
            {t('contribute_button')}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </CardContent>
      </Card>
    </Container>
  )
}
