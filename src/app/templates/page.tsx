import { createClient } from '@/lib/supabase/server'
import { TemplateCard } from '@/components/templates/template-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SparklesIcon, LockIcon } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('templates')
  return {
    title: t('page_title'),
    description: t('page_description'),
  }
}

interface TemplatesPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

const CATEGORIES = [
  'all',
  'marketing',
  'writing',
  'code',
  'business',
  'education',
  'creative',
  'other',
]

export default async function TemplatesPage({ searchParams }: TemplatesPageProps) {
  const t = await getTranslations('templates')
  const supabase = await createClient()
  const params = await searchParams

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check user plan
  const { data: profile } = user
    ? await supabase.from('profiles').select('plan').eq('id', user.id).single()
    : { data: null }

  const hasPro = profile?.plan === 'pro' || profile?.plan === 'team' || profile?.plan === 'business'

  const selectedCategory = params.category || 'all'

  // Build query for templates
  let templatesQuery = supabase
    .from('prompt_templates')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('use_count', { ascending: false })

  // Filter by category
  if (selectedCategory !== 'all') {
    templatesQuery = templatesQuery.eq('category', selectedCategory)
  }

  // If user doesn't have Pro, exclude premium templates
  if (!hasPro) {
    templatesQuery = templatesQuery.eq('is_premium', false)
  }

  const { data: templates, error } = await templatesQuery

  // Get stats
  const { count: totalCount } = await supabase
    .from('prompt_templates')
    .select('*', { count: 'exact', head: true })

  const { count: featuredCount } = await supabase
    .from('prompt_templates')
    .select('*', { count: 'exact', head: true })
    .eq('is_featured', true)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <SparklesIcon className="w-4 h-4" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalCount || 0}</div>
            <div className="text-sm text-muted-foreground">{t('total_templates')}</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{featuredCount || 0}</div>
            <div className="text-sm text-muted-foreground">{t('featured_templates')}</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{CATEGORIES.length - 1}</div>
            <div className="text-sm text-muted-foreground">{t('categories')}</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">{t('free_to_use')}</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">{t('filter_by_category')}</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Link key={category} href={`/templates?category=${category}`}>
                <Badge
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 text-sm"
                >
                  {t(`category_${category}`)}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Pro Upsell */}
        {!hasPro && (
          <div className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <LockIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{t('unlock_premium')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('unlock_premium_description')}
                </p>
                <Button asChild>
                  <Link href="/pricing">{t('upgrade_to_pro')}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Templates Grid */}
        {error ? (
          <div className="text-center py-16">
            <p className="text-destructive">{t('error')}</p>
          </div>
        ) : templates && templates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template: any) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">{t('no_templates')}</h2>
            <p className="text-muted-foreground">{t('no_templates_description')}</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-2">{t('cta_title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('cta_description')}
            </p>
            <Button asChild size="lg">
              <Link href="/prompts/new">{t('cta_button')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
